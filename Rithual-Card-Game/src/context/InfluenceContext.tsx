// InfluenceContext.tsx
import {
  createContext,
  useEffect,
  useContext,
  useState,
  ReactNode,
  FC,
} from "react";
import { useSocket } from "./SocketContext"; // Import useSocket

interface InfluenceContextProps {
  influence: number;
  setInfluence: React.Dispatch<React.SetStateAction<number>>;
  updateInfluence: (amount: number) => void; // New function to update influence
}

const InfluenceContext = createContext<InfluenceContextProps | undefined>(
  undefined
);

export const InfluenceContextProvider: FC<{ children: ReactNode }> = ({
  children,
}) => {
  const [influence, setInfluence] = useState<number>(0);
  const socket = useSocket();

  // Function to update influence - sends a message to the backend
  const updateInfluence = (amount: number) => {
    socket?.emit("update influence", amount);
  };

  // Listening for influence updates from the backend
  useEffect(() => {
    socket?.on("influence updated", (newInfluence: number) => {
      setInfluence(newInfluence);
    });

    return () => {
      socket?.off("influence updated");
    };
  }, [socket]);

  return (
    <InfluenceContext.Provider
      value={{ influence, setInfluence, updateInfluence }}
    >
      {children}
    </InfluenceContext.Provider>
  );
};

export const useInfluence = () => {
  const context = useContext(InfluenceContext);
  if (!context) {
    throw new Error(
      "useInfluence must be used within an InfluenceContextProvider"
    );
  }
  return context;
};
