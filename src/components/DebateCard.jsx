import React from "react";
import PropTypes from "prop-types";
import "./DebateCard.scss";
import { Link, NavLink } from "react-router-dom";
import moment from "moment";
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
      totalOpinions,
    } = this.props;

    const infoBarItems = [];
    if (createdByMe) {
      infoBarItems.push({
        iconClass: "fas fa-user-edit",
        value: "Created",
      });
    }

    infoBarItems.push({
      iconClass: "fas fa-vote-yea",
      value: opinionsByMe,
    });

    infoBarItems.push({
      iconClass: "fas fa-comments",
      value: totalOpinions,
    });

    infoBarItems.push({
      iconClass: "fas fa-balance-scale",
      value: `${Formatter.kFormatter(totalPro)}/${Formatter.kFormatter(
        totalCon
      )}`,
    });

    if (moment(dateUpdated).unix() + durationMilli / 1000 < moment().unix()) {
      infoBarItems.push({
        iconClass: "fas fa-stopwatch",
        value: moment(dateUpdated)
          .add(durationMilli, "ms")
          .from(dateCreated, true),
      });
    } else {
      infoBarItems.push({
        iconClass: "fas fa-clock",
        value: Formatter.countDownFormat(
          moment(dateUpdated).unix() + durationMilli / 1000
        ),
      });
    }

    return (
      <NavLink exact to={`/debate/${id}`} className="DebateCard">
        <div
          className="DebateCard__heading-container"
          onClick={() => {
            this.setState({ redirect: `/debate/${id}` });
          }}
        >
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
          <i className="DebateCard__chevron fas fa-chevron-right fa-2x" />
        </div>

        <div className="DebateCard__divider" />

        <div className="DebateCard__tags">
          {tags.map((tag, index) => (
            <div key={index} className="DebateCard__tags__tag">
              <Link to={`/debates/${tag.name}`}>
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
        <div className="DebateCard__divider" />
        <div className="DebateCard__info-bar">
          {infoBarItems.map((item) => (
            <div className="DebateCard__info-bar__item">
              <i className={item.iconClass} /> {item.text} {item.value}
            </div>
          ))}
        </div>
      </NavLink>
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
  totalOpinions: PropTypes.number.isRequired,
};

export default DebateCard;
