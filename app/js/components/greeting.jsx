import React from "react";

export default React.createClass({
  render: function() {
    return (
      <div className="jumbotron">
        <h1>{this.props.header}</h1>
        <p className="lead">{this.props.subHeader}</p>
      </div>
    );
  }
});
