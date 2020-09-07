import React, { Component } from "react";
import { BrowserRouter as Router, Route, Switch } from "react-router-dom";
import Users from "./component/Users";
import AddUser from "./component/AddUser"
import EditUser from "./component/EditUser"

import "./App.css"
class App extends Component {
  render() {
    return (
      <Router>
        <div className="App">
          <Switch>
            <Route path="/" exact component={Users} />
            <Route path="/Adduser" exact component={AddUser} />
            <Route path="/EditUser/:id" exact component={EditUser} />
          </Switch>
        </div>
      </Router>
    );
  }
}

export default App;
