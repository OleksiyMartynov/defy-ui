import DataModel from "../models/DataModel";
import Account from "../models/Account";
import ReduxUtils from "../utils/ReduxUtils";

export const HISTORY_UPDATED = "HISTORY_UPDATED";

const updateHistory = ReduxUtils.createAction(HISTORY_UPDATED, "history");

export const fetchHistory = (loadNextPage) => async (
  dispatch,
  getState,
  { apiService }
) => {
  const { history, account } = getState();
  let nextPage = 0;
  if (loadNextPage) {
    nextPage = history.data.page + 1;
  }
  dispatch(updateHistory(new DataModel(history.data, true)));
  try {
    const acct = new Account(account.mnemonic);
    const response = await apiService.getHistory(nextPage, acct);
    if (history.data) {
      response.data.history = loadNextPage
        ? [...history.data.history, ...response.data.history]
        : response.data.history;
      dispatch(updateHistory(response));
    } else {
      dispatch(updateHistory(response));
    }
  } catch (ex) {
    // eslint-disable-next-line no-console
    console.log(ex);
    dispatch(updateHistory(DataModel.error(0, ex.message)));
  }
};
