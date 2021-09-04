import React from 'react';
import { BrowserRouter as Router, Route, Switch } from 'react-router-dom'
import './App.css';
import Login from "./components/login/Login";
import SignUp from "./components/sign up/SignUp";
import AdminPanel from "./components/admin/AdminPanel";
import User from "./components/user/User";

function App() {
  return (
    <Router>
      <Switch>
        <Route exact path="/">
          <Login />
        </Route>
        <Route exact path="/signup">
          <SignUp />
        </Route>
        <Route exact path={'/admin'}>
          <AdminPanel />
        </Route>
        <Route exact path={'/user'}>
          <User />
        </Route>
        <Router>
          <div>404 ERROR</div>
        </Router>
      </Switch>
      {/* <Redirect to="/dtm" /> */}
    </Router>
  );
}

export default App;
