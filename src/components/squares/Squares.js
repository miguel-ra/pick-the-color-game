import React, { useRef } from "react";
import { createUseStyles } from "react-jss";

const SIZE = 100;

function formatHSL(color) {
  return `hsl(${color[0]}, ${color[1]}%, ${color[2]}%)`;
}

const useStyles = createUseStyles({
  container: {
    display: "grid",
    gridTemplateColumns: ({ size }) => `repeat(${size}, 1fr)`,
    gridTemplateRows: ({ size }) => `repeat(${size}, 1fr)`,
    gridGap: "1.6rem",
    color: "white",
    width: `calc(min(${SIZE}vh, ${SIZE}vw) - 3.2rem)`,
    height: `calc(min(${SIZE}vh, ${SIZE}vw) - 3.2rem)`,
  },
  tile: {
    cursor: "pointer",
    padding: "5%",
  },
});

function generateDifferentColor(color, size) {
  const factor = 50 / size;
  const plusOrMinus = color[2] > 50 ? -1 : 1;

  return [color[0], color[1] - factor, color[2] + factor * plusOrMinus];
}

function Squares({ size, color, differentTile, handleClick }) {
  const differentColor = generateDifferentColor(color, size);
  const classes = useStyles({ size });
  const squareRef = useRef();

  return (
    <div ref={squareRef} className={classes.container}>
      {[...Array(size * size)].map((_, tileIndex) => (
        <div
          key={`${size}_${tileIndex}`}
          className={classes.tile}
          style={{
            backgroundColor: formatHSL(
              tileIndex === differentTile ? differentColor : color
            ),
          }}
          onClick={() => handleClick(tileIndex)}
        />
      ))}
    </div>
  );
}

export default Squares;
