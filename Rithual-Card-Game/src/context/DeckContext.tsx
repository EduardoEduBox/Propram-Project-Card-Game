import { createContext, useContext, useState, ReactNode, FC } from "react";
import { CardStructure } from "../components/Cards/Card";

// Define the structure for the Deck context state
interface DeckContextProps {
  discardPile: CardStructure[];
  setDiscardPile: (discardPile: CardStructure[]) => void;
  placedCards: CardStructure[];
  setPlacedCards: (placedCards: CardStructure[]) => void;
  addCardToHand: (newCard: CardStructure) => void;
  addCardToPlacedCards: (newCard: CardStructure) => void;
}

// Create the Deck context
const DeckContext = createContext<DeckContextProps | undefined>(undefined);

// Define the props for the provider
interface DeckContextProviderProps {
  children: ReactNode;
}

// Create the provider component
export const DeckContextProvider: FC<DeckContextProviderProps> = ({
  children,
}) => {
  const [discardPile, setDiscardPile] = useState<CardStructure[]>([]);
  const [placedCards, setPlacedCards] = useState<CardStructure[]>([]);

  const addCardToHand = (newCard: CardStructure) => {
    setDiscardPile((prevHand) => [...prevHand, newCard]);
  };

  const addCardToPlacedCards = (newCard: CardStructure) => {
    setPlacedCards((prevPlacedCards) => [...prevPlacedCards, newCard]);
  };

  return (
    <DeckContext.Provider
      value={{
        discardPile,
        setDiscardPile,
        placedCards,
        setPlacedCards,
        addCardToHand,
        addCardToPlacedCards,
      }}
    >
      {children}
    </DeckContext.Provider>
  );
};

// Hook to use the Deck context
export const useDeck = () => {
  const context = useContext(DeckContext);
  if (!context) {
    throw new Error("useDeck must be used within a DeckContextProvider");
  }
  return context;
};
