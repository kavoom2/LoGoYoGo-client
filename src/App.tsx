import React from "react";
import { BrowserRouter as Router, Switch, Route, Link } from "react-router-dom";
import NotFound from "./pages/NotFound";
import MainPage from "./pages/MainPage";
import Maker from "./pages/Maker";
import Profile from "./pages/Profile";
import "./css/App.css";

function App() {
  return (
    <Router>
      <Switch>
        <Route path="/" component={MainPage} exact />
        <Route path="/profile" component={Profile} />
        <Route path="/maker" component={Maker} />
        <Route path="*" component={NotFound} />
      </Switch>
    </Router>
  );
}

export default App;
