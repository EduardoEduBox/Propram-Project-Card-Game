// Enemy'sProfile component
import React, { useState, useEffect } from "react";
import { useSocket } from "../../context/SocketContext";
import { useLife } from "../../context/LifeContext";

const EnemysProfile: React.FC = () => {
  const { enemysLife } = useLife();
  const socket = useSocket();
  const [enemyProfile, setEnemyProfile] = useState({ photoURL: "", id: "" });

  useEffect(() => {
    if (socket) {
      socket.on("enemy info", (playerInfo) => {
        setEnemyProfile(playerInfo);
      });

      return () => {
        socket.off("enemy info");
      };
    }
  }, [socket]);

  return (
    <section className="flex justify-center w-full pt-2 h-1/3">
      <div className="h-full rounded-full aspect-square bg-stone-600">
        {enemyProfile.photoURL && (
          <img
            src={enemyProfile.photoURL}
            alt="Enemy profile"
            className="rounded-full"
          />
        )}
      </div>
      <div className="flex flex-col items-center justify-center pl-2">
        <h1 className="text-xl">Life</h1>
        <h1 className="text-3xl font-bold text-red-600">{enemysLife}</h1>
      </div>
    </section>
  );
};

export default EnemysProfile;
