import { chatService } from "../services/chat.service.js";

export const chatController = async (req, res) => {
    console.log("Request Body", req.body);  
  try {
    const reply = await chatService(req.body.message);
    res.json({ reply });
  } catch (error) {
    console.error("Error in chatController", error);
    res.status(500).json({ error: "Internal Server Error" });
  }
};
