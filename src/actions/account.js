import Account from "../models/Account";

/**
 * action types
 */
export const SET_ACCOUNT = "SET_ACCOUNT";
export const GET_ACCOUNT = "GET_ACCOUNT";

/**
 * action creators
 */
export const setAccount = (account) => ({
  type: SET_ACCOUNT,
  account,
});

export const getAccount = () => ({
  type: GET_ACCOUNT,
});

export const createAccount = () => async (dispatch) => {
  const account = new Account(Account.randomMnemonic());
  return dispatch(setAccount(account));
};
