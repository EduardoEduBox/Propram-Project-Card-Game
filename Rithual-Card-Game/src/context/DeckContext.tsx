import {
  createContext,
  useContext,
  useState,
  ReactNode,
  FC,
  useEffect,
} from "react";
import { CardStructure } from "../components/Types";
import { useSocket } from "./SocketContext";

// Define the structure for the Deck context state
interface DeckContextProps {
  discardPile: CardStructure[];
  setDiscardPile: (discardPile: CardStructure[]) => void;
  placedCards: CardStructure[];
  setPlacedCards: (placedCards: CardStructure[]) => void;
  hand: CardStructure[];
  addCardToHand: (newCards: CardStructure[]) => void;
  addCardToPlacedCards: (newCard: CardStructure) => void;
  playCardFromHand: (index: number) => void;
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
  const socket = useSocket();

  useEffect(() => {
    const handleInitialHand = (cards: CardStructure[]) => {
      setHand(cards);
    };

    socket?.on("initial hand", handleInitialHand);

    return () => {
      socket?.off("initial hand", handleInitialHand);
    };
  }, [socket]);

  const addCardToHand = (newCards: CardStructure[]) => {
    setHand((prevHand) => [...prevHand, ...newCards]);
  };

  const addCardToDiscardPile = (newCard: CardStructure) => {
    setDiscardPile((prevHand) => [...prevHand, newCard]);
  };

  const addCardToPlacedCards = (newCard: CardStructure) => {
    setPlacedCards((prevPlacedCards) => [...prevPlacedCards, newCard]);
  };

  const playCardFromHand = (cardIndex: number) => {
    setHand((prevHand) => {
      // Create a new array without the card that was played
      const newHand = prevHand.filter((_, index) => index !== cardIndex);
      return newHand;
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
        playCardFromHand,
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
