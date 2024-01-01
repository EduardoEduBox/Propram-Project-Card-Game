import React, { useState, useEffect } from "react";
import { useSocket } from "../../context/SocketContext";
import { CardStructure } from "../Types";
import Card from "../Cards/Card";

const EnemysBattlefield: React.FC = () => {
  const [enemySlots, setEnemySlots] = useState<Array<CardStructure | null>>([
    null,
    null,
    null,
    null,
    null,
  ]);
  const socket = useSocket();

  useEffect(() => {
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

    socket?.on("enemy card placed", handleCardPlacement);

    // Cleanup function
    return () => {
      socket?.off("enemy card placed", handleCardPlacement);
    };
  }, [socket]);

  return (
    <section className="flex justify-center w-full h-full gap-4 pt-10 border-b">
      {enemySlots.map((card, index) => (
        <div key={index} className="rounded h-[75%] aspect-5/7 bg-stone-800">
          {card && <Card card={card} />}
        </div>
      ))}
    </section>
  );
};

export default EnemysBattlefield;
