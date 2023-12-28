import React from "react";

const EnemysBattlefield: React.FC = () => {
  return (
    <section className="flex justify-center w-full h-full gap-4 pt-10 border-b">
      <div className="rounded h-[75%] aspect-5/7 bg-stone-800"></div>
      <div className="rounded h-[75%] aspect-5/7 bg-stone-800"></div>
      <div className="rounded h-[75%] aspect-5/7 bg-stone-800"></div>
      <div className="rounded h-[75%] aspect-5/7 bg-stone-800"></div>
      <div className="rounded h-[75%] aspect-5/7 bg-stone-800"></div>
    </section>
  );
};

export default EnemysBattlefield;
