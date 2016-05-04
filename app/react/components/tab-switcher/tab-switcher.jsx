import React from "react";

// Children nodes and buttons can be hidden if empty based on hidden param passed to them.
// TODO: find a way to allow another tab to be active by default, especially if it's the only tab with content/not hidden

export default React.createClass({
  propTypes: {
    className: React.PropTypes.string
  },
  getInitialState() {
    return {
      activeTab: 0
    };
  },
  tabClick: function (index) {
    this.setState({activeTab: index});
  },
  render: function() {
    let buttons = this.props.children.map((element, index) => {
      return (
        <button
          className={`btn ${index === this.state.activeTab ? `active` : ``}`}
          onClick={this.tabClick.bind(null, index)}
          key={index}
          hidden={this.props.children[index].props.hidden}>
            {element.props.name}
        </button>
      );
    });

    let panels = this.props.children.map((element, index) => {
      return (
        <div
          className={`panel ${index === this.state.activeTab ? `active` : ``}`}
          key={index}>
          {element}
        </div>
      );
    });

    return (
      <div className={`tab-switcher${this.props.className ? ` ${this.props.className}` : ``}`}>
        <div className="tabs">{buttons}</div>
        <div className="panels">{panels}</div>
      </div>
    );
  }
});
