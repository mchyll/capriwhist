import { Button } from "react-bootstrap";
import { useAppDispatch } from "../app/hooks";
import { startBids, useGameState } from "./GameSlice";
import { getNumCards } from "./Mechanics";
import { RoundTitle } from "./RoundTitle";

export const ShuffleCards = () => {
  const { currentRound, players } = useGameState();
  const dispatch = useAppDispatch();

  const currentShufflerPlayer = players[currentRound % players.length];

  return (
    <>
      <RoundTitle />

      <div className="menu-row shuffle-cards-text text-center">
        <b>{currentShufflerPlayer}</b> skal stokke og dele ut kortene
      </div>

      <div className="menu-row text-center">
        <Button onClick={() => dispatch(startBids())}>
          Meld bud ✋{getNumCards(currentRound) > 5 && "🤚"}
        </Button>
      </div>
    </>
  );
};
