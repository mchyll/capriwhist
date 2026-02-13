import { useGameState } from "./GameSlice";
import { getNumCards } from "./Mechanics";

export function RoundTitle(props: { title?: string }) {
  const { rounds, currentRound } = useGameState();

  return (
    <div className="menu-row round-title">
      <div>
        <h1>
          Runde {currentRound + 1}
          {props.title !== undefined && " - "}
          {props.title}
        </h1>
      </div>
      <div>
        <h1>{getNumCards(currentRound)} kort</h1>
      </div>
    </div>
  );
}
