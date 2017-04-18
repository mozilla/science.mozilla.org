import React from "react";

export default class Icon extends React.Component {

  render() {

    return (
      <div className="icon-container">
        <div className="icon">
          <img className="footer-icon" src={this.props.src}></img>
          <a target={this.props.target} href={this.props.href}>{this.props.children}</a>
        </div>
      </div>
    );
  }
}

Icon.propTypes = {
  children: React.PropTypes.string.isRequired,
  href: React.PropTypes.string.isRequired,
  src: React.PropTypes.string.isRequired,
  target: React.PropTypes.string
};
