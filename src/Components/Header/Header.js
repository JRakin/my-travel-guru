import {
  AppBar,
  fade,
  makeStyles,
  InputBase,
  Toolbar,
  Button,
  Avatar,
  Typography,
  Container,
} from '@material-ui/core';
import SearchIcon from '@material-ui/icons/Search';
import React, { useContext } from 'react';
import { Link } from 'react-router-dom';
import { UserContext } from '../../App';
import * as firebase from 'firebase/app';
import 'firebase/auth';

// material ui

const useStyles = makeStyles((theme) => ({
  search: {
    position: 'relative',
    borderRadius: theme.shape.borderRadius,
    backgroundColor: fade(theme.palette.common.white, 0.15),
    '&:hover': {
      backgroundColor: fade(theme.palette.common.white, 0.25),
    },
    marginRight: theme.spacing(2),
    marginLeft: 0,
    width: '100%',
    [theme.breakpoints.up('sm')]: {
      marginLeft: theme.spacing(3),
      width: 'auto',
    },
  },
  linkBtn: {
    textDecoration: 'none',
    padding: '10px 25px',
    color: 'white',
    '&:hover': {
      textDecoration: 'none',
      color: 'lightgray',
    },
  },
  loginBtn: {
    textDecoration: 'none',
    background: 'red',
    border: '1px solid red',
    color: 'white',
    borderRadius: '30px',
    '&:hover': {
      textDecoration: 'none',
      color: 'lightgray',
      border: '1px solid white',
    },
    textAlign: 'center',
    marginLeft: '10px',
    padding: '7px 22px',
  },
  searchIcon: {
    padding: theme.spacing(0, 2),
    height: '100%',
    position: 'absolute',
    pointerEvents: 'none',
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
  },
  inputRoot: {
    color: 'inherit',
  },
  inputInput: {
    padding: theme.spacing(1, 1, 1, 0),
    // vertical padding + font size from searchIcon
    paddingLeft: `calc(1em + ${theme.spacing(4)}px)`,
    border: '1px solid white',
    borderRadius: '4px',
    transition: theme.transitions.create('width'),
    width: '100%',
    [theme.breakpoints.up('md')]: {
      width: '35ch',
    },
  },
  appLogo: {
    height: '40px',
    width: 'auto',
    filter: `brightness(1000%)`,
    padding: '20px',
    marginLeft: '40px',
  },
}));

const Header = () => {
  const [loggedInUser, setLoggedInUser] = useContext(UserContext);
  const classes = useStyles();

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
    <div>
      <AppBar
        style={{ background: 'transparent', boxShadow: 'none' }}
        position="sticky"
      >
        <Toolbar>
          <div>
            <img
              className={classes.appLogo}
              src="../../Logo.png"
              alt="logo"
            ></img>
          </div>
          <div className={classes.search}>
            <div className={classes.searchIcon}>
              <SearchIcon />
            </div>
            <InputBase
              placeholder="Search…"
              classes={{
                root: classes.inputRoot,
                input: classes.inputInput,
              }}
              inputProps={{ 'aria-label': 'search' }}
            />
          </div>
          <div style={{ marginLeft: '120px' }}>
            <Link to="/" className={classes.linkBtn}>
              Home
            </Link>
            <Link to="/tours" className={classes.linkBtn}>
              Destination
            </Link>
            <Link to="/Blog" className={classes.linkBtn}>
              Blog
            </Link>
            {!loggedInUser.isLoggedIn ? (
              <Link to="/login" className={classes.loginBtn}>
                Login
              </Link>
            ) : (
              <Button onClick={handleSignOut} className={classes.loginBtn}>
                Sign out
              </Button>
            )}
          </div>
          <Avatar
            style={{ marginLeft: '20px' }}
            alt="user"
            src={loggedInUser.photoURL}
          ></Avatar>
          <Typography
            style={{ marginLeft: '10px' }}
            variant="subtitle1"
            component="p"
          >
            {loggedInUser.name}
          </Typography>
        </Toolbar>
      </AppBar>
    </div>
  );
};

export default Header;
