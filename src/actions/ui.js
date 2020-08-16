export const OPEN_DEPOSIT_DIALOG = "OPEN_DEPOSIT_DIALOG";
export const CLOSE_DEPOSIT_DIALOG = "CLOSE_DEPOSIT_DIALOG";

export const OPEN_WITHDRAWAL_DIALOG = "OPEN_WITHDRAWAL_DIALOG";
export const CLOSE_WITHDRAWAL_DIALOG = "CLOSE_WITHDRAWAL_DIALOG";

export const OPEN_CREATE_DEBATE_DIALOG = "OPEN_CREATE_DEBATE_DIALOG";
export const CLOSE_CREATE_DEBATE_DIALOG = "CLOSE_CREATE_DEBATE_DIALOG";

export const SHOW_TOAST = "HIDE_TOAST";
export const HIDE_TOAST = "SHOW_TOAST";

let timeout = null;

export const openDepositDialog = () => ({ type: OPEN_DEPOSIT_DIALOG });
export const closeDepositDialog = () => ({ type: CLOSE_DEPOSIT_DIALOG });

export const openWithdrawalDialog = () => ({ type: OPEN_WITHDRAWAL_DIALOG });
export const closeWithdrawalDialog = () => ({ type: CLOSE_WITHDRAWAL_DIALOG });

export const openCreateDebateDialog = () => ({
  type: OPEN_CREATE_DEBATE_DIALOG,
});
export const closeCreateDebateDialog = () => ({
  type: CLOSE_CREATE_DEBATE_DIALOG,
});

export const showToast = (text) => ({
  type: SHOW_TOAST,
  showToast: text,
});
export const hideToast = () => ({
  type: HIDE_TOAST,
  showToast: false,
});

export const toggleToast = (text, duration = 3000) => async (dispatch) => {
  dispatch(showToast(text));
  clearTimeout(timeout);
  timeout = setTimeout(() => {
    dispatch(hideToast());
  }, duration);
};
