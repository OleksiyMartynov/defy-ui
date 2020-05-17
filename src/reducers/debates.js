import { CREATE_DEBATE, CREATE_DEBATE_FINISHED } from "../actions/debates";

const initialState = {
  createDebate: null,
  filtered: null,
};

const transactions = (previousState = initialState, action) => {
  switch (action.type) {
    case CREATE_DEBATE: {
      return { ...previousState, createDebate: action.createDebate };
    }
    case CREATE_DEBATE_FINISHED:
      return { ...previousState, createDebate: action.createDebate };
    default:
      return previousState;
  }
};

export default transactions;
