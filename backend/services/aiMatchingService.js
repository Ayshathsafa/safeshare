import { GoogleGenAI } from "@google/genai";

const sleep = (ms) => new Promise((resolve) => setTimeout(resolve, ms));

const generateWithRetry = async (genAI, prompt) => {
  const maxAttempts = 3;

  for (let attempt = 1; attempt <= maxAttempts; attempt += 1) {
    try {
      return await genAI.models.generateContent({
        model: "gemini-3.8-flash",
        contents: prompt,
        config: {
          responseMimeType: "application/json",
        },
      });
    } catch (error) {
      const details = `${error?.status ?? ""} ${error?.message ?? ""}`;
      const isTemporary = /\b(502|503|504)\b|UNAVAILABLE|INTERNAL/i.test(details);

      if (!isTemporary || attempt === maxAttempts) {
        throw error;
      }

      await sleep(1000 * 2 ** (attempt - 1));
    }
  }
};

export const getAIMatch = async (donation, recipient) => {
  const apiKey = process.env.GEMINI_API_KEY;
  if (!apiKey) {
    throw new Error("GEMINI_API_KEY is not configured on the backend");
  }

  // Create the client when a request is handled, after dotenv has loaded.
  const genAI = new GoogleGenAI({ apiKey });

  const prompt = `
You are the AI matching system for SafeShare, a secure food and medicine redistribution platform.

Donation:
- Item: ${donation.itemName}
- Type: ${donation.type}
- Quantity: ${donation.quantity}
- Location: ${donation.location}
- Expiry Date: ${donation.expiryDate || "Not specified"}
- Description: ${donation.description || "None"}

Recipient:
- Name: ${recipient.name}
- Role: ${recipient.role}
- City: ${recipient.city || "Not specified"}
- Requirements: ${recipient.recipientRequirements?.join(", ") || recipient.notes || "None provided"}
- Structured resource needs: ${recipient.resourceNeeds?.map((need) => `${need.category}: ${need.item || "any item"}, up to ${need.maxQuantity ?? "unspecified"} ${need.unit || "units"}`).join("; ") || "None provided"}

Analyze whether this donation is suitable for this recipient.

Consider:
1. Whether the donation type matches the recipient's requirements.
2. Quantity.
3. Location. Different locations should reduce the score but should NOT automatically reject the match.
4. Expiry date, especially for food and medicine.
5. Overall suitability.

Give a score from 0 to 100. Scores of 90-100 are a strong match, 70-89 are a possible match, and 0-69 are a low match. Explain which requirement or donation type matched (or did not match). Compare the donation location with the recipient city; if they differ or either is unknown, clearly say so in locationNote and mention transportation may be required when the locations differ. Do not claim requirements or locations that are not provided.

Return ONLY valid JSON in this exact format:

{
  "match": true,
  "score": 85,
  "reason": "Short explanation of why this donation matches.",
  "locationNote": "Short explanation about the location."
}

The score must be between 0 and 100.
`;

  const response = await generateWithRetry(genAI, prompt);

  const text = response.text?.trim();
  if (!text) {
    throw new Error("The AI provider returned an empty response");
  }

  try {
    const result = JSON.parse(text);
    if (
      typeof result.match !== "boolean" ||
      !Number.isFinite(result.score) ||
      result.score < 0 ||
      result.score > 100 ||
      typeof result.reason !== "string" ||
      typeof result.locationNote !== "string"
    ) {
      throw new Error("AI response does not match the expected format");
    }
    return { ...result, match: result.score >= 70 };
  } catch {
    console.error("AI response parsing failed");
    throw new Error("Invalid AI response");
  }
};