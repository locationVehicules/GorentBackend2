import React, { useState } from "react";
import { Main } from "../components/Main";
import { Link } from "react-router-dom";
import { Confirmation } from "../Owner/BlackList";

import { Document, Page, pdfjs } from "react-pdf/dist/esm/entry.webpack";
pdfjs.GlobalWorkerOptions.workerSrc = `//cdnjs.cloudflare.com/ajax/libs/pdf.js/${pdfjs.version}/pdf.worker.js`;

export const Contract = ({ user }) => {
  const contartPath = "GetSetData/1234567890_Contract.pdf";

  const withQRcode = false;
  const [numPages, setNumPages] = useState(null);

  const onDocumentLoadSucces = ({ numPages }) => {
    setNumPages(numPages);
  };
  const [display, setDisplay] = useState(false);
  const [reservation, setReservation] = useState();

  const displayConfirmation = () => {
    display ? setDisplay(false) : setDisplay(true);
  };
  const confirmation = (e) => {
    displayConfirmation();
    !reservation && setReservation(e);
  };

  const yesFunction = async () => {
    console.log(`${reservation} validated`);
  };
  return (
    <Main title={"Rentals Management"}>
      <div className="container">
        <Link to={`/${user}/${user}/Rentals-management`}>
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
        <div className="d-flex flex-column align-items-center mx-lg-4 my-lg-3 mx-0 my-0 px-lg-5 px-3 py-3">
          <Document
            className="d-flex flex-column align-items-center"
            file={require(`../${contartPath}`)}
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
        </div>
        <div className="d-flex justify-content-end flex-column flex-sm-row p-lg-3">
          {!withQRcode ? (
            <div className="d-flex">
              <button
                type="button"
                className="btn mx-lg-2 m-1 d-flex justify-content-center align-items-center refuse-btn"
                onClick={confirmation}
              >
                <i className="bi bi-x-lg fs-6"></i>Refuse
              </button>
              <button
                type="button"
                className="btn mx-lg-2 m-1 d-flex justify-content-center align-items-center accept-btn"
                onClick={confirmation}
              >
                <i className="bi bi-check2-circle fs-6"></i>Accept
              </button>
            </div>
          ) : (
            <button
              type="button"
              className="btn mx-lg-2 m-1 d-flex justify-content-center align-items-center print-btn"
            >
              <i className="bi bi-printer fs-6"></i>Print
            </button>
          )}
        </div>
      </div>

      {display && (
        <Confirmation
          displayConfirmation={displayConfirmation}
          yesFunction={yesFunction}
          confirmationText={"Are you sure ?"}
        />
      )}
    </Main>
  );
};
