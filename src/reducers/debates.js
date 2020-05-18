import { CREATE_DEBATE, CREATE_DEBATE_FINISHED, DEBATES_UPDATED, DEBATE_DETAILS_UPDATED } from "../actions/debates";
import ReduxUtils from "../utils/ReduxUtils";

const initialState = {
  createDebate: null,
  filtered: null,
  debates: null,
  details: null,
};

export default ReduxUtils.createReducer(initialState, {
  ...ReduxUtils.createObjectHandler(CREATE_DEBATE, "createDebate"),
  ...ReduxUtils.createObjectHandler(CREATE_DEBATE_FINISHED, "createDebate"),
  ...ReduxUtils.createObjectHandler(DEBATES_UPDATED, "debates"),
  ...ReduxUtils.createObjectHandler(DEBATE_DETAILS_UPDATED, "details"),
});
