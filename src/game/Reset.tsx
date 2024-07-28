import { Button } from "react-bootstrap";
import { useNavigate } from "react-router-dom";
import { ActionCreators as UndoActions } from "redux-undo";
import { useAppDispatch } from "../app/hooks";
import { persistKey } from "../app/store";
import { resetGame } from "./GameSlice";

export function Reset() {
  const dispatch = useAppDispatch();
  const navigate = useNavigate();
  return (
    <>
      <div className="menu-row">
        <Button
          onClick={() => {
            dispatch(resetGame());
            dispatch(UndoActions.clearHistory());
            navigate("/", { replace: true });
          }}
        >
          Nullstill spillet
        </Button>
      </div>

      <div className="menu-row">
        <Button
          variant="danger"
          onClick={() => {
            window.localStorage.removeItem(`persist:${persistKey}`);
            window.location.reload();
          }}
        >
          Nullstill alt
        </Button>
      </div>
    </>
  );
}
