import React from "react";
import { useSelector } from "react-redux";
import "./Toast.scss";

function Toast() {
  const showToast = useSelector((state) => state.ui.showToast);
  return (
    <div className={`Toast ${showToast.show ? "Toast--show" : "Toast--hide"}`}>
      {showToast.text ? showToast.text : "..."}
    </div>
  );
}

export default Toast;
