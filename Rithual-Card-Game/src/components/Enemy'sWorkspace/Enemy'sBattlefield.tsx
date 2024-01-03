import React, { useState, useEffect } from "react";
import { useSocket } from "../../context/SocketContext";
import Card from "../Cards/Card";
import { CardStructure } from "../Types"; // Import your type for card structure

const EnemysBattlefield: React.FC = () => {
  const [enemySlots, setEnemySlots] = useState<(CardStructure | null)[]>(
    Array(5).fill(null)
  );
  const socket = useSocket();

  useEffect(() => {
    // Typing the data received from socket
    const handleCardPlacement = (data: {
      card: CardStructure;
      position: number;
    }) => {
      setEnemySlots((prevSlots) => {
        const newSlots = [...prevSlots];
        newSlots[data.position] = data.card;
        return newSlots;
      });
    };

    // Subscribe to the event
    socket?.on("opponent placed card", handleCardPlacement);

    // Clean up the effect
    return () => {
      socket?.off("opponent placed card", handleCardPlacement);
    };
  }, [socket]);

  return (
    <section className="flex justify-center w-full h-[100%] text-xs gap-4 pt-10">
      {enemySlots.map((card, index) => (
        <div
          key={index}
          className="rounded h-[75%] aspect-5/7 bg-stone-800 relative"
        >
          {card && <Card card={card} />}
        </div>
      ))}
    </section>
  );
};

export default EnemysBattlefield;
