import React, { useRef } from "react";
import PropTypes from "prop-types";
import { createUseStyles } from "react-jss";
import useMoveWithKeys from "./useMoveWithKeys";

const MAX_HEIGHT = 50;
const MAX_WIDTH = 100;

function arrayToHSL(color) {
  return `hsl(${color[0]}, ${color[1]}%, ${color[2]}%)`;
}

function generateDifferentColor(color, size) {
  const factor = 30 / (size - 1);
  const plusOrMinus = color[2] > 50 ? -1 : 1;

  return [color[0], color[1], color[2] + factor * plusOrMinus];
}

function Tiles({ size, color, differentTile, handleClick }) {
  const differentColor = generateDifferentColor(color, size);
  const classes = useStyles({ size });
  const parentRef = useRef();
  useMoveWithKeys(parentRef);

  return (
    <div ref={parentRef} className={classes.tiles}>
      {[...Array(size * size)].map((_, tileIndex) => (
        <button
          key={`${size}_${tileIndex}`}
          className={classes.tile}
          style={{
            backgroundColor: arrayToHSL(
              tileIndex === differentTile ? differentColor : color
            ),
          }}
          onClick={() => handleClick(tileIndex)}
        />
      ))}
    </div>
  );
}

const useStyles = createUseStyles({
  tiles: {
    display: "grid",
    gridTemplateColumns: ({ size }) => `repeat(${size}, 1fr)`,
    gridGap: "min(1vw, 1vh)",
    color: "white",
    width: `calc(min(${MAX_HEIGHT}vh, ${MAX_WIDTH}vw) - 3.2rem)`,
    height: `calc(min(${MAX_HEIGHT}vh, ${MAX_WIDTH}vw) - 3.2rem)`,
  },
  tile: {
    border: "none",
    cursor: "pointer",
    transition: "transform 0.2s linear",
    padding: 0,
    "&:focus, &:hover": {
      outline: "none",
      transform: "scale(0.9) rotate(2deg)",
    },
  },
});

Tiles.propTypes = {
  size: PropTypes.number.isRequired,
  color: PropTypes.arrayOf(PropTypes.number).isRequired,
  differentTile: PropTypes.number.isRequired,
  handleClick: PropTypes.func.isRequired,
};

export default Tiles;
