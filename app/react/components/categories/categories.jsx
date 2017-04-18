
import React from "react";

export default class Categories extends React.Component {

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
}

Categories.propTypes = {
  categories: React.PropTypes.array
};

Categories.defaultProps = {
  categories: []
};

