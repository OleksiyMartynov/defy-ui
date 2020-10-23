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
import depositInvoice from "./depositInvoice";
import withdrawalInvoice from "./withdrawalInvoice";
import invoiceInfo from "./invoiceInfo";

const rootReducer = (other) =>
  combineReducers({
    account,
    debates,
    opinionList,
    createOpinion,
    accountInfo,
    debateList,
    createDebate,
    history,
    depositInvoice,
    withdrawalInvoice,
    invoiceInfo,
    ...other,
  });

export default rootReducer;
