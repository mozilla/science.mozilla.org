import React from "react";

export default React.createClass({
  render: function () {
    let hamburger = (
      <svg className="hamburger" height="40" version="1.1" width="40" xmlns="http://www.w3.org/2000/svg" viewBox="-8 -10 40 30" x="0px" y="0px">
        <g>
          <rect width="26" height="2"/>
          <rect y="8" width="26" height="2"/>
          <rect y="16" width="26" height="2"/>
        </g>
      </svg>);
    let closeX = (
      <svg version="1.1" xmlns="http://www.w3.org/2000/svg" x="0px" y="0px"
        viewBox="-13 -10 40 30" width="40" height="40">
        <g>
          <rect x="7.6" y="-2.6" transform="matrix(0.7071 -0.7071 0.7071 0.7071 -3.565 8.6066)" width="2" height="22.3"/>
          <rect x="-2.6" y="7.6" transform="matrix(0.7071 -0.7071 0.7071 0.7071 -3.565 8.6066)" width="22.3" height="2"/>
        </g>
      </svg>
    );

    return (
      <button {...this.props}>
        {this.props.isOpen ? closeX : hamburger }
      </button>
    );
  }
});
