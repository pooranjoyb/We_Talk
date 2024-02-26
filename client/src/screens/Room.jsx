import React, {useState} from "react";
import { VideoRoom } from "../components/VideoRoom";

export default function RoomPage() {

  const [joined, setJoined] = useState(false);
  return (
    <div className="App">
      <h1>WDJ Virtual Call</h1>

      {!joined && (
        <button onClick={() => setJoined(true)}>
          Join Room
        </button>
      )}

      {joined && <VideoRoom />}
    </div>
  );
};
