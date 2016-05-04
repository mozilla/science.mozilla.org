import React from "react";

export default React.createClass({
  propTypes: {
    event: React.PropTypes.object.isRequired
  },
  render() {
    var event = this.props.event;

    return (
      <div className="row">
        <img className="col-xs-12 col-md-10 col-md-push-1" src={event.image_url}/>
        <div className="col-xs-12 m-t-2">
          {event.github_contributors? event.github_contributors.map(contributor => {
            return <GithubAvatar key={contributor.username} user={contributor} />;
          }): null }
        </div>
        <div className="col-xs-12 col-md-10 col-md-push-1">
          <div className="event-description" dangerouslySetInnerHTML={{__html: event.description}}></div>
          {event.additional_notes ?
            <div className="p-t-1 p-b-3">
              <a href={event.additional_notes} className="btn visit-repo">Etherpad Link</a>
            </div>
          : null }
        </div>
      </div>
    );
  }
});
