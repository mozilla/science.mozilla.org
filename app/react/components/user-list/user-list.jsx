// Gets passed an array of users. Returns array of GithubAvatars for users matching role

import React from "react";
import GithubAvatar from "../../components/github-avatar/github-avatar.jsx";

export default React.createClass({
  propTypes: {
    users: React.PropTypes.array,
    role: React.PropTypes.string
  },
  getDefaultProps() {
    return {
      users: [],
      role: ``,
      avatar: true,
      name: true
    };
  },
  render() {
    let users = this.props.users.filter(user=>{
      return this.props.role === `` || this.props.role === user.role;
    });

    users = users.map((user, index) => {
      let avatar, name;

      if(this.props.avatar){
        avatar = <GithubAvatar user={user}/>;
      }
      if(this.props.name){
        name = <span className="user-name"><a href={`https://github.com/${user.github_username}`}>{user.name}</a></span>;
      }
      return <span className="user" key={index}>{avatar}{name}</span>;
    });

    return <span className="user-list">{users}</span>;
  }
});

