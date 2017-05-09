
import React from "react";

export default class Categories extends React.Component {

  static propTypes = {
    categories: React.PropTypes.array
  };

  static defaultProps = {
    categories: []
  };

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
