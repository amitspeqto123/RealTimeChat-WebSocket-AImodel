import Conversation from "../models/conversation.model.js";
import OpenAI from "openai";

const conversation = [
  {
    role: "system",
    content:
      "You are a chat assistant, reply only in plain text without any formatting.",
  },
];
const client = new OpenAI({
  baseURL: "https://openrouter.ai/api/v1",
  apiKey: process.env.OPENROUTER_API_KEY,
});

export const chatService = async (message) => {
  if (!message || typeof message !== "string") {
    throw new Error("Message is required");
  }
  //conversation.push({ role: "user", content: message }); array wala hai
  await Conversation.create({
    role: "user",
    content: message,
  });
  const conversation = await Conversation.find().sort({ createdAt: 1 });
  const response = await client.chat.completions.create({
    model: "openai/gpt-oss-20b:free",
    //model: "meta-llama/llama-3.2-3b-instruct:free", these are free models just like gpt-4 gpt-4o-mini etc
    //model: "tngtech/deepseek-r1t2-chimera:free",
    //model: "google/gemma-3-12b-it:free",
    messages: conversation.map((c) => ({ role: c.role, content: c.content })),
  });
  const reply = response.choices[0].message.content;
  //conversation.push({ role: "assistant", content: reply }); temp array for previous chat or you can also use database
  await Conversation.create({
    role: "assistant",
    content: reply,
  });
  return reply;
};
