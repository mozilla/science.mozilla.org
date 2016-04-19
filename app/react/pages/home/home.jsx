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

        <div className="whats-new p-y-3">
          <h3>{`What's New`}</h3>

          <div className="row p-x-2">
            <div className="col-xs-12 col-md-4 m-b-2">
              <div className="shadow-box">
                <div className="inner">
                  <h6 className="m-b-0">Resource</h6>
                  <h4 className="m-y-1">Code Review in the Lab</h4>
                  <p>{`Code Review is a process of examining code to eliminate bugs and set a standard of quality. In these lessons, you'll learn how to establish a pattern of code review that will make your work more robust, reusable and reproducible ...`}</p>
                </div>
              </div>
            </div>

            <div className="col-xs-12 col-md-4 m-b-2">
              <div className="shadow-box">
                <div className="inner">
                  <h6 className="m-b-0">Project</h6>
                  <h4 className="m-y-1">Pathogens & Disease Immunity</h4>
                  <p>{`This project seeks to accelerate our understanding of disease immunity by leveraging open genetic data.`}</p>
                  <p>{`Recent discoveries in the genetics of bacteria and phages (genetic material that infects bacteria) have exposed ...`}</p>
                </div>
              </div>
            </div>

            <div className="col-xs-12 col-md-4 m-b-2">
              <div className="shadow-box">
                <div className="inner">
                  <h6 className="m-b-0">Blog</h6>
                  <h4 className="m-y-1">Global Sprint 2016 – Site and Project Submissions Open!</h4>
                  <p>{`Join us as we collaborate on projects helping further science on the open web! We’re back with our third annual global sprint – June 2-3, 2016. We’ve just opened our call for project ideas and site hosts ...`}</p>
                </div>
              </div>
            </div>
          </div>

        </div>
      </div>
    );
  }
});
