import React from "react";
import classNames from "classnames";

export default React.createClass({
  propTypes: {
    isOpen: React.PropTypes.bool.isRequired,
    onClick: React.PropTypes.func
  },
  render: function () {
    let menuIcon = classNames({
      "text-hide": true,
      "menu-button": true,
      closeX: this.props.isOpen,
      hamburger: !this.props.isOpen
    });

    return (
      <button onClick={this.props.onClick} className={menuIcon}>
        Menu
      </button>
    );
  }
});
