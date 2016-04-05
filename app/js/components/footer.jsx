import React from "react";

export default React.createClass({
  render: function() {
    return (
      <div>
        <div className="newsletter">
          Join our newsletter
        </div>
        <ul className="badged-links">
          <li><a href="#">Twitter</a></li>
        </ul>
        <div>
          Mozilla
        </div>
      </div>
    );
  }
});
