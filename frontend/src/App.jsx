import React from "react";
import { Route, Switch } from "react-router-dom";
import LoginForm from "./components/LoginForm";
import Navigation from "./components/Navigation";
import SignupForm from "./components/SignupForm";

const App = props => {
  return (
    <>
      <Navigation />
      <div id="page-content">
        <Switch>
          <Route path="/login">
            <LoginForm />
          </Route>
          <Route path="/signup">
            <SignupForm />
          </Route>
        </Switch>
      </div>
    </>
  );
}

export default App;
