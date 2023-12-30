import React, { useState, useEffect } from "react";
import BuyCards from "./BuyCards";
import YourDeck from "./YourWorkspace/YourDeck";
import Battlefield from "./YourWorkspace/Battlefield";
import EnemysWrapper from "./Enemy'sWorkspace/Enemy'sWrapper";
import { useSocket } from "../context/SocketContext";

interface GameProps {
  roomId: string; // roomId is optional because useParams could return undefined
}

const Game: React.FC<GameProps> = ({ roomId }) => {
  const socket = useSocket();
  const [isMyTurn, setIsMyTurn] = useState<boolean>(false);

  useEffect(() => {
    const turnListener = (turnData: { isYourTurn: boolean }) => {
      setIsMyTurn(turnData.isYourTurn);
    };

    socket?.on("turn", turnListener);

    return () => {
      socket?.off("turn", turnListener);
    };
  }, [socket]);

  return (
    <section className="relative w-9/12 h-full pt-3 overflow-hidden rounded-md bg-stone-900">
      <div className="flex flex-col w-full">
        <Battlefield />
        <EnemysWrapper isMyTurnProp={isMyTurn} roomId={roomId} />
      </div>
      <BuyCards />
      <YourDeck />
    </section>
  );
};

export default Game;
