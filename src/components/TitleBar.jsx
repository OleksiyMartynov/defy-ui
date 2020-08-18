import React from "react";
import PropTypes from "prop-types";
import "./TitleBar.scss";
import { withRouter } from "react-router-dom";

const TitleBar = ({ title, history, show = false, extra }) => {
  const goBack = () => {
    history.goBack();
  };
  return (
    <div className={"TitleBar" + (show ? " TitleBar--show" : "")}>
      <div className="TitleBar__wrapper">
        <div className="TitleBar__wrapper__content">
          <button onClick={goBack}>
            <i
              style={{ fontSize: "25px" }}
              className="fas fa-chevron-left fa-2x"
            />
          </button>
          <div className="TitleBar__wrapper__content__title">{title}</div>
          <div>{extra}</div>
        </div>
      </div>
    </div>
  );
};

TitleBar.propTypes = {
  title: PropTypes.string.isRequired,
  extra: PropTypes.element,
};

export default withRouter(TitleBar);
