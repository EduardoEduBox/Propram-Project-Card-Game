const playerLives = {};

export function initializePlayerLives(io, roomId, player1Id, player2Id) {
  // Initialize lives with specific player IDs
  playerLives[roomId] = {
    [player1Id]: 100,
    [player2Id]: 100,
  };
  // Emit initial life values to both players
  io.to(player1Id).emit("update life", { playerId: player1Id, life: 100 });
  io.to(player2Id).emit("update life", { playerId: player2Id, life: 100 });
}

export function attackOpponent(io, roomId, attackerId, attackValue) {
  const opponentId = Object.keys(playerLives[roomId]).find(
    (id) => id !== attackerId
  );

  if (opponentId) {
    const damage = attackValue + Math.floor(Math.random() * 20) + 1;
    playerLives[roomId][opponentId] = Math.max(
      playerLives[roomId][opponentId] - damage,
      0
    );

    // Emit updated life to the opponent
    io.to(opponentId).emit("update life", {
      playerId: opponentId,
      life: playerLives[roomId][opponentId],
      isEnemyUpdate: true, // Indicates this is an enemy update
    });

    // Log for debugging
    console.log(
      `Attacking: ${attackerId}, Opponent: ${opponentId}, Damage: ${damage}, Room: ${roomId}`
    );
  }
}
