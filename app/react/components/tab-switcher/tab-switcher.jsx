import React from "react";

// Children nodes and buttons can be hidden if empty based on hidden param passed to them.
// TODO: find a way to allow another tab to be active by default, especially if it's the only tab with content/not hidden

export default React.createClass({
  propTypes: {
    className: React.PropTypes.string,
    children: React.PropTypes.arrayOf(React.PropTypes.shape({
      props: React.PropTypes.shape({
        name: React.PropTypes.string.isRequired,
        iconDefault: React.PropTypes.string.isRequired,
        iconActive: React.PropTypes.string
      }).isRequired
    }))
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
      if(this.props.children[index].props.hidden) { return; }
      return (
        <button
          className={`btn ${index === this.state.activeTab ? `active` : ``}`}
          onClick={this.tabClick.bind(null, index)}
          key={index}
          hidden={this.props.children[index].props.hidden}>
            <img className="icon hidden-sm-up" src={index === this.state.activeTab && element.props.iconActive ? element.props.iconActive : element.props.iconDefault}/>
            <span className="hidden-xs-down">{element.props.name}</span>
        </button>
      );
    });

    // Remove undefined values from buttons
    buttons = buttons.filter(Boolean);

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
        <div className="tabs" hidden={buttons.length < 2}>{buttons}</div>
        <div className="panels">{panels}</div>
      </div>
    );
  }
});
