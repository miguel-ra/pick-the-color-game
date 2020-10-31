import React, { useState } from "react";
import Separator from "../../components/separator/Separator";
import Title from "../../components/title/Title";

const INITIAL_HIGHSCORES = [
  {
    name: "Miguel",
    score: 10,
  },
  {
    name: "Felipe",
    score: 9,
  },
  {
    name: "Rui",
    score: 7,
  },
  {
    name: "Jim",
    score: 2,
  },
];

const ordinalSuffix = {
  1: "st",
  2: "nd",
  3: "rd",
  default: "th",
};

function GameOver({ score = 0, onReset }) {
  const [highScores, setHighScores] = useState(INITIAL_HIGHSCORES);

  function handleSubmit(event) {
    event.preventDefault();
    setHighScores((highScores) => [
      ...highScores,
      {
        name: event.target.elements.name.value,
        score: event.target.elements.score.value,
      },
    ]);
  }

  return (
    <>
      <Separator />
      <Title style={{ marginBottom: "3.2rem" }}>High scores</Title>
      <Separator />
      <table style={{ marginBottom: "3.2rem", textAlign: "left" }}>
        <thead>
          <tr>
            <th
              style={{
                textTransform: "uppercase",
                fontWeight: "lighter",
                padding: "0 1.6rem 0.8rem 0",
                fontSize: "2rem",
              }}
            >
              Rank
            </th>
            <th
              style={{
                textTransform: "uppercase",
                fontWeight: "lighter",
                padding: "0 1.6rem 0.8rem 0",
                fontSize: "2rem",
              }}
            >
              Score
            </th>
            <th
              style={{
                textTransform: "uppercase",
                fontWeight: "lighter",
                padding: "0 1.6rem 0.8rem 0",
                fontSize: "2rem",
              }}
            >
              Name
            </th>
          </tr>
        </thead>
        <tbody>
          {highScores.map((record, index) => (
            <tr key={`${index}_${record.name}_${record.score}`}>
              <td>
                {index + 1}
                <sup>{ordinalSuffix[index] || ordinalSuffix.default}</sup>
              </td>
              <td>{record.score}</td>
              <td style={{ textTransform: "uppercase" }}>{record.name}</td>
            </tr>
          ))}
        </tbody>
      </table>
      <Separator />
      <Title component="h2" style={{ marginBottom: "3.2rem" }}>
        You score: {score}
      </Title>
      <Separator />
      <Title component="h3" style={{ marginBottom: "1.6rem" }}>
        Save your score
      </Title>
      <form onSubmit={handleSubmit} style={{ marginBottom: "1.6rem" }}>
        <input type="hidden" id="score" name="score" value={score} />
        <label>Enter you name:</label>
        <input id="name" name="name" maxLength="10" required />
        <button type="submit">Save</button>
      </form>
      <br />
      <button onClick={onReset}>Try again</button>
    </>
  );
}

export default GameOver;
