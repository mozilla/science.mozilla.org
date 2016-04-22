
import React from "react";

import projects from "../../../../api-fixtures/projects.json";

import ThreeUp from "../../components/three-up/three-up.jsx";
import ProjectCard from "../../components/project-card/project-card.jsx";

export default React.createClass({
  render() {
    return (
      <div id="page-projects">
        <div className="jumbotron text-xs-center jumbotron-fluid m-b-0">
          <h2>Projects</h2>
          <p className="lead m-t-1">A curated collection of open source, web-based tools to help you do better science.</p>
          <p>Have a project you want to add?Bring it to our <a href="#">Global Sprint</a>, <a href="#">Mozfest</a>, or <a href="#">Working Open Workshop</a>.</p>
        </div>
        <div className="threeUp-wrapper">
          <div className="container-dynamic p-t-3">
            <ThreeUp
              item1={{ title: `What is open source?`, text: `Open source describes software that can be used modified and distributed. The extent of its "openness" is determined by the license attached to the software, but in general, open source projects are collaborative in nature, with many people contributing to the source code.`, icon: `/assets/img/icon-opensource.svg` }}
              item2={{ title: `How to get started`, text: `Most open source projects have a README file that provides an overview of how to get set up, and many also have a CONTRIBUTING file that details how to get started as a contributor.`, icon: `/assets/img/icon-start.svg` }}
              item3={{ title: `How it helps science`, text: `Too often today, scientific research happens in closed environments. Findings and papers are sealed-up, isolated from other researchers and the public. Open practices help science achieve its full potential.`, icon: `/assets/img/icon-help.svg` }}>
            </ThreeUp>
          </div>
        </div>
        <div className="container-dynamic contribute">
          <div className="row">
            <div className="col-xs-12 text-xs-center m-t-3">
              <h2 className="m-t-1 m-b-0">Contribute to a Project</h2>
            </div>
          </div>
          <div className="row m-y-1">
            <div className="col-xs-12 col-sm-6 col-md-4 col-md-push-2">
              <input type="search" className="form-control" placeholder="search"/>
            </div>
            <div className="col-xs-12 col-sm-6 col-md-4 col-md-push-2">
              <select name="topic" id="topic" className="form-control">
                <option value="all">All Topics</option>
                <option value="more">Specific Topic</option>
              </select>
            </div>
            <div className="project-sort-radio m-y-1">
              <label className="radio-inline">
                <input type="radio" name="contributeSort" id="filter-radio-featured" value="featured" /><span>Featured Projects</span>
              </label>
              <label className="radio-inline">
                  <input type="radio" name="contributeSort" id="filter-radio-updated" value="updated" /><span>Recently Updated</span>
              </label>
              <label className="radio-inline">
                <input type="radio" name="contributeSort" id="filter-radio-added" value="added" /><span>Recently Added</span>
              </label>
              <label className="radio-inline">
                <input type="radio" name="contributeSort" id="filter-radio-active" value="active" /><span>Most Active</span>
              </label>
              <label className="radio-inline">
                <input type="radio" name="contributeSort" id="filter-radio-contributors" value="contributors" /><span>Most Contributors</span>
              </label>
            </div>
          </div>
          <div className="row">
          <ProjectCard project={projects[0]} className="col-xs-12 col-sm-6" isFeatured={true} />
          <ProjectCard project={projects[1]} className="col-xs-12 col-sm-6" isFeatured={true} />
          {projects.map((project) => {
            return <ProjectCard key={project.id} className="col-md-4 col-xs-12" isFeatured={false} project={project}/>;
          })}
          </div>
        </div>
      </div>
    );
  }
});
