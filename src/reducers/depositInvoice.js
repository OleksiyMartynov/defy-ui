import { DEPOSIT_INVOICE_UPDATED } from "../actions/payment";
import ReduxUtils from "../utils/ReduxUtils";
import DataModel from "../models/DataModel";

const initialState = {
  depositInvoice: new DataModel(false, true),
};

export default ReduxUtils.createReducer(initialState, {
  ...ReduxUtils.createObjectHandler(DEPOSIT_INVOICE_UPDATED, "depositInvoice"),
});
