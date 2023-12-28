import { createContext, useContext, useState, ReactNode, FC } from "react";

interface InfluenceContextProps {
  influence: number;
  setInfluence: (influence: number) => void;
  value: number;
  setValue: (value: number) => void;
}

const InfluenceContext = createContext<InfluenceContextProps | undefined>(
  undefined
);

interface InfluenceContextProviderProps {
  children: ReactNode;
}

export const EnergyContextProvider: FC<InfluenceContextProviderProps> = ({
  children,
}) => {
  const [influence, setInfluence] = useState<number>(100);
  const [value, setValue] = useState<number>(1);

  return (
    <InfluenceContext.Provider
      value={{
        influence,
        setInfluence,
        value,
        setValue,
        // Remove the deck and addCardToDeck as they are now part of DeckContext
      }}
    >
      {children}
    </InfluenceContext.Provider>
  );
};

export const useInfluence = () => {
  const context = useContext(InfluenceContext);
  if (!context) {
    throw new Error(
      "useInfluence must be used within a InfluenceContextProvider"
    );
  }
  return context;
};
