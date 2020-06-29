import React, { PureComponent } from "react";
import PropTypes from "prop-types";
import "./Button.scss";

class Button extends PureComponent {
  render() {
    const {
      children,
      secondary,
      selected,
      accent,
      disabled,
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
      <button disabled={disabled} selected={selected} className={classes} {...nativeProps}>
        {children}
      </button>
    );
  }
}

Button.defaultProps = {
  disabled: false,
};

Button.propTypes = {
  secondary: PropTypes.bool,
  selected: PropTypes.bool,
  accent: PropTypes.bool,
  disabled: PropTypes.bool,
};

export default Button;
