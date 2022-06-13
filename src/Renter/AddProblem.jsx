import React, { useState } from "react";
import Select from "react-select";
import QrReader from "react-qr-scanner";
import { Main } from "../components/Main";
import ProblemeAPIs from "../GetSetData/useAPIs/ProblemeAPIs";

export const AddProblem = () => {
  const [replay, setReplay] = useState("");
  const [display, setDisplay] = useState(false);

  const problemType = [
    { value: "mechanical", label: "mechanical" },
    { value: "electrical", label: "electrical" },
    { value: "suspension", label: "suspension" },
    { value: "cleaning", label: "cleaning" },
    { value: "body", label: "body" },
    { value: "other", label: "other" },
  ];

  const sendProblem = async (data) => {
    await ProblemeAPIs.addprobleme(data);
    setReplay("");
  };

  const contact = () => {
    setDisplay(true);
  };

  const CancelProblem = () => {
    setDisplay(false);
    setReplay("");
  };

  return (
    <Main title={"Report vehicle problem"}>
      <form className="d-flex flex-column m-auto w-100 my-3">
        <textarea
          className="form-control"
          id="Replay"
          rows="10"
          maxLength="250"
          placeholder="Write here..."
          value={replay}
          onChange={(e) => setReplay(e.target.value)}
        ></textarea>
        <div className="d-flex m-2 p-3 ">
          <label
            htmlFor="state"
            className="fs-5 mx-3"
            style={{ color: "var(--btn_color3)" }}
          >
            Type
          </label>

          <Select
            className="vehicle-state w-100"
            classNamePrefix="select"
            defaultValue={problemType[0]}
            name="vehicle-state"
            options={problemType}
          />
        </div>
        <div className="btn d-flex justify-content-end">
          <button
            type="button"
            className="btn d-flex justify-content-center align-items-center"
            data-dismiss="modal"
            onClick={() => contact()}
            style={{
              background: "var(--btn_color1)",
              color: "white",
              width: "100px",
            }}
          >
            send
          </button>
        </div>
      </form>
      {display && (
        <Confirmation CancelProblem={CancelProblem} sendProblem={sendProblem} />
      )}
    </Main>
  );
};

const Confirmation = ({ CancelProblem, sendProblem }) => {
  const [result, setResult] = useState();

  const sendData = (data) => {
    console.log(data);
    sendProblem();
    CancelProblem();
  };
  const handleError = (error) => {
    console.error(error);
  };

  return (
    <div
      className="modal fade show d-block"
      id="exampleModalCenter"
      tabIndex="-1"
      role="dialog"
    >
      <div
        className="modal-dialog modal-dialog-centered modal-sm"
        role="dialog"
      >
        <div className="modal-content">
          <div className="modal-header">
            <h3 className="d-flex px-3 justify-content-center fs-5">
              Scanne QR code in contact
            </h3>
          </div>
          <div className="modal-body">
            <div className="qr-scanner w-100 h-100 m-auto my-3">
              <QrReader
                style={{
                  width: "100%",
                  height: "100%",
                  border: "3px solid var(--btn_color1)",
                  borderRadius: "10px",
                }}
                delay={100}
                onError={handleError}
                onScan={(result) => result && sendData(result.text)}
              />
            </div>
          </div>
          <div className="modal-footer">
            <button
              type="button"
              className="btn "
              data-dismiss="modal"
              onClick={() => CancelProblem()}
              style={{
                width: "100px",
                color: "white",
                border: "1px solid var(--bg_icon_color)",
                background: "var(--title_color)",
                borderRadius: "5px",
              }}
            >
              Cancel
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};
