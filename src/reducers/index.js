import { combineReducers } from "redux";
import account from "./account";
import debates from "./debates";
import opinions from "./opinions";

const rootReducer = combineReducers({
  account,
  debates,
  opinions,
});

export default rootReducer;
