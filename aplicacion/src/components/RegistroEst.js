import React, { Component } from "react";
import "bootstrap/dist/css/bootstrap.min.css";
import { Switch, Route, BrowserRouter } from "react-router-dom";
import { Link } from "react-router-dom";

export default class RegistroEst extends Component {
  constructor(props) {
    super(props);

    this.state = {
      id: null,
      departureDate: "",
      departureAirportCode: "",
      departureAirportName: "",
      departureCity: "",
      departureLocale: "",
      arrivalDate: "",
      arrivalAirportCode: "",
      arrivalAirportName: "",
      arrivalCity: "",
      arrivalLocale: "",
      ticketPrice: 0,
      ticketCurrency: "",
      flightNumber: 0,
      seatCapacity: 0,
    };

    this.handleChange = this.handleChange.bind(this);
    this.handleSubmit = this.handleSubmit.bind(this);
  }

  cancelCourse = () => {
    this.setState({
      departureDate: "",
      departureAirportCode: "",
      departureAirportName: "",
      departureCity: "",
      departureLocale: "",
      arrivalDate: "",
      arrivalAirportCode: "",
      arrivalAirportName: "",
      arrivalCity: "",
      arrivalLocale: "",
      ticketPrice: 0,
      ticketCurrency: "",
      flightNumber: 0,
      seatCapacity: 0,
    });
  };

  handleChange(e) {
    const target = e.target;
    const value = target.type === "checkbox" ? target.checked : target.value;
    const name = target.name;
    this.setState({
      [name]: value,
    });
  }

  handleSubmit = async (e) => {
    this.state.longitud = parseFloat(this.state.longitud);
    this.state.latitud = parseFloat(this.state.latitud);
    e.preventDefault();

    try {
      let config = {
        method: "POST",
        headers: {
          Accept: "application/json",
          "Content-Type": "application/json",
        },
        body: JSON.stringify(this.state),
      };
      let res = await fetch("http://localhost:8096/catalog/", config);
      let json = await res.json();
      const idvuelo = json.id;
      console.log(json);
      alert("se creo el vuelo sastifactoriamente");
      this.props.history.push("/reserva/${idvuelo}");
    } catch (error) {}
  };

  render() {
    return (
      <div className="container px-4 px-lg-5 my-3">
        <form onSubmit={this.handleSubmit} id="create-course-form">
          <div
            className="container border border-dark px-4 px-lg-5 p-2"
            id="caja"
          >
            <div className="submit-form">
              <h3 className="text-center mt-4 font-italic">
                Informacion de salida
              </h3>
              <hr></hr>
              <div className="row">
                <div className="col">
                  <div className="form-group">
                    <label className="labels" htmlFor="departureDate">
                      Fecha de salida
                    </label>
                    <input
                      type="date"
                      className="form-control"
                      style={{ width: "100%" }}
                      id="departureDate"
                      required
                      name="departureDate"
                      onChange={this.handleChange}
                      value={this.state.departureDate}
                    />
                  </div>
                </div>
                <div className="col">
                  <div className="form-group">
                    <label className="labels" htmlFor="departureAirportCode">
                      Código del aeropuerto de salida
                    </label>
                    <br />
                    <input
                      type="text"
                      style={{ width: "100%", height: "37px" }}
                      id="departureAirportCode"
                      placeholder="Escribe el Código del aeropuerto de salida"
                      required
                      name="departureAirportCode"
                      onChange={this.handleChange}
                      value={this.state.departureAirportCode}
                    />
                  </div>
                </div>
              </div>

              <div className="row">
                <div className="col">
                  <div className="form-group">
                    <label
                      className="labels mt-2"
                      htmlFor="departureAirportName"
                    >
                      Nombre del aeropuerto de salida
                    </label>
                    <br />
                    <input
                      type="text"
                      style={{ width: "100%" }}
                      id="departureAirportName"
                      placeholder="Escribe el nombre del aeropuerto de salida"
                      required
                      name="departureAirportName"
                      onChange={this.handleChange}
                      value={this.state.departureAirportName}
                    />
                  </div>
                </div>
                <div className="col">
                  <div className="form-group">
                    <label className="labels mt-2" htmlFor="departureCity">
                      Ciudad de salida
                    </label>
                    <br />
                    <input
                      type="text"
                      style={{ width: "100%" }}
                      id="departureCity"
                      placeholder="Escribe la ciudad de salida..."
                      required
                      name="departureCity"
                      onChange={this.handleChange}
                      value={this.state.departureCity}
                    />
                  </div>
                </div>
              </div>

              <div className="form-group">
                <label className="labels mt-2" htmlFor="departureLocale">
                  Lugar de salida
                </label>
                <br />
                <input
                  type="text"
                  style={{ width: "100%" }}
                  id="departureLocale"
                  placeholder="Escribe el lugar de salida.. "
                  required
                  name="departureLocale"
                  onChange={this.handleChange}
                  value={this.state.departureLocale}
                />
              </div>

              <h3 className="text-center mt-5 font-italic">
                Informacion de llegada
              </h3>
              <hr />

              <div className="row">
                <div className="col">
                  <div className="form-group">
                    <label className="labels" htmlFor="arrivalDate">
                      Fecha de llegada
                    </label>
                    <input
                      type="date"
                      className="form-control"
                      style={{ width: "100%" }}
                      id="arrivalDate"
                      required
                      name="arrivalDate"
                      onChange={this.handleChange}
                      value={this.state.arrivalDate}
                    />
                  </div>
                </div>
                <div className="col">
                  <div className="form-group">
                    <label className="labels" htmlFor="arrivalAirportCode">
                      Código del aeropuerto de llegada
                    </label>
                    <br />
                    <input
                      type="text"
                      style={{ width: "100%" }}
                      id="arrivalAirportCode"
                      placeholder="Escribe el Código del aeropuerto de llegada"
                      required
                      name="arrivalAirportCode"
                      onChange={this.handleChange}
                      value={this.state.arrivalAirportCode}
                    />
                  </div>
                </div>
              </div>

              <div className="row">
                <div className="col">
                  <div className="form-group">
                    <label className="labels mt-2" htmlFor="arrivalAirportName">
                      Nombre del aeropuerto de llegada
                    </label>
                    <br />
                    <input
                      type="text"
                      style={{ width: "100%" }}
                      id="arrivalAirportName"
                      placeholder="Escribe el nombre del aeropuerto de llegada"
                      required
                      name="arrivalAirportName"
                      onChange={this.handleChange}
                      value={this.state.arrivalAirportName}
                    />
                  </div>
                </div>
                <div className="col">
                  <div className="form-group">
                    <label className="labels mt-2" htmlFor="arrivalCity">
                      Ciudad de llegada
                    </label>
                    <br />
                    <input
                      type="text"
                      style={{ width: "100%" }}
                      id="arrivalCity"
                      placeholder="Escribe la ciudad de llegada..."
                      required
                      name="arrivalCity"
                      onChange={this.handleChange}
                      value={this.state.arrivalCity}
                    />
                  </div>
                </div>
              </div>

              <div className="form-group">
                <label className="labels mt-2" htmlFor="arrivalLocale">
                  Lugar de llegada
                </label>
                <br />
                <input
                  type="text"
                  style={{ width: "100%" }}
                  id="arrivalLocale"
                  placeholder="Escribe el lugar de llegada "
                  required
                  name="arrivalLocale"
                  onChange={this.handleChange}
                  value={this.state.arrivalLocale}
                />
              </div>

              <h3 className="text-center mt-4 font-italic">
                Informacion Extra
              </h3>
              <hr />

              <div className="row">
                <div className="col">
                  <div className="form-group">
                    <label className="labels" htmlFor="ticketPrice">
                      Precio del ticket
                    </label>
                    <input
                      type="number"
                      min="1.00"
                      max="10000.00"
                      placeholder="Escribe el precio del ticket aquí"
                      className="form-control"
                      style={{ width: "100%" }}
                      id="ticketPrice"
                      required
                      name="ticketPrice"
                      onChange={this.handleChange}
                      value={this.state.ticketPrice}
                    />
                  </div>
                </div>
                <div className="col">
                  <div className="form-group">
                    <label className="labels" htmlFor="ticketCurrency">
                      Moneda del ticket
                    </label>
                    <input
                      type="text"
                      placeholder="Escribe la moneda del ticket aquí"
                      className="form-control"
                      style={{ width: "100%" }}
                      id="ticketCurrency"
                      required
                      name="ticketCurrency"
                      onChange={this.handleChange}
                      value={this.state.ticketCurrency}
                    />
                  </div>
                </div>
              </div>
              <div className="row">
                <div className="col">
                  <div className="form-group">
                    <label className="labels" htmlFor="flightNumber">
                      Número de vuelo
                    </label>
                    <input
                      type="number"
                      min="1"
                      max="10000"
                      placeholder="Escribe el número de vuelo aquí"
                      className="form-control"
                      style={{ width: "100%" }}
                      id="flightNumber"
                      required
                      name="flightNumber"
                      onChange={this.handleChange}
                      value={this.state.flightNumber}
                    />
                  </div>
                </div>
                <div className="col">
                  <div className="form-group">
                    <label className="labels" htmlFor="seatCapacity">
                      Establecer capacidad
                    </label>
                    <input
                      type="number"
                      min="1"
                      max="10000"
                      placeholder="Establece la capacidad aquí"
                      className="form-control"
                      style={{ width: "100%" }}
                      id="seatCapacity"
                      required
                      name="seatCapacity"
                      onChange={this.handleChange}
                      value={this.state.seatCapacity}
                    />
                  </div>
                </div>
              </div>
            </div>

            <div className="row justify-content-center mt-4 p-4">
              
                <button
                  type="submit"
                  className="btn btn-block bg-primary text-light "
                  value="Submit"
                >
                  Guardar
                </button>
              
              <button
                className="btn btn-block bg-secondary text-light mt-3 "
                onClick={this.cancelCourse}
              >
                Limpiar
              </button>
            </div>
          </div>
        </form>
      </div>
    );
  }
}
