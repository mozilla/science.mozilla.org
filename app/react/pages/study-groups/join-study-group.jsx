import React from "react";
import Service from "../../../js/backend.js";
import { Collapse, Panel } from "mofo-ui";

export default React.createClass({
  propTypes:{
    switchTabs: React.PropTypes.func.isRequired
  },
  componentWillMount() {
    Service.studyGroups
      .get()
      .then((data) => { this.organizeGroups(data); })
      .catch((reason) => { console.error(reason); });
  },
  getInitialState() {
    return {
      regions: {}
    };
  },
  organizeGroups(groups) {
    let regions = {};

    groups.forEach(group => {
      if(!regions[group.region]){
        regions[group.region] = [];
      }
      regions[group.region].push(group);
    });
    this.setState({regions});
  },
  renderRegions() {
    let regionNames = Object.keys(this.state.regions);

    return (
      <Collapse accordion={true}>
        {regionNames.map((region, index) =>{
          return this.renderGroups(region, index);
        })}
      </Collapse>
    );
  },
  switchToRunTab() {
    this.props.switchTabs(1);
  },
  renderGroups(region, index){
    return (
      <Panel key={index} header={region}>
        {this.state.regions[region].map(studyGroup =>{
          return <div key={studyGroup.id}><a href={studyGroup.link}>{studyGroup.name}, {studyGroup.location}</a></div>;
        })}
     </Panel>
    );
  },
  render() {
    let middle = Math.floor(Object.keys(this.state.regions).length/2);

    return (
      <div className="container">
        <div className="row flex-items-lg-center">
          <div className="col-xs-12 col-lg-10">
            <h3>What is a Study Group?</h3>
            <p className="mb-3">A Study Group is a community of peers committed to learning and teaching each other. They’re fun, informal meetups allowing participants to share skills, experiences, and ideas around open science, open source, code, and community in research. The goal of the Mozilla Study Group Project is to support this kind of peer-to-peer study by providing a simple set of tools, template lesson plans, and access to an international community of like-minded researchers and avid learners in code.</p>
            <h3>Find a Study Group</h3>
            <div className="text-xs-center my-3">
              <iframe width="100%" height="480" frameborder="0" src="https://auremoser.carto.com/builder/95be417c-ac31-11e6-b906-0ef7f98ade21/embed" allowfullscreen webkitallowfullscreen mozallowfullscreen oallowfullscreen msallowfullscreen></iframe>
            </div>

            <style>/* This is a filthy hack for use with columns later on.*/ /*{`.rc-collapse-item:nth-of-type(${middle}){break-after: column; border-bottom-width: 1px}`}*/</style>
            {this.renderRegions()}
            <div className="start-a-group my-3">Don't see one near you? <a href="#" onClick={this.switchToRunTab}>Start a study group</a></div>
          </div>
        </div>
      </div>
    );
  }
});
