// InfluenceContext.tsx
import { createContext, useContext, useState } from "react";

interface InfluenceContextProps {
  influence: number;
  setInfluence: React.Dispatch<React.SetStateAction<number>>;
}

const InfluenceContext = createContext<InfluenceContextProps | undefined>(
  undefined
);

export const InfluenceContextProvider: React.FC<{
  children: React.ReactNode;
}> = ({ children }) => {
  const [influence, setInfluence] = useState<number>(0);

  return (
    <InfluenceContext.Provider value={{ influence, setInfluence }}>
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
