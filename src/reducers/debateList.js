import { DEBATES_UPDATED, DEBATE_FILTER_UPDATED } from "../actions/debates";
import ReduxUtils from "../utils/ReduxUtils";
import DebateFilter from "../models/DebateFilter";

const initialState = {
  filter: new DebateFilter(),
  debates: null,
};

export default ReduxUtils.createReducer(initialState, {
  ...ReduxUtils.createObjectHandler(DEBATES_UPDATED, "debates"),
  ...ReduxUtils.createObjectHandler(DEBATE_FILTER_UPDATED, "filter"),
});
