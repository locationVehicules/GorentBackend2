import { useState } from "react";

export const Renter = () => {
  const vehicles = [];
  for (let i = 0; i < 3; i++) {
    vehicles.push("");
    vehicles.push("");
    vehicles.push("");
    vehicles.push("");
  }
  const [displayModify, setDisplayModify] = useState(false);
  const displayModifyPersonnes = () => {
    displayModify ? setDisplayModify(false) : setDisplayModify(true);
  };
  const [displayAdd, setDisplayAdd] = useState(false);
  const displayAddPersonnes = () => {
    displayAdd ? setDisplayAdd(false) : setDisplayAdd(true);
  };
  return (
    <>
      <div className="d-flex justify-content-between flex-column flex-sm-row p-lg-3">
        <h3> Renter </h3>
        <button
          type="button"
          className="btn mx-lg-2 m-1 d-flex justify-content-center align-items-center btns rounded-circle"
          onClick={displayAddPersonnes}
        >
          <i className="bi bi-plus-lg fs-6"></i> Add Renter
        </button>
      </div>
      {displayAdd && (
        <AddNewPersonnes displayAddPersonnes={displayAddPersonnes} />
      )}

      {displayModify && (
        <ModifyPersonnes displayModifyPersonnes={displayModifyPersonnes} />
      )}
      <div className="p-3 d-flex flex-wrap justify-content-center" id="filterd">
        {vehicles.map((v, i) => (
          <button
            key={i}
            onClick={displayModifyPersonnes}
            className="user-card card p-1 m-1 border d-flex flex-sm-row flex-column"
          >
            <ul
              className="info d-flex flex-column m-auto"
              style={{
                maxHeight: "100%",
                maxWidth: "100%",
              }}
            >
              <li className="d-flex flex-wrap">
                <b>ID:</b> 1234567890
              </li>
              <li className="d-flex flex-wrap">
                <b>First Name:</b> BENABDESSADOK
              </li>
              <li className="d-flex flex-wrap">
                <b>Last Name:</b> Safa
              </li>
              <li className="d-flex flex-wrap">
                <b>Birthday:</b> 04/04/2010
              </li>
              <li className="d-flex flex-wrap">
                <b>Phone:</b> 07-12-13-14-15
              </li>
              <li className="d-flex flex-wrap">
                <b>Email:</b> BENABDESSADOK.safa@gmail.com
              </li>
              <li className="d-flex flex-wrap">
                <b>Address:</b>
                city 129 N3 Touggourt, Touggourt
              </li>
            </ul>
          </button>
        ))}
      </div>
    </>
  );
};

const ModifyPersonnes = ({ displayModifyPersonnes }) => {
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
              Delete or Modify Renter Information
            </h4>
          </div>
          <div className="modal-body">
            <div
              className="w-100 py-3 m-auto px-3 px-md-5 d-flex flex-column justify-content-center"
              style={{ background: "white", borderRadius: "30px" }}
            >
              <form className="mt-2">
                <div className="d-flex flex-column flex-md-row">
                  <div className="m-1 w-100">
                    <label
                      htmlFor="first-Name"
                      className="fs-5"
                      style={{ color: "var(--font-color-2)" }}
                    >
                      First Name
                    </label>
                    <input
                      type="text"
                      name="first-name"
                      className="form-control"
                      id="first-Name"
                      placeholder=""
                      required
                      style={{
                        border: 0,
                        borderBottom: "2px solid var(--font-color-2)",
                        height: "40px",
                      }}
                    />
                  </div>
                  <div className="m-1 w-100">
                    <label
                      htmlFor="last-Name"
                      className="fs-5"
                      style={{ color: "var(--font-color-2)" }}
                    >
                      Last Name
                    </label>
                    <input
                      type="text"
                      name="last-name"
                      className="form-control"
                      id="last-Name"
                      placeholder=""
                      required
                      style={{
                        border: 0,
                        borderBottom: "2px solid var(--font-color-2)",
                        height: "40px",
                      }}
                    />
                  </div>
                </div>

                <div className="d-flex flex-column flex-md-row">
                  <div className="m-1 w-100">
                    <label
                      htmlFor="birthday"
                      className="fs-5"
                      style={{ color: "var(--font-color-2)" }}
                    >
                      Date of Birth
                    </label>
                    <input
                      type="date"
                      name="birthday"
                      className="form-control"
                      id="birthday"
                      placeholder=""
                      required
                      style={{
                        border: 0,
                        borderBottom: "2px solid var(--font-color-2)",
                        height: "40px",
                      }}
                    />
                  </div>
                  <div className="m-1 w-100">
                    <label
                      htmlFor="phone-number"
                      className="fs-5"
                      style={{ color: "var(--font-color-2)" }}
                    >
                      Phone Number
                    </label>
                    <input
                      type="tel"
                      name="phone-number"
                      className="form-control"
                      id="phone-number"
                      placeholder=""
                      required
                      style={{
                        border: 0,
                        borderBottom: "2px solid var(--font-color-2)",
                        height: "40px",
                      }}
                    />
                  </div>
                </div>

                <div className="m-1">
                  <label
                    htmlFor="Address"
                    className="fs-5"
                    style={{ color: "var(--font-color-2)" }}
                  >
                    Address
                  </label>
                  <input
                    type="text"
                    name="address"
                    className="form-control"
                    id="address"
                    placeholder=""
                    required
                    style={{
                      border: 0,
                      borderBottom: "2px solid var(--font-color-2)",
                      height: "40px",
                    }}
                  />
                </div>
              </form>
            </div>

            <div className="modal-footer">
              <button
                type="button"
                className="btn"
                data-dismiss="modal"
                onClick={displayModifyPersonnes}
                style={{ background: "var(--bg_icon_color)", color: "black" }}
              >
                Close
              </button>
              <button
                type="button"
                className="btn"
                data-dismiss="modal"
                onClick={displayModifyPersonnes}
                style={{ background: "var(--bg_icon_color)", color: "black" }}
              >
                Delete
              </button>
              <button
                type="button"
                className="btn"
                onClick={displayModifyPersonnes}
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

const AddNewPersonnes = ({ displayAddPersonnes }) => {
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
              Add Renter
            </h4>
          </div>
          <div className="modal-body">
            <div
              className="w-100 py-3 m-auto px-3 px-md-5 d-flex flex-column justify-content-center"
              style={{ background: "white", borderRadius: "30px" }}
            >
              <form className="mt-2">
                <div className="d-flex flex-column flex-md-row">
                  <div className="m-1 w-100">
                    <label
                      htmlFor="first-Name"
                      className="fs-5"
                      style={{ color: "var(--font-color-2)" }}
                    >
                      First Name
                    </label>
                    <input
                      type="text"
                      name="first-name"
                      className="form-control"
                      id="first-Name"
                      placeholder=""
                      required
                      style={{
                        border: 0,
                        borderBottom: "2px solid var(--font-color-2)",
                        height: "40px",
                      }}
                    />
                  </div>
                  <div className="m-1 w-100">
                    <label
                      htmlFor="last-Name"
                      className="fs-5"
                      style={{ color: "var(--font-color-2)" }}
                    >
                      Last Name
                    </label>
                    <input
                      type="text"
                      name="last-name"
                      className="form-control"
                      id="last-Name"
                      placeholder=""
                      required
                      style={{
                        border: 0,
                        borderBottom: "2px solid var(--font-color-2)",
                        height: "40px",
                      }}
                    />
                  </div>
                </div>

                <div className="d-flex flex-column flex-md-row">
                  <div className="m-1 w-100">
                    <label
                      htmlFor="birthday"
                      className="fs-5"
                      style={{ color: "var(--font-color-2)" }}
                    >
                      Date of Birth
                    </label>
                    <input
                      type="date"
                      name="birthday"
                      className="form-control"
                      id="birthday"
                      placeholder=""
                      required
                      style={{
                        border: 0,
                        borderBottom: "2px solid var(--font-color-2)",
                        height: "40px",
                      }}
                    />
                  </div>
                  <div className="m-1 w-100">
                    <label
                      htmlFor="phone-number"
                      className="fs-5"
                      style={{ color: "var(--font-color-2)" }}
                    >
                      Phone Number
                    </label>
                    <input
                      type="tel"
                      name="phone-number"
                      className="form-control"
                      id="phone-number"
                      placeholder=""
                      required
                      style={{
                        border: 0,
                        borderBottom: "2px solid var(--font-color-2)",
                        height: "40px",
                      }}
                    />
                  </div>
                </div>

                <div className="m-1">
                  <label
                    htmlFor="email"
                    className="fs-5"
                    style={{ color: "var(--font-color-2)" }}
                  >
                    Email
                  </label>
                  <input
                    type="email"
                    name="email"
                    className="form-control"
                    id="email"
                    placeholder=""
                    required
                    style={{
                      border: 0,
                      borderBottom: "2px solid var(--font-color-2)",
                      height: "40px",
                    }}
                  />
                </div>
                <div className="m-1">
                  <label
                    htmlFor="password"
                    className="fs-5"
                    style={{ color: "var(--font-color-2)" }}
                  >
                    Password
                  </label>
                  <input
                    type="password"
                    name="password"
                    className="form-control"
                    id="password"
                    placeholder=""
                    required
                    style={{
                      border: 0,
                      borderBottom: "2px solid var(--font-color-2)",
                      height: "40px",
                    }}
                  />
                </div>
                <div className="m-1">
                  <label
                    htmlFor="Address"
                    className="fs-5"
                    style={{ color: "var(--font-color-2)" }}
                  >
                    Address
                  </label>
                  <input
                    type="text"
                    name="address"
                    className="form-control"
                    id="address"
                    placeholder=""
                    required
                    style={{
                      border: 0,
                      borderBottom: "2px solid var(--font-color-2)",
                      height: "40px",
                    }}
                  />
                </div>
                <div className="m-1">
                  <label
                    className="fs-5 mb-1"
                    style={{ color: "var(--font-color-2)" }}
                  >
                    Gender
                  </label>
                  <div
                    className="fs-6 rounded d-flex flex-wrap align-items-center"
                    style={{
                      border: 0,
                      borderBottom: "2px solid var(--font-color-2)",
                    }}
                  >
                    <span className="mx-5 fs-6">
                      <input
                        className="m-2"
                        type="radio"
                        value="Male"
                        name="gender"
                      />
                      Male
                    </span>
                    <span className="mx-5 fs-6">
                      <input
                        className="m-2"
                        type="radio"
                        value="Female"
                        name="gender"
                      />
                      Female
                    </span>
                  </div>
                </div>
              </form>
            </div>

            <div className="modal-footer">
              <button
                type="button"
                className="btn"
                data-dismiss="modal"
                onClick={displayAddPersonnes}
                style={{ background: "var(--bg_icon_color)", color: "black" }}
              >
                Close
              </button>

              <button
                type="button"
                className="btn"
                onClick={displayAddPersonnes}
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
