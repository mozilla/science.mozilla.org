import React from "react";

export default class GithubAvatar extends React.Component {

  render() {

    return (
      <a className="github-avatar" href={`https://github.com/${this.props.user.github_username}`}>
        <img className="circle" srcSet={`${this.props.user.avatar_url}&s=${this.props.size}, ${this.props.user.avatar_url}&s=${this.props.size*2} 2x`} width={this.props.size} height={this.props.size} alt={this.props.user.name} />
      </a>
    );
  }
}

GithubAvatar.propTypes = {
  user: React.PropTypes.object.isRequired,
  size: React.PropTypes.number
};

GithubAvatar.defaultProps = {
  size: 40
};
