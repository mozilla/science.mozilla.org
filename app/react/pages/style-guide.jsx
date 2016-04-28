import React from "react";
import ThreeUp from "../components/three-up/three-up.jsx";
import TabSwitcher from "../components/tab-switcher/tab-switcher.jsx";

export default React.createClass({
  render() {
    return (
      <div className="container-dynamic">
        <h1>Style Guide</h1>

        <h2>Components</h2>

        <h3>TabSwitcher</h3>

        <h4>Hero Variant</h4>

        <TabSwitcher>
          <div name="About">About content.</div>
          <div name="Schedule">Schedule content.</div>
          <div name="Projects">Projects content.</div>
        </TabSwitcher>

        <h4>Inline Variant (.inline)</h4>

        <TabSwitcher className="inline">
          <div name="One">One content.</div>
          <div name="Two">Two content.</div>
          <div name="Three">Three content.</div>
          <div name="Four">Four content.</div>
        </TabSwitcher>

        <h3>ThreeUp</h3>

        <ThreeUp
          hasCircle={true}
          item1={{text: `Lorem ipsum dolor sit amet.`, icon: `/assets/img/icon-access.svg`}}
          item2={{text: `Lorem ipsum dolor sit amet.`, icon: `/assets/img/icon-community.svg`}}
          item3={{text: `Lorem ipsum dolor sit amet.`, icon: `/assets/img/icon-open.svg`}}></ThreeUp>

        <h3>ShadowBox</h3>

        <div className="shadow-box">
          <div>
            <h2>Lorem Ipsum</h2>
            <a href="#" className="btn">Click me</a>
          </div>
        </div>

      </div>
    );
  }
});
