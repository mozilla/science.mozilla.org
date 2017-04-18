import React from "react";
import { Link } from "react-router";
import classNames from "classnames";
import HamburgerMenu from "react-hamburger-menu";

export default class Header extends React.Component {

  constructor(props) {
    super(props);

    this.state = {
      menuOpen: false,
      slideoutVisible: false
    };
  }

  hideMenu = () => {
    this.setState({
      menuOpen: false,
      slideoutVisible: false
    });
    window.removeEventListener(`click`, this.hideMenu);
  }

  toggleMenu = (e) => {
    if(!this.state.menuOpen){
      e.stopPropagation();
      this.setState({ menuOpen: !this.state.menuOpen });
      window.addEventListener(`click`, this.hideMenu);
    }
  }

  toggleSlideout = (e) => {
    if(!this.state.slideoutVisible){
      e.stopPropagation();
      this.setState({ slideoutVisible: !this.state.slideoutVisible });
      window.addEventListener(`click`, this.hideMenu);
    }
  }

  render() {

    let slideoutNavClass = classNames({
      "slideout-menu": true,
      active: this.state.slideoutVisible
    });
    let navClass = classNames({
      nav: true,
      isOpen: this.state.menuOpen
    });
    let getNavLinkClasses = (routeMatch) =>{
      // Check if path starts with routeMatch. Not using string.prototype.startsWith because ES6 compatibility
      return classNames({
        "nav-link": true,
        active: this.props.path.replace(/\W?/, ``).split(`/`)[0] === routeMatch
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
          <div className="menu-button">
            <HamburgerMenu
              isOpen={this.state.menuOpen}
              menuClicked={this.toggleMenu}
              width={24}
              height={16}
              strokeWidth={2}
              rotate={0}
              color='#5A6BA4'
              animationDuration={0.5}
            />
          </div>
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
            <Link className={getNavLinkClasses(`people`)} to="/people">People</Link>
            <Link className={getNavLinkClasses(`blog`)} to="/blog">Blog</Link>
          </div>
          <div hidden className="auth-links">
            <Link className="nav-link" to="/sign-in">Sign In</Link>
            <Link className="nav-link join" to="/join">Join Us</Link>
          </div>
        </nav>
      </header>
    );
  }
}

Header.propTypes = {
  path: React.PropTypes.string.isRequired
};
