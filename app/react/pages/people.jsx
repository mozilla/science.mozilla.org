import React from "react";
import ProfileCard from "../components/profile-card/profile-card.jsx";

export default React.createClass({
  render() {
    return (
      <div id="people">
        <div className="jumbotron container text-xs-center m-b-0 p-b-1">
            <h2>People</h2>
            <p className="lead m-t-1">Meet the team behind Mozilla Science</p>
        </div>
        <div className="container-dynamic">
            <ProfileCard name="Alan Moo"/>
            <ProfileCard />
        </div>
      </div>
    );
  }
});
