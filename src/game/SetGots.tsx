import React from 'react';
import Button from 'react-bootstrap/Button';
import { useAppDispatch } from '../app/hooks';
import { useGameState, setGot } from './GameSlice';
import { RoundTitle } from './RoundTitle';

export function SetGots() {
  const { players, rounds, state, currentPlayer, currentRound } = useGameState();
  const dispatch = useAppDispatch();

  if (state !== "SET_GOT") {
    return <>Error</>
  }

  const gotOptions = Array.from(Array(rounds[currentRound].cards + 1).keys());
  const bid = rounds[currentRound].plays[currentPlayer].bid;

  return (
    <>

      <RoundTitle title="Stikk" />

      <div className="menu-row current-player-question">
        Hvor mange stikk fikk <b>{players[currentPlayer]}</b>
      </div>

      <div className="menu-row stikk-buttons-container">
        {gotOptions.map(n => <Button variant={n === bid ? "success" : "primary"} onClick={() => dispatch(setGot(n))}>{n}</Button>)}
      </div>

    </>
  )
}
