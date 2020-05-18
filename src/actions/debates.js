import DataModel from "../models/DataModel";
import Account from "../models/Account";
import ReduxUtils from "../utils/ReduxUtils";

export const CREATE_DEBATE = "CREATE_DEBATE";
export const CREATE_DEBATE_FINISHED = "CREATE_DEBATE_FINISHED";

export const DEBATES_UPDATED = "DEBATES_UPDATED";

export const DEBATE_DETAILS_UPDATED = "DEBATE_DETAILS_UPDATED";

const requestCreateDebate = () => ({
  type: CREATE_DEBATE,
  createDebate: new DataModel(null, true),
});

const receiveCreateDebate = (response) => ({
  type: CREATE_DEBATE_FINISHED,
  createDebate: response,
});

const updateDebates = ReduxUtils.createAction(DEBATES_UPDATED, "debates");

const updateDebateDetails = ReduxUtils.createAction(
  DEBATE_DETAILS_UPDATED,
  "details"
);

export const fetchDebates = () => async (
  dispatch,
  getState,
  { apiService }
) => {
  dispatch(updateDebates(new DataModel(null, true)));
  try {
    // get filter
    const response = await apiService.getDebates(0);
    console.log(response);
    dispatch(updateDebates(response));
  } catch (ex) {
    dispatch(updateDebates(DataModel.error(0, ex.message)));
  }
};

export const fetchCreateDebate = (title, description, stake, tags) => async (
  dispatch,
  getState,
  { apiService }
) => {
  dispatch(requestCreateDebate(new DataModel(null, true)));
  try {
    const { account } = getState();

    const acct = new Account(account.mnemonic);
    console.log(acct);
    const response = await apiService.createDebate(
      title,
      description,
      stake,
      tags,
      acct
    );
    dispatch(receiveCreateDebate(response));
    return response;
  } catch (ex) {
    console.log(ex);
    const err = DataModel.error(0, ex.message);
    dispatch(receiveCreateDebate(err));
    return err;
  }
};

export const fetchDebateDetails = () => async (
  dispatch,
  getState,
  { apiService }
) => {
  dispatch(updateDebateDetails(new DataModel(null, true)));
  try {
    // get filter
    const response = await apiService.getDebateDetails(1);
    console.log(response);
    dispatch(updateDebateDetails(response));
  } catch (ex) {
    dispatch(updateDebateDetails(DataModel.error(0, ex.message)));
  }
};
