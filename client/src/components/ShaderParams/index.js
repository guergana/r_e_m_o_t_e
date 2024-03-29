import React from "react";
import "./ShaderParams.scss";
import Slider from "../Slider";

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
            <Slider key={slider} shader="shader0" paramName={slider} />
          ))}
        </div>
      </div>
    );
  }
}

export default ShaderParams;
