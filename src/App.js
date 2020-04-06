import React, { Component } from "react";
import Header from "./components/atoms/Header/Header";
import NavBar from "./components/molecules/NavBar/NavBar";
import routes from "./routes/routes";
import Home from "./views/Home";
import Settings from "./views/Settings";
import ToBuy from "./views/ToBuy";

import {
  BrowserRouter as Router,
  Switch,
  Route,
  NavLink,
} from "react-router-dom";

class App extends Component {
  render() {
    return (
      <>
        <Header title="Domowa spiżarnia" main />
        <Router>
          <>
            <NavBar>
              <NavLink to={routes.home}>Zapasy</NavLink>
              <NavLink to={routes.toBuy}>Lista zakupów</NavLink>
              <NavLink to={routes.settings}>Ustawienia</NavLink>
            </NavBar>
            <Switch>
              <Route exact path={routes.home}>
                <Home />
              </Route>
              <Route path={routes.toBuy}>
                <ToBuy />
              </Route>
              <Route path={routes.settings}>
                <Settings />
              </Route>
            </Switch>
          </>
        </Router>
      </>
    );
  }
}

export default App;
