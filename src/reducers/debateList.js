import { DEBATES_UPDATED } from "../actions/debates";
import ReduxUtils from "../utils/ReduxUtils";

const initialState = {
  filtered: null,
  debates: null,
};

export default ReduxUtils.createReducer(initialState, {
  ...ReduxUtils.createObjectHandler(DEBATES_UPDATED, "debates"),
});
