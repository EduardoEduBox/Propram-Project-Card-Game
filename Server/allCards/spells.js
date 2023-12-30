class Spell {
  constructor(name, price, illustration, effect) {
    this.name = name;
    this.price = price;
    this.illustration = illustration;
    this.effect = effect;
  }
}

const speakingToTheCrowd = new Spell(
  "Speaking to the crowd",
  0,
  "https://cdn.discordapp.com/attachments/421344962303623189/1189985550296428664/file-LDnHEz49L1A3Veeklo1Bj1Tr.png?ex=65a02768&is=658db268&hm=3aa57f8cd1410c89eb39d4e64a614cc70e985e48c3bf30de9a7e933c66176d0b&",
  {
    name: "Influence",
    description: "Gain 1 influence",
    illustration: "",
    function: () => {
      // returning 1 influence
      return 1;
    },
  }
);

export const spells = [
  speakingToTheCrowd,
  speakingToTheCrowd,
  speakingToTheCrowd,
  speakingToTheCrowd,
  speakingToTheCrowd,
  speakingToTheCrowd,
  speakingToTheCrowd,
  speakingToTheCrowd,
  speakingToTheCrowd,
  speakingToTheCrowd,
  speakingToTheCrowd,
  speakingToTheCrowd,
  speakingToTheCrowd,
  speakingToTheCrowd, // 14
  new Spell(
    "Healing potion",
    1,
    "https://cdn.discordapp.com/attachments/421344962303623189/1189985608039415888/file-s9FCGWTDmxPWxRlybjxLB3Ph.png?ex=65a02775&is=658db275&hm=d3109931030b463cebbc229b8c8a8464382e37dcfc516220ffaa2ea0c7202d61&",
    {
      name: "Heal 1d10",
      description: "Roll a d10 and heal the amount of the roll",
      illustration: "",
      function: () => {
        // returning 1d10
        return Math.floor(Math.random() * 10) + 1;
      },
    }
  ),
  new Spell(
    "Damage potion",
    2,
    "https://cdn.discordapp.com/attachments/421344962303623189/1189985652125737030/file-9b39jnKAgZfmDDUR6ITMJp5Q.png?ex=65a02780&is=658db280&hm=820045b718a9bf730ab95ae07e772df0c9d0538ac76b2f481f882595a5ffe617&",
    {
      name: "Deal 1d10 damage",
      description: "Roll 1d10 and deal the amount of the roll to the opponent",
      illustration: "",
      function: () => {
        // returning 1d10
        return Math.floor(Math.random() * 10) + 1;
      },
    }
  ),
  new Spell(
    "Supreme Rojin's bread",
    4,
    "https://cdn.discordapp.com/attachments/421344962303623189/1189985748166905916/file-lAx8em5yZCkBLpQfUSeNhNDV.png?ex=65a02797&is=658db297&hm=4fd8e7ad2cf9ecd2b7fb9d751f206d1dd3dcc9e8831d6a83e7695508f40af7a8&",
    {
      name: "Supreme delicous bread",
      description: "Heal 1d20, If Sir Rojin is in the field, heal 1d30",
      illustration: "",
      function: (isRojinInTheField) => {
        if (isRojinInTheField) {
          return Math.floor(Math.random() * 30) + 1;
        } else {
          return Math.floor(Math.random() * 20) + 1;
        }
      },
    }
  ),
  new Spell(
    "Grain bread",
    2,
    "https://cdn.discordapp.com/attachments/421344962303623189/1185402815196176394/file-sos5SY8tU2f8cOjGcV7WCTLN.png?ex=658f7b66&is=657d0666&hm=40bd115615321c262f236824c28c0b8ea16ac0fa680a669058deb52cf877028f&",
    {
      name: "Heal 1d15",
      description:
        "Heal 1d15, if Sir Rojin is in the field, roll with advantage",
      illustration: "",
      function: (isRojinInTheField) => {
        if (isRojinInTheField) {
          // make two math.randoms and return the highest
          const roll1 = Math.floor(Math.random() * 15) + 1;
          const roll2 = Math.floor(Math.random() * 15) + 1;
          return Math.max(roll1, roll2);
        } else {
          return Math.floor(Math.random() * 15) + 1;
        }
      },
    }
  ),
];
