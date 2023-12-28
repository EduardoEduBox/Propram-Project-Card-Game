import React from "react";
import Card from "./Cards/Card";
import { allCards } from "../allCards/cards";
import { useInfluence } from "../context/InfluenceContext";
import { useDeck } from "../context/DeckContext"; // Import the new useDeck hook
import { CardStructure } from "./Cards/Card";

// gotta remember that when you buy a card it goes to the discart pile

const BuyCards: React.FC = () => {
  const { influence, setInfluence } = useInfluence();
  const { addCardToDiscardPile, discardPile } = useDeck(); // Use addCardToDeck from DeckContext

  const buyCard = (card: CardStructure) => {
    if (influence >= card.price) {
      setInfluence(influence - card.price); // Subtract card price from energy
      addCardToDiscardPile(card); // Add the card to the deck using DeckContext
      // You might want to remove the card from the available cards to buy
      console.log(discardPile);
    } else {
      alert("Not enough energy to buy this card");
    }
  };

  // i am creating this function to split the card into 5, this is just a front end implementation to control the number of cards, we'll change later

  function shuffleArray(array: any) {
    for (let i = array.length - 1; i > 0; i--) {
      const j = Math.floor(Math.random() * (i + 1));
      [array[i], array[j]] = [array[j], array[i]];
    }
  }

  shuffleArray(allCards);
  const mixedFirstFive = allCards.slice(0, 5);

  // ----------------------------------------------------------------------------------------------------------------------------------------------

  return (
    <section className="relative z-50 flex flex-col gap-3 ml-3 w-fit">
      {mixedFirstFive.map((card, index) => (
        <div
          key={index}
          className="w-[6rem] text-[.55rem]"
          onClick={() => buyCard(card)}
        >
          <Card card={card} />
        </div>
      ))}
    </section>
  );
};

export default BuyCards;
