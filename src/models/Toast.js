import { RepoDataModel } from "redux-dao-repo";
import ToastModel from "./ToastModel";

export default class Toast extends RepoDataModel {
  toggleToast = (text, duration = 3000) => async (dispatch) => {
    let timeout;
    dispatch(this.createAction(new ToastModel(text)));
    clearTimeout(timeout);
    timeout = setTimeout(() => {
      dispatch(this.createAction(new ToastModel()));
    }, duration);
  };

  useToastModel() {
    const [toast, updateToast, dispatch] = this.useRepoDataModel();
    const toggleToast = (text) => dispatch(this.toggleToast(text));
    return [toast, toggleToast, updateToast];
  }
}
