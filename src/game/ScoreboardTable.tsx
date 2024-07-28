import React from "react";
import { useAppDispatch } from "../app/hooks";
import { useGameState } from "./GameSlice";
import { getPoints } from "./Mechanics";

export function ScoreboardTable() {
  const { players, rounds, state, currentPlayer, currentRound } =
    useGameState();
  const dispatch = useAppDispatch();

  const playerPoints = players.map((player, playerIndex) =>
    rounds
      .map((round) => getPoints(round.plays[playerIndex]) ?? 0)
      .reduce((acc, curr) => acc + curr),
  );

  return (
    <>
      <div className="menu-row">
        <table className="scoreboard">
          <thead>
            <td></td>
            {players.map((p, i) => (
              <td>
                {p}
                <br />
                {playerPoints[i]} poeng
              </td>
            ))}
          </thead>
          <tbody>
            {rounds.map((round, roundIndex) => (
              <tr>
                <td className="round-num">{roundIndex + 1}</td>
                {players.map((player, playerIndex) => {
                  const play = round.plays[playerIndex];
                  if (!play || play.got === undefined) {
                    return <td></td>;
                  } else {
                    return (
                      <td>
                        <div className="results">
                          <div className="bid-got">
                            <div>Bud: {play.bid}</div>
                            <div>Fikk: {play.got}</div>
                          </div>
                          <div className="points">{getPoints(play)}</div>
                        </div>
                      </td>
                    );
                  }
                })}
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </>
  );
}
