import React from "react";
import DataCard from "../../components/data-card/data-card.jsx";
import Moment from "moment-timezone";
import {Link} from "react-router";
import Service from "../../../js/backend.js";

export default React.createClass({
  propTypes: {
    events: React.PropTypes.array,
    pictures: React.PropTypes.bool,
    cardClass: React.PropTypes.string
  },
  getDefaultProps() {
    return {
      events: [],
      pictures: true,
      cardClass: `col-sm-6`
    };
  },
  getInitialState() {
    return {
      timeZone: ``
    };
  },
  componentDidMount() {
    this.setState({ timeZone: Moment.tz.guess() });
  },
  render() {
    return (
      <div className="row">
        {this.props.events.map((event) => {
          return (
            <DataCard key={event.id} className={`${this.props.cardClass} event-card`} showPicture={this.props.pictures} picture={event.image_url} categories={[Service.event.calculateDate(event.starts_at, event.ends_at, this.timeZone)]}>
              <div className="event-card-data">
                <h3 className="event-title"><Link to={`programs/events/${event.id}`}>{event.name}</Link></h3>
                <div className="event-details">
                  <span className="event-location">{event.location}</span>
                  <span className="event-time">{Service.event.calculateTime(event.starts_at, event.ends_at, this.state.timeZone) }</span>
                </div>
                <p>{event.description}</p>
                <Link to={`programs/events/${event.id}`} className="btn event-btn m-t-1">Details</Link>
              </div>
            </DataCard>
          );
        }) }
      </div>
    );
  }
});
