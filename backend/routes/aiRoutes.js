import express from "express";
import Donation from "../models/Donation.js";
import User from "../models/User.js";
import { getAIMatch } from "../services/aiMatchingService.js";
import { getLocalMatch } from "../services/localMatchingService.js";

const router = express.Router();
const escapeRegex = (value) => value.replace(/[.*+?^${}()|[\]\\]/g, "\\$&");

// Use Gemini as the primary match score and fall back to a local deterministic score only when AI is unavailable.
router.post("/match", async (req, res) => {
  try {
    const { donationId, recipientId, itemName, recipientName } = req.body;

    if ((!donationId && (!itemName || typeof itemName !== "string")) ||
      (!recipientId && (!recipientName || typeof recipientName !== "string"))) {
      return res.status(400).json({
        message: "Donation and recipient identifiers are required",
      });
    }

    const donation = donationId
      ? await Donation.findById(donationId)
      : await Donation.findOne({
          itemName: {
            $regex: `^${escapeRegex(itemName.trim())}$`,
            $options: "i",
          },
        });

    if (!donation) {
      return res.status(404).json({
        message: "Donation not found",
      });
    }

    const recipient = recipientId
      ? await User.findOne({
          _id: recipientId,
          role: { $in: ["ngo", "hospital"] },
        })
      : await User.findOne({
          name: {
            $regex: `^${escapeRegex(recipientName.trim())}$`,
            $options: "i",
          },
          role: { $in: ["ngo", "hospital"] },
        });

    if (!recipient) {
      return res.status(404).json({
        message: "Recipient not found",
      });
    }

    let result;

    try {
      result = await getAIMatch(donation, recipient);
      result.source = "gemini";
    } catch (error) {
      console.warn("Gemini match failed, falling back to local score:", error.message);
      result = getLocalMatch(donation, recipient);
      result.source = "local_fallback";
      result.reason = `${result.reason} Gemini was unavailable, so the local score was used.`;
    }

    res.json({
      donation: {
        itemName: donation.itemName,
        type: donation.type,
        location: donation.location,
        quantity: donation.quantity,
      },

      recipient: {
        name: recipient.name,
        role: recipient.role,
        city: recipient.city,
        requirements: recipient.recipientRequirements,
      },

      aiMatch: result,
    });
  } catch (error) {
    console.error("AI matching error:", error.message);

    if (error.name === "CastError") {
      return res.status(400).json({ message: "Invalid donation or recipient ID" });
    }

    res.status(500).json({
      message: "Matching failed",
    });
  }
});

// Call Gemini only when the recipient explicitly asks for an extra AI analysis.
router.post("/analyze", async (req, res) => {
  try {
    const { donationId, recipientId } = req.body;
    if (!donationId || !recipientId) {
      return res.status(400).json({ message: "Donation and recipient identifiers are required." });
    }

    const [donation, recipient] = await Promise.all([
      Donation.findById(donationId),
      User.findOne({ _id: recipientId, role: { $in: ["ngo", "hospital"] } }),
    ]);

    if (!donation) return res.status(404).json({ message: "Donation not found." });
    if (!recipient) return res.status(404).json({ message: "Recipient not found." });

    const aiAnalysis = await getAIMatch(donation, recipient);
    return res.json({ aiAnalysis });
  } catch (error) {
    console.error("On-demand AI analysis error:", error.message);
    if (error.name === "CastError") {
      return res.status(400).json({ message: "Invalid donation or recipient ID." });
    }
    if (error.status === 429 || /\b429\b|quota exceeded|rate limit/i.test(error.message)) {
      return res.status(429).json({ message: "Gemini API quota reached. The local match score is still available." });
    }
    if (/\b(502|503|504)\b|UNAVAILABLE|INTERNAL/i.test(error.message)) {
      return res.status(503).json({ message: "Gemini analysis is temporarily unavailable. The local match score is still available." });
    }
    return res.status(500).json({ message: "AI analysis failed. The local match score is still available." });
  }
});

export default router;