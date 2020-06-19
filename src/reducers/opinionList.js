import { OPINIONS_UPDATED, CREATE_OPINION, CREATE_OPINION_FINISHED } from "../actions/opinions";
import ReduxUtils from "../utils/ReduxUtils";
import DebateFilter from "../models/DebateFilter";
import DataModel from "../models/DataModel";

const initialState = {
  opinions: new DataModel(false, true),
};

export default ReduxUtils.createReducer(initialState, {
  ...ReduxUtils.createObjectHandler(OPINIONS_UPDATED, "opinions"),
  ...ReduxUtils.createObjectHandler(CREATE_OPINION, "createOpinion"),
  ...ReduxUtils.createObjectHandler(CREATE_OPINION_FINISHED, "createOpinion"),
});
