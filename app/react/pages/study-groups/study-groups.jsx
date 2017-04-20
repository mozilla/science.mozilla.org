import React from "react";
import TabSwitcher from "../../components/tab-switcher/tab-switcher.jsx";
import Join from "./join-study-group.jsx";
import Run from "./run-study-group.jsx";


export default class StudyGroups extends React.Component {

  switchTabs = (tab) => {
    this.refs.tabSwitcher.setState({activeTab: tab});
    window.scroll(0,0);
  }

  render() {

    return (
        <div id="study-groups">
          <div className="jumbotron jumbotron-fluid text-xs-center mb-0">
            <div className="container mb-2 py-2">
              <div className="row flex-items-xs-center">
                <h2 className="col-xs-12">Study Groups</h2>
                <p className="lead mt-1 col-xs-12 col-lg-10 col-xl-8">Connect with like-minded researchers at a regular, recurring Study Group session on your campus. If there’s not a Study Group on your campus, help start one!</p>
              </div>
            </div>
          </div>
          <div className="container">
            <TabSwitcher baseURL={`/programs/studygroups/`} initialTab={this.props.params.tab} ref="tabSwitcher" className="pull-up">
              <div slug="join" name="Join a Study Group" iconDefault="/assets/img/icon-tab-join.svg" iconActive="/assets/img/icon-tab-join-blue.svg">
                <Join switchTabs={this.switchTabs}/>
              </div>
              <div slug="run" className="pb-2" name="Run a Study Group" iconDefault="/assets/img/icon-tab-run.svg" iconActive="/assets/img/icon-tab-run-blue.svg">
                <Run/>
              </div>
            </TabSwitcher>
          </div>
      </div>
    );
  }
}
