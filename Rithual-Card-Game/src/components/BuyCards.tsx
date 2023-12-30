import React, { useState, useEffect } from "react";
import Card from "./Cards/Card";
import { useSocket } from "../context/SocketContext";
import { useInfluence } from "../context/InfluenceContext";
import { useDeck } from "../context/DeckContext";
import { CardStructure } from "./Cards/Card";

const BuyCards: React.FC = () => {
  const { influence, setInfluence } = useInfluence();
  const { addCardToDiscardPile } = useDeck();
  const socket = useSocket();
  const [availableCards, setAvailableCards] = useState<CardStructure[]>([]);

  useEffect(() => {
    const handleCardsDistribution = (cards: CardStructure[]) => {
      console.log("Cards received from server:", cards); // This should log the cards received
      setAvailableCards(cards);
    };

    socket?.on("cards distribution", handleCardsDistribution);

    return () => {
      socket?.off("cards distribution", handleCardsDistribution);
    };
  }, [socket]);

  const buyCard = (card: CardStructure) => {
    if (influence >= card.price) {
      // Correctly type the parameter and ensure the functional update form is allowed
      setInfluence((currentInfluence: number) => currentInfluence - card.price);
      addCardToDiscardPile(card);
      // Remove the card from available cards if needed
      setAvailableCards((currentCards) =>
        currentCards.filter((c) => c.name !== card.name)
      );
    } else {
      alert("Not enough energy to buy this card");
    }
  };

  return (
    <section className="relative z-50 flex flex-col gap-3 ml-3 w-fit">
      {availableCards.map((card, index) => (
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
