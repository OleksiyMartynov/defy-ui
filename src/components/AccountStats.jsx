import React from "react";
import "./AccountStats.scss";
import { connect } from "react-redux";
import Button from "./Button";
import { createAccount } from "../actions/account";

class AccountStats extends React.Component {
  onDeposit = () => {
    // todo
  };

  render() {
    // const { account } = this.props;

    return (
      <div className="AccountStats">
        <div className="AccountStats__rows-wrapper">
          <div className="AccountStats__title">Funds</div>
          <div className="AccountStats__total">999,999</div>

          <div className="AccountStats__numbers-row">
            <div className="AccountStats__numbers-row__subtitle">Available</div>
            <div className="AccountStats__numbers-row__subtitle">Locked</div>
          </div>
          <div className="AccountStats__numbers-row">
            <div className="AccountStats__numbers-row__number">49,999</div>
            <div className="AccountStats__numbers-row__number">49,999</div>
          </div>
        </div>
        <div className="AccountStats__divider" />
        <div className="AccountStats__rows-wrapper">
          <div className="AccountStats__numbers-row">
            <Button onClick={this.onDeposit}>
              <i className="fa fa-arrow-circle-down" />
              <span>&nbsp;Deposit</span>
            </Button>
          </div>
          <div className="AccountStats__numbers-row">
            <Button>
              <i className="fa fa-arrow-circle-up" />
              <span>&nbsp;Withdraw</span>
            </Button>
          </div>
        </div>
      </div>
    );
  }
}

const mapDispatchToProps = (dispatch) => ({
  createAccount: (account) => dispatch(createAccount(account)),
});

const mapStateToProps = (state) => ({
  account: state.account,
});
export default connect(mapStateToProps, mapDispatchToProps)(AccountStats);
