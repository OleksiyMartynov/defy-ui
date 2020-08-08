import { HISTORY_UPDATED } from "../actions/history";
import ReduxUtils from "../utils/ReduxUtils";
import DataModel from "../models/DataModel";

const initialState = {
  history: new DataModel(false, true),
};

export default ReduxUtils.createReducer(initialState, {
  ...ReduxUtils.createObjectHandler(HISTORY_UPDATED, "history"),
});
