
var converter = new Showdown.converter();


/* Featured Projects Box */

var FeatureBox = React.createClass({
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
        <ProjectImg project={project} key={project.route}>
        </ProjectImg>
      );
    });
    return (
      <div>
        {projectNodes}
      </div>
    );
  }
})


var ProjectImg = React.createClass({
  render: function() {
    var project = this.props.project,
        route = "/projects/" + project.route,
        image = "/img/projects/" + project.imageName;
    return (
      <div className="pure-u-1 pure-u-md-1-4">
        <a href={ route } className="project-img">
          <div >
            <img src={image} height="100%"/>
            <span> {project.title} </span>
          </div>
        </a>
      </div>
    );
  }
});


/* Project List */

var Project = React.createClass({
  render: function() {
    var project = this.props.project,
        route = "/projects/" + project.route,
        image = "/img/projects/" + project.imageName,
        summary = project.tweetable || project.who || project.summary;
    summary = converter.makeHtml(summary);
    return (
      <div className="project pure-g">
        <div className="pure-u-1 pure-u-md-1-4">
          <h3>
            <a href={route}>
              {project.title}
            </a>
          </h3>
          <div>
              {project.subjects.join(', ')}
          </div>
        </div>
        <div className="pure-u-md-3-4">
          <div className="pure-u-1 pure-u-lg-1-3">
            <i className="fa fa-user" />
            <label> { project.lead.name} </label>
          </div>
          <div className="pure-u-1 pure-u-lg-1-3">
            <i className="fa fa-map-marker" />
            <label> { project.institute} </label>
          </div>
          <div className="pure-u-1 pure-u-lg-1-3">
            <i className="fa fa-tag" />
            <label> { project.languages.join(', ')} </label>
          </div>
        </div>
        <div className="pure-u-1 pure-u-md-1-4 sidebar">
          <a href={ route }>
            <div className="crop">
              <img src={image} />
            </div>
          </a>
        </div>
        <div className="pure-u-1 pure-u-md-3-4">
          <p dangerouslySetInnerHTML={{__html: summary}} />
        </div>
      </div>
    );
  }
});





var ProjectBox = React.createClass({
  loadProjectsFromServer: function(args) {
    $.ajax({
      url: (args && args.query) ? '/api/projects/search/' + args.query : this.props.url,
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
    // setInterval(this.loadProjectsFromServer, this.props.pollInterval);
  },
  render: function() {
    return (
      <div id="projectbox">
        <SearchForm onSearchSubmit={this.loadProjectsFromServer} />
        <ProjectList data={this.state.data} />
      </div>
    );
  }
});

var SearchForm = React.createClass({
  handleSubmit: function(e) {
    e.preventDefault();
    var query = this.refs.query.getDOMNode().value.trim();
    this.props.onSearchSubmit({query: query});
    return;
  },
  render: function() {
    return (
      <form className="searchForm" onSubmit={this.handleSubmit}>
      <input type="text" placeholder="query" ref="query" />
      <input type="submit" value="Search" />
      </form>
    );
  }
});


var ProjectList = React.createClass({
  render: function() {
    var projectNodes = this.props.data.map(function(project, index) {
      return (
        <Project project={project} key={project.route}>
        </Project>
      );
    });
    return (
      <div id="project-list">
        {projectNodes}
      </div>
    );
  }
});

React.render(
  <FeatureBox url="/api/projects/featured"/>,
  document.getElementById('featured-projects')
);

React.render(
  <ProjectBox url="/api/projects"/>,
  document.getElementById('content')
);
