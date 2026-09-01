import Donation from "../models/Donation.js";

// ==========================================
// CREATE DONATION
// ==========================================

export const createDonation = async (req, res) => {
  try {
    const {
      donor,
      donorName,
      type,
      itemName,
      quantity,
      location,
      expiryDate,
      description,
    } = req.body;

    // Check required fields
    if (
      !donor ||
      !donorName ||
      !type ||
      !itemName ||
      !quantity ||
      !location
    ) {
      return res.status(400).json({
        message: "Please fill all required donation fields.",
      });
    }

    // Image information
    let imageData = {
      url: "",
      filename: "",
      mimetype: "",
    };

    if (req.file) {
      imageData = {
        url: `/uploads/donations/${req.file.filename}`,
        filename: req.file.filename,
        mimetype: req.file.mimetype,
      };
    }

    // Create donation
    const donation = await Donation.create({
      donor,
      donorName,
      type,
      itemName,
      quantity,
      location,
      expiryDate: expiryDate || null,
      description: description || "",
      image: imageData,
      status: "pending",
    });

    res.status(201).json({
      message: "Donation submitted successfully",
      donation,
    });

  } catch (error) {
    console.error("Donation error:", error);

    res.status(500).json({
      message: "Failed to submit donation",
      error: error.message,
    });
  }
};


// ==========================================
// GET ALL DONATIONS
// ==========================================

export const getDonations = async (req, res) => {
  try {
    const donations = await Donation.find()
      .populate("donor", "name email")
      .sort({ createdAt: -1 });

    res.json(donations);

  } catch (error) {
    console.error(
      "Get donations error:",
      error
    );

    res.status(500).json({
      message: "Failed to fetch donations",
      error: error.message,
    });
  }
};


// ==========================================
// GET DONATIONS BY DONOR
// ==========================================

export const getDonationsByDonor = async (req, res) => {
  try {
    const { donorId } = req.params;

    const donations = await Donation.find({
      donor: donorId,
    })
      .populate("donor", "name email")
      .sort({ createdAt: -1 });

    res.json(donations);

  } catch (error) {
    console.error(
      "Get donor donations error:",
      error
    );

    res.status(500).json({
      message: "Failed to fetch donor donations",
      error: error.message,
    });
  }
};