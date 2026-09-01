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
      enum: [
        "food",
        "medicine",
        "clothes",
        "books",
        "essentials",
      ],
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
      default: null,
    },

    description: {
      type: String,
      default: "",
    },

    // DONATION IMAGE
    image: {
      url: {
        type: String,
        default: "",
      },

      filename: {
        type: String,
        default: "",
      },

      mimetype: {
        type: String,
        default: "",
      },
    },

    // Donation status
    status: {
      type: String,
      enum: [
        "pending",
        "matched",
        "completed",
      ],
      default: "pending",
    },
  },
  {
    timestamps: true,
  }
);

const Donation = mongoose.model(
  "Donation",
  donationSchema
);

export default Donation;