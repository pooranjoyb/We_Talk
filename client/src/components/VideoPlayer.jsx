import React, { useEffect, useRef } from 'react';

export const VideoPlayer = ({ user}) => {
  const ref = useRef();

  useEffect(() => {
    user.videoTrack.play(ref.current);
  }, []);

  return (
    <div className='rounded-3xl overflow-hidden '>
      <div
        ref={ref}
        style={{ width: '350px', height: '350px' }}
      >
        {/* <div className='absolute bottom-4 left-4 border-1 p-2 rounded-xl bg-gradient-to-r from-blue-600 to-purple-800'>
          
        </div> */}
      </div>
    </div>
  );
};