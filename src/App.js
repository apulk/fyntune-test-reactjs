import React from 'react';
import Login from './containers/login'
import Dashboard from './containers/dashboard'
import { Switch, Route, Redirect } from 'react-router-dom'
import ArchiveTasks from './containers/archive'
import GeneratePdf from './components/GeneratePdf';
function App(props) {
   
  return (
    <div className="App">
      <Switch>
        <Route exact path="/login" render={props =>
          !localStorage.getItem("token") ? (
            <Login />
          ) : (
              <Redirect
                to={
                  {
                    pathname: "/",
                    state: { from: props.location }
                  }
                }
              />
            )
        } />
         
        <Route  path="/trash" render={props =>
          localStorage.getItem("token") ? (
            <ArchiveTasks />
          ) : (
              <Redirect
                to={
                  {
                    pathname: "/login",
                    state: { from: props.location }
                  }
                }
              />
            )
        } />
        <Route exact path="/" render={props =>
          localStorage.getItem("token") ? (
            <Dashboard />
          ) : (
              <Redirect
                to={
                  {
                    pathname: "/login",
                    state: { from: props.location }
                  }
                }
              />
            )
        } />
        <Route exact path="/pdf/:id" render={props =>
          localStorage.getItem("token") ? (
            <GeneratePdf />
          ) : (
              <Redirect
                to={
                  {
                    pathname: "/login",
                    state: { from: props.location }
                  }
                }
              />
            )
        } />
      </Switch>
    </div>
  );
}

export default App;
