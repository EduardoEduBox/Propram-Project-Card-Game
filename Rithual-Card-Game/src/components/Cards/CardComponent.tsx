import React, { CSSProperties } from "react";
import { useDrag } from "react-dnd";
import { CardStructure, CardItem } from "../Types";
import Card from "./Card";

interface CardComponentProps {
  card: CardStructure;
  index?: number;
  style?: CSSProperties; // Optional style prop
}

const CardComponent: React.FC<CardComponentProps> = ({
  card,
  index,
  style,
}) => {
  const [{ isDragging }, dragRef] = useDrag(() => ({
    type: "card",
    item: { index, type: "card" } as CardItem, // Using CardItem type here
    collect: (monitor) => ({
      isDragging: !!monitor.isDragging(),
    }),
  }));

  return (
    <div
      ref={dragRef} // Corrected to dragRef
      style={style} // Included the style prop
      className={`absolute bottom-0 w-full h-full ${
        isDragging ? "opacity-50" : "opacity-100"
      }`}
    >
      <Card card={card} />
    </div>
  );
};

export default CardComponent;
