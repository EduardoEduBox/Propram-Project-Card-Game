export function initializeTurnLogic(roomId, activeRooms, io) {
  // Check if the room exists and has players initialized
  if (!activeRooms[roomId] || !Array.isArray(activeRooms[roomId].players)) {
    console.error(
      `Room with ID ${roomId} does not exist or has not been initialized correctly.`
    );
    return; // Exit the function if the room isn't set up correctly
  }

  let currentPlayerIndex = 0;
  activeRooms[roomId].turnTimer = setInterval(() => {
    // Safeguard with optional chaining
    const players = activeRooms[roomId]?.players;
    if (players) {
      // Switch turn
      currentPlayerIndex = (currentPlayerIndex + 1) % players.length;
      // Notify players
      players.forEach((playerSocketId, index) => {
        const isCurrentPlayer = index === currentPlayerIndex;
        io.to(playerSocketId).emit("turn", { isYourTurn: isCurrentPlayer });
      });
    } else {
      // Log an error if players are not found
      console.error(`Players not found for room ID: ${roomId}`);
      clearInterval(activeRooms[roomId].turnTimer); // Stop the interval if there are no players
    }
  }, 60000); // Switch turn every 60 seconds
}
