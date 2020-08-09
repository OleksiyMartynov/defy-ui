import React, { PureComponent } from "react";
import { Route, Redirect } from "react-router-dom";
import NavBar from "../components/NavBar";
import AccountStats from "../components/AccountStats";
import Debates from "./Debates";
import Discover from "./History";
import Account from "./Account";
import "./Home.scss";

export default class Home extends PureComponent {
  render() {
    return (
      <div className="Home">
        <Route path="/">
          <NavBar
            items={[
              {
                text: "Debates",
                link: "/debates",
                icon: "fas fa-balance-scale",
              },
              { text: "History", link: "/history", icon: "fas fa-history" },
              { text: "Account", link: "/account", icon: "fa fa-cog" },
            ]}
          />
          <div className="Home__content">
            <Route path="/debates/:tag?" component={Debates} />
            <Route exact path="/history" component={Discover} />
            <Route exact path="/account" component={Account} />
          </div>
          <AccountStats />
        </Route>
      </div>
    );
  }
}
