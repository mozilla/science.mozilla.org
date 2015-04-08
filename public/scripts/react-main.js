
var converter = new Showdown.converter();



/* Event Box */
var RepoList = React.createClass({displayName: "RepoList",
  loadRepoFromServer: function(args) {
    $.ajax({
      url: (args && args.query) ? this.props.url + '/' + args.query : this.props.url,
      dataType: 'json',
      success: function(data) {
        this.setState({data: data});
      }.bind(this),
      error: function(xhr, status, err) {
        console.error(this.props.url, status, err.toString());
      }.bind(this)
    });
    $.ajax({
      url: '/api/auth/orgs/',
      dataType: 'json',
      success: function(data) {
        data.unshift({login:''});
        this.setState({orgs: data});
      }.bind(this),
      error: function(xhr, status, err) {
        console.error(status, err.toString());
      }.bind(this)
    });
  },
  getInitialState: function() {
    return {data: [], orgs:[]};
  },
  componentDidMount: function() {
    this.loadRepoFromServer();
  },
  handleOrgChange: function(e) {
    var org = this.refs.orgs.getDOMNode().value;
    this.setState({data:[]});
    this.loadRepoFromServer({query: org});
    return;
  },
  render: function() {
    var repoNodes = this.state.data.map(function(repo, index) {
      return (
        React.createElement(Repo, {repo: repo, key: repo.id}
        )
      );
    });
    var orgNodes = this.state.orgs.map(function(org, index) {
      return (
        React.createElement(Org, {org: org, key: org.login}
        )
      );
    });
    return (
      React.createElement("div", {id: "github-select"}, 
        React.createElement("div", null, 
          React.createElement("label", null, "Organization"), React.createElement("br", null), 
          React.createElement("select", {onChange: this.handleOrgChange, ref: "orgs"}, 
            orgNodes
          )
        ), 
        React.createElement("div", null, 
          React.createElement("label", null, "Repository"), React.createElement("br", null), 
          React.createElement("select", {name: "full_name"}, 
            repoNodes
          )
        )
      )
    );
  }
});


var Repo = React.createClass({displayName: "Repo",
  render: function() {
    var repo = this.props.repo;
    return (
      React.createElement("option", {value: repo.full_name}, 
          repo.full_name
      )
    );
  }
});

var Org = React.createClass({displayName: "Org",
  render: function() {
    var org = this.props.org;
    return (
      React.createElement("option", {value: org.login}, 
          org.login
      )
    );
  }
});







/* Event Box */
var EventBox = React.createClass({displayName: "EventBox",
  loadUsersFromServer: function() {
    $.ajax({
      url: this.props.url,
      dataType: 'json',
      success: function(data) {
        this.setState({data: data});
      }.bind(this),
      error: function(xhr, status, err) {
        console.error(this.props.url, status, err.toString());
      }.bind(this)
    });
  },
  getInitialState: function() {
    return {data: []};
  },
  componentDidMount: function() {
    this.loadUsersFromServer();
  },
  render: function() {
    var eventNodes = this.state.data.map(function(ev, index) {
      return (
        React.createElement(Event, {ev: ev, key: ev.slug}
        )
      );
    });
    return (
      React.createElement("ul", {className: "fa-ul"}, 
        eventNodes
      )
    );
  }
})



var Event = React.createClass({displayName: "Event",
  render: function() {
    var ev = this.props.ev;
    return (
      React.createElement("li", null, 
        React.createElement("i", {className: "fa-li fa fa-calendar"}), 
        React.createElement("a", {href:  ev.slug}, 
          ev.title
        ), ", ", 
         moment(ev.start).format("MMM Do"), " - ", 
         moment(ev.end).format("MMM Do YYYY") 
      )
    );
  }
});



/* People Box */

var PeopleBox = React.createClass({displayName: "PeopleBox",
  loadUsersFromServer: function() {
    var url = $('#' + this.props.load_id).data('url');
    $.ajax({
      url: url || this.props.url,
      dataType: 'json',
      success: function(data) {
        this.setState({data: data});
      }.bind(this),
      error: function(xhr, status, err) {
        console.error(this.props.url, status, err.toString());
      }.bind(this)
    });
  },
  getInitialState: function() {
    return {data: []};
  },
  componentDidMount: function() {
    this.loadUsersFromServer();
  },
  render: function() {
    var peopleNodes = this.state.data.map(function(person, index) {
      return (
        React.createElement(Person, {person: person, key: person.username}
        )
      );
    });
    return (
      React.createElement("div", null, 
        peopleNodes
      )
    );
  }
})


var Person = React.createClass({displayName: "Person",
  render: function() {
    var person = this.props.person,
        slug = "/u/" + person.username;
    return (
      React.createElement("div", {className: "pure-u-1-2 pure-u-md-1-4 pure-u-lg-1-6 person-card"}, 
        React.createElement("div", null, 
          React.createElement("a", {href:  slug }, 
            React.createElement("img", {src: person.avatar_url}), 
            React.createElement("h4", null, " ", person.name, " ")
          ), 
          React.createElement("a", {href: "/u/" + person.username}, " ", person.github_id, " "), React.createElement("br", null), 
          React.createElement("span", null, " ", person.company, " ")
        )
      )
    );
  }
});


/* Featured Projects Box */

var FeatureBox = React.createClass({displayName: "FeatureBox",
  loadProjectsFromServer: function() {
    $.ajax({
      url: this.props.url,
      dataType: 'json',
      success: function(data) {
        this.setState({data: data});
      }.bind(this),
      error: function(xhr, status, err) {
        console.error(this.props.url, status, err.toString());
      }.bind(this)
    });
  },
  getInitialState: function() {
    return {data: []};
  },
  componentDidMount: function() {
    this.loadProjectsFromServer();
  },
  render: function() {
    var projectNodes = this.state.data.map(function(project, index) {
      return (
        React.createElement(ProjectImg, {project: project, key: project.slug}
        )
      );
    });
    return (
      React.createElement("div", null, 
        projectNodes
      )
    );
  }
})


var ProjectImg = React.createClass({displayName: "ProjectImg",
  render: function() {
    var project = this.props.project,
        slug = "/projects/" + project.slug,
        divStyle = { backgroundImage: 'url(' + project.image_url + ')',
                     height:'160px'};
    return (
      React.createElement("div", {className: "pure-u-1 pure-u-md-1-5 person-card"}, 
        React.createElement("a", {href:  slug, className: "project-img"}, 
          React.createElement("div", {style:  divStyle }
          ), 
          React.createElement("h4", null, " ", project.title)
        )
      )
    );
  }
});


/* Project List */

var Project = React.createClass({displayName: "Project",
  render: function() {
    var project = this.props.project,
        slug = "/projects/" + project.slug,
        summary = project.short_description || project.description,
        status = this.props.status,
        statusClass = "fa fa-circle ";
    statusClass += project.status == 'active' ? 'text-success' : (project.status == 'closed' || project.status == 'complate') ? 'text-danger' : 'text-warning';
    summary = converter.makeHtml(summary);
    return (
      React.createElement("div", {className: "project pure-g"}, 
        React.createElement("div", {className: "pure-u-1 pure-u-md-1-4"}, 
          React.createElement("h3", null, 
            React.createElement("a", {href: slug}, 
              project.title
            )
          ), 
          React.createElement("div", null, 
              project.subjects.join(', ')
          )
        ), 
        React.createElement("div", {className: "pure-u-md-3-4"}, 
          React.createElement("div", {className: "pure-u-1 pure-u-lg-1-4"}, 
            React.createElement("i", {className: "fa fa-user"}), 
            React.createElement("label", null, 
            project.lead.map(function(item, i){return React.createElement("a", {href: '/u/' + item.username}, item.name, (i==project.lead.length-1) ? "" : ",", " ")}) 
            )
          ), 
          React.createElement("div", {className: "pure-u-1 pure-u-lg-1-4"}, 
            React.createElement("i", {className: "fa fa-map-marker"}), 
            React.createElement("label", null, " ",  project.institute, " ")
          ), 
          React.createElement("div", {className: "pure-u-1 pure-u-lg-1-4"}, 
            React.createElement("i", {className: "fa fa-tag"}), 
            React.createElement("label", null, " ",  project.languages.join(', '), " ")
          ), 
          React.createElement("div", {className: "pure-u-1 pure-u-lg-1-4"}, 
            React.createElement("i", {className: statusClass}), 
            React.createElement("label", null, " ", project.status, " ")
          )
        ), 
        React.createElement("div", {className: "pure-u-1 pure-u-md-1-4 sidebar"}, 
          React.createElement("a", {href:  slug }, 
            React.createElement("div", {className: "crop"}, 
              React.createElement("img", {src: project.image_url || '/img/placeholder.png'})
            )
          )
        ), 
        React.createElement("div", {className: "pure-u-1 pure-u-md-3-4"}, 
          React.createElement("p", {dangerouslySetInnerHTML: {__html: summary}})
        )
      )
    );
  }
});





var ProjectBox = React.createClass({displayName: "ProjectBox",
  loadProjectsFromServer: function(args) {
    $.ajax({
      url: (args && args.query) ? this.props.url + '/search/' + args.query : this.props.url,
      dataType: 'json',
      success: function(data) {
        this.setState({data: data});
      }.bind(this),
      error: function(xhr, status, err) {
        console.error(this.props.url, status, err.toString());
      }.bind(this)
    });
  },
  handleProjectSubmit: function(project) {
    var projects = this.state.data;
    projects.push(project);
    this.setState({data: projects}, function() {
      // `setState` accepts a callback. To avoid (improbable) race condition,
      // `we'll send the ajax request right after we optimistically set the new
      // `state.
      $.ajax({
        url: this.props.url,
        dataType: 'json',
        type: 'POST',
        data: project,
        success: function(data) {
          this.setState({data: data});
        }.bind(this),
        error: function(xhr, status, err) {
          console.error(this.props.url, status, err.toString());
        }.bind(this)
      });
    });
  },
  getInitialState: function() {
    return {data: []};
  },
  componentDidMount: function() {
    this.loadProjectsFromServer();
  },
  render: function() {
    if(this.props.status == "myproject"){
      return (
        React.createElement("div", {id: "projectbox"}, 
          React.createElement(ProjectList, {data: this.state.data, status: false})
        )
      );
    } else {
      return (
        React.createElement("div", {id: "projectbox"}, 
          React.createElement(SearchForm, {onSearchSubmit: this.loadProjectsFromServer}), 
          React.createElement(ProjectList, {data: this.state.data, status: true})
        )
      );
    }
  }
});

var SearchForm = React.createClass({displayName: "SearchForm",
  handleSubmit: function(e) {
    e.preventDefault();
    var query = this.refs.query.getDOMNode().value.trim();
    this.props.onSearchSubmit({query: query});
    return;
  },
  render: function() {
    return (
      React.createElement("form", {className: "searchForm", onSubmit: this.handleSubmit}, 
      React.createElement("input", {type: "text", placeholder: "query", ref: "query"}), 
      React.createElement("input", {type: "submit", value: "Search"})
      )
    );
  }
});


var ProjectList = React.createClass({displayName: "ProjectList",
  render: function() {
    var status = this.props.status;
    var projectNodes = this.props.data.map(function(project, index) {
      return (
        React.createElement(Project, {project: project, key: project.slug, status: status}
        )
      );
    });
    if(projectNodes.length >0) {
      return (
        React.createElement("div", {id: "project-list"}, 
          projectNodes
        )
      );
    } else {
      return (
        React.createElement("p", null, 
          "No projects here yet. ", 
          React.createElement("a", {href: "/projects/submit"}, "Click here to submit a project")
        )
      );
    }
  }
});




/* Set up */

if(document.getElementById('featured-projects')){
  React.render(
    React.createElement(FeatureBox, {url: "/api/projects/featured"}),
    document.getElementById('featured-projects')
  );
}

if(document.getElementById('content')){
  React.render(
    React.createElement(ProjectBox, {url: "/api/projects"}),
    document.getElementById('content')
  );
}

if(document.getElementById('my-projects')){
  React.render(
    React.createElement(ProjectBox, {url: "/api/auth/projects", status: "myproject"}),
    document.getElementById('my-projects')
  );
}

if(document.getElementById('msl-people')){
  React.render(
    React.createElement(PeopleBox, {url: "/api/users"}),
    document.getElementById('msl-people')
  );
}

if(document.getElementById('event-people')){
  React.render(
    React.createElement(PeopleBox, {load_id: "event-people", url: "/api/events/x/people"}),
    document.getElementById('event-people')
  );
}

if(document.getElementById('event-attending')){
  React.render(
    React.createElement(PeopleBox, {load_id: "event-attending", url: "/api/events/x/attending"}),
    document.getElementById('event-attending')
  );
}

if(document.getElementById('msl-events')){
  React.render(
    React.createElement(EventBox, {url: "/api/events/"}),
    document.getElementById('msl-events')
  );
}

if(document.getElementById('upcoming-events')){
  React.render(
    React.createElement(EventBox, {url: "/api/events/upcoming"}),
    document.getElementById('upcoming-events')
  );
}

if(document.getElementById('repo-list')){
  React.render(
    React.createElement(RepoList, {url: "/api/auth/repos"}),
    document.getElementById('repo-list')
  );
}
