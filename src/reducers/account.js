import { ACCOUNT_UPDATE, ACCOUNT_INFO_UPDATE } from "../actions/account";
import ReduxUtils from "../utils/ReduxUtils";
import DataModel from "../models/DataModel";

const initialState = new DataModel();

export default ReduxUtils.createReducer(initialState, {
  ...ReduxUtils.createObjectHandler(ACCOUNT_UPDATE, "account"),
  ...ReduxUtils.createObjectHandler(ACCOUNT_INFO_UPDATE, "info"),
});
