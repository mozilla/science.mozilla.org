import React from "react";
import EventList from "../components/event-list/event-list.jsx";
import Service from "../../js/backend.js";
import { RadioFilter } from "mofo-ui";

export default React.createClass({
  componentWillMount() {
    this.getEvents(`future`, 1);
    this.getEvents(`past`, 1);
  },
  onSortChange(choice) {
    this.setState({
      category: choice
    }, () => { this.getEvents(`past`, 1, choice); });
  },
  getEvents(tense, page, cat = `all`) {
    Service.events
      .get({
        filter: tense,
        category: cat,
        format: `json`,
        sort: tense === `future` ? `starts_at` : `-starts_at`,
        page
      })
      .then((data) => {
        this.setState(prevState => {
          return {
            [tense]:{
              events: page === 1 ? data.results : prevState[tense].events.concat(data.results) ,
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
      },
      category: `all`
    };
  },
  render() {

    var sortOptions = [
      {
        value: `all`,
        label: `All Past Events`
      },
      {
        value: `Project Call`,
        label: `Project Call`
      },
      {
        value: `Study Group Call`,
        label: `Study Group Call`
      },
      {
        value: `Community Call`,
        label: `Community Call`
      },
      {
        value: `Workshop`,
        label: `Workshop`
      },
      {
        value: `Sprint`,
        label: `Sprint`
      },
      {
        value: `MozFest`,
        label: `MozFest`
      },
      {
        value: `Conference`,
        label: `Conference`
      },
      {
        value: `Meetup`,
        label: `Meetup`
      },
      {
        value: `Convening`,
        label: `Convening`
      }
    ];

    return (
      <div id="events">
        <div className="jumbotron container text-xs-center mb-0 pb-1">
          <h2>Our Events</h2>
          <p className="lead mt-1">We offer a series of global and local sprints that facilitate in-person collaboration, and remote contribution to open source projects. We also host regular Community Calls and Project Calls that highlight what the Mozilla Science Lab community is up to.</p>
        </div>
        <div className="container-dynamic">
          <EventList events={this.state.future.events} />
          <div className="text-xs-center">
            <button hidden={this.state.future.allEventsLoaded} className="btn btn-outline-info mb-3" onClick={()=>{ this.getEvents(`future`, this.state.future.pageLoaded + 1); }}>See More</button>
          </div>
        </div>
        <div className="jumbotron container text-xs-center mb-0 pb-1">
          <h2>Archive of Past Events</h2>
          <RadioFilter options={sortOptions} initialChoice={this.state.category} onChange={this.onSortChange}></RadioFilter>
        </div>
        <div className="container-dynamic">
          <EventList cardClass="col-sm-6 col-md-4 archive" pictures={false} events={this.state.past.events} />
          <div className="text-xs-center">
            <button hidden={this.state.past.allEventsLoaded} className="btn btn-outline-info mb-3" onClick={()=>{ this.getEvents(`past`, this.state.past.pageLoaded + 1, this.state.category); }}>See More</button>
          </div>
        </div>
      </div>
    );
  }
});
