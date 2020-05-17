import Account from "../models/Account";
import DataModel from "../models/DataModel";
import ReduxUtils from "../utils/ReduxUtils";

/**
 * action types
 */
export const ACCOUNT_UPDATE = "ACCOUNT_UPDATE";

export const ACCOUNT_INFO_UPDATE = "ACCOUNT_INFO_UPDATE";

export const ACCOUNT_DEPOSIT_UPDATE = "ACCOUNT_DEPOSIT_UPDATE";

export const ACCOUNT_WITHDRAWAL_UPDATE = "ACCOUNT_WITHDRAWAL_UPDATE";

export const ACCOUNT_HISTORY_UPDATE = "ACCOUNT_HISTORY_UPDATE";

/**
 * action creators
 */

export const updateAccount = ReduxUtils.createAction(ACCOUNT_UPDATE, "account");

export const createAccount = () => async (dispatch) => {
  const account = new Account(Account.randomMnemonic());
  return dispatch(updateAccount(account));
};

export const updateAccountInfo = ReduxUtils.createAction(
  ACCOUNT_INFO_UPDATE,
  "info"
);

export const updateAccountDeposit = ReduxUtils.createAction(
  ACCOUNT_DEPOSIT_UPDATE,
  "deposit"
);

export const updateAccountWithdrawal = ReduxUtils.createAction(
  ACCOUNT_WITHDRAWAL_UPDATE,
  "withdrawal"
);

export const updateAccountHistory = ReduxUtils.createAction(
  ACCOUNT_HISTORY_UPDATE,
  "history"
);

export const fetchAccountInfo = () => async (
  dispatch,
  getState,
  { apiService }
) => {
  dispatch(updateAccountInfo(new DataModel(null, true)));
  try {
    const { account } = getState();
    const acct = new Account(account.mnemonic);
    const response = await apiService.getAccountInfo(acct.getAddress());
    console.log(response);
    dispatch(updateAccountInfo(response));
  } catch (ex) {
    dispatch(updateAccountInfo(DataModel.error(0, ex.message)));
  }
};

export const fetchDeposit = (amount) => async (
  dispatch,
  getState,
  { apiService }
) => {
  dispatch(updateAccountDeposit(new DataModel(null, true)));
  try {
    const { account } = getState();
    const acct = new Account(account.mnemonic);
    const response = await apiService.createAccountDeposit(amount, acct);
    console.log(response);
    dispatch(updateAccountDeposit(response));
  } catch (ex) {
    dispatch(updateAccountDeposit(DataModel.error(0, ex.message)));
  }
};

export const fetchWithdrawal = (amount) => async (
  dispatch,
  getState,
  { apiService }
) => {
  dispatch(updateAccountWithdrawal(new DataModel(null, true)));
  try {
    const { account } = getState();
    const acct = new Account(account.mnemonic);
    const response = await apiService.createAccountWithdrawal(amount, acct);
    console.log(response);
    dispatch(updateAccountWithdrawal(response));
  } catch (ex) {
    dispatch(updateAccountWithdrawal(DataModel.error(0, ex.message)));
  }
};

export const fetchAccountHistory = () => async (
  dispatch,
  getState,
  { apiService }
) => {
  dispatch(updateAccountHistory(new DataModel(null, true)));
  try {
    const { account } = getState();
    const acct = new Account(account.mnemonic);
    // todo pagination
    const response = await apiService.getHistory(0, acct);
    console.log(response);
    dispatch(updateAccountHistory(response));
  } catch (ex) {
    dispatch(updateAccountHistory(DataModel.error(0, ex.message)));
  }
};
