import { combineReducers } from "redux";
import account from "./account";
import accountInfo from "./accountInfo";
import debates from "./debates";
import opinionList from "./opinionList";
import ui from "./ui";
import debateList from "./debateList";
import createDebate from "./createDebate";
import createOpinion from "./createOpinion";
import history from "./history";

const rootReducer = combineReducers({
  account,
  debates,
  opinionList,
  createOpinion,
  ui,
  accountInfo,
  debateList,
  createDebate,
  history,
});

export default rootReducer;
