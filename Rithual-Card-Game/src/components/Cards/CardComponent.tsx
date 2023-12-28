// CardComponent.tsx
import React, { CSSProperties } from "react";
import { useDrag } from "react-dnd";
import { CardStructure } from "./Card"; // Adjust the import path as needed
import Card from "./Card";

interface CardComponentProps {
  card: CardStructure;
  index?: number;
  style?: CSSProperties; // Optional style prop
  onBeginDrag?: () => void; // Optional onBeginDrag prop
}

const CardComponent: React.FC<CardComponentProps> = ({
  card,
  style,
  onBeginDrag,
}) => {
  const [{ isDragging }, dragRef] = useDrag(() => ({
    type: "card",
    item: { ...card }, // Pass the entire card object when dragging
    collect: (monitor) => ({
      isDragging: !!monitor.isDragging(),
    }),
  }));

  return (
    <div
      ref={dragRef}
      style={style}
      className={`absolute bottom-0 w-full h-full ${
        isDragging ? "opacity-50" : "opacity-100"
      }`}
    >
      {/* Render the Card component here */}
      <Card card={card} />
    </div>
  );
};

export default CardComponent;
