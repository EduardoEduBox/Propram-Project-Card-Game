import React, { useState, useEffect, useRef } from "react";
import gsap from "gsap";
import { allCards } from "../../allCards/cards";
import { CardStructure } from "../Cards/Card";
import CardComponent from "../Cards/CardComponent";
import { useDeck } from "../../context/DeckContext";

const YourHand: React.FC = () => {
  const [hand, setHand] = useState<CardStructure[]>([]);
  const handRef = useRef<HTMLDivElement>(null);

  const handlePlayCard = (cardIndex: number) => {
    const deckContext = useDeck();
    deckContext.playCardFromHand(cardIndex);
  };

  useEffect(() => {
    const initialHand = allCards.sort(() => 0.5 - Math.random()).slice(0, 5);
    setHand(initialHand);
  }, []);

  useEffect(() => {
    const handElement = handRef.current;
    if (handElement) {
      const cards = Array.from(handElement.children);
      const spreadAmount = 142;

      const handleMouseOver = () => {
        gsap.to(cards, {
          x: (i) => i * spreadAmount,
          rotate: (i) => i * 2,
          stagger: 0.1,
          ease: "power3.out",
        });
      };

      const handleMouseOut = () => {
        gsap.to(cards, {
          x: 0,
          rotate: 0,
          stagger: 0.1,
          ease: "power3.in",
        });
      };

      handElement.addEventListener("mouseover", handleMouseOver);
      handElement.addEventListener("mouseout", handleMouseOut);

      return () => {
        handElement.removeEventListener("mouseover", handleMouseOver);
        handElement.removeEventListener("mouseout", handleMouseOut);
      };
    }
  }, [hand]);

  return (
    <div
      ref={handRef}
      className="relative w-36 h-[200px] rounded-xl shadow-card text-xs z-50"
    >
      {hand.map((card, index) => (
        <CardComponent
          key={index}
          card={card}
          index={index}
          style={{ bottom: `${index * 5}px`, zIndex: index }}
        />
      ))}
    </div>
  );
};

export default YourHand;
