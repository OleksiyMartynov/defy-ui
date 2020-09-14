import React, { Component } from "react";
import "./Welcome.scss";
import { connect } from "react-redux";
import { closeWelcomeDialog } from "../actions/ui";
import Toggle from "../components/Toggle";
import FloatingButton from "../components/FloatingButton";

class Welcome extends Component {
  constructor(props) {
    super(props);
    this.state = { showWords: false, showMore: false };
  }

  render() {
    const { showWords, showMore } = this.state;
    const { account, closeWelcomeDialog } = this.props;
    return (
      <div className="Welcome">
        <div className="Welcome__content">
          <div className="Welcome__heading">Welcome!</div>
          <span className="Welcome__content__description">
            <b>Defy</b> allows users to collaborate and find answers to a debate
            topic by attaching a price to the information. Unlike other social
            debate platforms, Defy cuts out the noise by attaching value to each
            debate. You have a financial incentive to research and provide
            strong evidence to your side of the debate. The winning side takes
            it all.
            <br />
            <Toggle
              isFlat
              left={showMore}
              leftText="More Info"
              leftIcon={<i className="fas fa-chevron-down" />}
              onChange={(toggle) => this.setState({ showMore: toggle })}
            />
            <div
              className="Welcome__content__more-info"
              style={{ minHeight: showMore ? "150px" : "0px" }}
            >
              {showMore && (
                <ul>
                  <li>Debates have two sides, Pro and Con</li>
                  <li>
                    The side with the majority vote wins all the stake at the
                    end of the debate
                  </li>
                  <li>
                    Debate closes in 24 hours unless new evidence is added
                  </li>
                  <li>You can vote by locking up sats(unit of Bitcoin)</li>
                  <li>
                    Forms of evidence include but not limited to research
                    papers, tweets or youtube videos
                  </li>
                  <li>
                    The stake amount for new evidence has to be greater than
                    previous
                  </li>
                  <li>
                    Winning side receives their stake back plus the matching
                    fraction of the losing side
                  </li>
                  <li>Losing side loses their stake</li>
                </ul>
              )}
            </div>
          </span>
          <b>Before you start!</b>
          <ol>
            <li>
              Back up your recovery phrase! This list of words is your account
              backup, your recovery phrase can be found under the Account tab.
              Save it somewhere safe (not on this device). Do not share it with
              anyone. Do not lose it. If you lose your word list and clear your
              browser cookies, you&apos;ve lost your funds.
            </li>
            <br />
            <div className="Welcome__center-toggle-wrapper">
              <Toggle
                left={showWords}
                leftText="Show Words"
                leftIcon={<i className="fa fa-eye" />}
                onChange={(toggle) => this.setState({ showWords: toggle })}
              />
            </div>
            {showWords && (
              <div className="Welcome__words-container">
                <textarea value={account.mnemonic} disabled />
              </div>
            )}
            <br />
            <li>
              To participate in a debate you first need to deposit some Bitcoin
              over Lightning Network.
            </li>
          </ol>
          <FloatingButton onClick={() => closeWelcomeDialog()}>
            <i className="far fa-flushed" />
            <span>&nbsp;Let&apos;s go!</span>
          </FloatingButton>
        </div>
      </div>
    );
  }
}

const mapStateToProps = (state) => ({
  account: state.account,
});

const mapDispatchToProps = (dispatch) => ({
  closeWelcomeDialog: () => dispatch(closeWelcomeDialog()),
});

export default connect(mapStateToProps, mapDispatchToProps)(Welcome);
