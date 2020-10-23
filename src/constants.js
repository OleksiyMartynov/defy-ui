import { RepoDataModel } from "redux-dao-repo";
import UserInterface from "./models/UserInterface";
import Toast from './models/Toast';
import ToastModel from './models/ToastModel';

export const MODELS = Object.freeze({
  UI: new RepoDataModel("ui", "UPDATE_MODALS", new UserInterface()),
  TOAST: new Toast("toast", "UPDATE_TOAST", new ToastModel()),
});
