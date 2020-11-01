import React from "react";
import PropTypes from "prop-types";
import { createUseStyles } from "react-jss";
import Separator from "../separator/Separator";

function Title({
  component: Component,
  className,
  topSeparator,
  bottomSeparator,
  ...props
}) {
  const classes = useStyles();

  return (
    <div className={classes.titleRoot}>
      {topSeparator && <Separator />}
      <Component className={[classes.title, className].join(" ")} {...props} />
      {bottomSeparator && <Separator />}
    </div>
  );
}

const useStyles = createUseStyles({
  titleRoot: {
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

Title.defaultProps = {
  component: "h1",
  className: undefined,
  topSeparator: false,
  bottomSeparator: false,
};

Title.propTypes = {
  component: PropTypes.elementType,
  className: PropTypes.string,
  topSeparator: PropTypes.bool,
  bottomSeparator: PropTypes.bool,
};

export default Title;
