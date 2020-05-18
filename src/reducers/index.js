import { combineReducers } from "redux";
import account from "./account";
import accountInfo from "./accountInfo";
import debates from "./debates";
import opinions from "./opinions";
import ui from "./ui";
import debateList from "./debateList";

const rootReducer = combineReducers({
  account,
  debates,
  opinions,
  ui,
  accountInfo,
  debateList,
});

export default rootReducer;
