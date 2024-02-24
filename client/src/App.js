import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import "./App.css";

import LobbyScreen from "./screens/Lobby";
import RoomPage from "./screens/Room";
import Home from "./screens/Home";

function App() {
  return (
    <div className="App">
      <Router>
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/lobby" element={<LobbyScreen />} />
          <Route path="/room" element={<RoomPage />} />
        </Routes>
      </Router>
    </div>
  );
}

export default App;
