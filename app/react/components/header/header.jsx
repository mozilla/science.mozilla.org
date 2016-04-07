import React from "react";
import { Link } from "react-router";

export default React.createClass({
  render: function() {
    return (
      <div id="header">
        <nav className="nav nav-inline">
          <Link className="nav-link" to="/">Mozilla Science Lab</Link>
          <Link className="nav-link" to="/programs">Programs</Link>
          <Link className="nav-link" to="/resources">Resources</Link>
          <Link className="nav-link" to="/projects">Projects</Link>
          <Link className="nav-link" to="/blog">Blog</Link>
          <Link className="nav-link" to="/members">Members</Link>
        </nav>
      </div>
    );
  }
});
