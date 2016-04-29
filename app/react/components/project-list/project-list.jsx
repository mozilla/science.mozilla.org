import React from "react";
import {Link} from "react-router";
import DataCard from "../../components/data-card/data-card.jsx";
import GithubAvatar from "../../components/github-avatar/github-avatar.jsx";


export default React.createClass({
  propTypes: {
    projects: React.PropTypes.array
  },
  getDefaultProps() {
    return {
      projects: []
    };
  },
  formatTags(project) {
    let tags = null;

    if (project.tags) {
      tags = (<div className="help-with p-y-1">Help with:&nbsp;
        {project.tags.map((tag)=> {
          return <span className="project-tag" key={tag}><Link to="#">{tag}</Link></span>;
        })}
      </div>
      );
    }
    return tags;
  },
  render() {
    return(
      <div className="row">
        {this.props.projects.map((project) => {
          return (
            <DataCard key={project.id} className="col-md-4" showPicture={false} categories={project.categories}>
              <div className="profile-photos">
                <GithubAvatar user={project.github_contributors[project.github_contributors.length-1]} />
              </div>
              <div>
                <Link to="#" className="names">User Name (awaiting API)</Link>
                <span> for </span>
                <span className="institution">{project.institution}</span>
              </div>
              <Link to={`projects/${project.id}`} className="project-name m-t-1">{project.name}</Link>
              <div className="project-description m-t-1">{project.short_description}</div>
              {this.formatTags(project)}
            </DataCard>
          );
        })}
      </div>
    );
  }
});
