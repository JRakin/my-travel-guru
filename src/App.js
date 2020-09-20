import React, { createContext, useState } from 'react';
import { BrowserRouter as Router, Switch, Route } from 'react-router-dom';
import './App.css';
import Book from './Components/Book/Book';
import Header from './Components/Header/Header';
import Login from './Components/Login/Login';
import PrivateRoute from './Components/PrivateRoute/PrivateRoute';
import Rooms from './Components/Room/Room';
import Tours from './Components/Tours/Tours';

export const UserContext = createContext();

function App() {
  const [loggedInUser, setLoggedInUser] = useState({});

  return (
    <UserContext.Provider value={[loggedInUser, setLoggedInUser]}>
      <Router>
        <Header></Header>
        <Switch>
          <Route exact path="/">
            <Tours></Tours>
          </Route>
          <Route path="/login">
            <Login></Login>
          </Route>
          <Route path="/book/:id">
            <Book></Book>
          </Route>
          <Route path="/room/:id">
            <Rooms></Rooms>
          </Route>
        </Switch>
      </Router>
    </UserContext.Provider>
  );
}

export default App;
