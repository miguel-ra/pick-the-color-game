import React, { useState } from "react";
import { createUseStyles } from "react-jss";
import Title from "../../components/title/Title";
import { BREAKPOINT_SMALL } from "../../styles/breakpoints";
import { useLocalStorageState } from "../../utils/useLocalStorageState";
import HighScores from "./HighScores";
import SaveScoreForm from "./SaveScoreForm";

const SCORES_TO_SAVE = 10;

function GameOver({ score = 0, onReset }) {
  const [saved, setSaved] = useState(false);
  const [highScores, setHighScores] = useLocalStorageState(
    "pick-the-color-game:highScores",
    [],
    {
      deserialize: (value) =>
        JSON.parse(value).map(({ isNew, ...score }) => score),
    }
  );
  const classes = useStyles();

  const canSave = (highScores[SCORES_TO_SAVE - 1]?.score || 0) < score;

  function handleSubmit({ name, score }) {
    setHighScores((highScores) => {
      return [...highScores, { name, score, isNew: true }]
        .sort((a, b) => b.score - a.score)
        .slice(0, SCORES_TO_SAVE);
    });
    setSaved(true);
  }

  console.log(highScores);

  return (
    <div className={classes.container}>
      <div className={classes.content}>
        <Title
          component="h2"
          className={classes.title}
          topSeparator
          bottomSeparator={!highScores.length}
        >
          Your score: {score}
        </Title>
        {highScores.length ? (
          <>
            <Title className={classes.title} topSeparator bottomSeparator>
              High scores
            </Title>
            <HighScores data={highScores} />
          </>
        ) : null}
        {!saved && canSave && (
          <SaveScoreForm onSubmit={handleSubmit} score={score} />
        )}
      </div>
      <button className={classes.button} onClick={onReset}>
        Try again
      </button>
    </div>
  );
}

const useStyles = createUseStyles({
  container: {
    width: "100%",
    display: "flex",
    flexDirection: "column",
    alignItems: "center",
    height: "100%",
    justifyContent: "space-between",
  },
  content: {
    display: "flex",
    flexDirection: "column",
    alignItems: "center",
    marginTop: "1.6rem",
    marginBottom: "3.2rem",
    width: "100%",
  },
  title: {
    marginBottom: "3.2rem",
  },
  button: {
    width: "100%",
    marginBottom: "1.6rem",
  },
  [`@media (min-width: ${BREAKPOINT_SMALL})`]: {
    button: {
      width: "auto",
    },
    container: {
      width: "auto",
      height: "auto",
    },
  },
});

export default GameOver;
