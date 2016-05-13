import React from "react";
import Service from "../../../js/backend.js";
import DataCard from "../../components/data-card/data-card.jsx";

export default React.createClass({
  componentWillMount() {
    this.loadStudyGroups(1);
  },
  loadStudyGroups: function(page) {
    Service.resources
      .get({format: `json`, tags: `Study Group`, page})
      .then((data) => {
        this.setState({
          lessons:data.results,
          pagesLoaded: page,
          allPagesLoaded: !data.next
        });
      })
      .catch((reason) => { console.error(reason); });
  },
  getInitialState() {
    return {
      lessons: [],
      pagesLoaded: 0,
      allPagesLoaded: false
    };
  },
  onFormSubmit() {
    // TODO: Make this not a popup
  },
  onMoreClick: function () {
    this.loadResources(this.state.pagesLoaded + 1);
  },
  render() {
    let studyLessons = [];

    if (this.state.lessons.length) {
      studyLessons = this.state.lessons.map((lesson) => {
        return (
          <DataCard key={lesson.id} className="col-xs-12 col-sm-6 col-lg-4" showPicture={false} categories={lesson.tags.filter((tag)=>{ return tag !== `Study Group`; })}>
              <div className="m-y-1"><a className="project-name" href="#">{lesson.name}</a></div>
              <p>{lesson.description}</p>
          </DataCard>
        );
      });
    }

    return (
      <div className="container">
        <div className="row">
          <div className="col-xs-12 col-lg-10 col-lg-push-1">
            <h3>Start a Group</h3>
            <form
              className="row"
              action="https://docs.google.com/a/mozillafoundation.org/forms/d/159lhGW4hquReK7mloScofQYIu5rKon_1mKdIGEqSgK4/formResponse"
              method="POST"
              target="_blank"
              onSubmit={this.onFormSubmit}
            >
              <p className="col-xs-12">Starting a Study Group is easy, and helps you engage with your local peers while connecting with the global Mozilla community. We have a <a href="https://mozillascience.github.io/studyGroupHandbook/">two-part gitbook</a> designed to lead you through the logistics of <a href="https://mozillascience.github.io/studyGroupHandbook/setting-up.html">setting up a study group</a> and the ongoing maintenance of <a href="https://mozillascience.github.io/studyGroupHandbook/running.html">running a study group</a>, complete with <a href="https://mozillascience.github.io/studyGroupHandbook/lessons.html">ideas for lessons</a> and event formats. We’ll walk you through modifying and launching your website, developing lessons, posting events, creating communication channels for your group, and connecting with the #mozstudy community on Twitter/ over email.</p>
              <div className="col-xs-12 col-sm-6 col-md-5 m-t-1">
                <input
                  className="form-control"
                  type="email"
                  required
                  name="entry.2074052885"
                  id="entry_2074052885"
                  placeholder="your email"
                />
              </div>
              <div className="col-xs-12 col-sm-6 col-md-4 col-lg-5 m-t-1">
                <input
                  className="form-control"
                  name="entry.1150935299"
                  id="entry_1150935299"
                  type="text"
                  placeholder="your location"
                />
              </div>
              <div className="col-xs-12 col-sm-6 col-sm-push-3 col-md-3 col-lg-2 col-md-push-0 m-t-1">
                <input className="btn wide" type="submit" value="Submit"/>
              </div>
            </form>
            <h3>Study Group Lessons</h3>
            <p>The Study Group Lessons are a great place to find existing curriculum in open science, open code, as well as creative approaches to research review and workflows. Lessons are stored in our <a href="https://github.com/mozillascience/studyGroupLessons">Lessons bank on github</a>, indexed in <a href="https://mozillascience.github.io/studyGroupHandbook/lessons.html">our handbook</a>, and mirrored on our website. Check out the <a href="https://github.com/mozillascience/studyGroupLessons/issues">issues in the Lessons bank</a> for more ideas and versions of the core lessons, and our <a href="https://www.youtube.com/playlist?list=PLyfPqolZyFtyE8zx2Dbm4uqZYQIeL9D9Z">online webcasts for remote events</a>!</p>
            <div className="row">
            {studyLessons}
            </div>
            <div className="text-xs-center">
              <button hidden={this.state.allPagesLoaded} className="btn m-b-3" onClick={this.onMoreClick}>See More</button>
          </div>
          </div>
        </div>
      </div>
    );
  }
});
