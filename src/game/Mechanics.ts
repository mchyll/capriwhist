import { Round, RoundPlay } from "./GameSlice";

export function getPoints(play: RoundPlay) {
  if (!play || play.got === undefined) {
    return undefined;
  }
  const diff = Math.abs(play.bid - play.got);
  return diff === 0 ? 10 + play.bid : -diff;
}

export function getAccumulatedScores(players: string[], rounds: Round[]) {
  return players.map((player, playerIndex) => ({
    player,
    points: rounds
      .map((round) => getPoints(round.plays[playerIndex]) ?? 0)
      .reduce((acc, curr) => acc + curr, 0),
  }));
}
