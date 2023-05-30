import React from "react";
import axios from "axios";
import "leaflet/dist/leaflet.css";
import { Link } from "react-router-dom";
import { Modal, Button } from "react-bootstrap";

export default class RegistroReserva extends React.Component {
  constructor() {
    super();
    this.state = {
      departureAirportName: "",
      arrivalAirportName: "",
      departureDate: "",
      vuelos: [],
      isSearching: true,
      showModal: false,
    };
    this.handleChange = this.handleChange.bind(this);
    this.handleSubmit = this.handleSubmit.bind(this);
    this.getFlights = this.getFlights.bind(this);
  }

  getFlights = async () => {
    const { departureAirportName, arrivalAirportName, departureDate } =
      this.state;
    console.log(departureAirportName, arrivalAirportName, departureDate);
    try {
      const response = await axios.get("http://localhost:8096/catalog/", {
        params: {
          departureAirportName: departureAirportName,
          arrivalAirportName: arrivalAirportName,
          departureDate: departureDate,
        },
      });
      this.setState({ vuelos: response.data, isSearching: false });
      console.log(response.data);
    } catch (error) {
      console.error(error);
    }
  };

  handleChange(e) {
    const name = e.target.name;
    const value = e.target.value;
    this.setState({
      [name]: value,
    });
  }

  handleSubmit = (e) => {
    e.preventDefault();
    this.getFlights();
  };

  eliminarVuelo = async (idVuelo) => {
    try {
      await axios.delete(`http://localhost:8096/catalog/${idVuelo}`);

      this.setState({ showModal: true });
    } catch (error) {
      console.error(error);
    }
  };

  renderSearchForm() {
    return (
      <div id="caja_buscador" className="col-4">
        <div class="header">
          <h1 class="title mt-3">Where next?</h1>
        </div>
        <div className="submit-form border-top w-70">
          <div class="form-section">
            <div className="input-group mt-2" id="input-group">
              <div className="row">
                <div className="col-3">
                  <img
                    src="vuelo.png"
                    alt="Icono avión despegando"
                    className="icon"
                  />
                </div>
                <div className="col">
                  <input
                    className="form-control"
                    id="departureAirportName"
                    type="text"
                    placeholder="Departure Airport"
                    required
                    name="departureAirportName"
                    onChange={this.handleChange}
                    value={this.state.departureAirportName}
                  />
                </div>
              </div>
            </div>
            <div className="input-group mt-2">
              <div className="row">
                <div className="col-3">
                  <img
                    src="aterrizaje-de-avion.png"
                    alt="Icono avión aterrizando"
                    className="icon"
                  />
                </div>
                <div className="col">
                  <input
                    className="form-control"
                    id="arrivalAirportName"
                    type="text"
                    placeholder="Arrival Airport"
                    required
                    name="arrivalAirportName"
                    onChange={this.handleChange}
                    value={this.state.arrivalAirportName}
                  />
                </div>
              </div>
            </div>
            <div className="input-group mt-2">
              <div className="row">
                <div className="col-2">
                  <img
                    src="calendario.png"
                    alt="Icono calendario"
                    className="icon"
                  />
                </div>
                <div className="col-10">
                  <input
                    className="form-control"
                    id="departureDate"
                    type="date"
                    placeholder="Pick a date"
                    required
                    name="departureDate"
                    onChange={this.handleChange}
                    value={this.state.departureDate}
                  />
                </div>
              </div>
            </div>
            <button
              className="search-button mb-3"
              id="search-button"
              type="submit"
              onClick={this.handleSubmit}
            >
              Search Flights
            </button>
          </div>
        </div>
      </div>
    );
  }
  renderFlights() {
    const { vuelos } = this.state;

    return (
      <div className="ml-3 mt-3">
        {vuelos.map((vuelo, index) => (
          <React.Fragment key={index}>
            <div className="ml-3 mb-3">
              <div className="row row-cols-3 bg-white">
                <div className="col border-0 mt-2 text-left">
                  {vuelo.departureCity}
                </div>
                <div className="col border-0 mt-2"></div>
                <div className="col border-0 mt-2 text-right">
                  {vuelo.arrivalCity}
                </div>
                <div className="col border-0 mt-2"></div>
                <div className="col border-0 mt-2"></div>
                <div className="col border-0 mt-2"></div>
                <div className="col border-0 mt-2 ">
                  <img
                    className="icon"
                    src="vuelo.png"
                    alt="Icono despegando"
                  />
                </div>
                <div className="col border-0 text-center">
                  <p style={{ marginBottom: "0px" }}>Fecha de llegada</p>
                  {vuelo.arrivalDate}
                </div>
                <div className="col border-0 text-right">
                  <img
                    className="icon"
                    src="aterrizaje-de-avion.png"
                    alt="Icono aterrizando"
                  />
                </div>
                <div className="col border-0 mt-2">
                  {vuelo.departureAirportCode}
                </div>
                <div className="col border-0 mt-2"></div>
                <div className="col border-0 mt-2 text-right">
                  {vuelo.arrivalAirportCode}
                </div>
                <div
                  className="col border-0 mt-2"
                  style={{ display: "flex", alignItems: "center" }}
                >
                  <p
                    style={{
                      width: "20px",

                      verticalAlign: "middle",
                      marginBottom: "0px",
                    }}
                  >
                    $
                  </p>
                  {vuelo.ticketPrice}
                </div>
                <div className="col border-0 mt-2 "></div>
                <div
                  className="col border-0 mt-2 text-right"
                  style={{
                    display: "flex",
                    justifyContent: "flex-end",
                  }}
                >
                  <p style={{ marginRight: "5px", verticalAlign: "middle" }}>
                    # de vuelo:
                  </p>
                  <p>{vuelo.flightNumber}</p>
                </div>
                <div className="col border-0 mt-2"> </div>
                <div className="col border-0 mt-2 text-center">
                  <Link to={`/reservas/${vuelo.id}`} className="text-center">
                    <button className="btn btn-primary mb-3 mr-3">
                      Reservar
                    </button>
                  </Link>
                  <button
                    className="btn btn-danger mb-3"
                    onClick={() => this.eliminarVuelo(vuelo.id)}
                  >
                    eliminar
                  </button>
                </div>
                <div className="col border-0 mt-2"></div>

                <div className="col border-0"></div>
              </div>
            </div>
          </React.Fragment>
        ))}
        <Modal
          show={this.state.showModal}
          onHide={() => this.setState({ showModal: false })}
        >
          <Modal.Header closeButton>
            <Modal.Title>Vuelo eliminado</Modal.Title>
          </Modal.Header>
          <Modal.Body>El vuelo se ha eliminado sastifactoriamente</Modal.Body>
          <Modal.Footer>
            <Button
              variant="secondary"
              onClick={() => this.setState({ showModal: false })}
            >
              Cerrar
            </Button>
          </Modal.Footer>
        </Modal>
      </div>
    );
  }

  render() {
    const { isSearching } = this.state;

    return (
      <div className="container d-flex justify-content-center align-items-center">
        {isSearching ? this.renderSearchForm() : this.renderFlights()}
      </div>
    );
  }
}
