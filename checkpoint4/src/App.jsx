import React from "react";
import { BrowserRouter as Router, Switch, Route } from "react-router-dom";
import Accueil from "./Accueil";
import Contact from "./Contact";
import NavBar from "./NavBar";
import BienAchat from "./BienAchat";
import BienLocative from "./BienLocative";
import CreateBien from "./CreateBien";

function App() {
  return (
    <div>
      <Router>
        <NavBar />
        <Switch>
          <Route path="/CreateBien">
            <CreateBien />
          </Route>
          <Route path="/BienAchat">
            <BienAchat />
          </Route>
          <Route path="/BienLocative">
            <BienLocative />
          </Route>
          <Route path="/Contact">
            <Contact />
          </Route>

          <Route path="/">
            <Accueil />
          </Route>
        </Switch>
      </Router>
    </div>
  );
}

export default App;
