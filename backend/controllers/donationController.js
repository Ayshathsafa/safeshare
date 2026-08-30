import Donation from "../models/Donation.js";

// CREATE DONATION
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

    const donation = await Donation.create({
      donor,
      donorName,
      type,
      itemName,
      quantity,
      location,
      expiryDate,
      description,
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


// GET DONATIONS
export const getDonations = async (req, res) => {
  try {
    const donations = await Donation.find()
      .populate("donor", "name email");

    res.json(donations);
  } catch (error) {
    console.error("Get donations error:", error);

    res.status(500).json({
      message: "Failed to fetch donations",
      error: error.message,
    });
  }
};