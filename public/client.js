const socket = io();
const editor = document.getElementById("editor");

editor.addEventListener("input", () => {
  socket.emit("edit", editor.value);
});

socket.on("update", (data) => {
  editor.value = data;
});
