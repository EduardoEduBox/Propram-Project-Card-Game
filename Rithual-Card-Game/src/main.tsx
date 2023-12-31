import React from "react";
import ReactDOM from "react-dom/client";
import App from "./App.tsx";
import "./index.css";
import { AuthContextProvider } from "./context/AuthContext";
import { InfluenceContextProvider } from "./context/InfluenceContext.tsx";
import { DeckContextProvider } from "./context/DeckContext.tsx";
import { LifeContextProvider } from "./context/LifeContext.tsx";
import { SocketContextProvider } from "./context/SocketContext.tsx";

ReactDOM.createRoot(document.getElementById("root")!).render(
  <InfluenceContextProvider>
    <React.StrictMode>
      <SocketContextProvider>
        <LifeContextProvider>
          <DeckContextProvider>
            <AuthContextProvider>
              <App />
            </AuthContextProvider>
          </DeckContextProvider>
        </LifeContextProvider>
      </SocketContextProvider>
    </React.StrictMode>
  </InfluenceContextProvider>
);
