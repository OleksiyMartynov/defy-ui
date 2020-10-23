import React from "react";
import { MODELS } from "../constants";

import "./Toast.scss";

function Toast() {
  const [showToast] = MODELS.TOAST.useRepoDataModel();
  return (
    <div className={`Toast ${showToast.show ? "Toast--show" : "Toast--hide"}`}>
      {showToast.text ? showToast.text : "..."}
    </div>
  );
}

export default Toast;
