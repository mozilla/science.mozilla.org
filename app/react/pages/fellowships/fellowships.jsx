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
            <p className="lead m-t-1"><em>Are you a champion of open science and open data? Mozilla is seeking researchers eager to advance openness in science and data within their institutions.</em></p>
            <a className="btn btn-white">Apply Now</a>
          </div>
        </div>

        <div className="container">
          <TabSwitcher className="pull-up">
            <div className="p-y-3" name="Fellows">
              <h2>Our 2015 Fellows</h2>

              <p>The folks chosen are representative of the change we want to see in the community, championing openness, collaboration, and mentorship in science. Over the next ten months, the Fellows will work on projects to help their local communities engage with open data, open source software and teach forward to their peers. They will also receive training and support from Mozilla to hone their skills around open source, participatory learning, and data sharing.</p>

              <div className="row m-y-3">
                <div className="col-sm-3 center-vertical">
                  <img className="circle" src="/assets/img/fellowships/fellow-richard.png"/>
                </div>
                <div className="col-sm-9">
                  <h4 className="m-b-0">Richard Smith-Unna</h4>
                  <p className="m-b-1"><a href="http://twitter.com/blahah404" target="_blank">@blahah404</a> | <a href="http://rik.smith-unna.com/" target="_blank">Richard's Blog</a></p>
                  <p>A computational biology PhD student at the <a href="http://www.cam.ac.uk/">University of Cambridge</a>. He is currently focused on understanding a particularly efficient kind of <a href="https://en.wikipedia.org/wiki/C4_carbon_fixation">photosynthesis called C4</a>. He develops and contributes to a wide array of open source software and teaching materials for bioinformatics, including the <a href="http://contentmine.org/">Content Mine</a>, <a href="https://solvers.io/">Solvers.io</a>, and <a href="https://github.com/BioJulia">BioJulia</a>. </p>
                </div>
              </div>

              <div className="row m-y-3">
                <div className="col-sm-3 center-vertical">
                  <img className="circle" src="/assets/img/fellowships/fellow-christie.png"/>
                </div>
                <div className="col-sm-9">
                  <h4 className="m-b-0">Christie Bahlai</h4>
                  <p className="m-b-1"><a href="http://twitter.com/cbahlai" target="_blank">@cbahlai</a> | <a href="https://practicaldatamanagement.wordpress.com/" target="_blank">Christie's Blog</a></p>
                  <p>An insect ecologist and post-doctoral research associate at <a href="http://msu.edu">Michigan State University</a>.  She works with the NSF-funded <a href="http://www.lternet.edu/">Long Term Ecological Research network</a>, and is interested in how we can use big(ish) ecological data and open science approaches to help build sustainable agricultural systems. She’s an instructor with <a href="http://software-carpentry.org">Software Carpentry</a> and <a href="http://www.datacarpentry.org/">Data Carpentry</a> and maintains a blog about open science and data management called <a href="https://practicaldatamanagement.wordpress.com/">Practical Data Management</a>.</p>
                </div>
              </div>

              <div className="row m-y-3">
                <div className="col-sm-3 center-vertical">
                  <img className="circle" src="/assets/img/fellowships/fellow-joey.png"/>
                </div>
                <div className="col-sm-9">
                  <h4 className="m-b-0">Joey Lee</h4>
                  <p className="m-b-1"><a href="http://twitter.com/leejoeyk" target="_blank">@leejoeyk</a> | <a href="http://jk-lee.com/blog/" target="_blank">Joey's Blog</a></p>
                  <p>A geographer and computational media artist from San Francisco, California passionate about technological literacy and the engagement of art and science through computation and collaboration. He is co-author of <a href="http://jk-lee.com/The-Big-Atlas-of-LA-Pools">"The Big Atlas of LA Pools"</a> and co-creator of the <a href="https://www.kickstarter.com/projects/357538735/aerial-bold-kickstart-the-planetary-search-for-let">"Aerial Bold" Kickstarter project</a> (<a href="https://vimeo.com/108875406">video here</a>). He is currently based in Vancouver, Canada, balancing his time <a href="http://joeyklee.github.io/presentations/ubc_springsymposium2015/#/9">between his MSc research</a> and teaching at the <a href="http://www.ubc.ca/">University of British Columbia</a>, <a href="http://joeyklee.github.io/presentations/ubc_datavizcolloqium2015/#/8">building</a> <a href="https://github.com/joeyklee/GEOB472/tree/master/workshops/01_shapes%26code">workshops</a> around opensource tools (e.g. <a href="http://maptime.io/vancouver/">Maptime Vancouver</a>), and <a href="http://jk-lee.com/">exploring projects around geography and technology</a>.</p>
                </div>
              </div>

              <div className="row m-y-3">
                <div className="col-sm-3 center-vertical">
                  <img className="circle" src="/assets/img/fellowships/fellow-jason.png"/>
                </div>
                <div className="col-sm-9">
                  <h4 className="m-b-0">Jason Bobe</h4>
                  <p className="m-b-1"><a href="http://twitter.com/jasonbobe" target="_blank">@jasonbobe</a> | <a href="http://blog.jasonbobe.net/" target="_blank">Jason's Blog</a></p>
                  <p>An Associate Professor and director of the Sharing Lab at the <a href="http://icahn.mssm.edu/departments-and-institutes/genomics">Icahn Institute for Genomics and Multiscale Biology at Mount Sinai</a> where he leads the <a href="http://resilienceproject.me/">Resilience Project</a> with Eric Schadt and Stephen Friend, a research study that aims to find and decode people who are able to avoid disease despite having genetic risk factors. He has founded two open science nonprofits, <a href="http://www.personalgenomes.org/">PersonalGenomes.org</a> &amp; <a href="http://diybio.org/">DIYbio</a>. With co-founder <a href="http://mad.printf.net/">Madeleine Ball</a>, he has created <a href="https://www.openhumans.org/">OpenHumans.org</a>, a platform that connects people and their data with researchers that practice equitable data sharing. With George Church, he coordinates the <a href="http://www.personalgenomes.org/harvard/global-network">Global Network of Personal Genome Projects,</a> now with sites in four countries. </p>
                </div>
              </div>

            </div>
            <div className="p-y-3" name="Overview">
              <h2>About the Program</h2>

              <p>The Mozilla Fellowships for Science present a unique opportunity for researchers who want to influence the future of open science and data sharing within their communities.</p>
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

              <h3 className="m-b-1">Stipend and Financial Benefits</h3>

              <p>The Fellowships are designed to allow for flexibility for both Fellows and their families. The standard fellowship offers a stipend of $60,000 USD, paid in 10 monthly installments. Fellows are responsible for remitting all applicable taxes and other government payments as required.</p>
              <p>To help offset cost of living, the fellowship also provides supplements for childcare and health insurance, and helps pay for research/equipment and books. The fellowship also covers the costs of required travel for fellowship activities.</p>
              <p className="m-b-3">Fellows will receive:</p>

              <div className="m-b-3">
                <IconItem imgSrc="/assets/img/fellowships/icon-stipend.svg" copy="A stipend of $60,000 USD, paid in 10 monthly installments."></IconItem>
                <IconItem imgSrc="/assets/img/fellowships/icon-insurance.svg" copy="One-time health insurance supplement for Fellows and their families, ranging from $3,500 for single Fellows to $7,000 for a couple with two or more children."></IconItem>
                <IconItem imgSrc="/assets/img/fellowships/icon-child.svg" copy="One-time childcare allotment for families with children of up to $6,000."></IconItem>
                <IconItem imgSrc="/assets/img/fellowships/icon-computer.svg" copy="Allowance of up to $3,000 towards the purchase of laptop computer, digital cameras, recorders and computer software; fees for continuing studies or other courses, research fees or payments, to the extent related to the fellowship."></IconItem>
                <IconItem imgSrc="/assets/img/fellowships/icon-trips.svg" copy="All approved fellowship trips – domestic and international – are covered in full."></IconItem>
              </div>

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
            <div className="p-y-3" name="FAQ">
              <h2 className="m-b-1">Application FAQ</h2>

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
          </TabSwitcher>

        </div>

        <div className="p-y-2 fellow-cta">
          <div className="container">
            <h3>Apply Now</h3>
            <p className="m-b-2"><em>We are an inclusive program and seek Fellows that reflect the diversity of the communities we serve. We encourage unique contributors with varied backgrounds to apply; if you feel your perspective is underrepresented in technology, we want to hear from you.</em></p>
            <a className="btn btn-white m-b-2" href="#TODO">Apply Now</a>
            <p><small><em>Deadline 11:59pm PT [date], 2016</em></small></p>
          </div>
        </div>

      </div>
    );
  }
});
