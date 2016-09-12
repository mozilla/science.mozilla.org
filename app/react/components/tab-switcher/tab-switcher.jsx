import React from "react";
import { Link } from "react-router";

// Children nodes and buttons can be hidden if empty based on hidden param passed to them.
// TODO: find a way to allow another tab to be active by default, especially if it's the only tab with content/not hidden

export default React.createClass({
  propTypes: {
    baseURL: React.PropTypes.string.isRequired,
    className: React.PropTypes.string,
    children: React.PropTypes.arrayOf(React.PropTypes.shape({
      props: React.PropTypes.shape({
        name: React.PropTypes.string.isRequired,
        slug: React.PropTypes.string.isRequired,
        iconDefault: React.PropTypes.string.isRequired,
        iconActive: React.PropTypes.string
      }).isRequired
    }))
  },
  getSlugIndex(slug) {
    let slugIndex = 0; // Default to first tab

    for (let i = 0; i < this.props.children.length; i++) {
      if (this.props.children[i].props.slug === slug) {
        slugIndex = i;
        break;
      }
    }

    return slugIndex;
  },
  getInitialState() {
    return {
      activeTab: this.getSlugIndex(this.props.initialTab)
    };
  },
  tabClick: function (index) {
    this.setState({activeTab: index});
  },
  render: function() {
    let buttons = this.props.children.map((element, index) => {
      if(this.props.children[index].props.hidden) { return; }
      return (
        <Link
          to={`${this.props.baseURL}${this.props.children[index].props.slug}`}
          className={`btn ${index === this.state.activeTab ? `active` : ``}`}
          onClick={this.tabClick.bind(null, index)}
          key={index}
          hidden={this.props.children[index].props.hidden}>
            <img className="icon hidden-sm-up" src={index === this.state.activeTab && element.props.iconActive ? element.props.iconActive : element.props.iconDefault}/>
            <span className="hidden-xs-down">{element.props.name}</span>
        </Link>
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
