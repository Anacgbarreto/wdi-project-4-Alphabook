import { Link } from 'react-router';
import Auth from '../modules/Auth';
import React, { Component } from 'react';

export default class Layout extends Component {
  constructor(props) {
    super(props);
    this.state = {user: null};
  }

  componentDidMount() {
    Auth.fetch('/api/current-user', {})
      .then(user => {
        this.setState({user});
      });
  }

  render() {
    const {user} = this.state;
    if (!user) {
      return null;
    }

    return <div>
      <header>
        <div className="container">
          <h1>
            <Link to="/">
              <img src="/logo3.png" height="35" width="35"/>
            </Link>
          </h1>
          <ul>
            <li><Link to="/">Your feed</Link></li>
            <li><Link to="/users">Users</Link></li>
          </ul>
          <ul className="right">
            <li>
              <Link to={"/profile/" + user.id}>
                <img src={user.profilePic} className="profile-pic" />
                {user.name}
              </Link>
            </li>
            <li><Link to="/logout">Logout</Link></li>
          </ul>
        </div>
      </header>
      <main>
        <div className="container">
          {this.props.render(this.state.user)}
        </div>
      </main>
    </div>;
  }
}
