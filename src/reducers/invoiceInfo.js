import { REQUEST_INVOICE_INFO_UPDATED } from "../actions/payment";
import ReduxUtils from "../utils/ReduxUtils";
import DataModel from "../models/DataModel";

const initialState = {
  invoiceInfo: new DataModel(false, true),
};

export default ReduxUtils.createReducer(initialState, {
  ...ReduxUtils.createObjectHandler(
    REQUEST_INVOICE_INFO_UPDATED,
    "invoiceInfo"
  ),
});
