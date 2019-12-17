import React from "react";
//import io from "socket.io-client";
import "./ShaderParams.css";
import Slider from "components/Slider";
//let socket = io();

const sliders = [
  "shaderparam0",
  "shaderparam1",
  "shaderparam2",
  "shaderparam3"
];

class ShaderParams extends React.Component {
  static propTypes = {};

  render() {
    return (
      <div className={`container shaderparams`}>
        <h3>ShaderParams</h3>
        <div class="slider-panel">
          {sliders.map(slider => (
            <Slider key={slider} />
          ))}
        </div>
      </div>
    );
  }
}

export default ShaderParams;
