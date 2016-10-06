import React from "react";
import ProfileCard from "../components/profile-card/profile-card.jsx";

var people = [
  {
    name: `Stephanie Wright`,
    title: `Lead`,
    image: `https://avatars0.githubusercontent.com/u/14626242?v=3&s=400`,
    links: [<a href="https://twitter.com/shefw">@shefw</a>],
    bio: `Stephanie joined the team after forming and leading the Research Data Services unit in the University of Washington Libraries. While there she was also Senior Data Science Fellow for the UW's eScience Institute. She brings expertise in data management, sharing and curation to the team. Steph is a self-proclaimed data geek and believer in open and easy access to data.`
  },
  {
    name: `Zannah Marsh`,
    title: `Learning Strategist`,
    image: `https://avatars3.githubusercontent.com/u/13855390?v=3&s=400`,
    links: [<a href="https://twitter.com/zannahlou">@zannahlou</a>],
    bio: `Zannah draws on her background in interaction design, project-based learning, visual art, and storytelling to create “sticky” learning experiences around technology and design. She's taught web design, programming, interaction design, and data visualization at NYU, the New School, and in the City University of New York system. She was Senior Content Developer at the interactive design firm Local Projects, and an exhibit developer for the Museum of Science in Boston. In her spare time Zannah draws mini-comics and rides her bike around Brooklyn.`
  },
  {
    name: `Aurelia Moser`,
    title: `Community Lead`,
    image: `https://avatars3.githubusercontent.com/u/1559703?v=3&s=400`,
    links: [<a href="https://twitter.com/auremoser">@auremoser</a>],
    bio: `Aurelia is a creative developer building community around code at the Science Lab. Previously of Ushahidi, Internews-Kenya, and CartoDB, she has a background that blends a cocktail of conservation chemistry and coding for civic tech/non-profit journalism. Recent projects have had mapping sensor data to support agricultural security and sustainable apis ecosystems in the Global South, though she also dabbles in DJing and privacy art. As her about yoga, semantic web theory, web-mapping, and organic chem.`
  }
];

export default React.createClass({
  render() {
    return (
      <div id="people">
        <div className="jumbotron container text-xs-center m-b-0 p-b-1">
            <h2>People</h2>
            <p className="lead m-t-1">Meet the team behind Mozilla Science</p>
        </div>
        <div className="container-dynamic">
            {people.map((person) => {
              return <ProfileCard {...person}>{person.bio}</ProfileCard>;
            })}
        </div>
      </div>
    );
  }
});
