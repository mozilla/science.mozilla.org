import React from "react";
import { Link } from "react-router";
import classNames from "classnames";
import MenuButton from "./menu-button.jsx";

export default React.createClass({
  propTypes: {
    path: React.PropTypes.string.isRequired
  },
  getInitialState() {
    return ({
      menuOpen: false,
      slideoutVisible: false
    });
  },
  hideMenu() {
    this.setState({
      menuOpen: false,
      slideoutVisible: false
    });
    window.removeEventListener(`click`, this.hideMenu);
  },
  toggleMenu(e) {
    if(!this.state.menuOpen){
      e.stopPropagation();
      this.setState({ menuOpen: !this.state.menuOpen });
      window.addEventListener(`click`, this.hideMenu);
    }
  },
  toggleSlideout(e) {
    if(!this.state.slideoutVisible){
      e.stopPropagation();
      this.setState({ slideoutVisible: !this.state.slideoutVisible });
      window.addEventListener(`click`, this.hideMenu);
    }
  },
  render: function() {
    let slideoutNavClass = classNames({
      "slideout-menu": true,
      active: this.state.slideoutVisible
    });
    let navClass = classNames({
      nav: true,
      isOpen: this.state.menuOpen
    });
    let getNavLinkClasses = (routeMatch) =>{
      return classNames({
        "nav-link": true,
        active: this.props.path.startsWith(routeMatch)
      });
    };
    let navItemClasses = classNames({
      "nav-item": true,
      open: this.state.slideoutVisible
    });

    return (
      <header id="header">
        <div className="logo-wrap">
          <Link to="/">
            <h1 className="site-logo text-hide">Mozilla Science Lab</h1>
          </Link>
          <MenuButton isOpen={this.state.menuOpen} onClick={this.toggleMenu}/>
        </div>
        <nav className={navClass}>
          <div className="nav-links">
            <div className={navItemClasses}>
              <span className={getNavLinkClasses(`programs`)} onClick={this.toggleSlideout}>Programs</span>
              <div className={slideoutNavClass}>
                <Link className="nav-link events" to="/programs/events">Our Events</Link>
                <Link className="nav-link study-groups" to="/programs/studygroups">Study Groups</Link>
                <Link className="nav-link fellowships" to="/programs/fellowships">Fellowships</Link>
              </div>
            </div>
            <Link className={getNavLinkClasses(`resources`)} to="/resources">Resources</Link>
            <Link className={getNavLinkClasses(`projects`)} to="/projects">Projects</Link>
            <Link className={getNavLinkClasses(`blog`)} to="/blog">Blog</Link>
            <Link className={getNavLinkClasses(`members`)} to="/members">Members</Link>
          </div>
          <div className="auth-links">
            <Link className="nav-link" to="/sign-in">Sign In</Link>
            <Link className="nav-link join" to="/join">Join Us</Link>
          </div>
        </nav>
      </header>
    );
  }
});
