import React from "react";

import Greeting from "../components/greeting.jsx";

export default React.createClass({
  render() {
    return (
      <Greeting
        header="Transforming Science"
        subHeader="Mozilla Science Lab is a community of researchers, developers, and librarians making research open and accessible." />
    );
  }
});
