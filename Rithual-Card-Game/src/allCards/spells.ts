class Spell {
  name: string;
  cost: number;
  effect: {
    name: string;
    description: string;
    function: () => void;
  };

  constructor(
    name: string,
    cost: number,
    effect: { name: string; description: string; function: () => void }
  ) {
    this.name = name;
    this.cost = cost;
    this.effect = effect;
  }
}
