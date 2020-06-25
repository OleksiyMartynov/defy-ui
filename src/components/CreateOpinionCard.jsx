import React, { Component } from "react";
import "./CreateOpinionCard.scss";
import Toggle from "./Toggle";
import Button from "./Button";

export default class CreateOpinionCard extends Component {
  constructor(props) {
    super(props);
    this.state = { stake: "", link: "", showLink: false };
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
      // todo: validate form, see CreateDebate.jsx
      // todo: post to server
  }

  render() {
    const { stake, showLink, link, loading } = this.state;
    return (
      <div className="CreateOpinionCard">
        <div className="CreateOpinionCard__title">Create Opinion</div>
        <Toggle
          left={!showLink}
          leftText="Vote"
          rightText="Evidence"
          onChange={this.onActiveToggled}
        />
        <div className="CreateOpinionCard__label">Stake:</div>
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
        <br />
        <Button accent onClick={this.onCreateClicked}>
          {loading ? (
            <i className="fa fa-spinner" aria-hidden="true" />
          ) : (
            <i className="fa fa-paper-plane" />
          )}
          <span>&nbsp;Create</span>
        </Button>
      </div>
    );
  }
}
