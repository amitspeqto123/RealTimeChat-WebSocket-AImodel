
import express from 'express'; 


const app = express();
// middlewares
app.use(express.json());
app.use(express.static("public"));

// Routes
import chatRoute from "./routes/chat.route.js";

app.use("/real-chat", chatRoute);

export default app;