import React, { Component } from "react";
import { NavBar, Footer } from "./LandingPage";
import OwlCarousel from "react-owl-carousel";
import "owl.carousel/dist/assets/owl.carousel.css";
import "owl.carousel/dist/assets/owl.theme.default.css";
import { ScrollTop } from "../components/ScrollTop";
import { Link } from "react-router-dom";

import Select from "react-select";
import makeAnimated from "react-select/animated";

import { Reservation } from "../GetSetData/Contexts";
import CarsAPIs from "../GetSetData/useAPIs/CarsAPIs";
import ParkingAPIs from "../GetSetData/useAPIs/ParkingAPIs";

export class SearchResultPage extends Component {
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
        <DisplatDatesPlaces />
        <Catégories path={"SelectedVehiclePage"} />
        <Footer />
      </>
    );
  }
}

export class DisplatDatesPlaces extends Component {
  render() {
    return (
      <div id="main-container2" className="container-sm p-3">
        <h2 className="px-4 pt-3" style={{ color: "white", fontWeight: "900" }}>
          Your informations
        </h2>
        <div className="container d-flex flex-wrap justify-content-center align-items-center">
          <div className="d-flex locations ">
            <div className="form-group m-2 col">
              <label htmlFor="exampleInputLocation1">
                <i className="bi bi-geo-alt-fill"></i>Pick up location
              </label>
              <input
                readOnly
                value={this.context.rentLocation[0]}
                type="text"
                className="form-control "
                id="exampleInputLocation1"
                placeholder="Enter Location"
              />
            </div>
            <div className="form-group m-2 col" id="InputLocation2">
              <label htmlFor="exampleInputLocation1">
                <i className="bi bi-geo-alt-fill"></i>retrun location
              </label>
              <input
                readOnly
                value={this.context.returnLocation[0]}
                type="text"
                className="form-control "
                id="exampleInputLocation1"
                placeholder="Enter Location"
              />
            </div>
          </div>
          <div className="d-flex flex-wrap">
            <div className="form-group m-2 col">
              <label htmlFor="exampleInputDate1">
                <i className="bi bi-calendar-check"></i>Pick up date
              </label>
              <input
                readOnly
                value={this.context.rentDate[0]}
                type="datetime-local"
                className="form-control"
                id="exampleInputDate1"
                required
                placeholder="date"
              />
            </div>
            <div className="form-group m-2 col">
              <label htmlFor="exampleInputDate2">
                <i className="bi bi-calendar-check"></i>Retrun date
              </label>
              <input
                readOnly
                value={this.context.returnDate[0]}
                type="datetime-local"
                className="form-control"
                id="exampleInputDate2"
                required
                placeholder="date"
              />
            </div>
          </div>
        </div>
      </div>
    );
  }
}
DisplatDatesPlaces.contextType = Reservation;

export class Catégories extends Component {
  colourOptions = [
    { value: "blue", label: "Blue" },
    { value: "red", label: "Red" },
    { value: "black", label: "Black" },
    { value: "white", label: "White" },
    { value: "gray", label: "Grau" },
    { value: "green", label: "Green" },
  ];
  modelOptions = [
    { value: "SUV", label: "Sport Utility Vehicle" },
    { value: "Hatchback", label: "Hatchback" },
    { value: "Crossover", label: "Crossover" },
    { value: "Convertible", label: "Convertible" },
    { value: "Sedan", label: "Sedan" },
    { value: "Sports ", label: "Sports " },
    { value: "Coupe", label: "Coupe" },
    { value: "Minivan", label: "Minivan" },
    { value: "Wagon", label: "Station Wagon" },
    { value: "Pickup", label: "Pickup Truck " },
  ];
  gearBox = [
    { value: "m", label: "Manual" },
    { value: "a", label: "Automatic" },
  ];
  place = [
    { value: 2, label: "2" },
    { value: 3, label: "3" },
    { value: 4, label: "4" },
    { value: 5, label: "5" },
    { value: 7, label: "7" },
    { value: 12, label: "12" },
    { value: 30, label: "30" },
  ];
  prices = [
    { value: "3000", label: "3000" },
    { value: "4000", label: "4000" },
    { value: "5000", label: "5000" },
    { value: "6000", label: "6000" },
    { value: "7000", label: "7000" },
    { value: "8000", label: "8000" },
    { value: "9000", label: "9000" },
  ];
  constructor(props) {
    super(props);
    this.path = this.props.path;
    this.state = {
      allVehicles: null,
      parkings: null,
      vehicles: null,
      activeType: null,
      options: [[], [], [], [], [], undefined],
    };
  }

  selectedFilter = {
    model: [],
    gearBox: [],
    place: [],
    color: [],
    price: [],
    mobility: false,
  };

  handleChange = (selectedOption, event) => {
    const name = event ? event.name : " ";
    let options = this.state.options;
    let v = this.state.allVehicles;
    switch (name) {
      case "modelOptions":
        this.selectedFilter.model = selectedOption;
        selectedOption.map((o) => options[0].push(o.value));
        if (this.state.options === [[], [], [], [], [], undefined])
          this.setState({
            vehicles: this.state.allVehicles,
          });
        break;
      case "gearBox":
        this.selectedFilter.gearBox = selectedOption;
        selectedOption.map((o) => options[1].push(o.value));
        if (this.state.options === [[], [], [], [], [], undefined])
          this.setState({
            vehicles: this.state.allVehicles,
          });
        break;
      case "place":
        this.selectedFilter.place = selectedOption;
        selectedOption.map((o) => options[2].push(o.value));
        if (this.state.options === [[], [], [], [], [], undefined])
          this.setState({
            vehicles: this.state.allVehicles,
          });
        break;
      case "colors":
        this.selectedFilter.color = selectedOption;
        selectedOption.map((o) => options[3].push(o.value));
        if (this.state.options === [[], [], [], [], [], undefined])
          this.setState({
            vehicles: this.state.allVehicles,
          });
        break;
      case "price":
        this.selectedFilter.price = selectedOption;
        selectedOption.map((o) => options[4].push(o.value));
        if (this.state.options === [[], [], [], [], [], undefined])
          this.setState({
            vehicles: this.state.allVehicles,
          });
        break;
      default:
        this.selectedFilter.mobility = this.selectedFilter.mobility
          ? false
          : true;
        options[5] = this.selectedFilter.mobility;
        break;
    }
    let filterOptionV = [];
    v.map((i) => {
      if (
        options[0].includes(i.modele) ||
        options[1].includes(i.gear_box) ||
        options[2].includes(i.nb_place) ||
        options[3].includes(i.couleur) ||
        options[4].includes(i.priceD.toString()) ||
        options[4].includes(i.priceH.toString()) ||
        options[5] === i.mobilité_reduite
      ) {
        filterOptionV.push(i);
      }
    });
    switch (this.state.activeType) {
      case "car":
        v = filterOptionV.filter((v) => v.type === "CAR");
        this.setState({
          vehicles: v,
          options: options,
        });
        break;
      case "bus":
        v = filterOptionV.filter((v) => v.type === "BUS");
        this.setState({
          vehicles: v,
          options: options,
        });
        break;
      case "moto":
        v = filterOptionV.filter((v) => v.type === "MOTO");
        this.setState({
          vehicles: v,
          options: options,
        });
        break;
      default:
        this.setState({
          vehicles: filterOptionV,
          options: [[], [], [], [], [], undefined],
        });
        break;
    }
  };
  handleChangeType = (event) => {
    const name = event ? event.target.value : " ";
    let v = [];
    switch (name) {
      case "car":
        v = this.state.allVehicles.filter((v) => v.type === "CAR");
        this.setState({
          vehicles: v,
          activeType: "car",
        });
        break;
      case "bus":
        v = this.state.allVehicles.filter((v) => v.type === "BUS");
        this.setState({
          vehicles: v,
          activeType: "bus",
        });
        break;
      case "moto":
        v = this.state.allVehicles.filter((v) => v.type === "MOTO");
        this.setState({
          vehicles: v,
          activeType: "moto",
        });
        break;
      default:
        this.setState({
          vehicles: this.state.allVehicles,
          activeType: null,
          options: [[], [], [], [], [], undefined],
        });
        break;
    }
    let selected = Array.from(
      document.getElementsByClassName("select__multi-value")
    );
    selected.forEach((s) => {
      s.remove();
    });
  };

  componentDidMount() {
    this.getParkingList();
    this.getVehicleList();
  }

  getVehicleList = async () => {
    const rentDate = this.context.rentDate[0].slice(0, 10);
    const returnDate = this.context.returnDate[0].slice(0, 10);
    await CarsAPIs.ViewCarsDispo(rentDate, returnDate).then((data) => {
      let parkingsIDs = [];
      this.state.parkings.map((p) => parkingsIDs.push(p.id));
      this.setState({
        allVehicles: data.filter((v) =>
          parkingsIDs.includes(v.parking)
        ),
        vehicles: data.filter((v) =>
          parkingsIDs.includes(v.parking)
        ),
      });
    });
    
  };
  getParkingList = async () => {
    await ParkingAPIs.parckingList().then((data) => {
      this.setState({
        parkings: data.filter(
          (p) => p.adresse === this.context.rentLocation[0]
          ),
        });
      });
    };
    render() {
      return (
        <section className="container my-5 py-5 border-top">
          <h3 className="text-center fw-bold mb-3" id="title">
            Let's find your car categorie
          </h3>
          <div className="row">
            <OwlCarousel
              className="owl-carousel owl-theme"
              margin={10}
              responsive={{
                0: {
                  items: 1,
                },
                550: {
                  items: 2,
                },
                600: {
                  items: 3,
                },
              }}
              responsiveClass={true}
            >
              <button
                value="car"
                className="item card p-4 m-3 border-0"
                onClick={this.handleChangeType}
              >
                <div className="img-container" value="car">
                  <img
                    className=" p-2"
                    src={require("../img/vehicles/car/1.png")}
                    alt="accent2016"
                    value="car"
                  />
                </div>
                <h3 className="card-title text-center">Car</h3>
              </button>
              <button
                value="bus"
                className="item card p-4 m-3 border-0"
                onClick={this.handleChangeType}
              >
                <div className="img-container">
                  <img
                    className=" p-2"
                    src={require("../img/vehicles/bus/1.png")}
                    alt="van"
                  />
                </div>
                <h3 className="card-title text-center">Bus</h3>
              </button>
              <button
                className="item card p-4 m-3 border-0"
                value="moto"
                onClick={this.handleChangeType}
              >
                <div className="img-container">
                  <img
                    className=" p-2"
                    src={require("../img/vehicles/moto/4.png")}
                    alt="moto"
                  />
                </div>
                <h3 className="card-title text-center">Moto</h3>
              </button>
            </OwlCarousel>
          </div>
          <div className="d-flex flex-column flex-md-row justify-content-center p-2 m-sm-3">
            <form
              className="container-fluid col-md-3 col-12 border-top p-2 d-flex flex-md-column flex-wrap justify-content-start"
              id="filter"
            >
              <div className="m-2 p-2" style={{ width: "100%" }}>
                <label htmlFor="type"> Model</label>
                <Select
                  id="type"
                  isMulti
                  components={makeAnimated()}
                  name="modelOptions"
                  options={this.modelOptions}
                  onChange={this.handleChange}
                  className="basic-multi-select"
                  classNamePrefix="select"
                />
              </div>
              <div className="m-2 p-2" style={{ width: "100%" }}>
                <label htmlFor="gearbox-type"> Gear box type</label>
                <Select
                  id="gearbox-type"
                  isMulti
                  components={makeAnimated()}
                  name="gearBox"
                  options={this.gearBox}
                  onChange={this.handleChange}
                  className="basic-multi-select"
                  classNamePrefix="select"
                />
              </div>
              <div className="m-2 p-2" style={{ width: "100%" }}>
                <label htmlFor="number-seat">Number of seat</label>
                <Select
                  id="number-seat"
                  isMulti
                  components={makeAnimated()}
                  name="place"
                  options={this.place}
                  onChange={this.handleChange}
                  className="basic-multi-select"
                  classNamePrefix="select"
                />
              </div>
              <div className="m-2 p-2" style={{ width: "100%" }}>
                <label htmlFor="color">Color</label>
                <Select
                  id="color"
                  isMulti
                  components={makeAnimated()}
                  name="colors"
                  options={this.colourOptions}
                  onChange={this.handleChange}
                  className="basic-multi-select"
                  classNamePrefix="select"
                />
              </div>
              <div className="m-2 p-2" style={{ width: "100%" }}>
                <label htmlFor="price">Max Price</label>
                <Select
                  id="price"
                  isMulti
                  components={makeAnimated()}
                  name="price"
                  options={this.prices}
                  onChange={this.handleChange}
                  className="basic-multi-select"
                  classNamePrefix="select"
                />
              </div>
              <div
                className="m-2 p-2 d-flex justify-content-center align-items-center "
                style={{ height: "55px", width: "220px" }}
              >
                <input
                  style={{ height: "20px", width: "20px" }}
                  className="mx-2"
                  type="checkbox"
                  id="topping"
                  name="topping"
                  value="Paneer"
                  onChange={this.handleChange}
                />
                <label htmlFor="reduced-mobility"> Reduced mobility </label>
              </div>
            </form>
            <div
              className="col-md-9 col-12 border-top p-2 d-flex flex-wrap justify-content-center"
              id="filterd"
            >
              {this.state.vehicles &&
                this.state.vehicles.map((v, i) => (
                  <Link
                    to={`/${this.path}`}
                    onClick={() => {
                      this.context.selectedVehicle[1](v);
                      this.context.selectedParking[1](v.parking);
                    }}
                    key={i}
                    style={{
                      width: "240px",
                      borderRadius: "10px",
                    }}
                    className="card p-3 m-1 border d-flex flex-column justify-content-between"
                  >
                    <div
                      className="img-containe d-flex"
                      style={{
                        maxHeight: "55%",
                        maxWidth: "100%",
                      }}
                    >
                      <img
                        className=" p-2"
                        src={`https://cdn.imagin.studio/getImage?customer=img&${v.photo
                          .replaceAll("%3D", "=")
                          .replace(
                            "%26",
                            "&"
                          )}&angle=23&width=2600&zoomType=fullscreen`}
                        alt={`${v.name}_photo`}
                      />
                    </div>
                    <ul
                      className="info list-unstyled d-flex flex-column"
                      style={{
                        maxHeight: "45%",
                        maxWidth: "100%",
                      }}
                    >
                      <li>
                        <img
                          style={{
                            maxHeight: "40px",
                            marginRight: "10px",
                          }}
                          src="https://img.icons8.com/external-tal-revivo-regular-tal-revivo/24/undefined/external-toyota-motor-corporation-is-a-japanese-multinational-automotive-manufacturer-automotive-regular-tal-revivo.png"
                        alt="audi"
                        />
                        {v.name}
                      </li>
                      <li>
                        <i
                          className="bi bi-slack"
                          style={{ color: "black" }}
                        ></i>
                        <span>{`${v.modele}`} </span>
                      </li>
                      <li>
                        <i
                          className="bi bi-cash-coin fs-5"
                          style={{ color: "black" }}
                        ></i>
                        <span>{`${v.priceD} for one day`}</span>
                      </li>
                      <li>
                        <i
                          className="bi bi-cash-coin fs-5"
                          style={{ color: "black" }}
                        ></i>
                        <span>{`${v.priceH} for one hour`}</span>
                      </li>
                      <li>
                        <i
                          className="bi material-icons fs-5"
                          style={{ color: "black" }}
                        >
                          airline_seat_recline_normal
                        </i>
                        <span>{`${v.nb_place} seats`} </span>
                      </li>
                    </ul>
                  </Link>
                ))}
            </div>
          </div>
        </section>
      );
  }
}
Catégories.contextType = Reservation;
