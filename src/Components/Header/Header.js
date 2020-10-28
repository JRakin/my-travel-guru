import React, { useContext } from 'react';
import { Link } from 'react-router-dom';
import { UserContext } from '../../App';
import * as firebase from 'firebase/app';
import 'firebase/auth';
import './Header.css';
import Logo from '../../Logo.png';

const Header = () => {
  const [loggedInUser, setLoggedInUser] = useContext(UserContext);

  const handleSignOut = () => {
    firebase
      .auth()
      .signOut()
      .then(() => {
        setLoggedInUser({});
      })
      .catch(() => {
        alert('something went wrong please try again later!');
      });
  };

  return (
    <div className="container">
      <nav className="navbar-container navbar navbar-expand-lg navbar-light py-3">
        <Link className="navbar-brand" to="/">
          <img className="logo" src={Logo} alt="" />
        </Link>
        <button
          className="navbar-toggler"
          type="button"
          data-toggle="collapse"
          data-target="#navbarSupportedContent"
          aria-controls="navbarSupportedContent"
          aria-expanded="false"
          aria-label="Toggle navigation"
        >
          <span className="navbar-toggler-icon"></span>
        </button>

        <div className="collapse navbar-collapse" id="navbarSupportedContent">
          <ul className="navbar-nav ml-auto">
            <li className="nav-item">
              <Link className="nav-link mr-3" to="/">
                Home <span className="sr-only">(current)</span>
              </Link>
            </li>
            <li className="nav-item">
              <Link className="nav-link mr-3" to="/">
                Tours
              </Link>
            </li>
            <li className="nav-item">
              <Link className="nav-link mr-3" to="/blogs">
                Blogs
              </Link>
            </li>
            <li className="nav-item">
              <Link className="nav-link loginBtn" to="/signup">
                Sign in
              </Link>
            </li>
          </ul>
        </div>
      </nav>
    </div>
  );
};

export default Header;
