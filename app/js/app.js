import React from "react";
import Greeting from "./components/greeting.jsx";

React.render(
  <Greeting
    header="Transforming Science"
    subHeader="Mozilla Science Lab is a community of researchers, developers, and librarians making research open and accessible."
    />,
  document.querySelector(`#app`)
);
