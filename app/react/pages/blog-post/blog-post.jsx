import React from "react";
import Moment from "moment-timezone";
import Service from "../../../js/backend.js";

export default class BlogPost extends React.Component {

  constructor(props) {
    super(props);

    this.state = {
      post: null
    };
  }

  componentWillMount = () => {
    Service.blogPost
      .get(this.props.params.slug)
      .then((post) => { this.setState({post: post[0]}); })
      .catch((reason) => { console.error(reason); });
  }

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
        <div className="blog-post">
          <div className="jumbotron container text-xs-center mb-2 pb-0 pt-2">
            <h1 className="mb-2">{this.state.post.title}</h1>
            <p className="mb-2">by {this.state.post.author.name} on {new Moment(this.state.post.date).format(`MMM D, YYYY`)}</p>
            <div className="tags">{tags}</div>
          </div>
          <div className="container-dynamic pb-2" dangerouslySetInnerHTML={{__html: this.state.post.content}}></div>
        </div>
      );
    } else {
      return null;
    }
  }
}
