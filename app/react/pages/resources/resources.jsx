import React from "react";
import Service from "../../../js/backend.js";
import DataCard from "../../components/data-card/data-card.jsx";
import RadioFilter from "../../components/radio-filter/radio-filter.jsx";

export default React.createClass({
  componentWillMount: function () {
    this.loadResources(1);
  },
  loadResources: function (page) {
    let getConfig = {
      page: page,
      format: `json`
    };

    if (this.state.activeFilter) {
      getConfig.tags = this.state.activeFilter;
    }

    Service.resources
      .get(getConfig)
      .then((resources) => {
        this.setState({
          resources: this.state.resources.concat(resources.results),
          pagesLoaded: page,
          allPagesLoaded: !resources.next
        });
      })
      .catch((reason) => { console.error(reason); });
  },
  onFilterChange: function (choice) {
    this.setState({
      activeFilter: choice,
      pagesLoaded: 0,
      resources: []
    }, () => {
      this.loadResources(1);
    });
  },
  getInitialState: function () {
    return {
      resources: [],
      pagesLoaded: 0,
      activeFilter: undefined,
      allPagesLoaded: false
    };
  },
  onMoreClick: function () {
    this.loadResources(this.state.pagesLoaded + 1);
  },
  render() {
    let radioOptions = [
      {
        value: ``,
        label: `All Resources`
      },
      {
        value: `Collaboration Tools`,
        label: `Collaboration Tools`
      },
      {
        value: `Community Building`,
        label: `Community Building`
      },
      {
        value: `Open Communications`,
        label: `Open Communications`
      },
      {
        value: `Project Planning`,
        label: `Project Planning`
      },
      {
        value: `Coding`,
        label: `Coding`
      },
      {
        value: `Open Data`,
        label: `Open Data`
      }
    ];

    let resourceCards = [];

    if (this.state.resources.length) {
      resourceCards = this.state.resources.map((resource, index) => {
        return (
          <DataCard key={index} className="col-md-4" showPicture={false} categories={resource.tags}>
            <h4 className="project-name m-y-1">
              <a target="_blank" href={resource.link}>{resource.name}</a>
            </h4>
            <p>{resource.description}</p>
          </DataCard>
        );
      });
    }

    return (
      <div id="page-resources">
        <div className="jumbotron text-xs-center jumbotron-fluid m-b-3">
          <h2>Resources</h2>
          <p className="lead m-t-1">Find learning materials and resources to support your open science practice and grow your community, from handbooks to how-to guides. Filter by topic to browse the library.</p>
        </div>

        <div className="container-dynamic">
          <div className="row m-b-2">
            <RadioFilter options={radioOptions} onChange={this.onFilterChange}></RadioFilter>
          </div>

          <div className="row">
            {resourceCards}
          </div>
          <div className="text-xs-center">
            <button hidden={this.state.allPagesLoaded} className="btn m-b-3" onClick={this.onMoreClick}>See More</button>
          </div>
        </div>
      </div>
    );
  }
});
