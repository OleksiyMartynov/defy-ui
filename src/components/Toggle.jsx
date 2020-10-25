import React from "react";
import "./Toggle.scss";
import PropTypes from "prop-types";
import Button from "./Button";

class Toggle extends React.Component {
  constructor(props) {
    super(props);
    this.state = { left: props.left };
  }

  handleToggleChange = () => {
    const left = !this.state.left;
    this.props.onChange(left);
    this.setState({
      left,
    });
  };

  UNSAFE_componentWillReceiveProps = (newProps) => {
    this.setState({ left: newProps.left });
  };

  render() {
    const { left } = this.state;
    const { leftText, rightText, leftIcon, rightIcon, isFlat } = this.props;
    return (
      <div className={`Toggle${isFlat ? " Toggle--flat" : ""}`}>
        <Button secondary selected={left} onClick={this.handleToggleChange}>
          {leftIcon}
          &nbsp;
          {leftText}
        </Button>
        {rightText && (
          <Button secondary selected={!left} onClick={this.handleToggleChange}>
            {rightIcon}
            &nbsp;
            {rightText}
          </Button>
        )}
      </div>
    );
  }
}
Toggle.propTypes = {
  leftText: PropTypes.string.isRequired,
  leftIcon: PropTypes.element,
  rightText: PropTypes.string,
  rightIcon: PropTypes.element,
  onChange: PropTypes.func.isRequired,
  isFlat: PropTypes.bool,
};
Toggle.defaultProps = {
  isFlat: false,
};
export default Toggle;
