import { BrowserRouter as Router, Switch, Route, Link } from "react-router-dom";
import Nav from "../components/Nav";
import Creator from "../components/Creator";
import Results from "../components/Results";
import Editor from "../components/Editor";
import NotFound from "../pages/NotFound";
import "../scss/Maker.scss";
import "../scss/Editor.scss";
import "../scss/_CommonComponents.scss";

export default function Maker() {
  return (
    <div id="container-maker">
      <Nav />
      <Router>
        <Switch>
          <Route path="/maker/" component={Creator} exact />
          <Route path="/maker/result" component={Results} exact />
          <Route path="/maker/editor" component={Editor} exact />
          <Route path="/maker/*" component={NotFound} />
        </Switch>
      </Router>
    </div>
  );
}
