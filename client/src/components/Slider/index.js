import React from "react";
import io from "socket.io-client";
import PropTypes from "prop-types";
import { Range, getTrackBackground } from "react-range";

const STEP = 0.01;
const MIN = 0;
const MAX = 1;

let socket = io();
const Direction = "to top";

class Slider extends React.Component {
  static propTypes = {
    shader: PropTypes.string.isRequired,
    paramName: PropTypes.string.isRequired
  };

  state = { values: [0.0] };

  onChangeHandler = values => {
    const { paramName } = this.props;
    this.setState({ values });
    socket.emit("sliderChange", { paramName, value: values[0] });
  };

  componentDidMount() {
    //add eventlistener
    socket.on("sliderChange", function(data) {
      socket.emit("sliderChange", data);
    });
  }

  render() {
    return (
      <div
        class="slider"
        style={{
          display: "flex",
          alignItems: "center",
          height: "100%",
          flexDirection: "column"
        }}
      >
        <Range
          direction={Direction}
          values={this.state.values}
          step={STEP}
          min={MIN}
          max={MAX}
          onChange={values => this.onChangeHandler(values)}
          renderTrack={({ props, children }) => (
            <div
              onMouseDown={props.onMouseDown}
              onTouchStart={props.onTouchStart}
              style={{
                ...props.style,
                flexGrow: 1,
                width: "36px",
                display: "flex",
                height: "60vh"
              }}
            >
              <div
                ref={props.ref}
                style={{
                  width: "10px",
                  height: "100%",
                  borderRadius: "4px",
                  background: getTrackBackground({
                    values: this.state.values,
                    colors: ["yellow", "#ccc"],
                    min: MIN,
                    max: MAX,
                    direction: Direction
                  }),
                  alignSelf: "center"
                }}
              >
                {children}
              </div>
            </div>
          )}
          renderThumb={({ props, isDragged }) => (
            <div
              {...props}
              style={{
                ...props.style,
                height: "60px",
                width: "60px",
                borderRadius: "30px",
                backgroundColor: "gray",
                display: "flex",
                justifyContent: "center",
                alignItems: "center"
              }}
            >
              <div
                style={{
                  width: "16px",
                  height: "5px",
                  backgroundColor: isDragged ? "yellow" : "#CCC"
                }}
              />
            </div>
          )}
        />
        {
          <output
            style={{ marginTop: "50px", marginBottom: "50px", width: "56px" }}
            id="output"
          >
            {this.state.values[0].toFixed(2)}
          </output>
        }
      </div>
    );
  }
}

export default Slider;
