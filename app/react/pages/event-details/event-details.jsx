
import React from "react";
import Service from "../../../js/backend.js";
import Moment from "moment-timezone";
import TabSwitcher from "../../components/tab-switcher/tab-switcher.jsx";
import AboutEvent from "./about-event.jsx";

export default React.createClass({

  getInitialState() {
    return {
      eventDetails: {},
      timeZone: ``
    };
  },
  componentWillMount() {
    this.getEventDetails();
  },
  componentDidMount() {
    this.setState({timeZone: Moment.tz.guess()});
  },
  getEventDetails() {
    Service.event
      .get(this.props.params.id)
      .then((data) => { this.setState({eventDetails: data}); })
      .catch((reason) => { console.error(reason); });
  },
  render() {
    var event = this.state.eventDetails;

    return (
      <div id="event-details" className="container-dynamic">
        <div className="row">
          <div className="jumbotron text-xs-center m-b-0 col-xs-12 col-md-10 col-md-push-1">
            <h2 className="col-xs-12">{event.name}</h2>
            <div className="event-details">
              <span className="event-location">{event.location}</span>
              <span className="event-time">{Service.event.calculateTime(event.starts_at, event.ends_at, this.state.timeZone)}</span>
            </div>
          </div>
          <div className="col-xs-12">
            <TabSwitcher className="inline">
              <div name="About" className="container"><AboutEvent event={event} /></div>
              <div name="Schedule">Two content.</div>
              <div name="Projects">Three content.</div>
            </TabSwitcher>
          </div>
        </div>
      </div>
    );
  }
});
