import React from "react";
import PropTypes from "prop-types";
import "./DebateProgress.scss";

class DebateProgress extends React.PureComponent {
  render() {
    const { total, pro } = this.props;
    const left = Math.floor((pro / total) * 100);
    const right = 100 - left;
    const width = Math.max(left, right);
    let label = "";
    let otherLabel = "";
    if (pro > total - pro) {
      label = "Pro";
      otherLabel = "Con";
    } else if (pro < total - pro) {
      label = "Con";
      otherLabel = "Pro";
    } //else tie
    return (
      <div className="DebateProgress">
        <div className="DebateProgress__wrapper">
          <div
            style={{
              width: `${width}%`,
              borderTopRightRadius: 0,
              borderBottomRightRadius: 0,
            }}
            className="DebateProgress__wrapper__bar"
          >
            <div className="DebateProgress__wrapper__bar__text">{`${label} ${width}%`}</div>
          </div>
          <div
            className="DebateProgress__wrapper__light-bar"
            style={{
              borderTopLeftRadius: 0,
              borderBottomLeftRadius: 0,
            }}
          >
            <div className="DebateProgress__wrapper__light-bar__text">{`${otherLabel} ${
              100 - width
            }%`}</div>
          </div>
        </div>
      </div>
    );
  }
}
DebateProgress.propTypes = {
  pro: PropTypes.number.isRequired,
  total: PropTypes.number.isRequired,
};
export default DebateProgress;
