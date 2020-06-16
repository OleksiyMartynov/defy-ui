import { DEBATE_DETAILS_UPDATED } from "../actions/debates";
import ReduxUtils from "../utils/ReduxUtils";

const initialState = {
  debateDetails: null,
};

export default ReduxUtils.createReducer(initialState, {
  ...ReduxUtils.createObjectHandler(DEBATE_DETAILS_UPDATED, "debateDetails"),
});
