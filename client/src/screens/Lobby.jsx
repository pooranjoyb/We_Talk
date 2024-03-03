import React, { useState } from "react";
import { useNavigate } from 'react-router-dom'

const LobbyScreen = () => {
  const navigate = useNavigate();

  const [usn, setUsername] = useState("");
  const [room, setRoom] = useState("");

  const handleSubmitForm = (e) => {
    e.preventDefault();
    navigate('/room', { state : {name: usn, room: room}} )
  }

  return (
    <>
      <div className="min-h-screen bg-gray-900 py-6 flex flex-col justify-center sm:py-12">
        <div className="relative py-3 sm:max-w-xl sm:mx-auto">
          <div
            className="absolute inset-0 bg-gradient-to-r from-green-300 via-blue-500 to-purple-600 shadow-lg transform -skew-y-6 sm:skew-y-0 sm:-rotate-6 sm:rounded-3xl">
          </div>
          <form
            onSubmit={(e) => handleSubmitForm(e)}
            className="relative px-4 py-10 bg-white shadow-lg sm:rounded-3xl sm:p-20">
            <div className="max-w-md mx-auto">
              <div>
                <h1 className="text-2xl font-semibold">Create or Join <span className="bg-gradient-to-r from-green-700 via-blue-500 to-purple-600 bg-clip-text  font-bold text-transparent ">We-Talk</span> Room</h1>
              </div>
              <div className="divide-y divide-gray-200">
                <div className="py-8 text-base leading-6 space-y-4 text-gray-700 sm:text-lg sm:leading-7">
                  <div className="relative">
                    <input
                      type="text"
                      id="usn"
                      value={usn}
                      onChange={(e) => setUsername(e.target.value)}
                      autoComplete="off" name="usn" className="peer placeholder-transparent h-10 w-full border-b-2 border-gray-300 text-gray-900 focus:outline-none focus:borer-rose-600" placeholder="Username" />
                    <label htmlFor="usn" className="absolute left-0 -top-3.5 text-gray-600 text-sm peer-placeholder-shown:text-base peer-placeholder-shown:text-gray-440 peer-placeholder-shown:top-2 transition-all peer-focus:-top-3.5 peer-focus:text-gray-600 peer-focus:text-sm">Username</label>
                  </div>
                  <div className="relative">
                    <input
                      type="text"
                      value={room}
                      onChange={(e) => setRoom(e.target.value)}
                      autoComplete="off" id="roomid" name="roomid" className="peer placeholder-transparent h-10 w-full border-b-2 border-gray-300 text-gray-900 focus:outline-none focus:borer-rose-600" placeholder="Password" />
                    <label htmlFor="roomid" className="absolute left-0 -top-3.5 text-gray-600 text-sm peer-placeholder-shown:text-base peer-placeholder-shown:text-gray-440 peer-placeholder-shown:top-2 transition-all peer-focus:-top-3.5 peer-focus:text-gray-600 peer-focus:text-sm">Room ID</label>
                  </div>
                  <div className="relative">
                    <button className="bg-blue-500 text-white rounded-md px-2 py-1 ">Join</button>
                  </div>
                </div>
              </div>
            </div>
          </form>
        </div>
      </div>

    </>
  );
};

export default LobbyScreen;
