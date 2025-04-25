import React, { useState, useEffect, useRef } from 'react';

const Draggable = ({ children, initialLeft = -220, initialTop = 23 }) => {
  const [position, setPosition] = useState({ left: initialLeft, top: initialTop });
  const [moving, setMoving] = useState(false);
  const draggableRef = useRef(null);

  const onMouseDown = () => {
    setMoving(true);
  };

  const onMouseMove = (e) => {
    if (moving) {
      setPosition(prev => ({
        left: prev.left + e.movementX,
        top: prev.top + e.movementY
      }));
    }
  };

  const onMouseUp = () => {
    setMoving(false);
  };

  useEffect(() => {
    window.addEventListener('mousemove', onMouseMove);
    window.addEventListener('mouseup', onMouseUp);

    return () => {
      window.removeEventListener('mousemove', onMouseMove);
      window.removeEventListener('mouseup', onMouseUp);
    };
  }, [moving]);

  return (
    <div
      ref={draggableRef}
      onMouseDown={onMouseDown}
      style={{
        left: `${position.left}px`,
        top: `${position.top}px`,
        userSelect: 'none',
        cursor: moving ? 'grabbing' : 'pointer',
        border: 'solid 1px gray',
        position: 'absolute'
      }}
      className={`draggable ${moving ? "moving" : ""}`}
    >
      {children}
    </div>
  );
};

export default Draggable;
