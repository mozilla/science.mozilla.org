import React from "react";
import ThreeUp from "../components/three-up/three-up";

export default React.createClass({
  render() {
    return (
      <div>
        <h1>Style Guide</h1>

        <h2>Components</h2>

        <h3>ThreeUp</h3>
        <ThreeUp
          item1={{text: `Lorem ipsum dolor sit amet.`, icon: `/assets/img/icon-access.svg`}}
          item2={{text: `Lorem ipsum dolor sit amet.`, icon: `/assets/img/icon-community.svg`}}
          item3={{text: `Lorem ipsum dolor sit amet.`, icon: `/assets/img/icon-open.svg`}}></ThreeUp>
      </div>
    );
  }
});
