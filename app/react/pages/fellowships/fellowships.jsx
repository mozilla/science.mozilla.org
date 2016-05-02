import React from "react";
import TabSwitcher from "../../components/tab-switcher/tab-switcher.jsx";

export default React.createClass({
  getInitialState(){
    return {
    };
  },
  render() {
    return (
      <div id="page-fellowships">
        <div className="jumbotron text-xs-center jumbotron-fluid m-b-0">
          <h2>Fellowships</h2>
          <p className="lead m-t-1">Are you a champion of open science and open data? Mozilla is seeking researchers eager to advance openness in science and data within their institutions.</p>
          <a className="btn btn-white">Apply Now</a>
        </div>

        <TabSwitcher className="pull-up">
          <div name="Overview">About content.</div>
          <div name="Financial Terms">Schedule content.</div>
          <div name="FAQ">Projects content.</div>
          <div name="Fellows">Projects content.</div>
        </TabSwitcher>

      </div>
    );
  }
});
