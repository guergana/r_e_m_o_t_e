import React from "react";
import keysData from "../../data/keys";
import Key from "../Key";

class Keyboard extends React.Component {
  state = {
    isFNOn: false,
    displayMode: "normal"
  };

  handleFNToggle = () => {
    const { isFNOn } = this.state;
    this.setState({ isFNOn: !isFNOn, displayMode: "FN" });
  };

  componentDidMount() {}

  render() {
    const { isFNOn, displayMode } = this.state;
    return (
      <React.Fragment>
        {keysData.map(key => {
          return (
            <Key
              key={key.letter}
              displayMode={displayMode}
              keySettings={key}
              isFNOn={isFNOn}
              handleFNToggle={this.handleFNToggle}
            />
          );
        })}
      </React.Fragment>
    );
  }
}

export default Keyboard;
