import React from "react";

import "./Toast.scss";

function Toast({show, text}) {
  return (
    <div className={`Toast ${show ? "Toast--show" : "Toast--hide"}`}>
      {text}
    </div>
  );
}

export default Toast;
