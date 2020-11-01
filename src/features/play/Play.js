import React, { useState } from "react";
import { createUseStyles } from "react-jss";
import Title from "../../components/title/Title";
import Tiles from "./Tiles";

const INITIAL_SIZE = 2;

function getRandomPosition(size) {
  return Math.floor(Math.random() * size * size);
}

function getRandomColor() {
  const h = Math.floor(Math.random() * 360);
  const s = Math.floor(Math.random() * 40 + 30);
  const l = Math.floor(Math.random() * 40 + 40);
  return [h, s, l];
}

function generateInitialState() {
  return {
    color: getRandomColor(),
    size: INITIAL_SIZE,
    differentTile: getRandomPosition(INITIAL_SIZE),
  };
}

function Play({ onGameOver }) {
  const [{ color, size, differentTile }, setState] = useState(
    generateInitialState
  );
  const score = size - INITIAL_SIZE;
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

    onGameOver(score);
  }

  return (
    <>
      <Title className={classes.title}>Pick the different color</Title>
      <Tiles
        size={size}
        color={color}
        differentTile={differentTile}
        handleClick={handleClick}
      />
      <Title component="h3" className={classes.score}>
        Your score: {score}
      </Title>
    </>
  );
}

const useStyles = createUseStyles({
  title: {
    marginBottom: "5.2rem",
  },
  score: {
    marginTop: "5.2rem",
  },
});

export default Play;
