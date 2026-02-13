import { useEffect } from "react";
import { Button } from "react-bootstrap";
import { ActionCreators as UndoActions } from "redux-undo";
import { useAppDispatch } from "../app/hooks";
import "./Game.css";
import { GameOver } from "./GameOver";
import { useGameState } from "./GameSlice";
import { Scoreboard } from "./Scoreboard";
import { SetBids } from "./SetBids";
import { SetGots } from "./SetGots";
import { ShuffleCards } from "./ShuffleCards";
import { StartMenu } from "./StartMenu";

export function Game() {
  const { state } = useGameState();
  const dispatch = useAppDispatch();

  useEffect(() => {
    document.body.className = "light";
    if (state === "SET_BIDS") {
      document.body.className = "setBids";
    } else if (state === "SET_GOT") {
      document.body.className = "setGots";
    }
    return () => {
      document.body.className = "light";
    };
  }, [state]);

  const UndoButton = () => (
    <div className="undo-container">
      <Button
        size="sm"
        variant="outline-secondary"
        onClick={() => dispatch(UndoActions.undo())}
      >
        Angre siste
      </Button>
    </div>
  );

  if (state === "SHUFFLE_CARDS") {
    return (
      <>
        <ShuffleCards />
        <UndoButton />
        <Scoreboard runningScore />
      </>
    );
  } else if (state === "SET_BIDS") {
    return (
      <>
        <SetBids />
        <UndoButton />
        <Scoreboard runningScore />
      </>
    );
  } else if (state === "SET_GOT") {
    return (
      <>
        <SetGots />
        <UndoButton />
        <Scoreboard runningScore />
      </>
    );
  } else if (state === "GAME_OVER") {
    return (
      <>
        <GameOver />
        <Scoreboard />
      </>
    );
  } else if (state === "START_MENU") {
    return (
      <>
        <StartMenu />
      </>
    );
  } else {
    return <>Unknown state: {state}</>;
  }
}
