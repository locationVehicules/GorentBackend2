import Select from "react-select";
import React, { useState, useEffect } from "react";
import QrReader from "react-qr-scanner";

const Check = ({ displayCheckFrom }) => {
  const vehicleState = [
    { value: "rented", label: "Rented" },
    { value: "available", label: "Available" },
    { value: "under", label: "Under" },
  ];
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
              Ckeck Form
            </h4>
          </div>
          <div className="modal-body">
            <h5
              style={{
                border: 0,
                borderBottom: "3px solid var(--btn_color1_1)",
              }}
            >
              Renter and Driver
            </h5>
            <div className="driver-info d-flex flex-md-row flex-column mb-2 p-1">
              <div className="w-100">
                <div>
                  <label
                    htmlFor="renter-name"
                    className="fs-6"
                    style={{ color: "var(--font-color-3)" }}
                  >
                    Renter Name
                  </label>
                  <p
                    className="form-control fs-6"
                    id="renter-name"
                    style={{
                      border: 0,
                      borderBottom: "2px solid var(--font-color-2)",
                    }}
                  >
                    Safa Benabdessadok
                  </p>
                </div>
                <div>
                  <label
                    htmlFor="dirver-name"
                    className="fs-6"
                    style={{ color: "var(--font-color-3)" }}
                  >
                    Dirver Name
                  </label>
                  <p
                    className="form-control fs-6"
                    id="dirver-name"
                    style={{
                      border: 0,
                      borderBottom: "2px solid var(--font-color-2)",
                    }}
                  >
                    Safa Benabdessadok
                  </p>
                </div>
              </div>
              <div className="w-100 d-flex flex-column fs-6 ">
                <label
                  htmlFor="photo-permit"
                  className="fs-6"
                  style={{ color: "var(--font-color-3)" }}
                >
                  Driver Photo
                </label>
                <div
                  className="img-containe d-flex"
                  style={{
                    maxHeight: "100%",
                    maxWidth: "50%",
                  }}
                >
                  <img className=" p-2" src={""} alt={`${"Driver"}_photo`} />
                </div>
              </div>
            </div>
            <h5
              style={{
                border: 0,
                borderBottom: "3px solid var(--btn_color1_1)",
              }}
            >
              Vehicle and Tools
            </h5>
            <div className="vehicle-info d-flex flex-md-row flex-column p-1 mb-2 ">
              <div className="w-100">
                <div className="d-flex flex-md-row flex-column">
                  <div className="w-100 m-1 d-flex flex-column fs-6">
                    <div>
                      <label
                        htmlFor="renter-name"
                        className="fs-6"
                        style={{ color: "var(--font-color-3)" }}
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
                        123456 124 25
                      </p>
                    </div>
                    <div>
                      <label
                        htmlFor="renter-name"
                        className="fs-6"
                        style={{ color: "var(--font-color-3)" }}
                      >
                        Model and Color
                      </label>
                      <p
                        className="form-control fs-6"
                        id="renter-name"
                        style={{
                          border: 0,
                          borderBottom: "2px solid var(--font-color-2)",
                        }}
                      >
                        Peugeot 3008 | white
                      </p>
                    </div>
                    <div className="d-flex justify-content-center">
                      <label
                        htmlFor="renter-name"
                        className="fs-6 m-2"
                        style={{ color: "var(--font-color-3)" }}
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
                        A-1
                      </p>
                    </div>
                  </div>
                  <div className="w-100 d-flex flex-column fs-6 ">
                    <label
                      className="fs-6"
                      style={{ color: "var(--font-color-3)" }}
                    >
                      Vehicle Photo
                    </label>
                    <div
                      className="img-containe d-flex border"
                      style={{
                        maxHeight: "80%",
                        maxWidth: "80%",
                      }}
                    >
                      <img
                        className=" p-2"
                        src={`https://cdn.imagin.studio/getImage?customer=img&${""}
                          .replaceAll("%3D", "=")
                          .replace(
                            "%26",
                            "&"
                          )}&angle=23&width=2600&zoomType=fullscreen`}
                        alt={`${"selectedVehicle.name"}_photo`}
                      />
                    </div>
                  </div>
                </div>
                <div>
                  <label
                    htmlFor="renter-name"
                    className="fs-6 m-2"
                    style={{ color: "var(--font-color-3)" }}
                  >
                    Tools
                  </label>
                  <p
                    className="form-control fs-6"
                    id="renter-name"
                    style={{
                      width: "50%",
                      border: 0,
                      borderBottom: "2px solid var(--font-color-2)",
                    }}
                  >
                    A-1
                  </p>
                </div>
              </div>
            </div>
            <div className="modal-footer">
              <button
                type="button"
                className="btn"
                data-dismiss="modal"
                onClick={displayCheckFrom}
                style={{ background: "var(--bg_icon_color)", color: "black" }}
              >
                Close
              </button>
              <button
                type="button"
                className="btn"
                onClick={displayCheckFrom}
                style={{ background: "var(--btn_color1)", color: "white" }}
              >
                Save changes
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export const CheckQRscanner = () => {
  const [delay, setDelay] = useState(100);
  const [result, setResult] = useState();
  const [display, setDisplay] = useState(true);

  useEffect(() => {
    result !== undefined && setDisplay(true);
  }, [result, display]);

  const handleError = (error) => {
    console.error(error);
  };

  const displayCheckFrom = () => {
    setDelay(100);
    setDisplay(false);
  };
  return (
    <>
      <QrReader
        style={{
          width: "100%",
          height: "100%",
          border: "3px solid var(--btn_color1)",
          borderRadius: "10px",
        }}
        delay={delay}
        onError={handleError}
        onScan={(result) => setResult(result?.text)}
      />
      {display && <Check displayCheckFrom={displayCheckFrom} />}
    </>
  );
};
