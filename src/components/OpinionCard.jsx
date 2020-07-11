import React from "react";
import PropTypes from "prop-types";
import moment from "moment";
import Formatter from "../utils/Formatter";
import "./OpinionCard.scss";

class OpinionCard extends React.Component {
  constructor(props) {
    super(props);
    this.state = { loadingMeta: true };
    if (props.content) {
      this.getMeta(props.content);
    }
  }

  getMeta = async (url) => {
    const res = await fetch(
      `${process.env.REACT_APP_API_URL}/meta?url=${encodeURI(url)}`
    );
    const metaRes = await res.json();
    if (metaRes.error) {
      this.setState({
        metaError: "Failed loading link preview",
        loadingMeta: false,
      });
    } else {
      this.setState({ metadata: metaRes.metadata, loadingMeta: false });
    }
  };

  render() {
    const {
      content,
      contentType,
      created,
      pro,
      stake,
      createdByMe,
    } = this.props;
    const { loadingMeta, metadata, metaError } = this.state;
    let metaSection = null;
    if (content) {
      if (loadingMeta) {
        metaSection = (
          <div className="OpinionCard__content-wrapper__loading">
            <i className="fa fa-spinner fa-4x" aria-hidden="true" />
            Loading <a href={content}>link</a> preview
          </div>
        );
      } else if (metadata) {
        metaSection = (
          <div className="OpinionCard__content-wrapper__content">
            <div className="OpinionCard__content-wrapper__content__image">
              {metadata.image ? (
                <img src={metadata.image} alt="Article preview" />
              ) : (
                <i className="far fa-newspaper"></i>
              )}
            </div>
            <div className="OpinionCard__content-wrapper__content__details">
              <a href={metadata.url} target="_blank" rel="noopener noreferrer">
                <div className="OpinionCard__content-wrapper__content__details__title">
                  {metadata.title}
                </div>
              </a>
              <div className="OpinionCard__content-wrapper__content__details__description">
                {metadata.description}
              </div>
              <div className="OpinionCard__content-wrapper__content__details__domain">
                {Formatter.getBaseUrl(metadata.url)}
              </div>
            </div>
          </div>
        );
      } else if (metaError) {
        metaSection = (
          <div className="OpinionCard__content-wrapper__error">
            <i className="fas fa-link fa-4x" />
            Error loading <a href={content}>link</a> preview
          </div>
        );
      }
    }
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
          {metaSection}
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
