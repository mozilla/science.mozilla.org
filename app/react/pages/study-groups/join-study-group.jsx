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
    return (
      <div className="container">
        <div className="row">
          <div className="col-xs-12 col-lg-10 col-lg-push-1">
            <h3>What is a Study Group?</h3>
            <p className="m-b-3">A Study Group is a community of peers committed to learning and teaching each other. They’re fun, informal meetups allowing participants to share skills, experiences, and ideas around open science, open source, code, and community in research. The goal of the Mozilla Study Group Project is to support this kind of peer-to-peer study by providing a simple set of tools, template lesson plans, and access to an international community of like-minded researchers and avid learners in code.</p>
            <h3>Find a Study Group</h3>
            <div className="text-xs-center m-y-3">
              <img src="/assets/img/map.png" srcSet="/assets/img/map.png, /assets/img/map@2x.png 2x" alt="Map of study groups around the world"/>
            </div>
            {this.renderRegions()}
            <div className="start-a-group m-y-2">Don't see one near you? <a href="#" onClick={this.switchToRunTab}>Start a study group</a></div>
          </div>
        </div>
      </div>
    );
  }
});
