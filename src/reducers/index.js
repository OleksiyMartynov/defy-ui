import { combineReducers } from "redux";
import account from "./account";
import accountInfo from "./accountInfo";
import debates from "./debates";
import opinionList from "./opinionList";
import ui from "./ui";
import debateList from "./debateList";
import createDebate from "./createDebate";

const rootReducer = combineReducers({
  account,
  debates,
  opinionList,
  ui,
  accountInfo,
  debateList,
  createDebate,
});

export default rootReducer;
