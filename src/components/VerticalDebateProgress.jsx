import React from "react";
import PropTypes from "prop-types";
import "./VerticalDebateProgress.scss";

class VerticalDebateProgress extends React.PureComponent {
  render() {
    const { pro, total } = this.props;
    const bottom = Math.floor((pro / total) * 100);
    const top = 100 - bottom;
    const height = Math.max(bottom, top);
    let label = "";
    if (pro > total - pro) {
      label = "Pro";
    } else if (pro < total - pro) {
      label = "Con";
    } // else tie
    return (
      <div className="VerticalDebateProgress">
        <div className="VerticalDebateProgress__wrapper">
          <div
            style={{
              height: "100%",
              backgroundImage: `linear-gradient(to top, #70e0b5 0%, #70e0b5 ${bottom}%, #55b3b9 ${bottom}%, #55b3b9 100%)`,
            }}
            className="VerticalDebateProgress__wrapper__bar"
          />
        </div>
        <div className="VerticalDebateProgress__tooltip-wrapper">
          <div
            style={{
              height: `${100 - bottom}%`,
            }}
          />
          <div className="VerticalDebateProgress__tooltip-wrapper__tooltip">
            {`${label}\n${height}%`}
          </div>
        </div>
      </div>
    );
  }
}
VerticalDebateProgress.propTypes = {
  pro: PropTypes.number.isRequired,
  total: PropTypes.number.isRequired,
};
export default VerticalDebateProgress;
