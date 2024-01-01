// Battlefield.tsx
import React, { useState } from "react";
import { useDrop } from "react-dnd";
import CardComponent from "../Cards/CardComponent";
import { useDeck } from "../../context/DeckContext";
import { useInfluence } from "../../context/InfluenceContext";
import { CardStructure, CardItem } from "../Types";
import { useSocket } from "../../context/SocketContext";

type roomIdProp = {
  roomId: string | undefined;
};

const Battlefield: React.FC<roomIdProp> = ({ roomId }) => {
  const socket = useSocket();
  const ItemTypes = { CARD: "card" };
  const { hand, playCardFromHand } = useDeck();
  const { setInfluence, influence } = useInfluence();

  const [slots, setSlots] = useState<Array<CardStructure | null>>([
    null,
    null,
    null,
    null,
    null,
  ]);

  const handleCardDrop = (item: CardItem) => {
    const card: CardStructure = hand[item.index];

    if (card.effect && card.effect.name === "Influence") {
      // Debugging logs
      console.log("Dropped a influence spell card:", card);

      switch (card.name) {
        case "Speaking to the crowd":
          console.log("Before updating influence:", influence);
          setInfluence((prevInfluence) => {
            const newInfluence = prevInfluence + 1;
            console.log("After updating influence:", newInfluence);
            return newInfluence;
          });
          break;
        // ... other cases for different spells

        default:
          console.log("No effect found for spell:", card.name);
          break;
      }

      // Remove the card from the hand and add to discard pile
      playCardFromHand(item.index);
    } else if (card.effect && card.effect.name === "Heal") {
      console.log("Dropped a Healing spell card:", card);

      switch (card.name) {
        case "Healing potion":
          console.log(
            "here's where the function to update health will be, talink to the socket"
          );

          break;

        default:
          break;
      }
    } else {
      console.log("ally card dropped:");

      // Logic for non-spell cards
      if (typeof item.slotIndex === "number") {
        // Emit the card placement to the server
        socket?.emit("place card on battlefield", {
          roomId,
          card,
          position: item.slotIndex,
        });

        setSlots((prevSlots) => {
          const newSlots = [...prevSlots];
          newSlots[item.slotIndex] = card;
          return newSlots;
        });
      }
    }
  };

  const slotComponents = slots.map((slot, index) => {
    const [, drop] = useDrop<CardItem, void, void>(() => ({
      accept: ItemTypes.CARD,
      drop: (item) => handleCardDrop({ ...item, slotIndex: index }), // Ensure slotIndex is included here
    }));

    return (
      <div
        key={index}
        ref={drop}
        className="relative flex items-center justify-center text-xs rounded h-4/6 aspect-5/7 bg-stone-800"
      >
        {slot && <CardComponent card={slot} />}
      </div>
    );
  });

  return (
    <div className="battlefield w-full flex justify-center gap-4 absolute h-[35%] border-t bottom-[20%] pt-5">
      {slotComponents}
    </div>
  );
};

export default Battlefield;
