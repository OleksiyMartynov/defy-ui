import { combineReducers } from "redux";
import account from "./account";
import accountInfo from "./accountInfo";
import debates from "./debates";
import opinions from "./opinions";
import ui from "./ui";

const rootReducer = combineReducers({
  account,
  debates,
  opinions,
  ui,
  accountInfo,
});

export default rootReducer;
