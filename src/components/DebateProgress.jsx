import React from "react";
import "./DebateProgress.scss";
class DebateProgress extends React.Component {
  render() {
    const left =90;
    const right = 100 - left;
    const width = Math.max(left, right);
    return (
      <div className="DebateProgress">
          <div 
            style={{
                marginLeft:`${left}%`,
                marginRight:"auto"
            }}
            className="DebateProgress__tooltip">{width}%</div>
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
export default DebateProgress;
