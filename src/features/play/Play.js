import React, { useState } from "react";
import Title from "../../components/title/Title";
import Tiles from "./Tiles";

const INITIAL_SIZE = 2;

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

function Play({ onGameOver }) {
  const [{ color, size, differentTile }, setState] = useState(
    generateInitialState
  );
  const score = size - INITIAL_SIZE;

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
      <Title style={{ marginBottom: "5.2rem" }}>Pick the different color</Title>
      <Tiles
        size={size}
        color={color}
        differentTile={differentTile}
        handleClick={handleClick}
      />
      <Title component="h3" style={{ marginTop: "5.2rem" }}>
        Your score: {score}
      </Title>
    </>
  );
}

export default Play;
