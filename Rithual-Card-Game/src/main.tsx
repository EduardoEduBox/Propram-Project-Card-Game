import React from "react";
import ReactDOM from "react-dom/client";
import App from "./App.tsx";
import "./index.css";
import { AuthContextProvider } from "./context/AuthContext";
import { EnergyContextProvider } from "./context/InfluenceContext.tsx";
import { DeckContextProvider } from "./context/DeckContext.tsx";
import { LifeContextProvider } from "./context/LifeContext.tsx";
import { SocketContextProvider } from "./context/SocketContext.tsx";

ReactDOM.createRoot(document.getElementById("root")!).render(
  <React.StrictMode>
    <SocketContextProvider>
      <LifeContextProvider>
        <DeckContextProvider>
          <EnergyContextProvider>
            <AuthContextProvider>
              <App />
            </AuthContextProvider>
          </EnergyContextProvider>
        </DeckContextProvider>
      </LifeContextProvider>
    </SocketContextProvider>
  </React.StrictMode>
);
