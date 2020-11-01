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

  return <div className={classes.app}>{screens[screen] || screens.play}</div>;
}

const useStyles = createUseStyles({
  app: {
    flex: 1,
    display: "flex",
    margin: "3.2rem",
    height: "100%",
    justifyContent: "center",
    alignItems: "center",
    boxSizing: "border-box",
    flexDirection: "column",
    position: "relative",
  },
});

export default App;
