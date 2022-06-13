import React, { Component } from "react";
import { Link } from "react-router-dom";
import { HashLink } from "react-router-hash-link";
import Form from "react-bootstrap/Form";

import { Reservation } from "../GetSetData/Contexts";

export class NavBar extends Component {
  render() {
    window.scrollTo({
      top: 0,
      behavior: "smooth",
    });
    return (
      <nav
        className="container navbar navbar-expand-lg navbar-light pt-4 px-3 sticky-top"
        style={{ background: "var(--body-color1)" }}
      >
        <Link className="navbar-brand" id="public-logo" to={"/"}>
            <img src="/logo/logo b.png" style={{ width: "120px" }} />
        </Link>
        <button
          className="navbar-toggler "
          type="button"
          data-bs-toggle="collapse"
          data-bs-target="#navbarNav"
          aria-controls="navbarNav"
          aria-expanded="false"
          aria-label="Toggle navigation"
        >
          <span className="navbar-toggler-icon"></span>
        </button>

        <div className="collapse navbar-collapse mt-2" id="navbarNav">
          <ul className="navbar-nav ml-lg-auto ms-lg-auto" id="main-nav">
            <HashLink
              smooth
              to="/"
              className="nav-link px-3 py-1 px-lg-0"
              id="home"
            >
              <li className="nav-item mx-2 px-3 py-1 px-lg-0">Home</li>
            </HashLink>
            <li className="nav-link">
              <b className="nav-item d-none d-lg-block">|</b>
            </li>
            <HashLink
              smooth
              to="/#container-3"
              className="nav-link px-3 py-1  px-lg-0"
              id="how"
            >
              <li className="nav-item mx-2 px-3 py-1 px-lg-0">How it works</li>
            </HashLink>
            <li className="nav-link">
              <b className="nav-item d-none d-lg-block">|</b>
            </li>
            <HashLink
              smooth
              to="/#question-answer"
              className="nav-link px-3 py-1 px-lg-0"
              id="qa"
            >
              <li className="nav-item mx-2 px-3 py-1 px-lg-0">
                Question & answer
              </li>
            </HashLink>
          </ul>
          <ul className="navbar-nav my-2 ml-lg-auto ms-lg-auto d-flex flex-row justify-content-center">
            <Link
              to={"/Login"}
              className="nav-link mx-2 d-flex justify-content-center align-items-center"
            >
              <li className="nav-item">Log in</li>
            </Link>
            <Link
              to={"/SignUp"}
              className="nav-link d-flex justify-content-center align-items-center"
              id="signup-btn"
            >
              <li className="nav-item" style={{ color: "white" }}>
                Sign up
              </li>
            </Link>
          </ul>
        </div>
      </nav>
    );
  }
}

export class FindVehicle extends Component {
  locations = [
    { value: "Adrar", label: "Adrar" },
    { value: "Chlef", label: "Chlef" },
    { value: "Laghouat", label: "Laghouat" },
    { value: "Oum El Bouaghi", label: "Oum El Bouaghi" },
    { value: "Batna", label: "Batna" },
    { value: "Béjaïa", label: "Béjaïa" },
    { value: "Biskra", label: "Biskra" },
    { value: "Béchar", label: "Béchar" },
    { value: "Blida", label: "Blida" },
    { value: "Bouira", label: "Bouira" },
    { value: "Tamanrasset", label: "Tamanrasset" },
    { value: "Tébessa", label: "Tébessa" },
    { value: "Tlemcen", label: "Tlemcen" },
    { value: "Tiaret", label: "Tiaret" },
    { value: "Tizi Ouzou", label: "Tizi Ouzou" },
    { value: "Alger", label: "Alger" },
    { value: "Djelfa", label: "Djelfa" },
    { value: "Jijel", label: "Jijel" },
    { value: "Sétif", label: "Sétif" },
    { value: "Saïda", label: "Saïda" },
    { value: "Skikda", label: "Skikda" },
    { value: "Sidi Bel Abbès", label: "Sidi Bel Abbès" },
    { value: "Annaba", label: "Annaba" },
    { value: "Guelma", label: "Guelma" },
    { value: "Constantine", label: "Constantine" },
    { value: "Médéa", label: "Médéa" },
    { value: "Mostaganem", label: "Mostaganem" },
    { value: "M'Sila", label: "M'Sila" },
    { value: "Mascara", label: "Mascara" },
    { value: "Ouargla", label: "Ouargla" },
    { value: "Oran", label: "Oran" },
    { value: "El Bayadh", label: "El Bayadh" },
    { value: "Illizi", label: "Illizi" },
    { value: "Bordj Bou Arreridj", label: "Bordj Bou Arreridj" },
    { value: "Boumerdès", label: "Boumerdès" },
    { value: "El Tarf", label: "El Tarf" },
    { value: "Tindouf", label: "Tindouf" },
    { value: "Tissemsilt", label: "Tissemsilt" },
    { value: "El Oued", label: "El Oued" },
    { value: "Khenchela", label: "Khenchela" },
    { value: "Souk Ahras", label: "Souk Ahras" },
    { value: "Tipaza", label: "Tipaza" },
    { value: "Mila", label: "Mila" },
    { value: "Aïn Defla", label: "Aïn Defla" },
    { value: "Naâma", label: "Naâma" },
    { value: "Aïn Témouchent", label: "Aïn Témouchent" },
    { value: "Ghardaïa", label: "Ghardaïa" },
    { value: "Relizane", label: "Relizane" },
    { value: "Timimoun", label: "Timimoun" },
    { value: "Bordj Badji Mokhtar", label: "Bordj Badji Mokhtar" },
    { value: "Ouled Djellal", label: "Ouled Djellal" },
    { value: "Béni Abbès", label: "Béni Abbès" },
    { value: "In Salah", label: "In Salah" },
    { value: "In Guezzam", label: "In Guezzam" },
    { value: "Touggourt", label: "Touggourt" },
    { value: "Djanet", label: "Djanet" },
    { value: "El Meghaier", label: "El Meghaier" },
    { value: "El Menia", label: "El Menia" },
  ];

  constructor(props) {
    super(props);
    this.path = this.props.path;
  }

  state = {
    sameLocation: true,
  };

  NotSameLocation = () => {
    !this.state.sameLocation
      ? this.setState({
          sameLocation: true,
        })
      : this.setState({
          sameLocation: false,
        });
  };
  render() {
    return (
      <section id="main-container" className="container-sm py-5">
        <h1>Find your next awsome car</h1>
        <form>
          <div className="container d-flex flex-wrap justify-content-center align-items-center">
            <div className="d-flex locations">
              <div className="form-group m-2 col">
                <label htmlFor="exampleInputLocation1">
                  <i className="bi bi-geo-alt-fill"></i>Pick up location
                </label>
                <Form.Select
                  className="w-100 fs-6"
                  onChange={(e) => {
                    this.context.rentLocation[1](e.target.value);
                    !this.state.sameLocation &&
                      this.context.returnLocation[1](e.target.value);
                  }}
                >
                  {this.locations.map((l) => (
                    <option
                      key={`${l.value}`}
                      value={`${l.value}`}
                    >{`${l.label}`}</option>
                  ))}
                </Form.Select>
              </div>
              {this.state.sameLocation && (
                <div className="form-group m-2 col">
                  <label htmlFor="exampleInputLocation1">
                    <i className="bi bi-geo-alt-fill"></i>retrun location
                  </label>
                  <Form.Select
                    className="w-100 fs-6"
                    onChange={(e) =>
                      this.context.returnLocation[1](e.target.value)
                    }
                  >
                    {this.locations.map((l) => (
                      <option
                        key={`${l.value}`}
                        value={`${l.value}`}
                      >{`${l.label}`}</option>
                    ))}
                  </Form.Select>
                </div>
              )}
            </div>
            <div className="d-flex flex-wrap">
              <div className="form-group m-2 col">
                <label htmlFor="exampleInputDate1">
                  <i className="bi bi-calendar-check"></i>Pick up date
                </label>
                <input
                  type="datetime-local"
                  className="form-control"
                  id="exampleInputDate1"
                  value={this.context.rentDate[0]}
                  onChange={(e) => this.context.rentDate[1](e.target.value)}
                  required
                />
              </div>
              <div className="form-group m-2 col">
                <label htmlFor="exampleInputDate2">
                  <i className="bi bi-calendar-check"></i>Retrun date
                </label>
                <input
                  type="datetime-local"
                  className="form-control"
                  id="exampleInputDate2"
                  value={this.context.returnDate[0]}
                  onChange={(e) =>
                    this.context.returnDate[1](e.target.value)
                  }
                  required
                  placeholder="date"
                />
              </div>
            </div>
            <div className="form-group p-1 mx-1 d-flex justify-content-center align-items-center">
              <Link
                to={`/${this.path}`}
                className="btn search-btn"
                type="submit"
              >
                search
              </Link>
            </div>
          </div>

          <div className="input-group mb-3">
            <div className="input-group-text text-wrap">
              <input
                className="form-check-input mt-0"
                type="checkbox"
                value=""
                onClick={this.NotSameLocation}
              />
              <small> To retrun car in same place</small>
            </div>
          </div>
        </form>
      </section>
    );
  }
}
FindVehicle.contextType = Reservation;

export class ServiceAndOffers extends Component {
  render() {
    return (
      <section className="container mt-5" id="costum-container">
        <div className="row d-flex justify-content-center align-items-center p-3">
          <div className="col-9 col-md-4 p-2 ">
            <h3 className="d-flex align-items-center">
              <i className="bi bi-headset fs-1"></i>
              <span>24/7 Cosutmer service</span>
            </h3>
          </div>
          <div className="col-9 col-md-4 p-2 ">
            <h3 className="d-flex align-items-center">
              <i className="bi bi-x-diamond-fill fs-1"></i>
              <span>Free cancellation</span>
            </h3>
          </div>
          <div className="col-9 col-md-4 p-2 ">
            <h3 className="d-flex align-items-center">
              <i className="bi bi-star fs-1"></i>
              <span>+2 millions reviews</span>
            </h3>
          </div>
        </div>
      </section>
    );
  }
}

export class HowItWork extends Component {
  render() {
    return (
      <section id="container-3" className="container-fluid p-4">
        <h1 id="title" className="text-center px-5 py-4">
          how it's work?
        </h1>
        <div className="row d-flex justify-content-center ">
          <div className="col-12 col-sm-5 col-lg-3 p-3 mx-4 my-2">
            <h5 style={{ fontWeight: "600" }} className="text-center">
              1-select your travel info
            </h5>
            <div className="img">
              <img
                style={{ width: "100%", height: "100%", padding: "20px" }}
                src={require("../img/travel-info.png")}
                alt="accent car "
              />
            </div>

            <p>its by select the date of begin and fin of travel</p>
          </div>
          <div className="col-12 col-sm-5 col-lg-3 p-3 mx-4  my-2">
            <h5 style={{ fontWeight: "600" }} className="text-center">
              2-chose your car
            </h5>
            <div className="img">
              <img
                style={{ width: "100%", height: "100%", padding: "20px" }}
                src={require("../img/car.png")}
                alt="accent car "
              />
            </div>

            <p>
              chose your car model with 1.number of people 2.fuel consumption
              3.price
            </p>
          </div>
          <div className="col-12 col-sm-5 col-lg-3 p-3 mx-4  my-2">
            <h5 style={{ fontWeight: "600" }} className="text-center">
              3-Add external stuff
            </h5>
            <div className="img">
              <img
                style={{ width: "100%", height: "100%", padding: "20px" }}
                src={require("../img/car-stuff.png")}
                alt="baby seat"
              />
            </div>

            <p>
              its if you need a exernal stuff like child seat or snow chains ...
            </p>
          </div>

          <div className="col-12 col-sm-5 col-lg-3 p-3 mx-4  my-2">
            <h5 style={{ fontWeight: "600" }} className="text-center">
              4-Find supplier inforamations
            </h5>
            <div className="img">
              <img
                style={{ width: "100%", height: "100%", padding: "20px" }}
                src={require("../img/location.png")}
                alt="visa card "
              />
            </div>

            <p>here we do our best to find the nearset supplier of you</p>
          </div>
          <div className="col-12 col-sm-5 col-lg-3 p-3 mx-4  my-2">
            <h5 style={{ fontWeight: "600" }} className="text-center">
              5-Fill your personal informations
            </h5>
            <div className="img">
              <img
                style={{ width: "100%", height: "100%", padding: "20px" }}
                src={require("../img/personal-info.png")}
                alt="visa card "
              />
            </div>

            <p>
              you must to fill your inforamtions like identite document and you
              driver inforamtions
            </p>
          </div>
          <div className="col-12 col-sm-5 col-lg-3 p-3 mx-4  my-2">
            <h5 style={{ fontWeight: "600 " }} className="text-center">
              6-paiment
            </h5>
            <div className="img">
              <img
                style={{ width: "100%", height: "100%", padding: "20px" }}
                src={require("../img/paiment.png")}
                alt="visa card "
              />
            </div>

            <p>
              you have to chose between paiment online ,here you got -10% ,or
              classic paiement
            </p>
          </div>
        </div>
      </section>
    );
  }
}

export class QuestionAndAnswer extends Component {
  render() {
    return (
      <div className="container accordion mb-3" id="question-answer">
        <h1 className="text-center px-5 py-4 " id="title">
          Question and Answers
        </h1>
        <div className="accordion-item">
          <h2 className="accordion-header" id="headingOne">
            <button
              className="accordion-button"
              type="button"
              data-bs-toggle="collapse"
              data-bs-target="#collapseOne"
              aria-expanded="true"
              aria-controls="collapseOne"
            >
              What do I need to rent a car?
            </button>
          </h2>
          <div
            id="collapseOne"
            className="accordion-collapse collapse show"
            aria-labelledby="headingOne"
            data-bs-parent="#question-answer"
          >
            <div className="accordion-body">
              When you’re search the car, you just need a debit or credit card.
              At the rental counter, you’ll need: Your passport Your voucher
              Each driver’s driving licence The main driver’s credit card (some
              rental companies also accept debit cards, but most don’t).
              Important: Please make sure you check the car’s rental terms as
              well, as each rental company has its own rules. For example? They
              might need to see some extra ID. They might not accept certain
              types of credit
            </div>
          </div>
        </div>
        <div className="accordion-item">
          <h2 className="accordion-header" id="headingTwo">
            <button
              className="accordion-button collapsed"
              type="button"
              data-bs-toggle="collapse"
              data-bs-target="#collapseTwo"
              aria-expanded="false"
              aria-controls="collapseTwo"
            >
              What do I need to rent a car?
            </button>
          </h2>
          <div
            id="collapseTwo"
            className="accordion-collapse collapse"
            aria-labelledby="headingTwo"
            data-bs-parent="#question-answer"
          >
            <div className="accordion-body">
              When you’re search the car, you just need a debit or credit card.
              At the rental counter, you’ll need: Your passport Your voucher
              Each driver’s driving licence The main driver’s credit card (some
              rental companies also accept debit cards, but most don’t).
              Important: Please make sure you check the car’s rental terms as
              well, as each rental company has its own rules. For example? They
              might need to see some extra ID. They might not accept certain
              types of credit{" "}
            </div>
          </div>
        </div>
        <div className="accordion-item">
          <h2 className="accordion-header" id="headingThree">
            <button
              className="accordion-button collapsed"
              type="button"
              data-bs-toggle="collapse"
              data-bs-target="#collapseThree"
              aria-expanded="false"
              aria-controls="collapseThree"
            >
              What do I need to rent a car?
            </button>
          </h2>
          <div
            id="collapseThree"
            className="accordion-collapse collapse"
            aria-labelledby="headingThree"
            data-bs-parent="#question-answer"
          >
            <div className="accordion-body">
              When you’re search the car, you just need a debit or credit card.
              At the rental counter, you’ll need: Your passport Your voucher
              Each driver’s driving licence The main driver’s credit card (some
              rental companies also accept debit cards, but most don’t).
              Important: Please make sure you check the car’s rental terms as
              well, as each rental company has its own rules. For example? They
              might need to see some extra ID. They might not accept certain
              types of credit
            </div>
          </div>
        </div>
      </div>
    );
  }
}

export class Footer extends Component {
  render() {
    return (
      <footer className="container m-auto border-top justify-content-center">
        <div className="w-100 mt-4 mb-2 d-flex justify-content-center ">
          <div className="col d-flex flex-column px-4 py-3">
            <h5>Section</h5>
            <ul className="nav flex-column">
              <li className="nav-item mb-2">
                <a href="/" className="nav-link p-0 text-muted">
                  Home
                </a>
              </li>
              <li className="nav-item mb-2">
                <a href="/" className="nav-link p-0 text-muted">
                  Features
                </a>
              </li>
              <li className="nav-item mb-2">
                <a href="/" className="nav-link p-0 text-muted">
                  Pricing
                </a>
              </li>
              <li className="nav-item mb-2">
                <a href="/" className="nav-link p-0 text-muted">
                  FAQs
                </a>
              </li>
              <li className="nav-item mb-2">
                <a href="/" className="nav-link p-0 text-muted">
                  About
                </a>
              </li>
            </ul>
          </div>

          <div className="col d-flex flex-column px-4 py-3">
            <h5>Section</h5>
            <ul className="nav flex-column">
              <li className="nav-item mb-2">
                <a href="/" className="nav-link p-0 text-muted">
                  Home
                </a>
              </li>
              <li className="nav-item mb-2">
                <a href="/" className="nav-link p-0 text-muted">
                  Features
                </a>
              </li>
              <li className="nav-item mb-2">
                <a href="/" className="nav-link p-0 text-muted">
                  Pricing
                </a>
              </li>
              <li className="nav-item mb-2">
                <a href="/" className="nav-link p-0 text-muted">
                  FAQs
                </a>
              </li>
              <li className="nav-item mb-2">
                <a href="/" className="nav-link p-0 text-muted">
                  About
                </a>
              </li>
            </ul>
          </div>

          <div className="col d-flex flex-column px-4 py-3">
            <h5>Section</h5>
            <ul className="nav flex-column">
              <li className="nav-item mb-2">
                <a href="/" className="nav-link p-0 text-muted">
                  Home
                </a>
              </li>
              <li className="nav-item mb-2">
                <a href="/" className="nav-link p-0 text-muted">
                  Features
                </a>
              </li>
              <li className="nav-item mb-2">
                <a href="/" className="nav-link p-0 text-muted">
                  Pricing
                </a>
              </li>
              <li className="nav-item mb-2">
                <a href="/" className="nav-link p-0 text-muted">
                  FAQs
                </a>
              </li>
              <li className="nav-item mb-2">
                <a href="/" className="nav-link p-0 text-muted">
                  About
                </a>
              </li>
            </ul>
          </div>
        </div>

        <div className="footer d-flex justify-content-center w-100">
          <p className="text-muted">
            &copy; 2021-2022 GoRent | All Rights Reserved
          </p>
        </div>
      </footer>
    );
  }
}
