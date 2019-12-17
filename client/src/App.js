import React from "react";
import "./App.css";
import { BrowserRouter as Router, Switch, Route, Link } from "react-router-dom";
//absolute imports possible thanks to NODE_PATH var in .env file
import Home from "components/Home";
import Keyboard from "components/Keyboard";
import ShaderParams from "components/ShaderParams";

function App() {
  return (
    <div className="App">
      <Router>
        <Switch>
          <Route path="/keyboard">
            <Keyboard />
          </Route>
          <Route path="/shaderparams">
            <ShaderParams />
          </Route>
          <Route path="/">
            <Home />
          </Route>
        </Switch>
      </Router>
    </div>
  );
}

export default App;
