import User from "../models/User.js";

const toPublicUser = (user) => {
  const publicUser = user.toObject();
  delete publicUser.password;
  return publicUser;
};

// REGISTER
export const registerUser = async (req, res) => {
  try {
    const {
      role,
      name,
      email,
      password,
      phone,
      city,
      organization,
      registrationId,
      hospitalName,
      notes,
      recipientRequirements,
      resourceNeeds,
    } = req.body;

    const existingUser = await User.findOne({ email });

    if (existingUser) {
      return res.status(400).json({
        message: "User already exists",
      });
    }

    const user = await User.create({
      role,
      name,
      email,
      password,
      phone,
      city,
      organization,
      registrationId,
      hospitalName,
      notes,
      recipientRequirements:
        role === "ngo" || role === "hospital"
          ? (Array.isArray(recipientRequirements)
              ? recipientRequirements
              : [])
              .map((requirement) => String(requirement).trim())
              .filter(Boolean)
          : [],
      resourceNeeds:
        role === "ngo" || role === "hospital"
          ? normalizeResourceNeeds(resourceNeeds)
          : [],
    });

    res.status(201).json({
      message: "Registration successful",
      user: toPublicUser(user),
    });
  } catch (error) {
    console.error(error);

    res.status(500).json({
      message: "Registration failed",
      error: error.message,
    });
  }
};

const allowedNeedCategories = new Set(["food", "medicine", "clothes", "books", "essentials"]);

const normalizeResourceNeeds = (resourceNeeds = []) => {
  if (!Array.isArray(resourceNeeds)) return [];

  return resourceNeeds
    .filter((need) => need && allowedNeedCategories.has(need.category))
    .map((need) => ({
      category: need.category,
      item: typeof need.item === "string" ? need.item.trim().slice(0, 100) : "",
      maxQuantity:
        need.maxQuantity === "" || need.maxQuantity == null
          ? null
          : Math.max(0, Number(need.maxQuantity) || 0),
      unit: typeof need.unit === "string" ? need.unit.trim().slice(0, 30) : "",
    }))
    .filter((need) => need.item || need.maxQuantity !== null)
    .slice(0, 30);
};

// LOGIN
export const loginUser = async (req, res) => {
  try {
    const { email, password } = req.body;

    const user = await User.findOne({ email });

    if (!user) {
      return res.status(400).json({
        message: "User not found",
      });
    }

    if (user.password !== password) {
      return res.status(400).json({
        message: "Incorrect password",
      });
    }

    res.json({
      message: "Login successful",
      user: toPublicUser(user),
    });
  } catch (error) {
    console.error(error);

    res.status(500).json({
      message: "Login failed",
      error: error.message,
    });
  }
};

// UPDATE RECIPIENT RESOURCE REQUIREMENTS
export const updateRecipientRequirements = async (req, res) => {
  try {
    const { userId } = req.params;
      const { recipientRequirements, resourceNeeds, city } = req.body;

      if (!Array.isArray(recipientRequirements) && !Array.isArray(resourceNeeds)) {
      return res.status(400).json({
        message: "Resource needs must be provided as a list.",
      });
    }

    const cleanedRequirements = [...new Set(
      (Array.isArray(recipientRequirements) ? recipientRequirements : [])
        .filter((requirement) => typeof requirement === "string")
        .map((requirement) => requirement.trim())
        .filter(Boolean)
        .map((requirement) => requirement.slice(0, 100))
    )].slice(0, 30);

    const user = await User.findById(userId);
    if (!user) {
      return res.status(404).json({ message: "Recipient account not found." });
    }

    if (!["ngo", "hospital"].includes(user.role)) {
      return res.status(403).json({ message: "Only NGO and hospital accounts can set resource requirements." });
    }

    user.recipientRequirements = cleanedRequirements;
    if (Array.isArray(resourceNeeds)) {
      user.resourceNeeds = normalizeResourceNeeds(resourceNeeds);
      if (user.resourceNeeds.length > 0 && user.recipientRequirements.length === 0) {
        user.recipientRequirements = user.resourceNeeds.map((need) => need.item || need.category);
      }
    }
    if (typeof city === "string") {
      user.city = city.trim().slice(0, 100);
    }
    await user.save();

    return res.json({
      message: "Resource requirements saved.",
      user: toPublicUser(user),
    });
  } catch (error) {
    if (error.name === "CastError") {
      return res.status(400).json({ message: "Invalid recipient account ID." });
    }

    console.error("Update recipient requirements error:", error.message);
    return res.status(500).json({ message: "Could not save resource requirements." });
  }
};