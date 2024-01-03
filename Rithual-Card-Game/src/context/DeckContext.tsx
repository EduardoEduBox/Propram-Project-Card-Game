import React, {
  createContext,
  useContext,
  useState,
  ReactNode,
  FC,
  useEffect,
} from "react";
import { CardStructure } from "../components/Types";
import { useSocket } from "./SocketContext";

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
  yourCardsPile: CardStructure[];
  shuffleDiscardPile: () => void;
  shuffleDiscardPileIntoYourCards: () => void;
  drawCardsFromYourCardsPile: (numberOfCards: number) => void;
}

const DeckContext = createContext<DeckContextProps | undefined>(undefined);

interface DeckContextProviderProps {
  children: ReactNode;
}

export const DeckContextProvider: FC<DeckContextProviderProps> = ({
  children,
}) => {
  const [discardPile, setDiscardPile] = useState<CardStructure[]>([]);
  const [placedCards, setPlacedCards] = useState<CardStructure[]>([]);
  const [hand, setHand] = useState<CardStructure[]>([]);
  const [yourCardsPile, setYourCardsPile] = useState<CardStructure[]>([]);
  const socket = useSocket();

  const shuffleArray = (array: CardStructure[]) => {
    for (let i = array.length - 1; i > 0; i--) {
      const j = Math.floor(Math.random() * (i + 1));
      [array[i], array[j]] = [array[j], array[i]];
    }
  };

  const shuffleDiscardPile = () => {
    let shuffledPile = [...discardPile];
    shuffleArray(shuffledPile);
    setYourCardsPile(shuffledPile);
    setDiscardPile([]);
  };

  const drawCardsFromYourCardsPile = () => {
    const numberOfCards = 5;
    const drawnCards = yourCardsPile.slice(0, numberOfCards);
    const remainingCards = yourCardsPile.slice(numberOfCards);
    setHand((prevHand) => [...prevHand, ...drawnCards]);
    setYourCardsPile(remainingCards);
  };

  const shuffleDiscardPileIntoYourCards = () => {
    // Your implementation here
    // Example: shuffle the discard pile and move it to yourCardsPile
    shuffleDiscardPile();
  };

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
    setDiscardPile((prevDiscardPile) => [...prevDiscardPile, newCard]);
  };

  const addCardToPlacedCards = (newCard: CardStructure) => {
    setPlacedCards((prevPlacedCards) => [...prevPlacedCards, newCard]);
  };

  const playCardFromHand = (cardIndex: number) => {
    setHand((prevHand) => prevHand.filter((_, index) => index !== cardIndex));
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
        yourCardsPile,
        shuffleDiscardPile,
        drawCardsFromYourCardsPile,
        shuffleDiscardPileIntoYourCards, // Add this function to the context
      }}
    >
      {children}
    </DeckContext.Provider>
  );
};

export const useDeck = () => {
  const context = useContext(DeckContext);
  if (!context) {
    throw new Error("useDeck must be used within a DeckContextProvider");
  }
  return context;
};
