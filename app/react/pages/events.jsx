import React from "react";
import EventList from "../components/event-list/event-list.jsx";
import Service from "../../js/backend.js";

export default React.createClass({
  componentWillMount() {
    this.getEvents(`future`, 1);
    this.getEvents(`past`, 1);
  },
  getEvents(tense, page) {
    Service.events
      .get({
        filter: tense,
        format: `json`,
        page
      })
      .then((data) => {
        this.setState(state => {
          state.events[tense] = state.events[tense].concat(data.results);
          state.allEventsLoaded[tense] = !data.next;
          state.pageLoaded[tense] = page;
        });
      })
      .catch((reason) => { console.error(reason); });
  },
  getInitialState() {
    return {
      events: {
        past: [],
        future: []
      },
      allEventsLoaded: {
        past: false,
        future: false
      },
      pageLoaded: {
        past: 0,
        future: 0
      }
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
          <EventList events={this.state.events.future} />
          <div className="text-xs-center">
            <button hidden={this.state.allEventsLoaded.future} className="btn m-b-3" onClick={()=>{ this.getEvents(`future`, this.state.pageLoaded.future + 1); }}>See More</button>
          </div>
        </div>
        <div className="jumbotron container text-xs-center m-b-0 p-b-1">
          <h2>Archive of Past Events</h2>
        </div>
        <div className="container-dynamic">
          <EventList cardClass="col-sm-6 col-md-4 archive" pictures={false} events={this.state.events.past} />
          <div className="text-xs-center">
            <button hidden={this.state.allEventsLoaded.past} className="btn m-b-3" onClick={()=>{ this.getEvents(`past`, this.state.pageLoaded.past + 1); }}>See More</button>
          </div>
        </div>
      </div>
    );
  }
});
