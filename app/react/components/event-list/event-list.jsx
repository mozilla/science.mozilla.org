import React from "react";
import DataCard from "../../components/data-card/data-card.jsx";
import Moment from "moment-timezone";
import {Link} from "react-router";

export default React.createClass({
  timeZone: ``,
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
  componentDidMount() {
    this.timeZone = Moment.tz.guess();
  },
  calculateDate(timeStart, timeEnd) {
    let start = new Moment(timeStart);
    let end = new Moment(timeEnd);

    if (start.isSame(end, `day`)) {
      return start.format(`MMM DD, YYYY`);
    } else if( start.isSame(end, `month`)) {
      return `${start.format(`MMM D`)}-${end.format(`D, YYYY`)}`;
    } else if( start.isSame(end, `year`)) {
      return `${start.format(`MMM D`)}-${end.format(`MMM D, YYYY`)}`;
    } else {
      return `${start.format(`MMM D, YYYY`)}-${end.format(`MMM D, YYYY`)}`;
    }
  },
  calculateTime(timeStart, timeEnd) {
    let start = new Moment(timeStart);
    let end = new Moment(timeEnd);

    if(start.isSame(end, `day`)) {
      if(start.format(`a`) === end.format(`a`)) {
        return this.stripZeroMins(`${start.format(`MMM D, h:mm`)}-${end.tz(this.state.timeZone).format(`h:mma z`)}`);
      } else {
        return this.stripZeroMins(`${start.format(`MMM D, h:mma`)}-${end.tz(this.state.timeZone).format(`h:mma z`)}`);
      }
    } else {
      return this.calculateDate(timeStart, timeEnd);
    }
  },
  stripZeroMins(timeString) {
    return timeString.replace(/:00/g, ``);
  },
  render() {
    return(
      <div className="row">
        {this.props.events.map((event) => {
          return (
            <DataCard key={event.id} className={`${this.props.cardClass} event-card`} showPicture={this.props.pictures} picture={event.image_url} categories={[this.calculateDate(event.starts_at, event.ends_at)]}>
              <div className="event-card-data">
                <h3 className="event-title">{event.name}</h3>
                <div className="event-details">
                  <span className="event-location">{event.location}</span>
                  <span className="event-time"> {this.calculateTime(event.starts_at, event.ends_at)}</span>
                </div>
                <p>{event.description}</p>
                <Link to={`events/${event.id}`} className="btn event-btn m-t-1">Details</Link>
              </div>
            </DataCard>
          );
        })}
      </div>
    );
  }
});
