import React from "react";
import { createUseStyles } from "react-jss";
import Play from "./features/play/Play";

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

function App() {
  const classes = useStyles();

  return (
    <div className={classes.container}>
      <Play />
    </div>
  );
}

export default App;
