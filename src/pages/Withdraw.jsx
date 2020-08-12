import React from "react";
import "./Withdraw.scss";
import { fetchWithdrawalInvoice } from "../actions/payment";
import { connect } from "react-redux";

class Withdraw extends React.Component {
  constructor(props) {
    super(props);
    this.state = { invoice: "" };
  }

  handleSubmit = async (event) => {
    event.preventDefault();
    const { fetchWithdrawalInvoice } = this.props;
    console.log(this.state.invoice);
    fetchWithdrawalInvoice(this.state.invoice);
    // this.setState({ invoice: "" });
  };

  render() {
    const { withdrawalInvoice } = this.props;
    return (
      <div className="Withdraw">
        Withdraw
        <br />
        <form onSubmit={this.handleSubmit}>
          <span className="formtext">&#x3C;Form /&#x3E;</span>
          <input
            type="text"
            value={this.state.invoice}
            onChange={(event) => this.setState({ invoice: event.target.value })}
            placeholder="Enter Lightning invoice"
            required
          />
          <button type="submit">Withdraw</button>
        </form>
        <br />
        {withdrawalInvoice.loading && <div>loading</div>}
        {withdrawalInvoice.error && <div>error</div>}
        {withdrawalInvoice.data && (
          <div>{JSON.stringify(withdrawalInvoice.data)}</div>
        )}
      </div>
    );
  }
}

const mapDispatchToProps = (dispatch) => ({
  fetchWithdrawalInvoice: (invoice) =>
    dispatch(fetchWithdrawalInvoice(invoice)),
});
const mapStateToProps = (state) => ({
  withdrawalInvoice: state.withdrawalInvoice,
});
export default connect(mapStateToProps, mapDispatchToProps)(Withdraw);
