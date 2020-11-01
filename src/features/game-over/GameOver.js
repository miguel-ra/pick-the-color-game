import React, { useState } from "react";
import PropTypes from "prop-types";
import { createUseStyles } from "react-jss";
import Title from "../../components/title/Title";
import { BREAKPOINT_SMALL } from "../../styles/breakpoints";
import { useLocalStorageState } from "../../utils/useLocalStorageState";
import HighScores from "./HighScores";
import SaveScoreForm from "./SaveScoreForm";

const SCORES_TO_SAVE = 5;

function GameOver({ score, onReset }) {
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

  return (
    <div className={classes.gameOver}>
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
  gameOver: {
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
    marginBottom: "3.2rem",
    width: "100%",
  },
  title: {
    marginBottom: "3.2rem",
  },
  button: {
    width: "100%",
  },
  [`@media (min-width: ${BREAKPOINT_SMALL})`]: {
    button: {
      width: "auto",
    },
    gameOver: {
      width: "auto",
      height: "auto",
    },
  },
});

GameOver.defaultProps = {
  score: 0,
};

GameOver.propTypes = {
  score: PropTypes.number,
  onReset: PropTypes.func.isRequired,
};

export default GameOver;
