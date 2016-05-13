import React from "react";

export default React.createClass({
  propTypes: {
    options: React.PropTypes.arrayOf(React.PropTypes.shape({
      value: React.PropTypes.string.isRequired,
      label: React.PropTypes.string.isRequired
    }).isRequired).isRequired,
    initialChoice: React.PropTypes.string,
    onChange: React.PropTypes.func
  },
  getInitialState() {
    return {
      activeFilter: this.props.initialChoice || this.props.options[0].value
    };
  },
  onChange: function () {
    var choice = this.refs.radioFilter.elements.filterBy.value;

    this.setState({
      activeFilter: choice
    });

    this.props.onChange(choice);
  },
  render: function() {
    let options = this.props.options.map(option => {
      return (
        <label key={option.value} className="radio-inline">

          <input
            type="radio"
            name="filterBy"
            id={`filter-radio-${option.value}`}
            value={option.value}
            onChange={this.onChange}
            checked={this.state.activeFilter === option.value} />

          <span>{option.label}</span>

        </label>
      );
    });

    return (
      <form ref="radioFilter" className="project-sort-radio m-y-1">
        {options}
      </form>
    );
  }
});
