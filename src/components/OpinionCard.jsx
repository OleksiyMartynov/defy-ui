import React from "react";
import PropTypes from "prop-types";
import moment from "moment";
import Formatter from "../utils/Formatter";
import "./OpinionCard.scss";
import LinkPreview from "./LinkPreview";

class OpinionCard extends React.PureComponent {
  render() {
    const {
      content,
      contentType,
      created,
      pro,
      stake,
      createdByMe,
    } = this.props;

    return (
      <div
        className="OpinionCard"
        style={{ flexDirection: pro ? "row" : "row-reverse" }}
      >
        <div
          className={`OpinionCard__content-wrapper${
            contentType === "created"
              ? "--created"
              : contentType === "vote"
              ? "--small"
              : ""
          }`}
        >
          <div className="OpinionCard__content-wrapper__top">
            <div className="OpinionCard__content-wrapper__top__stake">
              <div>
                <i className="fa fa-bolt" />
                {Formatter.kFormatter(stake)}
              </div>
            </div>
            <div className="OpinionCard__content-wrapper__top__date">
              {moment(created).fromNow()}
            </div>
          </div>
          {contentType === "link" && <LinkPreview url={content} />}
          {contentType === "created" ? (
            <div className="OpinionCard__content-wrapper__loading">
              <span>
                <h3>
                  <i className="fas fa-balance-scale" />
                  &nbsp;&nbsp;Debate created
                </h3>
              </span>
            </div>
          ) : null}
          {createdByMe && (
            <div className="OpinionCard__content-wrapper__creator-banner">
              Created by you
            </div>
          )}
        </div>
      </div>
    );
  }
}

OpinionCard.propTypes = {
  content: PropTypes.string,
  contentType: PropTypes.string.isRequired,
  created: PropTypes.string.isRequired,
  pro: PropTypes.bool.isRequired,
  stake: PropTypes.number.isRequired,
  createdByMe: PropTypes.bool.isRequired,
};

export default OpinionCard;
