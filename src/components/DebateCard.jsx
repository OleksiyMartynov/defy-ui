import React from "react";
import PropTypes from "prop-types";
import moment from "moment";
import "./DebateCard.scss";
import { Link } from "react-router-dom";
import DebateProgress from "./DebateProgress";

class DebateCard extends React.PureComponent {
  render() {
    const {
      id,
      title,
      description,
      endTime,
      stake,
      totalPro,
      totalCon,
    } = this.props;
    return (
      <Link to={`/debate/${id}`} className="DebateCard">
        <div className="DebateCard__title">{title}</div>
        <div className="DebateCard__description">{description}</div>
        <div>{moment(endTime).fromNow()}</div>
        <div>Importance:{stake + totalPro + totalCon}</div>
        <DebateProgress pro={totalPro} total={totalPro + totalCon} />
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
  totalPro: PropTypes.number.isRequired,
  totalCon: PropTypes.number.isRequired,
};

export default DebateCard;
