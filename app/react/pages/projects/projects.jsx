import React from "react";

import ThreeUp from "../../components/three-up/three-up.jsx";
import ProjectList from "../../components/project-list/project-list.jsx";
import AdaptiveFilter from "../../components/adaptive-filter/adaptive-filter.jsx";

import DebounceInput from 'react-debounce-input';
import { Link } from 'react-router';
import Service from "../../../js/backend.js";

export default class Projects extends React.Component {

  state = {
    filterText: ``,
    sortBy: `date_created`,
    category: ``,
    categories: [],
    projects: [],
    allPagesLoaded: false,
    pagesLoaded: 0,
    // empty is true if the returned project list is empty
    empty: false
  };

  handleSearchInput = (event) => {
    this.setState({
      filterText: event.target.value
    }, () => { this.getProjectList(1); });
  }

  handleCategoryInput = (event) => {
    this.setState({
      category: event.target.value
    }, () => { this.getProjectList(1); });
  }

  onSortChange = (choice) => {
    this.setState({
      sortBy: choice
    }, () => { this.getProjectList(1); });
  }

  getProjectList = (page) => {
    Service.projects
      .get({
        format: `json`,
        search: this.state.filterText,
        sort: this.state.sortBy,
        categories: encodeURIComponent(this.state.category),
        expand: `leads`,
        page: page
      })
      .then((data) => {
        // Only want to concat if not fetching the first page, because changing the filter/search resets result set
        this.setState({
          empty: page === 1 && data.results.length === 0,
          projects: page === 1 ? data.results : this.state.projects.concat(data.results),
          pagesLoaded: page,
          allPagesLoaded: !data.next
        });
      })
      .catch((reason) => { console.error(reason); });
  }

  componentWillMount() {
    this.getProjectList(1);
    this.getCategories();
  }

  getCategories = () => {
    Service.categories
      .get()
      .then((categories) => {
        // Alphabetize categories
        categories.sort((a, b) => {
          return a.name > b.name ? 1 : -1;
        });

        this.setState({categories});
      })
      .catch((reason) => { console.error(reason); });
  }

  onMoreClick = () => {
    this.getProjectList(this.state.pagesLoaded + 1);
  }

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
        <div className="jumbotron text-xs-center jumbotron-fluid mb-0">
          <div className="container-dynamic py-2">
            <div className="row flex-items-xs-center">
              <h2 className="col-xs-12">Projects</h2>
              <p className="lead mt-1 col-xs-12 col-md-10 col-lg-8">A curated collection of open source, web-based tools to help you do better science.<br/>Have a project you want to add? Bring it to our <Link to="programs/events/global-sprint-2016">Global Sprint</Link>, <a href="https://mozillafestival.org" target="_blank">Mozfest</a>, or <Link to="/programs/events/working-open-workshop-february-2016">Working Open Workshop</Link>.</p>
            </div>
          </div>
        </div>
        <div className="threeUp-wrapper">
          <div className="container-dynamic pt-3">
            <ThreeUp
              item1={{ title: `What is open source?`, text: `Open source describes software that can be used, modified, distributed, and is collaborative in nature. The extent of its "openness" is determined by the license attached to the software.`, icon: `/assets/img/icon-opensource.svg` }}
              item2={{ title: `How to get started`, text: `Most open source projects have a README file that provides an overview of how to get set up, and many also have a CONTRIBUTING file that details how to get started as a contributor.`, icon: `/assets/img/icon-start.svg` }}
              item3={{ title: `How it helps science`, text: `Too often today, scientific research happens in closed environments. Findings and papers are sealed-up, isolated from other researchers and the public. Open practices help science achieve its full potential.`, icon: `/assets/img/icon-help.svg` }}>
            </ThreeUp>
          </div>
        </div>
        <div className="container-dynamic contribute">
          <div className="row">
            <div className="col-xs-12 text-xs-center mt-3">
              <h2 className="mt-1 mb-0">Contribute to a Project</h2>
            </div>
          </div>
          <div className="row flex-items-xs-center my-1">
            <div className="col-xs-12 col-sm-6 col-md-4 mb-1">
              <DebounceInput debounceTimeout={400} type="search" ref="projectFilter" onChange={this.handleSearchInput} className="form-control" placeholder="search"/>
            </div>
            <div className="col-xs-12 col-sm-6 col-md-4 mb-1">
              <select name="topic" id="topic" ref="categorySelect" onChange={this.handleCategoryInput} className="c-select form-control wide">
                <option value="">All Topics</option>
                {this.state.categories.map(category => {
                  return <option key={category.id} value={category.name}>{category.name}</option>;
                })}
              </select>
            </div>
            <div className="col-xs-12 mb-1">
              <AdaptiveFilter options={sortOptions} initialChoice={this.state.sortBy} onChange={this.onSortChange}></AdaptiveFilter>
            </div>
          </div>
          <ProjectList projects={this.state.projects}/>
          <div className="lead text-xs-center mb-2">
            {this.state.empty && <p>Sorry, no search results were found. Please try a broader search term</p>}
            <button hidden={this.state.allPagesLoaded} className="btn btn-outline-info mb-3" onClick={this.onMoreClick}>See More</button>
          </div>
        </div>
      </div>
    );
  }
}
