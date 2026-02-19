const { GoogleGenerativeAI } = require("@google/generative-ai");
const AppError = require("../utilities/AppError");

const formatDateInTimeZone = (date, timeZone) => {
  // en-CA yields YYYY-MM-DD
  return new Intl.DateTimeFormat("en-CA", {
    timeZone,
    year: "numeric",
    month: "2-digit",
    day: "2-digit",
  }).format(date);
};

const normalizeRelativeDates = (inputText, refs) => {
  if (typeof inputText !== "string") return inputText;
  const { today, yesterday, dayBeforeYesterday } = refs;
  return inputText
    .replace(/\bday\s+before\s+yesterday\b/gi, dayBeforeYesterday)
    .replace(/\byesterday\b/gi, yesterday)
    .replace(/\btoday\b/gi, today);
};

const getJsonFromModelText = (rawText) => {
  if (typeof rawText !== "string") {
    throw new AppError("AI response was not text", 502);
    
  }

  // Handle common Gemini formatting like ```json ... ```
  const stripped = rawText
    .trim()
    .replace(/^```(?:json)?\s*/i, "")
    .replace(/\s*```\s*$/i, "")
    .trim();

  // If the model returned extra text, try to extract the JSON object.
  const firstBrace = stripped.indexOf("{");
  const lastBrace = stripped.lastIndexOf("}");
  const candidate = firstBrace !== -1 && lastBrace !== -1 && lastBrace > firstBrace
    ? stripped.slice(firstBrace, lastBrace + 1)
    : stripped;

  try {
    return JSON.parse(candidate);
  } catch (e) {
    throw new AppError("AI returned invalid JSON. Try rephrasing the sentence.", 502);
  }
};

const parseExpenseWithAI = async (text) => {
  const apiKey = process.env.GEMINI_API_KEY;
  if (!apiKey) {
    throw new AppError(
      "GEMINI_API_KEY is missing. Add it to server/.env and restart the server.",
      500
    );
  }

  const genAI = new GoogleGenerativeAI(apiKey);
  const modelName = process.env.GEMINI_MODEL || "gemini-2.5-flash";
  const model = genAI.getGenerativeModel({ model: modelName });

  const timeZone = process.env.APP_TIMEZONE || Intl.DateTimeFormat().resolvedOptions().timeZone || "UTC";
  const now = Date.now();
  const today = formatDateInTimeZone(new Date(now), timeZone);
  const yesterday = formatDateInTimeZone(new Date(now - 24 * 60 * 60 * 1000), timeZone);
  const dayBeforeYesterday = formatDateInTimeZone(new Date(now - 2 * 24 * 60 * 60 * 1000), timeZone);
  const normalizedText = normalizeRelativeDates(text, { today, yesterday, dayBeforeYesterday });

    const prompt = `
You are a data extraction engine for an expense tracking app.

Your job is to convert a sentence into a STRICT JSON object.

You MUST follow these rules:

1. Return ONLY valid JSON. No explanation, no extra text.
2. Choose "category" ONLY from this list:
   Food, Utilities, Shopping, Travel, Rent, Entertainment, Other
3. Choose "paymentMode" ONLY from this list:
   Cash, UPI, Debit Card, Credit Card, Net Banking, Other
4. "amount" must be a number.
5. "date" must be in YYYY-MM-DD format.
6. "note" should be a short description of the expense.
7. If unsure about category or payment mode, choose "Other".
8. Interpret relative date words using THESE references (timezone aware):
  - Today is ${today} (${timeZone})
  - Yesterday is ${yesterday}
  - Day before yesterday is ${dayBeforeYesterday}

Return JSON in EXACTLY this format:

{
  "amount": number,
  "category": string,
  "paymentMode": string,
  "note": string,
  "date": "YYYY-MM-DD"
}

Sentence:
"${normalizedText}"
`;


    try {
      const result = await model.generateContent(prompt);
      const response = await result.response;
      const aiText = response.text();
      return getJsonFromModelText(aiText);
    } catch (err) {
      const message = (err && err.message) ? err.message : String(err);

      // Most common case for your exact error string: network/proxy/firewall/DNS/TLS issues.
      if (/fetch failed/i.test(message)) {
        throw new AppError(
          "Failed to reach Google Gemini API (fetch failed). Check internet access/firewall/proxy and ensure you're on Node 18+.",
          503
        );
      }

      // Bubble up other GoogleGenerativeAI errors with a cleaner status.
      throw new AppError(`Gemini request failed: ${message}`, 502);
    }
};

module.exports = parseExpenseWithAI;
