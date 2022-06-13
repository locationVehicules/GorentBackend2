import React, { Component } from "react";
import { NavBar, Footer } from "./LandingPage";
import { Link } from "react-router-dom";
import { ScrollTop } from "../components/ScrollTop";
import { Reservation } from "../GetSetData/Contexts";

import CarsAPIs from "../GetSetData/useAPIs/CarsAPIs";
import ParkingAPIs from "../GetSetData/useAPIs/ParkingAPIs";

export class SelectedVehiclePage extends Component {
  constructor(props) {
    super(props);
    document.body.style.background = "var(--body-color1)";
  }

  render() {
    window.scrollTo({
      top: 0,
      behavior: "smooth",
    });
    return (
      <>
        <NavBar />
        <ScrollTop />
        <VehicleCard path={"SearchResultPage"} />
        <Location />
        <Accessories path={"Login"} />
        <Footer />
      </>
    );
  }
}
export class VehicleCard extends Component {
  constructor(props) {
    super(props);
    this.path = this.props.path;
  }

  render() {
    let totalHours =
      (new Date(this.context.returnDate[0]) - new Date(this.context.rentDate[0])) / 36e5;
    this.context.nbHours[1](Math.round(totalHours % 24));
    this.context.nbDays[1](Math.round(totalHours / 24));
    return (
      <section
        style={{ backgroundColor: "white", borderRadius: "30px" }}
        className="container p-2 mt-4"
      >
        <div>
          <div
            className=" row d-flex justify-content-center"
            style={{ height: "auto" }}
          >
            <div className="col col-md-4 mx-2">
              <img
                className="w-100"
                src={`https://cdn.imagin.studio/getImage?customer=img&${this.context.selectedVehicle[0].photo
                  .replaceAll("%3D", "=")
                  .replace(
                    "%26",
                    "&"
                  )}&angle=23&width=2600&zoomType=fullscreen`}
                alt={`${this.context.selectedVehicle[0].name}_photo`}
              />
              <div
                style={{ display: "flex" }}
                className="car-info d-flex flex-row flex-md-column"
              >
                <div className="info px-3">
                  <i
                    className="bi bi-battery-half  "
                    style={{ fontSize: "40px" }}
                  ></i>
                  <h4 style={{ fontWeight: "900" }}> fuel policy</h4>
                  <p>like to like </p>
                </div>
                <div className="info px-3 ">
                  <i
                    className="bi bi-speedometer"
                    style={{ fontSize: "40px" }}
                  ></i>
                  <h4 style={{ fontWeight: "900" }}> milage</h4>
                  <p>unlimited</p>
                </div>
              </div>
            </div>

            <div className="col col-md-5 p-3 mx-3 d-flex flex-column justify-content-center">
              <div className="d-flex flex-column flex-md-row">
                <div className="d-flex align-items-center marque m-2 p-1">
                  <img
                    className="w-md-25 w-50"
                    src="https://img.icons8.com/external-tal-revivo-regular-tal-revivo/24/undefined/external-toyota-motor-corporation-is-a-japanese-multinational-automotive-manufacturer-automotive-regular-tal-revivo.png"
            
                    alt={`${this.context.selectedVehicle[0].name}_photo`}
                  />
                  <h2 className=" px-3 py-2">
                    {`${this.context.selectedVehicle[0].name}`}
                  </h2>
                </div>
              </div>
              <div className="d-flex flex-wrap justify-content-center">
                <div className="p-2 d-flex flex-column">
                  <i className="bi material-icons p-1 fs-1 d-flex justify-content-center">
                    airline_seat_recline_normal
                  </i>
                  <h4 className="d-flex justify-content-center">
                    {`${this.context.selectedVehicle[0].nb_place}`}
                  </h4>
                </div>
                <div className="p-2 d-flex flex-column">
                  <i className="bi bi-fan p-1 fs-1 d-flex justify-content-center"></i>
                  <h4 className="d-flex justify-content-center">
                    {`${this.context.selectedVehicle[0].moteur_type}`}
                  </h4>
                </div>
                <div className="p-2 d-flex flex-column">
                  <i
                    className="bi bi-diagram-2 p-1 fs-1 d-flex justify-content-center"
                    style={{ transform: "rotate(90deg)" }}
                  ></i>
                  <h4 className="d-flex justify-content-center">
                    {this.context.selectedVehicle[0].gear_box === "m"
                      ? "Manual"
                      : "Automatic"}
                  </h4>
                </div>
                {this.context.selectedVehicle[0].mobilité_reduite && (
                  <div className="p-2 d-flex flex-column">
                    <i className="bi material-icons p-1 fs-1 d-flex justify-content-center">
                      accessible
                    </i>
                  </div>
                )}
              </div>

              <div className="d-inline review">
                <div className="paiement py-2">
                  <h5 className="p-2">
                    <span>{`Price for ${this.context.nbDays[0]} days`}</span>
                    {this.context.nbHours[0] !== 0 && (
                      <span>{` and ${this.context.nbHours[0]} hours`}</span>
                    )}
                    <br />
                    <strong>
                      {this.context.nbDays[0] *
                        this.context.selectedVehicle[0].priceD +
                        this.context.nbHours[0] *
                          this.context.selectedVehicle[0].priceH}
                      <span>DZD</span>
                    </strong>
                  </h5>
                </div>
              </div>
            </div>
          </div>
          <div className="btn d-flex  justify-content-end">
            <Link to={`/${this.path}`} className="paiment-btn">
              change this car
            </Link>
          </div>
        </div>
      </section>
    );
  }
}
VehicleCard.contextType = Reservation;

export class Location extends Component {
  state = {
    parking: null,
  };
  componentDidMount() {
    this.getParckingDetail();
  }
  getParckingDetail = async () => {
    await ParkingAPIs.parckingDetail(this.context.selectedParking[0]).then(
      (data) => {
        this.setState({
          parking: data,
        });
      }
    );
  };

  render() {
    return (
      <section id="supplier" className="container supplier-info my-5">
        <div className="container">
          {this.state.parking && (
            <div className="row">
              <div className="col-md-6">
                <h2>
                  <strong>Supplier location</strong>
                </h2>
                <h5 className="px-3">
                  <strong>Name</strong>
                </h5>
                <p className="px-5">{this.state.parking.name}</p>
                <h5 className="px-3">
                  <strong> Adresse</strong>
                </h5>
                <p className="px-5">{this.state.parking.adresse}</p>
              </div>
              <div className="col-md-6">
                <iframe
                  title={"location"}
                  src={`https://www.google.com/maps/${this.state.parking.localisation}`}
                  className="w-100 h-100 border-0"
                  allowFullScreen=""
                  loading="lazy"
                  referrerPolicy="no-referrer-when-downgrade"
                />
              </div>
            </div>
          )}
        </div>
      </section>
    );
  }
}
Location.contextType = Reservation;

export class Accessories extends Component {
  constructor(props) {
    super(props);
    this.path = this.props.path;
  }

  state = {
    total: 0,
    toolIndexs: "",
    tools: null,
  };

  getTools = (price, id) => {
    let exist = false;
    let tools = this.state.toolIndexs.split("-");
    tools.map((v) => (exist !== true && v == id ? (exist = true) : ""));
    if (exist) {
      let t = "";
      tools = this.state.toolIndexs.split("-");
      tools.map((v) => v != id && (t === "" ? (t += `${v}`) : (t += `-${v}`)));
      this.setState({
        toolIndexs: t,
        total: this.state.total - price,
      });
    } else {
      let t =
        this.state.toolIndexs === ""
          ? `${id}`
          : this.state.toolIndexs + `-${id}`;

      this.setState({
        toolIndexs: t,
        total: this.state.total + price,
      });
    }
  };

  existIcon = (id) => {
    let exist = false;
    let tools = this.state.toolIndexs.split("-");
    tools.map((v) => (exist !== true && v == id ? (exist = true) : ""));
    return exist;
  };

  componentDidMount() {
    this.ViewToolDispo();
  }

  ViewToolDispo = async () => {
    const rentDate = this.context.rentDate[0].slice(0, 10);
    const returnDate = this.context.returnDate[0].slice(0, 10);
    await CarsAPIs.ViewToolDispo(rentDate, returnDate).then((data) => {
      this.setState({ tools: data });
    });
  };

  render() {
    let price =
      this.context.nbDays[0] * this.context.selectedVehicle[0].priceD +
      this.context.nbHours[0] * this.context.selectedVehicle[0].priceH;

    return (
      <section id="acces" className="container d-flex flex-column my-5">
        <h2>Tools List</h2>
        <ol className="list-group lis/*  */t-group-numbered">
          {this.state.tools &&
            this.state.tools.map((t, i) => (
              <li
                key={i}
                className="list-group-item d-flex justify-content-between align-items-center"
              >
                <div className="ms-2 me-auto">
                  <div className="fw-bold">{t.name} </div>
                  <span style={{ color: "var(--pr1)" }}>{t.price} DZD </span>
                </div>
                <span
                  className="badge d-flex"
                  type="button"
                  onClick={() => this.getTools(parseInt(t.price), t.id)}
                >
                  <i
                    id="acc_btn"
                    className={this.existIcon(1) ? "bi bi-dash" : "bi bi-plus"}
                  ></i>
                </span>
              </li>
            ))}
        </ol>

        <p className="px-3 fs-4 mt-4">
          <b>Total:</b>
          <span> {price + this.state.total} DZD</span>
        </p>
        <Link to={`/${this.path}`}>
          <button
            className="m-2"
            id="next"
            onClick={() => {
              this.context.total[1](price + this.state.total);
              this.context.tools[1](this.state.toolIndexs);
            }}
          >
            next
          </button>
        </Link>
      </section>
    );
  }
}
Accessories.contextType = Reservation;
