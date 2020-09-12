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
            <b>Defy</b> allows users to collaboratively find an answer to a
            debate topic by attaching a monetary cost to information. Unlike
            other social debate platforms, Defy separates signal from the noise
            by sorting debates by the total monetary stake attached to each
            debate. Also the users have a financial incentive to research and
            provide strong evidence for their side of the debate, because the
            winning side takes all the stake.
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
                    The side in the majority at debate completion time will take
                    all the stake
                  </li>
                  <li>
                    Debate completes in 24 hours from the moment last evidence
                    item was posted
                  </li>
                  <li>You can vote by locking up sats(unit of Bitcoin)</li>
                  <li>
                    You can provide evidence such as links to a research paper,
                    tweets or youtube videos to help convince other users to
                    vote for your side of the debate
                  </li>
                  <li>
                    The stake amount for new evidence information has to be
                    greater than previous evidence stake. This prevents debates
                    from continuing indefinitely
                  </li>
                  <li>
                    Winning side receives their stake back plus relative
                    fraction of the losing side
                  </li>
                  <li>Losing side will lose all their stake</li>
                </ul>
              )}
            </div>
          </span>
          <b>Before you start!</b>
          <ol>
            <li>
              Back up your seed phrase! This list of words is your account
              backup. Save it somewhere safe (not on this device)! Do not share
              it with anyone. Do not lose it. If you lose your words list and
              your browser cookies, you&apos;ve lost your funds.
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
