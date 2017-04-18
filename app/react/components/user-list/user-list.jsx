 // Gets passed an array of users. Returns array of GithubAvatars for users matching role

import React from "react";
import GithubAvatar from "../../components/github-avatar/github-avatar.jsx";

export default class UserList extends React.Component {

  render() {

    // Get an array of users by checking if they're of the right role (or there's no role filter), and they're not in the exclude array
    let users = this.props.users.filter(user=>{
      if (this.props.role === `` || this.props.role === user.role) {
        if(this.props.exclude.length) {
          return !this.props.exclude.find(el => {
            return el.github_username === user.github_username;
          });
        } else {
          return true;
        }
      }
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
}

UserList.propTypes = {
  users: React.PropTypes.array,
  role: React.PropTypes.string
};

UserList.defaultProps = {
  users: [],
  role: ``,
  avatar: true,
  name: true,
  exclude: []
};
