import React from "react";
import PropTypes from "prop-types";
import { createUseStyles } from "react-jss";

const ordinalSuffix = {
  1: "st",
  2: "nd",
  3: "rd",
  default: "th",
};

function HighScores({ data }) {
  const classes = useStyles();
  return (
    <table className={classes.table}>
      <thead>
        <tr>
          <th>Rank</th>
          <th>Score</th>
          <th>Name</th>
        </tr>
      </thead>
      <tbody>
        {data.map((record, index) => (
          <tr
            key={`${index}_${record.name}_${record.score}`}
            className={record.isNew ? classes.newRecord : ""}
          >
            <td>
              {index + 1}
              <sup>{ordinalSuffix[index] || ordinalSuffix.default}</sup>
            </td>
            <td>{record.score}</td>
            <td className={classes.name}>{record.name}</td>
          </tr>
        ))}
      </tbody>
    </table>
  );
}

const useStyles = createUseStyles({
  table: {
    width: "100%",
    marginBottom: "3.2rem",
    textAlign: "center",
    "& th": {
      textTransform: "uppercase",
      fontWeight: "lighter",
      fontSize: "2rem",
    },
    "& th, & td": {
      padding: "0 1.6rem 0.8rem",
    },
  },
  newRecord: {
    fontWeight: "normal",
  },
  name: {
    textTransform: "uppercase",
  },
});

HighScores.propTypes = {
  data: PropTypes.arrayOf(
    PropTypes.shape({
      name: PropTypes.string,
      score: PropTypes.number,
      isNew: PropTypes.bool,
    })
  ).isRequired,
};

export default HighScores;
