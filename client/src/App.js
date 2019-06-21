import React, { Component } from 'react';
import './App.css';
import {BrowserRouter as Router,Route,Switch} from 'react-router-dom';
import { Provider } from 'react-redux';
import store from './store.js';
import jwt_decode from 'jwt-decode';
import setAuthToken from './utils/setAuthToken';
import { setCurrentUser, logoutUser } from './actions/authActions';
import { clearProfile } from './actions/profileActions';

import PrivateRoute from './components/common/PrivateRoute';

import Navbar from './components/layout/navbar';
import Footer from './components/layout/footer';
import Landing from './components/layout/landing';
import Login from './components/auth/login';
import Register from './components/auth/register';
import Dashboard from './components/dashboard/dashboard';
import CreateProfile from './components/profile/CreateProfile';
import editProfile from './components/edit profile/EditProfile';
import Addexperience from './components/add-credentials/addexperience';
import Addeducation from './components/add-credentials/addeducation';
import Profiles from './components/profiles/profiles';
import Profile from './components/userprofile/profile';
import Posts from './components/posts/posts';
import NotFound from './components/not-found/NotFound';
import Post from './components/post/Post';

if(localStorage.jwttoken){

  setAuthToken(localStorage.jwttoken);
  const decoded = jwt_decode(localStorage.jwttoken);
  store.dispatch(setCurrentUser(decoded))

  const currentTime = Date.now()/1000;
  if(decoded.exp < currentTime)
  {
    store.dispatch(logoutUser());
    store.dispatch(clearProfile());

    window.location.href = '/login';
  }

}



class App extends Component {
  render() {
    return (
      <Provider store={ store }>
      <Router>
      <div className="App">
        <Navbar/>
        <Route exact path="/" component = {Landing} />
        <div className="container">
          <Route exact path="/login" component = {Login} />
          <Route exact path="/register" component = {Register} />
          <Route exact path="/profiles" component = {Profiles} />
          <Route exact path="/profile/:handle" component = {Profile} />
          <Switch>
          <PrivateRoute exact path="/dashboard" component = {Dashboard} />
          </Switch>
          <Switch>
          <PrivateRoute exact path="/create-profile" component = {CreateProfile} />
          </Switch>
          <Switch>
          <PrivateRoute exact path="/edit-profile" component = {editProfile} />
          </Switch>
          <Switch>
          <PrivateRoute exact path="/add-experience" component = {Addexperience} />
          </Switch>
          <Switch>
          <PrivateRoute exact path="/add-education" component = {Addeducation} />
          </Switch>
          <Switch>
          <PrivateRoute exact path="/feed" component = {Posts} />
          </Switch>
          <Switch>
          <PrivateRoute exact path="/post/:id" component = {Post} />
          </Switch>
          <Route exact path="/not-found" component = {NotFound} />
          
        </div>
        <Footer/>
      </div>
     </Router>
     </Provider>
    );
  }
}

export default App;
