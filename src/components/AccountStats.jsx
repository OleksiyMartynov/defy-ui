import React from "react";
import "./AccountStats.scss";
class AccountStats extends React.Component {
  render() {
    return (
      <div className="AccountStats">
        <div className="AccountStats__title">
            Funds
        </div>
        <div className="AccountStats__total">
            999,999
        </div>
        <div className="AccountStats__numbers-row">
            <div className="AccountStats__numbers-row__subtitle">
                Available
            </div>
            <div className="AccountStats__numbers-row__subtitle">
                Locked
            </div>
        </div>
        <div className="AccountStats__numbers-row">
            <div className="AccountStats__numbers-row__number">
                49,999
            </div>
            <div className="AccountStats__numbers-row__number">
                49,999
            </div>
        </div>
        
      </div>
    );
  }
}
export default AccountStats;
