import React from "react";
import PropTypes from "prop-types";
import "./Tooltip.scss";

const Tooltip = ({ text, children }) => (
  <div className="Tooltip">
    {children || <i className="far fa-question-circle" />}
    <span className="Tooltip__text">{text}</span>
  </div>
);

Tooltip.propTypes = {
  text: PropTypes.string.isRequired,
};

export default Tooltip;
