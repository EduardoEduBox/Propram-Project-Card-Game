import React from "react";
import BuyCards from "./BuyCards";
import YourDeck from "./YourWorkspace/YourDeck";
import Battlefield from "./YourWorkspace/Battlefield";
import EnemysWrapper from "./Enemy'sWorkspace/Enemy'sWrapper";

interface GameProps {
  roomId?: string; // roomId is optional because useParams could return undefined
}

const Game: React.FC<GameProps> = ({ roomId }) => {
  return (
    <section className="relative w-9/12 h-full pt-3 overflow-hidden rounded-md bg-stone-900">
      <div className="flex flex-col w-full">
        <Battlefield />
        <EnemysWrapper />
      </div>
      <BuyCards />
      <YourDeck />
    </section>
  );
};

export default Game;
