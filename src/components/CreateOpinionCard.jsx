import React, { Component } from "react";
import "./CreateOpinionCard.scss";
import { connect } from "react-redux";
import PropTypes from "prop-types";
import Toggle from "./Toggle";
import Button from "./Button";
import { fetchCreateOpinion } from "../actions/opinions";
import Tooltip from "./Tooltip";
import Formatter from "../utils/Formatter";

class CreateOpinionCard extends Component {
  constructor(props) {
    super(props);
    this.state = { stake: "", link: "", showLink: false, loading: false };
  }

  onActiveToggled = (showLink) => {
    this.setState({ showLink: !showLink });
  };

  handleChange = (event) => {
    this.setState({
      [event.target.name]: event.target.value,
    });
    if (event.target.name === "link" && this.isValidLink(event.target.value)) {
      this.getMeta(event.target.value);
    } else if (
      event.target.name === "link" &&
      !this.isValidLink(event.target.value)
    ) {
      this.setState({ metadata: null, loadingMeta: false });
    }
  };

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
      if (!metaRes.metadata.title) {
        metaRes.metadata.title = metaRes.metadata.url;
      }
      this.setState({ metadata: metaRes.metadata, loadingMeta: false });
    }
  };

  onCreateClicked = async () => {
    const {
      pro,
      fetchCreateOpinion,
      debateId,
      onNewOpinionCreated,
    } = this.props;
    const { showLink, stake, link } = this.state;
    if (this.isFormValid()) {
      this.setState({
        loading: true,
      });
      const resp = await fetchCreateOpinion(
        debateId,
        link,
        showLink ? "link" : "vote",
        stake,
        pro
      );
      if (resp.error) {
        this.setState({
          error: resp.error.message
            ? resp.error.message
            : "Failed creating opinion. ",
          loading: false,
        });
      } else if (onNewOpinionCreated) onNewOpinionCreated();
    }
  };

  isFormValid = () => {
    const { showLink, link, stake } = this.state;
    const { minOpinionStake, minVoteStake } = this.props;
    if (showLink) {
      if (isNaN(stake) || stake < minOpinionStake) {
        this.setState({
          error: `Stake amount must be greater than ${minOpinionStake}`,
        });
        return false;
      }
      if (!link || !this.isValidLink(link)) {
        this.setState({ error: "Invalid link format" });
        return false;
      }
    }

    if (isNaN(stake) || stake < minVoteStake) {
      this.setState({
        error: `Stake amount must be greater than ${minVoteStake}`,
      });
      return false;
    }
    this.setState({ error: false });
    return true;
  };

  isValidLink = (text) => {
    const expression = /[-a-zA-Z0-9@:%._+~#=]{1,256}\.[a-zA-Z0-9()]{1,6}\b([-a-zA-Z0-9()@:%_+.~#?&//=]*)?/gi;
    const regex = new RegExp(expression);
    return text.match(regex);
  };

  render() {
    const { pro, minOpinionStake, minVoteStake } = this.props;
    const { stake, showLink, link, loading, error, metadata } = this.state;
    const side = pro ? " Pro" : " Con";
    return (
      <div className="CreateOpinionCard">
        <div className="CreateOpinionCard__title">
          Support
          {side}
        </div>
        <Toggle
          left={!showLink}
          leftText="Vote"
          rightText="Evidence"
          onChange={this.onActiveToggled}
        />
        <div className="CreateOpinionCard__label">
          <Tooltip
            text={
              showLink
                ? "Sets minimum stake for next evidence item and will be added to total"
                : `Will be added to total of ${side} side of debate`
            }
          >
            Stake (min
            {showLink ? minOpinionStake : minVoteStake}
            sat):
          </Tooltip>
        </div>
        <div className="CreateOpinionCard__input-wrapper">
          <input
            autoComplete="off"
            name="stake"
            id="stake"
            type="number"
            value={stake}
            onChange={this.handleChange}
          />
        </div>
        {showLink && (
          <div>
            <div className="CreateOpinionCard__label">
              <Tooltip
                text={`Link to material supporting ${side} side of the debate`}
              >
                Link to evidence:
              </Tooltip>
            </div>
            <div className="CreateOpinionCard__input-wrapper">
              <input
                autoComplete="off"
                name="link"
                id="link"
                type="text"
                value={link}
                onChange={this.handleChange}
              />
            </div>
            {metadata && (
              <>
                <div className="CreateOpinionCard__preview__divider" />
                <div className="CreateOpinionCard__preview__content-wrapper__content">
                  <div className="CreateOpinionCard__preview__content-wrapper__content__image">
                    {metadata.image ? (
                      <img src={metadata.image} alt="Article preview" />
                    ) : (
                      <i className="far fa-newspaper" />
                    )}
                  </div>
                  <div className="CreateOpinionCard__preview__content-wrapper__content__details">
                    <a
                      href={metadata.url}
                      target="_blank"
                      rel="noopener noreferrer"
                    >
                      <div className="CreateOpinionCard__preview__content-wrapper__content__details__title">
                        {metadata.title}
                      </div>
                    </a>
                    <div className="CreateOpinionCard__preview__content-wrapper__content__details__description">
                      {metadata.description}
                    </div>
                    <div className="CreateOpinionCard__preview__content-wrapper__content__details__domain">
                      {Formatter.getBaseUrl(metadata.url)}
                    </div>
                  </div>
                </div>
                <div className="CreateOpinionCard__preview__divider" />
              </>
            )}
          </div>
        )}
        <div className="CreateOpinionCard__error">{error}</div>
        <Button
          style={{ marginLeft: pro ? "initial" : "auto" }}
          disabled={loading}
          accent
          onClick={this.onCreateClicked}
        >
          {loading ? (
            <>
              <i className="fas fa-spinner" aria-hidden="true" />
              <span>&nbsp;Creating</span>
            </>
          ) : (
            <>
              <i className="fa fa-paper-plane" />
              <span>&nbsp;Create</span>
            </>
          )}
        </Button>
      </div>
    );
  }
}
CreateOpinionCard.propTypes = {
  debateId: PropTypes.string.isRequired,
  pro: PropTypes.bool.isRequired,
  minOpinionStake: PropTypes.number.isRequired,
  minVoteStake: PropTypes.number.isRequired,
};
const mapDispatchToProps = (dispatch) => ({
  fetchCreateOpinion: (debateId, content, contentType, stake, pro) =>
    dispatch(fetchCreateOpinion(debateId, content, contentType, stake, pro)),
});
const mapStateToProps = (state) => ({
  createOpinion: state.createOpinion,
});
export default connect(mapStateToProps, mapDispatchToProps)(CreateOpinionCard);
