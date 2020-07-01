import React from "react";
import PropTypes from "prop-types";
import "./DebateCard.scss";
import { Link } from "react-router-dom";
import DebateProgress from "./DebateProgress";
import Formatter from "../utils/Formatter";
import DebateTime from "./DebateTime";

class DebateCard extends React.PureComponent {
  render() {
    const {
      id,
      title,
      description,
      finished,
      dateCreated,
      dateUpdated,
      durationMilli,
      totalPro,
      totalCon,
      totalLocked,
    } = this.props;
    return (
      <Link to={`/debate/${id}`} className="DebateCard">
        <div className="DebateCard__heading-container">
          <div className="DebateCard__title">{title}</div>
          <div className="DebateCard__stake">
            <i className="fa fa-bolt" />
            {Formatter.kFormatter(totalLocked)}
          </div>
        </div>
        <DebateTime
          finished={finished}
          dateCreated={dateCreated}
          dateUpdated={dateUpdated}
          durationMilli={durationMilli}
        />

        <DebateProgress pro={totalPro} total={totalPro + totalCon} />
        <div className="DebateCard__description">{description}</div>
      </Link>
    );
  }
}

DebateCard.propTypes = {
  id: PropTypes.string.isRequired,
  title: PropTypes.string.isRequired,
  description: PropTypes.string.isRequired,
  finished: PropTypes.bool.isRequired,
  dateCreated: PropTypes.string.isRequired,
  dateUpdated: PropTypes.string.isRequired,
  durationMilli: PropTypes.number.isRequired,
  totalPro: PropTypes.number.isRequired,
  totalCon: PropTypes.number.isRequired,
  totalLocked: PropTypes.number.isRequired,
};

export default DebateCard;
