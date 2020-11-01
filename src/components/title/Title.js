import React from "react";
import { createUseStyles } from "react-jss";
import Separator from "../separator/Separator";

function Title({
  component: Component = "h1",
  className,
  topSeparator = false,
  bottomSeparator = false,
  ...props
}) {
  const classes = useStyles();

  return (
    <div className={classes.container}>
      {topSeparator && <Separator />}
      <Component className={[classes.title, className].join(" ")} {...props} />
      {bottomSeparator && <Separator />}
    </div>
  );
}

const useStyles = createUseStyles({
  container: {
    display: "flex",
    flexDirection: "column",
    alignItems: "center",
  },
  title: {
    textTransform: "uppercase",
    letterSpacing: "0.5em",
    fontWeight: "lighter",
    margin: "0 auto 5.2rem",
    marginLeft: "1.6rem",
    textAlign: "center",
  },
});

export default Title;
