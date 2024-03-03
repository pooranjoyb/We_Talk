import React, { useEffect, useState } from 'react';
import AgoraRTC from 'agora-rtc-sdk-ng';
import { VideoPlayer } from './VideoPlayer';
import {
  Offcanvas,
  Ripple,
  initTE,
} from "tw-elements";
import Chat from './Chat';
import { useLocation } from 'react-router';
import Footer from './Footer';

const APP_ID = '2cfdbda61acd4a3dbc60b6fc5eb81fc8';
const TOKEN =
  '007eJxTYFj77fySD547r/UFT3p5sOLHe8PTClLzPjZ/+/9xxRWvIxx3FBiMktNSklISzQwTk1NMEo1TkpLNDJLM0pJNU5MsDNOSLVL5n6Q2BDIynHlYycjIAIEgPhtDeWpJYk42AwMAsI8nhA==';
const CHANNEL = 'wetalk';

const client = AgoraRTC.createClient({
  mode: 'rtc',
  codec: 'vp8',
});

export const VideoRoom = () => {

  AgoraRTC.setLogLevel(4)
  const userData = useLocation();

  console.log(userData.state)

  const [users, setUsers] = useState([]);
  const [localTracks, setLocalTracks] = useState([]);

  useEffect(() => {
    initTE({ Offcanvas, Ripple });
    console.log(users)
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
      .then((uid) =>
        Promise.all([
          AgoraRTC.createMicrophoneAndCameraTracks(),
          uid,
        ])
      )
      .then(([tracks, uid]) => {
        const [audioTrack, videoTrack] = tracks;
        setLocalTracks(tracks);
        setUsers((previousUsers) => [
          ...previousUsers,
          {
            uid,
            videoTrack,
            audioTrack,
          },
        ]);
        client.publish(tracks);
      });

    return () => {
      for (let localTrack of localTracks) {
        localTrack.stop();
        localTrack.close();
      }
      client.off('user-published', handleUserJoined);
      client.off('user-left', handleUserLeft);
      //   client.unpublish(tracks).then(() => client.leave());
    };
  }, []);

  return (
    <>
      <div className="min-h-screen bg-gray-900 py-6 justify-center sm:py-12 px-16 sm:px-20">
        <div
          className="bg-gradient-to-r from-blue-200 to-purple-800 bg-clip-text text-6xl font-extrabold text-transparent"
        >
          Talk Room
        </div>

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