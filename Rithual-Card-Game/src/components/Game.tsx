import React, { useState, useEffect } from "react";
import BuyCards from "./BuyCards";
import YourDeck from "./YourWorkspace/YourDeck";
import Battlefield from "./YourWorkspace/Battlefield";
import EnemysWrapper from "./Enemy'sWorkspace/Enemy'sWrapper";
import { useSocket } from "../context/SocketContext";
import { useDeck } from "../context/DeckContext";

interface GameProps {
  roomId: string | undefined; // roomId is optional because useParams could return undefined
}

const Game: React.FC<GameProps> = ({ roomId }) => {
  const { drawCardsFromYourCardsPile } = useDeck();
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

  useEffect(() => {
    if (isMyTurn) {
      // Define the number of cards to draw
      const numberOfCardsToDraw = 5; // You can adjust this number based on your game rules

      // If it's your turn, draw cards from your cards pile
      drawCardsFromYourCardsPile(numberOfCardsToDraw);
    }
  }, [isMyTurn, drawCardsFromYourCardsPile]);

  return (
    <section className="relative w-9/12 h-full pt-3 overflow-hidden rounded-md bg-stone-900">
      <div className="flex flex-col w-full">
        <Battlefield roomId={roomId} isMyTurn={isMyTurn} />
        <EnemysWrapper isMyTurnProp={isMyTurn} roomId={roomId} />
      </div>
      <BuyCards roomId={roomId} isMyTurn={isMyTurn} />
      <YourDeck />
    </section>
  );
};

export default Game;
