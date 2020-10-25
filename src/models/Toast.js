import { RepoDataModel } from "redux-dao-repo";
import ToastModel from "./ToastModel";

export default class Toast extends RepoDataModel {
  constructor(stateKey, initialState) {
    super(stateKey, initialState);
    this.addUpdateFunction("toggleToast", this.toggleToast.bind(this));
  }

  toggleToast = (text, duration = 3000) => async (dispatch) => {
    let timeout;
    dispatch(this.getAction(new ToastModel(text)));
    clearTimeout(timeout);
    timeout = setTimeout(() => {
      dispatch(this.getAction(new ToastModel()));
    }, duration);
  };
}
