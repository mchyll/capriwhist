import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { useAppSelector } from '../app/hooks';


export interface Round {
  cards: number;
  plays: RoundPlay[];
}

export interface RoundPlay {
  bid: number;
  got?: number;
}

export interface GameState {
  players: string[];
  rounds: Round[];
  state: "START_MENU" | "SET_BIDS" | "SET_GOT" | "GAME_OVER";
  currentPlayer: number;
  currentRound: number;
}

const initialState: GameState = {
  players: [],
  rounds: [],
  state: "START_MENU",
  currentPlayer: 0,
  currentRound: 0
};

export const gameSlice = createSlice({
  name: 'game',
  initialState,
  reducers: {
    addPlayer: (state, action: PayloadAction<string>) => {
      state.players.push(action.payload);
    },
    removePlayer: (state, action: PayloadAction<number>) => {
      state.players.splice(action.payload, 1);
    },
    startGame: state => {
      state.rounds = [];
      for (let i = 0; i < 10; i++) {
        state.rounds[i] = {
          cards: 10 - i,
          plays: []
        };
        state.rounds[19 - i] = {
          cards: 10 - i,
          plays: []
        };
      }
      state.state = "SET_BIDS";
      state.currentPlayer = 0;
      state.currentRound = 0;
    },
    setBid: (state, action: PayloadAction<number>) => {
      if (state.state === "SET_BIDS") {
        state.rounds[state.currentRound].plays.push({
          bid: action.payload
        });
        if (++state.currentPlayer >= state.players.length) {
          state.state = "SET_GOT";
          state.currentPlayer = 0;
        }
      }
    },
    setGot: (state, action: PayloadAction<number>) => {
      if (state.state === "SET_GOT") {
        state.rounds[state.currentRound].plays[state.currentPlayer].got = action.payload;
        if (++state.currentPlayer >= state.players.length) {
          if (++state.currentRound >= state.rounds.length) {
            state.state = "GAME_OVER";
            state.currentPlayer = 0;
            state.currentRound = 0;
          }
          else {
            state.state = "SET_BIDS";
            state.currentPlayer = 0;
          }
        }
      }
    },
    resetGame: state => initialState
  },
});

export const useGameState = () => useAppSelector(state => state.game.present);

export const { addPlayer, removePlayer, startGame, setBid, setGot, resetGame } = gameSlice.actions;

export default gameSlice.reducer;
