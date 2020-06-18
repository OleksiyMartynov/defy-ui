import { DEBATE_DETAILS_UPDATED } from "../actions/debates";
import ReduxUtils from "../utils/ReduxUtils";
import DataModel from "../models/DataModel";

const initialState = {
  debateDetails: new DataModel(null, true),
};

export default ReduxUtils.createReducer(initialState, {
  ...ReduxUtils.createObjectHandler(DEBATE_DETAILS_UPDATED, "debateDetails"),
});
