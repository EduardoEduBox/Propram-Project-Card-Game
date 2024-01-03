// lifeHandler.js
const playerLives = {};

export function initializePlayerLives(io, roomId) {
  // Initialize lives when the game starts
  playerLives[roomId] = { player1: 100, player2: 100 };
  // Emit initial life values to both players
  io.in(roomId).emit("update life", { player1: 100, player2: 100 });
}

export function attackOpponent(io, roomId, attackerId, attackValue) {
  // Declare damage variable at the top of the function scope
  let damage;

  const opponentId = Object.keys(playerLives[roomId]).find(
    (id) => id !== attackerId
  );

  if (opponentId) {
    // Calculate damage and assign it to the variable
    damage = attackValue + Math.floor(Math.random() * 20) + 1; // attackValue + roll d20

    playerLives[roomId][opponentId] = Math.max(
      playerLives[roomId][opponentId] - damage,
      0
    );

    // Now you can log the damage because it's defined in this scope
    console.log(`Attacking: ${attackerId}, Damage: ${damage}, Room: ${roomId}`);
    console.log(`Updated Lives:`, playerLives[roomId]);

    // Emit updated life to both players
    io.in(roomId).emit("update life", {
      playerId: opponentId,
      life: playerLives[roomId][opponentId],
    });
  }
}
