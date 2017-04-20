import React from "react";
import Service from "../../../js/backend.js";
import DataCard from "../../components/data-card/data-card.jsx";
import { RadioFilter } from "mofo-ui";

export default class Resources extends React.Component {

  constructor(props) {
    super(props);

    this.state = {
      resources: [],
      pagesLoaded: 0,
      activeFilter: undefined,
      allPagesLoaded: false
    };
  }

  componentWillMount = () => {
    this.loadResources(1);
  }

  loadResources = (page) => {
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
  }

  onFilterChange = (choice) => {
    this.setState({
      activeFilter: choice,
      pagesLoaded: 0,
      resources: []
    }, () => {
      this.loadResources(1);
    });
  }

  onMoreClick = () => {
    this.loadResources(this.state.pagesLoaded + 1);
  }

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
            <h4 className="project-name my-1">
              <a target="_blank" href={resource.link}>{resource.name}</a>
            </h4>
            <p>{resource.description}</p>
          </DataCard>
        );
      });
    }

    return (
      <div id="page-resources">
        <div className="jumbotron text-xs-center jumbotron-fluid mb-3">
          <div className="container-dynamic py-2">
            <div className="row flex-items-xs-center">
              <h2 className="col-xs-12">Resources</h2>
              <p className="lead mt-1 col-xs-12 col-md-10 col-lg-8">Find learning materials and resources to support your open science practice and grow your community, from handbooks to how-to guides. Filter by topic to browse the library.</p>
            </div>
          </div>
        </div>

        <div className="container-dynamic">
          <div className="row mb-2">
            <RadioFilter options={radioOptions} onChange={this.onFilterChange}></RadioFilter>
          </div>

          <div className="row">
            {resourceCards}
          </div>
          <div className="text-xs-center">
            <button hidden={this.state.allPagesLoaded} className="btn btn-outline-info mb-3" onClick={this.onMoreClick}>See More</button>
          </div>
        </div>
      </div>
    );
  }
}
