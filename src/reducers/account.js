import { ACCOUNT_UPDATE } from "../actions/account";
import ReduxUtils from "../utils/ReduxUtils";

const initialState = null;

export default ReduxUtils.createReducer(initialState, {
  ...ReduxUtils.createObjectHandler(ACCOUNT_UPDATE, "account"),
});
