import React from "react";
import { useGameState } from "./GameSlice";
import { getAccumulatedScores } from "./Mechanics";

export function GameOver() {
  const { players, rounds } = useGameState();

  const playerPoints = getAccumulatedScores(players, rounds).sort(
    (a, b) => b.points - a.points,
  );

  return (
    <>
      <div className="menu-row">
        <h1>Spillet er ferdig</h1>
      </div>

      <div className="menu-row">
        <h2>Vinneren er {playerPoints[0].player} 🥳</h2>
        <ol>
          {playerPoints.map((p) => (
            <li>
              {p.player}: {p.points} poeng
            </li>
          ))}
        </ol>
      </div>
    </>
  );
}
