import React from "react";
import "./App.css";
//absolute imports possible thanks to NODE_PATH var in .env file
import Keyboard from "components/Keyboard";

function App() {
  return (
    <div className="App">
      <Keyboard />
    </div>
  );
}

export default App;
