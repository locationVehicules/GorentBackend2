import React, { useState } from "react";
import Select from "react-select";
import { Main } from "../components/Main";

export const IdentifyDriver = () => {
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
  const [haveAccount, setHaveAccount] = useState(false);
  const dispalyHaveAccount = () => {
    !haveAccount ? setHaveAccount(true) : setHaveAccount(false);
  };
  return (
    <Main title={"Identify Driver"}>
      <div className="container">
        <div
          className="w-100 m-auto px-3 py-3 px-md-5 d-flex flex-column justify-content-center"
          style={{ background: "white", borderRadius: "10px" }}
        >
          <div className="m-1 fs-5">
            <input
              className="form-check-input fs-5 mx-2"
              type="checkbox"
              onClick={dispalyHaveAccount}
            />
            <span className="mx-2" style={{ color: "var(--font-color-2)" }}>
              Already have an account?
            </span>
          </div>
          { !haveAccount ?
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
            <div className="m-1">
              <label
                htmlFor="email-Address"
                className="fs-5"
                style={{ color: "var(--font-color-2)" }}
              >
                Email Address
              </label>
              <input
                type="email"
                name="email-Address"
                className="form-control"
                id="email-Address"
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
                htmlFor="password "
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
            </form>
            : <form
              className="needs-validation d-flex flex-md-row flex-column"
              noValidate
              >
                <div className="m-2 w-100">
                  <label htmlFor="id">Driver ID</label>
                  <input
                    type="text"
                    className="form-control"
                    id="id"
                    placeholder="Driver ID"
                    required
                    />
                </div>
              </form> }
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
        </div>
        </div>
    </Main>
  );
};

export const ImgUploadComponent = (props) => {
  const hiddenFileInput = React.useRef(null);
  const [image, setImage] = useState(null);
  const handleClick = () => {
    hiddenFileInput.current.click();
  };
  const setUploadedImage = (event) => {
    setImage(URL.createObjectURL(event.target.files[0]));
    console.log(URL.createObjectURL(event.target.files[0]));
  };

  return (
    <>
      <button
        onClick={handleClick}
        className="btn"
        style={{
          width: "100%",
          height: "100%",
        }}
      >
        {image !== null ? (
          <div
            style={{
              width: "100%",
              height: "100%",
            }}
          >
            <img
              src={image}
              alt=""
              style={{
                width: "100%",
                height: "100%",
              }}
            />
          </div>
        ) : (
          "Upload an image"
        )}
      </button>
      <input
        type="file"
        accept="image/*"
        ref={hiddenFileInput}
        onChange={setUploadedImage}
        style={{ display: "none" }}
      />
    </>
  );
};
 