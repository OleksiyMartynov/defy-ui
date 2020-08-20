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
import Formatter from "../utils/Formatter";
import { Loader } from "./Loader";
import Dropdown from "./Dropdown";

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

  itemSelectedListener = (item) => {
    switch (item) {
      case 0: {
        this.onDeposit();
        break;
      }
      case 1: {
        this.onWithdrawal();
        break;
      }
      default: {
        this.onCreateDebate();
      }
    }
  };

  render() {
    const { account } = this.props;
    return (
      <div className="AccountStats">
        {account.error !== null && (
          <div>Unable to load balance from server</div>
        )}
        {account.loading && <Loader />}
        {account.data && (
          <div className="AccountStats__rows-wrapper">
            <div className="AccountStats__title">Funds</div>
            <div className="AccountStats__total">
              <i className="fa fa-bolt" />
              {Formatter.addCommas(
                account.data.balance + account.data.lockedBalance
              )}
            </div>

            <div className="AccountStats__numbers-row">
              <div className="AccountStats__numbers-row__subtitle">
                Available
              </div>
              <div className="AccountStats__numbers-row__subtitle">Locked</div>
            </div>
            <div className="AccountStats__numbers-row">
              <div className="AccountStats__numbers-row__number">
                {Formatter.addCommas(account.data.balance)}
              </div>
              <div className="AccountStats__numbers-row__number">
                {Formatter.addCommas(account.data.lockedBalance)}
              </div>
            </div>
          </div>
        )}
        <div className="AccountStats__divider" />
        <div className="AccountStats__rows-wrapper AccountStats__buttons-layout">
          <div className="AccountStats__buttons-layout__dropdown">
            <Dropdown
              items={[
                { style: "fas fa-piggy-bank", text: "Deposit" },
                { style: "fas fa-wallet", text: "Withdraw" },
                { style: "fa fa-plus-circle", text: "New Debate" },
              ]}
              itemSelectedListener={this.itemSelectedListener}
              customButtonLayout={<i className="fas fa-ellipsis-v" />}
              customRender={(item) => (
                <div className="AccountStats__buttons-layout__dropdown__item">
                  <i className={item.style} />
                  {item.text}
                </div>
              )}
            />
          </div>

          <div className="AccountStats__numbers-row">
            <Button onClick={this.onDeposit}>
              <i className="fas fa-piggy-bank" />
              <span>&nbsp;Deposit</span>
            </Button>
          </div>
          <div className="AccountStats__numbers-row">
            <Button onClick={this.onWithdrawal}>
              <i className="fas fa-wallet" />
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
  account: PropTypes.object.isRequired,
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
