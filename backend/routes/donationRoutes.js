import express from "express";

import {
  createDonation,
  getDonations,
} from "../controllers/donationController.js";

const router = express.Router();

// Submit a donation
router.post("/", createDonation);

// Get all donations
router.get("/", getDonations);

export default router;