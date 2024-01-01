import React, { useState, useEffect } from "react";
import { useSocket } from "../../context/SocketContext";
import { useLife } from "../../context/LifeContext";
import { UserAuth } from "../../context/AuthContext";

// Defining the type for the props
interface EnemysProfileProps {
  roomId: string | undefined;
  isMyTurnProp: boolean;
}

const EnemysProfile: React.FC<EnemysProfileProps> = ({
  roomId,
  isMyTurnProp,
}) => {
  const { enemysLife } = useLife();
  const socket = useSocket();
  const { user } = UserAuth();
  const [enemyProfile, setEnemyProfile] = useState({ photoURL: "", id: "" });

  useEffect(() => {
    if (user?.photoURL) {
      // Emit the user's photoURL when the component mounts
      socket?.emit("send user photo", { roomId, photoURL: user.photoURL });
    }

    const handleEnemyProfile = (profile: { photoURL: string; id: string }) => {
      setEnemyProfile(profile);
    };

    socket?.on("enemy profile", handleEnemyProfile);

    return () => {
      socket?.off("enemy profile", handleEnemyProfile);
    };
  }, [socket, roomId, user?.photoURL]);

  return (
    <section className="relative flex justify-center w-full pt-2 h-1/3">
      <div className="h-full rounded-full aspect-square">
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
      <div className="absolute right-0 flex items-center justify-center h-full text-2xl font-bold w-60">
        {isMyTurnProp ? (
          <h1 className="text-green-500">Your turn</h1>
        ) : (
          <h1 className="text-red-500">Enemy's turn</h1>
        )}
      </div>
    </section>
  );
};

export default EnemysProfile;
