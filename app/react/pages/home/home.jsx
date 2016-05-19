import React from "react";
import {Link} from "react-router";

import ThreeUp from "../../components/three-up/three-up.jsx";

export default React.createClass({
  render() {
    return (
      <div id="page-home">
        <div className="jumbotron jumbotron-fluid text-xs-center">
          <div className="container-dynamic">
            <h2>Transforming Science</h2>
            <p className="lead m-t-1">{`Mozilla Science Lab is a community of researchers, developers, and librarians making research open and accessible. We’re empowering open science leaders through fellowships, mentorship, and project-based learning.`}</p>
          </div>
        </div>

        <div className="container-dynamic">
          <ThreeUp
            hasCircle={true}
            item1={{text: `Maximizing access to papers, data, code, and materials so anyone can read and contribute`, icon: `/assets/img/icon-access.svg`}}
            item2={{text: `A community of researchers advocating for openness and collaboration`, icon: `/assets/img/icon-community.svg`}}
            item3={{text: `Open Science: A way for science to achieve its fullest potential`, icon: `/assets/img/icon-open.svg`}}></ThreeUp>
        </div>

        <div className="container-dynamic fellow-cta m-b-3">
          <img src="/assets/img/icon-drop.svg" className="sprinkle"/>
          <img src="/assets/img/icon-droptwo.svg" className="sprinkle"/>

          <div hidden className="shadow-box">
            <div>
              <h2>Apply to be a Fellow</h2>
              <p>The Mozilla Fellowships for Science present a unique opportunity for researchers who want to influence the future of open science and data sharing within their communities.</p>
              <a href="/programs/fellowships" className="btn">Learn More</a>
            </div>
          </div>
        </div>

        <div className="container-dynamic">
          <div className="event-study-cta row">
            <div className="col-md-6">
              <div className="row">
                <img src="/assets/img/home-events@2x.jpg"/>
                <div className="col-xs-10 col-xs-push-1">
                  <h3>Events</h3>
                  <p>We offer a series of sprints and workshops that facilitate in-person collaboration and remote contribution to open source projects. We also host regular Community and Project Calls that highlight what the community is up to.</p>
                  <a className="btn m-b-2" href="/programs/events">Find An Event</a>
                </div>
              </div>
            </div>
            <div className="col-md-6">
              <div className="row">
                <img src="/assets/img/home-studygroups@2x.jpg"/>
                <div className="col-xs-10 col-xs-push-1">
                  <h3>Study Groups</h3>
                  <p>Connect with like-minded researchers at a regular, recurring Study Group session on your campus. If there’s not a Study Group on your campus, help start one!</p>
                  <a className="btn m-b-2" href="/programs/studygroups">Join A Group</a>
                </div>
              </div>
            </div>
          </div>
        </div>

        <div className="whats-new container-dynamic m-t-0">
          <h3 className="m-y-0 p-y-2">{`What's New`}</h3>

          <div className="row p-x-2">
            <div className="whats-new-item col-xs-12 col-lg-4 m-b-2">
              <div className="shadow-box">
                <div className="inner">
                  <h6 className="m-b-0">Resource</h6>
                  <h4 className="m-y-1"><a href="http://sciencehackdayny.github.io/data-camp-16/" target="_blank">Data Camp Trainings</a></h4>
                  <p>{`Our Data Camp Trainings are a collection of resources on collaborative coding, data munging, version control, sensor science, and design principles. Originally used at Science Hack Day 2016 and Space Apps - Brooklyn, this resource is appropriately staged for a hackathon or one-day workshop.`}</p>
                </div>
              </div>
            </div>

            <div className="whats-new-item col-xs-12 col-lg-4 m-b-2">
              <div className="shadow-box">
                <div className="inner">
                  <h6 className="m-b-0">Project</h6>
                  <h4 className="m-y-1"><Link to="/projects/contentmine">Content Mine</Link></h4>
                  <p>Content Mine is a set of tools for extracting information from papers. It’s part of a suite of awesome projects featured in our <Link to="/programs/events/global-sprint-2016">Global Sprint 2016</Link> and showcased by our Mozilla Science Fellow, Richard Smith-Unna at the recent CSV,Conf in Berlin, Germany.`}</p>
                </div>
              </div>
            </div>

            <div className="whats-new-item col-xs-12 col-lg-4 m-b-2">
              <div className="shadow-box">
                <div className="inner">
                  <h6 className="m-b-0">Blog</h6>
                  <h4 className="m-y-1"><Link to="/blog/sharing-our-story-of-research-data-reuse">Sharing our Story of Data Research + Reuse</Link></h4>
                  <p>{`A review of and reflection of our effort to crowdsource data reuse stories and narratives from our community, with responses from fields as diverse as political science, psychology, education, and biochemistry.`}</p>
                </div>
              </div>
            </div>
          </div>
        </div>

        <div className="supporters p-t-3">
          <div className="container-dynamic">
            <h4 className="text-xs-center m-b-3 m-t-0">We are supported by</h4>

            <div className="row">
              <div className="col-xs-6 m-b-3">
                <div className="row">
                  <div className="col-xs-12 col-sm-4">
                    <a href="http://www.sloan.org/" target="_blank"><img src="/assets/img/logo-sloan@2x.jpg"/></a>
                  </div>
                  <p className="col-sm-8 hidden-xs-down">{`The Alfred P. Sloan Foundation is a philanthropic, not-for-profit grantmaking institution. They believe that a carefully reasoned and systematic understanding of the forces of nature and society can lead to a better world for all.`}</p>
                </div>
              </div>

              <div className="col-xs-6">
                <div className="row">
                  <div className="col-xs-12 col-sm-4">
                    <a href="http://helmsleytrust.org/" target="_blank"><img src="/assets/img/logo-helmsley@2x.jpg"/></a>
                  </div>
                  <p className="col-sm-8 hidden-xs-down">{`The Helmsley Charitable Trust aspires to improve lives by supporting exceptional nonprofits and other mission-aligned organizations in the U.S. and around the world in health, selected place-based initiatives, and education and human services.`}</p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    );
  }
});
