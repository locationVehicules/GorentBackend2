import React, { useState, useContext, useRef, useEffect } from "react";
import { Main } from "../components/Main";
import Form from "react-bootstrap/Form";
import "../css/etablir_contrat.css";
import { Reservation } from "../GetSetData/Contexts";
import ReservationAPIs from "../GetSetData/useAPIs/ReservationAPIs";
import SignaturePad from "react-signature-canvas";
import ContartAPIs from "../GetSetData/useAPIs/ContartAPIs";
import BillAPIs from "../GetSetData/useAPIs/BillAPIs";
import { Document, Page, pdfjs } from "react-pdf/dist/esm/entry.webpack";
pdfjs.GlobalWorkerOptions.workerSrc = `//cdnjs.cloudflare.com/ajax/libs/pdf.js/${pdfjs.version}/pdf.worker.js`;

export const Rentals = ({ user }) => {
  const [title, setTitle] = useState("All contracts");
  const [reservation, setReservation] = useState();
  const [reservations, setReservations] = useState(true);
  const [allreservations, setAllReservations] = useState(true);
  const [Docs, setDocs] = useState(false);
  const [contract, setContract] = useState(false);
  const [bill, setBill] = useState(false);
  const [data, setData] = useState(false);
  const [newRes, setNewRes] = useState(false);
  const [selectedReservation, setSelectedReservation] = useState(null);
  const [numPages, setNumPages] = useState(null);

  const context = useContext(Reservation);
  let currentDate = new Date();
  currentDate.setMinutes(
    currentDate.getMinutes() - currentDate.getTimezoneOffset()
  );
  currentDate.setHours(currentDate.getHours() + 1);
  currentDate = currentDate.toISOString().slice(0, 16);

  let afterHcurrentDate = new Date();
  afterHcurrentDate.setMinutes(
    afterHcurrentDate.getMinutes() - afterHcurrentDate.getTimezoneOffset()
  );
  afterHcurrentDate.setHours(afterHcurrentDate.getHours() + 25);
  afterHcurrentDate = afterHcurrentDate.toISOString().slice(0, 16);

  useEffect(() => {
    context.rentDate[1](currentDate);
    context.returnDate[1](afterHcurrentDate);
    context.rentLocation[1]("Adrar");
    context.returnLocation[1]("Adrar");
    context.selectedVehicle[1](null);
    context.selectedParking[1](null);
    let totalHours =
      (new Date(afterHcurrentDate) - new Date(currentDate)) / 36e5;
    context.nbHours[1](Math.round(totalHours % 24));
    context.nbDays[1](Math.round(totalHours / 24));
    context.total[1](0);
    context.tools[1]("");
    context.driver[1]("");
    context.renter[1]("");
    context.paymentMethod[1]("On Ligne");
    context.signatureD[1](null);
    context.signatureR[1](null);
    context.stateR[1](null);
    context.cardNum[1]("");
    context.cardDate[1]("");
    context.cardName[1]("");
    context.promotion[1](0);
    context.bill[1](null);
    context.contract[1](null);
  }, []);
  const [displaySignPad, setDisplaySignPad] = useState(false);
  const [displayCompletSignPad, setDisplayCompletSignPad] = useState(false);
  const AddSign = () => {
    if (displaySignPad) {
      setNewRes(true);
      setDisplaySignPad(false);
      toggle();
    } else {
      setDisplaySignPad(true);
    }
  };
  const completSign = () => {
    if (displayCompletSignPad) {
      setNewRes(true);
      setDisplayCompletSignPad(false);
      toggle();
    } else {
      setDisplayCompletSignPad(true);
    }
  };
  const onDocumentLoadSucces = ({ numPages }) => {
    setNumPages(numPages);
  };
  const reRender = (e) => {
    let value = e.target.value;
    setTitle(value.charAt(0).toUpperCase() + value.slice(1));
    value !== "All contracts"
      ? setReservation(
          allreservations.filter((reservation) => reservation.state === value)
        )
      : setReservation(allreservations);
  };

  const toggle = () => {
    reservations ? setReservations(false) : setReservations(true);
    if (reservations) {
      setReservation(allreservations);
      setTitle("All contracts");
    }
    Docs ? setDocs(false) : setDocs(true);
  };
  useEffect(() => {
    getReservations();
  }, [newRes]);
  useEffect(() => {
    data && getContracts();
  }, [data]);
  useEffect(() => {
    contract && getBills();
  }, [contract]);

  useEffect(() => {
    bill && setAllReservations(reservation);
  }, [bill]);

  const getReservations = async () => {
    setData(false);
    await ReservationAPIs.userReservationList(
      JSON.parse(localStorage.getItem("myId"))
    ).then((data) => {
      let res = [];
      data.map((d) =>
        res.push({
          RenterFName: d.RenterFName,
          RenterLName: d.RenterLName,
          photo: d.photo,
          carNum: d.carNum,
          carName: d.carName,
          id: d.id,
          issue_date: d.issue_date,
          return_date: d.return_date,
          issue_location: d.issue_location,
          return_location: d.return_location,
          car_rented_id: d.car_rented_id,
          sort_checker_id: d.sort_checker_id,
          enter_checker_id: d.enter_checker_id,
          Driver_id: d.Driver_id,
          Renter_id: d.Renter_id,
          state: d.state,
          Docs: [],
        })
      );
      setReservation(res);
    });
    setData(true);
  };
  const getContracts = async () => {
    setContract(false);
    await ContartAPIs.ContratList().then((data) => {
      reservation.map((r) => {
        data.map((d) => {
          if (d.reservation === r.id) {
            r.Docs.push({ contract: d.PDFFile, bill: null, contractId: d.id });
          }
        });
      });
    });
    setContract(true);
  };
  const getBills = async () => {
    setBill(false);
    await BillAPIs.BillList().then((data) => {
      reservation.map((r) => {
        r.Docs.map((d) => {
          data.map((data) => {
            console.log(data);
            if (d.contractId === data.Contrat_id) {
              d.bill = data.PDFBill;
            }
          });
        });
      });
    });
    setBill(true);
  };
  return (
    <Main title={"Rentals"}>
      {reservations && (
        <>
          <div className="d-flex justify-content-between flex-column flex-sm-row p-lg-3">
            <h4>Filter using contarct state</h4>
            <Form.Select onChange={reRender} className="w-50 fs-6">
              <option value="All contracts">All contracts</option>
              <option value="not completed"> Not completed</option>
              <option value="driver not yet signed">
                Driver not yet signed
              </option>
              <option value="completed">Completed </option>
              <option value="active"> Active</option>
              <option value="expired"> Expired</option>
              <option value="completed">Completed</option>
              <option value="not payed">Not payed</option>
            </Form.Select>
          </div>
          <h1 className="px-4">{title}</h1>
          <div className="p-3 d-flex flex-wrap justify-content-center">
            {reservation &&
              reservation.map((r, i) => (
                <button
                  onClick={() => {
                    setSelectedReservation(r);
                    toggle();
                  }}
                  key={i}
                  className="contract-card w-100 p-3 m-1 d-flex flex-sm-row flex-column"
                >
                  <div className="img-containe rent-vehicle d-flex m-auto justify-content-center align-items-center">
                    <img
                      className=" p-2"
                      src={`https://cdn.imagin.studio/getImage?customer=img&${r.photo
                        .replaceAll("%3D", "=")
                        .replace(
                          "%26",
                          "&"
                        )}&angle=23&width=2600&zoomType=fullscreen`}
                      alt={`${r.carName}_photo`}
                    />
                  </div>
                  <ul className="list-unstyled w-100 my-1 rent-info flex-column ">
                    <li className="d-flex flex-wrap ">
                      <p className="m-0">
                        <b>
                          <span className="px-1 fs-5">{r.issue_location}</span>
                        </b>
                        <b>
                          <i className="bi bi-arrow-right px-1 fs-3"></i>
                        </b>
                        <b>
                          <span className="px-1 fs-5">{r.return_location}</span>
                        </b>
                      </p>
                    </li>
                    <li className="d-flex flex-wrap ">
                      <p className="m-0">
                        <b>
                          <span className="px-1 fs-5">
                            {`${r.issue_date.slice(0, 10)} ${r.issue_date.slice(
                              11,
                              16
                            )}`}
                          </span>{" "}
                        </b>
                        <b>
                          <i className="bi bi-arrow-right px-1 fs-3"></i>
                        </b>
                        <b>
                          <span className="px-1 fs-5">
                            {`${r.return_date.slice(
                              0,
                              10
                            )} ${r.return_date.slice(11, 16)}`}
                          </span>
                        </b>
                      </p>
                    </li>
                    <li className="d-flex flex-wrap ">
                      <p className="my-1 mx-2">
                        <b>Renter:</b>{" "}
                        <span className="p-1">
                          {`${r.RenterFName} ${r.RenterLName}`}
                        </span>
                      </p>
                      <p className="my-1 mx-2">
                        <b>Renter ID:</b>{" "}
                        <span className="p-1">{r.Renter_id}</span>
                      </p>
                    </li>
                    <li className="d-flex flex-wrap ">
                      <p className=" my-1 mx-2">
                        <b>Vehicle:</b> <span className="p-1">{r.carName}</span>
                      </p>
                      <p className=" my-1 mx-2">
                        <b>Registration Number:</b>
                        <span className="p-1">{r.carNum}</span>
                      </p>
                    </li>
                    <li className="d-flex flex-wrap ">
                      <p className=" my-1 mx-2">
                        <b>Renting ID :</b> <span className="p-1">{r.id}</span>
                      </p>
                      <p className=" my-1 mx-2">
                        <b>State:</b> <span className="p-1">{r.state}</span>
                      </p>
                    </li>
                  </ul>
                </button>
              ))}
          </div>
        </>
      )}
      {Docs && (
        <>
          <div className="d-flex d-flex align-items-center">
            <button
              type="button"
              className="btn d-flex justify-content-center align-items-center"
              onClick={() => toggle()}
            >
              <i
                className="bi bi-arrow-left p-2 fs-3 d-flex justify-content-center align-items-center"
                style={{
                  borderRadius: "30px",
                  boxShadow: "0px 4px 18px rgba(221, 221, 221, 0.51)",
                  background: "var(--btn_color1)",
                  color: "white",
                }}
              ></i>
            </button>
            <h1> Reservation {selectedReservation.id}</h1>
          </div>
          <div className="p-3 d-flex flex-wrap justify-content-center">
            {selectedReservation.Docs.map((c, i) => (
              <>
                <div className="contract-card w-100 p-3 m-1 d-flex flex-sm-row flex-column">
                  <ul className="list-unstyled w-100 my-1 rent-info flex-column ">
                    {c.contract && (
                      <li>
                        <Document
                          className="d-flex flex-column align-items-center"
                          file={`http://127.0.0.1:8000${c.contract}`}
                          onLoadSuccess={onDocumentLoadSucces}
                        >
                          {Array.from(new Array(numPages), (el, index) => (
                            <Page
                              className={"PDFPage mb-2"}
                              key={`page_${index + 1}`}
                              renderTextLayer={false}
                              renderInteractiveForms={false}
                              pageNumber={index + 1}
                            />
                          ))}
                        </Document>
                        <div className="d-flex justify-content-end flex-column flex-sm-row p-lg-3">
                          <div className="d-flex justify-content-end flex-column flex-sm-row p-lg-3">
                            <div className="d-flex flex-wrap">
                              {selectedReservation.state === "completed" && (
                                <button
                                  type="button"
                                  className="btn mx-lg-2 m-1 d-flex justify-content-center align-items-center"
                                  style={{
                                    borderRadius: "30px",
                                    boxShadow:
                                      "0px 4px 18px rgba(221, 221, 221, 0.51)",
                                    background: "var(--btn_color1)",
                                    color: "var(--nav_font_color)",
                                  }}
                                  onClick={() =>
                                    window
                                      .open(
                                        `http://127.0.0.1:8000${c.contract}`,
                                        "_blank"
                                      )
                                      .focus()
                                  }
                                >
                                  <i
                                    className="bi bi-download fs-6"
                                    style={{
                                      color: "white",
                                    }}
                                  ></i>
                                  Download Contart
                                </button>
                              )}
                              {selectedReservation.state ===
                                "not completed" && (
                                <button
                                  type="button"
                                  className="btn mx-lg-2 m-1 d-flex justify-content-center align-items-center"
                                  style={{
                                    borderRadius: "30px",
                                    boxShadow:
                                      "0px 4px 18px rgba(221, 221, 221, 0.51)",
                                    background: "var(--btn_color1)",
                                    color: "var(--nav_font_color)",
                                  }}
                                  onClick={completSign}
                                >
                                  <i
                                    className="bi bi-pen fs-6"
                                    style={{
                                      color: "white",
                                    }}
                                  ></i>
                                  Submit signature
                                </button>
                              )}
                            </div>
                          </div>
                        </div>
                      </li>
                    )}
                    {selectedReservation.Renter_id ===
                      JSON.parse(localStorage.getItem("myId")) &&
                      c.bill && (
                        <li>
                          <Document
                            className="d-flex flex-column align-items-center"
                            file={`http://127.0.0.1:8000${c.bill}`}
                            onLoadSuccess={onDocumentLoadSucces}
                          >
                            {Array.from(new Array(numPages), (el, index) => (
                              <Page
                                className={"PDFPage mb-2"}
                                key={`page_${index + 1}`}
                                renderTextLayer={false}
                                renderInteractiveForms={false}
                                pageNumber={index + 1}
                              />
                            ))}
                          </Document>
                          <div className="d-flex justify-content-end flex-column flex-sm-row p-lg-3">
                            <div className="d-flex justify-content-end flex-column flex-sm-row p-lg-3">
                              <div className="d-flex flex-wrap">
                                {selectedReservation.state !==
                                  "not payed" && (
                                  <button
                                    type="button"
                                    className="btn mx-lg-2 m-1 d-flex justify-content-center align-items-center"
                                    style={{
                                      borderRadius: "30px",
                                      boxShadow:
                                        "0px 4px 18px rgba(221, 221, 221, 0.51)",
                                      background: "var(--btn_color1)",
                                      color: "var(--nav_font_color)",
                                    }}
                                    onClick={() =>
                                      window
                                        .open(
                                          `http://127.0.0.1:8000${c.bill}`,
                                          "_blank"
                                        )
                                        .focus()
                                    }
                                  >
                                    <i
                                      className="bi bi-download fs-6"
                                      style={{
                                        color: "white",
                                      }}
                                    ></i>
                                    Download bill
                                  </button>
                                )}
                              </div>
                            </div>
                          </div>
                        </li>
                      )}
                    {selectedReservation.Renter_id !==
                      JSON.parse(localStorage.getItem("myId")) &&
                      selectedReservation.state === "driver not yet signed" && (
                        <div className="d-flex justify-content-end flex-column flex-sm-row p-lg-3">
                          <div className="d-flex flex-wrap">
                            <button
                              type="button"
                              className="btn mx-lg-2 m-1 d-flex justify-content-center align-items-center"
                              onClick={AddSign}
                              style={{
                                background: "var(--btn_color1)",
                                color: "white",
                              }}
                            >
                              <i
                                className="bi bi-pen fs-4"
                                style={{
                                  color: "white",
                                }}
                              ></i>
                              Submit signature
                            </button>
                          </div>
                        </div>
                      )}
                  </ul>
                  {displaySignPad && (
                    <MySignaturePad
                      AddSign={AddSign}
                      contractId={c.contractId}
                      reservation={selectedReservation}
                    />
                  )}
                  {displayCompletSignPad && (
                    <CompletSignaturePad
                      AddSign={completSign}
                      contractId={c.contractId}
                      reservation={selectedReservation}
                    />
                  )}
                </div>
              </>
            ))}
          </div>
        </>
      )}
    </Main>
  );
};

const MySignaturePad = ({ AddSign, contractId, reservation }) => {
  let sigPad = useRef({});
  const [contract, setContract] = useState(null);
  const [reservationState, setReservationState] = useState(null);

  const submit = () => {
    getReservation();
  };
  useEffect(() => {
    if (contract) {
      AddSign();
    }
  }, [contract]);

  useEffect(() => {
    if (reservationState) {
      getContract();
    }
  }, [reservationState]);

  const getContract = async () => {
    let data = {
      signatureDriver: sigPad.current.toDataURL("image/png"),
      reservation: reservation.id,
    };
    await ContartAPIs.ContratUpdate(contractId, data).then((data) =>
      setContract(data)
    );
  };

  const getReservation = async () => {
    let data = {
      issue_date: reservation.issue_date,
      return_date: reservation.return_date,
      issue_location: reservation.issue_location,
      return_location: reservation.return_location,
      state: "completed",
      car_rented: reservation.car_rented_id,
      Driver: reservation.Driver_id,
      Renter: reservation.Renter_id,
    };
    await ReservationAPIs.ReservationUpdate(reservation.id, data).then((data) =>
      setReservationState(data)
    );
  };
  const cancel = () => {
    AddSign();
  };
  const clear = () => {
    sigPad.current.clear();
  };
  return (
    <div
      className="modal fade show d-block"
      id="exampleModalCenter"
      tabIndex="-1"
      role="dialog"
    >
      <div className="modal-dialog modal-dialog-centered" role="dialog">
        <div className="modal-content">
          <div className="modal-header">
            <h4 className="modal-title" id="Ckeck Form">
              Submit Signature
            </h4>
          </div>
          <div className="modal-body">
            <div className="signature-container">
              <SignaturePad ref={sigPad} />
            </div>
          </div>
          <div className="modal-footer">
            <div className="d-flex w-100 justify-content-between">
              <button
                onClick={cancel}
                style={{
                  width: "100px",
                  color: "white",
                  border: "1px solid var(--bg_icon_color)",
                  background: "var(--btn_color1)",
                  borderRadius: "5px",
                }}
              >
                cancel
              </button>
              <button
                onClick={clear}
                style={{
                  width: "100px",
                  color: "white",
                  border: "1px solid var(--bg_icon_color)",
                  background: "var(--btn_color1)",
                  borderRadius: "5px",
                }}
              >
                clear
              </button>
              <button
                onClick={submit}
                style={{
                  width: "100px",
                  color: "white",
                  border: "1px solid var(--bg_icon_color)",
                  background: "var(--btn_color1)",
                  borderRadius: "5px",
                }}
              >
                submit
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

const CompletSignaturePad = ({ AddSign, contractId, reservation }) => {
  let sigPad = useRef({});
  const [contract, setContract] = useState(null);
  const [reservationState, setReservationState] = useState(null);

  const submit = () => {
    getReservation();
  };
  useEffect(() => {
    contract && AddSign();
  }, [contract]);

  useEffect(() => {
    reservationState && getContract();
  }, [reservationState]);

  const getContract = async () => {
    let data;
    if (reservation.Driver_id !== JSON.parse(localStorage.getItem("driver"))) {
      data = {
        reservation: reservation.id,
        signatureRenter: sigPad.current.toDataURL("image/png"),
        type: "new",
      };
    } else {
      data = {
        reservation: reservation.id,
        signatureDriver: sigPad.current.toDataURL("image/png"),
        signatureRenter: sigPad.current.toDataURL("image/png"),
        type: "new",
      };
    }
    await ContartAPIs.ContratUpdate(contractId, data).then((data) =>
      setContract(data)
    );
  };

  const getReservation = async () => {
    let data;
    if (reservation.Driver_id !== JSON.parse(localStorage.getItem("driver"))) {
      data = {
        issue_date: reservation.issue_date,
        return_date: reservation.return_date,
        issue_location: reservation.issue_location,
        return_location: reservation.return_location,
        state: "driver not yet signed",
        car_rented: reservation.car_rented_id,
        Driver: reservation.Driver_id,
        Renter: reservation.Renter_id,
      };
    } else {
      data = {
        issue_date: reservation.issue_date,
        return_date: reservation.return_date,
        issue_location: reservation.issue_location,
        return_location: reservation.return_location,
        state: "completed",
        car_rented: reservation.car_rented_id,
        Driver: reservation.Driver_id,
        Renter: reservation.Renter_id,
      };
    }
    await ReservationAPIs.ReservationUpdate(reservation.id, data).then((data) =>
      setReservationState(data)
    );
  };
  const cancel = () => {
    AddSign();
  };
  const clear = () => {
    sigPad.current.clear();
  };
  return (
    <div
      className="modal fade show d-block"
      id="exampleModalCenter"
      tabIndex="-1"
      role="dialog"
    >
      <div className="modal-dialog modal-dialog-centered" role="dialog">
        <div className="modal-content">
          <div className="modal-header">
            <h4 className="modal-title" id="Ckeck Form">
              Submit Signature
            </h4>
          </div>
          <div className="modal-body">
            <div className="signature-container">
              <SignaturePad ref={sigPad} />
            </div>
          </div>
          <div className="modal-footer">
            <div className="d-flex w-100 justify-content-between">
              <button
                onClick={cancel}
                style={{
                  width: "100px",
                  color: "white",
                  border: "1px solid var(--bg_icon_color)",
                  background: "var(--btn_color1)",
                  borderRadius: "5px",
                }}
              >
                cancel
              </button>
              <button
                onClick={clear}
                style={{
                  width: "100px",
                  color: "white",
                  border: "1px solid var(--bg_icon_color)",
                  background: "var(--btn_color1)",
                  borderRadius: "5px",
                }}
              >
                clear
              </button>
              <button
                onClick={submit}
                style={{
                  width: "100px",
                  color: "white",
                  border: "1px solid var(--bg_icon_color)",
                  background: "var(--btn_color1)",
                  borderRadius: "5px",
                }}
              >
                submit
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};
