import React from 'react';

export default function Preloader() {
  return (
    <div className="flex items-center w-full justify-center min-h-screen">
      <img src="/assets/preloader.gif" alt="" className='rounded-full  w-34 ' />
    </div>
  );
}