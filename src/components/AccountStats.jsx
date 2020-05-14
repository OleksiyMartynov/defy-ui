import React from "react";
import "./AccountStats.scss";
import { connect } from "react-redux";
import PropTypes from "prop-types";
import Button from "./Button";
import {
  openDepositDialog,
  openWithdrawalDialog,
  openCreateDebateDialog,
} from "../actions/ui";
import FloatingButton from "./FloatingButton";

class AccountStats extends React.Component {
  onDeposit = () => {
    this.props.openDepositDialog();
  };

  onWithdrawal = () => {
    this.props.openWithdrawalDialog();
  };

  onCreateDebate = () => {
    this.props.openCreateDebateDialog();
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
            <Button onClick={this.onWithdrawal}>
              <i className="fa fa-arrow-circle-up" />
              <span>&nbsp;Withdraw</span>
            </Button>
          </div>
          <div className="AccountStats__numbers-row">
            <FloatingButton onClick={this.onCreateDebate}>
              <i className="fa fa-plus-circle" />
              <span>&nbsp;Start Debate</span>
            </FloatingButton>
          </div>
        </div>
      </div>
    );
  }
}

AccountStats.propTypes = {
  openCreateDebateDialog: PropTypes.func.isRequired,
  openDepositDialog: PropTypes.func.isRequired,
  openWithdrawalDialog: PropTypes.func.isRequired,
};

const mapDispatchToProps = (dispatch) => ({
  openDepositDialog: () => dispatch(openDepositDialog()),
  openWithdrawalDialog: () => dispatch(openWithdrawalDialog()),
  openCreateDebateDialog: () => dispatch(openCreateDebateDialog()),
});

const mapStateToProps = (state) => ({
  account: state.account,
});
export default connect(mapStateToProps, mapDispatchToProps)(AccountStats);
