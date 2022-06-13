import React, { useState, useEffect } from "react";
import { Main } from "../components/Main";
import QrReader from "react-qr-scanner";
import CarsAPIs from "../GetSetData/useAPIs/CarsAPIs";
import ProblemeAPIs from "../GetSetData/useAPIs/ProblemeAPIs";

export const ParkingManagement = () => {
  return (
    <Main title={"Change vehicle state"}>
      <Status />
    </Main>
  );
};


const StatusForm = ({ displayStatusFrom, selectedVehicle }) => {
  const [problemes, setProblemes] = useState(null);
  const [update, setUpdate] = useState(false);
  const [SolovedProblem, setSolovedProblem] = useState([]);
  const [nbProblem, setNbProblem] = useState(0);

  const getproblemes = async (id) => {
    await ProblemeAPIs.problemeList(id).then((data) => setProblemes(data));
    setUpdate(true);
  };

  const setSoloved = (id) => {
    let nb;
    if (!SolovedProblem.includes(id)) {
      let s = SolovedProblem;
      s.push(id);
      setSolovedProblem(s);
      nb = nbProblem + 1;
    } else {
      setSolovedProblem(SolovedProblem.filter((p) => p !== id));
      nb = nbProblem - 1;
    }
    setNbProblem(nb);
  };
  const save = () => {
    let toDay = new Date();
    toDay.setMinutes(toDay.getMinutes() - toDay.getTimezoneOffset());
    toDay.setHours(toDay.getHours() + 1);
    toDay = toDay.toISOString().slice(0, 10);
    let Gid = 1;

    SolovedProblem.map((p) => updateproblemes(p, toDay, true, Gid));
    SolovedProblem.length === problemes.length && updateState();
    setUpdate(false);
    displayStatusFrom();
  };

  const updateproblemes = async (id, toDay, soloved, Gid) => {
    await ProblemeAPIs.problemeUpdate(id, toDay, soloved, Gid);
  };
  const updateState = async () => {
    await CarsAPIs.UpdateCarState(selectedVehicle.id, "available");
  };
  useEffect(() => {
    getproblemes(selectedVehicle.id);
  }, [update]);

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
              Status Form
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
                    Name and Color
                  </label>
                  <p
                    className="form-control fs-6"
                    id="renter-name"
                    style={{
                      border: 0,
                      borderBottom: "2px solid var(--font-color-2)",
                    }}
                  >
                    {selectedVehicle.name} | {selectedVehicle.couleur}
                  </p>
                </div>
                <div className="d-flex justify-content-center">
                  <label
                    htmlFor="renter-name"
                    className="fs-6 m-2"
                    style={{ color: "var(--font-color-2)" }}
                  >
                    Spot
                  </label>
                  <p
                    className="form-control fs-6"
                    id="renter-name"
                    style={{
                      border: 0,
                      borderBottom: "2px solid var(--font-color-2)",
                    }}
                  >
                    {selectedVehicle.spotLetter}-{selectedVehicle.spotNumber}
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
                    maxHeight: "100%",
                    maxWidth: "100%",
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
            <p id="alert">Check the box if the problem is soloved</p>
            {update && (
              <>
                {!problemes.noProblem ? (
                  <>
                    <div className="m-1">
                      <table className="table table-borderless text-center text-nowrap">
                        <thead>
                          <tr>
                            <th></th>
                            <th>Date</th>
                            <th>Type</th>
                            <th>Problem</th>
                          </tr>
                        </thead>
                        <tbody>
                          {problemes.map((p, index) => (
                            <tr key={index}>
                              <td>
                                <input
                                  className="form-check-input mt-0"
                                  type="checkbox"
                                  value={p.id}
                                  onClick={(v) => {
                                    setSoloved(v.target.value);
                                  }}
                                />
                              </td>
                              <td className="p-2 ">{p.post_date}</td>
                              <td className="p-2 ">{p.type}</td>
                              <td className="p-2 ">{p.probeleme}</td>
                            </tr>
                          ))}
                        </tbody>
                      </table>
                    </div>
                    <div className="d-flex m-1 p-3 ">
                      <label
                        htmlFor="state"
                        className="fs-5 mx-3"
                        style={{ color: "var(--big-title-color)" }}
                      >
                        State
                      </label>
                      <p
                        className="form-control fs-6"
                        id="renter-name"
                        style={{
                          border: 0,
                          borderBottom: "2px solid var(--font-color-2)",
                        }}
                      >
                        {nbProblem === problemes.length
                          ? "available"
                          : "broken"}
                      </p>
                    </div>
                  </>
                ) : (
                  <>
                    <p className="d-flex justify-content-center fs-5">
                      No problems with this vehicle
                    </p>
                    <div className="d-flex m-1 p-3 ">
                      <label
                        htmlFor="state"
                        className="fs-5 mx-3"
                        style={{ color: "var(--big-title-color)" }}
                      >
                        State
                      </label>
                      <p
                        className="form-control fs-6"
                        id="renter-name"
                        style={{
                          border: 0,
                          borderBottom: "2px solid var(--font-color-2)",
                        }}
                      >
                        {selectedVehicle.etat}
                      </p>
                    </div>
                  </>
                )}
                <div className="modal-footer">
                  <button
                    type="button"
                    className="btn"
                    data-dismiss="modal"
                    onClick={displayStatusFrom}
                    style={{
                      background: "var(--bg_icon_color)",
                      color: "black",
                    }}
                  >
                    Close
                  </button>
                  {!problemes.noProblem && (
                    <button
                      type="button"
                      className="btn"
                      onClick={() => save()}
                      style={{
                        background: "var(--btn_color1)",
                        color: "white",
                      }}
                    >
                      Save changes
                    </button>
                  )}
                </div>
              </>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

const StatusQRscanner = ({ displayStatusFrom, setSelectedVehicle }) => {
  const delay = 100;
  const [result, setResult] = useState();
  const [vehicle, setVehicle] = useState();

  useEffect(() => {
    if (result !== undefined) {
      getVehicle(result);
      setSelectedVehicle(vehicle);
      vehicle && displayStatusFrom();
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

const Status = () => {
  const [selectedVehicle, setSelectedVehicle] = useState(null);
  const [display, setDisplay] = useState(false);

  const displayStatusFrom = () => {
    display ? setDisplay(false) : setDisplay(true);
  };
  const setSelectedVehicleFromQR = (vehicle) => {
    setSelectedVehicle(vehicle);
  };

  const [vehicles, setVehicles] = useState();
  const [data, setData] = useState(false);

  const getVehicleList = async () => {
    await CarsAPIs.carsList().then((data) =>
      setVehicles(
        data.filter(
          (data) => data.etat !== "not available" && data.etat !== "rented"
        )
      )
    );
    setData(true);
  };
  useEffect(() => {
    getVehicleList();
  }, [data]);

  return (
    <div>
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
            displayStatusFrom={displayStatusFrom}
            setSelectedVehicle={setSelectedVehicleFromQR}
          />
          {display && (
            <StatusForm
              displayStatusFrom={displayStatusFrom}
              selectedVehicle={selectedVehicle}
            />
          )}
        </div>
        {vehicles &&
          vehicles.map((v, i) => (
            <button
              onClick={() => {
                setSelectedVehicle(v);
                displayStatusFrom();
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
                  maxHeight: "50%",
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
                  maxHeight: "50%",
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
                  <i
                    className="bi bi-slack fs-5"
                    style={{ color: "black" }}
                  ></i>
                  <span>{`${v.modele}`} </span>
                </li>
                <li>
                  <i
                    className="bi bi-clipboard-pulse fs-5"
                    style={{ color: "black" }}
                  ></i>
                  <span>{`${v.etat}`} </span>
                </li>
                <li>
                  <i className="bi bi-geo fs-5" style={{ color: "black" }}></i>
                  <span>{`Spot: ${v.spotLetter}-${v.spotNumber}`} </span>
                </li>
              </ul>
            </button>
          ))}
      </div>
    </div>
  );
};


