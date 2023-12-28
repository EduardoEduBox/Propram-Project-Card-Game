import { createContext, useContext, useState, ReactNode, FC } from "react";

interface LifeContextProps {
  life: number;
  setLife: (value: number | ((prevVar: number) => number)) => void;
  fullLife: number;
  setFullLife: (value: number | ((prevVar: number) => number)) => void;
  enemysLife: number;
  setEnemysLife: (value: number | ((prevVar: number) => number)) => void;
  enemysFullLife: number;
  setEnemysFullLife: (value: number | ((prevVar: number) => number)) => void;
}

const LifeContext = createContext<LifeContextProps | undefined>(undefined);

interface LifeContextProviderProps {
  children: ReactNode;
}

export const LifeContextProvider: FC<LifeContextProviderProps> = ({
  children,
}) => {
  const [life, setLife] = useState<number>(100);
  const [fullLife, setFullLife] = useState<number>(100);

  // for the enemy

  const [enemysLife, setEnemysLife] = useState<number>(100);
  const [enemysFullLife, setEnemysFullLife] = useState<number>(100);

  return (
    <LifeContext.Provider
      value={{
        life,
        setLife,
        fullLife,
        setFullLife,
        enemysLife,
        setEnemysLife,
        enemysFullLife,
        setEnemysFullLife,
      }}
    >
      {children}
    </LifeContext.Provider>
  );
};

export const useLife = () => {
  const context = useContext(LifeContext);
  if (!context) {
    throw new Error("useLife must be used within a LifeContextProvider");
  }
  return context;
};
