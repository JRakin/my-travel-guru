import { Button } from '@material-ui/core';
import React, { useContext } from 'react';
import { Link, useHistory, useLocation } from 'react-router-dom';
import firebaseConfig from '../Login/firebase.config';
import * as firebase from 'firebase/app';
import { UserContext } from '../../App';
import swal from 'sweetalert';

if (!firebase.apps.length) {
  firebase.initializeApp(firebaseConfig);
}

const SignUp = () => {
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
      <div className="loginForm">
        <h2
          style={{
            color: 'gray',
            margin: '10px 0 30px 0',
            textAlign: 'center',
          }}
        >
          Create an account
        </h2>
        <form action="">
          <input type="text" placeholder="First name" required /> <br />
          <input type="text" placeholder="Last name" required /> <br />
          <input type="email" placeholder="Email" required /> <br />
          <input
            type="password"
            name=""
            id=""
            required
            placeholder="Password"
          />{' '}
          <br />
          <input
            type="password"
            name=""
            id=""
            required
            placeholder="Confirm Password"
          />{' '}
          <br />
          <input type="submit" value="Signup" /> <br />
          <Link style={{ textDecoration: 'none', color: 'red' }}>
            Already have an account?
          </Link>
        </form>
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

export default SignUp;
