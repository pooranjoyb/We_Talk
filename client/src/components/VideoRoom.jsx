import React, { useEffect, useState } from 'react';
import AgoraRTC from 'agora-rtc-sdk-ng';
import { VideoPlayer } from './VideoPlayer';
import {
  Offcanvas,
  Ripple,
  initTE,
} from "tw-elements";
import Chat from './Chat';
import { useNavigate, useLocation } from 'react-router';
import Footer from './Footer';
import io from 'socket.io-client';

const APP_ID = '2cfdbda61acd4a3dbc60b6fc5eb81fc8';
const TOKEN =
  '007eJxTYDBMFpwy352vL26Z7xPPJHOu8zM2psYFvpBIdDH4eE/x/hkFBqPktJSklEQzw8TkFJNE45SkZDODJLO0ZNPUJAvDtGSLnOCXqQ2BjAwPFgkzMzJAIIjPxlCeWpKYk83AAABoxSDH';
const CHANNEL = 'wetalk';

const socket = io('http://localhost:5000');

const client = AgoraRTC.createClient({
  mode: 'rtc',
  codec: 'vp8',
});

export const VideoRoom = () => {

  AgoraRTC.setLogLevel(4)
  const userData = useLocation();
  const navigate = useNavigate();

  const [users, setUsers] = useState([]);
  const [name, setName] = useState('')
  const [localTracks, setLocalTracks] = useState([]);

  useEffect(() => {
    initTE({ Offcanvas, Ripple });
  })

  const handleUserJoined = async (user, mediaType) => {
    await client.subscribe(user, mediaType);

    if (mediaType === 'video') {
      setUsers((previousUsers) => [...previousUsers, user]);
    }

    if (mediaType === 'audio') {
      // user.audioTrack.play()
    }
  };

  const handleUserLeft = (user) => {
    setUsers((previousUsers) =>
      previousUsers.filter((u) => u.uid !== user.uid)
    );
  };

  useEffect(() => {
    client.on('user-published', handleUserJoined);
    client.on('user-left', handleUserLeft);

    client
      .join(APP_ID, CHANNEL, TOKEN, null)
      .then(() =>
        setName(userData.state.name)
      )
      .then((uid, name) =>
        Promise.all([
          AgoraRTC.createMicrophoneAndCameraTracks(),
          uid, name,
        ])
      )
      .then(([tracks, uid, name]) => {
        const [audioTrack, videoTrack] = tracks;
        setLocalTracks(tracks);
        setUsers((previousUsers) => [
          ...previousUsers,
          {
            uid,
            name,
            videoTrack,
            audioTrack,
          },
        ]);
        client.publish(tracks);
      });

  }, []);

  const leaveMeet = async () => {
    try {

      const stream = await navigator.mediaDevices.getUserMedia({ video: true });
      const videoTracks = stream.getVideoTracks();

      if (videoTracks.length > 0) {
        videoTracks.forEach(track => {
          console.log('Stopping video track:', track);
          track.stop();
        });
      } else {
        console.log('No video tracks found.');
      }

      // unpublishing
      await client.unpublish(localTracks);
      setLocalTracks([]);
      await client.leave();

      // disconnection
      socket.disconnect();
      navigate('/lobby', { replace: true });
      window.location.reload();
      
    } catch (error) {
      console.error('Error leaving the meeting:', error);
    }
  };



  return (
    <>
      <div className="min-h-screen bg-gray-900 py-6 justify-center sm:py-12 px-16 sm:px-20">
        <div
          className="bg-gradient-to-r from-blue-200 to-purple-800 bg-clip-text text-6xl font-extrabold text-transparent"
        >
          Talk Room
        </div>

        <div
          className='flex gap-6 justify-center'>


          <button
            className="my-4 mr-1.5 inline-block rounded bg-primary px-6 pb-2 pt-2.5 border-2 border-blue-600 text-xs font-medium uppercase leading-normal text-white shadow-[0_4px_9px_-4px_#3b71ca] transition duration-150 ease-in-out hover:bg-primary-600 hover:shadow-[0_8px_9px_-4px_rgba(59,113,202,0.3),0_4px_18px_0_rgba(59,113,202,0.2)] focus:bg-primary-600 focus:shadow-[0_8px_9px_-4px_rgba(59,113,202,0.3),0_4px_18px_0_rgba(59,113,202,0.2)] focus:outline-none focus:ring-0 active:bg-primary-700 active:shadow-[0_8px_9px_-4px_rgba(59,113,202,0.3),0_4px_18px_0_rgba(59,113,202,0.2)] rounded-3xl"
            type="button"
            data-te-offcanvas-toggle
            data-te-target="#offcanvasRight"
            aria-controls="offcanvasRight"
            data-te-ripple-init
            data-te-ripple-color="light">
            Open Chat
          </button>

          <button
            className="my-4 mr-1.5 inline-block rounded bg-primary px-6 pb-2 pt-2.5 border-2 border-blue-600 text-xs font-medium uppercase leading-normal text-white shadow-[0_4px_9px_-4px_#3b71ca] transition duration-150 ease-in-out hover:bg-primary-600 hover:shadow-[0_8px_9px_-4px_rgba(59,113,202,0.3),0_4px_18px_0_rgba(59,113,202,0.2)] focus:bg-primary-600 focus:shadow-[0_8px_9px_-4px_rgba(59,113,202,0.3),0_4px_18px_0_rgba(59,113,202,0.2)] focus:outline-none focus:ring-0 active:bg-primary-700 active:shadow-[0_8px_9px_-4px_rgba(59,113,202,0.3),0_4px_18px_0_rgba(59,113,202,0.2)] rounded-3xl"
            type="button"
            onClick={leaveMeet}
          >
            Leave Meeting
          </button>
        </div>

        <Chat />

        <div className='flex flex-wrap gap-8 justify-center text-white'>
          {users.map((user) => (
            <div className='relative border-2 border-blue-600 my-6 px-4 py-4 rounded-3xl col-auto'>
              <VideoPlayer key={user.uid} user={user} />
            </div>
          ))}
        </div>

        <Footer />
      </div>
    </>
  );
};