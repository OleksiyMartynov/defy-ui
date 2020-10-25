import React, { useEffect } from "react";
import "./App.scss";
import {
  BrowserRouter as Router,
  Switch,
  Route,
  Redirect,
} from "react-router-dom";
import { useDispatch } from "react-redux";
import { Helmet } from "react-helmet";
import { fetchAccountInfo } from "./actions/account";
import DebateDetails from "./pages/DebateDetails";
import NavBar from "./components/NavBar";
import AccountStats from "./components/AccountStats";
import Debates from "./pages/Debates";
import Discover from "./pages/History";
import Account from "./pages/Account";
import Help from "./pages/Help";
import Toast from "./components/Toast";
import { ToastDAO, DialogDAO } from "./constants";
import Portal from "./models/Portal";
import { MODAL_IDS } from "./models/UserInterface";

const NAV_ITEMS = [
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
  { text: "Help", link: "/help", icon: "far fa-question-circle" },
];

const wrapInNavigation = (Comp, params, updateDialog) => (
  <div className="App">
    <Helmet>
      <title>Defy.fyi : Put your ₿ where your mouth is</title>
      <meta name="description" content="Debate hot topics and win sats" />
    </Helmet>
    <NavBar items={NAV_ITEMS} />
    <div className="App__content">
      <Comp {...params} />
    </div>
    <AccountStats
      onDeposit={() => updateDialog.update({ showDialogID: MODAL_IDS.DEPOSIT })}
      onWithdraw={() =>
        updateDialog.update({ showDialogID: MODAL_IDS.WITHDRAWAL })
      }
      onCreateDebate={() =>
        updateDialog.update({ showDialogID: MODAL_IDS.CREATE_DEBATE })
      }
    />
  </div>
);

const App = () => {
  // eslint-disable-next-line no-console
  console.log("App.render()");

  const dispatch = useDispatch();
  useEffect(() => {
    dispatch(fetchAccountInfo());
  }, [dispatch]);
  return (
    <div>
      <DialogDAO.Producer>
        {(updateDialog) => (
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
                render={(params) =>
                  wrapInNavigation(Debates, params, updateDialog)
                }
              />
              <Route
                exact
                path="/history"
                render={(params) =>
                  wrapInNavigation(Discover, params, updateDialog)
                }
              />
              <Route
                exact
                path="/account"
                render={(params) =>
                  wrapInNavigation(Account, params, updateDialog)
                }
              />
              <Route
                exact
                path="/help"
                render={(params) =>
                  wrapInNavigation(Help, params, updateDialog)
                }
              />
              <Redirect to="/debates" />
            </Switch>
            <DialogDAO.Consumer>
              {(dialog) => (
                <Portal
                  showDialogID={dialog.showDialogID}
                  closeDialog={() =>
                    updateDialog.update({
                      showDialogID: MODAL_IDS.NONE,
                    })
                  }
                />
              )}
            </DialogDAO.Consumer>
            <ToastDAO.Consumer>
              {(toast) => <Toast text={toast.text} show={toast.show} />}
            </ToastDAO.Consumer>
          </Router>
        )}
      </DialogDAO.Producer>
    </div>
  );
};
export default App;
