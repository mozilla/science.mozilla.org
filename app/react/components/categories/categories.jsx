
import React from "react";

export default React.createClass({
  propTypes: {
    categories: React.PropTypes.array
  },
  getDefaultProps() {
    return {
      categories: []
    };
  },
  render() {
    return(
      <div className="categories">
        {this.props.categories.map((category) => {
          if(!category){ return null; }
          return <span key={category} className="category-tag">{category}</span>;
        }) }
      </div>
    );
  }
});
