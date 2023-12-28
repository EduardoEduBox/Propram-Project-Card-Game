import { useState } from "react";
import { useDrop } from "react-dnd";
import Card from "../Cards/Card";

const Battlefield = () => {
  const ItemTypes = {
    CARD: "card",
  };

  const [slots, setSlots] = useState([null, null, null, null, null]); // State to track cards in slots

  const handleCardDrop = (slotIndex: number, droppedCard: any) => {
    setSlots((prevSlots) => {
      const newSlots = [...prevSlots];
      newSlots[slotIndex] = droppedCard; // Only update the dropped slot
      return newSlots;
    });
  };

  const slotComponents = slots.map((slot, index) => {
    const [, drop] = useDrop(() => ({
      accept: ItemTypes.CARD,
      drop: (item) => handleCardDrop(index, item),
      collect: (monitor) => ({
        isOver: !!monitor.isOver(),
      }),
    }));

    return (
      <div
        key={index}
        ref={drop}
        className="relative flex items-center justify-center text-xs rounded h-4/6 aspect-5/7 bg-stone-800" // Adjusted CSS for proper sizing and centering
      >
        {slot && <Card card={slot} />}
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
