// // chatMessages.js
// export const handleChatMessage = (socket, io, activeRooms) => {
//   socket.on("chat message", ({ message, roomId }) => {
//     console.log("Received message:", message, "in room:", roomId);
//     if (roomId && activeRooms[roomId]) {
//       // Emit the message to the specified room
//       socket.to(roomId).emit("chat message", message);
//     }
//   });
// };

// chatMessages.js
export const handleChatMessage = (socket, io) => {
  socket.on("chat message", (message) => {
    console.log("Received message:", message);
    io.emit("chat message", message); // Emit to all connected clients
  });
};
