import React, { useState, useEffect } from "react";
import Select from "react-select";
import { Main } from "../components/Main";
import { ImgUploadComponent } from "../publicPages/LogPages";

export const Settings = () => {
  const type = "Renter";
  const permitCategory = [
    { value: "A1", label: "A1" },
    { value: "A2", label: "A2" },
    { value: "B", label: "B" },
    { value: "C1", label: "C1" },
    { value: "C2", label: "C2" },
    { value: "D", label: "D" },
    { value: "E", label: "E" },
    { value: "F", label: "F" },
  ];
  const [driver, setDriver] = useState(false);
  const [alreadyDriver, setalreadyDriver] = useState(false);

  useEffect(() => {
    if (type === "Driver") {
      setDriver(true);
      setalreadyDriver(true);
    }
  }, [type]);

  const displayGetEntrepriseInfo = (e) => {
    setDriver(false);
  };
  const isDriver = (e) => {
    if (!driver) {
      setDriver(true);
    } else {
      setDriver(false);
    }
  };
  return (
    <Main title={"Settings"}>
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

          {type === "Entreprise" ? (
            <>
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
            </>
          ) : (
            <>
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
              {!alreadyDriver && (
                <div className="m-1 fs-5">
                  <input
                    className="form-check-input fs-5 mx-2"
                    type="checkbox"
                    onClick={isDriver}
                  />
                  <small>Have you become a driver?</small>
                </div>
              )}
            </>
          )}
          {driver && (
            <>
              <div className="d-flex flex-column flex-md-row">
                <div className="m-1 w-100">
                  <label
                    htmlFor="num-permit"
                    className="fs-5"
                    style={{ color: "var(--font-color-2)" }}
                  >
                    Driving License Number
                  </label>
                  <input
                    type="text"
                    name="num-permit"
                    className="form-control"
                    id="num-permit"
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
                    htmlFor="num-permit"
                    className="fs-5"
                    style={{ color: "var(--font-color-2)" }}
                  >
                    Driving License Category
                  </label>
                  <Select
                    className="permit-category"
                    classNamePrefix="select"
                    defaultValue={permitCategory[0]}
                    name="permit-category"
                    options={permitCategory}
                  />
                </div>
              </div>

              <div className="d-flex flex-column flex-md-row">
                <div className="m-1 w-100">
                  <label
                    htmlFor="photo-permit"
                    className="fs-5"
                    style={{ color: "var(--font-color-2)" }}
                  >
                    Driving License Photo
                  </label>
                  <div className="m-auto mt-1 upload-img">
                    <ImgUploadComponent />
                  </div>
                </div>
                <div className="m-1 w-100">
                  <label
                    htmlFor="photo-permit"
                    className="fs-5"
                    style={{ color: "var(--font-color-2)" }}
                  >
                    Your Photo
                  </label>
                  <div className="m-auto mt-1 upload-img">
                    <ImgUploadComponent />
                  </div>
                </div>
              </div>
            </>
          )}
          <div className="d-flex mx-4 my-2 justify-content-end align-items-end">
            <button
              type="submit"
              className="btn fs-4 my-3 d-flex justify-content-center align-items-center"
              style={{
                width: "150px",
                height: 40,
                color: "white",
                background: "var(--pr1)",
              }}
            >
              Confirm
            </button>
          </div>
        </form>
      </div>
    </Main>
  );
};
