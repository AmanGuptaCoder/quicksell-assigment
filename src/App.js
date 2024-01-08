import React, { useState, useRef, useEffect } from "react";
import "./App.css";

const App = () => {
  const Ref = useRef(null);
  const [timer, setTimer] = useState("05:00");
  const [isRunning, setIsRunning] = useState(false);

  const getTime = (e) => {
    const total = Date.parse(e) - Date.parse(new Date());
    const seconds = Math.floor((total / 1000) % 60);
    const minutes = Math.floor((total / 1000 / 60) % 60);
  
    return {
      total,
      minutes,
      seconds,
    };
  };

  const startTimer = (e) => {
    let { total, minutes, seconds } = getTime(e);
    if (total >= 0) {
      setTimer(
        (minutes > 9 ? minutes : "0" + minutes) +
          ":" +
          (seconds > 9 ? seconds : "0" + seconds)
      );
    }
  };

  const clearTimer = (e) => {
    setTimer("05:00");

    if (Ref.current) clearInterval(Ref.current);
    const id = setInterval(() => {
      startTimer(e);
    }, 1000);
    Ref.current = id;
  };

  const getDeadTime = () => {
    let deadline = new Date();
    deadline.setMinutes(deadline.getMinutes() + 5);
    return deadline;
  };

  useEffect(() => {
    if (isRunning) {
      clearTimer(getDeadTime());
    } else {
      if (Ref.current) clearInterval(Ref.current);
    }
  }, [isRunning]);

  const onClickStart = () => {
    setIsRunning(true);
  };

  const onClickStop = () => {
    setIsRunning(false);
  };

  const onClickReset = () => {
    setIsRunning(false);
    setTimer("05:00");
  };

  return (
    <div className="container">
      <div className="timer-box">
        <h2>{timer}</h2>
        <div className="buttons">
          <button onClick={onClickStart}>Start</button>
          <button onClick={onClickStop}>Stop</button>
          <button onClick={onClickReset}>Reset</button>
        </div>
      </div>
    </div>
  );
};

export default App;