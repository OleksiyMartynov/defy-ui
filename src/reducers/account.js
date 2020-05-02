import { SET_ACCOUNT, GET_ACCOUNT } from "../actions/account";

const initialState = null;

const account = (previousState = initialState, action) => {
  switch (action.type) {
    case SET_ACCOUNT:
      return { ...previousState, ...action.account };
    case GET_ACCOUNT:
      return previousState;
    default:
      return previousState;
  }
};

export default account;
