import { Routes, Route } from "react-router-dom";
import "./App.css";

import LobbyScreen from "./screens/Lobby";
import RoomPage from "./screens/Room";
import Home from "./screens/Home";

function App() {
  return (
    <div className="App">
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/lobby" element={<LobbyScreen />} />
        <Route path="/lobby/room" element={<RoomPage />} />
      </Routes>
    </div>
  );
}

export default App;
