import { createContext, useContext, useState, ReactNode, FC } from "react";
import { CardStructure } from "../components/Cards/Card";

// Define the structure for the Deck context state
interface DeckContextProps {
  discardPile: CardStructure[];
  setDiscardPile: (discardPile: CardStructure[]) => void;
  placedCards: CardStructure[];
  setPlacedCards: (placedCards: CardStructure[]) => void;
  hand: CardStructure[];
  addCardToHand: (newCard: CardStructure) => void;
  addCardToPlacedCards: (newCard: CardStructure) => void;
  playCardFromHand: (cardIndex: number) => void; // Add this function to the context props
  addCardToDiscardPile: (newCard: CardStructure) => void;
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
  const [hand, setHand] = useState<CardStructure[]>([]);

  const addCardToDiscardPile = (newCard: CardStructure) => {
    setDiscardPile((prevHand) => [...prevHand, newCard]);
  };

  const addCardToPlacedCards = (newCard: CardStructure) => {
    setPlacedCards((prevPlacedCards) => [...prevPlacedCards, newCard]);
  };

  const addCardToHand = (newCard: CardStructure) => {
    setHand((prevHand) => [...prevHand, newCard]);
  };

  // Remove a card from hand and add it to discard pile
  const playCardFromHand = (cardIndex: number) => {
    setHand((prevHand) => {
      const newHand = [...prevHand];
      const playedCard = newHand.splice(cardIndex, 1)[0]; // Remove the card from the hand
      setDiscardPile((prevDiscardPile) => [...prevDiscardPile, playedCard]); // Add the card to the discard pile
      return newHand; // Return the new hand without the played card
    });
  };

  return (
    <DeckContext.Provider
      value={{
        discardPile,
        setDiscardPile,
        placedCards,
        setPlacedCards,
        hand,
        addCardToHand,
        addCardToPlacedCards,
        playCardFromHand, // Add this function to the context value
        addCardToDiscardPile,
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
