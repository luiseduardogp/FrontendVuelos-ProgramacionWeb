import React, { Component } from "react";
import "bootstrap/dist/css/bootstrap.min.css";
import axios from "axios";
import { useParams, withRouter } from "react-router-dom";
import {
  Card,
  CardBody,
  CardTitle,
  CardText,
  Modal,
  Button,
} from "react-bootstrap";

class RegistroPar extends Component {
  constructor(props) {
    super(props);

    this.state = {
      bookingData: {
        id: null,
        status: 0,
        paymentToken: "",
        checkedIn: false,
        createdAt: "",
        bookingReference: "",
      },
      reservas: [],
      showModal: false,
      usuarios: [],
      vuelos: [],
      selectedUser: "",
      selectedUserId: 0,
      selectedFlightId: 0,
      selectedFlight: "",
      nombreUser: "",
      bookingStatus: "",
    };
    this.handleChange = this.handleChange.bind(this);
    this.handleSubmit = this.handleSubmit.bind(this);
  }

  async componentDidMount() {
    const res = await axios.get("http://localhost:8096/booking/");
    const reservas = res.data;
    this.setState({ reservas });
    this.fetchUsuarios();
  }

  fetchUsuarios = async () => {
    try {
      const res = await axios.get("http://localhost:8096/users/");
      this.setState({ usuarios: res.data });
    } catch (error) {
      console.log(error);
    }
  };

  handleUserChange = (e) => {
    const selectedUserId = e.target.value;
    const selectedUserName = e.target.options[e.target.selectedIndex].text;

    this.setState({
      selectedUser: selectedUserName,
      selectedUserId: selectedUserId,
    });
  };

  handleChange(e) {
    const name = e.target.name;
    const value = e.target.value;
    this.setState((prevState) => ({
      bookingData: {
        ...prevState.bookingData,
        [name]: value,
      },
    }));
  }

  handleNombreUserChange = (event) => {
    this.setState({ nombreUser: event.target.value });
  };

  handleBookingStatusChange = (event) => {
    this.setState({ bookingStatus: event.target.value });
  };

  buscarReservas = async () => {
    const { nombreUser, bookingStatus } = this.state;
    const url = `http://localhost:8096/booking/?nombreUser=${nombreUser}&bookingStatus=${bookingStatus}`;
    const res = await axios.get(url);
    const reservas = res.data;
    this.setState({ reservas });
  };

  handleSubmit = async (e) => {
    e.preventDefault();

    try {
      const { match } = this.props;
      const idflight = match.params.id; // Obtén el valor correcto de idflight
      const userid = this.state.selectedUserId;
      const url = `http://localhost:8096/booking/flight/${idflight}/user/${userid}`;
      let response = await axios.post(url, this.state.bookingData);
      console.log(response.data);
      alert("Se creó la reserva correctamente");
    } catch (error) {
      console.error(error);
    }
  };

  eliminarReserva = async (idReserva) => {
    try {
      await axios.delete(`http://localhost:8096/booking/${idReserva}`);

      const res = await axios.get("http://localhost:8096/booking/");
      const reservasActualizadas = res.data;

      this.setState({ reservas: reservasActualizadas });
      this.setState({ showModal: true });
    } catch (error) {
      console.error(error);
    }
  };

  render() {
    const {
      usuarios,

      selectedUser,
      selectedUserId,
    } = this.state;
    return (
      <div className="container px-4 px-lg-5 my-2" id="caja">
        <div className="container  px-4 px-lg-5 p-2 justify-content-center">
          <h3 className="text-center mt-4 font-italic ">Reserva</h3>
          <hr />
          <form onSubmit={this.handleSubmit}>
            <div className="submit-form border-top w-70">
              <div className="form-group">
                <label className="labels" htmlFor="paymentToken">
                  Ficha de pago
                </label>
                <input
                  type="text"
                  placeholder="Escribe la ficha de pago"
                  className="form-control"
                  id="paymentToken"
                  required
                  name="paymentToken"
                  onChange={this.handleChange}
                  value={this.state.paymentToken}
                />
              </div>

              <div className="form-group">
                <label className="labels" htmlFor="selectedUser">
                  Usuario
                </label>
                <select
                  className="form-control"
                  id="selectedUser"
                  required
                  name="selectedUser"
                  onChange={this.handleUserChange}
                  value={selectedUserId}
                >
                  <option value="">Seleccione un usuario</option>
                  {usuarios.map((usuario) => (
                    <option key={usuario.id} value={usuario.id}>
                      {usuario.nombre}
                    </option>
                  ))}
                </select>
              </div>

              <div className="row mt-4">
                <div className="col">
                  <div className="form-group">
                    <label className="labels" htmlFor="checkedIn">
                      Registrado
                    </label>
                    <select
                      className="ml-2 form-control"
                      name="checkedIn"
                      value={this.state.checkedIn}
                      onChange={this.handleChange}
                      size="1"
                    >
                      <option value="True">Si</option>
                      <option value="False">No</option>
                    </select>
                  </div>
                </div>
                <div className="col">
                  <div className="form-group">
                    <label className="labels" htmlFor="status">
                      Estado
                    </label>
                    <select
                      className="form-control"
                      id="status"
                      required
                      name="status"
                      onChange={this.handleChange}
                      value={this.state.status}
                    >
                      <option value="0">NO confirmado</option>
                      <option value="1">Confirmado</option>
                      <option value="2">Cancelado</option>
                    </select>
                  </div>
                </div>
              </div>

              <div className="row mt-4">
                <div className="col">
                  <div className="form-group">
                    <label className="labels" htmlFor="createdAt">
                      Creado en
                    </label>
                    <input
                      type="text"
                      placeholder="Escribe donde fue creada la reserva"
                      className="form-control"
                      id="createdAt"
                      required
                      name="createdAt"
                      onChange={this.handleChange}
                      value={this.state.createdAt}
                    />
                  </div>
                </div>
                <div className="col">
                  <div className="form-group">
                    <label className="labels" htmlFor="bookingReference">
                      Referencia de reservación
                    </label>
                    <input
                      type="text"
                      placeholder="Escribe la referencia de reservación"
                      className="form-control"
                      id="bookingReference"
                      required
                      name="bookingReference"
                      onChange={this.handleChange}
                      value={this.state.bookingReference}
                    />
                  </div>
                </div>
              </div>

              <button
                type="submit"
                className="btn btn-block bg-primary text-light"
                value="Submit"
                onClick={this.handleSubmit}
              >
                Agregar
              </button>
            </div>
          </form>

          <h3 className="text-center mt-4 font-italic">Lista de reservas</h3>
          <hr></hr>

          <div className="container mt-5">
            <div className="row">
              <div className="col-md-6 mb-3">
                <label className="labels" htmlFor="bookingStatus">
                  Nombre Usuario
                </label>
                <input
                  type="text"
                  className="form-control"
                  placeholder="Nombre de usuario"
                  value={this.state.nombreUser}
                  onChange={this.handleNombreUserChange}
                />
              </div>
              <div className="col-md-6 mb-3">
                <div className="form-group">
                  <label className="labels" htmlFor="bookingStatus">
                    Estado
                  </label>
                  <select
                    className="form-control"
                    id="bookingStatus"
                    required
                    name="bookingStatus"
                    onChange={this.handleBookingStatusChange}
                    value={this.state.bookingStatus}
                  >
                    <option value="UNCONFIRMED">NO confirmado</option>
                    <option value="CONFIRMED">Confirmado</option>
                    <option value="CANCELLED">Cancelado</option>
                  </select>
                </div>
              </div>
              <div className="col-md-12">
                <button
                  className="btn btn-primary"
                  onClick={this.buscarReservas}
                >
                  Buscar
                </button>
              </div>
            </div>
          </div>
          <div className="row mt-5">
            {this.state.reservas.map((value, index) => {
              return (
                <div className="col-md-4" key={value.id}>
                  <div className="card">
                    <div className="card-body text-center">
                      <h5 className="card-title">{value.id}</h5>
                      <div className="card-grid">
                        <div className="card-item">
                          <p className="card-label">FICHA DE PAGO</p>
                          <p className="card-value">{value.paymentToken}</p>
                        </div>
                        <div className="card-item">
                          <p className="card-label">Creado en</p>
                          <p className="card-value">{value.createdAt}</p>
                        </div>
                        <div className="card-item">
                          <p className="card-label">
                            Referencia de reservación
                          </p>
                          <p className="card-value">{value.bookingReference}</p>
                        </div>
                      </div>
                      <button
                        className="btn btn-danger"
                        onClick={() => this.eliminarReserva(value.id)}
                      >
                        Eliminar reserva
                      </button>
                    </div>
                  </div>
                </div>
              );
            })}
            <Modal
              show={this.state.showModal}
              onHide={() => this.setState({ showModal: false })}
            >
              <Modal.Header closeButton>
                <Modal.Title>Reserva eliminada</Modal.Title>
              </Modal.Header>
              <Modal.Body>
                La reserva se ha eliminado satisfactoriamente.
              </Modal.Body>
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
        </div>
      </div>
    );
  }
}

export default withRouter(RegistroPar);
