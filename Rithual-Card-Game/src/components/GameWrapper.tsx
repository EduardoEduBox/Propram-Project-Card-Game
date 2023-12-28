import React from "react";
import { useParams } from "react-router-dom";
import Game from "./Game";
import LiveChat from "./LiveChat/index";
import { DndProvider } from "react-dnd";
import { HTML5Backend } from "react-dnd-html5-backend";

const GameWrapper: React.FC = () => {
  // Use the Params type with useParams
  const { roomId } = useParams();
  console.log("Room ID in GameWrapper:", roomId);

  return (
    <DndProvider backend={HTML5Backend}>
      <section className="box-border flex w-full h-[100vh] gap-4 p-4 overflow-hidden bg-stone-600">
        <Game roomId={roomId} />
        <LiveChat roomId={roomId} />
      </section>
    </DndProvider>
  );
};

export default GameWrapper;
