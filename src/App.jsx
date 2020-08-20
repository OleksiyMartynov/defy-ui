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
import { createAccount, fetchAccountInfo } from "./actions/account";
import {
  closeDepositDialog,
  closeWithdrawalDialog,
  closeCreateDebateDialog,
} from "./actions/ui";
import Button from "./components/Button";
import Withdraw from "./pages/Withdraw";
import Deposit from "./pages/Deposit";
import CreateDebate from "./pages/CreateDebate";
import DebateDetails from "./pages/DebateDetails";
import NavBar from "./components/NavBar";
import AccountStats from "./components/AccountStats";
import Debates from "./pages/Debates";
import Discover from "./pages/History";
import Account from "./pages/Account";
import Toast from "./components/Toast";
import { Helmet } from "react-helmet";

class App extends React.Component {
  constructor(props) {
    super(props);
    props.fetchAccountInfo();
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
        <div className="App__dialog-wrapper">
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
        </div>
      );
    }
    return null;
  };

  wrapInNavigation = (Comp, params) => {
    return (
      <div className="App">
        <Helmet>
          <title>Defy.fyi : Put your ₿ where your mouth is</title>
          <meta name="description" content="Debate hot topics and win sats" />
        </Helmet>
        <NavBar
          items={[
            {
              text: "Debates",
              link: "/debates",
              icon: "fas fa-balance-scale",
            },
            {
              text: "History",
              link: "/history",
              icon: "fas fa-history",
            },
            { text: "Account", link: "/account", icon: "fa fa-cog" },
          ]}
        />
        <div className="App__content">
          <Comp {...params} />
        </div>
        <AccountStats />
      </div>
    );
  };

  render() {
    // eslint-disable-next-line no-console
    console.log("App.render()");
    const { ui } = this.props;
    return (
      <div>
        <Router>
          <Switch>
            <Route
              strict
              exact
              path="/debate/:slug"
              component={DebateDetails}
            />
            <Route
              path="/debates/:tag?"
              render={(params) => this.wrapInNavigation(Debates, params)}
            />
            <Route
              exact
              path="/history"
              render={(params) => this.wrapInNavigation(Discover, params)}
            />
            <Route
              exact
              path="/account"
              render={(params) => this.wrapInNavigation(Account, params)}
            />
            <Redirect to="/debates" />
          </Switch>
          {this.buildDialog(ui)}
          <Toast />
        </Router>
      </div>
    );
  }
}
App.propTypes = {
  account: PropTypes.object.isRequired,
  ui: PropTypes.object.isRequired,
  createAccount: PropTypes.func.isRequired,
  fetchAccountInfo: PropTypes.func.isRequired,
  closeDepositDialog: PropTypes.func.isRequired,
  closeWithdrawalDialog: PropTypes.func.isRequired,
  closeCreateDebateDialog: PropTypes.func.isRequired,
};
const mapDispatchToProps = (dispatch) => ({
  createAccount: (account) => dispatch(createAccount(account)),
  fetchAccountInfo: () => dispatch(fetchAccountInfo()),
  closeDepositDialog: () => dispatch(closeDepositDialog()),
  closeWithdrawalDialog: () => dispatch(closeWithdrawalDialog()),
  closeCreateDebateDialog: () => dispatch(closeCreateDebateDialog()),
});
const mapStateToProps = (state) => ({
  account: state.account,
  ui: state.ui,
});
export default connect(mapStateToProps, mapDispatchToProps)(App);
