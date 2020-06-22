import React from "react";
import PropTypes from "prop-types";
import "./DebateCard.scss";

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
        metaSection = <div>loading preview</div>;
      } else if (metadata) {
        metaSection = <div>{metadata.title}</div>;
      } else {
        metaSection = <div>{metaError}</div>;
      }
    }
    return (
      <div className="OpinionCard">
        {stake}
        <br />
        {created}
        <br />
        {metaSection}
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
