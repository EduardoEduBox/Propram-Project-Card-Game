// App.js or App.tsx
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import HomePage from "./components/HomePage";
import GameWrapper from "./components/GameWrapper";
import { UserAuth } from "./context/AuthContext";

function App() {
  const { user } = UserAuth();

  return (
    <Router>
      <Routes>
        <Route path="/" element={<HomePage />} />
        {/* Dynamic route for the game page, using :roomId as a route parameter */}
        {user && <Route path="/match/:roomId" element={<GameWrapper />} />}
      </Routes>
    </Router>
  );
}

export default App;
