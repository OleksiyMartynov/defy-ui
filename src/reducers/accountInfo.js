import {
  ACCOUNT_INFO_UPDATE,
  ACCOUNT_HISTORY_UPDATE,
  ACCOUNT_DEPOSIT_UPDATE,
  ACCOUNT_WITHDRAWAL_UPDATE,
} from "../actions/account";
import DataModel from "../models/DataModel";
import ReduxUtils from "../utils/ReduxUtils";

const initialState = {
  info: new DataModel(),
  deposit: new DataModel(),
  withdrawal: new DataModel(),
  history: new DataModel(),
};

export default ReduxUtils.createReducer(initialState, {
  ...ReduxUtils.createObjectHandler(ACCOUNT_INFO_UPDATE, "info"),
  ...ReduxUtils.createObjectHandler(ACCOUNT_HISTORY_UPDATE, "history"),
  ...ReduxUtils.createObjectHandler(ACCOUNT_DEPOSIT_UPDATE, "deposit"),
  ...ReduxUtils.createObjectHandler(ACCOUNT_WITHDRAWAL_UPDATE, "withdrawal"),
});
