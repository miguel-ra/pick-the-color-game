import React, { useState } from "react";
import { createUseStyles } from "react-jss";
import Title from "../../components/title/Title";
import { BREAKPOINT_SMALL } from "../../styles/breakpoints";
import { useLocalStorageState } from "../../utils/useLocalStorageState";
import HighScores from "./HighScores";
import SaveScoreForm from "./SaveScoreForm";

const SCORES_TO_SAVE = 5;

function GameOver({ score = 0, onReset }) {
  const [saved, setSaved] = useState();
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

  function handleSubmit(event) {
    event.preventDefault();
    setHighScores((highScores) => {
      return [
        ...highScores,
        {
          name: event.target.elements.name.value,
          score: event.target.elements.score.value,
          isNew: true,
        },
      ]
        .sort((a, b) => b.score - a.score)
        .slice(0, SCORES_TO_SAVE);
    });
    setSaved(event.target.elements.name.value);
  }

  return (
    <div className={classes.container}>
      <div className={classes.content}>
        <Title
          component="h2"
          className={classes.title}
          topSeparator
          bottomSeparator={!highScores.length}
        >
          You score: {score}
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
    maxWidth: "80vw",
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
      height: "auto",
    },
  },
});

export default GameOver;
