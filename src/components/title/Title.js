import React from "react";
import { createUseStyles } from "react-jss";

function Title({ component: Component = "h1", ...props }) {
  const classes = useStyles();

  return <Component className={classes.title} {...props} />;
}

const useStyles = createUseStyles({
  title: {
    textTransform: "uppercase",
    letterSpacing: "0.5em",
    fontWeight: "lighter",
    margin: "0 auto 5.2rem",
    textAlign: "center",
  },
});

export default Title;
