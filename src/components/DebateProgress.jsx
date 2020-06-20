import React from "react";
import PropTypes from "prop-types";
import "./DebateProgress.scss";

class DebateProgress extends React.PureComponent {
  render() {
    const { pro, total } = this.props;
    const left = Math.floor((pro / total) * 100);
    const right = 100 - left;
    const width = Math.max(left, right);
    let label = "";
    if (pro > total - pro) {
      label = "Pro";
    } else if (pro < total - pro) {
      label = "Con";
    } //else tie
    return (
      <div className="DebateProgress">
        <div
          style={{
            marginLeft: `${left}%`,
            marginRight: "auto",
          }}
          className="DebateProgress__tooltip"
        >
          {`${label}\n${width}%`}
        </div>
        <div className="DebateProgress__wrapper">
          <div
            style={{
              width: `${width}%`,
              float: right > left ? "right" : "left",
            }}
            className="DebateProgress__wrapper__bar"
          />
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
