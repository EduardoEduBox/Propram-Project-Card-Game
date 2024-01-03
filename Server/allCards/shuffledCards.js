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

  // Distribute cards for buying and store them in the cardsForSale object
  const cardsToBuy = combinedDeck.slice(0, 5);
  cardsForSale[roomId] = cardsToBuy;

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

// Assuming you have a way to keep track of the cards available for purchase in each room
let cardsForSale = {};

export function updateAvailableCardsAfterPurchase(io, roomId, cardIndex) {
  // Check if the room has a list of cards for sale
  if (cardsForSale[roomId]) {
    // Remove the bought card from the list using the cardIndex
    cardsForSale[roomId] = cardsForSale[roomId].filter(
      (_, index) => index !== cardIndex
    );

    // Emit the updated list of cards to all players in the room
    io.in(roomId).emit("cards distribution", cardsForSale[roomId]);
  }
}
