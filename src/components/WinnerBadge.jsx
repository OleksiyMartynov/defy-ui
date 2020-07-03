import React, { PureComponent } from "react";
import PropTypes from "prop-types";
import Formatter from "../utils/Formatter";
import "./WinnerBadge.scss";

export default class WinnerBadge extends PureComponent {
  render() {
    const { winner, amount, heading, ongoing } = this.props;
    return (
      <span
        className={`WinnerBadge__emoji WinnerBadge__emoji${
          ongoing
            ? winner
              ? "--leader"
              : "--not-leader"
            : winner
            ? "--winner"
            : "--loser"
        }`}
      >
        <span>{heading}</span>
        <br />
        {ongoing ? (
          <i
            className={`${winner ? "fas fa-fire-alt" : "fas fa-dumpster-fire"}`}
          />
        ) : (
          <i className={`${winner ? "fa fa-trophy" : "fas fa-poo"}`} />
        )}

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
  ongoing: PropTypes.bool.isRequired,
};
