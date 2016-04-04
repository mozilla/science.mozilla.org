import React from "react";

export default React.createClass({
  render: function() {
    return (
      <div className="greeting">
        Hello, {this.props.name}!
      </div>
    );
  },
});
