import { Button } from '@material-ui/core';
import React, { useContext, useState } from 'react';
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

  const [user, setUser] = useState({
    isLoggedIn: false,
    firstName: '',
    lastName: '',
    name: '',
    email: '',
    password: '',
    photoUrl: '',
  });

  const [newPassword, setNewPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');

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

  const handleChange = (e) => {
    let isFormValid = true;

    if (e.target.name === 'email') {
      const re = /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
      isFormValid = re.test(e.target.value);
    } else if (e.target.name === 'password') {
      const isPassValid = e.target.value.length >= 6;
      const isNumber = /\d{1}/.test(e.target.value);

      isFormValid = isPassValid && isNumber;

      if (isFormValid) {
        setNewPassword(e.target.value);
      }
    } else if (e.target.name === 'confirmPassword') {
      const isPassValid = e.target.value.length >= 6;
      const isNumber = /\d{1}/.test(e.target.value);

      isFormValid = isPassValid && isNumber;

      if (isFormValid) {
        setConfirmPassword(e.target.value);
      }
    }
    if (isFormValid) {
      const newUserInfo = { ...user };
      newUserInfo[e.target.name] = e.target.value;
      setUser(newUserInfo);
    }
    e.preventDefault();
  };

  const handleSubmit = (e) => {
    if (newPassword !== confirmPassword) {
      swal('sorry', "password didn't match please try again!", 'warning');
    } else {
      firebase
        .auth()
        .createUserWithEmailAndPassword(user.email.trim(), user.password)
        .then((res) => {
          const newUserInfo = { ...user };
          newUserInfo.error = '';
          newUserInfo.isLoggedIn = true;
          newUserInfo.name = newUserInfo.firstName + ' ' + newUserInfo.lastName;
          setUser(newUserInfo);
          updateUserInfo(newUserInfo.firstName, newUserInfo.lastName);
          setLoggedInUser(newUserInfo);
          verifyEmail();
          history.replace(from);
        })
        .catch((error) => {
          let newUserInfo = { ...user };
          newUserInfo.error = error.message;
          newUserInfo.isLoggedIn = false;
          setUser(newUserInfo);
          swal('Sorry', 'please provide valid information', 'warning');
        });
    }

    e.preventDefault();
  };
  const updateUserInfo = (fName, lName) => {
    const currentUser = firebase.auth().currentUser;

    currentUser
      .updateProfile({
        displayName: fName + ' ' + lName,
      })
      .then(() => {})
      .catch(() => {
        console.log('Error');
      });
  };
  const verifyEmail = () => {
    var user = firebase.auth().currentUser;

    user
      .sendEmailVerification()
      .then(function () {
        // Email sent.
      })
      .catch(function (error) {
        swal('Sorry', 'Something went wrong!', 'error');
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
        <form onSubmit={handleSubmit} method="post" action="">
          <input
            type="text"
            onBlur={handleChange}
            name="firstName"
            placeholder="First name"
            required
          />{' '}
          <br />
          <input
            type="text"
            onBlur={handleChange}
            name="lastName"
            placeholder="Last name"
            required
          />{' '}
          <br />
          <input
            type="email"
            onBlur={handleChange}
            name="email"
            id="email"
            placeholder="Email"
            required
          />{' '}
          <br />
          <input
            type="password"
            onBlur={handleChange}
            name="password"
            id="password"
            required
            placeholder="Password"
          />{' '}
          <br />
          <input
            type="password"
            onBlur={handleChange}
            name="confirmPassword"
            id="confirmPassword"
            required
            placeholder="Confirm Password"
          />{' '}
          <br />
          <input type="submit" name="submit" value="Signup" /> <br />
          <Link to="/login" style={{ textDecoration: 'none', color: 'red' }}>
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
