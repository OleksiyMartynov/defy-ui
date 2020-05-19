import { DEBATES_UPDATED, DEBATE_DETAILS_UPDATED } from "../actions/debates";
import ReduxUtils from "../utils/ReduxUtils";

const initialState = {
  filtered: null,
  debates: null,
  details: null,
};

export default ReduxUtils.createReducer(initialState, {
  ...ReduxUtils.createObjectHandler(DEBATES_UPDATED, "debates"),
  ...ReduxUtils.createObjectHandler(DEBATE_DETAILS_UPDATED, "details"),
});
