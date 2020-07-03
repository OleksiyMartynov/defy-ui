import DataModel from "../models/DataModel";
import Account from "../models/Account";
import ReduxUtils from "../utils/ReduxUtils";

export const CREATE_DEBATE = "CREATE_DEBATE";
export const CREATE_DEBATE_FINISHED = "CREATE_DEBATE_FINISHED";

export const DEBATES_UPDATED = "DEBATES_UPDATED";

export const DEBATE_DETAILS_UPDATED = "DEBATE_DETAILS_UPDATED";

export const DEBATE_FILTER_UPDATED = "DEBATE_FILTER_UPDATED";

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
  "debateDetails"
);

const updateDebateFilter = ReduxUtils.createAction(
  DEBATE_FILTER_UPDATED,
  "filter"
);

export const fetchDebates = (loadNextPage, filterReset = false) => async (
  dispatch,
  getState,
  { apiService }
) => {
  const { debateList } = getState();
  let nextPage = 0;
  if (loadNextPage) {
    nextPage = debateList.data.page + 1;
  }
  dispatch(updateDebates(new DataModel(debateList.data, true)));
  try {
    const response = await apiService.getDebates(
      nextPage,
      !debateList.filter.active,
      debateList.filter.sortByAccount,
      !debateList.filter.sortByStake
    );
    if (debateList.data && !filterReset) {
      response.data.debates = [
        ...debateList.data.debates,
        ...response.data.debates,
      ];
      dispatch(updateDebates(response));
    } else {
      dispatch(updateDebates(response));
    }
  } catch (ex) {
    // eslint-disable-next-line no-console
    console.log(ex);
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
    console.log({ title, description, stake, tags });
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
    // eslint-disable-next-line no-console
    console.log(ex);
    const err = DataModel.error(0, ex.message);
    dispatch(receiveCreateDebate(err));
    return err;
  }
};

export const fetchDebateDetails = (debateId) => async (
  dispatch,
  getState,
  { apiService }
) => {
  dispatch(updateDebateDetails({ debateDetails: new DataModel(null, true) }));
  try {
    const response = await apiService.getDebateDetails(debateId);
    dispatch(updateDebateDetails({ debateDetails: response }));
  } catch (ex) {
    dispatch(
      updateDebateDetails({ debateDetails: DataModel.error(0, ex.message) })
    );
  }
};

export const fetchDebatesWithFilter = (newFilter) => async (
  dispatch,
  getState
) => {
  const { debateList } = getState();
  const filterReset = debateList.filter !== newFilter;
  if (filterReset) dispatch(updateDebateFilter({ filter: newFilter }));
  return dispatch(fetchDebates(!filterReset, filterReset));
};
