import DataModel from "../models/DataModel";
import Account from "../models/Account";
import ReduxUtils from "../utils/ReduxUtils";

export const DEPOSIT_INVOICE_UPDATED = "DEPOSIT_INVOICE_UPDATED";

export const WITHDRAWAL_INVOICE_UPDATED = "WITHDRAWAL_INVOICE_UPDATED";

const updateDepositInvoice = ReduxUtils.createAction(
  DEPOSIT_INVOICE_UPDATED,
  "depositInvoice"
);

const updateWithdrawalInvoice = ReduxUtils.createAction(
  WITHDRAWAL_INVOICE_UPDATED,
  "withdrawalInvoice"
);

export const fetchDepositInvoice = () => async (
  dispatch,
  getState,
  { apiService }
) => {
  dispatch(updateDepositInvoice(new DataModel(null, true)));
  try {
    const { account } = getState();
    const acct = new Account(account.mnemonic);
    const response = await apiService.createDeposit(acct);
    dispatch(updateDepositInvoice(response));
    return response;
  } catch (ex) {
    // eslint-disable-next-line no-console
    console.log(ex);
    const err = DataModel.error(0, ex.message);
    dispatch(updateDepositInvoice(err));
    return err;
  }
};

export const fetchWithdrawalInvoice = (invoice) => async (
  dispatch,
  getState,
  { apiService }
) => {
  dispatch(updateWithdrawalInvoice(new DataModel(null, true)));
  try {
    const { account } = getState();
    const acct = new Account(account.mnemonic);
    console.log(invoice);
    const response = await apiService.createWithdrawal(invoice, acct);
    dispatch(updateWithdrawalInvoice(response));
    return response;
  } catch (ex) {
    // eslint-disable-next-line no-console
    console.log(ex);
    const err = DataModel.error(0, ex.message);
    dispatch(updateWithdrawalInvoice(err));
    return err;
  }
};
