import React, { useState } from "react";
import { createUseStyles } from "react-jss";
import Play from "./features/play/Play";
import GameOver from "./features/game-over/GameOver";

function App() {
  const [screen, setScreen] = useState("play");
  const [score, setScore] = useState();
  const classes = useStyles();

  const screens = {
    play: (
      <Play
        onGameOver={(score) => {
          setScore(score);
          setScreen("gameOver");
        }}
      />
    ),
    gameOver: <GameOver score={score} onReset={() => setScreen("play")} />,
  };

  return (
    <div className={classes.container}>{screens[screen] || screens.play}</div>
  );
}

const useStyles = createUseStyles({
  container: {
    display: "flex",
    padding: "1.6rem",
    justifyContent: "center",
    alignItems: "center",
    height: "100%",
    boxSizing: "border-box",
    flexDirection: "column",
    position: "relative",
  },
});

export default App;
