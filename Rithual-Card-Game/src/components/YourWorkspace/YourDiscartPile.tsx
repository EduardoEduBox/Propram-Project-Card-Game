import React from "react";
import { useDeck } from "../../context/DeckContext";

const YourDiscartPile: React.FC = () => {
  const { discardPile } = useDeck(); // Assuming you have a discardPile in your context

  return (
    <div className="relative w-36 h-3/4 rounded-xl shadow-card">
      {discardPile.map((card, index) => {
        // Calculate the offset for each card
        const yOffset = index * 3; // 5px for each card in the stack

        return (
          <div
            key={index}
            className="absolute flex flex-col items-center justify-center w-full h-full text-center bg-cover border rounded-md border-stone-700 bg-card-back bg-stone-400 shadow-card" // Assuming bg-card-back is the CSS class for the card back image
            style={{
              bottom: `${yOffset}px`, // Offset each card by 5px
              zIndex: index, // Ensure cards stack correctly
            }}
          >
            BACK OF THE CARD
          </div>
        );
      })}
    </div>
  );
};

export default YourDiscartPile;
