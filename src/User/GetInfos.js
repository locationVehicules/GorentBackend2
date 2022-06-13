import { CardElement, Elements } from "@stripe/react-stripe-js";
import { loadStripe } from "@stripe/stripe-js";
import React, { Component, useContext, useEffect, useState } from "react";
import Select from "react-select";
import "../css/getInfos.css";
import { Reservation } from "../GetSetData/Contexts";
import AdministrationAPIs from "../GetSetData/useAPIs/AdministrationAPIs";

const promise = loadStripe(
  "pk_test_51L4GmXH0mDiv5izs9R5HetS6n358XhnEuD82g3yMlCyUVC73YdOOqZkxzG3jzPEaXC4doZQwiIAb4sKZHNp2T9wY00o3iQQmQJ"
);

export const DriverInfos = ({ enterprise }) => {
  const context = useContext(Reservation);
  const [driver, setDriver] = useState(true);
  const [allDriverList, setAllDriverList] = useState(null);
  const [enterpriseDriverList, setEnterpriseDriverList] = useState(null);
  const [dispoDriver, setDispoDriver] = useState(null);
  const [styleO, setStyleO] = useState(null);
  const driverList = [];

  const displayDriverInput = () => {
    if (driver) {
      setDriver(false);
      context.driver[1](JSON.parse(localStorage.getItem("myId")));
    } else {
      setDriver(true);
      context.driver[1]("");
    }
  };
  const displayDriverList = async () => {
    await AdministrationAPIs.DriverList().then((data) =>
      setAllDriverList(data)
    );
  };
  const displayEnterpriseDriverList = async () => {
    await AdministrationAPIs.EnterpriseDriverList(
      JSON.parse(localStorage.getItem("myId"))
    ).then((data) => setEnterpriseDriverList(data));
  };
  const displayDriverDispo = async () => {
    const rentDate = context.rentDate[0].slice(0, 10);
    const returnDate = context.returnDate[0].slice(0, 10);
    await AdministrationAPIs.viewAllDriverDispo(rentDate, returnDate).then(
      (data) => setDispoDriver(data)
    );
  };
  const setStyle = (exist) => {
    exist && setStyleO({ border: "2px solid var(--rented_color)" });
    !exist && setStyleO(null);
  };

  useEffect(() => {
    if (enterprise) {
      displayDriverList();
      displayEnterpriseDriverList();
      displayDriverDispo();
    } else {
      displayDriverList();
    }
  }, []);

  useEffect(() => {
    allDriverList && enterpriseDriverList && dispoDriver && addDriver();
  }, [allDriverList, enterpriseDriverList, dispoDriver]);

  const addDriver = () => {
    let temps1 = [];
    enterpriseDriverList.map((ed) => {
      dispoDriver.map((dd) => {
        if (ed.id === dd.id) temps1.push(dd);
      });
    });
    let temps = [];
    temps1.map((ed) => {
      allDriverList.map((ad) => {
        if (ad.id === ed.user) {
          temps.push(ad);
        }
      });
    });
    temps.map((d) => {
      driverList.push({
        value: d.id,
        label: `${d.username} | Full Name : ${d.firstname} ${d.lastname}`,
      });
    });
  };
  return (
    <div className="container">
      <h3>Driver informations</h3>
      <form
        className="needs-validation d-flex flex-md-row flex-column"
        noValidate
      >
        <div className="m-2 w-100">
          <label htmlFor="id">Driver UserName</label>
          {!enterprise ? (
            <>
              {driver && (
                <>
                  <input
                    type="text"
                    className="form-control"
                    id="id"
                    placeholder="Driver ID"
                    required
                    style={styleO}
                    onChange={(d) => {
                      console.log(d.target.value, allDriverList);
                      if (allDriverList) {
                        for (var i = 0; i < allDriverList.length; i++) {
                          if (allDriverList[i].username === d.target.value) {
                            setStyle(true);
                            context.driver[1](allDriverList[i].user_id);
                            if (
                              allDriverList[i].id ===
                              JSON.parse(localStorage.getItem("myId"))
                            ) {
                              context.driver[1]("");
                            }
                            break;
                          } else {
                            setStyle(false);
                          }
                        }
                      }
                    }}
                  />
                </>
              )}
              <div className="form-check">
                <input
                  className="form-check-input"
                  type="checkbox"
                  onClick={() => displayDriverInput()}
                  id="flexCheckDefault"
                />
                <label className="form-check-label" htmlFor="flexCheckDefault">
                  I'm the driver
                </label>
              </div>
            </>
          ) : (
            <Select
              className="select-driver"
              classNamePrefix="select"
              defaultValue={driverList[0]}
              name="select-driver"
              options={driverList}
              onChange={(e) => {
                console.log(e);
                context.driver[1](e.value);
              }}
            />
          )}
        </div>
      </form>
      <hr className="mb-4" />
    </div>
  );
};

DriverInfos.contextType = Reservation;

export class PaimentInfos extends Component {
  constructor(props) {
    super(props);
    this.path = this.props.path;
  }
  state = {
    onSpot: false,
    promo: false,
    code: "",
    promotion: 0,
  };
  payOnSpot = () => {
    this.state.onSpot
      ? this.setState({
          onSpot: false,
        })
      : this.setState({
          onSpot: true,
        });
  };
  validPromo = () => {
    console.log("call valide code promo", this.state.code);
    let returnedData = 0;
    this.setState({ promotion: returnedData });
  };

  setCode = (codePromo) => {
    this.setState({ code: codePromo });
    codePromo.length !== 0
      ? this.setState({ promo: true })
      : this.setState({ promo: false });
  };
  render() {
    this.context.promotion[1](this.state.promotion);
    return (
      <div className="container">
        <div className="row">
          <div className="order-md-1">
            <h3 className="mb-1">Paiment informations</h3>
            <p id="alert" className="m-0">
              if you dont want to pay this reservation on spot ,please inform us
              ! in check point bellow
            </p>
            <div className="input-group">
              <div className="input-group-prepend">
                <div id="pay-spot" className="input-group-text">
                  <div className="form-check">
                    <input
                      className="form-check-input"
                      type="checkbox"
                      onClick={() => {
                        this.state.onSpot
                          ? this.context.paymentMethod[1]("On Ligne")
                          : this.context.paymentMethod[1]("On Spot");
                        this.payOnSpot();
                      }}
                      id="flexCheckDefaultPay"
                    />
                    <label
                      className="form-check-label"
                      htmlFor="flexCheckDefaultPay"
                    >
                      pay on spot
                    </label>
                  </div>
                </div>
              </div>
            </div>
            {!this.state.onSpot && (
              <form className="needs-validation" id="payment-form">
                <div className="row">
                  <div className="col-md-4 mb-3">
                    <label htmlFor="cc-name">Card name</label>
                    <input
                      type="text"
                      className="form-control"
                      id="cc-name"
                      placeholder=""
                      required
                      value={this.context.cardName[0]}
                      onChange={(e) => this.context.cardName[1](e.target.value)}
                    />
                  </div>
                  <div className="col-md-4 mb-3">
                    <label htmlFor="cc-number">Card number</label>
                    <input
                      type="text"
                      className="form-control"
                      id="cc-number"
                      placeholder=""
                      required
                      value={this.context.cardNum[0]}
                      onChange={(e) => this.context.cardNum[1](e.target.value)}
                    />
                  </div>
                  <div className="col-md-4 mb-3">
                    <label htmlFor="cc-number">Expires on</label>
                    <input
                      type="date"
                      className="form-control"
                      id="cc-number"
                      placeholder=""
                      value={this.context.cardDate[0]}
                      onChange={(e) => this.context.cardDate[1](e.target.value)}
                      required
                    />
                  </div>
                </div>
                <label htmlFor={"card-element"}>
                  Confirm card informations
                </label>
                <Elements stripe={promise}>
                  <CardElement
                    id="card-element"
                    className="form-control"
                    options={{
                      style: {
                        base: {
                          iconColor: "#000",
                          color: "#000",
                          fontWeight: "500",
                          fontSize: "16px",
                          fontSmoothing: "antialiased",
                          ":-webkit-autofill": {
                            color: "#000",
                          },
                          "::placeholder": {
                            color: "#000",
                          },
                        },
                        invalid: {
                          iconColor: "#ff4c4c",
                          color: "#ff4c4c",
                        },
                      },
                    }}
                    onChange={() => this.handleChange}
                  />
                </Elements>
                {this.state.error && (
                  <div className="card-error" role="alert">
                    {this.state.error}
                  </div>
                )}
              </form>
            )}
            <div className="row align-items-center">
              <div className="col-md-6 mt-2 ">
                <label htmlFor="promo-code">Promotion code</label>
                <input
                  type="text"
                  className="form-control"
                  id="promo-code"
                  placeholder=""
                  value={this.state.code}
                  onChange={(c) => this.setCode(c.target.value)}
                />
              </div>
              {this.state.promo && (
                <div className="col-md-1 m-0 mt-2">
                  <input
                    type="button"
                    className="btn border mt-4"
                    id="promo-validator"
                    placeholder=""
                    value="validate"
                    style={{
                      width: "90px",
                      height: "38px",
                      marginLeft: "-10px",
                      background: "var(--btn_color3)",
                      color: "var(--nav_font_color)",
                    }}
                    onClick={() => this.validPromo()}
                  />
                </div>
              )}
              <div className="col-md-5 mt-2">
                <label htmlFor="new-total">New Total</label>
                <input
                  type="text"
                  className="form-control"
                  id="new-total"
                  value={`${this.context.total[0]} DZD `}
                  readOnly
                />
              </div>
            </div>
          </div>
        </div>
      </div>
    );
  }
}
PaimentInfos.contextType = Reservation;
