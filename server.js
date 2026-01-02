const express = require("express");
const http = require("http");
const { Server } = require("socket.io");

const app = express();
const server = http.createServer(app);
const io = new Server(server);

app.use(express.static("public"));

let sharedContent = "";

io.on("connection", (socket) => {
  console.log("User connected");

  // New user gets current content
  socket.emit("update", sharedContent);

  // When user edits
  socket.on("edit", (data) => {
    sharedContent = data;
    socket.broadcast.emit("update", sharedContent);
  });

  socket.on("disconnect", () => {
    console.log("User disconnected");
  });
});

server.listen(3000, () => {
  console.log("Server running on http://localhost:3000");
});
