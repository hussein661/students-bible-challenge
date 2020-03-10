import React from "react";
import { BrowserRouter, Route, Switch, Redirect } from "react-router-dom";
import Admin from "./pages/admin";
import Login from "./pages/login";
import Navbar from "./components/navbar";
import Home from "./pages/home";
import Register from "./pages/register";
import MyAnswers from "./pages/myAnswers";
import AllQuestions from "./pages/allQuestions";
import Question from "./pages/Question";
import VQuestion from "./components/admin/VQuestion.js";
import ForgotPassword from "./pages/ForgotPassword";
import ResetPassword from "./pages/ResetPassword";
import Me from "./pages/Me";
import VUser from "./components/admin/VUser";

const isLoggedIn = () => {
  const token = localStorage.getItem("API_TOKEN");
  if (token !== null && token.length > 10) {
    return true;
  }
};

const MyRoute = MyRouteProps => {
  const Component = MyRouteProps.component;
  const publicRoute = MyRouteProps.publicRoute ? true : false;
  const admin = MyRouteProps.admin ? true : false;
  const params = MyRouteProps.computedMatch.params;
  return (
    <div>
      {admin ? "" : <Navbar isLoggedIn={isLoggedIn} />}
      {isLoggedIn() || publicRoute ? (
        <Route
          render={originalRouteProps => (
            <Component {...originalRouteProps} params={params} />
          )}
        />
      ) : (
        <Route
          render={originalRouteProps => <Login {...originalRouteProps} />}
        />
      )}
    </div>
  );
};

const Routes = () => {
  return (
    <BrowserRouter>
      <Switch>
        <MyRoute exact path="/" component={Home} />
        <MyRoute exact path="/my_answers" component={MyAnswers} />
        <MyRoute exact path="/admin" component={Admin} admin />
        <MyRoute
          exact
          path="/VQuestion/:question_id"
          component={VQuestion}
          admin
        />

        <MyRoute exact path="/users/:id" component={VUser} admin />
        <MyRoute
          exact
          path="/ForgotPassword"
          component={ForgotPassword}
          publicRoute
        />
        <MyRoute
          exact
          path="/resetPassword/:resetToken"
          component={ResetPassword}
          publicRoute
        />

        <MyRoute exact path="/questions" component={AllQuestions} />
        <MyRoute exact path="/me" component={Me} />

        <MyRoute exact path="/question/:question_id" component={Question} />
        <MyRoute exact path="/Login" component={Login} publicRoute />
        <MyRoute exact path="/Register" component={Register} publicRoute />
      </Switch>
    </BrowserRouter>
  );
};

export default Routes;
