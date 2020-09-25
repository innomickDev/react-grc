import React from "react";
import ReactDOM from "react-dom";
import { createBrowserHistory } from "history";
import { Router, HashRouter, Route, Switch } from "react-router-dom";
import { applyMiddleware, createStore } from "redux";
import promise from "redux-promise";
import { Provider } from "react-redux";
import reducers from "./reducers";
import thunkMiddleware from "redux-thunk";
import { setDefaultTranslations, setDefaultLanguage } from "react-multi-lang";
import fr from "./translations/fr.json";
import ar from "./translations/ar.json";
import "react-toastify/dist/ReactToastify.css";
import "bootstrap/dist/css/bootstrap.css";
import "./assets/scss/now-ui-dashboard.css?v=1.2.0";
import "./assets/css/demo.css";
import "assets/css/custom.css";

import indexRoutes from "./routes/index.jsx";

const hist = createBrowserHistory();
setDefaultTranslations({ fr, ar });

if (localStorage.getItem("lang")) {
  // console.log("lang",localStorage.getItem("lang"));
  setDefaultLanguage(localStorage.getItem("lang").split("-")[0]);
} else {
  setDefaultLanguage(`${process.env.REACT_APP_LANG_NAME}`);
}

const createStoreWithMiddleware = applyMiddleware(
  promise,
  thunkMiddleware
)(createStore);

ReactDOM.render(
  <Provider store={createStoreWithMiddleware(reducers)}>
    <HashRouter history={hist}>
      <Switch>
        {indexRoutes.map((prop, key) => {
          return (
            <Route path={prop.path} key={key} component={prop.component} />
          );
        })}
      </Switch>
    </HashRouter>
  </Provider>,
  document.getElementById("root")
);
