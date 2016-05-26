
import React from "react";
import ProjectCardFeatured from "../../components/project-card-featured/project-card-featured.jsx";
import Service from "../../../js/backend.js";
import UserList from "../../components/user-list/user-list.jsx";


export default React.createClass({

  getInitialState() {
    return {
      projectDetails: {}
    };
  },
  componentWillMount() {
    this.getProjectDetails();
  },
  getProjectDetails() {
    Service.project
      .get(this.props.params.id, {format: `json`, expand: `users,events`})
      .then((data) => { this.setState({projectDetails: data}); })
      .catch((reason) => { console.error(reason); });
  },
  render() {
    var project = this.state.projectDetails;

    return (
      <div id="project-details" className="container">
        <div className="row">
          <div className="jumbotron text-xs-center m-b-0 col-xs-12">
            <h2 className="col-xs-12">{project.name}</h2>
            <p className="lead col-xs-12 m-x-1">{project.short_description}</p>
            <div className="col-xs-12 m-t-2">
                <UserList users={project.users} role="Lead" />
                <UserList users={project.users} name={false} role="Volunteer" />
            </div>
          </div>
          <ProjectCardFeatured project={project} />
          <div className="col-xs-12 col-md-10 col-md-push-1">
            <h3>What we're doing</h3>
            <div dangerouslySetInnerHTML={{__html:project.description}} />
            <div className="text-xs-center p-t-1 p-b-3">
              <a hidden={!project.github_owner || !project.github_repository}  href={`https://github.com/${project.github_owner}/${project.github_repository}`} target="_blank" className="btn visit-repo">Visit Repo</a>
            </div>
          </div>
        </div>
      </div>
    );
  }
});
