import {
  Button,
  FormControlLabel,
  Link,
  makeStyles,
  TextField,
  Typography,
  withStyles,
} from '@material-ui/core';
import './Login.css';
import React, { useContext } from 'react';
import CheckBoxIcon from '@material-ui/icons/CheckBox';
import { CheckBox, CheckBoxOutlineBlank } from '@material-ui/icons';
import firebaseConfig from './firebase.config';
import * as firebase from 'firebase/app';
import 'firebase/auth';
import { UserContext } from '../../App';
import { useHistory, useLocation } from 'react-router-dom';

const CssTextField = withStyles({
  root: {
    borderBottom: '#fff',
    '& label.Mui-focused': {
      color: 'red',
    },
    '& .MuiInput-underline:after': {
      borderBottomColor: 'red',
    },
  },
})(TextField);

const useStyles = makeStyles((theme) => ({
  root: {
    display: 'flex',
    flexWrap: 'wrap',
  },
  margin: {
    margin: theme.spacing(0.2),
    borderBottom: '#fff',
  },
}));

//authentication and login functionality

firebase.initializeApp(firebaseConfig);

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
          console.log(err.message);
          alert('something went wrong please try again!');
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
        console.log(err.message);
      });
  };

  const classes = useStyles();
  return (
    <div>
      <div className="loginForm">
        <form>
          <Typography variant="h5" component="h5">
            Login
          </Typography>
          <CssTextField
            className={classes.margin}
            required
            name="name"
            id="standard-required"
            label="Username or Email"
            placeholder="Username or Email"
          />
          <br />
          <CssTextField
            className={classes.margin}
            id="standard-password-input"
            label="Password"
            name="password"
            required
            type="password"
            autoComplete="current-password"
            placeholder="Password"
          />
          <div
            style={{
              display: 'flex',
              justifyContent: 'space-between',
              margin: '10px 8px',
            }}
          >
            <FormControlLabel
              control={
                <CheckBox
                  icon={<CheckBoxOutlineBlank fontSize="small" />}
                  checkedicon={<CheckBoxIcon fontSize="small" />}
                  name="checkedI"
                  color="primary"
                />
              }
              label="Remember me"
            />
            <Link style={{ cursor: 'pointer', color: 'red' }}>
              Forgot password
            </Link>
          </div>
          <Button
            style={{
              backgroundColor: 'red',
              margin: '20px auto',
              borderRadius: '30px',
              width: '200px',
            }}
            variant="contained"
            color="secondary"
          >
            Login
          </Button>
          <div
            style={{
              display: 'flex',
              justifyContent: 'space-between',
              margin: '10px 8px',
            }}
          >
            <Typography variant="subtitle1" component="p">
              Don't have an account?
            </Typography>
            <Link style={{ cursor: 'pointer', color: 'red' }} to="/signup">
              Sign up
            </Link>
          </div>
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

export default Login;
