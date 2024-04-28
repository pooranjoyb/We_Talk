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
      </div>
    </div>
  );
};