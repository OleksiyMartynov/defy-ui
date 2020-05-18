import React from "react";
import PropTypes from "prop-types";
import "./FloatingButton.scss";

class FloatingButton extends React.PureComponent {
  render() {
    const { onClick, children } = this.props;
    return (
      <button onClick={onClick} type="button" className="FloatingButton">
        {children}
      </button>
    );
  }
}
FloatingButton.propTypes = {
  onClick: PropTypes.func.isRequired,
  children: PropTypes.array.isRequired,
};
export default FloatingButton;
