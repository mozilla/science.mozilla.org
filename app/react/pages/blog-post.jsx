import React from "react";
import Moment from "moment-timezone";
import Service from "../../js/backend.js";

export default React.createClass({
  componentWillMount: function () {
    Service.blogPost
      .get(this.props.params.slug)
      .then((post) => { this.setState({post: post[0]}); })
      .catch((reason) => { console.error(reason); });
  },
  getInitialState: function () {
    return {
      post: null
    };
  },
  render() {
    if (this.state.post) {
      let tags = this.state.post.terms.category.filter((tag) => {
        return tag.slug !== `uncategorized`;
      }).map((tag, index) => {
        return (
          <span key={index} className="category-tag">{tag.slug}</span>
        );
      });

      return (
        <div id="blog-post">
          <div className="jumbotron container text-xs-center m-b-3 p-b-1">
            <h2 className="m-b-2">{this.state.post.title}</h2>
            <p className="m-b-2">by {this.state.post.author.name} on {new Moment(this.state.post.date).format(`MMM D, YYYY`)}</p>
            <div className="tags">{tags}</div>
          </div>
          <div className="container-dynamic p-b-2" dangerouslySetInnerHTML={{__html: this.state.post.content}}></div>
        </div>
      );
    } else {
      return null;
    }
  }
});
