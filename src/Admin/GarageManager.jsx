import { useState } from "react";

export const GarageManager = () => {
  const vehicles = [];
  for (let i = 0; i < 3; i++) {
    vehicles.push("");
    vehicles.push("");
    vehicles.push("");
    vehicles.push("");
  }
  const [displayModify, setDisplayModify] = useState(false);
  const displayModifyGarageManager = () => {
    displayModify ? setDisplayModify(false) : setDisplayModify(true);
  };
  const [displayAdd, setDisplayAdd] = useState(false);
  const displayAddGarageManager = () => {
    displayAdd ? setDisplayAdd(false) : setDisplayAdd(true);
  };
  return (
    <>
      <div className="d-flex justify-content-between flex-column flex-sm-row p-lg-3">
        <h3> Garage Manager </h3>
        <button
          type="button"
          className="btn mx-lg-2 m-1 d-flex justify-content-center align-items-center btns rounded-circle"
          onClick={displayAddGarageManager}
        >
          <i className="bi bi-plus-lg fs-6"></i>Add Garage Manager
        </button>
      </div>
      {displayAdd && (
        <AddNewGarageManager
          displayAddGarageManager={displayAddGarageManager}
        />
      )}

      {displayModify && (
        <ModifyGarageManager
          displayModifyGarageManager={displayModifyGarageManager}
        />
      )}
      <div className="p-3 d-flex flex-wrap justify-content-center" id="filterd">
        {vehicles.map((v, i) => (
          <button
            key={i}
            onClick={displayModifyGarageManager}
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
                <b>Grade:</b> Supervisor
              </li>
              <li className="d-flex flex-wrap">
                <b>Parking:</b>
                Touggourt
              </li>
            </ul>
          </button>
        ))}
      </div>
    </>
  );
};

const ModifyGarageManager = ({ displayModifyGarageManager }) => {
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
              Delete or Modify Garage Manager information
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
                <div className="d-flex flex-column flex-md-row">
                  <div className="m-1 w-100">
                    <label
                      htmlFor="grade"
                      className="fs-5"
                      style={{ color: "var(--font-color-2)" }}
                    >
                      Grade
                    </label>
                    <input
                      type="text"
                      name="grade"
                      className="form-control"
                      id="grade"
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
                      htmlFor="salary"
                      className="fs-5"
                      style={{ color: "var(--font-color-2)" }}
                    >
                      salary
                    </label>
                    <input
                      type="number"
                      name="salary"
                      className="form-control"
                      id="salary"
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
                      htmlFor="agency-location"
                      className="fs-5"
                      style={{ color: "var(--font-color-2)" }}
                    >
                      Agency Location
                    </label>
                    <input
                      type="text"
                      name="agency-location"
                      className="form-control"
                      id="grade"
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
                      htmlFor="parking"
                      className="fs-5"
                      style={{ color: "var(--font-color-2)" }}
                    >
                      Parking
                    </label>
                    <input
                      type="text"
                      name="parking"
                      className="form-control"
                      id="parking"
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
              </form>
            </div>

            <div className="modal-footer">
              <button
                type="button"
                className="btn"
                data-dismiss="modal"
                onClick={displayModifyGarageManager}
                style={{ background: "var(--bg_icon_color)", color: "black" }}
              >
                Close
              </button>
              <button
                type="button"
                className="btn"
                data-dismiss="modal"
                onClick={displayModifyGarageManager}
                style={{ background: "var(--bg_icon_color)", color: "black" }}
              >
                Delete
              </button>
              <button
                type="button"
                className="btn"
                onClick={displayModifyGarageManager}
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

const AddNewGarageManager = ({ displayAddGarageManager }) => {
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
              Add Garage Manager
            </h4>
          </div>
          <div className="modal-body">
            <div
              className="w-100 py-3 m-auto px-3 px-md-5 d-flex flex-column justify-content-center"
              style={{ background: "white", borderRadius: "30px" }}
            >
              <form className="mt-2">
                <div className="m-1">
                  <label
                    htmlFor="id"
                    className="fs-5"
                    style={{ color: "var(--font-color-2)" }}
                  >
                    ID
                  </label>
                  <input
                    type="text"
                    name="id"
                    className="form-control"
                    id="id"
                    placeholder=""
                    required
                    style={{
                      border: 0,
                      borderBottom: "2px solid var(--font-color-2)",
                      height: "40px",
                    }}
                  />
                </div>
                <div className="d-flex flex-column flex-md-row">
                  <div className="m-1 w-100">
                    <label
                      htmlFor="grade"
                      className="fs-5"
                      style={{ color: "var(--font-color-2)" }}
                    >
                      Grade
                    </label>
                    <input
                      type="text"
                      name="grade"
                      className="form-control"
                      id="grade"
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
                      htmlFor="salary"
                      className="fs-5"
                      style={{ color: "var(--font-color-2)" }}
                    >
                      salary
                    </label>
                    <input
                      type="number"
                      name="salary"
                      className="form-control"
                      id="salary"
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
                      htmlFor="agency-location"
                      className="fs-5"
                      style={{ color: "var(--font-color-2)" }}
                    >
                      Agency Location
                    </label>
                    <input
                      type="text"
                      name="agency-location"
                      className="form-control"
                      id="grade"
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
                      htmlFor="parking"
                      className="fs-5"
                      style={{ color: "var(--font-color-2)" }}
                    >
                      Parking
                    </label>
                    <input
                      type="text"
                      name="parking"
                      className="form-control"
                      id="parking"
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
              </form>
            </div>

            <div className="modal-footer">
              <button
                type="button"
                className="btn"
                data-dismiss="modal"
                onClick={displayAddGarageManager}
                style={{ background: "var(--bg_icon_color)", color: "black" }}
              >
                Close
              </button>

              <button
                type="button"
                className="btn"
                onClick={displayAddGarageManager}
                style={{ background: "var(--btn_color1)", color: "white" }}
              >
                Add
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};
