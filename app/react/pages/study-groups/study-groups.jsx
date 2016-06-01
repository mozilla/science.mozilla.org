import React from "react";
import TabSwitcher from "../../components/tab-switcher/tab-switcher.jsx";
import Join from "./join-study-group.jsx";
import Run from "./run-study-group.jsx";


export default React.createClass({
  switchTabs(tab) {
    this.refs.tabSwitcher.setState({activeTab: tab});
    window.scroll(0,0);
  },
  render() {
    return (
        <div id="study-groups">
          <div className="jumbotron jumbotron-fluid text-xs-center m-b-0">
            <div className="container m-b-2 p-y-2">
              <div className="row">
                <h2 className="col-xs-12">Study Groups</h2>
                <p className="lead m-t-1 col-xs-12 col-lg-10 col-lg-push-1 col-xl-8 col-xl-push-2">Connect with like-minded researchers at a regular, recurring Study Group session on your campus. If there’s not a Study Group on your campus, help start one!</p>
              </div>
            </div>
          </div>
          <div className="container">
            <TabSwitcher ref="tabSwitcher" className="pull-up">
              <div name="Join a Study Group" iconDefault="/assets/img/icon-tab-join.svg" iconActive="/assets/img/icon-tab-join-blue.svg">
                <Join switchTabs={this.switchTabs}/>
              </div>
              <div name="Run a Study Group" iconDefault="/assets/img/icon-tab-run.svg" iconActive="/assets/img/icon-tab-run-blue.svg">
                <Run/>
              </div>
            </TabSwitcher>
          </div>
      </div>
    );
  }
});
