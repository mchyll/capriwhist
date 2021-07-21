import React from 'react';
import { useAppDispatch } from '../app/hooks';
import { useGameState } from './GameSlice';
import { getAccumulatedScores, getPoints } from './Mechanics';

export function Scoreboard(props: { runningScore?: boolean }) {
  const { players, rounds } = useGameState();

  return (
    <>

      {props.runningScore &&
        <div className="menu-row scoreboard-sum">
          {getAccumulatedScores(players, rounds).map((player) =>
            <div>
              <div>{player.player}</div>
              <div>{player.points}</div>
            </div>
          )}
        </div>
      }

      <div className="menu-row scoreboard">
        {rounds.map((round, roundIndex) =>
          <div className="round">
            <div className="round-num">{roundIndex + 1}</div>
            <div className="round-players">
              {players.map((player, playerIndex) => {
                const play = round.plays[playerIndex];
                return (
                  <div className="player">
                    <div className="player-name">{player}</div>
                    <div>
                      {play !== undefined &&
                        <>
                          <div>Bud: {play.bid}</div>
                          <div>Fikk: {play.got}</div>
                        </>
                      }
                    </div>
                    <div className="points">{getPoints(play)}</div>
                  </div>
                )
              })}
            </div>
          </div>
        )}

        {/*
        <table className="scoreboard">
          <thead>
            <td></td>
            {players.map((p, i) => <td>{p}<br />{playerPoints[i]} poeng</td>)}
          </thead>
          <tbody>
            {rounds.map((round, roundIndex) =>
              <tr>
                <td className="round-num">{roundIndex + 1}</td>
                {players.map((player, playerIndex) => {
                  const play = round.plays[playerIndex];
                  if (!play || play.got === undefined) {
                    return <td></td>
                  }
                  else {
                    return (
                      <td>
                        <div className="results">
                          <div className="bid-got">
                            <div>Bud: {play.bid}</div>
                            <div>Fikk: {play.got}</div>
                          </div>
                          <div className="points">
                            {getPoints(play)}
                          </div>
                        </div>
                      </td>
                    )
                  }
                })}
              </tr>
            )}
          </tbody>
        </table>
        */}

      </div>

    </>
  )
}
