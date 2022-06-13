import React, { Component, useState } from "react";
import { Link } from "react-router-dom";
import Select from "react-select";
import AdministrationAPIs from "../GetSetData/useAPIs/AdministrationAPIs";
import "../css/global.css";

export class Login extends Component {
  constructor(props) {
    super(props);
    document.body.style.background = "var(--btn_color1)";
    this.state = {
      passwordType: "password",
      navigate=false,
      eyeClass: "bi bi-eye-slash",
      username:"",
      password:""
    };
  }

  submit = () => {
  this.login({ username: this.state.username,
  password:this.state.password})
  }
  
  login = async (data) => {
    await AdministrationAPIs.userLogin(data).then(d => d )
  }
  TogglePassword = () => {
    this.state.passwordType === "password"
      ? this.setState({ passwordType: "text", eyeClass: "bi bi-eye" })
      : this.setState({
          passwordType: "password",
          eyeClass: "bi bi-eye-slash",
        });
  };

  render() {
    return (
      <div className="d-flex">
          {navigate && <Navigate to="Renter/" replace={true} />}
        <div
          className="side-div p-5 p-2 d-sm-flex flex-column d-none justify-content-center"
          style={{
            width: "40%",
            height: "100vh",
            color: "white ",
            background: "var(--btn_color1)",
          }}
        >
          <h1
            className="text d-flex"
            style={{
              color: "white ",
              lineHeight: "2",
              fontWeight: "bold",
              background: "var(--btn_color1)",
              boxShadow: "none",
            }}
          >
            To keep your reservation
          </h1>
          <div
            className="img-container p-2 d-none d-md-block"
            style={{
              bottom: "100px",
              height: "250px",
              width: "35vw",
            }}
          >
            <img
              src={require("../img/vehicles/car/1.png")}
              style={{ width: "100%", height: "100%" }}
              alt="car-img"
            />
          </div>
        </div>

        <div className="get-log-info p-5 d-flex flex-column justify-content-center">
          <h1 className="title p-3" style={{ fontWeight: "bold" }}>
            LOG IN
          </h1>
          <div className="using-socail-meadia d-lg-flex justify-content-center align-items-center">
            <div className="col-lg-5 mx-sm-2 my-3">
              <button
                style={{
                  height: "40px",
                  border: "1px solid #eaeaea",
                  borderRadius: "10px",
                  background: "White",
                }}
                className="d-flex w-100 p-1 justify-content-center align-items-center"
              >
                <i
                  className="bi bi-google fs-3"
                  style={{
                    color: "#db4437",
                  }}
                ></i>
                <span className="mx-sm-2 mx-1">Log in with Google</span>
              </button>
            </div>
          </div>

          <p
            className="w-100 m-2 p-2 d-flex justify-content-center align-items-center"
            style={{ color: "var(--bg_icon_color)" }}
          >
            - OR -
          </p>

          <div className="mt-3">
            <div className="m-1">
              <label
                htmlFor="user-ID"
                className="fs-5"
                style={{ color: "var(--font-color-2)" }}
              >
                User Name
              </label>
              <input
                type="text"
                name="user-ID"
                className="form-control"
                id="user-ID"
                placeholder=""
                
                value={this.state.username}
                onChange={(e)=> this.setState({ username : e.target.value})}
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
              <span
                className="d-flex rounded-bottom"
                style={{
                  border: 0,
                  borderBottom: "2px solid var(--font-color-2)",
                  height: "40px",
                }}
              >
                <input
                  type={this.state.passwordType}
                  name="password"
                  className="form-control"
                  id="password"
                  placeholder=""
                  value={this.state.password}
                  onChange={(e)=> this.setState({ password : e.target.value})}
                  required
                  style={{
                    border: 0,
                    borderBottom: "2px solid var(--font-color-2)",
                    height: "40px",
                  }}
                />
                <i
                  className={`${this.state.eyeClass} fs-4 px-3`}
                  id="togglePassword"
                  style={{ color: "var(--font-color-2)" }}
                  onClick={this.TogglePassword}
                ></i>
              </span>
            </div>

            <button
              type="submit"
              onClick={()=> this.submit()}
              className="btn fs-4 mx-auto w-75 my-4 d-flex justify-content-center align-items-center"
              style={{
                borderRadius: "10px",
                height: 40,
                color: "white",
                background: "var(--pr1)",
              }}
            >
              Log in
            </button>
          </div>
          <div className="m-sm-3 m-2">
            <span className="mx-2" style={{ color: "var(--font-color-2)" }}>
              Don't have an account?
            </span>
            <Link to={"/SignUp"} style={{ color: "#04DDDD" }}>
              Sign up
            </Link>
          </div>
        </div>
      </div>
    );
  }
}

export class SignUp extends Component {
  constructor(props) {
    super(props);
    document.body.style.background = "var(--btn_color1)";
  }
  render() {
    return (
      <div className="d-flex ">
        <div
          className="side-div p-5 p-2 d-sm-flex flex-column d-none justify-content-center"
          style={{
            width: "40%",
            height: "100vh",
            color: "white ",
            background: "var(--btn_color1)",
          }}
        >
          <h1
            className="text d-flex"
            style={{
              color: "white ",
              lineHeight: "2",
              fontWeight: "bold",
              background: "var(--btn_color1)",
              boxShadow: "none",
            }}
          >
            To keep your reservation
          </h1>
          <div
            className="img-container p-2 d-none d-md-block"
            style={{
              bottom: "100px",
              height: "250px",
              width: "35vw",
            }}
          >
            <img
              src={require("../img/vehicles/car/1.png")}
              style={{ width: "100%", height: "100%" }}
              alt="car-img"
            />
          </div>
        </div>

        <div className="get-log-info py-3 px-5 d-flex flex-column justify-content-center">
          <h1 className="title py-1 px-3" style={{ fontWeight: "bold" }}>
            Create Account
          </h1>
          <div className="using-socail-meadia d-lg-flex justify-content-center align-items-center">
            <div className="col-lg-5 mx-sm-2 my-3">
              <Link
                to={"/GetRenterInfos"}
                style={{
                  height: "40px",
                  border: "1px solid #eaeaea",
                  borderRadius: "10px",
                  background: "White",
                }}
                className="d-flex w-100 p-1 justify-content-center align-items-center"
              >
                <i
                  className="bi bi-google fs-3"
                  style={{
                    color: "#db4437",
                  }}
                ></i>
                <span className="mx-sm-2 mx-1">Log in with Google</span>
              </Link>
            </div>
            <div className="col-lg-5 mx-sm-2 my-3">
              <Link
                to={"/GetRenterInfos"}
                style={{
                  height: "40px",
                  border: "1px solid #eaeaea",
                  borderRadius: "10px",
                  background: "White",
                }}
                className="d-flex w-100 p-1 justify-content-center align-items-center"
              >
                <i
                  className="bi bi-facebook fs-3"
                  style={{
                    color: "#3b5998",
                  }}
                ></i>
                <span className="mx-sm-2 mx-1">Log in with Facebook</span>
              </Link>
            </div>
          </div>

          <p
            className="w-100 m-2 d-flex justify-content-center align-items-center"
            style={{ color: "var(--bg_icon_color)" }}
          >
            - OR -
          </p>

          <form className="mt-2">
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
            <div className="m-1">
              <label
                htmlFor="confirm-confirm-password "
                className="fs-5"
                style={{ color: "var(--font-color-2)" }}
              >
                Confirm Password
              </label>
              <input
                type="password"
                name="confirm-password"
                className="form-control"
                id="confirm-password"
                placeholder=""
                required
                style={{
                  border: 0,
                  borderBottom: "2px solid var(--font-color-2)",
                  height: "40px",
                }}
              />
            </div>

            <Link
              to={"/GetRenterInfos"}
              type="submit"
              className="btn fs-4 mx-auto w-75 my-3 d-flex justify-content-center align-items-center"
              style={{
                borderRadius: "10px",
                height: 40,
                color: "white",
                background: "var(--pr1)",
              }}
            >
              Create Account
            </Link>
          </form>
          <div className="m-sm-2 ">
            <span className="mx-2" style={{ color: "var(--font-color-2)" }}>
              Already have an account?
            </span>
            <Link to={"/LogIn"} style={{ color: "#04DDDD" }}>
              Log in
            </Link>
          </div>
        </div>
      </div>
    );
  }
}

export class GetRenterInfos extends Component {
  constructor(props) {
    super(props);
    document.body.style.background = "var(--btn_color1)";
  }
  state = {
    gender: "",
    driver: false,
  };
  permitCategory = [
    { value: "A", label: "A" },
    { value: "A1", label: "A1" },
    { value: "B", label: "B" },
    { value: "C", label: "C" },
    { value: "C1", label: "C1" },
    { value: "D", label: "D" },
    { value: "BE", label: "BE" },
    { value: "CE", label: "CE" },
    { value: "C1E", label: "C1E" },
    { value: "DE", label: "DE" },
    { value: "F", label: "F" },
  ];
  displayGetEntrepriseInfo = (e) => {
    this.setState({
      gender: e.target.value,
      driver: false,
    });
  };
  isDriver = (e) => {
    !this.state.driver
      ? this.setState({
          gender: e.target.gender,
          driver: true,
        })
      : this.setState({
          gender: e.target.gender,
          driver: false,
        });
  };
  render() {
    return (
      <div className="container py-5">
        <div
          className="w-100 py-3 m-auto px-3 px-md-5 d-flex flex-column justify-content-center"
          style={{ background: "white", borderRadius: "30px" }}
        >
          <h1 className="title py-1 px-3" style={{ fontWeight: "bold" }}>
            Your information
          </h1>

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
                    onChange={this.displayGetEntrepriseInfo}
                  />
                  Male
                </span>
                <span className="mx-5 fs-6">
                  <input
                    className="m-2"
                    type="radio"
                    value="Female"
                    name="gender"
                    onChange={this.displayGetEntrepriseInfo}
                  />
                  Female
                </span>
                <span className="mx-5 fs-6">
                  <input
                    className="m-2"
                    type="radio"
                    value="Entreprise"
                    name="gender"
                    onChange={this.displayGetEntrepriseInfo}
                  />
                  Entreprise
                </span>
              </div>
            </div>
            {this.state.gender === "Entreprise" ? (
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
              <div className="m-1 fs-5">
                <input
                  className="form-check-input fs-5 mx-2"
                  type="checkbox"
                  onClick={this.isDriver}
                />
                <small>Are you driver?</small>
              </div>
            )}
            {this.state.driver && (
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
                      defaultValue={this.permitCategory[0]}
                      name="permit-category"
                      options={this.permitCategory}
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
      </div>
    );
  }
}

export const ImgUploadComponent = (props) => {
  const hiddenFileInput = React.useRef(null);
  const [image, setImage] = useState(null);
  const handleClick = () => {
    hiddenFileInput.current.click();
  };
  const setUploadedImage = (event) => {
    setImage(URL.createObjectURL(event.target.files[0]));
    console.log(event.target.files[0]);
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
