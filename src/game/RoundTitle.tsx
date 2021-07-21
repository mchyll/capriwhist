import { useGameState } from "./GameSlice";


export function RoundTitle(props: { title: string }) {
  const { rounds, currentRound } = useGameState();

  return (
    <div className="menu-row round-title">
      <div><h1>Runde {currentRound + 1} - {props.title}</h1></div>
      <div><h1>{rounds[currentRound].cards} kort</h1></div>
    </div>
  )
}