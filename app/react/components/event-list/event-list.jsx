import React from "react";
import DataCard from "../../components/data-card/data-card.jsx";


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
  render() {
    return(
      <div className="row">
        {this.props.events.map((event) => {
          return (
            <DataCard key={event.id} className={`${this.props.cardClass} event-card`} showPicture={this.props.pictures} picture={event.image_url} categories={[event.starts_at]}>
              <div className="event-card-data">
                <h3 className="event-title">{event.name}</h3>
                <div className="event-details">
                  <span className="event-location">{event.location}</span>
                  <span className="event-time">Apr 14, 12-1pm ET</span>
                </div>
                <p>{event.description}</p>
                <a href="#" className="btn event-btn m-t-1">Call Details</a>
              </div>
            </DataCard>
          );
        })}
      </div>
    );
  }
});
