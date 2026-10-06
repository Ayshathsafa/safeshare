import mongoose from "mongoose";

const userSchema = new mongoose.Schema(
  {
    role: {
      type: String,
      enum: ["donor", "ngo", "hospital"],
      required: true,
    },

    name: {
      type: String,
      required: true,
    },

    email: {
      type: String,
      required: true,
      unique: true,
    },

    password: {
      type: String,
      required: true,
    },

    phone: {
      type: String,
    },

    city: {
      type: String,
    },

    organization: {
      type: String,
    },

    registrationId: {
      type: String,
    },

    hospitalName: {
      type: String,
    },

    notes: {
      type: String,
    },

    recipientRequirements: {
      type: [String],
      default: [],
    },

    resourceNeeds: {
      type: [
        {
          category: {
            type: String,
            enum: ["food", "medicine", "clothes", "books", "essentials"],
            required: true,
          },
          item: { type: String, trim: true, maxlength: 100 },
          maxQuantity: { type: Number, min: 0, default: null },
          unit: { type: String, trim: true, maxlength: 30, default: "" },
        },
      ],
      default: [],
    },
  },
  {
    timestamps: true,
  }
);

const User = mongoose.model("User", userSchema);

export default User;