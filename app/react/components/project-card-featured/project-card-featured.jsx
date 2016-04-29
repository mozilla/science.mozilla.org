
import React from "react";
import {Link} from "react-router";
import Categories from "../../components/categories/categories.jsx";

export default React.createClass({
  propTypes: {
    className: React.PropTypes.string,
    project: React.PropTypes.object.isRequired,
    isFeatured: React.PropTypes.bool
  },
  getDefaultProps() {
    return {
      isFeatured: false
    };
  },
  render() {
    let project = this.props.project;
    let tags = null;
    let events = null;
    let links = null;
    let institution = null;

    if(project.institution) {
      institution = (
        <div>
          <h6 className="detail-label">Institution</h6>
          <p><Link to="#">{project.institution}</Link></p>
        </div>
      );
    }

    if(project.links && project.links.length) {
      links = (
        <div>
          <h6 className="detail-label">Other Links</h6>
        </div>
      );
    }

    if(project.events && project.events.length) {
      events = (
        <div>
        <h6 className="detail-label">Related Events</h6>
          {project.events.map(event=>{
            return <span>{event}</span>;
          })}
        </div>
      );
    }

    if (project.tags) {
      tags = (
        <div>
          <h6 className="detail-label">Needs Help With</h6>
          {project.tags.map((tag)=> {
            return <span className="project-tag" key={tag}><Link to="#">{tag}</Link></span>;
          })}
        </div>
      );
    }

    return (
      <div className={`project-card-wrapper col-md-10 col-md-push-1`}>
        <div className="project-card-featured row">
          <div className="col-xs-12 col-sm-6 p-x-0">
            <div className="m-x-1">
              <Categories className="m-x-1" categories={project.categories}/>
            </div>
            <img className="featured-image" src={project.image_url} alt=""/>
          </div>
          <div className="col-xs-12 col-sm-6 project-card-details">
            {institution}
            {tags}
            {events}
            {links}
          </div>
        </div>
      </div>
    );
  }
});
