import React from "react";
import ThreeUp from "../components/three-up/three-up.jsx";
import TabSwitcher from "../components/tab-switcher/tab-switcher.jsx";
import Collapse from "rc-collapse";
import RadioFilter from "../components/radio-filter/radio-filter.jsx";

let Panel = Collapse.Panel;

export default React.createClass({
  render() {
    let radioOptions = [
      {
        value: `featured`,
        label: `Featured Projects`
      },
      {
        value: `date_updated`,
        label: `Recently Updated`
      },
      {
        value: `date_created`,
        label: `Recently Added`
      },
      {
        value: `active`,
        label: `Most Active`
      },
      {
        value: `contributors`,
        label: `Most Contributors`
      }
    ];

    function handleRadioChange(choice) {
      console.log(`radioChange: ${choice}`);
    }

    return (
      <div className="container-dynamic">
        <h1>Style Guide</h1>

        <h2>Components</h2>

        <h3>TabSwitcher</h3>

        <h4>Hero Variant</h4>

        <TabSwitcher>
          <div name="About" iconDefault="/assets/img/icon-tab-overview.svg" iconActive="/assets/img/icon-tab-overview-blue.svg">About content.</div>
          <div name="Schedule" iconDefault="/assets/img/icon-tab-schedule.svg" iconActive="/assets/img/icon-tab-schedule-blue.svg">Schedule content.</div>
          <div name="Projects" iconDefault="/assets/img/icon-tab-projects.svg" iconActive="/assets/img/icon-tab-projects-blue.svg">Projects content.</div>
        </TabSwitcher>

        <h4>Inline Variant (.inline)</h4>

        <TabSwitcher className="inline">
          <div name="One" iconDefault="/assets/img/icon-tab-overview-blue.svg">One content.</div>
          <div name="Two" iconDefault="/assets/img/icon-tab-overview-blue.svg">Two content.</div>
          <div name="Three" iconDefault="/assets/img/icon-tab-overview-blue.svg">Three content.</div>
          <div name="Four" iconDefault="/assets/img/icon-tab-overview-blue.svg">Four content.</div>
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

        <h3>Accordion</h3>

        <div className="m-b-1">
          <Collapse accordion={false}>
            <Panel header="Heading 1">Forage flexitarian salvia migas fashion axe, meggings locavore poutine. Lo-fi plaid PBR&B, umami pinterest swag authentic beard cold-pressed. Ennui selfies scenester, kickstarter raw denim ramps disrupt forage keffiyeh put a bird on it. Direct trade helvetica umami messenger bag echo park typewriter chicharrones, williamsburg iPhone polaroid offal retro marfa. Offal cronut disrupt banh mi, kitsch shabby chic deep v schlitz intelligentsia letterpress affogato kogi. Green juice tacos austin gochujang, chillwave food truck chambray 8-bit master cleanse forage paleo bespoke. Yr squid ethical irony kickstarter, man braid paleo salvia man bun cred ugh tote bag post-ironic.</Panel>
            <Panel header="Heading 2">Forage flexitarian salvia migas fashion axe, meggings locavore poutine. Lo-fi plaid PBR&B, umami pinterest swag authentic beard cold-pressed. Ennui selfies scenester, kickstarter raw denim ramps disrupt forage keffiyeh put a bird on it. Direct trade helvetica umami messenger bag echo park typewriter chicharrones, williamsburg iPhone polaroid offal retro marfa. Offal cronut disrupt banh mi, kitsch shabby chic deep v schlitz intelligentsia letterpress affogato kogi. Green juice tacos austin gochujang, chillwave food truck chambray 8-bit master cleanse forage paleo bespoke. Yr squid ethical irony kickstarter, man braid paleo salvia man bun cred ugh tote bag post-ironic.</Panel>
          </Collapse>
        </div>

        <h3>SortFilter</h3>

        <RadioFilter options={radioOptions} initialChoice={`date_created`} onChange={handleRadioChange}></RadioFilter>

      </div>
    );
  }
});
