import OpenAI from "openai";
import dotenv from "dotenv";
dotenv.config();

const apiKey = process.env.OPENROUTER_API_KEY || process.env.OPENAI_API_KEY;
const useOpenRouter = Boolean(process.env.OPENROUTER_API_KEY);

if (!apiKey) {
  console.error(
    "Missing API key: set OPENROUTER_API_KEY (for OpenRouter) or OPENAI_API_KEY (for OpenAI) in your .env"
  );
  throw new Error(
    "Missing API key: set OPENROUTER_API_KEY or OPENAI_API_KEY in your environment"
  );
}

const clientOptions = { apiKey };
if (useOpenRouter) {
  clientOptions.baseURL = "https://openrouter.ai/api/v1";
}

export const openaiClient = new OpenAI(clientOptions);

// Log which provider and baseURL are used (mask key)
const maskedKey = apiKey ? `${apiKey.slice(0, 4)}...${apiKey.slice(-4)}` : "<none>";
console.info(
  `OpenAI client initialized. provider=${useOpenRouter ? 'OpenRouter' : 'OpenAI'} baseURL=${clientOptions.baseURL || 'https://api.openai.com'} key=${maskedKey}`
);
