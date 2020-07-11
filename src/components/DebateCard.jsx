import React from "react";
import PropTypes from "prop-types";
import "./DebateCard.scss";
import { Link } from "react-router-dom";
import DebateProgress from "./DebateProgress";
import Formatter from "../utils/Formatter";
import DebateTime from "./DebateTime";
import FloatingButton from "./FloatingButton";

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
      tags,
      createdByMe,
      opinionsByMe,
    } = this.props;
    return (
      <Link to={`/debate/${id}`} className="DebateCard">
        <div className="DebateCard__heading-container">
          <div className="DebateCard__stake">
            <i className="fa fa-bolt" />
            {Formatter.kFormatter(totalLocked)}
          </div>
          <div>
            <div className="DebateCard__title">{title}</div>
            <DebateTime
              finished={finished}
              dateCreated={dateCreated}
              dateUpdated={dateUpdated}
              durationMilli={durationMilli}
            />
          </div>
        </div>

        <div className="DebateCard__tags">
          {tags.map((tag) => (
            <div className="DebateCard__tags__tag">
              <Link to={`/debates?t=${tag.name}`}>
                <FloatingButton onClick={this.onCreateDebate}>
                  <i className="fas fa-hashtag" />
                  <span>&nbsp;{tag.name}</span>
                </FloatingButton>
              </Link>
            </div>
          ))}
        </div>

        <div className="DebateCard__description">{description}</div>
        {totalPro > 0 && (
          <DebateProgress pro={totalPro} total={totalPro + totalCon} />
        )}
        {createdByMe && (
          // <div className="OpinionCard__content-wrapper__creator-banner">
          <div>Created by you</div>
        )}
        <div>{opinionsByMe} opinions by me</div>
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
  tags: PropTypes.array,
  createdByMe: PropTypes.bool.isRequired,
  opinionsByMe: PropTypes.number.isRequired,
};

export default DebateCard;
