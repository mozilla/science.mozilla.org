
import React from "react";
import {Link} from "react-router";
import Categories from "../../components/categories/categories.jsx";

export default class ProjectCardFeatured extends React.Component {

  render() {

    let project = this.props.project;
    let tags = null;
    let events = null;
    let links = null;
    let institution = null;

    if(project.institution) {
      institution = (
        <div className="project-card-detail-set">
          <h6 className="detail-label">Institution</h6>
          <p>{project.institution}</p>
        </div>
      );
    }

    if(project.links && project.links.length) {
      links = (
        <div className="project-card-detail-set">
          <h6 className="detail-label">Other Links</h6>
          {project.links.map((link, index)=>{
            return <span key={index} className="comma-list"><a href={link.url} target="_blank">{link.title}</a></span>;
          })}
        </div>
      );
    }

    if(project.events && project.events.length) {
      events = (
        <div className="project-card-detail-set">
        <h6 className="detail-label">Related Events</h6>
          {project.events.map(event=>{
            return <span key={event.id} className="comma-list"><Link to={`programs/events/${event.slug}`}>{event.name}</Link></span>;
          })}
        </div>
      );
    }

    if (project.tags) {
      tags = (
        <div className="project-card-detail-set">
          <h6 className="detail-label">Needs Help With</h6>
          {project.tags.map((tag)=> {
            return <span className="comma-list" key={tag}>{tag}</span>;
          })}
        </div>
      );
    }

    return (
      <div className={`project-card-wrapper col-md-10 col-md-push-1`}>
        <div className="project-card-featured row">
          <div className="col-xs-12 col-sm-6 px-0">
            <div className="mx-1">
              <Categories className="mx-1" categories={project.categories}/>
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
}

ProjectCardFeatured.propTypes = {
  className: React.PropTypes.string,
  project: React.PropTypes.object.isRequired,
  isFeatured: React.PropTypes.bool
};

ProjectCardFeatured.defaultProps = {
  isFeatured: false
};
