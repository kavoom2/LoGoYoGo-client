import { BrowserRouter as Router, Switch, Route, Link } from "react-router-dom";
import { Redirect } from "react-router";
import Nav from "../components/Nav";
import Creator from "../components/Creator";
import Results from "../components/Results";
import Editor from "../components/Editor";
import "../scss/Maker.scss";
import "../scss/Editor.scss";
import "../scss/Creator.scss";
import "../scss/_CommonComponents.scss";

export default function Maker() {
  return (
    <div id="container-maker">
      <Nav />
      <Router>
        <Switch>
          <Route path="/maker/" component={Creator} exact />
          <Route path="/maker/results" component={Results} exact />
          <Route path="/maker/editor" component={Editor} exact />
          <Route path="/maker/*">
            <Redirect to="/maker/" />
          </Route>
        </Switch>
      </Router>
    </div>
  );
}
