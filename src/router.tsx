import { createBrowserRouter } from "react-router-dom";
import App from "./App";
import { Game } from "./game/Game";
import { Reset } from "./game/Reset";

export const router = createBrowserRouter([
  {
    path: "/",
    element: <App />,
    children: [
      {
        path: "reset",
        element: <Reset />,
      },
      {
        path: "",
        element: <Game />,
      },
    ],
  },
]);
