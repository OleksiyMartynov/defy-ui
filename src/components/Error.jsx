import React from "react";
import PropTypes from "prop-types";
import "./Error.scss";

class Error extends React.PureComponent {
  render() {
    const { message } = this.props;
    return (
      <div className="Error">
        <div className="Error__message Error__message--warning">
          <i className="fa fa-exclamation-triangle" />
          <span>{message}</span>
        </div>
      </div>
    );
  }
}

Error.propTypes = {
  message: PropTypes.string.isRequired,
};

export default Error;
