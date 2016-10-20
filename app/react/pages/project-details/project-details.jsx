
import React from "react";
import ProjectCardFeatured from "../../components/project-card-featured/project-card-featured.jsx";
import Service from "../../../js/backend.js";
import UserList from "../../components/user-list/user-list.jsx";


export default React.createClass({

  getInitialState() {
    return {
      projectDetails: {
        users: []
      }
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
    // Get leads as an array so I can pass it to UserList of github_contributors
    let leads = project.users.filter(user=>{ return user.role===`Lead`; });

    return (
      <div id="project-details" className="container">
        <div className="row flex-items-xs-center">
          <div className="jumbotron text-xs-center mb-0 col-xs-12">
            <h2 className="col-xs-12">{project.name}</h2>
            <p className="lead col-xs-12 mx-1">{project.short_description}</p>
            <div className="col-xs-12 mt-2">
                <UserList users={project.users} role="Lead" />
                <UserList users={project.github_contributors} name={false} exclude={leads}/>
                <UserList users={project.users} name={false} role="Volunteer" exclude={project.github_contributors}/>
            </div>
          </div>
          <ProjectCardFeatured project={project} />
          <div className="col-xs-12 col-md-10 pt-2">
            <h3>What we're doing</h3>
            <div dangerouslySetInnerHTML={{__html:project.description}} />
            <div className="text-xs-center pt-1 pb-3">
              <a hidden={!project.github_owner || !project.github_repository} href={`https://github.com/${project.github_owner}/${project.github_repository}`} target="_blank" className="btn btn-outline-info visit-repo">Visit Repo</a>
            </div>
          </div>
        </div>
      </div>
    );
  }
});
