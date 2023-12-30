import React from "react";
import { Tooltip } from "react-tooltip";

export interface CardStructure {
  id?: number;
  name: string;
  illustration: string;
  damage: number;
  health: number;
  price: number;
  effect?: {
    name: string;
    function: () => void;
    description: string;
    illustration: string;
  };
}

type CardProps = {
  card: CardStructure;
};

const Card: React.FC<CardProps> = ({ card }) => {
  const isCardAnAlly =
    card.hasOwnProperty("damage") && card.hasOwnProperty("health");

  return (
    <div
      className="w-full overflow-hidden leading-3 transition-shadow rounded-md aspect-5/7 shadow-card shadow-stone-800 hover:shadow-purple-600"
      data-tooltip-id="my-tooltip"
      data-tooltip-content={card.effect?.description}
    >
      <Tooltip
        id="my-tooltip"
        place="right"
        style={{ fontSize: "1rem", maxWidth: "10rem", lineHeight: "1rem" }}
      />
      <div className="flex items-center justify-center w-full font-bold text-center text-black h-1/6 bg-stone-400">
        <p className="w-full leading-none">{card.name}</p>
        <div className="flex items-center justify-center p-2 ml-auto text-sm text-white bg-purple-500 shadow-lg rounded-bl-2xl">
          {card.price}
        </div>
      </div>
      <div
        className="w-full h-3/6 bg-stone-200"
        style={{
          backgroundImage: `url(${card.illustration})`,
          backgroundSize: "cover",
          backgroundPosition: "center",
          backgroundRepeat: "no-repeat",
        }}
      ></div>
      <div className="relative flex w-full h-2/6 bg-stone-500">
        {isCardAnAlly && (
          <>
            <div className="flex items-center justify-center w-1/3 text-base font-bold text-red-500 aspect-square bg-stone-700 rounded-br-3xl">
              {card.damage}
            </div>
            <div className="flex items-center justify-center w-1/3 ml-auto text-base font-bold text-green-500 aspect-square rounded-tl-3xl bg-stone-700">
              {card.health}
            </div>
          </>
        )}
      </div>
    </div>
  );
};

export default Card;
