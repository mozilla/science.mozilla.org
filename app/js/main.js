import React from "react";
import { render } from "react-dom";
import { Router, Route, browserHistory, IndexRoute } from "react-router";

// Components

import Header from "./components/header.jsx";
import Footer from "./components/footer.jsx";

// Pages

import Blog from "./pages/blog.jsx";
import Home from "./pages/home.jsx";
import Members from "./pages/members.jsx";
import Programs from "./pages/programs.jsx";
import Projects from "./pages/projects.jsx";
import Resources from "./pages/resources.jsx";

const App = React.createClass({
  render() {
    return (
      <div>
        <Header/>
        {this.props.children}
        <Footer/>
      </div>
    );
  }
});

render((
  <Router history={browserHistory}>
    <Route path="/" component={App}>
      <IndexRoute component={Home}/>
      <Route path="blog" component={Blog}/>
      <Route path="members" component={Members}/>
      <Route path="programs" component={Programs}/>
      <Route path="projects" component={Projects}/>
      <Route path="resources" component={Resources}/>
    </Route>
  </Router>
), document.querySelector(`#app`));
