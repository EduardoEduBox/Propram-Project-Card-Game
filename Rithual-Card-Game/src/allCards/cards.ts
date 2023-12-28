class CardStructure {
  // Minion Class
  // Class properties with accessibility modifiers
  public name: string;
  public illustration: string;
  public damage: number;
  public health: number;
  public price: number;
  public effect?: {
    name: string;
    function: () => void;
    description: string;
    illustration: string;
  };

  // Constructor with parameter properties
  constructor(
    name: string,
    illustration: string,
    damage: number,
    health: number,
    price: number,
    effect?: {
      name: string;
      function: () => void;
      description: string;
      illustration: string;
    }
  ) {
    this.name = name;
    this.illustration = illustration;
    this.damage = damage;
    this.health = health;
    this.price = price;
    this.effect = effect;
  }

  // normal effect for D20

  static NORMAL = {
    name: "Roll",
  };

  // card effects functions
  static FEAR = {
    name: "Fear",
    function: () => {
      console.log(
        "Boi laranja is too powerful for the enemies!, Fear: all enemies take double the damage while Boila Ranger is alive"
      );
    },
    description:
      "Boi laranja is too powerful for the enemies!, Fear: all enemies take double the damage while Boila Ranger is alive",
    illustration: "hãn? como assim?",
  };
}

export const allCards = [
  new CardStructure(
    "The incredible Boila Ranger",
    "https://cdn.discordapp.com/attachments/421344962303623189/1167420560100307044/image.png?ex=654e101f&is=653b9b1f&hm=9fd7dac31704d926d07c83c44100eb580746f3f74628db3819da76c2eaa30df9&",
    10,
    10,
    10,
    CardStructure.FEAR
  ),
  new CardStructure(
    "Boila Ranger's dad",
    "https://cdn.discordapp.com/attachments/421344962303623189/1167699482541031424/image.png?ex=654f13e3&is=653c9ee3&hm=fe07a91972d081b3c7fb24ba7186f03ad79eee01833653b53f460452eb7b2486&",
    4,
    16,
    9
  ),
  new CardStructure(
    "Sir Rojin",
    "https://cdn.discordapp.com/attachments/421344962303623189/1169174804948066315/image.png?ex=655471e3&is=6541fce3&hm=bf8909c3555279f88e8e1c089e0c1753fdd30c9d7a8e2385a1ba417b3f6e9ab6&",
    2,
    6,
    4
  ),
  new CardStructure(
    "Bendre Salvon, Belgadina's king",
    "https://cdn.discordapp.com/attachments/421344962303623189/1169335450440315002/image.png?ex=65550780&is=65429280&hm=128421859f441981f65f67f22ccfdbcfd1e996835e67a52576eef0a46acd6120&",
    6,
    14,
    8
  ),
  new CardStructure(
    "Belgadina's royal guards",
    "https://cdn.discordapp.com/attachments/421344962303623189/1171078520823353386/image.png?ex=655b5edc&is=6548e9dc&hm=3f1d973ba6e0bcbec8a3f9b74eb5a5db207e428785de96634a5f4e1217727739&",
    3,
    10,
    6
  ),

  new CardStructure(
    "Belgadina's castle",
    "https://cdn.discordapp.com/attachments/421344962303623189/1185392516363714590/file-A1rKAbIyhuBcpQE7S2nIFZBP.png?ex=658f71cf&is=657cfccf&hm=505b961dedc6221f0145c54806416fdcefc81a07dba43ce98433a7d6b2c4840b&",
    0,
    18,
    7
  ),

  new CardStructure(
    "Possessed bunny",
    "https://cdn.discordapp.com/attachments/421344962303623189/1185389397366034442/image.png?ex=658f6ee7&is=657cf9e7&hm=9a6c07982dcafce314d5ea1e154f5ff180b6ba5521eb5eaea262c65fd06bc2b0&",
    4,
    7,
    6
  ),

  new CardStructure(
    "Akarnat",
    "https://cdn.discordapp.com/attachments/421344962303623189/1185395323447816232/file-CQa1PaBuZFARrmwknLH48xiA.png?ex=658f746c&is=657cff6c&hm=6887ecc9d8c3eead023f593aaf4ba6781ef245048d8f856cf5e3933507e7adfe&",
    15,
    12,
    12
  ),

  new CardStructure(
    "Atsunayushi",
    "https://cdn.discordapp.com/attachments/421344962303623189/1185397522626265179/file-FiLBOEsOHubdDOeJWWGZGqyP.png?ex=658f7679&is=657d0179&hm=34c4c2203dceb507f0f6cc4191775454cc042ad61ef9f1a2fa8e879914a32e02&",
    12,
    18,
    15
  ),

  new CardStructure(
    "Grain bread",
    "https://cdn.discordapp.com/attachments/421344962303623189/1185402815196176394/file-sos5SY8tU2f8cOjGcV7WCTLN.png?ex=658f7b66&is=657d0666&hm=40bd115615321c262f236824c28c0b8ea16ac0fa680a669058deb52cf877028f&",
    0,
    7,
    3
  ),
];
