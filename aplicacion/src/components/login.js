import React, { Component } from "react";
import "bootstrap/dist/css/bootstrap.min.css";
import { Switch, Route, BrowserRouter } from "react-router-dom";
import RegistroUsu from "./RegistroUsu";
import axios from "axios";
import RegistroEst from "./RegistroEst";

var usuarios = [];
export default class Login extends Component {
  constructor(props) {
    super(props);

    this.state = {
      usernameOrEmail: "",
      password: "",
    };

    this.handleChange = this.handleChange.bind(this);
    this.handleSubmit = this.handleSubmit.bind(this);
  }

  async componentDidMount() {
    const res = await axios.get("http://localhost:8096/users/");
    usuarios = res.data;
  }

  handleChange(e) {
    const name = e.target.name;
    const value = e.target.value;
    this.setState({
      [name]: value,
    });
  }

  handleSubmit = async (e) => {
    e.preventDefault();
    var comprobar = true;

    if (comprobar) {
      try {
        let config = {
          method: "POST",
          headers: {
            Accept: "application/json",
            "Content-Type": "application/json",
          },
          body: JSON.stringify(this.state),
        };
        let res = await fetch("http://localhost:8096/login/", config);
        let json = await res.json();
        console.log(json);
      } catch (error) {}
    }
    this.props.history.push("/registro");
  };

  render() {
    return (
      <div id="caja_login" className="mt-5">
        <div className="submit-form">
          <from onSubmit={this.handleSubmit}>
            <h2>Login</h2>
            <div className="form-group">
              <label className="mt-4">email</label>
              <input
                className="form-control text-center"
                style={{
                  background: "#24303c",
                  border: "1px solid white",
                  color: "white",
                  borderradius: "4px",
                }}
                type="text"
                placeholder="Ingrese su email"
                id="usernameOrEmail"
                required
                name="usernameOrEmail"
                onChange={this.handleChange}
                value={this.state.usernameOrEmail}
              />
            </div>
            <div className="form-group">
              <label className="mt-2">Contraseña</label>
              <input
                className="form-control text-center"
                style={{
                  background: "#24303c",
                  border: "1px solid white",
                  color: "white",
                  borderradius: "4px",
                }}
                type="password"
                placeholder="Ingrese su contraseña"
                id="password"
                required
                name="password"
                onChange={this.handleChange}
                value={this.state.password}
              />
            </div>

            <button
              className="btn btn-block bg-primary mt-5 text-white"
              type="submit"
              value="Submit"
              onClick={this.handleSubmit}
            >
              Iniciar sesion
            </button>
          </from>
        </div>

        <a aria-current="page" href="/registrar">
          <button className="btn btn-block bg-secondary mt-2 text-white">
            Registrarse
          </button>
        </a>

        <div
          id="alerta_danger"
          className="mt-4"
          style={{ background: "rgb(206, 85, 85)" }}
        ></div>

        <div id="alerta_succes" className="mt-4 bg-success"></div>

        <br />
        <BrowserRouter>
          <Switch>
            <Route exact path="/registrar" component={RegistroUsu} />
          </Switch>
        </BrowserRouter>
      </div>
    );
  }
}
