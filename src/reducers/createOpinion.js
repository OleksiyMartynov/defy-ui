import { CREATE_OPINION, CREATE_OPINION_FINISHED } from "../actions/opinions";
import ReduxUtils from "../utils/ReduxUtils";

const initialState = {
  createOpinion: null,
};

export default ReduxUtils.createReducer(initialState, {
  ...ReduxUtils.createObjectHandler(CREATE_OPINION, "createOpinion"),
  ...ReduxUtils.createObjectHandler(CREATE_OPINION_FINISHED, "createOpinion"),
});
