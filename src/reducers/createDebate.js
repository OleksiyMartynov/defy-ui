import { CREATE_DEBATE, CREATE_DEBATE_FINISHED } from "../actions/debates";
import ReduxUtils from "../utils/ReduxUtils";

const initialState = {
  createDebate: null,
};

export default ReduxUtils.createReducer(initialState, {
  ...ReduxUtils.createObjectHandler(CREATE_DEBATE, "createDebate"),
  ...ReduxUtils.createObjectHandler(CREATE_DEBATE_FINISHED, "createDebate"),
});
