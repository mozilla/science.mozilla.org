
import React from "react";
import {Link} from "react-router";

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
          <div className="categories">
            {project.categories.map((category) => {
              return <span key={category} className="category-tag">{category}</span>;
            }) }
          </div>
          <div className="profile-photos">
            <img className="profile-photo" src="https://avatars3.githubusercontent.com/u/1682681?v=3&s=40" srcSet="https://avatars3.githubusercontent.com/u/1682681?v=3&s=40, https://avatars3.githubusercontent.com/u/1682681?v=3&s=80 2x" width="40" height="40" alt="Contributor avatar"/>
          </div>
          <Link to="#" className="names">User Name (awaiting API)</Link>
          <span> for </span>
          <span className="institution">{project.institution}</span>
          <Link to="#" className="project-name m-t-1">{project.name}</Link>
          <div className="project-description m-t-1">{project.short_description}</div>
          {tags}
        </div>
      </div>
    );
  }
});
