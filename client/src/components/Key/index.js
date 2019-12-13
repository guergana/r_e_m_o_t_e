import React from "react";
import PropTypes from "prop-types";
import io from "socket.io-client";
import "./Key.css";

let socket = io();

class Key extends React.Component {
  static propTypes = {
    keySettings: PropTypes.object.isRequired
  };

  componentDidMount() {
    socket.on("keyPress", function(data) {
      console.log("data", data);
      socket.emit("keyPress", data);
    });
  }

  handleClick = letter => {
    socket.emit("keyPress", letter);
  };

  render() {
    const { keySettings, displayMode } = this.props;
    const { letter, display, size = "", color } = keySettings;
    return (
      <div
        className={`keyWrapper ${size}`}
        onClick={() => this.handleClick(letter)}
      >
        <div className="key">
          <span style={{ color: displayMode === "dev" ? undefined : color }}>
            {displayMode === "dev" ? letter : display}
          </span>
        </div>
      </div>
    );
  }
}

export default Key;
