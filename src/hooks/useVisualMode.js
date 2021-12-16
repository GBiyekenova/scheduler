import { useState } from "react";

export default function useVisualMode(initial) {
  const [mode, setMode] = useState(initial);
  const [history, setHistory] = useState([initial]);

  const transition = (nextState, replace = false) => {
    if (replace === true) {
      setMode(nextState);
      let arr = [...history];
      arr.splice(arr.length - 1, 1);
      return setHistory(arr);
    }
    setMode(nextState);
    setHistory([...history, nextState]);
  };

  const back = () => {
    if (history.length === 1) {
      return setMode(initial);
    }
    let arr = [...history];
    arr.pop();
    setHistory(arr);
    setMode(arr[arr.length - 1]);
  };

  return { mode, transition, back };
}
