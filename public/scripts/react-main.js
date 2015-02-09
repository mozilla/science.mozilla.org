
var converter = new Showdown.converter();

/* Event Box */
var EventBox = React.createClass({
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
        <Event ev={ev} key={ev.slug}>
        </Event>
      );
    });
    return (
      <ul className="fa-ul">
        {eventNodes}
      </ul>
    );
  }
})



var Event = React.createClass({
  render: function() {
    var ev = this.props.ev;
    return (
      <li>
        <i className="fa-li fa fa-calendar"></i>
        <a href={ ev.slug }>
          {ev.title}
        </a>,&nbsp;
        { moment(ev.start).format("MMM Do") } -&nbsp;
        { moment(ev.end).format("MMM Do YYYY") }
      </li>
    );
  }
});



/* People Box */

var PeopleBox = React.createClass({
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
        <Person person={person} key={person.username}>
        </Person>
      );
    });
    return (
      <div>
        {peopleNodes}
      </div>
    );
  }
})


var Person = React.createClass({
  render: function() {
    var person = this.props.person,
        slug = "/u/" + person.username;
    return (
      <div className="pure-u-1-2 pure-u-md-1-4 pure-u-lg-1-6 person-card">
        <div >
          <a href={ slug }>
            <img src={person.avatar_url}/>
            <h4> {person.name} </h4>
          </a>
          <a href={"/u/" + person.username} > {person.github_id} </a><br />
          <span> {person.company} </span>
        </div>
      </div>
    );
  }
});


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
        <ProjectImg project={project} key={project.slug}>
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
        slug = "/projects/" + project.slug,
        divStyle = { backgroundImage: 'url(' + project.image_url + ')',
                     height:'160px'};
    return (
      <div className="pure-u-1 pure-u-md-1-4">
        <a href={ slug } className="project-img">
          <div style={ divStyle }>
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
        slug = "/projects/" + project.slug,
        summary = project.short_description || project.description;
    summary = converter.makeHtml(summary);
    return (
      <div className="project pure-g">
        <div className="pure-u-1 pure-u-md-1-4">
          <h3>
            <a href={slug}>
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
            <label>
            {project.lead.map(function(item, i){return <a href={'/u/' + item.username }>{item.name}{(i==project.lead.length-1) ? "" : ","} </a>}) }
            </label>
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
          <a href={ slug }>
            <div className="crop">
              <img src={project.image_url} />
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
        <Project project={project} key={project.slug}>
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


/* Set up */

if(document.getElementById('featured-projects')){
  React.render(
    <FeatureBox url="/api/projects/featured"/>,
    document.getElementById('featured-projects')
  );
}

if(document.getElementById('content')){
  React.render(
    <ProjectBox url="/api/projects"/>,
    document.getElementById('content')
  );
}


if(document.getElementById('msl-people')){
  React.render(
    <PeopleBox url="/api/users"/>,
    document.getElementById('msl-people')
  );
}

if(document.getElementById('event-people')){
  React.render(
    <PeopleBox load_id="event-people" url="/api/events/x/people" />,
    document.getElementById('event-people')
  );
}

if(document.getElementById('event-attending')){
  React.render(
    <PeopleBox load_id="event-attending" url="/api/events/x/attending" />,
    document.getElementById('event-attending')
  );
}

if(document.getElementById('msl-events')){
  React.render(
    <EventBox url="/api/events/" />,
    document.getElementById('msl-events')
  );
}
