import { useState } from "react";

export const Enterprise = () => {
  const vehicles = [];
  for (let i = 0; i < 3; i++) {
    vehicles.push("");
    vehicles.push("");
    vehicles.push("");
    vehicles.push("");
  }
  const [displayModify, setDisplayModify] = useState(false);
  const displayModifyEnterprise = () => {
    displayModify ? setDisplayModify(false) : setDisplayModify(true);
  };
  const [displayAdd, setDisplayAdd] = useState(false);
  const displayAddEnterprise = () => {
    displayAdd ? setDisplayAdd(false) : setDisplayAdd(true);
  };
  return (
    <>
      <div className="d-flex justify-content-between flex-column flex-sm-row p-lg-3">
        <h3> Enterprises</h3>
        <button
          type="button"
          className="btn mx-lg-2 m-1 d-flex justify-content-center align-items-center btns rounded-circle"
          onClick={displayAddEnterprise}
        >
          <i className="bi bi-plus-lg fs-6"></i> Enterprise
        </button>
      </div>
      {displayAdd && (
        <AddNewEnterprise displayAddEnterprise={displayAddEnterprise} />
      )}

      {displayModify && (
        <ModifyEnterprise displayModifyEnterprise={displayModifyEnterprise} />
      )}
      <div className="p-3 d-flex flex-wrap justify-content-center" id="filterd">
        {vehicles.map((v, i) => (
          <button
            key={i}
            onClick={displayModifyEnterprise}
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
                <b>Name:</b>
                GoRent Agency
              </li>
              <li className="d-flex flex-wrap">
                <b>Commercial Register Number:</b>
                1234567890E
              </li>
              <li className="d-flex flex-wrap">
                <b>Email:</b>
                BENABDESSADOK.safa@gmail.com
              </li>
              <li className="d-flex flex-wrap">
                <b>Address:</b>
                city 129 N3 Touggourt, Touggourt
              </li>
              <li className="d-flex flex-wrap">
                <b>Phone:</b>
                07-12-13-14-15
              </li>
            </ul>
          </button>
        ))}
      </div>
    </>
  );
};

const ModifyEnterprise = ({ displayModifyEnterprise }) => {
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
              Delete or Modify Enterprise Information
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
                <div className="m-1">
                  <label
                    htmlFor="enterprise-name"
                    className="fs-5"
                    style={{ color: "var(--font-color-2)" }}
                  >
                    Enterprise Name
                  </label>
                  <input
                    type="text"
                    name="enterprise-name"
                    className="form-control"
                    id="enterprise-name"
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
                    htmlFor="com-reg-num"
                    className="fs-5"
                    style={{ color: "var(--font-color-2)" }}
                  >
                    Commercial Register Number
                  </label>
                  <input
                    type="text"
                    name="com-reg-num"
                    className="form-control"
                    id="com-reg-num"
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
                onClick={displayModifyEnterprise}
                style={{ background: "var(--bg_icon_color)", color: "black" }}
              >
                Close
              </button>
              <button
                type="button"
                className="btn"
                data-dismiss="modal"
                onClick={displayModifyEnterprise}
                style={{ background: "var(--bg_icon_color)", color: "black" }}
              >
                Delete
              </button>
              <button
                type="button"
                className="btn"
                onClick={displayModifyEnterprise}
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

const AddNewEnterprise = ({ displayAddEnterprise }) => {
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
              Add Enterprise
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
                    htmlFor="enterprise-name"
                    className="fs-5"
                    style={{ color: "var(--font-color-2)" }}
                  >
                    Enterprise Name
                  </label>
                  <input
                    type="text"
                    name="enterprise-name"
                    className="form-control"
                    id="enterprise-name"
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
                    htmlFor="com-reg-num"
                    className="fs-5"
                    style={{ color: "var(--font-color-2)" }}
                  >
                    Commercial Register Number
                  </label>
                  <input
                    type="text"
                    name="com-reg-num"
                    className="form-control"
                    id="com-reg-num"
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
                onClick={displayAddEnterprise}
                style={{ background: "var(--bg_icon_color)", color: "black" }}
              >
                Close
              </button>

              <button
                type="button"
                className="btn"
                onClick={displayAddEnterprise}
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
