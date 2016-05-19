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
        this.setState(prevState => {
          return {
            [tense]:{
              events: prevState[tense].events.concat(data.results),
              allEventsLoaded : !data.next,
              pageLoaded: page
            }
          };
        });
      })
      .catch((reason) => { console.error(reason); });
  },
  getInitialState() {
    return {
      past:{
        events: [],
        allEventsLoaded: false,
        pageLoaded: 0
      },
      future:{
        events: [],
        allEventsLoaded: false,
        pageLoaded: 0
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
          <EventList events={this.state.future.events} />
          <div className="text-xs-center">
            <button hidden={this.state.future.allEventsLoaded} className="btn m-b-3" onClick={()=>{ this.getEvents(`future`, this.state.future.pageLoaded + 1); }}>See More</button>
          </div>
        </div>
        <div className="jumbotron container text-xs-center m-b-0 p-b-1">
          <h2>Archive of Past Events</h2>
        </div>
        <div className="container-dynamic">
          <EventList cardClass="col-sm-6 col-md-4 archive" pictures={false} events={this.state.past.events} />
          <div className="text-xs-center">
            <button hidden={this.state.past.allEventsLoaded} className="btn m-b-3" onClick={()=>{ this.getEvents(`past`, this.state.past.pageLoaded + 1); }}>See More</button>
          </div>
        </div>
      </div>
    );
  }
});
