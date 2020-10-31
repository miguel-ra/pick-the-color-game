import React from "react";
import { createUseStyles } from "react-jss";

const useStyles = createUseStyles({
  title: {
    textTransform: "uppercase",
    letterSpacing: "0.5em",
    fontWeight: "lighter",
    margin: "0 auto 5.2rem",
    textAlign: "center",
  },
});

function Title({ component: Component = "h1", ...props }) {
  const classes = useStyles();

  return <Component className={classes.title} {...props} />;
}

export default Title;
