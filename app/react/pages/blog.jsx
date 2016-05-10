import React from "react";
import Moment from "moment-timezone";
import Service from "../../js/backend.js";
import DataCard from "../components/data-card/data-card.jsx";

export default React.createClass({
  componentWillMount: function () {
    Service.blogPosts
      .get()
      .then((posts) => { this.setState({posts: posts}); })
      .catch((reason) => { console.error(reason); });
  },
  getInitialState: function () {
    return {
      posts: []
    };
  },
  render() {
    let posts = this.state.posts.map((post, index) => {
      let terms = post.terms.category.filter((item) => {
        return item.slug !== `uncategorized`;
      }).map((item) => {
        return item.slug;
      });

      return (
        <div className={index < 2 ? `col-xs-12 col-sm-6` : `col-xs-12`}>
          <DataCard key={index} showPicture={!!post.featured_image && index < 2} picture={post.featured_image && index < 2 ? post.featured_image.source : null} categories={terms}>
            <h3><a href={`/blog/${post.slug}`}>{post.title}</a></h3>
            <p>by {post.author.name} on {new Moment(post.date).format(`MMM D, YYYY`)}</p>
            <p dangerouslySetInnerHTML={{__html: post.excerpt}}></p>
          </DataCard>
        </div>
      );
    });

    return (
      <div id="blog">
        <div className="jumbotron container text-xs-center m-b-0 p-b-1">
          <h2>Latest News</h2>
        </div>
        <div className="container-dynamic">
          <div className="row">
            {posts}
          </div>
        </div>
      </div>
    );
  }
});
