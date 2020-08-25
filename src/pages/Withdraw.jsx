import React from "react";
import "./Withdraw.scss";
import { connect } from "react-redux";
import {
  fetchWithdrawalInvoice,
  updateWithdrawalInvoice,
} from "../actions/payment";
import { closeWithdrawalDialog, toggleToast } from "../actions/ui";
import { fetchAccountInfo } from "../actions/account";
import Button from "../components/Button";
import DataModel from "../models/DataModel";

class Withdraw extends React.Component {
  constructor(props) {
    super(props);
    this.state = { invoice: "" };
  }

  handleSubmit = async (event) => {
    event.preventDefault();
    const {
      fetchWithdrawalInvoice,
      fetchAccountInfo,
      closeWithdrawalDialog,
      updateWithdrawalInvoice,
      toggleToast,
    } = this.props;
    const result = await fetchWithdrawalInvoice(this.state.invoice);
    if (result?.data?.invoice?.status === "paid") {
      closeWithdrawalDialog();
      fetchAccountInfo();
      toggleToast("Withdrawal successful");
      updateWithdrawalInvoice(new DataModel(false, false));
    }
  };

  render() {
    const { withdrawalInvoice } = this.props;
    return (
      <div className="Withdraw">
        <div className="Withdraw__content">
          <div className="Withdraw__heading">Withdraw Funds</div>
          <form onSubmit={this.handleSubmit}>
            <span>
              Generate an invoice in your Lightning wallet in order to withdraw
              funds
            </span>
            <br />
            <br />
            <div className="Withdraw__input-wrapper">
              <textarea
                disabled={withdrawalInvoice.loading}
                type="text"
                value={this.state.invoice}
                onChange={(event) =>
                  this.setState({ invoice: event.target.value })
                }
                placeholder="Enter Lightning invoice"
                required
              />
            </div>
            {withdrawalInvoice.error && (
              <div className="Withdraw__content__error">
                Error: {withdrawalInvoice.error.message}
              </div>
            )}
            <div className="Withdraw__button-wrapper">
              {!withdrawalInvoice.data ? (
                <Button
                  loading={withdrawalInvoice.loading}
                  disabled={withdrawalInvoice.loading}
                  type="primary"
                  accent
                >
                  {withdrawalInvoice.loading ? (
                    <>
                      <i className="fas fa-spinner" aria-hidden="true" />
                      &nbsp; Processing
                    </>
                  ) : (
                    <>
                      <i className="fas fa-wallet" />
                      &nbsp; Withdraw
                    </>
                  )}
                </Button>
              ) : (
                <div>Success withdrawing</div>
              )}
            </div>
          </form>
        </div>
      </div>
    );
  }
}

const mapDispatchToProps = (dispatch) => ({
  fetchWithdrawalInvoice: (invoice) =>
    dispatch(fetchWithdrawalInvoice(invoice)),
  closeWithdrawalDialog: () => dispatch(closeWithdrawalDialog()),
  fetchAccountInfo: () => dispatch(fetchAccountInfo()),
  toggleToast: (text) => dispatch(toggleToast(text)),
  updateWithdrawalInvoice: (inv) => dispatch(updateWithdrawalInvoice(inv)),
});
const mapStateToProps = (state) => ({
  withdrawalInvoice: state.withdrawalInvoice,
});
export default connect(mapStateToProps, mapDispatchToProps)(Withdraw);
