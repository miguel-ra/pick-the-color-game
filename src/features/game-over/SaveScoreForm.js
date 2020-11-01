import React, { useEffect } from "react";
import PropTypes from "prop-types";
import { createUseStyles } from "react-jss";
import Title from "../../components/title/Title";
import { BREAKPOINT_SMALL } from "../../styles/breakpoints";

function SaveScoreForm({ onSubmit, score }) {
  const classes = useStyles();

  useEffect(() => {
    document.querySelector("#name")?.focus();
  }, []);

  function handleSubmit(event) {
    event.preventDefault();
    const { name, score } = event.target.elements;
    onSubmit({ name: name.value, score: score.value });
  }

  return (
    <>
      <Title component="h3" className={classes.title}>
        Save your score
      </Title>
      <form autoComplete="off" onSubmit={handleSubmit} className={classes.form}>
        <input type="hidden" id="score" name="score" value={score} />
        <label>Enter you name</label>
        <input id="name" name="name" maxLength="10" required />
        <button type="submit">Save</button>
      </form>
    </>
  );
}

const useStyles = createUseStyles({
  title: {
    fontSize: "2rem",
    marginBottom: "1.6rem",
  },
  form: {
    display: "flex",
    gap: "1.6rem",
    width: "100%",
    flexDirection: "column",
    alignItems: "stretch",
  },
  [`@media (min-width: ${BREAKPOINT_SMALL})`]: {
    form: {
      flexDirection: "row",
      alignItems: "baseline",
      justifyContent: "center",
      gap: "0",
      "& label": {
        marginRight: "1.6rem",
      },
      "& input": {
        margin: "0 -1px",
      },
    },
  },
});

SaveScoreForm.propTypes = {
  score: PropTypes.number.isRequired,
  onSubmit: PropTypes.func.isRequired,
};

export default SaveScoreForm;
