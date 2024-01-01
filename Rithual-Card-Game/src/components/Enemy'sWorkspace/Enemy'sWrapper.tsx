import React from "react";
import EnemysProfile from "./Enemy'sProfile";
import EnemysBattlefield from "./Enemy'sBattlefield";

type isMyTurnType = {
  isMyTurnProp: boolean;
  roomId: string | undefined;
};

const EnemysWrapper: React.FC<isMyTurnType> = ({ isMyTurnProp, roomId }) => {
  return (
    <section className="w-full absolute h-[45%] top-0 flex flex-col">
      <EnemysProfile isMyTurnProp={isMyTurnProp} roomId={roomId} />
      <EnemysBattlefield />
    </section>
  );
};

export default EnemysWrapper;
