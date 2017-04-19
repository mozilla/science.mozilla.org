import React from "react";

export default class AboutEvent extends React.Component {

  constructor(props) {
    super(props);
  }

  render() {

    var event = this.props.event;

    return (
      <div className="row flex-items-sm-center">
        <div className="col-xs-12 col-sm-8 col-lg-6 text-xs-center">
          <img src={event.image_url}/>
        </div>
        <div className="col-xs-12 mt-2">
          {event.github_contributors? event.github_contributors.map(contributor => {
            return <GithubAvatar key={contributor.username} user={contributor} />;
          }): null }
        </div>
        <div className="col-xs-12 col-md-10">
          <div className="event-description" dangerouslySetInnerHTML={{__html: event.description}}></div>
          {event.additional_notes ?
            <div className="pt-1 pb-3">
              <a href={event.additional_notes} target="_blank" className="btn btn-outline-info">Etherpad Link</a>
            </div>
          : null }
        </div>
      </div>
    );
  }
}

AboutEvent.propTypes = {
  event: React.PropTypes.object.isRequired
};
