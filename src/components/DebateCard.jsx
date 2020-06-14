import React from "react";
import PropTypes from "prop-types";
import moment from "moment";
import "./DebateCard.scss";
import DebateProgress from "./DebateProgress";

class DebateCard extends React.PureComponent {
  render() {
    const { title, description, endTime, stake } = this.props;
    return (
      <div className="DebateCard">
        <div className="DebateCard__title">{title}</div>
        <div className="DebateCard__description">{description}</div>
        <div>{moment(endTime).fromNow()}</div>
        <div>{stake}</div>
        <DebateProgress />
      </div>
    );
  }
}

DebateCard.propTypes = {
  title: PropTypes.string.isRequired,
  description: PropTypes.string.isRequired,
  endTime: PropTypes.number.isRequired,
  stake: PropTypes.number.isRequired,
};

export default DebateCard;
