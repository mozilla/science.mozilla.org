import React from 'react';

var profileCard = React.createClass({
  propTypes: {
    name: React.PropTypes.string.isRequired,
    title: React.PropTypes.string,
    links: React.PropTypes.array,
    image: React.PropTypes.string
  },
  getDefaultProps() {
    return {
      name: ``,
      title: ``,
      image: `/assets/img/placeholder.jpg`,
      links: []
    };
  },
  render() {
    return (
      <div className="profile-card row" id={this.props.name.replace(/\W/g, `-`)}>
        <div className="col-xs-6 col-xs-push-3 col-sm-3 col-sm-push-0 col-xl-2 col-xl-push-1">
          <div className="text-xs-center">
            <img className="profile-card--image circle" src={this.props.image}/>
          </div>
        </div>
        <div className="col-sm-9 col-xl-8 col-xl-push-1">
          <h3 className="m-b-0 profile-card--name">{this.props.name}</h3>
          <p className="profile-card--title">{this.props.title}</p>
          <p className="m-b-1 profile-card--links">{this.props.links.map((link)=>{ return <span className="profile-card--link">{link}</span>; })}</p>
          <p>{this.props.children}</p>
        </div>
      </div>
    );
  }
});

export default profileCard;
