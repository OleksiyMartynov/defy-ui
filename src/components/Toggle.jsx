import React from "react";
import "./Toggle.scss";
import Button from "./Button";
import PropTypes from "prop-types";
class Toggle extends React.Component {
  constructor(props) {
    super(props);
    this.state = { left: props.left };
  }

  handleToggleChange = () => {
    const left = !this.state.left;
    this.props.onChange(left)
    this.setState({
      left,
    });
  };

  render() {
    const { left } = this.state;
    const { leftText, rightText, leftIcon, rightIcon } = this.props;
    return (
      <div className="Toggle">
        <Button secondary selected={left} onClick={this.handleToggleChange}>
            {leftIcon}&nbsp;{leftText}
        </Button>
        {rightText && (
          <Button secondary selected={!left} onClick={this.handleToggleChange}>
            {rightIcon}&nbsp;{rightText}
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
  onChange: PropTypes.func.isRequired
};
export default Toggle;
