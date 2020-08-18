import { ACCOUNT_UPDATE, ACCOUNT_INFO_UPDATE } from "../actions/account";
import ReduxUtils from "../utils/ReduxUtils";

const initialState = { data: { balance: 0, lockedBalance: 0 } };

export default ReduxUtils.createReducer(initialState, {
  ...ReduxUtils.createObjectHandler(ACCOUNT_UPDATE, "account"),
  ...ReduxUtils.createObjectHandler(ACCOUNT_INFO_UPDATE, "info"),
});
