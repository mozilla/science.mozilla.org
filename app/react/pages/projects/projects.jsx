
import React from "react";

import ThreeUp from "../../components/three-up/three-up.jsx";

export default React.createClass({
  render() {
    return (
      <div id="page-projects">
        <div className="jumbotron text-xs-center jumbotron-fluid">
          <h2>Projects</h2>
          <p className="lead m-t-1">A curated collection of open source, web-based tools to help you do better science.</p>
          <p>Have a project you want to add? Bring it to our <a href="#">Global Sprint</a>, <a href="#">Mozfest</a>, or <a href="#">Working Open Workshop</a>.</p>
        </div>
        <div className="container-dynamic">
          <ThreeUp
            item1={{title: `What is open source?`, text: `Open source describes software that can be used modified and distributed. The extent of its "openness" is determined by the license attached to the software, but in general, open source projects are collaborative in nature, with many people contributing to the source code.`, icon: `/assets/img/icon-opensource.svg`}}
            item2={{title: `How to get started`, text: `Most open source projects have a README file that provides an overview of how to get set up, and many also have a CONTRIBUTING file that details how to get started as a contributor.`, icon: `/assets/img/icon-start.svg`}}
            item3={{title: `How it helps science`, text: `Too often today, scientific research happens in closed environments. Findings and papers are sealed-up, isolated from other researchers and the public. Open practices help science achieve its full potential.`, icon: `/assets/img/icon-help.svg`}}>
          </ThreeUp>
        </div>
      </div>
    );
  }
});
