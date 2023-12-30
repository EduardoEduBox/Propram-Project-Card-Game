import { cards } from "./cards.js";
import { spells } from "./spells.js";

const combinedDeck = [...cards, ...spells];
shuffleArray(combinedDeck);

// Function to shuffle an array
function shuffleArray(array) {
  for (let i = array.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1));
    [array[i], array[j]] = [array[j], array[i]];
  }
}

// Function to start the game and distribute cards
export function startGameAndDistributeCards(io, roomId) {
  // Shuffle the combined deck each time to ensure randomness
  shuffleArray(combinedDeck);

  // Take the first 5 cards/spells after shuffling
  const cardsToDistribute = combinedDeck.slice(0, 5);

  console.log(`Distributing cards to room ${roomId}:`, cardsToDistribute); // Log the cards being distributed

  // Emit the cards to both players in the room
  //   io.in(roomId).emit("cards distribution", cardsToDistribute);
  setTimeout(() => {
    io.in(roomId).emit("cards distribution", cardsToDistribute);
  }, 100);
}
