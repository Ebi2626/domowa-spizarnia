import React, { Component } from "react";
import { connect } from "react-redux";
import {
  changeTemplate,
  fetchPeriodList,
  initialFetch,
} from "./actions/actions";
import Theme from "./theme/Theme";
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

// Themes
const DARK = "DARK";
const LIGHT = "LIGHT";

const style = {
  textTransform: "uppercase",
  color: "white",
  fontWeight: "bold",
  borderBottom: "none",
  boxSizing: "border-box",
  transition: "all .3s ease-in-out",
};

const activeStyle = {
  color: "#2e2e2e",
  borderBottom: "2px solid #2e2e2e",
};

class App extends Component {
  constructor(props) {
    super(props);
    this.state = {
      theme: {
        color: LIGHT,
      },
      initial: true,
    };
    this.toggleColor = this.toggleColor.bind(this);
  }

  toggleColor() {
    this.setState((prevState) => {
      let newColor = prevState.theme === DARK ? LIGHT : DARK;
      this.props.changeTheme(newColor);
      return {
        theme: newColor,
      };
    });
  }
  componentDidMount() {
    if (this.state.initial) {
      if (JSON.parse(localStorage.getItem("state")) != null) {
        let result = JSON.parse(localStorage.getItem("state"));
        this.props.entryFetch(result);
      }

      return this.setState({ initial: false });
    }
    let stateWithPeriod = [{ name: "", period: "", date: new Date() }];
    if (localStorage.getItem("state") != null) {
      stateWithPeriod = JSON.parse(localStorage.getItem("state"))
        .periodList || [{ name: "", period: "", date: new Date() }];
    }
    this.props.fetchPeriod(stateWithPeriod);
    let currentTheme = JSON.parse(localStorage.getItem("state")).theme;
    if (this.state.theme.color !== currentTheme) {
      this.props.changeTheme(currentTheme);
      this.setState({
        theme: {
          color: currentTheme,
        },
      });
    }
  }

  render() {
    let theme = {
      color: this.state.color,
    };
    return (
      <Theme theme={theme}>
        <Header title="Domowa spiżarnia" main />
        <Router>
          <>
            <NavBar>
              <NavLink
                style={style}
                activeStyle={activeStyle}
                exact
                to={routes.home}
              >
                Zapasy
              </NavLink>
              <NavLink
                style={style}
                activeStyle={activeStyle}
                to={routes.toBuy}
              >
                Lista zakupów
              </NavLink>
              <NavLink
                style={style}
                activeStyle={activeStyle}
                to={routes.settings}
              >
                Ustawienia
              </NavLink>
            </NavBar>
            <Switch>
              <Route path={routes.toBuy}>
                <ToBuy />
              </Route>
              <Route path={routes.settings}>
                <Settings fn={this.toggleColor} />
              </Route>
              <Route exact path={routes.home}>
                <Home />
              </Route>
            </Switch>
          </>
        </Router>
      </Theme>
    );
  }
}

const mapDispatchToProps = (dispatch) => ({
  changeTheme: (payload) => dispatch(changeTemplate(payload)),
  fetchPeriod: (payload) => dispatch(fetchPeriodList(payload)),
  entryFetch: (payload) => dispatch(initialFetch(payload)),
});

const mapStateToProps = (theme) => {
  return theme;
};

const WrappedApp = connect(mapStateToProps, mapDispatchToProps)(App);

export default WrappedApp;
