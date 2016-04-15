import React from "react";
import Icon from "./icon.jsx";

export default React.createClass({
  render: function() {
    return (
      <footer id="footer">
        <div className="newsletter">
          <div className="container">
            <div className="row">
              <div className="col-sm-6">
                <h3>Receive our newsletter</h3>
              </div>
              <div className="col-sm-6">
                <form className="one-shot" action="https://mail.mozilla.org/subscribe/mozillascience" method="POST">
                  <input type="email" name="email" placeholder="your email"/>
                  <button type="submit" className="btn btn-primary">Subscribe</button>
                </form>
              </div>
            </div>
            <div className="row">
              <div className="col-sm-12 checkbox">
                <label>
                  <input type="checkbox"/> Im okay with Mozilla handling my info as explained in this <a href="#">Privacy Notice</a>
                </label>
              </div>
            </div>
          </div>
        </div>

        <div className="mofooter">
          <div className="icons">
            <Icon href="https://twitter.com/Mozilla" src="/assets/img/footer-icon-twitter.svg" target="_blank">Twitter</Icon>
            <Icon href="irc://irc.mozilla.org/sciencelab" src="/assets/img/footer-icon-irc.svg">IRC</Icon>
            <Icon href="#TODO" src="/assets/img/footer-icon-help.svg">Email Us</Icon>
            <Icon href="https://www.mozilla.org/en-US/about/legal.html" src="/assets/img/footer-icon-terms.svg" target="_blank">Legal</Icon>
            <Icon href="/code-of-conduct" src="/assets/img/footer-icon-conduct.svg">Code of Conduct</Icon>
          </div>

          <div className="footer-content">
            <a className="logo" href="https://mozilla.org" target="_blank">
              <img height="30" width="105" src="/assets/img/mozilla-wordmark.svg"/>
            </a>
            <p>Mozilla is a global non-profit dedicated to putting you in control of your online experience and shaping the future of the web for the public good. Visit us at <a href="//mozilla.org" target="_blank">mozilla.org</a></p>
          </div>
        </div>
      </footer>
    );
  }
});
