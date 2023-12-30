// influence.js
export function handleInfluence(socket, activeRooms) {
  socket.on("update influence", (amount) => {
    const roomId = Object.keys(socket.rooms).find((id) => id !== socket.id);
    const room = activeRooms[roomId];
    if (room) {
      // Logic to update influence for the player and notify both players in the room
      // This is a placeholder logic. You need to implement the actual logic based on your game rules.
      room.players.forEach((playerId) => {
        socket.to(playerId).emit("influence updated" /* new influence value */);
      });
    }
  });
}
