import React from "react";
import "./Account.scss";
import { connect } from "react-redux";
import { ethers } from "ethers";
import PropTypes from "prop-types";
import Toggle from "../components/Toggle";
import { updateAccount } from "../actions/account";
import Error from "../components/Error";
import Button from "../components/Button";
import AccountModel from "../models/Account";

class Account extends React.Component {
  constructor(props) {
    super(props);
    this.state = { showWords: false, newSeed: "", newSeedValid: false };
  }

  handleNewSeedChange = (event) => {
    const seedWords = event.target.value;
    this.setState({
      newSeed: seedWords,
      newSeedValid: ethers.utils.HDNode.isValidMnemonic(seedWords),
    });
  };

  onImport = () => {
    const { updateAccount } = this.props;
    const { newSeed } = this.state;
    const newAccount = new AccountModel(newSeed);
    updateAccount(newAccount);
  };

  render() {
    const { showWords, newSeed, newSeedValid } = this.state;
    const { account } = this.props;
    console.log(account);
    const accountObject = new AccountModel(account.mnemonic);
    console.log(accountObject);
    console.log(accountObject.getAddress());
    return (
      <div className="Account">
        <span className="Account__heading">Account</span>
        <div className="Account__section">
          <div className="Account__section__title">Recovery Phrase</div>
          <ul>
            <li>This list of words is your account backup.</li>
            <li>Save it somewhere safe (not on this device)!</li>
            <li>Do not share it with anyone.</li>
            <li>
              <b>Do not lose it.</b>
              If you lose your words list and your browser cookies, you&apos;ve
              lost your funds.
            </li>
          </ul>
          <Toggle
            leftText="Show Words"
            leftIcon={<i className="fa fa-eye" />}
            onChange={(toggle) => this.setState({ showWords: toggle })}
          />
          {showWords && (
            <div className="Account__section__words-container">
              <textarea value={account.mnemonic} disabled />
            </div>
          )}
        </div>
        <div className="Account__section">
          <div className="Account__section__title">Import</div>
          <div>Import existing account from words list.</div>
          <div className="Account__section__words-container">
            <textarea value={newSeed} onChange={this.handleNewSeedChange} />
          </div>
          {!newSeedValid && newSeed.length > 0 && (
            <div className="Account__section__error">
              Invalid seed format. Must be 12 space separated words.
            </div>
          )}
          <br />
          <Error message="Importing new account will overwrite the existing!" />
          <br />
          <Button onClick={this.onImport}>IMPORT</Button>
        </div>
      </div>
    );
  }
}
Account.propTypes = {
  account: PropTypes.object.isRequired,
  updateAccount: PropTypes.func.isRequired,
};
const mapStateToProps = (state) => ({
  account: state.account,
});
const mapDispatchToProps = (dispatch) => ({
  updateAccount: (account) => dispatch(updateAccount(account)),
});
export default connect(mapStateToProps, mapDispatchToProps)(Account);
