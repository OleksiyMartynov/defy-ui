import { WITHDRAWAL_INVOICE_UPDATED } from "../actions/payment";
import ReduxUtils from "../utils/ReduxUtils";
import DataModel from "../models/DataModel";

const initialState = {
  withdrawalInvoice: new DataModel(false, true),
};

export default ReduxUtils.createReducer(initialState, {
  ...ReduxUtils.createObjectHandler(
    WITHDRAWAL_INVOICE_UPDATED,
    "withdrawalInvoice"
  ),
});
