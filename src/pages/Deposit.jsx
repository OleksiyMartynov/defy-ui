import React from "react";
import "./Deposit.scss";
import { fetchDepositInvoice } from "../actions/payment";
import { connect } from "react-redux";
import QRCode from "qrcode.react";

class Deposit extends React.Component {
  constructor(props) {
    super(props);
    const { fetchDepositInvoice } = this.props;
    fetchDepositInvoice();
  }

  render() {
    const { depositInvoice } = this.props;
    return (
      <div className="Deposit">
        Deposit
        <br />
        {depositInvoice.loading && <div>loading</div>}
        {depositInvoice.error && <div>error</div>}
        {depositInvoice.data && (
          <div>
            <QRCode value={depositInvoice.data.invoice.data} />
          </div>
        )}
      </div>
    );
  }
}

const mapDispatchToProps = (dispatch) => ({
  fetchDepositInvoice: () => dispatch(fetchDepositInvoice()),
});
const mapStateToProps = (state) => ({
  depositInvoice: state.depositInvoice,
});
export default connect(mapStateToProps, mapDispatchToProps)(Deposit);
