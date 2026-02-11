import mongoose from "mongoose";

const conversationSchema = new mongoose.Schema(
  {
    role: {
      type: String,
      enum: ["system", "user", "assistant"],
      required: true,
    },
    content: {
      type: String,
      required: true,
    },
  },
  { timestamps: true },
);

const Conversation = mongoose.model("Conversation", conversationSchema);
export default Conversation;