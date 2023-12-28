import React from "react";
import EnemysProfile from "./Enemy'sProfile";
import EnemysBattlefield from "./Enemy'sBattlefield";

const EnemysWrapper: React.FC = () => {
  return (
    <section className="w-full absolute h-[45%] top-0 flex flex-col">
      <EnemysProfile />
      <EnemysBattlefield />
    </section>
  );
};

export default EnemysWrapper;
