import React from "react";
import { render } from "react-dom";
import { Router, Route, Redirect, browserHistory, IndexRoute, applyRouterMiddleware } from "react-router";
import useScroll from 'react-router-scroll';

// Components

import Header from "./components/header/header.jsx";
import Footer from "./components/footer/footer.jsx";

// Pages

import BlogList from "./pages/blog.jsx";
import BlogPost from "./pages/blog-post/blog-post.jsx";
import Home from "./pages/home/home.jsx";
import Members from "./pages/members.jsx";
import Projects from "./pages/projects/projects.jsx";
import Project from "./pages/project-details/project-details.jsx";
import Resources from "./pages/resources/resources.jsx";
import StyleGuide from "./pages/style-guide.jsx";
import Events from "./pages/events.jsx";
import StudyGroups from "./pages/study-groups/study-groups.jsx";
import Fellowships from "./pages/fellowships/fellowships.jsx";
import Event from "./pages/event-details/event-details.jsx";
import CodeOfConduct from "./pages/code-of-conduct/code-of-conduct.jsx";

const App = React.createClass({
  render() {
    return (
      <div>
        <Header path={this.props.location.pathname}/>
        <div id="content-wrapper">
          <div id="content">
            {this.props.children}
          </div>
        </div>
        <Footer/>
      </div>
    );
  }
});

render((
  <Router history={browserHistory} render={applyRouterMiddleware(useScroll())}>
    <Route path="/" component={App}>
      <IndexRoute component={Home}/>
      <Route path="blog" component={BlogList}/>
      <Route path="blog/:slug" component={BlogPost}/>
      <Route path="members" component={Members}/>
      <Route path="projects" component={Projects} >
        // https://github.com/mozilla/science.mozilla.org/issues/425#issuecomment-221339156
        <Redirect from="jstirnaman-openMetaAnalysis.github.io" to="openMetaAnalysis" />
      </Route>
      <Route path="projects/:id" component={Project} />
      <Route path="programs/events/:id" component={Event}>
        <Route path=":tab" component={Event}/>
      </Route>
      <Route path="programs/events" component={Events} />
      <Route path="programs/fellowships" component={Fellowships}>
        <Route path=":tab" component={Fellowships} />
      </Route>
      <Route path="programs/studygroups" component={StudyGroups}>
        <Route path=":tab" component={StudyGroups} />
      </Route>
      <Route path="resources" component={Resources}/>
      <Route path="style-guide" component={StyleGuide}/>
      <Route path="code-of-conduct" component={CodeOfConduct}/>

      // Redirect old Science site URLs
      <Redirect from="training" to="resources" />
      <Redirect from="community" to="programs/events" />
      <Redirect from="collaborate" to="projects" />
      <Redirect from="about" to="/" />
      <Redirect from="u/:membername" to="/" />
      <Redirect from="programs" to="/" />
      <Redirect from="fellows" to="programs/fellowships" />
      <Redirect from="fellows/2015" to="programs/fellowships" />
      <Redirect from="training" to="programs" />

      // Event redirects
      <Redirect from="community-call-jun-09-11-et" to="/programs/events/community-call-jun-09-11-et" />
      <Redirect from="project-call-may-26" to="/programs/events/project-call-may-26" />
      <Redirect from="project-call-april-28" to="/programs/events/project-call-april-28" />
      <Redirect from="community-call-apr-14-11-et" to="/programs/events/community-call-apr-14-11-et" />
      <Redirect from="project-call-march-24" to="/programs/events/project-call-march-24" />
      <Redirect from="community-call-mar-10-11-et" to="/programs/events/community-call-mar-10-11-et" />
      <Redirect from="project-call-feb-25" to="/programs/events/project-call-feb-25" />
      <Redirect from="community-call-feb-11-11-et" to="/programs/events/community-call-feb-11-11-et" />
      <Redirect from="working-open-workshop-february-2016" to="/programs/events/working-open-workshop-february-2016" />
      <Redirect from="working-open-workshop-mixer-february-4th" to="/programs/events/working-open-workshop-mixer-february-4th" />
      <Redirect from="project-call-jan-28" to="/programs/events/project-call-jan-28" />
      <Redirect from="community-call-jan-14-11-et" to="/programs/events/community-call-jan-14-11-et" />
      <Redirect from="open-science-summit-2015" to="/programs/events/open-science-summit-2015" />
      <Redirect from="toronto-open-science-code-sprint-2015" to="/programs/events/toronto-open-science-code-sprint-2015" />
      <Redirect from="mozfest-2015" to="/programs/events/mozfest-2015" />
      <Redirect from="mozfest-2014" to="/programs/events/mozfest-2014" />
      <Redirect from="global-sprint-2015" to="/programs/events/global-sprint-2015" />
      <Redirect from="global-sprint-2016" to="/programs/events/global-sprint-2016" />

      // Old blog post URL redirects (no finite list of blog slugs, so using a catch-all)
      <Redirect from=":post" to="/blog/:post" />
    </Route>
  </Router>
), document.querySelector(`#app`));
