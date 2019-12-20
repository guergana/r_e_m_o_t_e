import React from "react";
import { Link } from "react-router-dom";
import "./Home.scss";

class ShaderParams extends React.Component {
  render() {
    return (
      <div className={`container home`}>
        <h1>
          Welcome to <span className="rainbow">r_e_m_o_t_e</span>,
          <span className="smaller">
            <br />a web extension for interfacing with{" "}
            <span className="recur">r_e_c_u_r</span> via OSC.
          </span>
        </h1>

        <h2>** Choose your fighter **</h2>
        <ul className="interface-list">
          <li>
            <Link to="/keyboard">Keyboard</Link>
          </li>
          <li>
            <Link to="/shaderparams">ShaderParams</Link>
          </li>
        </ul>
      </div>
    );
  }
}

export default ShaderParams;
