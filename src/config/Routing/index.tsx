import React from "react";
import { Switch, Route } from "react-router-dom";
import NotesList from "../../pages/List";
import NoteDetails from "../../pages/Details";
import NotFound from "../../pages/NotFound";
import NoSession from "../../pages/NoSession";
import { NOTES } from "../../constants/routes";

const Routing = (): React.ReactElement => {
  return (
    <Switch>
      <Route path="/" exact component={NoSession} />
      <Route path={`/:session${NOTES}/:id`} component={NoteDetails} />
      <Route path={`/:session`} exact component={NotesList} />
      <Route path={`/:session/*`} component={NotFound} />
    </Switch>
  );
};

export default Routing;
