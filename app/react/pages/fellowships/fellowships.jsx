import React from "react";
import TabSwitcher from "../../components/tab-switcher/tab-switcher.jsx";
import { Collapse, Panel } from "mofo-ui";

class IconItem extends React.Component {

  render() {

    return (
      <div className="row mb-2 icon-item">
        <div className="col-xs-2 text-xs-center"><img className="icon" src={this.props.imgSrc}/></div>
        <div className="col-xs-10"><p className="mb-0"><em>{this.props.copy}</em></p></div>
      </div>
    );
  }
}

export default class Fellowships extends React.Component {

  render() {

    return (
      <div id="page-fellowships">
        <div className="jumbotron text-xs-center jumbotron-fluid mb-0">
          <div className="container-dynamic container mb-3">
            <div className="row flex-items-md-center">
              <h2 className="col-xs-12">Fellowships</h2>
              <p className="lead mt-1 col-xs-12 col-md-10 col-lg-8"><em>Are you a champion of open science and open data? Mozilla is seeking researchers eager to advance openness in science and data within their institutions.</em></p>
            </div>

            <div className="row">
              <div className="col-xs-12">
                <a className="btn btn-white mb-2" href="https://mozilla-science-lab.forms.fm/mozilla-fellows-for-science-2017" target="_blank">Apply Now</a>
              </div>
            </div>
          </div>
        </div>

        <div className="container">
          <TabSwitcher baseURL={`/programs/fellowships/`} initialTab={this.props.params.tab} ref="tabSwitcher" className="pull-up">
            <div className="py-3" name="Overview" slug="overview" iconDefault="/assets/img/icon-tab-overview.svg" iconActive="/assets/img/icon-tab-overview-blue.svg">
              <h2>About the Program</h2>

              <p>The Mozilla Fellowships for Science present a unique opportunity for researchers who want to influence the future of open science and data sharing within their communities.</p>
              <p>We're looking for researchers with a passion for open source and data sharing, already working to shift research practice to be more collaborative, iterative and open. Fellows will spend 10 months starting September 2017 as community catalysts at their institutions, mentoring the next generation of open data practitioners and researchers and building lasting change in the global open science community.</p>
              <p>Throughout their fellowship term, chosen fellows will receive training and support from Mozilla to hone their skills around open source, data sharing, open science policy and licensing. They will also craft code, curriculum and other learning resources that help their local communities learn open data practices, and teach their institutional peers.</p>
              <p><strong>The call closes May 14, 2017 at 11:59PM EDT.</strong></p>

              <h3 className="mb-3">Expectations</h3>
              <p>We anticipate applicants who:</p>
              <div className="mb-3">
                <IconItem imgSrc="/assets/img/fellowships/icon-share.svg" copy="champion change within their university or other institution around open source and data sharing"></IconItem>
                <IconItem imgSrc="/assets/img/fellowships/icon-curriculum.svg" copy="create code, curriculum and other learning resources that help others learn open science practices"></IconItem>
                <IconItem imgSrc="/assets/img/fellowships/icon-events.svg" copy="participate in Mozilla workweeks, trainings and community events (MozFest, Global Sprint, Working Open Workshops, etc.)"></IconItem>
                <IconItem imgSrc="/assets/img/fellowships/icon-computer.svg" copy="participate in and help lead regular community calls"></IconItem>
                <IconItem imgSrc="/assets/img/fellowships/icon-lead.svg" copy="serve as mentors and leaders within their communities"></IconItem>
                <IconItem imgSrc="/assets/img/fellowships/icon-communicate.svg" copy="communicate and share openly their work on an ongoing basis (e.g., through GitHub repositories, scholarly preprints and blog posts)"></IconItem>
              </div>

              <p className="mb-3">{`Note: Fellows are encouraged to continue their personal research for up to 20% of their time during the course of their fellowship (i.e., one day a week). Fellowship applicants must have buy-in from their advisors in advance, and include Advisors’ contact information on the application. Advisors will be interviewed separately should applicants move on to the second round, and their support will be a critical consideration for acceptance of fellows.`}</p>

              <h3 className="mb-1">Stipend and Financial Benefits</h3>

              <p>The Fellowships are designed to allow for flexibility for both Fellows and their families. The standard fellowship offers a stipend of $60,000 USD*, paid in 10 monthly installments. Fellows are responsible for remitting all applicable taxes and other government payments as required.</p>
              <p>To help offset cost of living, the fellowship also provides supplements for childcare and health insurance, and helps pay for research/equipment and books. The fellowships also covers the costs of required travel for fellowship activities.</p>

              <p className="mb-3">Fellows will receive:</p>

              <div className="mb-3">
                <IconItem imgSrc="/assets/img/fellowships/icon-stipend.svg" copy="a stipend of $60,000 USD*, paid in 10 monthly installments"></IconItem>
                <IconItem imgSrc="/assets/img/fellowships/icon-insurance.svg" copy="a one-time health insurance supplement for Fellows and their families, ranging from $3,500 for single Fellows to $7,000 for a couple with two or more children"></IconItem>
                <IconItem imgSrc="/assets/img/fellowships/icon-child.svg" copy="a one-time childcare allotment of up to $6,000 for families with children"></IconItem>
                <IconItem imgSrc="/assets/img/fellowships/icon-computer.svg" copy="an allowance of up to $3,000 towards the purchase of laptop computer, digital cameras, recorders and computer software; fees for continuing studies or other courses, research fees or payments, to the extent such purchases and fees are related to the fellowship"></IconItem>
                <IconItem imgSrc="/assets/img/fellowships/icon-trips.svg" copy="coverage in full for all approved fellowship trips – domestic and international"></IconItem>
                * Proposed fellowship amounts are gross amounts and may be reduced by applicable taxes in the various applicable jurisdictions. Read more <a href="/programs/fellowships/faq">here.</a>
              </div>

              <h3 className="mb-1">Eligibility Criteria</h3>
              <p>Fellows must be:</p>
              <div className="mb-3">
                <IconItem imgSrc="/assets/img/fellowships/icon-institution.svg" copy="be currently employed at a research institution"></IconItem>
                <IconItem imgSrc="/assets/img/fellowships/icon-stipend.svg" copy="have the ability to accept outside funds for this fellowship directly (i.e., not distributed through the institution)"></IconItem>
                <IconItem imgSrc="/assets/img/fellowships/icon-research.svg" copy="be an early-career researcher (i.e., graduate students, post-docs, research scientists, lecturers)"></IconItem>
                <IconItem imgSrc="/assets/img/fellowships/icon-life.svg" copy="specialize in scientific research: physical, life, social, library, or natural sciences"></IconItem>
                <IconItem imgSrc="/assets/img/fellowships/icon-travel.svg" copy="be able to travel"></IconItem>
                <IconItem imgSrc="/assets/img/fellowships/icon-approve.svg" copy="obtain support from their advisors. As fellows will be based at their home institutions, please note that a letter of support from their advisor is mandatory for consideration"></IconItem>
                <IconItem imgSrc="/assets/img/fellowships/icon-open.svg" copy="have experience participating in open communities"></IconItem>
              </div>
            </div>
            <div className="py-3" name="FAQ" slug="faq" iconDefault="/assets/img/icon-tab-faq.svg" iconActive="/assets/img/icon-tab-faq-blue.svg">
              <h2 className="mb-1">Application FAQ</h2>

              <Collapse>
                <Panel header={`I live outside of the US, UK or Canada - am I eligible?`}>
                  <p>{`Yes, as long as you are legally allowed to work in the country where you currently reside.`}</p>
                </Panel>

                <Panel header={`What disciplines are included in the eligible sciences?`}>
                  <p>{`Previously, our fellowship focused on the physical and natural sciences: biology, chemistry, earth science, physics, astronomy, ecology, etc.`}</p>
                  <p>{`We’ve opened this year’s application to include the social and library sciences; in fact, all scientific disiplines are welcome among our applicants. Strong attachment to furthering scientific research in some capacity is favored, and a recommended emphasis in the applications we receive.`}</p>
                </Panel>

                <Panel header={`I work at a research institution but not a "university" - can I still apply?`}>
                  <p>{`You bet! Government funded research institutions and groups (e.g., National Institutes of Health, Environmental Protection Agency, or research centers like NEON, BEACON, etc) as well as positions in other research institutions (e.g., Museum of Natural History and many Planetariums have research arms, as well) count!`}</p>
                  <p>{`Still unsure? Let us know - we'd be happy to talk it through.`}</p>
                </Panel>

                <Panel header={`I'm not currently at a university or research institution - can I still apply?`}>
                  <p>{`Fellows are required to be based at a university or research institution for the 10 month tenure. Mozilla cannot assist Fellows in finding placements.`}</p>
                </Panel>

                <Panel header={`Can I continue my research, coursework or teaching during this time?`}>
                  <p>{`It depends. Fellows are allowed to spend up to 20% of their time maintaining their work for their home institution - think, 1 day a week. Please note: This is a time commitment, and Fellows are expected to devote the bulk of their time to the Fellowship, their projects and interaction with the Mozilla community. If you have a standing commitment that you think may affect your time, please note in your application.`}</p>
                  <p>{`Fellowship applicants must have buy-in from their advisors in advance, and include advisors’ contact information on the application. Advisors will be interviewed separately should applicants move on to the second round, and their support will be a critical consideration for acceptance of fellows.`}</p>
                </Panel>

                <Panel header={`When are Fellowships intended to start? And end?`}>
                  <p>{`The anticipated start date for Fellows is in September 2017, running to the end of June 2018, for the 10 months of the fellowship duration. After the CFP launches in April, the application will be open through May 14th (a Sunday). The Science Lab team will review applications for the subsequent two weeks, and request interviews with applicants (two rounds of interviews) and their advisors before making offers in early June, and responding to all applicants by mid-June. Fellows will be announced officially in July.`}</p>
                </Panel>

                <Panel header={`When will we be notified if we're selected?`}>
                  <p>{`The notification date will vary depending on the volume of applications received but we project that prospective candidates will be contacted by the last week in June, 2017.`}</p>
                </Panel>

                <Panel header={`What sort of travel is expected?`}>
                  <p>{`Fellows are expected to be able to travel as part of the fellowship. Travel will include,  at a minimum: onboarding (likely late Sept / early October; location TBD), the Mozilla Festival (Oct. 27-29 in London), one workweek in 2017 (location TBD), a Working Open Workshop (location TBD), an “off-boarding” week at the conclusion of the fellowship (sometime in June; location TBD).`}</p>
                </Panel>

                <Panel header={`I'm a pre-tenure, early career faculty member - does that rule me out?`}>
                  <p>{`Not necessarily! Be sure to list your teaching commitments in the application, as there are travel obligations and expectations that we want to make sure you have adequate time for.`}</p>
                </Panel>

                <Panel header={`What role does my advisor play in this process?`}>
                  <p>{`We want to make sure Fellows, as they'll be working somewhat autonomously within their institution, are in supportive environments. We find this is best achieved with advisors who are supportive and tuned in to the challenges around open research practice and data sharing within the institution, and are open to Fellows working more full-time for 10 months to build momentum, teach, and collaborate to advance those goals within those labs and research settings.`}</p>
                </Panel>

                <Panel header={`How will I be funded over the Fellowship?`}>
                  <p>{`Funding and additional supplements for which fellows may be eligible are allocated to the individual directly on a monthly basis, not run through institutions. No university overhead-like arrangements - the funding goes straight to the Fellow themselves.`}</p>
                </Panel>

                <Panel header={`What are the tax considerations alluded to in the call for applications?`}>
                  <p>{`Proposed fellowship amounts are gross amounts and may be reduced by applicable taxes.  Fellows are responsible to pay all applicable taxes, whether in their home jurisdictions, the jurisdiction where the fellowship occurs, or any other jurisdiction.  In some cases Mozilla may be required to withhold taxes at the time of payment, and reduce the amount of fellows’ payments accordingly.  For instance, Mozilla may have to withhold up to 30% of any stipend payments attributable to fellowship activities taking place in the U.S., although fellows may be able to claim reduced rates of withholding or refund of a portion of these taxes. It is fellows’ responsibility to communicate in advance with Mozilla about where they will be located throughout the fellowship.`}</p>
                </Panel>
              </Collapse>
            </div>
            <div className="py-3" name="Fellows" slug="fellows" iconDefault="/assets/img/icon-tab-fellows.svg" iconActive="/assets/img/icon-tab-fellows-blue.svg">
              <h2>Our 2016 Fellows</h2>

              <p>The fellows chosen are representative of the change we want to see in the community, championing openness, collaboration, and mentorship in science. Over the next ten months, the fellows will work on projects to help their local communities engage with open data, open source software and teach forward to their peers. They will also receive training and support from Mozilla to hone their skills around open source, participatory learning, and data sharing.</p>

              <div className="row my-3">
                <div className="col-sm-3 center-vertical">
                  <img className="circle" src="/assets/img/fellowships/fellow-kirstie.png"/>
                </div>
                <div className="col-sm-9">
                  <h4 className="mb-0">Kirstie Whitaker</h4>
                  <p className="mb-1"><a href="https://twitter.com/kirstie_j" target="_blank">@kirstie_j</a> | <a href="http://www.kirstiewhitaker.com" target="_blank">Kirstie's Blog</a></p>
                  <p>A postdoctoral researcher in the <a href="http://www.bmu.psychiatry.cam.ac.uk" target="_blank">Brain Mapping Unit</a> at the <a href="http://www.cam.ac.uk/" target="_blank">University of Cambridge</a>. She studies adolescent brain development and is particularly interested in the emergence of mental health disorders during the teenage years. She uses network analyses to understand how different parts of the brain work work together and ensures all her analyses are reproducible by independent researchers. She's the founder and lead developer of the <a href="www.stemmrolemodels.com" target="_blank">STEMM Role Models</a> project which provides a database of experts from traditionally under-represented groups to ensure conference organizers are able to invite the most diverse and exciting speakers to their events. </p>
                </div>
              </div>

              <div className="row my-3">
                <div className="col-sm-3 center-vertical">
                  <img className="circle" src="/assets/img/fellowships/fellow-bruno.png"/>
                </div>
                <div className="col-sm-9">
                  <h4 className="mb-0">Bruno Miguel Pereira Vieira</h4>
                  <p className="mb-1"><a href="https://twitter.com/bmpvieira" target="_blank">@bmpvieira</a> | <a href="https://medium.com/@bmpvieira" target="_blank">Bruno's Blog</a></p>
                  <p>A bioinformatics and population genomics PhD student at <a href="http://wurmlab.github.io/" target="_blank">WurmLab</a> (<a href="http://www.qmul.ac.uk/" target="_blank">Queen Mary University of London</a>) and Node.js web developer. Researching how genetic diversity is affected by sociality in insects (e.g., ants and bees). He founded the open source community <a href="http://www.bionode.io/" target="_blank">Bionode.io</a> with the goal of improving modularity and reusability of tools and code in bioinformatics by leveraging innovation coming from the Node.js and Web communities. He's involved in other open source projects such as <a href="http://dat-data.com/" target="_blank">Dat</a> ("git for data") and <a href="https://github.com/biojs/biojs" target="_blank">BioJS</a> ("biological data visualization on the web”).</p>
                </div>
              </div>

              <div className="row my-3">
                <div className="col-sm-3 center-vertical">
                  <img className="circle" src="/assets/img/fellowships/fellow-danielle.png"/>
                </div>
                <div className="col-sm-9">
                  <h4 className="mb-0">Danielle Robinson</h4>
                  <p className="mb-1"><a href="https://twitter.com/daniellecrobins" target="_blank">@daniellecrobins</a> | <a href="http://www.daniellecrobinson.com/" target="_blank">Danielle's Blog</a></p>
                  <p>A cell biologist and Neuroscience PhD candidate at <a href="http://www.ohsu.edu/xd/education/schools/school-of-medicine/academic-programs/neuroscience-graduate-program/" target="_blank">Oregon Health and Science University</a> passionate about improving reproducibility and digital literacy in the sciences. She studies the role of phosphoinositide signaling in myelination in her dissertation project, collects terabytes of microscopy data, loves fancy microscopes, and enjoys policy work. She co-organizes <a href="ttp://openinsightpdx.com/" target="_blank">Open Insight PDX</a>, which seeks to build skills that enhance research reproducibility and facilitate discussion of issues surrounding publishing, data sharing, and copyright. She is a founding member of <a href="http://wisportland.weebly.com/" target="_blank">Women in Science Portland</a> and an organizer for <a href="http://portland.sciencehackday.org/" target="_blank">Science Hack Day Portland</a>.</p>
                </div>
              </div>

              <div className="row my-3">
                <div className="col-sm-3 center-vertical">
                  <img className="circle" src="/assets/img/fellowships/fellow-teon.png"/>
                </div>
                <div className="col-sm-9">
                  <h4 className="mb-0">Teon Brooks</h4>
                  <p className="mb-1"><a href="https://twitter.com/teon_io" target="_blank">@teon_io</a> | <a href="https://medium.com/the-traveling-scientist" target="_blank">Teon's Blog</a></p>
                  <p>A postdoctoral researcher at the <a href="http://reproducibility.stanford.edu/" target="_blank">Center for Reproducible Neuroscience</a> and the Department of Psychology at Stanford University. He studies the cognitive processes and temporal dynamics of the brain during reading. He is a core developer for <a href="https://github.com/mne-tools/mne-python/" target="_blank">MNE</a>, a community-driven project for analyzing time-series brain data in Python; and <a href="https://github.com/openexp/OpenEXP" target="_blank">OpenEXP</a>, an open science platform founded to be a "GitHub for Experiments" and a tool for running both behavioral and physiological experiments using open-source web-based tools. He is also developing curriculum, DIYCogSci, for teaching experimental research methods and coding using low-cost electronics and open-source hardware.</p>
                </div>
              </div>


              <h2>Our 2015 Fellows</h2>

              <div className="row my-3">
                <div className="col-sm-3 center-vertical">
                  <img className="circle" src="/assets/img/fellowships/fellow-richard.png"/>
                </div>
                <div className="col-sm-9">
                  <h4 className="mb-0">Richard Smith-Unna</h4>
                  <p className="mb-1"><a href="http://twitter.com/blahah404" target="_blank">@blahah404</a> | <a href="http://rik.smith-unna.com/" target="_blank">Richard's Blog</a></p>
                  <p>A computational biology PhD student at the <a href="http://www.cam.ac.uk/">University of Cambridge</a>. He is currently focused on understanding a particularly efficient kind of <a href="https://en.wikipedia.org/wiki/C4_carbon_fixation">photosynthesis called C4</a>. He develops and contributes to a wide array of open source software and teaching materials for bioinformatics, including the <a href="http://contentmine.org/">Content Mine</a>, Solvers.io, and <a href="https://github.com/BioJulia">BioJulia</a>. </p>
                </div>
              </div>

              <div className="row my-3">
                <div className="col-sm-3 center-vertical">
                  <img className="circle" src="/assets/img/fellowships/fellow-christie.png"/>
                </div>
                <div className="col-sm-9">
                  <h4 className="mb-0">Christie Bahlai</h4>
                  <p className="mb-1"><a href="http://twitter.com/cbahlai" target="_blank">@cbahlai</a> | <a href="https://practicaldatamanagement.wordpress.com/" target="_blank">Christie's Blog</a></p>
                  <p>An insect ecologist and post-doctoral research associate at <a href="http://msu.edu">Michigan State University</a>.  She works with the NSF-funded <a href="http://www.lternet.edu/">Long Term Ecological Research network</a>, and is interested in how we can use big(ish) ecological data and open science approaches to help build sustainable agricultural systems. She’s an instructor with <a href="http://software-carpentry.org">Software Carpentry</a> and <a href="http://www.datacarpentry.org/">Data Carpentry</a> and maintains a blog about open science and data management called <a href="https://practicaldatamanagement.wordpress.com/">Practical Data Management</a>.</p>
                </div>
              </div>

              <div className="row my-3">
                <div className="col-sm-3 center-vertical">
                  <img className="circle" src="/assets/img/fellowships/fellow-joey.png"/>
                </div>
                <div className="col-sm-9">
                  <h4 className="mb-0">Joey Lee</h4>
                  <p className="mb-1"><a href="http://twitter.com/leejoeyk" target="_blank">@leejoeyk</a> | <a href="http://jk-lee.com/blog/" target="_blank">Joey's Blog</a></p>
                  <p>A geographer and computational media artist from San Francisco, California passionate about technological literacy and the engagement of art and science through computation and collaboration. He is co-author of <a href="http://jk-lee.com/the-big-atlas-of-la-pools/">"The Big Atlas of LA Pools"</a> and co-creator of the <a href="https://www.kickstarter.com/projects/357538735/aerial-bold-kickstart-the-planetary-search-for-let">"Aerial Bold" Kickstarter project</a> (<a href="https://vimeo.com/108875406">video here</a>). He is currently based in Vancouver, Canada, balancing his time <a href="http://joeyklee.github.io/presentations/ubc_springsymposium2015">between his MSc research</a> and teaching at the <a href="http://www.ubc.ca/">University of British Columbia</a>, <a href="http://joeyklee.github.io/presentations/ubc_datavizcolloqium2015/">building</a> <a href="https://github.com/joeyklee/GEOB472/tree/master/workshops/01_shapes%26code">workshops</a> around opensource tools (e.g. <a href="http://maptime.io/vancouver/">Maptime Vancouver</a>), and <a href="http://jk-lee.com/">exploring projects around geography and technology</a>.</p>
                </div>
              </div>

              <div className="row my-3">
                <div className="col-sm-3 center-vertical">
                  <img className="circle" src="/assets/img/fellowships/fellow-jason.png"/>
                </div>
                <div className="col-sm-9">
                  <h4 className="mb-0">Jason Bobe</h4>
                  <p className="mb-1"><a href="http://twitter.com/jasonbobe" target="_blank">@jasonbobe</a> | <a href="http://blog.jasonbobe.net/" target="_blank">Jason's Blog</a></p>
                  <p>An Associate Professor and director of the Sharing Lab at the <a href="http://icahn.mssm.edu/departments-and-institutes/genomics">Icahn Institute for Genomics and Multiscale Biology at Mount Sinai</a> where he leads the <a href="http://resilienceproject.me/">Resilience Project</a> with Eric Schadt and Stephen Friend, a research study that aims to find and decode people who are able to avoid disease despite having genetic risk factors. He has founded two open science nonprofits, <a href="http://www.personalgenomes.org/">PersonalGenomes.org</a> &amp; <a href="http://diybio.org/">DIYbio</a>. With co-founder <a href="http://mad.printf.net/">Madeleine Ball</a>, he has created <a href="https://www.openhumans.org/">OpenHumans.org</a>, a platform that connects people and their data with researchers that practice equitable data sharing. With George Church, he coordinates the <a href="http://www.personalgenomes.org/harvard/global-network">Global Network of Personal Genome Projects,</a> now with sites in four countries. </p>
                </div>
              </div>

            </div>

          </TabSwitcher>

        </div>

        <div className="py-3 fellow-cta">
          <div className="container">
            <h3>Deadline for applications is May 14, 2017</h3>
            <a className="btn btn-white mb-2" href="https://mozilla-science-lab.forms.fm/mozilla-fellows-for-science-2017" target="_blank">Apply Now</a>
          </div>
        </div>

      </div>
    );
  }
}
