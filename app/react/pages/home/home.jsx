import React from "react";

import Greeting from "../../components/greeting/greeting.jsx";
import ThreeUp from "../../components/three-up/three-up.jsx";

export default React.createClass({
  render() {
    return (
      <div id="page-home">
        <Greeting
          header="Transforming Science"
          subHeader="Mozilla Science Lab is a community of researchers, developers, and librarians making research open and accessible." />

        <ThreeUp
          hasCircle={true}
          item1={{text: `Maximizing access to papers, data, code, and materials so anyone can read and contribute`, icon: `/assets/img/icon-access.svg`}}
          item2={{text: `A community of researchers advocating for openness and collaboration`, icon: `/assets/img/icon-community.svg`}}
          item3={{text: `Open Science: A way for science to achieve its fullest potential`, icon: `/assets/img/icon-open.svg`}}></ThreeUp>

        <div className="fellow-cta">
          <img src="/assets/img/icon-drop.svg" className="sprinkle"/>
          <img src="/assets/img/icon-droptwo.svg" className="sprinkle"/>

          <div className="shadow-box">
            <div>
              <h2>Apply to be a Fellow</h2>
              <p>The Mozilla Fellowships for Science present a unique opportunity for researchers who want to influence the future of open science and data sharing within their communities.</p>
              <a href="#" className="btn">Learn More</a>
            </div>
          </div>
        </div>
      </div>
    );
  }
});
