import React, { useState, useEffect } from "react";
import { Main } from "../components/Main";
import QrReader from "react-qr-scanner";
import CarsAPIs from "../GetSetData/useAPIs/CarsAPIs";
import { Link } from "react-router-dom";

import "../css/gerer_vehicules_style.css";

export const ChangePrices = () => {
  const [vehicles, setVehicles] = useState(null);
  const [selectedVehicle, setSelectedVehicle] = useState(null);
  const [display, setDisplay] = useState(false);
  const [data, setData] = useState(false);

  const displayChangePriceForm = () => {
    setData(false);
    getVehicleList();
    display ? setDisplay(false) : setDisplay(true);
  };

  const setSelectedVehicleFromQR = (vehicle) => {
    setSelectedVehicle(vehicle);
  }
  useEffect(() => {
    getVehicleList();
  }, [data]);

  const getVehicleList = async () => {
    let currentDate = new Date();
    currentDate.setMinutes(
      currentDate.getMinutes() - currentDate.getTimezoneOffset()
    );
    currentDate.setHours(currentDate.getHours() + 1);
    currentDate = currentDate.toISOString().slice(0, 10);
    await CarsAPIs.ViewCarsDispo(currentDate, currentDate).then((data) =>
      setVehicles(data)
    );
    setData(true);
  };

  return (
    <Main title={"Change Vehicules Prices"}>
      <div id="search" className="d-flex m-1 mx-lg-2 px-3">
        <form className="d-flex">
          <i className="bi bi-search fs-5"></i>
          <input
            className="form-control form-control-sm ml-3 fs-6"
            type="text"
            placeholder="by registration number"
            aria-label="Search"
          />
        </form>
      </div>
      <div className="p-3 d-flex flex-wrap justify-content-center" id="filterd">
        <div
          className="card m-1 my-auto"
          style={{
            maxHeight: "250px",
            maxWidth: "250px",
            borderRadius: "10px",
          }}
        >
          <StatusQRscanner
            displayChangePriceForm={displayChangePriceForm}
            setSelectedVehicle={setSelectedVehicleFromQR}
          />
          {display && (
            <ChangePriceForm
              displayChangePriceForm={displayChangePriceForm}
              selectedVehicle={selectedVehicle}
            />
          )}
        </div>
        {vehicles &&
          vehicles.map((v, i) => (
            <button
              onClick={() => {
                setSelectedVehicle(v);
                displayChangePriceForm();
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
                className="info list-unstyled d-flex flex-column align-items-start"
                style={{
                  maxHeight: "45%",
                  maxWidth: "100%",
                }}
              >
                <li>
                  <i
                    className="bi bi-123 px-1 py-0 fs-5"
                    style={{
                      color: "black",
                      border: "1px solid black",
                      borderRadius: "6px",
                    }}
                  ></i>
                  <span className="px-1">{v.matricule} </span>
                </li>
                <li>
                  <img
                    style={{
                      maxHeight: "40px",
                      marginRight: "10px",
                    }}
                    src="https://img.icons8.com/ios-filled/50/000000/audi.png"
                    alt="audi"
                  />
                  {v.name}
                </li>
                <li>
                  <i className="bi bi-slack" style={{ color: "black" }}></i>
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
              </ul>
            </button>
          ))}
      </div>
    </Main>
  );
};

const StatusQRscanner = ({ displayChangePriceForm, setSelectedVehicle }) => {
  const delay = 100;
  const [result, setResult] = useState();
  const [vehicle, setVehicle] = useState();

  useEffect(() => {
    if (result !== undefined) {
      getVehicle(result);
      setSelectedVehicle(vehicle);
      vehicle && displayChangePriceForm();
    }
  }, [result]);

  const getVehicle = async (res) => {
    CarsAPIs.carDetail(parseInt(res)).then((data) => setVehicle(data));
  };

  const handleError = (error) => {
    console.error(error);
  };

  return (
    <>
      <QrReader
        style={{
          width: "100%",
          height: "100%",
          border: "3px solid var(--bg_icon_color)",
          borderRadius: "10px",
        }}
        delay={delay}
        onError={handleError}
        onScan={(result) => setResult(result?.text)}
      />
    </>
  );
};

const ChangePriceForm = ({ displayChangePriceForm, selectedVehicle }) => {
  const [priceD, setPriceD] = useState(selectedVehicle.priceD);
  const [priceH, setPriceH] = useState(selectedVehicle.priceH);

  const saveData = async() => {
    await CarsAPIs.UpdateCarPriceate(
      selectedVehicle.id,
      parseInt(priceD),
      parseInt(priceH)
    );
    displayChangePriceForm();
  };
  return (
    <div
      className="modal fade show d-block"
      id="exampleModalCenter"
      tabIndex="-1"
      role="dialog"
    >
      <div
        className="modal-dialog modal-dialog-centered modal-md"
        role="dialog"
      >
        <div className="modal-content">
          <div className="modal-header">
            <h4 className="modal-title" id="Ckeck Form">
              Change Vehicle Prices
            </h4>
          </div>
          <div className="modal-body">
            <div className="d-flex flex-md-row flex-column ">
              <div className="w-100 m-1 d-flex flex-column fs-6">
                <div>
                  <label
                    htmlFor="renter-name"
                    className="fs-6"
                    style={{ color: "var(--font-color-2)" }}
                  >
                    Registration Number
                  </label>
                  <p
                    className="form-control fs-6"
                    id="renter-name"
                    style={{
                      border: 0,
                      borderBottom: "2px solid var(--font-color-2)",
                    }}
                  >
                    {selectedVehicle.matricule}
                  </p>
                </div>
                <div>
                  <label
                    htmlFor="renter-name"
                    className="fs-6"
                    style={{ color: "var(--font-color-2)" }}
                  >
                    Name and Model
                  </label>
                  <p
                    className="form-control fs-6"
                    id="renter-name"
                    style={{
                      border: 0,
                      borderBottom: "2px solid var(--font-color-2)",
                    }}
                  >
                    {selectedVehicle.name} | {selectedVehicle.modele}
                  </p>
                </div>
              </div>
              <div className="w-100 m-1 d-flex flex-column fs-6 ">
                <label
                  htmlFor="photo-permit"
                  className="fs-6"
                  style={{ color: "var(--font-color-2)" }}
                >
                  Vehicle Photo
                </label>
                <div
                  className="img-containe d-flex"
                  style={{
                    maxHeight: "90%",
                    maxWidth: "90%",
                  }}
                >
                  <img
                    className=" p-2"
                    src={`https://cdn.imagin.studio/getImage?customer=img&${selectedVehicle.photo
                      .replaceAll("%3D", "=")
                      .replace(
                        "%26",
                        "&"
                      )}&angle=23&width=2600&zoomType=fullscreen`}
                    alt={`${selectedVehicle.name}_photo`}
                  />
                </div>
              </div>
            </div>
            <div className="d-flex flex-column flex-md-row">
              <div className="d-flex flex-column">
                <h6 style={{ fontWeight: "bold" }}>Price for one day (DZD)</h6>
                <div className="d-flex flex-column flex-md-row">
                  <div className="m-1 w-100">
                    <label
                      htmlFor="old-d-price"
                      className="fs-6"
                      style={{ color: "var(--font-color-2)" }}
                    >
                      Old price
                    </label>
                    <p
                      className="form-control fs-6"
                      id="old-d-price"
                      style={{
                        border: 0,
                        borderBottom: "2px solid var(--font-color-2)",
                      }}
                    >
                      {selectedVehicle.priceD}
                    </p>
                  </div>
                  <div className="m-1 w-100">
                    <label
                      htmlFor="new-price"
                      className="fs-6"
                      style={{ color: "var(--font-color-2)" }}
                    >
                      New price
                    </label>
                    <input
                      type="number"
                      name="new-price"
                      className="form-control mt-1"
                      id="new-price"
                      defaultValue={selectedVehicle.priceD}
                      onChange={(e) => setPriceD(e.target.value)}
                      placeholder={selectedVehicle.priceD}
                      required
                      style={{
                        border: 0,
                        borderBottom: "2px solid var(--font-color-2)",
                        height: "34px",
                      }}
                    />
                  </div>
                </div>
              </div>
              <div className="d-flex flex-column">
                <h6 style={{ fontWeight: "bold" }}>Price for one hour (DZD)</h6>
                <div className="d-flex flex-column flex-md-row">
                  <div className="m-1 w-100">
                    <label
                      htmlFor="old-d-price"
                      className="fs-6"
                      style={{ color: "var(--font-color-2)" }}
                    >
                      Old price
                    </label>
                    <p
                      className="form-control fs-6"
                      id="old-d-price"
                      style={{
                        border: 0,
                        borderBottom: "2px solid var(--font-color-2)",
                      }}
                    >
                      {selectedVehicle.priceH}
                    </p>
                  </div>
                  <div className="m-1 w-100">
                    <label
                      htmlFor="new-h-price"
                      className="fs-6"
                      style={{ color: "var(--font-color-2)" }}
                    >
                      New price
                    </label>
                    <input
                      type="number"
                      name="new-price"
                      className="form-control mt-1"
                      id="new-h-price"
                      placeholder={selectedVehicle.priceH}
                      defaultValue={selectedVehicle.priceH}
                      onChange={(e) => setPriceH(e.target.value)}
                      required
                      style={{
                        border: 0,
                        borderBottom: "2px solid var(--font-color-2)",
                        height: "34px",
                      }}
                    />
                  </div>
                </div>
              </div>
            </div>
          </div>

          <div className="modal-footer">
            <button
              type="button"
              className="btn"
              data-dismiss="modal"
              onClick={displayChangePriceForm}
              style={{ background: "var(--bg_icon_color)", color: "black" }}
            >
              Close
            </button>
            <button
              type="button"
              className="btn"
              onClick={() => saveData()}
              style={{ background: "var(--btn_color1)", color: "white" }}
            >
              Save changes
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};
