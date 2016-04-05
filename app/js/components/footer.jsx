import React from "react";

export default React.createClass({
  render: function() {
    return (
      <div>
        <hr/>
        <div className="newsletter">
          <div className="row">
            <div className="col-sm-4">Join our newsletter</div>
            <div className="col-sm-8">
              <input/>
              <button className="btn btn-primary">Subscribe</button>
            </div>
          </div>
          <div className="row checkbox">
            <label>
              <input type="checkbox"/> Im okay with Mozilla handling my info as explained in this <a href="#">Privacy Notice</a>
            </label>
          </div>
        </div>
        <ul className="badged-links nav nav-inline">
          <a className="nav-link" target="_blank" href="https://twitter.com/MozillaScience">Twitter</a>
          <a className="nav-link" href="irc://irc.mozilla.org/sciencelab">IRC</a>
          <a className="nav-link" href="#TODO">Email Us</a>
          <a className="nav-link" target="_blank" href="https://www.mozilla.org/en-US/about/legal/terms/mozilla/">Terms of Use</a>
          <a className="nav-link" target="_blank" href="https://www.mozilla.org/en-US/privacy/">Privacy Policy</a>
          <a className="nav-link" href="#TODO">Code of Conduct</a>
        </ul>
        <div className="row">
          <div className="col-sm-4"><h4>Mozilla</h4></div>
          <div className="col-sm-8">Mozilla is a global non-profit dedicated to putting you in control of your online experience and shaping the future of the web for the public good. Visit us at <a href="http://mozilla.org" target="_blank">mozilla.org</a></div>
        </div>
      </div>
    );
  }
});
