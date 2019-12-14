import React from "react";
import PropTypes from "prop-types";
import keysData from "data/keys";
import Key from "components/Key";

class Keyboard extends React.Component {
  static propTypes = {
    keySettings: PropTypes.object.isRequired,
    handleFNToggle: PropTypes.func
  };

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
