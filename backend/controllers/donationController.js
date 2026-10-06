import Donation from "../models/Donation.js";
import DonationRequest from "../models/DonationRequest.js";
import User from "../models/User.js";

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

// ==========================================
// REQUEST A DONATION AS A RECIPIENT
// ==========================================

export const requestDonation = async (req, res) => {
  try {
    const { donationId } = req.params;
    const { recipientId } = req.body;

    if (!recipientId) {
      return res.status(400).json({ message: "Recipient ID is required." });
    }

    const recipient = await User.findById(recipientId).select("role");
    if (!recipient || !["ngo", "hospital"].includes(recipient.role)) {
      return res.status(403).json({ message: "Only NGO or hospital accounts can request donations." });
    }

    const donation = await Donation.findById(donationId).select("status");
    if (!donation) {
      return res.status(404).json({ message: "Donation not found." });
    }
    if (donation.status !== "pending") {
      return res.status(409).json({ message: "This donation is no longer available." });
    }

    const request = await DonationRequest.create({
      donation: donationId,
      recipient: recipientId,
    });

    return res.status(201).json({
      message: "Donation request submitted successfully.",
      request: { id: request._id, status: request.status },
    });
  } catch (error) {
    if (error.code === 11000) {
      return res.status(409).json({ message: "You have already requested this donation." });
    }
    if (error.name === "CastError") {
      return res.status(400).json({ message: "Invalid donation or recipient ID." });
    }

    console.error("Donation request error:", error.message);
    return res.status(500).json({ message: "Failed to submit donation request." });
  }
};

export const getRequestsByRecipient = async (req, res) => {
  try {
    const { recipientId } = req.params;
    const requests = await DonationRequest.find({ recipient: recipientId })
      .select("donation status")
      .lean();

    return res.json(requests.map((request) => ({
      donationId: String(request.donation),
      status: request.status,
    })));
  } catch (error) {
    if (error.name === "CastError") {
      return res.status(400).json({ message: "Invalid recipient ID." });
    }
    console.error("Recipient requests error:", error.message);
    return res.status(500).json({ message: "Failed to fetch donation requests." });
  }
};

export const getRequestsByDonor = async (req, res) => {
  try {
    const { donorId } = req.params;
    const donor = await User.findById(donorId).select("role");
    if (!donor || donor.role !== "donor") {
      return res.status(403).json({ message: "Only donor accounts can view incoming requests." });
    }

    const donations = await Donation.find({ donor: donorId }).select("_id").lean();
    const requests = await DonationRequest.find({
      donation: { $in: donations.map(({ _id }) => _id) },
    })
      .populate("donation", "itemName type quantity location status")
      .populate("recipient", "name organization role city")
      .sort({ createdAt: -1 })
      .lean();

    return res.json(requests);
  } catch (error) {
    if (error.name === "CastError") {
      return res.status(400).json({ message: "Invalid donor ID." });
    }
    console.error("Donor requests error:", error.message);
    return res.status(500).json({ message: "Failed to fetch incoming requests." });
  }
};

export const updateDonationRequest = async (req, res) => {
  try {
    const { requestId } = req.params;
    const { donorId, status } = req.body;

    if (!donorId || !["approved", "declined"].includes(status)) {
      return res.status(400).json({ message: "Donor ID and a valid decision are required." });
    }

    const request = await DonationRequest.findById(requestId).populate("donation", "donor status itemName");
    if (!request) {
      return res.status(404).json({ message: "Donation request not found." });
    }
    if (String(request.donation.donor) !== String(donorId)) {
      return res.status(403).json({ message: "You can only respond to requests for your own donations." });
    }
    if (request.status !== "pending") {
      return res.status(409).json({ message: `This request has already been ${request.status}.` });
    }

    if (status === "approved") {
      const allocatedDonation = await Donation.findOneAndUpdate(
        { _id: request.donation._id, donor: donorId, status: "pending" },
        { $set: { status: "matched" } },
        { new: true }
      );
      if (!allocatedDonation) {
        return res.status(409).json({ message: "This donation is no longer available to allocate." });
      }

      const approvedRequest = await DonationRequest.findOneAndUpdate(
        { _id: requestId, status: "pending" },
        { $set: { status: "approved" } },
        { new: true }
      );
      if (!approvedRequest) {
        await Donation.updateOne(
          { _id: allocatedDonation._id, status: "matched" },
          { $set: { status: "pending" } }
        );
        return res.status(409).json({ message: "This request has already been handled." });
      }

      await DonationRequest.updateMany(
        { donation: allocatedDonation._id, _id: { $ne: approvedRequest._id }, status: "pending" },
        { $set: { status: "declined" } }
      );

      return res.json({
        message: "Request approved. The donation is now allocated to this recipient.",
        request: approvedRequest,
        donationStatus: allocatedDonation.status,
      });
    }

    const declinedRequest = await DonationRequest.findOneAndUpdate(
      { _id: requestId, status: "pending" },
      { $set: { status: "declined" } },
      { new: true }
    );
    if (!declinedRequest) {
      return res.status(409).json({ message: "This request has already been handled." });
    }

    return res.json({
      message: "Request declined. The donation remains available to other recipients.",
      request: declinedRequest,
      donationStatus: request.donation.status,
    });
  } catch (error) {
    if (error.name === "CastError") {
      return res.status(400).json({ message: "Invalid request or donor ID." });
    }
    console.error("Update donation request error:", error.message);
    return res.status(500).json({ message: "Failed to update donation request." });
  }
};