import React from "react";
import "./DebateCard.scss";
import DebateProgress from "./DebateProgress";
class DebateCard extends React.Component {
  render() {
    return (
      <div className="DebateCard">
        <div className="DebateCard__title">
            Debate Card Title
        </div>
        <div className="DebateCard__description">
        Short debate description here. Short debate description here. Short debate description here. Short debate description here. Short debate description here. Short debate description here. Short debate description here. Short debate description here. Short debate description here. Short debate description here. Short debate description here.
        </div>
        <DebateProgress />
      </div>
    );
  }
}
export default DebateCard;
