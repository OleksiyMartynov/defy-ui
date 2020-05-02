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

class App extends React.Component {
  constructor(props) {
    super(props);
    if (!props.account) {
      props.createAccount();
    }
  }

  render() {
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
      </div>
    );
  }
}
App.propTypes = {
  account: PropTypes.object,
  createAccount: PropTypes.func.isRequired,
};
const mapDispatchToProps = (dispatch) => ({
  createAccount: (account) => dispatch(createAccount(account)),
});
const mapStateToProps = (state) => ({
  account: state.account,
});
export default connect(mapStateToProps, mapDispatchToProps)(App);
