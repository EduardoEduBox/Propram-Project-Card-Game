import React from "react";
import { useDeck } from "../../context/DeckContext";

const YourCards: React.FC = () => {
  const { yourCardsPile } = useDeck();

  return (
    <div className="relative w-36 h-3/4 rounded-xl shadow-card">
      {yourCardsPile.map((card, index) => {
        // Calculate the offset for each card
        const yOffset = index * 3; // 3px for each card in the stack

        return (
          <div
            key={index}
            className="absolute flex flex-col items-center justify-center w-full h-full text-center bg-cover border rounded-md border-stone-700 bg-card-back bg-stone-400 shadow-card" // bg-card-back for the back image of the card
            style={{
              bottom: `${yOffset}px`, // Offset each card by 3px
              zIndex: index, // Ensure cards stack correctly
            }}
          >
            {/* Displaying the back of the card */}
            <span className="opacity-70">Card Back</span>
          </div>
        );
      })}
    </div>
  );
};

export default YourCards;
