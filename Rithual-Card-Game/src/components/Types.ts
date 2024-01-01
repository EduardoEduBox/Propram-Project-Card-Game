// CardItem type definition
export interface CardItem {
  index: number; // Index of the card in the hand array
  type: string; // Type of the item, e.g., "card"
  slotIndex: number; // Optional property to track the slot index
}

export interface CardStructure {
  id?: number;
  name: string;
  illustration: string;
  damage: number;
  health: number;
  price: number;
  effect?: {
    name: string;
    function: () => number;
    description: string;
    illustration: string;
  };
}
