const CATEGORY_TERMS = {
  food: ["food", "meal", "meals", "groceries", "grocery", "nutrition", "biryani", "rice", "bread"],
  medicine: ["medicine", "medicines", "medical", "medicine", "health", "drug", "drugs", "pharmacy", "pharmaceutical", "paracetamol", "cetirizine", "first aid"],
  clothes: ["clothes", "clothing", "apparel", "garment", "garments", "wear"],
  books: ["book", "books", "education", "educational", "school", "learning", "study"],
  essentials: ["essential", "essentials", "hygiene", "toiletries", "supplies", "household"],
};

const normalize = (value = "") => value
  .toLocaleLowerCase()
  .replace(/[^a-z0-9\s]/g, " ")
  .replace(/\s+/g, " ")
  .trim();

const includesPhrase = (text, phrase) => {
  const normalizedPhrase = normalize(phrase);
  return normalizedPhrase.length > 0 && ` ${text} `.includes(` ${normalizedPhrase} `);
};

const parseQuantity = (value) => {
  const match = String(value ?? "").trim().match(/^(\d+(?:\.\d+)?)\s*(.*)$/);
  if (!match) return null;

  return {
    amount: Number(match[1]),
    unit: normalize(match[2]),
  };
};

const unitsMatch = (left, right) => {
  const normalizeUnit = (unit) => normalize(unit).replace(/s$/, "");
  return !left || !right || normalizeUnit(left) === normalizeUnit(right);
};

const getRequirementFit = (donation, recipient) => {
  const resourceNeeds = Array.isArray(recipient.resourceNeeds)
    ? recipient.resourceNeeds
    : [];
  const donationType = normalize(donation.type);
  const searchableDonation = normalize(`${donation.itemName} ${donation.type} ${donation.description || ""}`);
  const synonyms = CATEGORY_TERMS[donationType] || [donationType];

  const structuredNeed = resourceNeeds.find((need) => {
    if (normalize(need.category) !== donationType) return false;
    const item = normalize(need.item);
    if (!item) return true;
    return includesPhrase(searchableDonation, item) ||
      item.split(" ").some((word) => word.length > 3 && searchableDonation.includes(word));
  });

  const requirements = [
    ...(Array.isArray(recipient.recipientRequirements) ? recipient.recipientRequirements : []),
    ...resourceNeeds.map((need) => need.item || need.category),
    ...(!recipient.recipientRequirements?.length && recipient.notes ? [recipient.notes] : []),
  ].map(normalize).filter(Boolean);

  if (requirements.length === 0 && resourceNeeds.length === 0) {
    return {
      points: 24,
      matchedNeed: null,
      insight: "No specific resource requirements are listed; category match is based on the donation type.",
      reason: "No specific needs were listed, so the score uses the donation category and other available details.",
    };
  }

  if (structuredNeed) {
    const requestedAmount = Number(structuredNeed.maxQuantity);
    const hasRequestedAmount = Number.isFinite(requestedAmount) && requestedAmount > 0;
    const needDescription = structuredNeed.item || structuredNeed.category;

    return {
      points: 40,
      matchedNeed: structuredNeed,
      insight: hasRequestedAmount
        ? `Matches your ${needDescription} need (up to ${requestedAmount} ${structuredNeed.unit || "units"}).`
        : `${donation.type.charAt(0).toUpperCase()}${donation.type.slice(1)} category matches your listed need${structuredNeed.item ? ` for ${structuredNeed.item}` : ""}.`,
      reason: `The donation matches your organization's ${needDescription} resource need.`,
    };
  }

  const exactMatch = requirements.some((requirement) =>
    synonyms.some((term) => includesPhrase(requirement, term)) ||
    includesPhrase(searchableDonation, requirement) ||
    requirement.split(" ").filter((word) => word.length > 3 && searchableDonation.includes(word)).length >= 2
  );

  if (exactMatch) {
    return {
      points: 40,
      matchedNeed: null,
      insight: `${donation.type.charAt(0).toUpperCase()}${donation.type.slice(1)} requirement matched.`,
      reason: `The donation category (${donation.type}) matches a resource need listed by the recipient.`,
    };
  }

  const partialMatch = requirements.some((requirement) =>
    requirement.split(" ").some((word) => word.length > 3 && synonyms.includes(word))
  );

  if (partialMatch) {
    return {
      points: 24,
      matchedNeed: null,
      insight: "Some requirement keywords overlap; confirm the exact item need with the recipient.",
      reason: "Some requirement keywords overlap, but the category match is uncertain.",
    };
  }

  return {
    points: 8,
    matchedNeed: null,
    insight: "The donation type does not clearly match the listed requirements.",
    reason: `The recipient's listed needs do not clearly mention ${donation.type}.`,
  };
};

const getQuantityFit = (donation, matchedNeed) => {
  const available = parseQuantity(donation.quantity);
  const requested = matchedNeed && Number(matchedNeed.maxQuantity) > 0
    ? { amount: Number(matchedNeed.maxQuantity), unit: normalize(matchedNeed.unit) }
    : null;

  if (!available) {
    return { points: 0, insight: "Donation quantity could not be read; confirm the amount with the donor." };
  }

  if (!requested) {
    return { points: 10, insight: `Quantity listed: ${donation.quantity}; add a requested amount to compare supply with need.` };
  }

  if (!unitsMatch(available.unit, requested.unit)) {
    return {
      points: 5,
      insight: `Available quantity is ${donation.quantity}; your need is up to ${requested.amount} ${matchedNeed.unit}. The units differ, so confirm the amount.`,
    };
  }

  if (available.amount >= requested.amount) {
    return {
      points: 10,
      insight: `Quantity is suitable: ${donation.quantity} available; your stated need is up to ${requested.amount} ${matchedNeed.unit}.`,
    };
  }

  const ratio = available.amount / requested.amount;
  return {
    points: Math.max(0, Math.round(ratio * 10)),
    insight: `Partial quantity: ${donation.quantity} available of your requested ${requested.amount} ${matchedNeed.unit}.`,
  };
};

const getLocationFit = (donation, recipient) => {
  const location = normalize(donation.location);
  const city = normalize(recipient.city);

  if (!location || !city) {
    return {
      points: 15,
      note: "Location could not be compared because a city or donation location is missing.",
      insight: "Confirm delivery distance before arranging pickup.",
    };
  }

  if (location.includes(city) || city.includes(location)) {
    return {
      points: 25,
      note: `Same area: donation location (${donation.location}) is near the recipient city (${recipient.city}).`,
      insight: "Location appears local; coordinate pickup with the donor.",
    };
  }

  return {
    points: 12,
    note: `Different locations: donation is in ${donation.location}; recipient is in ${recipient.city}. Transportation may be required.`,
    insight: "Different location; transportation may be required.",
  };
};

const getExpiryFit = (donation) => {
  if (!donation.expiryDate) {
    return { points: 18, insight: "No expiry date was provided; verify usability before accepting." };
  }

  const daysUntilExpiry = Math.ceil((new Date(donation.expiryDate).getTime() - Date.now()) / 86_400_000);
  if (!Number.isFinite(daysUntilExpiry)) {
    return { points: 12, insight: "Expiry date could not be checked; verify it with the donor." };
  }
  if (daysUntilExpiry < 0) {
    return { points: 0, insight: "Expiry date has passed; do not accept without verifying safety." };
  }
  if (daysUntilExpiry <= 3) {
    return { points: 8, insight: `Expires in ${daysUntilExpiry} day${daysUntilExpiry === 1 ? "" : "s"}; arrange immediate use if accepted.` };
  }
  if (daysUntilExpiry <= 7) {
    return { points: 16, insight: `Expires in ${daysUntilExpiry} days; confirm it can be used in time.` };
  }
  return { points: 25, insight: "Expiry date is in the future with more than a week remaining." };
};

export const getLocalMatch = (donation, recipient) => {
  const requirementFit = getRequirementFit(donation, recipient);
  const locationFit = getLocationFit(donation, recipient);
  const expiryFit = getExpiryFit(donation);
  const quantityFit = getQuantityFit(donation, requirementFit.matchedNeed);
  const score = Math.max(0, Math.min(100, Math.round(
    requirementFit.points + locationFit.points + expiryFit.points + quantityFit.points
  )));

  return {
    match: score >= 70,
    score,
    reason: requirementFit.reason,
    locationNote: locationFit.note,
    insights: [
      requirementFit.insight,
      quantityFit.insight,
      expiryFit.insight,
      locationFit.insight,
    ],
    source: "local",
  };
};
