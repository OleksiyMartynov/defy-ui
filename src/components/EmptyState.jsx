import React from "react";
import PropTypes from "prop-types";
import "./EmptyState.scss";

class EmptyState extends React.PureComponent {
  render() {
    const { message, icon } = this.props;
    return (
      <div className="EmptyState">
        <span>{message}</span>
        <img src={icon} alt="empty state" />
      </div>
    );
  }
}
EmptyState.propTypes = {
  message: PropTypes.string.isRequired,
  icon: PropTypes.string.isRequired,
};
export default EmptyState;
