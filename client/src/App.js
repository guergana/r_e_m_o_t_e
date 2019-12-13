import React from "react";
import keysData from "data/keys";
import "./App.css";
//absolute imports possible thanks to NODE_PATH var in .env file
import Key from "components/Key";

function App() {
  const displayMode = "normal"; // "dev" or whatever else
  return (
    <div className="App">
      {keysData.map(key => {
        return (
          <Key key={key.letter} displayMode={displayMode} keySettings={key} />
        );
      })}
    </div>
  );
}

export default App;
