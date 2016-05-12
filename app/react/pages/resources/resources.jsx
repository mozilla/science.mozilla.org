import React from "react";
import Service from "../../../js/backend.js";
import DataCard from "../../components/data-card/data-card.jsx";

export default React.createClass({
  componentWillMount: function () {
    this.loadResources(1);
  },
  loadResources: function (page) {
    Service.resources
      .get({
        page: page
      })
      .then((resources) => {
        this.setState({
          resources: this.state.resources.concat(resources.results),
          pagesLoaded: page,
          allPagesLoaded: !resources.next
        });

        console.log(this.state.resources);
      })
      .catch((reason) => { console.error(reason); });
  },
  getInitialState: function () {
    return {
      resources: [],
      pagesLoaded: 0,
      allPagesLoaded: false
    };
  },
  onMoreClick: function () {
    this.loadResources(this.state.pagesLoaded + 1);
  },
  render() {
    let resourceCards = [];

    if (this.state.resources.length) {
      resourceCards = this.state.resources.map((resource, index) => {
        return (
          <DataCard key={index} className="col-md-4" showPicture={false} categories={resource.tags}>
            <h4>{resource.name}</h4>
            <p>{resource.description}</p>
          </DataCard>
        );
      });
    }

    return (
      <div id="page-resources">
        <div className="jumbotron text-xs-center jumbotron-fluid m-b-0">
          <h2>Resources</h2>
          <p className="lead m-t-1">Find learning materials and resources to support your open science practice and grow your community, from handbooks to how-to guides. Filter by topic to browse the library.</p>
        </div>

        <div className="container-dynamic">
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
