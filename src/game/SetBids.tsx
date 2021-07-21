import React from 'react';
import Button from 'react-bootstrap/Button';
import { useAppDispatch } from '../app/hooks';
import { setBid, useGameState } from './GameSlice';
import { RoundTitle } from './RoundTitle';

export function SetBids() {
  const { players, rounds, state, currentPlayer, currentRound } = useGameState();
  const dispatch = useAppDispatch();

  if (state !== "SET_BIDS") {
    return <>Error</>
  }

  const bidOptions = Array.from(Array(rounds[currentRound].cards + 1).keys());

  return (
    <>

      <RoundTitle title="Bud" />

      <div className="menu-row current-player-question">
        Hvor mange stikk byr <b>{players[currentPlayer]}</b>
      </div>

      <div className="menu-row stikk-buttons-container">
        {bidOptions.map(n => <Button onClick={() => dispatch(setBid(n))}>{n}</Button>)}
      </div>

    </>
  )
}
