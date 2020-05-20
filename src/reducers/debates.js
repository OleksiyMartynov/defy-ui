import {
  DEBATES_UPDATED,
  DEBATE_DETAILS_UPDATED,
} from "../actions/debates";
import ReduxUtils from "../utils/ReduxUtils";
import DebateFilter from "../models/DebateFilter";

const initialState = {
  details: null,
};

export default ReduxUtils.createReducer(initialState, {
  // ...ReduxUtils.createObjectHandler(DEBATES_UPDATED, "debates"),
  ...ReduxUtils.createObjectHandler(DEBATE_DETAILS_UPDATED, "details"),
});
