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

// Function to start the game, distribute cards for buying, and initial hand
export function startGameAndDistributeCards(io, roomId, activeRooms) {
  // Shuffle the combined deck for randomness
  shuffleArray(combinedDeck);

  // Distribute cards for buying
  const cardsToBuy = combinedDeck.slice(0, 5);
  setTimeout(() => {
    io.in(roomId).emit("cards distribution", cardsToBuy);
  }, 100);

  // Distribute initial hand to each player
  const initialHandSize = 5;
  activeRooms[roomId].players.forEach((playerSocketId) => {
    const initialHand = combinedDeck.slice(5, 5 + initialHandSize); // Get next set of cards
    io.to(playerSocketId).emit("initial hand", initialHand);
  });
}
