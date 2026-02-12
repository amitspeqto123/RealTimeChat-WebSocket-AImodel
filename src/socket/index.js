import { Server } from "socket.io";
import { chatService } from "../services/chat.service.js";

let io;

export const initSocket = (server) => {
  io = new Server(server, {
    cors: {
      origin: "*",
      methods: ["GET", "POST"],
    },
  });

  io.on("connection", (Socket) => {
    console.log("Socket connected: ", Socket.id);

    // User message event
    Socket.on("user-message", async (message) => {
      console.log("Received message from client: ", message);
      try {
        const chat = await chatService(message);
        console.log("Sending reply to client: ", chat);
        Socket.emit("ai-reply", chat);
        io.emit("ai-reply", chat); // Broadcast to all clients
      } catch (error) {
        console.error("Error in user-message event: ", error);
        Socket.emit("ai-reply", "Sorry, I couldn't process your message.");
      }
    });
    Socket.on("disconnect", () => {
      console.log("Socket disconnected: ", Socket.id);
    });
  });
};
