import React from "react";
import "./App.scss";
import NavBar from "./components/NavBar";
import {
  BrowserRouter as Router,
  Switch,
  Route,
  Redirect,
} from "react-router-dom";
import Home from "./pages/Home";
import Discover from "./pages/Discover";
import Account from "./pages/Account";
import AccountStats from "./components/AccountStats";

class App extends React.Component {
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

export default App;
