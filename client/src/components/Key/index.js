import React from "react";
import PropTypes from "prop-types";
import io from "socket.io-client";
import "./Key.css";

let socket = io();

class Key extends React.Component {
  static propTypes = {
    keySettings: PropTypes.object.isRequired,
    handleFNToggle: PropTypes.func
  };

  componentDidMount() {
    socket.on("keyPress", function(data) {
      socket.emit("keyPress", data);
    });
  }

  handleClick = letter => {
    const { handleFNToggle } = this.props;
    socket.emit("keyPress", letter);
    if (letter === "i") {
      handleFNToggle();
    }
  };

  render() {
    const { isFNOn } = this.props;
    const { keySettings, displayMode } = this.props;
    const { letter, display, size = "", color, FN } = keySettings;

    return (
      <div
        className={`keyWrapper ${size}`}
        onClick={() => this.handleClick(letter)}
      >
        <div
          className="key"
          style={{
            backgroundColor: isFNOn && display === "FN" ? "#888" : null
          }}
        >
          <span
            style={{
              color: displayMode === "dev" ? undefined : color
              /*fontSize: display.length >= 3 ? "1.2em" : null*/
            }}
          >
            {displayMode === "dev" ? letter : isFNOn && FN ? FN : display}
          </span>
        </div>
      </div>
    );
  }
}

export default Key;
