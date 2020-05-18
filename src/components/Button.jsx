import React, { Component, PureComponent } from "react";
import PropTypes from "prop-types";
import "./Button.scss";

class Button extends PureComponent {
  render() {
    const {
      children,
      secondary,
      selected,
      accent,
      ...nativeProps
    } = this.props;
    let classes = "Button";
    if (secondary) {
      classes += "--secondary";
      if (selected) {
        classes += " Button--secondary--selected";
      }
    } else if (accent) {
      classes += "--accent";
      if (selected) {
        classes += " Button--accent--selected";
      }
    } else {
      classes += "--primary";
      if (selected) {
        classes += " Button--primary--selected";
      }
    }
    return (
      <button selected className={classes} {...nativeProps}>
        {children}
      </button>
    );
  }
}

Button.propTypes = {
  secondary: PropTypes.bool,
  selected: PropTypes.bool,
  accent: PropTypes.bool,
};

export default Button;
