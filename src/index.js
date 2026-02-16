import "dotenv/config";
import app from "./app.js";

import OpenAI from "openai";
import promptSync from "prompt-sync";
import http from "http";
import { initSocket } from "./socket/index.js";
import { realTimeChatDatabase } from "./config/db.js";

const server = http.createServer(app);
const PORT = process.env.PORT || 8080;
const promt = promptSync();

// Socket.io setup
initSocket(server);

const client = new OpenAI({
  baseURL: "https://openrouter.ai/api/v1",
  apiKey: process.env.OPENROUTER_API_KEY,
});

// const context = [
//   {
//     role: "system",
//     content: "Only text, no code, no markdown, no emojis, no lists, no formatting.",
//   },
//   {
//     role: "user",
//     content: "Five programming languages that are good for beginners.",
//   },
// ];

// Don't use if use conversation array becayse it add a new context on every request
// const buildMessages = (userMessage) => {
//   return [
//     {
//       role: "system",
//       content:
//         "You are a chat assistant, reply only in plain text without any formatting or markdown.",
//     },
//     { role: "user", content: userMessage },
//   ];
// };
// const conversation = [
//   {
//     role: "system",
//     content:
//       "You are a chat assistant, reply only in plain text without any formatting.",
//   },
// ];

async function chat() {
  console.log("Request sent...");
  //const userInput = promt("Enter your message: ");
  const response = await client.chat.completions.create({
    model: "openai/gpt-oss-20b:free",
    messages: [
      {
        role: "system",
        content:
          "You are an elite athlete mindset coach.Speak direct, disciplined, no excuses.Give practical action steps.Keep responses short and powerful",
      },
      {
        role: "user",
        content: "I feel lazy and don’t want to work today.",
      },
    ],
  });
  console.log(response.choices[0].message.content);
}

//chat();

// app.use("/chat", async (req, res) => {
//   try {
//     const { message } = req.body;
//     if (!message) {
//       return res.status(400).json({ error: "Message is required" });
//     }
//     const response = await client.chat.completions.create({
//       model: "openai/gpt-oss-20b:free",
//       messages: buildMessages(message),
//     });
//     const reply = response.choices[0].message.content;
//     res.status(200).json({ reply });
//   } catch (error) {
//     console.error("Error in /chat route:", error);
//     res.status(500).json({ error: "Internal Server Error" });
//   }
// });

// app.use("/chat", async (req, res) => {
//   console.log("Request Body", req.body);
//   try {
//     const { message } = req.body;
//     if (!message) {
//       return res.status(400).json({ error: "Message is required" });
//     }
//     // user message is added to conversation array
//     conversation.push({ role: "user", content: message });
//     const response = await client.chat.completions.create({
//       model: "openai/gpt-oss-20b:free",
//       messages: conversation,
//     });
//     const reply = response.choices[0].message.content;
//     res.status(200).json({ reply });
//   } catch (error) {
//     console.error("Error in /chat route:", error);
//     res.status(500).json({ error: "Internal Server Error" });
//   }
// });
realTimeChatDatabase();
server.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});
