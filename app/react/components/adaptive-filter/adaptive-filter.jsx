import React from "react";
import { RadioFilter } from "mofo-ui";

export default React.createClass({
  propTypes: {
    options: React.PropTypes.arrayOf(React.PropTypes.shape({
      value: React.PropTypes.string.isRequired,
      label: React.PropTypes.string.isRequired
    }).isRequired).isRequired,
    value: React.PropTypes.string,
    initialChoice: React.PropTypes.string,
    onChange: React.PropTypes.func
  },
  getInitialState(){
    return {
      activeFilter: this.props.value || this.props.initialChoice || this.props.options[0].value
    };
  },
  onChange(choice){
    if (this.props.onChange){
      var filter = ((choice.target) ? choice.target.value : choice);

      this.props.onChange(filter);
    }
  },
  componentWillReceiveProps(nextProps){
    // Able to bind to external state
    if (nextProps.value !== this.state.activeFilter){
      this.setState({
        activeFilter: nextProps.value
      });
    }
  },
  render() {
    return (
      <div className="adaptive-filter">
        <div className="hidden-xs-down">
          <RadioFilter value={this.state.activeFilter} options={this.props.options} onChange={this.onChange}>
          </RadioFilter>
        </div>
        <div className="hidden-sm-up">
          <select value={this.state.activeFilter} onChange={this.onChange} className="c-select form-control wide">
            {this.props.options.map(option => {
              return <option value={option.value}>{option.label}</option>;
            })}
          </select>
        </div>
      </div>
    );
  }
});
