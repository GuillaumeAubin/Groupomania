import React from "react";
import ReactDOM from "react-dom";
import { BrowserRouter as Router, Route, Switch } from "react-router-dom";
import Home from "./pages/Home";
import Forum from "./pages/Forum";
import Login from "./pages/Login";
import Signup from "./pages/Signup";
import Profile from "./pages/Profile";
import Header from "./components/Header";
import Footer from "./components/Footer";
import "./style/index.css";

import { DataProvider } from "./DataContext";

ReactDOM.render(
  <Router>
    <Switch>
      <DataProvider>
        <Header />
        <Route exact path="/">
          <Home />
        </Route>
        <Route path="/login">
          <Login />
        </Route>
        <Route path="/signup">
          <Signup />
        </Route>
        <Route path="/forum">
          <Forum />
        </Route>
        <Route path="/profile">
          <Profile />
        </Route>
      </DataProvider>
    </Switch>
    <Footer />
  </Router>,
  document.getElementById("root")
);
