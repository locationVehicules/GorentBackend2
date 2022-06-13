import React, { useState, useRef, useContext, useEffect } from "react";
import { Link } from "react-router-dom";
import { Main } from "../components/Main";
import { PaimentInfos } from "./GetInfos";
import { Reservation } from "../GetSetData/Contexts";
import ReservationAPIs from "../GetSetData/useAPIs/ReservationAPIs";
import AdministrationAPIs from "../GetSetData/useAPIs/AdministrationAPIs";
import ContartAPIs from "../GetSetData/useAPIs/ContartAPIs";
import PaymentAPIs from "../GetSetData/useAPIs/paymentAPIs";
import BillAPIs from "../GetSetData/useAPIs/BillAPIs";

import SignaturePad from "react-signature-canvas";

import { Document, Page, pdfjs } from "react-pdf/dist/esm/entry.webpack";
pdfjs.GlobalWorkerOptions.workerSrc = `//cdnjs.cloudflare.com/ajax/libs/pdf.js/${pdfjs.version}/pdf.worker.js`;

export const MyContract = ({ user }) => {
  const context = useContext(Reservation);
  const [contract, setContract] = useState(context.contract[0]);
  const [bill, setBill] = useState(context.bill[0]);

  const contartPath = contract.PDFFile;
  const billPath = bill.PDFBill;

  const sameDriver = true;
  const [numPages, setNumPages] = useState(null);

  const onDocumentLoadSucces = ({ numPages }) => {
    setNumPages(numPages);
  };
  const [displayCancel, setDisplayCancel] = useState(false);
  const [renew, setRenewl] = useState(false);
  const [displaySignPad, setDisplaySignPad] = useState(false);

  const displayConfirmation = () => {
    displayCancel ? setDisplayCancel(false) : setDisplayCancel(true);
  };
  const confirmation = (e) => {
    displayConfirmation();
  };

  const AddSign = () => {
    displaySignPad ? setDisplaySignPad(false) : setDisplaySignPad(true);
  };
  const displayRenew = () => {
    renew ? setRenewl(false) : setRenewl(true);
  };

  const DownloadContart = () => {
    window.open(`http://127.0.0.1:8000${contartPath}`, "_blank").focus();
  };
  const DownloadBill = () => {
    window.open(`http://127.0.0.1:8000${billPath}`, "_blank").focus();
  };
  return (
    <Main title={"Contract and Bill"}>
      <div className="container">
        <div className="d-flex d-flex align-items-center">
          <Link to={`/${user}/${user}/Rentals`}>
            <button
              type="button"
              className="btn d-flex justify-content-center align-items-center"
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
          </Link>
          <h1>Contract</h1>{" "}
        </div>
        <Document
          className="d-flex flex-column align-items-center"
          file={`http://127.0.0.1:8000${contartPath}`}
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
              <button
                type="button"
                className="btn mx-lg-2 m-1 d-flex justify-content-center align-items-center"
                style={{
                  borderRadius: "30px",
                  boxShadow: "0px 4px 18px rgba(221, 221, 221, 0.51)",
                  background: "var(--btn_color1)",
                  color: "var(--nav_font_color)",
                }}
                onClick={() => DownloadContart()}
              >
                <i
                  className="bi bi-download fs-6"
                  style={{
                    color: "white",
                  }}
                ></i>
                Download Contart
              </button>
            </div>
          </div>
        </div>
        {!sameDriver ? (
          <div className="d-flex justify-content-end flex-column flex-sm-row p-lg-3">
            <div className="d-flex flex-wrap">
              <button
                type="button"
                className="btn mx-lg-2 m-1 d-flex justify-content-center align-items-center"
                onClick={confirmation}
                style={{
                  width: "150px",
                  background: "var(--btn_color1)",
                  color: "white",
                }}
              >
                <i
                  className="bi bi-x-lg fs-4"
                  style={{
                    color: "white",
                  }}
                ></i>
                Cancel reservation
              </button>
              <button
                type="button"
                className="btn mx-lg-2 m-1 d-flex justify-content-center align-items-center"
                onClick={AddSign}
                style={{
                  width: "150px",
                  background: "var(--btn_color1)",
                  color: "white",
                }}
              >
                <i
                  className="bi bi-check2-circle fs-4"
                  style={{
                    color: "white",
                  }}
                ></i>
                Submit signature
              </button>
            </div>
          </div>
        ) : (
          <>
            <h1>Bill</h1>
            <Document
              className="d-flex flex-column align-items-center"
              file={`http://127.0.0.1:8000${billPath}`}
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
                  <button
                    type="button"
                    className="btn mx-lg-2 m-1 d-flex justify-content-center align-items-center"
                    style={{
                      borderRadius: "30px",
                      boxShadow: "0px 4px 18px rgba(221, 221, 221, 0.51)",
                      background: "var(--btn_color1)",
                      color: "var(--nav_font_color)",
                    }}
                    onClick={() => DownloadBill()}
                  >
                    <i
                      className="bi bi-download fs-6"
                      style={{
                        color: "white",
                      }}
                    ></i>
                    Download bill
                  </button>
                </div>
              </div>
            </div>

            <div className="d-flex justify-content-end flex-column flex-sm-row p-lg-3">
              <div className="d-flex justify-content-end flex-column flex-sm-row p-lg-3">
                <div className="d-flex flex-wrap">
                  <button
                    type="button"
                    className="btn mx-lg-2 m-1 d-flex justify-content-center align-items-center"
                    onClick={displayRenew}
                    style={{
                      borderRadius: "30px",
                      boxShadow: "0px 4px 18px rgba(221, 221, 221, 0.51)",
                      background: "var(--btn_color1)",
                      color: "var(--nav_font_color)",
                    }}
                  >
                    <i
                      className="bi bi-arrow-repeat fs-4"
                      style={{
                        color: "white",
                      }}
                    ></i>
                    Renew reservation
                  </button>
                </div>
              </div>
            </div>
          </>
        )}
      </div>

      {displaySignPad && <MySignaturePad AddSign={AddSign} />}
      {renew && <RenewFrom displayRenew={displayRenew} />}
    </Main>
  );
};

export const MySignaturePad = ({ AddSign }) => {
  const context = useContext(Reservation);
  let sigPad = useRef({});
  const [driver, setDriver] = useState(null);
  const [reservation, setReservation] = useState(null);
  const [contract, setContract] = useState(null);
  const [payment, setPayment] = useState(null);
  const [bill, setBill] = useState(null);

  const submit = () => {
    if (context.driver[0] !== JSON.parse(localStorage.getItem("myId"))) {
      context.signatureR[1](sigPad.current.toDataURL("image/png"));
      context.stateR[1]("driver not yet signed");
      getDriverID(context.driver[0]);
    } else {
      context.signatureR[1](sigPad.current.toDataURL("image/png"));
      context.signatureD[1](sigPad.current.toDataURL("image/png"));
      context.stateR[1]("completed");
      getDriverID(context.driver[0]);
    }
  };

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
      pay();
      payInfo();
    }
  }, [contract]);
  useEffect(() => {
    if (payment) {
      getBill();
    }
  }, [payment]);
  useEffect(() => {
    if (bill && contract) {
      context.bill[1](bill);
      context.contract[1](contract);
    }
  }, [bill, contract]);
  useEffect(() => {
    if (context.bill[0] && context.contract[0]) {
      AddSign();
    }
  }, [context.bill[0], context.contract[0]]);

  const reserve = async () => {
    await ReservationAPIs.reservationCarOnLigne(context, driver).then((data) =>
      setReservation(data.id)
    );
  };
  const getContract = async () => {
    let data;
    if (context.signatureD[0] === null) {
      data = {
        reservation: reservation,
        signatureRenter: context.signatureR[0],
        type: "new",
      };
    } else {
      data = {
        reservation: reservation,
        signatureDriver: context.signatureD[0],
        signatureRenter: context.signatureR[0],
        type: "new",
      };
    }
    await ContartAPIs.AddContrat(data).then((data) => setContract(data));
  };
  const pay = async () => {
    return await PaymentAPIs.Pay(parseInt(context.total)).then((data) =>
      console.log(data)
    );
  };
  const payInfo = async () => {
    return await PaymentAPIs.PayInfo({
      method_paiment: context.paymentMethod[0],
      cardNum: context.cardNum[0],
      exDate: context.cardDate[0],
      cardName: context.cardName[0],
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

const RenewFrom = ({ displayRenew }) => {
  return (
    <div
      className="modal fade show d-block"
      id="exampleModalCenter"
      tabIndex="-1"
      role="dialog"
    >
      <div
        className="modal-dialog modal-dialog-centered modal-lg"
        role="dialog"
      >
        <div className="modal-content">
          <div className="modal-header">
            <h4 className="modal-title" id="Ckeck Form">
              Renew form
            </h4>
          </div>
          <div className="modal-body">
            <div className="d-flex flex-wrap">
              <div className="form-group m-2 col">
                <label htmlFor="exampleInputDate1">
                  <i className="bi bi-calendar-check"></i>New return date
                </label>
                <input
                  type="datetime-local"
                  className="form-control"
                  id="exampleInputDate1"
                  required
                />
              </div>
            </div>
            <PaimentInfos />

            <p className="px-3 fs-4">
              {" "}
              <b>Total:</b>
              <span> 3000 DZD</span>
            </p>
          </div>
          <div className="modal-footer">
            <button
              onClick={displayRenew}
              style={{
                height: "40px",
                width: "120px",
                color: "white",
                border: "1px solid var(--bg_icon_color)",
                background: "var(--btn_color1)",
                borderRadius: "10px",
              }}
            >
              cancel
            </button>

            <button
              onClick={displayRenew}
              style={{
                height: "40px",
                width: "120px",
                color: "white",
                border: "1px solid var(--bg_icon_color)",
                background: "var(--btn_color1)",
                borderRadius: "10px",
              }}
            >
              submit
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};
