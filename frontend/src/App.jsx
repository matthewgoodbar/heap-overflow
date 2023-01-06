import React from "react";
import { Redirect, Route, Switch } from "react-router-dom";
import Navigation from "./components/Navigation";
import Footer from "./components/Footer";
import NotFound from "./components/NotFound";
import Splash from "./components/Splash";
import LoginForm from "./components/LoginForm";
import SignupForm from "./components/SignupForm";
import QuestionIndex from "./components/QuestionIndex";
import Question from "./components/Question";
import Sidebar from "./components/Sidebar";
import QuestionForm from "./components/QuestionForm";

const App = props => {
  return (
    <>
      <Navigation />
      <div id="page-content">
        <Switch>
          <Route exact path="/">
            <Splash />
          </Route>
          <Route path="/login">
            <LoginForm />
          </Route>
          <Route path="/signup">
            <SignupForm />
          </Route>
          <Route exact path="/questions">
            <Sidebar />
            <QuestionIndex />
          </Route>
          <Route exact path="/questions/new">
            <Sidebar />
            <QuestionForm />
          </Route>
          <Route exact path="/questions/:questionId/edit">
            <Sidebar />
            <QuestionForm />
          </Route>
          <Route exact path="/questions/:questionId">
            <Sidebar />
            <Question />
          </Route>
          <Route path="/404">
            <Sidebar />
            <NotFound />
          </Route>
          <Route>
            <Redirect to="/404" />
          </Route>
        </Switch>
      </div>
      <Footer />
    </>
  );
}

export default App;
