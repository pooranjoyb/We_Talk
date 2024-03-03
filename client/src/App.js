import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import "./App.css";

import LobbyScreen from "./screens/Lobby";
import Home from "./screens/Home";
import { VideoRoom } from "./components/VideoRoom";

function App() {
  return (
    <div className="App">
      <Router>
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/lobby" element={<LobbyScreen />} />
          <Route path="/room" element={<VideoRoom />} />
        </Routes>
      </Router>
    </div>
  );
}

export default App;
