import React from 'react';

// Components

import Header from "./components/header/header.jsx";
import Footer from "./components/footer/footer.jsx";

export default React.createClass({
  render() {
    return (
      <div>
        <Header path={this.props.location.pathname}/>
        <div id="content-wrapper">
          <div id="content">
            {this.props.children}
          </div>
        </div>
        <Footer/>
      </div>
    );
  }
});

