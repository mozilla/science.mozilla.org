import React from "react";

export default React.createClass({
  propTypes: {
    user: React.PropTypes.object.isRequired,
    size: React.PropTypes.number
  },
  getDefaultProps() {
    return {
      size: 40
    };
  },
  render() {
    return <img className="github-avatar" srcSet={`${this.props.user.image_url}&s=${this.props.size}, ${this.props.user.image_url}&s=${this.props.size*2} 2x`} width={this.props.size} height={this.props.size} alt="Contributor avatar" />;
  }
});
