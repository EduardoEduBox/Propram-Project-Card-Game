import React, { useEffect } from "react";
import YourHand from "./YourHand";
import { UserAuth } from "../../context/AuthContext";
import { useInfluence } from "../../context/InfluenceContext";
import { useLife } from "../../context/LifeContext";
import YourDiscartPile from "./YourDiscartPile";
import YourCards from "./YourCards";

const YourDeck: React.FC = () => {
  const { user } = UserAuth();
  const { influence } = useInfluence();
  const { life } = useLife();

  useEffect(() => {
    console.log("Influence in YourDeck:", influence);
  }, [influence]);

  return (
    <section className="absolute bottom-0 w-full h-[45%]">
      <div className="absolute bottom-0 w-full h-1/2 bg-stone-500" />
      <div className="absolute bottom-0 flex items-center justify-center w-full gap-10 h-4/6">
        <YourHand />
        <div className="flex items-center justify-center px-10 w-fit rounded-xl h-3/4 bg-stone-400 shadow-card">
          <img
            src={
              user?.photoURL
                ? user.photoURL
                : "https://cdn.discordapp.com/attachments/421344962303623189/1187062902788739082/9712f93f38758e5bf4318d338a8b64c7.png"
            }
            alt="user image"
            className="rounded-full shadow-2xl h-2/3 aspect-square"
          />
          <div className="h-full">
            <div className="flex flex-col items-center justify-center w-20 ml-auto text-black h-1/2">
              <h1 className="text-lg font-bold">Influence</h1>
              <p className="text-4xl font-bold text-blue-600">{influence}</p>
            </div>
            <div className="flex flex-col items-center justify-center w-20 ml-auto text-black h-1/2">
              <h1 className="text-lg font-bold">Life</h1>
              <p className="text-4xl font-bold text-red-600">{life}</p>
            </div>
          </div>
        </div>
        <YourCards />
        <YourDiscartPile />
      </div>
    </section>
  );
};

export default YourDeck;
