import React from "react";
import Service from "../../../js/backend.js";
import DataCard from "../../components/data-card/data-card.jsx";

export default class Run extends React.Component {

  state = {
    lessons: [],
    pagesLoaded: 0,
    allPagesLoaded: false
  };

  componentWillMount() {
    this.loadStudyGroups(1);
  }

  loadStudyGroups = (page) => {
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
  }

  onFormSubmit = () => {
    // TODO: Make this not a popup
  }

  onMoreClick = () => {
    this.loadResources(this.state.pagesLoaded + 1);
  }

  render() {

    let studyLessons = [];

    if (this.state.lessons.length) {
      studyLessons = this.state.lessons.map((lesson) => {
        return (
          <DataCard key={lesson.id} className="col-xs-12 col-sm-12 col-lg-6" showPicture={false} categories={lesson.tags.filter((tag)=>{ return tag !== `Study Group`; })}>
              <div className="my-1"><a className="project-name" href={lesson.link} target="_blank">{lesson.name}</a></div>
              <p>{lesson.description}</p>
          </DataCard>
        );
      });
    }

    return (
      <div className="container">
        <div className="row flex-items-lg-center">
          <div className="col-xs-12 col-lg-11">
            <h3 className="mt-3">Study Group Lessons</h3>
            <p>The Study Group lessons are a great place to find existing curriculum in open science, open code, as well as creative approaches to research review and workflows. Lessons are stored in our <a href="https://github.com/mozillascience/studyGroupLessons">lessons bank on github</a>, indexed in <a href="https://mozillascience.github.io/studyGroupHandbook/lessons.html">our handbook</a>, and mirrored on our website. Check out the <a href="https://github.com/mozillascience/studyGroupLessons/issues">issues in the lessons bank</a> for more ideas and versions of the core lessons, and our <a href="https://www.youtube.com/playlist?list=PLyfPqolZyFtyE8zx2Dbm4uqZYQIeL9D9Z">online webcasts for remote events</a>!</p>
            <div className="row">
            {studyLessons}
            </div>
            <div className="text-xs-center">
              <button hidden={this.state.allPagesLoaded} className="btn btn-outline-info mb-3" onClick={this.onMoreClick}>See More</button>
          </div>
          </div>
        </div>
      </div>
    );
  }
}
