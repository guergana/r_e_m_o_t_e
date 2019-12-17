import React from "react";
import "./Slider.css";
import { Range, getTrackBackground } from "react-range";

const STEP = 0.1;
const MIN = 0;
const MAX = 100;

const Direction = "to top";

class Slider extends React.Component {
  state = { values: [50] };
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
          onChange={values => this.setState({ values })}
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
            {this.state.values[0].toFixed(1)}
          </output>
        }
      </div>
    );
  }
}

export default Slider;
