import React from "react";
import Moment from "moment-timezone";
import Service from "../../../js/backend.js";

export default class BlogPost extends React.Component {

  state = {
    post: null
  };

  componentWillMount() {
    Service.blogPost
      .get(this.props.params.slug)
      .then((post) => {
        this.setState({post: post});
      })
      .catch((reason) => { console.error(reason); });
  }

  render() {
    if (this.state.post) {
      let categories = this.state.post.categories.map((category, index) => {
        return (
          <span key={index} className="category-tag">{category.slug}</span>
        );
      });

      let name = this.state.post.author.first_name + ` ` + this.state.post.author.last_name;

      return (
        <div className="blog-post">
          <div className="jumbotron container text-xs-center mb-2 pb-0 pt-2">
            <h1 className="mb-2">{this.state.post.title}</h1>
            <p className="mb-2">by {name} on {new Moment(this.state.post.publish_date).format(`MMM D, YYYY`)}</p>
            <div className="tags">{categories}</div>
          </div>
          <div className="container-dynamic pb-2" dangerouslySetInnerHTML={{__html: this.state.post.content}}></div>
        </div>
      );
    } else {
      return null;
    }
  }
}
