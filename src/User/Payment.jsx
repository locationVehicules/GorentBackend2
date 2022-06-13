import React, { useState, useEffect, useContext } from "react";
import { Link } from "react-router-dom";
import { Main } from "../components/Main";
import { DriverInfos, PaimentInfos } from "./GetInfos";
import { MySignaturePad } from "./MyContract";
import { Reservation } from "../GetSetData/Contexts";
import AdministrationAPIs from "../GetSetData/useAPIs/AdministrationAPIs";
import ReservationAPIs from "../GetSetData/useAPIs/ReservationAPIs";
import ContartAPIs from "../GetSetData/useAPIs/ContartAPIs";
import PaymentAPIs from "../GetSetData/useAPIs/paymentAPIs";
import BillAPIs from "../GetSetData/useAPIs/BillAPIs";

export const Payment = ({ user }) => {
  const context = useContext(Reservation);
  const [display, setDisplay] = useState(false);
  const [text, setText] = useState("");
  const [displaySignPad, setDisplaySignPad] = useState(false);

  useEffect(() => {
    window.scrollTo({
      top: 0,
      behavior: "smooth",
    });
  }, []);

  const displayConfirmation = () => {
    display ? setDisplay(false) : setDisplay(true);
  };
  const Confirm = () => {
    if (context.paymentMethod[0] === "On Spot") {
      context.stateR[1]("not payed");
      setText("Pay location to cuntune reservation");
      displayConfirmation();
    } else {
      setText("Your reservation passed successfully!");
      AddSign();
    }
  };
  const AddSign = () => {
    console.log(context.bill[0], context.contract[0]);
    context.bill[0] && context.contract[0] && displayConfirmation();
    displaySignPad ? setDisplaySignPad(false) : setDisplaySignPad(true);
  };
  return (
    <Main title={"Rent"}>
      <DriverInfos enterprise={false} />
      <PaimentInfos path={`${user}/${user}`} />
      <hr className="mb-4" />
      <div className="btn d-flex justify-content-end align-items-center">
        <button
          className="btn"
          style={{
            borderRadius: "10px",
            height: 40,
            color: "white",
            background: "var(--pr1)",
          }}
          onClick={() => {
            Confirm();
          }}
        >
          Continue to checkout
        </button>
      </div>
      {displaySignPad && <MySignaturePad AddSign={AddSign} />}
      {display && <Confirmation user={user} text={text} />}
    </Main>
  );
};

export const Confirmation = ({ user, text }) => {
  const context = useContext(Reservation);
  const [onSpot, setOnSpot] = useState(null);
  const [agency, setAgency] = useState(false);
  const [driverS, setDriverS] = useState(null);
  const [reservation, setReservation] = useState(null);
  const [driver, setDriver] = useState(null);

  const [contract, setContract] = useState(null);
  const [payment, setPayment] = useState(null);
  const [bill, setBill] = useState(null);

  useEffect(() => {
    context.paymentMethod[0] === "On Spot" ? setOnSpot(true) : setOnSpot(false);
    getDriverID(context.driver[0]);
  }, []);

  useEffect(() => {
    driver && reserve();
  }, [driver]);

  useEffect(() => {
    if (reservation) {
      getContract();
    }
  }, [reservation]);
  useEffect(() => {
    if (contract) {
      payInfo();
    }
  }, [contract]);
  useEffect(() => {
    if (payment) {
      getBill();
    }
  }, [payment]);
  useEffect(() => {
    bill && getAgency();
  }, [bill]);

  const getAgency = async () => {
    await AdministrationAPIs.AgencyDetail(context.rentLocation[0]).then(
      (data) => setAgency(data)
    );
  };
  const reserve = async () => {
    await ReservationAPIs.reservationCarOnLigne(context, driver).then((data) =>
      setReservation(data.id)
    );
  };
  const getContract = async () => {
    let data = {
      reservation: reservation,
      type: "new",
    };
    await ContartAPIs.AddContrat(data).then((data) => setContract(data));
  };
  const payInfo = async () => {
    return await PaymentAPIs.PayInfo({
      method_paiment: context.paymentMethod[0],
      Amount: context.total[0],
      nbHour: context.nbHours[0],
      nbDay: context.nbDays[0],
    }).then((data) => setPayment(data));
  };
  const getBill = async () => {
    let data = {
      Contrat: contract.id,
      promotion: context.promotion[0],
      payment: payment.id,
    };
    return await BillAPIs.AddBill(data).then((data) => setBill(data));
  };
  const getDriverID = async (userId) => {
    await AdministrationAPIs.DriverDetail(userId).then((data) =>
      setDriver(data.id)
    );
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
          <div className="modal-body">
            <div className="text-success">
              <i
                className="bi bi-check-circle m-3 d-flex justify-content-center text-success"
                style={{ fontSize: "55px" }}
              ></i>
              <p className=" d-flex justify-content-center fs-3">Success</p>
            </div>
            <p className="d-flex pt-2 px-3 justify-content-center fs-5">
              {text}
            </p>
            {driverS && (
              <p className="d-flex pt-2 px-3 justify-content-center align-items-center text-warning fs-6">
                <i className="bi bi-exclamation-triangle text-warning px-1 "></i>
                {driverS}
              </p>
            )}
            {agency && (
              <div className="row">
                <div className="col-md-6">
                  <h5>
                    <strong>Agency location</strong>
                  </h5>
                  <strong>Name</strong>
                  <p className="px-1">{agency.name}</p>
                  <strong>Adresse</strong>
                  <p className="px-1"> {agency.address}</p>
                </div>
                <div className="col-md-6">
                  <iframe
                    title={"location"}
                    src={`https://www.google.com/maps/${agency.localisation}`}
                    className="w-100 h-100 border-0"
                    allowFullScreen=""
                    loading="lazy"
                    referrerPolicy="no-referrer-when-downgrade"
                  />
                </div>
              </div>
            )}
          </div>
          <div className="modal-footer">
            {onSpot ? (
              <Link
                to={`/${user}/${user}/Rentals`}
                className="btn accept-btn fs-5"
                data-dismiss="modal"
                style={{ color: "black" }}
              >
                OK
              </Link>
            ) : (
              <Link
                to={`/${user}/${user}/Rentals/MyContract`}
                className="btn accept-btn fs-5"
                data-dismiss="modal"
                style={{ color: "black" }}
              >
                OK
              </Link>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};
