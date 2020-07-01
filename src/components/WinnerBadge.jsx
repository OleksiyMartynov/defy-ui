import React, { PureComponent } from "react";
import PropTypes from "prop-types";
import Formatter from "../utils/Formatter";
import "./WinnerBadge.scss";

export default class WinnerBadge extends PureComponent {
  render() {
    const { winner, amount, heading } = this.props;
    return (
      <span
        className={`WinnerBadge__emoji WinnerBadge__emoji${
          winner ? "--winner" : "--loser"
        }`}
      >
        <span>{heading}</span>
        <br />
        <i className={`${winner ? "fa fa-trophy" : "fas fa-poo"}`} />
        <div>
          <i className="fa fa-bolt" />
          {Formatter.kFormatter(amount)}
        </div>
      </span>
    );
  }
}

WinnerBadge.propTypes = {
  heading: PropTypes.string.isRequired,
  winner: PropTypes.bool.isRequired,
  amount: PropTypes.number.isRequired,
};
