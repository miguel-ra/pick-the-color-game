import React from "react";
import { createUseStyles } from "react-jss";
import Title from "../../components/title/Title";
import { BREAKPOINT_SMALL } from "../../styles/breakpoints";

function SaveScoreForm({ onSubmit, score }) {
  const classes = useStyles();

  return (
    <>
      <Title component="h3" className={classes.title}>
        Save your score
      </Title>
      <form autoComplete="off" onSubmit={onSubmit} className={classes.form}>
        <input type="hidden" id="score" name="score" value={score} />
        <label>Enter you name</label>
        <input id="name" name="name" maxLength="10" required />
        <button type="submit">Save</button>
      </form>
    </>
  );
}

const useStyles = createUseStyles({
  title: { marginBottom: "1.6rem" },
  form: {
    display: "flex",
    gap: "1.6rem",
    width: "100%",
    flexDirection: "column",
    alignItems: "stretch",
    marginBottom: "3.2rem",
  },
  [`@media (min-width: ${BREAKPOINT_SMALL})`]: {
    form: {
      flexDirection: "row",
      alignItems: "baseline",
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

export default SaveScoreForm;
