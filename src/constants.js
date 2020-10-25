import { RepoDataModel } from "redux-dao-repo";
import UserInterface from "./models/UserInterface";
import Toast from "./models/Toast";
import ToastModel from "./models/ToastModel";

export const ToastDAO = new Toast("toast", new ToastModel());
export const DialogDAO = new RepoDataModel("dialog", new UserInterface());
