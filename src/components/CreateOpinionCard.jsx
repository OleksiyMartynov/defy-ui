import React, { Component } from "react";
import "./CreateOpinionCard.scss";
import { connect } from "react-redux";
import PropTypes from "prop-types";
import Toggle from "./Toggle";
import Button from "./Button";
import { fetchCreateOpinion } from "../actions/opinions";

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
  };

  onCreateClicked = async () => {
    const { pro, fetchCreateOpinion, debateId } = this.props;
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
      } else {
        this.props.onNewOpinionCreated();
      }
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
    const { stake, showLink, link, loading, error } = this.state;
    return (
      <div className="CreateOpinionCard">
        <div className="CreateOpinionCard__title">
          Support
          {pro ? " Pro" : " Con"}
        </div>
        <Toggle
          left={!showLink}
          leftText="Vote"
          rightText="Evidence"
          onChange={this.onActiveToggled}
        />
        <div className="CreateOpinionCard__label">
          Stake (min
          {showLink ? minOpinionStake : minVoteStake}
          sat):
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
            <div className="CreateOpinionCard__label">Link to evidence:</div>
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
          </div>
        )}
        <div className="CreateOpinionCard__error">{error}</div>
        <Button disabled={loading} accent onClick={this.onCreateClicked}>
          {loading ? (
            <>
              <i className="fa fa-spinner" aria-hidden="true" />
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
