import React, { useState, useEffect } from "react";
import { Main } from "../components/Main";
import ReservationAPIs from "../GetSetData/useAPIs/ReservationAPIs";
import ContartAPIs from "../GetSetData/useAPIs/ContartAPIs";
import BillAPIs from "../GetSetData/useAPIs/BillAPIs";
import PaymentAPIs from "../GetSetData/useAPIs/paymentAPIs";
import "../css/etablir_contrat.css";

export const RentalsManagement = () => {
  const [reservation, setReservation] = useState();
  const [display, setDisplay] = useState(false);
  const [allreservations, setAllReservations] = useState(true);
  const [contract, setContract] = useState(false);
  const [bill, setBill] = useState(false);
  const [data, setData] = useState(false);
  const [newRes, setNewRes] = useState(false);
  const [selectedReservation, setSelectedReservation] = useState(null);
  const [resID, setResID] = useState("");

  const displayForm = () => {
    if (display) {
      setNewRes(true);
      setResID("");
      setDisplay(false);
    } else {
      setDisplay(true);
    }
    display ? setDisplay(false) : setDisplay(true);
  };
  const reRender = (e) => {
    let value = e.target.value;
    setResID(value);
    value !== ""
      ? setReservation(
          allreservations.filter(
            (reservation) => reservation.id === parseInt(value)
          )
        )
      : setReservation(allreservations);
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
    await ReservationAPIs.reservationList().then((data) => {
      let res = [];
      data.map((d) => {
        d.state === "not payed" &&
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
            billId: null,
            paymentId: null,
            Amount: null,
            contractId: null,
          });
      });
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
            r.contractId = d.id;
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
        data.map((data) => {
          if (r.contractId === data.Contrat_id) {
            r.billId = data.id;
            r.Amount = data.Amount;
            r.paymentId = data.payment_id;
          }
        });
      });
    });

    setBill(true);
  };

  return (
    <Main title={"Rentals Management"}>
      <div className="d-flex justify-content-between flex-column flex-sm-row p-lg-3">
        <h4>Filter using Reservation ID</h4>
        <div id="search" className="d-flex align-items-center m-1 mx-lg-2 px-3">
          <i className="bi bi-search fs-5"></i>
          <input
            value={resID}
            onChange={reRender}
            className="form-control form-control-sm ml-3 fs-6"
            type="text"
            placeholder="by Revervation ID"
            aria-label="Search"
          />
        </div>
      </div>
      <div className="p-3 d-flex flex-wrap justify-content-center">
        {reservation &&
          reservation.map((r, i) => (
            <button
              onClick={() => {
                setSelectedReservation(r);
                displayForm();
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
                        {`${r.return_date.slice(0, 10)} ${r.return_date.slice(
                          11,
                          16
                        )}`}
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
                    <b>Renter ID:</b> <span className="p-1">{r.Renter_id}</span>
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
                    <b>Amount:</b> <span className="p-1">{r.Amount} DZD</span>
                  </p>
                </li>
              </ul>
            </button>
          ))}
      </div>
      {display && (
        <ValidePayForm
          selectedReservation={selectedReservation}
          displayForm={displayForm}
        />
      )}
    </Main>
  );
};

const ValidePayForm = ({ selectedReservation, displayForm }) => {
  const [Receipt, setReceipt] = useState("");
  const [reservation, setReservation] = useState(null);
  const [contract, setContract] = useState(null);
  const [payment, setPayment] = useState(null);
  const [bill, setBill] = useState(null);
  const saveData = () => {
    updateReserve();
  };
  useEffect(() => {
    reservation && updateContract();
  }, [reservation]);
  useEffect(() => {
    contract && updatePayInfo();
  }, [contract]);
  useEffect(() => {
    payment && updateBill();
  }, [payment]);
  useEffect(() => {
    bill && displayForm();
  }, [bill]);

  const updateReserve = async () => {
    await ReservationAPIs.ReservationUpdate(selectedReservation.id, {
      Driver: selectedReservation.Driver_id,
      Renter: selectedReservation.Renter_id,
      car_rented: selectedReservation.car_rented_id,
      issue_date: selectedReservation.issue_date,
      issue_location: selectedReservation.issue_location,
      return_date: selectedReservation.return_date,
      return_location: selectedReservation.return_location,
      state: "not completed",
    }).then((data) => setReservation(data.id));
  };
  const updateContract = async () => {
    let data = {
      reservation: selectedReservation.id,
      secretary_id: JSON.parse(localStorage.getItem("secretary")),
    };
    await ContartAPIs.ContratUpdate(selectedReservation.contractId, data).then(
      (data) => setContract(data)
    );
  };
  const updatePayInfo = async () => {
    let currentDate = new Date();
    currentDate = `${currentDate.getFullYear()}-${
      currentDate.getMonth() + 1
    }-${currentDate.getDate()} ${currentDate.getHours()}:${currentDate.getMinutes()}:00`;

    return await PaymentAPIs.updatePayInfo(selectedReservation.paymentId, {
      Receipt: Receipt,
      date: currentDate,
      method_paiment: "On Spot",
    }).then((data) => setPayment(data));
  };
  const updateBill = async () => {
    return await BillAPIs.BillUpdate(selectedReservation.billId, {
      Contrat: selectedReservation.contractId,
    }).then((data) => setBill(data));
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
              Validate Payment
            </h4>
          </div>
          <div className="modal-body m-0 p-1">
            <div className="d-flex flex-wrap justify-content-center align-items-center">
              <p className=" my-1 mx-2 fs-5">
                <b>Renting ID :</b>{" "}
                <span className="p-1">{selectedReservation.id}</span>
              </p>
              <p className=" my-1 mx-2 fs-5">
                <b>Amount:</b>{" "}
                <span className="p-1">{selectedReservation.Amount} DZD</span>
              </p>
            </div>
            <div
              id="alert"
              className="d-flex flex-column justify-content-center align-items-center border p-0 mx-2"
            >
              <div className="d-flex flex-wrap">
                <p className="m-0">
                  <b>
                    <span className="px-1 fs-5">
                      {selectedReservation.issue_location}
                    </span>
                  </b>
                  <b>
                    <i className="bi bi-arrow-right px-1 fs-3"></i>
                  </b>
                  <b>
                    <span className="px-1 fs-5">
                      {selectedReservation.return_location}
                    </span>
                  </b>
                </p>
              </div>
              <div className="d-flex flex-wrap">
                <p className="m-0">
                  <b>
                    <span className="px-1 fs-5">
                      {`${selectedReservation.issue_date.slice(
                        0,
                        10
                      )} ${selectedReservation.issue_date.slice(11, 16)}`}
                    </span>{" "}
                  </b>
                  <b>
                    <i className="bi bi-arrow-right px-1 fs-3"></i>
                  </b>
                  <b>
                    <span className="px-1 fs-5">
                      {`${selectedReservation.return_date.slice(
                        0,
                        10
                      )} ${selectedReservation.return_date.slice(11, 16)}`}
                    </span>
                  </b>
                </p>
              </div>
            </div>
            <div className="d-flex flex-wrap px-2">
              <p className="my-1 mx-2">
                <b>Renter:</b>{" "}
                <span className="p-1">
                  {`${selectedReservation.RenterFName} ${selectedReservation.RenterLName}`}
                </span>
              </p>
              <p className="my-1 mx-2">
                <b>Renter ID:</b>{" "}
                <span className="p-1">{selectedReservation.Renter_id}</span>
              </p>
            </div>
            <div className="d-flex flex-wrap px-2">
              <p className=" my-1 mx-2">
                <b>Vehicle:</b>{" "}
                <span className="p-1">{selectedReservation.carName}</span>
              </p>
              <p className=" my-1 mx-2">
                <b>Registration Number:</b>
                <span className="p-1">{selectedReservation.carNum}</span>
              </p>
            </div>
            <div className="d-flex flex-column ">
              <div className="w-100 m-1 d-flex justify-content-center align-items-center px-2 fs-6">
                <input
                  type="text"
                  name="receipt"
                  className="form-control mt-1"
                  id="Receipt"
                  onChange={(e) => setReceipt(e.target.value)}
                  placeholder="Receipt number"
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

          <div className="modal-footer">
            <button
              type="button"
              className="btn"
              data-dismiss="modal"
              onClick={() => displayForm()}
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
