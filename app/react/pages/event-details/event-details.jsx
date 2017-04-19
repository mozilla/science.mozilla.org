
import React from "react";
import Service from "../../../js/backend.js";
import Humanize from "../../../js/humanize-dates.js";
import Moment from "moment-timezone";
import TabSwitcher from "../../components/tab-switcher/tab-switcher.jsx";
import AboutEvent from "./about-event.jsx";
import ProjectList from "../../components/project-list/project-list.jsx";
import {Link} from "react-router";

export default class Event extends React.Component {

  constructor(props) {
    super(props);

    this.state = {
      eventDetails: {},
      timeZone: ``
    };
  }

  componentWillMount = () => {
    this.getEventDetails();
  }

  componentDidMount = () => {
    this.setState({timeZone: Moment.tz.guess()});
  }

  getEventDetails = () => {
    Service.event
      .get(this.props.params.id, {format:`json`, expand: `users,projects`})
      .then((data) => { this.setState({eventDetails: data}); })
      .catch((reason) => { console.error(reason); });
  }

  render() {

    var event = this.state.eventDetails;

    return (
      <div id="event-details" className="container-dynamic">
        <div className="container pt-1"><Link to={'programs/events'}> &lt; back to Our Events</Link></div>
        <div className="row flex-items-md-center">
          <div className="jumbotron text-xs-center mb-0 col-xs-12 col-md-10 pb-1">
            <h2 className="col-xs-12">{event.name}</h2>
            <div className="event-details">
              <span className="event-location">{event.location}</span>
              <span className="event-time">{Humanize.calculateTime(event.starts_at, event.ends_at, this.state.timeZone)}</span>
            </div>
            <p class="mt-1">{event.short_description}</p>
          </div>
          <div className="col-xs-12">
            <TabSwitcher baseURL={`/programs/events/${this.props.params.id}/`} initialTab={this.props.params.tab} className="inline">
              <div slug="about" iconDefault="/assets/img/icon-tab-overview-blue.svg" name="About" className="container"><AboutEvent event={event} /></div>
              <div slug="schedule" iconDefault="/assets/img/icon-tab-schedule-blue.svg" name="Schedule" hidden={!event.schedule}><div className="container" dangerouslySetInnerHTML={{__html:event.schedule}}/></div>
              <div slug="projects" iconDefault="/assets/img/icon-tab-projects-blue.svg" name="Projects" hidden={!event.projects || !event.projects.length}><ProjectList projects={event.projects}/></div>
            </TabSwitcher>
          </div>
        </div>
      </div>
    );
  }
}
