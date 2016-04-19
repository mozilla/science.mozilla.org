import React from "react";
import classNames from "classnames";

var itemSchema = {
  text: React.PropTypes.string,
  icon: React.PropTypes.string,
  title: React.PropTypes.string
};

export default React.createClass({
  propTypes: {
    item1: React.PropTypes.shape(itemSchema).isRequired,
    item2: React.PropTypes.shape(itemSchema).isRequired,
    item3: React.PropTypes.shape(itemSchema).isRequired,
    hasCircle: React.PropTypes.bool
  },
  getDefaultProps() {
    return {
      hasCircle: false
    };
  },
  render: function() {
    let iconClass = classNames({
      icon: true,
      circle: this.props.hasCircle
    });

    return (
      <div className="three-up row">
        <div className="col col-md-4">
          <div className={iconClass}>
            <img className="" src={this.props.item1.icon} />
          </div>
          <h6>{this.props.item1.title}</h6>
          <p className="copy">{this.props.item1.text}</p>
        </div>
        <div className="col col-md-4">
          <div className={iconClass}>
            <img src={this.props.item2.icon} />
          </div>
          <h6>{this.props.item2.title}</h6>
          <p className="copy">{this.props.item2.text}</p>
        </div>
        <div className="col col-md-4">
          <div className={iconClass}>
            <img src={this.props.item3.icon} />
          </div>
          <h6>{this.props.item3.title}</h6>
          <p className="copy">{this.props.item3.text}</p>
        </div>
      </div>
    );
  }
});
