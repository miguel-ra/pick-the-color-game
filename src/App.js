import React, { useState } from "react";
import { createUseStyles } from "react-jss";
import Squares from "./components/squares/Squares";

const INITIAL_SIZE = 2;

const useStyles = createUseStyles({
  container: {
    display: "flex",
    padding: "1.6rem",
    justifyContent: "center",
    alignItems: "center",
    height: "100%",
    boxSizing: "border-box",
  },
});

function getRandomPosition(size) {
  return Math.floor(Math.random() * size * size);
}

function getRandomColor() {
  const h = Math.floor(Math.random() * 360);
  const s = Math.floor(Math.random() * 60 + 40);
  const l = Math.floor(Math.random() * 50 + 30);
  return [h, s, l];
}

function generateInitialState() {
  return {
    color: getRandomColor(),
    size: INITIAL_SIZE,
    differentTile: getRandomPosition(INITIAL_SIZE),
  };
}

function App() {
  const [{ color, size, differentTile }, setState] = useState(
    generateInitialState
  );
  const classes = useStyles();

  function nextStep() {
    setState(({ size }) => ({
      size: size + 1,
      color: getRandomColor(),
      differentTile: getRandomPosition(size + 1),
    }));
  }

  function handleClick(tileIndex) {
    if (tileIndex === differentTile) {
      return nextStep();
    }

    setState(generateInitialState);
  }

  return (
    <div className={classes.container}>
      <Squares
        size={size}
        color={color}
        differentTile={differentTile}
        handleClick={handleClick}
      />
    </div>
  );
}

export default App;
