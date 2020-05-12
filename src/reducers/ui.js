import {
  OPEN_DEPOSIT_DIALOG,
  CLOSE_DEPOSIT_DIALOG,
  OPEN_WITHDRAWAL_DIALOG,
  CLOSE_WITHDRAWAL_DIALOG,
  OPEN_CREATE_DEBATE_DIALOG,
  CLOSE_CREATE_DEBATE_DIALOG,
} from "../actions/ui";

const initialState = {
  showDepositDialog: false,
  showWithdrawalDialog: false,
  showCreateDebateDialog: false,
};

const ui = (previousState = initialState, action) => {
  switch (action.type) {
    case OPEN_DEPOSIT_DIALOG:
      return { ...previousState, showDepositDialog: true };
    case CLOSE_DEPOSIT_DIALOG:
      return { ...previousState, showDepositDialog: false };
    case OPEN_WITHDRAWAL_DIALOG:
      return { ...previousState, showWithdrawalDialog: true };
    case CLOSE_WITHDRAWAL_DIALOG:
      return { ...previousState, showWithdrawalDialog: false };
    case OPEN_CREATE_DEBATE_DIALOG:
      return { ...previousState, showCreateDebateDialog: true };
    case CLOSE_CREATE_DEBATE_DIALOG:
      return { ...previousState, showCreateDebateDialog: false };
    default:
      return previousState;
  }
};

export default ui;
