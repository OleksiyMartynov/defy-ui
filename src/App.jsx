import React from "react";
import "./App.scss";
import {
  BrowserRouter as Router,
  Switch,
  Route,
  Redirect,
} from "react-router-dom";
import { connect } from "react-redux";
import PropTypes from "prop-types";
import NavBar from "./components/NavBar";
import Home from "./pages/Home";
import Discover from "./pages/Discover";
import Account from "./pages/Account";
import AccountStats from "./components/AccountStats";
import { createAccount } from "./actions/account";
import {
  closeDepositDialog,
  closeWithdrawalDialog,
  closeCreateDebateDialog,
} from "./actions/ui";
import Button from "./components/Button";
import Withdraw from "./pages/Withdraw";
import Deposit from "./pages/Deposit";
import CreateDebate from "./pages/CreateDebate";

class App extends React.Component {
  constructor(props) {
    super(props);
    if (!props.account) {
      props.createAccount();
    }
  }

  buildDialog = (ui) => {
    const {
      showDepositDialog,
      showWithdrawalDialog,
      showCreateDebateDialog,
    } = ui;
    const {
      closeDepositDialog,
      closeWithdrawalDialog,
      closeCreateDebateDialog,
    } = this.props;
    if (showWithdrawalDialog || showCreateDebateDialog || showDepositDialog) {
      const dialogData = {};
      if (showDepositDialog) {
        dialogData.onClose = closeDepositDialog;
        dialogData.content = Deposit;
      } else if (showWithdrawalDialog) {
        dialogData.onClose = closeWithdrawalDialog;
        dialogData.content = Withdraw;
      } else {
        dialogData.onClose = closeCreateDebateDialog;
        dialogData.content = CreateDebate;
      }
      return (
        <div className="App__dialog">
          <div className="App__dialog__nav">
            <Button accent onClick={dialogData.onClose}>
              <i className="fa fa-times" />
            </Button>
          </div>
          <div className="App__dialog__content">
            <dialogData.content />
          </div>
        </div>
      );
    }
    return null;
  };

  render() {
    const { ui } = this.props;
    return (
      <div className="App">
        <Router>
          <NavBar
            items={[
              { text: "Home", link: "/home", icon: "fa fa-gavel" },
              { text: "Discover", link: "/discover", icon: "fa fa-globe" },
              { text: "Account", link: "/account", icon: "fa fa-cog" },
            ]}
          />
          <div className="App__content">
            <Switch>
              <Route exact path="/home" component={Home} />
              <Route exact path="/discover" component={Discover} />
              <Route exact path="/account" component={Account} />
              <Route>
                <Redirect to="/home" />
              </Route>
            </Switch>
          </div>
          <AccountStats />
        </Router>
        {this.buildDialog(ui)}
      </div>
    );
  }
}
App.propTypes = {
  account: PropTypes.object.isRequired,
  ui: PropTypes.object.isRequired,
  createAccount: PropTypes.func.isRequired,
  closeDepositDialog: PropTypes.func.isRequired,
  closeWithdrawalDialog: PropTypes.func.isRequired,
  closeCreateDebateDialog: PropTypes.func.isRequired,
};
const mapDispatchToProps = (dispatch) => ({
  createAccount: (account) => dispatch(createAccount(account)),
  closeDepositDialog: () => dispatch(closeDepositDialog()),
  closeWithdrawalDialog: () => dispatch(closeWithdrawalDialog()),
  closeCreateDebateDialog: () => dispatch(closeCreateDebateDialog()),
});
const mapStateToProps = (state) => ({
  account: state.account,
  ui: state.ui,
});
export default connect(mapStateToProps, mapDispatchToProps)(App);
