import React, {
  createContext,
  useContext,
  useState,
  useEffect,
  FC,
  ReactNode,
} from "react";
import { useSocket } from "./SocketContext";

interface LifeContextProps {
  life: number;
  setLife: React.Dispatch<React.SetStateAction<number>>;
  fullLife: number;
  setFullLife: React.Dispatch<React.SetStateAction<number>>;
  enemysLife: number;
  setEnemysLife: React.Dispatch<React.SetStateAction<number>>;
  enemysFullLife: number;
  setEnemysFullLife: React.Dispatch<React.SetStateAction<number>>;
}

const LifeContext = createContext<LifeContextProps | undefined>(undefined);

interface LifeContextProviderProps {
  children: ReactNode;
}

interface LifeUpdateEvent {
  playerId: string;
  life: number;
}

export const LifeContextProvider: FC<LifeContextProviderProps> = ({
  children,
}) => {
  const [life, setLife] = useState<number>(100);
  const [fullLife, setFullLife] = useState<number>(100);
  const [enemysLife, setEnemysLife] = useState<number>(100);
  const [enemysFullLife, setEnemysFullLife] = useState<number>(100);

  const socket = useSocket();

  useEffect(() => {
    const handleLifeUpdate = (data: LifeUpdateEvent) => {
      console.log("Received life update:", data);

      if (data.playerId === socket?.id) {
        console.log("Updating your life");
        setLife(data.life);
      } else {
        console.log("Updating enemy life");
        setEnemysLife(data.life);
      }
    };

    socket?.on("update life", handleLifeUpdate);

    return () => {
      socket?.off("update life", handleLifeUpdate);
    };
  }, [socket]);

  return (
    <LifeContext.Provider
      value={{
        life,
        setLife,
        fullLife,
        setFullLife,
        enemysLife,
        setEnemysLife,
        enemysFullLife,
        setEnemysFullLife,
      }}
    >
      {children}
    </LifeContext.Provider>
  );
};

export const useLife = () => {
  const context = useContext(LifeContext);
  if (!context) {
    throw new Error("useLife must be used within a LifeContextProvider");
  }
  return context;
};
