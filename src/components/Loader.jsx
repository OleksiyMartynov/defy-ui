import React from "react";
import "./Loader.scss";

export const Loader = () => {
  return (
    <div className="Loader">
      <span>
        <i className="fas fa-spinner fa-1x" aria-hidden="true" /> Loading...
      </span>
    </div>
  );
};
