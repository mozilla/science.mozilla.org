import React from "react";
import { render } from "react-dom";
import { Router, Route, Redirect, browserHistory, IndexRoute, applyRouterMiddleware } from "react-router";
import useScroll from 'react-router-scroll';
import Routes from "./react/routes.jsx";

render((
  <Router history={browserHistory} render={applyRouterMiddleware(useScroll())}>
    {Routes}
  </Router>
), document.querySelector(`#app`));
