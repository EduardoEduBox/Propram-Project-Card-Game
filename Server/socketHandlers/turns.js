export function initializeTurnLogic(roomId, activeRooms, io) {
  let currentPlayerIndex = 0;
  activeRooms[roomId].turnTimer = setInterval(() => {
    // Switch turn
    currentPlayerIndex =
      (currentPlayerIndex + 1) % activeRooms[roomId].players.length;
    // Notify players
    activeRooms[roomId].players.forEach((playerSocketId, index) => {
      const isCurrentPlayer = index === currentPlayerIndex;
      io.to(playerSocketId).emit("turn", { isYourTurn: isCurrentPlayer });
    });
  }, 10000); // Switch turn every 10 seconds
}
