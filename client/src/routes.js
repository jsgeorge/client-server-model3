import React from "react";
import { Route, Switch } from "react-router-dom";

import HomePage from "./components/homepage";
import SignIn from "./components/signin";
import SignupPage from "./components/signup";
import EventsPage from "./components/events";
import AddEventPage from "./components/events/new";
import requireAuth from "./utils/requireAuth";
import EventDetail from "./components/events/detail";
import EditEventPage from "./components/events/edit";
const Routes = () => {
  return (
    <Switch>
      <Route
        path="/events/edit/:id"
        exact
        component={requireAuth(EditEventPage)}
      />
      <Route path="/events/new" component={requireAuth(AddEventPage)} />
      <Route path="/events" exact component={requireAuth(EventsPage)} />
      <Route path="/events/:id" exact component={requireAuth(EventDetail)} />
      <Route path="/signin" component={SignIn} />
      <Route path="/signup" component={SignupPage} />
      <Route path="/" exact component={HomePage} />
    </Switch>
  );
};

export default Routes;
