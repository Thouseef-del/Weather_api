import React, { useState, useEffect } from 'react';

const Stopwatch = () => {
  const [time, setTime] = useState(0); 
  const [isRunning, setIsRunning] = useState(false);

  useEffect(() => {
    let timer;
    if (isRunning) {
      timer = setInterval(() => {
        setTime((prevTime) => prevTime + 10);  
      }, 10);
    } else {
      clearInterval(timer);
    }
    return () => clearInterval(timer);
  }, [isRunning]);

  const formatTime = (time) => {
    const getMilliseconds = time % 1000;
    const seconds = Math.floor(time / 1000) % 60;
    const minutes = Math.floor(time / (1000 * 60)) % 60;

    return `${String(minutes).padStart(2, '0')}:${String(seconds).padStart(2, '0')}:${String(
      getMilliseconds
    ).padStart(3, '0')}`;
  };

  const handleStart = () => {
    setIsRunning(true);
  };

  const handleStop = () => {
    setIsRunning(false);
  };

  const handleReset = () => {
    setTime(0);
    setIsRunning(false);
  };

  return (
    <div style={{ textAlign: 'center', fontFamily: 'Arial, sans-serif', marginTop: '50px' }}>
      <h1>Stopwatch</h1>
      <span style={{ display: 'block', fontSize: '2rem', margin: '20px 0' }}>
        {formatTime(time)}
      </span>
      <button
        onClick={handleStart}
        style={{
          padding: '10px 20px',
          margin: '5px',
          fontSize: '1rem',
          border: 'none',
          borderRadius: '5px',
          backgroundColor: '#4CAF50',
          color: 'white',
          cursor: 'pointer',
        }}
      >
        Start
      </button>
      <button
        onClick={handleStop}
        style={{
          padding: '10px 20px',
          margin: '5px',
          fontSize: '1rem',
          border: 'none',
          borderRadius: '5px',
          backgroundColor: '#f44336',
          color: 'white',
          cursor: 'pointer',
        }}
      >
        Stop
      </button>
      <button
        onClick={handleReset}
        style={{
          padding: '10px 20px',
          margin: '5px',
          fontSize: '1rem',
          border: 'none',
          borderRadius: '5px',
          backgroundColor: '#2196F3',
          color: 'white',
          cursor: 'pointer',
        }}
      >
        Reset
      </button>
    </div>
  );
};

export default Stopwatch;
