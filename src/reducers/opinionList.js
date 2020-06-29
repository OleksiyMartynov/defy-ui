import { OPINIONS_UPDATED } from "../actions/opinions";
import ReduxUtils from "../utils/ReduxUtils";
import DataModel from "../models/DataModel";

const initialState = {
  opinions: new DataModel(false, true),
};

export default ReduxUtils.createReducer(initialState, {
  ...ReduxUtils.createObjectHandler(OPINIONS_UPDATED, "opinions"),
});
