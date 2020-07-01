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
        metaError: "Failed loading metadata",
        loadingMeta: false,
      });
    } else {
      this.setState({ metadata: metaRes.metadata, loadingMeta: false });
    }
  };

  render() {
    const { content, contentType, created, pro, stake } = this.props;
    const { loadingMeta, metadata, metaError } = this.state;
    let metaSection = null;
    if (content) {
      if (loadingMeta) {
        metaSection = (
          <div className="OpinionCard__loading">loading preview</div>
        );
      } else if (metadata) {
        metaSection = (
          <div className="OpinionCard__content-wrapper__content">
            <div className="OpinionCard__content-wrapper__content__image">
              <img src={metadata.image} alt="Article preview" />
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
      } else {
        metaSection = <div className="OpinionCard__error">{metaError}</div>;
      }
    }
    return (
      <div
        className="OpinionCard"
        style={{ flexDirection: pro ? "row" : "row-reverse" }}
      >
        <div
          className={`OpinionCard__content-wrapper${
            contentType === "vote" ? "--small" : ""
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
};

export default OpinionCard;
