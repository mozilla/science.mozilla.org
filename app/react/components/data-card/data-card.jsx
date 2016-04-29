
import React from "react";

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
          <div className="categories">
            {this.props.categories.map((category) => {
              return <span key={category} className="category-tag">{category}</span>;
            }) }
          </div>
          {this.props.children}
        </div>
      </div>
    );
  }
});
