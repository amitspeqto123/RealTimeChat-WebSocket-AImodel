// const socket = io();

// const chatBox = document.getElementById("chatBox");
// const input = document.getElementById("messageInput");
// const btn = document.getElementById("sendBtn");

// btn.addEventListener("click", () => {
//   const message = input.value;
//   if (!message) return;

//   appendMessage("You", message);

//   socket.emit("user-message", message);

//   input.value = "";
// });

// socket.on("ai-reply", (reply) => {
//   appendMessage("AI", reply);
// });

// function appendMessage(sender, text) {
//   const p = document.createElement("p");
//   p.innerText = `${sender}: ${text}`;
//   chatBox.appendChild(p);
// }
