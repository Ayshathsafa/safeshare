import mongoose from "mongoose";

const donationSchema = new mongoose.Schema(
  {
    donor: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
      required: true,
    },

    donorName: {
      type: String,
      required: true,
    },

    type: {
      type: String,
      required: true,
    },

    itemName: {
      type: String,
      required: true,
    },

    quantity: {
      type: String,
      required: true,
    },

    location: {
      type: String,
      required: true,
    },

    expiryDate: {
      type: Date,
    },

    description: {
      type: String,
    },

    status: {
      type: String,
      enum: ["Pending", "Accepted", "Delivered"],
      default: "Pending",
    },
  },
  {
    timestamps: true,
  }
);

const Donation = mongoose.model("Donation", donationSchema);

export default Donation;