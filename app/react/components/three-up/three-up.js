import React from "react";

var itemSchema = {
  text: React.PropTypes.string,
  icon: React.PropTypes.string
};

export default React.createClass({
  propTypes: {
    item1: React.PropTypes.shape(itemSchema).isRequired,
    item2: React.PropTypes.shape(itemSchema).isRequired,
    item3: React.PropTypes.shape(itemSchema).isRequired
  },
  render: function() {
    return (
      <div className="three-up row">
        <div className="col col-md-4">
          <div className="icon">
            <img src={this.props.item1.icon} />
          </div>
          <p className="copy">{this.props.item1.text}</p>
        </div>
        <div className="col col-md-4">
          <div className="icon">
            <img src={this.props.item2.icon} />
          </div>
          <p className="copy">{this.props.item2.text}</p>
        </div>
        <div className="col col-md-4">
          <div className="icon">
            <img src={this.props.item3.icon} />
          </div>
          <p className="copy">{this.props.item3.text}</p>
        </div>
      </div>
    );
  }
});
