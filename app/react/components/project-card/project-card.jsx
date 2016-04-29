
import React from "react";
import {Link} from "react-router";
import GithubAvatar from "../../components/github-avatar/github-avatar.jsx";
import Categories from "../../components/categories/categories.jsx";

export default React.createClass({
  propTypes: {
    className: React.PropTypes.string,
    project: React.PropTypes.object.isRequired,
    isFeatured: React.PropTypes.bool
  },
  getDefaultProps() {
    return{
      isFeatured: false
    };
  },
  render() {
    let project = this.props.project;
    let tags = null;

    if (project.tags) {
      tags = (<div className="help-with p-y-1">Help with:&nbsp;
        {project.tags.map((tag)=> {
          return <span className="project-tag" key={tag}><Link to="#">{tag}</Link></span>;
        })}
      </div>
      );
    }

    return (
      <div className={`project-card-wrapper ` + this.props.className}>
        <div className="project-card">
          {this.props.isFeatured ? <img className="featured-image" src={project.image_url} /> : null }
          <Categories categories={project.categories} />
          <div className="project-card-details">
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
            {tags}
          </div>
        </div>
      </div>
    );
  }
});
