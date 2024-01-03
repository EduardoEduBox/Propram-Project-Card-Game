import React, { useState, useEffect } from "react";
import Card from "./Cards/Card";
import { useSocket } from "../context/SocketContext";
import { useInfluence } from "../context/InfluenceContext";
import { useDeck } from "../context/DeckContext";
import { CardStructure } from "../components/Types";

interface BuyCardsProps {
  roomId: string | undefined; // roomId is optional because useParams could return undefined
  isMyTurn: boolean;
}

const BuyCards: React.FC<BuyCardsProps> = ({ roomId, isMyTurn }) => {
  const { influence, setInfluence } = useInfluence();
  const { addCardToDiscardPile } = useDeck();
  const socket = useSocket();
  const [availableCards, setAvailableCards] = useState<CardStructure[]>([]);

  // Inside your BuyCards component
  useEffect(() => {
    const handleCardsDistribution = (cards: CardStructure[]) => {
      console.log("Cards received from server:", cards);
      setAvailableCards(cards);
    };

    socket?.on("cards distribution", handleCardsDistribution);

    return () => {
      socket?.off("cards distribution", handleCardsDistribution);
    };
  }, [socket]);

  const buyCard = (card: CardStructure, index: number) => {
    if (isMyTurn) {
      if (influence >= card.price) {
        setInfluence(
          (currentInfluence: number) => currentInfluence - card.price
        );
        addCardToDiscardPile(card);
        // Remove only the bought card from available cards
        setAvailableCards((currentCards) =>
          currentCards.filter((_, cardIndex) => cardIndex !== index)
        );

        // Emit an event to update the available cards for all players
        socket?.emit("buy card", { roomId, cardIndex: index });
      } else {
        alert("Not enough influence to buy this card");
      }
    } else {
      alert("It's not your turn");
    }
  };

  return (
    <section className="relative z-50 flex flex-col gap-3 ml-3 w-fit">
      {availableCards.map((card, index) => (
        <div
          key={index}
          className="w-[6rem] text-[.55rem]"
          onClick={() => buyCard(card, index)} // Pass 'index' here
        >
          <Card card={card} />
        </div>
      ))}
    </section>
  );
};

export default BuyCards;
