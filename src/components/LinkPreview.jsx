import React, { Component } from "react";
import PropTypes from "prop-types";
import "./LinkPreview.scss";
import TweetEmbed from "react-tweet-embed";
import Formatter from "../utils/Formatter";

class LinkPreview extends Component {
  constructor(props) {
    super(props);

    const tweetId = Formatter.isTweetLink(props.url);
    this.state = {
      tweetId,
      metadata: false,
      url: props.url,
    };
    if (!tweetId) {
      setTimeout(() => {
        this.getMeta(props.url);
      }, 1);
    }
  }

  UNSAFE_componentWillReceiveProps = (newProps) => {
    if (this.state.url !== newProps.url) {
      const tweetId = Formatter.isTweetLink(newProps.url);
      if (tweetId) {
        this.setState({ tweetId });
      } else {
        this.getMeta(newProps.url);
      }
    }
  };

  getMeta = async (url) => {
    if (Formatter.isValidLink(url)) {
      this.setState({ tweetId: false, metadata: { title: url, url } });
      try {
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
          if (!metaRes.metadata.title) {
            metaRes.metadata.title = metaRes.metadata.url;
          }
          if (
            metaRes.metadata.image &&
            !metaRes.metadata.image.startsWith("http")
          ) {
            metaRes.metadata.image =
              metaRes.metadata.url + metaRes.metadata.image;
          } else if (!metaRes.metadata.image) {
            metaRes.metadata.image = `${Formatter.getLinkHostName(
              url
            )}/favicon.ico`;
          }
          this.setState({ metadata: metaRes.metadata, loadingMeta: false });
        }
      } catch (ex) {
        console.log(ex);
      }
    }
  };

  render() {
    const { metadata, tweetId } = this.state;
    return (
      <div className="LinkPreview__preview__content-wrapper__content">
        {tweetId ? (
          <div className="LinkPreview__tweet">
            <TweetEmbed id={tweetId} />
          </div>
        ) : (
          metadata && (
            <>
              <div className="LinkPreview__preview__content-wrapper__content__image">
                {metadata?.image ? (
                  <img src={metadata?.image} alt="Article preview" />
                ) : (
                  <i className="far fa-newspaper" />
                )}
              </div>
              <div className="LinkPreview__preview__content-wrapper__content__details">
                <a
                  href={metadata?.url}
                  target="_blank"
                  rel="noopener noreferrer"
                >
                  <div className="LinkPreview__preview__content-wrapper__content__details__title">
                    {metadata?.title}
                  </div>
                </a>
                <div className="LinkPreview__preview__content-wrapper__content__details__description">
                  {metadata?.description}
                </div>
                <div className="LinkPreview__preview__content-wrapper__content__details__domain">
                  {metadata?.url && Formatter.getBaseUrl(metadata?.url)}
                </div>
              </div>
            </>
          )
        )}
      </div>
    );
  }
}

LinkPreview.propTypes = {
  url: PropTypes.string.isRequired,
};

export default LinkPreview;
