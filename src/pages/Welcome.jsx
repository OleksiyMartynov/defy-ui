import React, { Component } from "react";
import "./Welcome.scss";
import { connect } from "react-redux";
import { closeWelcomeDialog } from "../actions/ui";
import Toggle from "../components/Toggle";
import FloatingButton from "../components/FloatingButton";

class Welcome extends Component {
  constructor(props) {
    super(props);
    this.state = { showWords: false };
  }

  render() {
    const { showWords } = this.state;
    const { account, closeWelcomeDialog } = this.props;
    return (
      <div className="Welcome">
        <div className="Welcome__content">
          <div className="Welcome__heading">Welcome!</div>
          <ol>
            <li>
              Back up your seed prase! This list of words is your account
              backup. Save it somewhere safe (not on this device)! Do not share
              it with anyone. Do not lose it. If you lose your words list and
              your browser cookies, you've lost your funds.
            </li>
            <br />
            <Toggle
              left={showWords}
              leftText="Show Words"
              leftIcon={<i className="fa fa-eye" />}
              onChange={(toggle) => this.setState({ showWords: toggle })}
            />
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
