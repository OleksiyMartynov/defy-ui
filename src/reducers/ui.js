import {
  OPEN_DEPOSIT_DIALOG,
  CLOSE_DEPOSIT_DIALOG,
  OPEN_WITHDRAWAL_DIALOG,
  CLOSE_WITHDRAWAL_DIALOG,
  OPEN_CREATE_DEBATE_DIALOG,
  CLOSE_CREATE_DEBATE_DIALOG,
  OPEN_WELCOME_DIALOG,
  CLOSE_WELCOME_DIALOG,
  SHOW_TOAST,
  HIDE_TOAST,
} from "../actions/ui";

const initialState = {
  showDepositDialog: false,
  showWithdrawalDialog: false,
  showCreateDebateDialog: false,
  showWelcomeDialog: false,
  showToast: { show: false, text: false },
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
    case OPEN_WELCOME_DIALOG:
      return { ...previousState, showWelcomeDialog: true };
    case CLOSE_WELCOME_DIALOG:
      return { ...previousState, showWelcomeDialog: false };
    case SHOW_TOAST:
      return {
        ...previousState,
        showToast: { show: true, text: action.showToast },
      };
    case HIDE_TOAST:
      return {
        ...previousState,
        showToast: { show: false, text: action.showToast },
      };
    default:
      return previousState;
  }
};

export default ui;
