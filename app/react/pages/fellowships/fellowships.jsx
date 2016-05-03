import React from "react";
import TabSwitcher from "../../components/tab-switcher/tab-switcher.jsx";

let IconItem = React.createClass({
  render() {
    return (
      <div className="row m-b-2 icon-item">
        <div className="col-xs-2 text-xs-center"><img className="icon" src={this.props.imgSrc}/></div>
        <div className="col-xs-10"><p className="m-b-0"><em>{this.props.copy}</em></p></div>
      </div>
    );
  }
});

export default React.createClass({
  getInitialState(){
    return {
    };
  },
  render() {
    return (
      <div id="page-fellowships">
        <div className="jumbotron text-xs-center jumbotron-fluid m-b-0">
          <div className="container m-b-3">
            <h2>Fellowships</h2>
            <p className="lead m-t-1">Are you a champion of open science and open data? Mozilla is seeking researchers eager to advance openness in science and data within their institutions.</p>
            <a className="btn btn-white">Apply Now</a>
          </div>
        </div>

        <div className="container">
          <TabSwitcher className="pull-up">
            <div className="p-y-3" name="Overview">
              <p><em>The Mozilla Fellowships for Science present a unique opportunity for researchers who want to influence the future of open science and data sharing within their communities.</em></p>
              <p>We're looking for researchers with a passion for open source and data sharing, already working to shift research practice to be more collaborative, iterative and open. Fellows will spend 10 months starting September 2015 as community catalysts at their institutions, mentoring the next generation of open data practitioners and researchers and building lasting change in the global open science community.</p>
              <p>Throughout their fellowship year, chosen fellows will receive training and support from Mozilla to hone their skills around open source and data sharing. They will also craft code, curriculum and other learning resources that help their local communities learn open data practices, and teach forward to their peers.</p>

              <h3 className="m-b-3">Fellow Responsibilities</h3>

              <div className="m-b-3">
                <IconItem imgSrc="/assets/img/fellowships/icon-share.svg" copy="Champion change within their university around open source and data sharing."></IconItem>
                <IconItem imgSrc="/assets/img/fellowships/icon-curriculum.svg" copy="Create code, curriculum and other learning resources that help others learn open science practices."></IconItem>
                <IconItem imgSrc="/assets/img/fellowships/icon-events.svg" copy="Participate in Mozilla workweeks, trainings and community events (MozFest, code sprints, Working Open Workshops)."></IconItem>
                <IconItem imgSrc="/assets/img/fellowships/icon-lead.svg" copy="Serve as mentors and leaders within their communities."></IconItem>
                <IconItem imgSrc="/assets/img/fellowships/icon-communicate.svg" copy="Communicate and share openly their work on an ongoing basis (e.g., through GitHub repositories, scholarly preprints and blog posts)."></IconItem>
              </div>

              <p className="m-b-3">{`Note: Fellows are encouraged to continue their personal research for up to 20% of their time during the course of their fellowship (i.e., one day a week). Fellowship applicants must have buy in from their supervisors in advance, and include supervisors' contact information on the application. Advisers will be interviewed separately should applicants move on to the second round, and their support will be a critical consideration for acceptance of fellows.`}</p>

              <h3 className="m-b-3">Who can become a Fellow?</h3>

              <div className="m-b-3">
                <IconItem imgSrc="/assets/img/fellowships/icon-institution.svg" copy="Currently working at a research institution in the US, UK or Canada."></IconItem>
                <IconItem imgSrc="/assets/img/fellowships/icon-research.svg" copy="Currently an early-career researcher (i.e, graduate students, post-docs, research scientists, lecturers)."></IconItem>
                <IconItem imgSrc="/assets/img/fellowships/icon-life.svg" copy="Specializing in the life sciences or natural sciences."></IconItem>
                <IconItem imgSrc="/assets/img/fellowships/icon-travel.svg" copy="Able to travel."></IconItem>
                <IconItem imgSrc="/assets/img/fellowships/icon-approve.svg" copy="Supported by their supervisors. As fellows will be based at their home institutions and a letter of support from their supervisor is mandatory."></IconItem>
                <IconItem imgSrc="/assets/img/fellowships/icon-open.svg" copy="Have experience participating in open communities."></IconItem>
              </div>
            </div>
            <div className="p-y-3" name="Financial Terms">
              <p><em>{`To The Fellowships are designed to allow for flexibility for both Fellows and their families. The fellowship offers a stipend of USD$60,000 paid in 10 monthly installments. Fellows are responsible for remitting all applicable taxes and other government payments required.`}</em></p>
              <p>{`To help offset cost of living, the fellowship also provides supplements for childcare and health insurance, and helps pay for research/equipment and books. The fellowship also covers the costs of required travel for fellowship activities.`}</p>
              <p>{`Salary and benefits are allocated to the individual directly by monthly stipend pre-tax, not run through institutions - and fellows are responsible for managing the tax aspect of that (that trips people up, we've found). no university overhead-like arrangements - the funding goes straight to the fellow themselves.`}</p>

              <div className="row">
                <div className="col-sm-6">
                  <h4>Housing Supplement</h4>

                  <ul className="list-group">
                    <li className="list-group-item">
                      <span className="pull-xs-right">$5,000</span>
                      Single, married or partnered fellow
                    </li>
                    <li className="list-group-item">
                      <span className="pull-xs-right">$7,000</span>
                      Fellow with 1 child
                    </li>
                    <li className="list-group-item">
                      <span className="pull-xs-right">$8,500</span>
                      Fellow with 2 children
                    </li>
                    <li className="list-group-item">
                      <span className="pull-xs-right">$10,000</span>
                      Fellow with 3 or more children
                    </li>
                  </ul>
                </div>

                <div className="col-sm-6">
                  <h4>Moving Allowance</h4>

                  <ul className="list-group">
                    <li className="list-group-item">
                      <span className="pull-xs-right">$2,000</span>
                      Fellow moving cities in the same country
                    </li>
                    <li className="list-group-item">
                      <span className="pull-xs-right">$4,000</span>
                      Fellow moving countries
                    </li>
                    <li className="list-group-item">
                      <span className="pull-xs-right">Additional $2,000</span>
                      Fellow with children
                    </li>
                  </ul>
                </div>

                <div className="col-sm-6">
                  <h4>Health Insurance Supplement</h4>

                  <ul className="list-group">
                    <li className="list-group-item">
                      <span className="pull-xs-right">$3,500</span>
                      Single fellow
                    </li>
                    <li className="list-group-item">
                      <span className="pull-xs-right">$5,000</span>
                      Fellow with partner
                    </li>
                    <li className="list-group-item">
                      <span className="pull-xs-right">$5,500</span>
                      Fellow with 1 child
                    </li>
                    <li className="list-group-item">
                      <span className="pull-xs-right">$6,000</span>
                      Fellow with partner and 1 child
                    </li>
                    <li className="list-group-item">
                      <span className="pull-xs-right">$6,500</span>
                      Fellow with 2+ children
                    </li>
                    <li className="list-group-item">
                      <span className="pull-xs-right">$7,000</span>
                      Fellow with partner and 2+ children
                    </li>
                  </ul>
                </div>

                <div className="col-sm-6">
                  <h4>Childcare Supplement*</h4>

                  <ul className="list-group">
                    <li className="list-group-item">
                      <span className="pull-xs-right">$5,600</span>
                      1 child age 12 or youngerX
                    </li>
                    <li className="list-group-item">
                      <span className="pull-xs-right">$6,000</span>
                      2 children ages 12 or younger
                    </li>
                    <li className="list-group-item">
                      <span className="pull-xs-right">$6,400</span>
                      3 children ages 12 or younger
                    </li>
                    <li className="list-group-item">
                      <span className="pull-xs-right">$7,200</span>
                      4 or more children ages 12 or younger
                    </li>
                    <li className="list-group-item">
                      <span className="pull-xs-right">$6,400</span>
                      Additional allowance for child 3 yrs or younger
                    </li>
                  </ul>

                  <p className="m-t-1"><em>*Age defined on June 1 of fellowship year</em></p>
                </div>
              </div>

              <h3>Research & Equipment</h3>
              <p>Allowance of up to $3,000 towards the purchase of laptop computer, digital cameras, recorders and computer software; fees for continuing studies or other courses, research fees or payments, to the extent related to the fellowship.</p>

              <h3>Travel Allowance</h3>
              <p>All approved fellowship trips – domestic and international – are covered.</p>
            </div>
            <div className="p-y-3" name="FAQ">
              <dl>
                <dt>{`I live outside of the US, UK or Canada - am I eligible?`}</dt>
                <dd>{`Unfortunately, for the first year, we're limiting the call to those in the U.S., UK, and Canada, and to life/natural sciences. That's not because we don't *want* to expand the reach and pool of Fellows - we just need to start somewhere. Our aim is to extend this in subsequent years, so do stay tuned.`}</dd>

                <dt>{`What disciplines are included in "life and natural sciences"?`}</dt>
                <dd>{`Biology, chemistry, earth science, physics, astronomy, ecology, etc.`}</dd>
                <dd>{`For our first year, our call is limited to the disciplines listed above. Our plans are to extend in future years, as we know open research is as important there as it is in other disciplines, but need to unfortunately limit the scope for this first year due to grant obligations.`}</dd>

                <dt>{`I work at a research institution but not a "university" - can I still apply?`}</dt>
                <dd>{`You bet! Government funded research institutions and groups (ie., National Institutes of Health, Environmental Protection Agency, or research centers like NEON, BEACON, etc) as well as positions in other research institutions (ie., Museum of Natural History and many Planetariums have research arms, as well) count!`}</dd>

                <dt>{`Still unsure? Let us know - we'd be happy to talk it through.`}</dt>
                <dd>{`I'm not currently at a university or research institution - can I still apply?`}</dd>
                <dd>{`Fellows are required to be based at a university or research institution for the 10 month tenure. Mozilla is not responsible for placing Fellows into other institutions.`}</dd>

                <dt>{`When are Fellowships intended to start?`}</dt>
                <dd>{`The anticipated start date for Fellows is late September, running through June 2016.`}</dd>

                <dt>{`What sort of travel is expected?`}</dt>
                <dd>{`There are a few events and times over the course of the 10 months that fellows are expected to travel and come together at a minimum. There's onboarding (likely late Sept / early October), the Mozilla Festival (Nov 4-6 in London), and two workweeks in 2016 - location TBD.`}</dd>

                <dt>{`I have another Fellowship / teaching commitments / course work - does that rule me out?`}</dt>
                <dd>{`Not necessarily! This is a time commitment though, and Fellows are encouraged to maintain up to 20% of their research and work through this. If you have a standing commitment that you think may affect your time, please note in your application.`}</dd>

                <dt>{`I'm a pre-tenure, early career faculty member - does that rule me out?`}</dt>
                <dd>{`Not necessarily! Be sure to list your teaching commitments in the application, as there are travel obligations and expectations that we want to make sure you have adequate time for.`}</dd>

                <dt>{`Can I continue my research / teaching during the Fellowship?`}</dt>
                <dd>{`Fellows are encouraged to continue their personal research for up to 20% of their time during the course of their fellowship (i.e., one day a week). Fellowship applicants must have buy in from their supervisors in advance, and include supervisors' contact information on the application. Advisers will be interviewed separately should applicants move on to the second round, and their support will be a critical consideration for acceptance of fellows.`}</dd>

                <dt>{`What role does my advisor play in this process?`}</dt>
                <dd>{`We want to make sure Fellows, as they'll be working somewhat autonomously within their institution are in supportive environments. We find this is best achieved with advisors who are supportive and tuned in to the challenges around open research practice and data sharing within the university, and are open to Fellows working more full-time for 10 months to build momentum, teach, and collaborate to advance those goals within those labs and research settings.`}</dd>

                <dt>{`How will I be funded over the Fellowship?`}</dt>
                <dd>{`Salary and benefits are allocated to the individual directly by monthly stipend pre-tax, not run through institutions - and fellows are responsible for managing the tax aspect of that (that trips people up, we've found. :) ). No university overhead-like arrangements - the funding goes straight to the Fellow themselves.`}</dd>
              </dl>
            </div>
            <div className="p-y-3" name="Fellows">Projects content.</div>
          </TabSwitcher>
        </div>
      </div>
    );
  }
});
