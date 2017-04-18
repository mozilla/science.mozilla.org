import React from "react";
import Icon from "./icon.jsx";

export default class Footer extends React.Component {

  constructor(props) {
    super(props);

    this.state = {
      hasConsent: false,
      hasAttemptedToSubmit: false
    };
  }

  subscribeClicked = (event) => {
    if (!this.refs.inputOK.checked) {
      event.preventDefault();
    }

    this.setState({
      hasAttemptedToSubmit: true,
      hasConsent: this.refs.inputOK.checked
    });
  }

  render() {

    return (
      <footer id="footer">
        <div className="newsletter">
          <div className="container-dynamic">
            <div className="row">
              <div className="col-xs-12 col-md-6 text-xs-center text-md-right">
                <h3 className="my-1">Receive our newsletter</h3>
              </div>
              <div className="col-xs-12 col-md-6">
                <form target="_blank" className="one-shot" action="https://mail.mozilla.org/subscribe/mozillascience" method="POST">
                  <input type="email" className="form-control" name="email" placeholder="your email" required/>
                  <button onClick={this.subscribeClicked} type="submit" className="btn btn-knockout">Subscribe</button>
                </form>
              </div>
            </div>
            <div className="row">
              <div className="col-sm-12 checkbox">
                <label>
                  <input ref="inputOK" type="checkbox"/> I'm okay with Mozilla handling my info as explained in this <a href="https://www.mozilla.org/en-US/privacy/websites/" target="_blank">Privacy Notice</a>
                </label>
              </div>
              <div className="col-sm-12">
                <div hidden={!this.state.hasAttemptedToSubmit || this.state.hasConsent} className="inline-block alert alert-danger m-t-2">Please check the box above if you want to subscribe.</div>
              </div>
            </div>
          </div>
        </div>

        <div className="mofooter">
          <div className="icons">
            <Icon href="https://twitter.com/mozillascience" src="/assets/img/footer-icon-twitter.svg" target="_blank">Twitter</Icon>
            <Icon href="http://gitter.im/mozillascience/community" src="/assets/img/footer-icon-irc.svg" target="_blank">Chat</Icon>
            <Icon href="mailto:sciencelab@mozillafoundation.org" src="/assets/img/footer-icon-help.svg">Email Us</Icon>
            <Icon href="https://www.mozilla.org/en-US/about/legal.html" src="/assets/img/footer-icon-terms.svg" target="_blank">Legal</Icon>
            <Icon href="https://creativecommons.org/licenses/by/4.0/" src="/assets/img/cc-logo.svg" target="_blank">License</Icon>
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
}
