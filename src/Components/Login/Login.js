import { Button } from '@material-ui/core';
import './Login.css';
import React, { useContext } from 'react';

import firebaseConfig from './firebase.config';
import * as firebase from 'firebase/app';
import 'firebase/auth';
import { UserContext } from '../../App';
import { Link, useHistory, useLocation } from 'react-router-dom';
import swal from 'sweetalert';

//authentication and login functionality

if (!firebase.apps.length) {
  firebase.initializeApp(firebaseConfig);
}

const Login = () => {
  const [loggedInUser, setLoggedInUser] = useContext(UserContext);
  const provider = new firebase.auth.GoogleAuthProvider();
  const fbProvider = new firebase.auth.FacebookAuthProvider();

  const history = useHistory();
  const location = useLocation();
  const { from } = location.state || { from: { pathname: '/' } };

  const handleSignInWithGoogle = () => {
    firebase
      .auth()
      .signInWithPopup(provider)
      .then((res) => {
        const { displayName, email, photoURL } = res.user;
        const signedInUser = {
          name: displayName,
          email,
          photoURL,
          isLoggedIn: true,
        };
        setLoggedInUser(signedInUser);
        history.replace(from);
      })
      .catch((err) => {
        if (err) {
          swal(
            'Sorry',
            'Something went wrong, please try again later!',
            'error'
          );
        }
      });
  };

  const handleSignInWithFb = () => {
    firebase
      .auth()
      .signInWithPopup(fbProvider)
      .then((res) => {
        const { displayName, email, photoURL } = res.user;
        // console.log(res.user);
        const signedInUser = {
          name: displayName,
          email: email,
          photoURL,
          isLoggedIn: true,
        };
        setLoggedInUser(signedInUser);
        history.replace(from);
      })
      .catch((err) => {
        if (err) {
          swal(
            'Sorry',
            'Something went wrong, please try again later!',
            'error'
          );
        }
      });
  };

  return (
    <div>
      <div>
        <div className="loginForm">
          <h1
            style={{
              color: 'gray',
              margin: '10px 0 30px 0',
              textAlign: 'center',
            }}
          >
            Sign in
          </h1>
          <form action="">
            <input type="text" name="" id="" placeholder="Username or Email" />{' '}
            <br />
            <input type="password" name="" id="" placeholder="Password" />{' '}
            <br />
            <Link style={{ textDecoration: 'none', color: 'red' }}>
              {' '}
              Forgot password?
            </Link>{' '}
            <br />
            <input type="submit" value="Sign in" name="" id="" /> <br />
            <Link to="/signup" style={{ textDecoration: 'none', color: 'red' }}>
              New user?
            </Link>
          </form>
        </div>
      </div>
      <div
        style={{
          display: 'flex',
          justifyContent: 'center',
          alignItems: 'center',
          flexDirection: 'column',
        }}
      >
        <Button
          onClick={handleSignInWithGoogle}
          style={{
            width: '250px',
            backgroundColor: 'red',
            borderRadius: '30px',
            margin: '10px 0',
            color: 'white',
          }}
        >
          Continue with gmail
        </Button>
        <Button
          onClick={handleSignInWithFb}
          style={{
            width: '250px',
            backgroundColor: 'red',
            borderRadius: '30px',
            margin: '10px 0',
            color: 'white',
          }}
        >
          Continue with facebook
        </Button>
      </div>
    </div>
  );
};

export default Login;
