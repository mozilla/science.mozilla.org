import React from "react";
import Moment from "moment-timezone";
import Service from "../../js/backend.js";
import DataCard from "../components/data-card/data-card.jsx";

import DebounceInput from 'react-debounce-input';

export default class BlogList extends React.Component {

  state = {
    posts: [],
    pagesLoaded: 0,
    categories: [],
    activeCategory: ``,
    search: ``
  };

  componentWillMount() {
    this.loadPosts(1);
    this.loadCategories();
  }

  loadPosts = (page, category=``, search=``) => {
    Service.blogPosts
      .get(page, category, search)
      .then((posts) => {
        this.setState({
          posts: this.state.posts.concat(posts),
          pagesLoaded: page
        });
      })
      .catch((reason) => { console.error(reason); });
  }

  loadCategories = () => {
    Service.blogCategories
      .get()
      .then((categories) => {
        this.setState({
          categories: categories
        });
      })
      .catch((reason) => { console.error(reason); });
  }

  handleCategoryInput = (event) => {
    this.setState({
      activeCategory: event.target.value,
      posts: [],
      pagesLoaded: 0
    });
    this.loadPosts(1, event.target.value, this.state.search);
  }

  handleSearchInput = (event) => {
    this.setState({
      search: event.target.value,
      posts: [],
      pagesLoaded: 0
    });
    this.loadPosts(1, this.state.activeCategory, event.target.value);
  }

  onMoreClick = () => {
    this.loadPosts(this.state.pagesLoaded + 1, this.state.activeCategory, this.state.search);
  }

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
          <div className="row flex-items-xs-center my-1">
            <div className="col-xs-12 col-sm-6 col-md-4 mb-1">
              <DebounceInput debounceTimeout={400} type="search" onChange={this.handleSearchInput} className="form-control" placeholder="search"/>
            </div>
            <div className="col-xs-12 col-sm-6 col-md-4 mb-1">
              <select name="category" id="category" onChange={this.handleCategoryInput} className="c-select form-control wide">
                <option value="">All Categories</option>
                {this.state.categories.map(category => {
                  if(category.slug !== `uncategorized`) {
                    return <option key={category.ID} value={category.slug}>{category.name}</option>;
                  }
                })}
              </select>
            </div>
          </div>
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
}
