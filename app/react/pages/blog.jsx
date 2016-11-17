import React from "react";
import Moment from "moment-timezone";
import Service from "../../js/backend.js";
import DataCard from "../components/data-card/data-card.jsx";

export default React.createClass({
  componentWillMount: function () {
    this.loadPosts(1);
  },
  loadPosts: function (page) {
    Service.blogPosts
      .get(page)
      .then((posts) => {
        this.setState({
          posts: this.state.posts.concat(posts),
          pagesLoaded: page
        });
      })
      .catch((reason) => { console.error(reason); });
  },
  getInitialState: function () {
    return {
      posts: [],
      pagesLoaded: 0
    };
  },
  onMoreClick: function () {
    this.loadPosts(this.state.pagesLoaded + 1);
  },
  render() {
    let posts = this.state.posts.map((post, index) => {
      let terms = post.terms.category.filter((item) => {
        return item.slug !== `uncategorized`;
      }).map((item) => {
        return item.slug;
      });

      return (
        <DataCard key={index} className={index < 2 ? `col-xs-12 col-sm-6` : `col-xs-12`} showPicture={!!post.featured_image && index < 2} picture={post.featured_image && index < 2 ? post.featured_image.source : null} categories={terms}>
          <h3><a href={`/blog/${post.slug}`} dangerouslySetInnerHTML={{__html: post.title}}></a></h3>
          <p>by {post.author.name} on {new Moment(post.date).format(`MMM D, YYYY`)}</p>
          <p dangerouslySetInnerHTML={{__html: post.excerpt}}></p>
        </DataCard>
      );
    });

    return (
      <div id="blog">
        <div className="jumbotron container text-xs-center mb-0 pb-1">
          <h2>Latest News</h2>
        </div>
        <div className="container-dynamic">
          <div className="row">
            {posts}
          </div>
          <div className="text-xs-center">
            <button className="btn btn-outline-info mb-3" onClick={this.onMoreClick}>See More</button>
          </div>
        </div>
      </div>
    );
  }
});
