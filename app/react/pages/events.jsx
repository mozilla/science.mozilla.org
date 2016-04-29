import React from "react";
import EventList from "../components/event-list/event-list.jsx";
import Service from "../../js/backend.js";

export default React.createClass({
  componentWillMount() {
    this.getEventList();
  },
  getEventList() {
    Service.events
      .get()
      .then((events) => { this.setState({events}); })
      .catch((reason) => { console.error(reason); });
  },
  getInitialState() {
    return {
      events: []
    };
  },
  render() {
    return (
      <div id="events">
        <div className="jumbotron container text-xs-center m-b-0 p-b-1">
          <h2>Our Events</h2>
          <p className="lead m-t-1">We offer a series of global and local sprints that facilitate in-person collaboration, and remote contribution to open source projects. We also host regular Community Calls and Project Calls that highlight what the Mozilla Science Lab community is up to.</p>
        </div>
        <div className="container-dynamic">
          <EventList events={this.state.events} />
        </div>
        <div className="jumbotron container text-xs-center m-b-0 p-b-1">
          <h2>Archive of Past Events</h2>
        </div>
        <div className="container-dynamic">
          <EventList cardClass="col-sm-6 col-md-4 archive" pictures={false} events={this.state.events} />
        </div>
      </div>
    );
  }
});
