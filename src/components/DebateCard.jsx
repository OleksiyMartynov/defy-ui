import React from "react";
import PropTypes from "prop-types";
import moment from "moment";
import "./DebateCard.scss";
import DebateProgress from "./DebateProgress";
import { Link } from "react-router-dom";

class DebateCard extends React.PureComponent {
  render() {
    const { id, title, description, endTime, stake } = this.props;
    return (
      <Link to={`/debate/${id}`} className="DebateCard">
        <div className="DebateCard__title">{title}</div>
        <div className="DebateCard__description">{description}</div>
        <div>{moment(endTime).fromNow()}</div>
        <div>{stake}</div>
        <DebateProgress />
      </Link>
    );
  }
}

DebateCard.propTypes = {
  id: PropTypes.string.isRequired,
  title: PropTypes.string.isRequired,
  description: PropTypes.string.isRequired,
  endTime: PropTypes.number.isRequired,
  stake: PropTypes.number.isRequired,
};

export default DebateCard;
