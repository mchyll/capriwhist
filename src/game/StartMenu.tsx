import React, { useRef, useState } from "react";
import Button from "react-bootstrap/Button";
import FormControl from "react-bootstrap/FormControl";
import InputGroup from "react-bootstrap/InputGroup";
import { useAppDispatch } from "../app/hooks";
import { addPlayer, removePlayer, startGame, useGameState } from "./GameSlice";

export function StartMenu() {
  const [name, setName] = useState("");
  const nameInputRef = useRef<HTMLInputElement>(null);
  const { players } = useGameState();
  const dispatch = useAppDispatch();

  const onAddPlayer = () => {
    const trimmedName = name.trim();
    if (trimmedName) {
      dispatch(addPlayer(trimmedName));
      setName("");
    }
    nameInputRef.current?.focus();
  };

  return (
    <>
      <div className="menu-row">
        <h1>Legg til spillere</h1>
        <Button
          disabled={players.length < 2 || players.length > 5}
          onClick={() => dispatch(startGame())}
        >
          Start spillet
        </Button>
      </div>

      <div className="menu-row">
        <InputGroup>
          <FormControl
            placeholder="Navn på spiller"
            value={name}
            onChange={(e) => setName(e.target.value)}
            onKeyPress={(e: React.KeyboardEvent<HTMLInputElement>) => {
              if (e.key === "Enter") {
                onAddPlayer();
              }
            }}
            disabled={players.length >= 5}
            ref={nameInputRef}
          />
          <Button
            variant="outline-primary"
            disabled={players.length >= 5}
            onClick={onAddPlayer}
          >
            Legg til
          </Button>
        </InputGroup>
      </div>

      {players.map((playerName, playerIndex) => (
        <div className="menu-row player-row">
          <span>{playerName}</span>
          <Button
            size="sm"
            variant="outline-danger"
            onClick={() => dispatch(removePlayer(playerIndex))}
          >
            Fjern
          </Button>
        </div>
      ))}
    </>
  );
}
