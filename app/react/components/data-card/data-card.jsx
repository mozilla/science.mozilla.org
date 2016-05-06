
import React from "react";
import Categories from "../../components/categories/categories.jsx";

export default React.createClass({
  propTypes: {
    className: React.PropTypes.string,
    showPicture: React.PropTypes.bool,
    picture: React.PropTypes.string,
    categories: React.PropTypes.arrayOf(React.PropTypes.string)
  },
  getDefaultProps() {
    return{
      showPicture: false
    };
  },
  render() {

    return (
      <div className={`data-card-wrapper ${this.props.className}`}>
        <div className="data-card">
          {this.props.showPicture ? <img className="card-image" src={this.props.picture} /> : null }
          <Categories categories={this.props.categories} />
          {this.props.children}
        </div>
      </div>
    );
  }
});
