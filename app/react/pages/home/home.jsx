import React from "react";

import Greeting from "../../components/greeting/greeting.jsx";
import ThreeUp from "../../components/three-up/three-up.jsx";

export default React.createClass({
  render() {
    return (
      <div id="page-home">
        <Greeting
          header="Transforming Science"
          subHeader="Mozilla Science Lab is a community of researchers, developers, and librarians making research open and accessible." />

        <ThreeUp
          item1={{text: `Maximizing access to papers, data, code, and materials so anyone can read and contribute`, icon: `/assets/img/icon-access.svg`}}
          item2={{text: `A community of researchers advocating for openness and collaboration`, icon: `/assets/img/icon-community.svg`}}
          item3={{text: `Open Science: A way for science to achieve its fullest potential`, icon: `/assets/img/icon-open.svg`}}></ThreeUp>
      </div>
    );
  }
});
