import React from 'react';

var profileCard = React.createClass({
  propTypes: {
    name: React.PropTypes.string.isRequired,
    title: React.PropTypes.string,
    links: React.PropTypes.object,
    headshot: React.PropTypes.string
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
      <div className="row m-y-3" id={this.props.name.replace(/\W/g, `-`)}>
        <div className="col-sm-3 center-vertical">
          <img className="circle" src={this.props.image}/>
        </div>
        <div className="col-sm-9">
          <h2 className="m-b-0 profile-card--name">{this.props.name}</h2>
          <p className="profile-card--title">{this.props.title}</p>
          <p className="m-b-1 profile-card--links">{this.props.links.map((link)=>{ return <span className="profile-card--link">{link}</span>; })}</p>
          <p>{this.props.children}</p>
        </div>
      </div>
    );
  }
});

export default profileCard;
