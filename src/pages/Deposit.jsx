import React from "react";
import "./Deposit.scss";
import { connect } from "react-redux";
import moment from "moment";
import QRCode from "qrcode.react";
import CopyToClipboard from "react-copy-to-clipboard";
import { fetchDepositInvoice, fetchInvoiceInfo } from "../actions/payment";
import { closeDepositDialog, toggleToast } from "../actions/ui";
import { fetchAccountInfo } from "../actions/account";
import CountdownCounter from "../components/CountdownCounter";
import Button from "../components/Button";

let pollerId;

class Deposit extends React.Component {
  constructor(props) {
    super(props);
    this.getInvoice();
  }

  componentWillUnmount() {
    clearInterval(pollerId);
  }

  async getInvoice() {
    const { fetchDepositInvoice } = this.props;
    const result = await fetchDepositInvoice();
    if (result?.data?.invoice?.data) {
      this.startPoller(result.data.invoice.data);
    }
  }

  onCopy = (text) => {
    const { toggleToast } = this.props;
    toggleToast("Text coppied");
  };

  startPoller(invoice) {
    const {
      fetchInvoiceInfo,
      closeDepositDialog,
      fetchAccountInfo,
      toggleToast,
    } = this.props;
    pollerId = setInterval(async () => {
      const result = await fetchInvoiceInfo(invoice);
      if (result?.data?.invoice?.status === "paid") {
        closeDepositDialog();
        fetchAccountInfo();
        toggleToast("Deposit successful");
      }
    }, 10 * 1000);
  }

  render() {
    const { depositInvoice } = this.props;
    return (
      <div className="Deposit">
        <div className="Deposit__content">
          <div className="Deposit__heading">Deposit Funds</div>
          {depositInvoice.loading && <div>Loading</div>}
          {depositInvoice.error && <div>Error making deposit</div>}
          {depositInvoice.data && (
            <>
              <div className="Deposit__banner">
                <div className="Deposit__banner__inner">
                  <QRCode
                    renderAs="svg"
                    style={{ width: "100%", height: "auto" }}
                    value={depositInvoice.data.invoice.data}
                  />
                </div>
              </div>
              <div className="Deposit__invoice">
                <input
                  disabled
                  type="text"
                  value={depositInvoice.data.invoice.data}
                />
                <CopyToClipboard
                  text={depositInvoice.data.invoice.data}
                  onCopy={this.onCopy}
                >
                  <Button secondary onClick={() => {}}>
                    <i className="far fa-clipboard" aria-hidden="true"></i>
                  </Button>
                </CopyToClipboard>
              </div>
              <div className="Deposit__expiry">
                <CountdownCounter
                  format
                  interval={1000}
                  endTime={moment(
                    depositInvoice.data.invoice.expiryTimestamp
                  ).unix()}
                />
              </div>
              <div className="Deposit__spinner">
                <i className="fas fa-spinner fa-4x" aria-hidden="true" />
              </div>
            </>
          )}
        </div>
      </div>
    );
  }
}

const mapDispatchToProps = (dispatch) => ({
  fetchDepositInvoice: () => dispatch(fetchDepositInvoice()),
  fetchInvoiceInfo: (invoice) => dispatch(fetchInvoiceInfo(invoice)),
  closeDepositDialog: () => dispatch(closeDepositDialog()),
  fetchAccountInfo: () => dispatch(fetchAccountInfo()),
  toggleToast: (text) => dispatch(toggleToast(text)),
});
const mapStateToProps = (state) => ({
  depositInvoice: state.depositInvoice,
  fetchInvoiceInfo: state.fetchInvoiceInfo,
});
export default connect(mapStateToProps, mapDispatchToProps)(Deposit);
