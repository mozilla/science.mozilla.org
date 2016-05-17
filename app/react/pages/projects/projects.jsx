import React from "react";

import ThreeUp from "../../components/three-up/three-up.jsx";
import ProjectList from "../../components/project-list/project-list.jsx";
import RadioFilter from "../../components/radio-filter/radio-filter.jsx";

import { Debounce } from 'react-throttle';
import Service from "../../../js/backend.js";

export default React.createClass({
  getInitialState(){
    return {
      filterText: ``,
      sortBy: `date_created`,
      category: ``,
      categories: [],
      projects: []
    };
  },
  handleFilterInput(){
    this.setState({
      filterText: this.refs.projectFilter.value,
      category: this.refs.categorySelect.value
    }, this.getProjectList);
  },
  onSortChange(choice) {
    this.setState({
      sortBy: choice
    }, this.getProjectList);
  },
  getProjectList() {
    Service.projects
      .get({
        format: `json`,
        search: this.state.filterText,
        sort: this.state.sortBy,
        categories: this.state.category,
        expand: `leads`
      })
      .then((data) => { this.setState({projects: data.results}); })
      .catch((reason) => { console.error(reason); });
  },
  componentWillMount() {
    this.getProjectList();
    this.getCategories();
  },
  getCategories() {
    Service.categories
      .get()
      .then((categories) => { this.setState({categories}); })
      .catch((reason) => { console.error(reason); });
  },
  render() {

    var sortOptions = [
      {
        value: `featured`,
        label: `Featured Projects`
      },
      {
        value: `date_updated`,
        label: `Recently Updated`
      },
      {
        value: `date_created`,
        label: `Recently Added`
      },
      {
        value: `active`,
        label: `Most Active`
      },
      {
        value: `contributors`,
        label: `Most Contributors`
      }
    ];

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
              <Debounce time="400" handler="onChange">
                <input type="search" ref="projectFilter" onChange={this.handleFilterInput} className="form-control" placeholder="search"/>
              </Debounce>
            </div>
            <div className="col-xs-12 col-sm-6 col-md-4 col-md-push-2">
              <select name="topic" id="topic" ref="categorySelect" onChange={this.handleFilterInput} className="c-select wide">
                <option value="">All Topics</option>
                {this.state.categories.map(category => {
                  return <option key={category.id} value={category.name}>{category.name}</option>;
                })}
              </select>
            </div>
            <RadioFilter options={sortOptions} initialChoice={this.state.sortBy} onChange={this.onSortChange}></RadioFilter>
          </div>
          <div className="row">
          </div>
          <ProjectList projects={this.state.projects}/>
        </div>
      </div>
    );
  }
});
