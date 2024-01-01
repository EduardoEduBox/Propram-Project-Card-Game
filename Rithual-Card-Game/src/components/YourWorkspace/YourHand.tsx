import React, { useEffect, useRef } from "react";
import gsap from "gsap";
import CardComponent from "../Cards/CardComponent";
import { useDeck } from "../../context/DeckContext";

const YourHand: React.FC = () => {
  const handRef = useRef<HTMLDivElement>(null);
  const { hand } = useDeck();

  useEffect(() => {
    const handElement = handRef.current;
    if (handElement) {
      const cards = Array.from(handElement.children);
      const spreadAmount = 142;

      const handleMouseOver = () => {
        console.log(cards);

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
