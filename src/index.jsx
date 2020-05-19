import React from "react";
import ReactDOM from "react-dom";
import "./index.scss";
import "font-awesome/css/font-awesome.min.css";
import { compose, createStore, applyMiddleware } from "redux";
import { Provider } from "react-redux";
import thunkMiddleware from "redux-thunk";
import persistState from "redux-localstorage";
import * as serviceWorker from "./serviceWorker";
import App from "./App";
import rootReducer from "./reducers/index";
import ApiService from "./services/ApiService";

const initServices = () => ({
  apiService: new ApiService(process.env.REACT_APP_API_URL),
});

const enhancer = compose(
  persistState(["account"], { key: "state" }),
  applyMiddleware(thunkMiddleware.withExtraArgument(initServices()))
);

const store = createStore(rootReducer, {}, enhancer);

// if (process.env.NODE_ENV === "development") {
//   // eslint-disable-next-line global-require
//   const whyDidYouRender = require("@welldone-software/why-did-you-render");
//   whyDidYouRender(React, {
//     trackAllPureComponents: true,
//   });
// }

ReactDOM.render(
    <Provider store={store}>
      <App id="app" />
    </Provider>,
  document.getElementById("root")
);

// If you want your app to work offline and load faster, you can change
// unregister() to register() below. Note this comes with some pitfalls.
// Learn more about service workers: https://bit.ly/CRA-PWA
serviceWorker.unregister();
