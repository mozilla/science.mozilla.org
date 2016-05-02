import React from "react";
import TabSwitcher from "../../components/tab-switcher/tab-switcher.jsx";

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
            <div className="p-y-3" name="Overview">About content.</div>
            <div className="p-y-3" name="Financial Terms">Schedule content.</div>
            <div className="p-y-3" name="FAQ">
              <dl>
                <dt>{`I live outside of the US, UK or Canada - am I eligible?`}</dt>
                <dd>{`Unfortunately, for the first year, we're limiting the call to those in the U.S., UK, and Canada, and to life/natural sciences. That's not because we don't *want* to expand the reach and pool of Fellows - we just need to start somewhere. Our aim is to extend this in subsequent years, so do stay tuned.`}</dd>

                <dt>{`What disciplines are included in "life and natural sciences"?`}</dt>
                <dd>{`Biology, chemistry, earth science, physics, astronomy, ecology, etc.<`}</dd>
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
