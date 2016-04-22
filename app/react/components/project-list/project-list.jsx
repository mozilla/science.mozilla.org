import React from "react";
import ProjectCard from "../../components/project-card/project-card.jsx";


export default React.createClass({
  propTypes: {
    project: React.PropTypes.array
  },
  getDefaultProps() {
    return {
      projects: []
    };
  },
  render() {
    return(
      <div className="row">
        {this.props.projects.map((project) => {
          return <ProjectCard key={project.id} className="col-md-4" isFeatured={false} project={project}/>;
        })}
      </div>
    );
  }
});
