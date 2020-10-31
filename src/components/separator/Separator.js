import React from "react";
import { createUseStyles } from "react-jss";

function Separator() {
  const classes = useStyles();
  return <hr className={classes.root} />;
}

const useStyles = createUseStyles({
  root: {
    border: "none",
    borderTop: "1px solid grey",
    width: "100%",
    maxWidth: "250px",
    margin: "0 0 3.2rem",
  },
});

export default Separator;
