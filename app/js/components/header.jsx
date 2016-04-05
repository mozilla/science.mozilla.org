import React from "react";
import { Link } from "react-router";

export default React.createClass({
  render: function() {
    return (
      <nav className="nav nav-inline">
        <Link className="nav-link" to="/">Home</Link>
        <Link className="nav-link" to="/programs">Programs</Link>
        <Link className="nav-link" to="/resources">Resources</Link>
        <Link className="nav-link" to="/projects">Projects</Link>
        <Link className="nav-link" to="/blog">Blog</Link>
        <Link className="nav-link" to="/members">Members</Link>
      </nav>
    );
  }
});
