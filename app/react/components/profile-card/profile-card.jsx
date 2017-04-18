import React from 'react';

export default class ProfileCard extends React.Component {

  render() {

    return (
      <div className="profile-card row flex-items-xs-center" id={this.props.name.replace(/\W/g, `-`)}>
        <div className="col-xs-6 col-xs-push-3 col-sm-3 col-sm-push-0 col-xl-2">
          <div className="text-xs-center">
            <img className="profile-card--image circle" src={this.props.image}/>
          </div>
        </div>
        <div className="col-sm-9 col-xl-8">
          <h3 className="mb-0 profile-card--name">{this.props.name}</h3>
          <p className="profile-card--title">{this.props.title}</p>
          <p className="mb-1 profile-card--links">{this.props.links.map((link)=>{ return <span className="profile-card--link">{link}</span>; })}</p>
          <p>{this.props.children}</p>
        </div>
      </div>
    );
  }
}

ProfileCard.propTypes = {
  name: React.PropTypes.string.isRequired,
  title: React.PropTypes.string,
  links: React.PropTypes.array,
  image: React.PropTypes.string
};

ProfileCard.defaultProps = {
  name: ``,
  title: ``,
  image: `/assets/img/placeholder.jpg`,
  links: []
};
