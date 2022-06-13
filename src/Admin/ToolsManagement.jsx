import { useState, useEffect } from "react";
import { Main } from "../components/Main";
import { ScrollTop } from "../components/ScrollTop";
import Select from "react-select";
import CarsAPIs from "../GetSetData/useAPIs/CarsAPIs";
import ParkingAPIs from "../GetSetData/useAPIs/ParkingAPIs";
import "../css/gerer_vehicules_style.css";

export const ToolsManagement = () => {
  const [tools, setTools] = useState(null);
  const [parkings, setParkings] = useState(null);
  const [selectedTool, setSelectedTool] = useState(null);
  const [display, setDisplay] = useState(false);
  const [data, setData] = useState(false);
  const [displayAdd, setDisplayAdd] = useState(false);

  useEffect(() => {
    getToolList();
    getParkingList();
  }, [data]);

  const getParkingList = async () => {
    await ParkingAPIs.parckingList().then((data) => setParkings(data));
    setData(true);
  };

  const getToolList = async () => {
    await CarsAPIs.toolList().then((data) =>
      setTools(data.filter((data) => data.etat !== "not available"))
    );
  };

  const displayChangeParkingForm = () => {
    setData(false);
    display ? setDisplay(false) : setDisplay(true);
  };
  const displayAddtoolForm = () => {
    setData(false);
    displayAdd ? setDisplayAdd(false) : setDisplayAdd(true);
  };
  return (
    <Main title={"Tools Management"}>
      <ScrollTop />
      <div>
        <div className="d-flex flex-wrap justify-content-between align-items-center ">
          <div id="search" className="d-flex m-1 mx-lg-2 px-3">
            <form className="d-flex">
              <i className="bi bi-search fs-5"></i>
              <input
                className="form-control form-control-sm ml-3 fs-6"
                type="text"
                placeholder="by id"
                aria-label="Search"
              />
            </form>
          </div>
          <div className="d-flex m-1 mx-lg-2">
            <button
              type="button"
              className="btn w-100 d-flex justify-content-center align-items-center btns rounded-circle"
              onClick={displayAddtoolForm}
            >
              <i className="bi bi-plus-lg fs-6"></i> Add New Tool
            </button>
          </div>
        </div>
        <div
          className="p-3 d-flex flex-wrap justify-content-center"
          id="filterd"
        >
          <div
            className="card m-1 my-auto"
            style={{
              maxHeight: "250px",
              maxWidth: "250px",
              borderRadius: "10px",
            }}
          >
            {display && (
              <ChangeParkingForm
                displayChangeParkingForm={displayChangeParkingForm}
                selectedTool={selectedTool}
                parkings={parkings}
              />
            )}
            {displayAdd && (
              <AddtoolForm
                displayAddtoolForm={displayAddtoolForm}
                parkings={parkings}
              />
            )}
          </div>
          {tools &&
            parkings &&
            tools.map((t, i) => (
              <button
                onClick={() => {
                  setSelectedTool(t);
                  displayChangeParkingForm();
                }}
                key={i}
                style={{
                  width: "240px",
                  borderRadius: "10px",
                }}
                className="card p-3 m-1 border d-flex flex-column justify-content-between"
              >
                <ul
                  className="info list-unstyled d-flex flex-column align-items-start"
                  style={{
                    maxHeight: "50%",
                    maxWidth: "100%",
                  }}
                >
                  <li>
                    <i
                      className="bi bi-bookmark"
                      style={{ color: "black" }}
                    ></i>
                    <span className="px-1">
                      {t.id} | {t.name}{" "}
                    </span>
                  </li>
                  <li>
                    <i className="bi bi-slack" style={{ color: "black" }}></i>
                    <span>{`${t.etat}`} </span>
                  </li>
                  <li>
                    <i
                      className="bi bi-file-ppt fs-5"
                      style={{ color: "black" }}
                    ></i>
                    <span>{`Parking ID: ${t.parking}`}</span>
                  </li>
                  <li>
                    <i
                      className="bi bi-geo-alt fs-5"
                      style={{ color: "black" }}
                    ></i>
                    <span>{`adresse: ${parkings[t.parking - 1].adresse}`}</span>
                  </li>
                </ul>
              </button>
            ))}
        </div>
      </div>
    </Main>
  );
};

const ChangeParkingForm = ({
  displayChangeParkingForm,
  selectedTool,
  parkings,
}) => {
  const [parkingID, setParkingID] = useState(selectedTool.parking);
  const [defaultparking, setDefaultParkings] = useState(0);

  const parkingLocation = [];
  parkings.map((p) => {
    let e = false;
    parkingLocation &&
      parkingLocation.map((par) => {
        if (par.value === `${p.id}`) e = true;
      });
    !e &&
      parkingLocation.push({
        value: `${p.id}`,
        label: `${p.id} | ${p.adresse}`,
      });
  });

  const save = () => {
    updateToolParking(selectedTool.id, parkingID);
    displayChangeParkingForm();
  };
  const deletevehicle = () => {
    Delete(selectedTool.id);
    displayConfirmation();
    displayChangeParkingForm();
  };

  const [display, setDisplay] = useState(false);

  const displayConfirmation = () => {
    display ? setDisplay(false) : setDisplay(true);
  };

  const Delete = async (id) => {
    await CarsAPIs.DeleteTool(id).then((d) => console.log(d));
  };
  const updateToolParking = async (id, parking_id) => {
    await CarsAPIs.UpdateToolParking(id, parking_id).then((d) =>
      console.log(d)
    );
  };
  return (
    <>
      <div
        className="modal fade show d-block"
        id="exampleModalCenter"
        tabIndex="-1"
        role="dialog"
      >
        <div
          className="modal-dialog modal-dialog-centered modal-md"
          role="dialog"
        >
          <div className="modal-content">
            <div className="modal-header">
              <h4 className="modal-title" id="Ckeck Form">
                Change Tool Parking
              </h4>
            </div>
            <div className="modal-body">
              <div className="w-100">
                <div className="d-flex flex-md-row flex-column ">
                  <div className="w-100 m-1 d-flex flex-column fs-6">
                    <div className="m-1">
                      <label
                        htmlFor="registration-number"
                        className="fs-6"
                        style={{ color: "var(--font-color-2)" }}
                      >
                        ID
                      </label>
                      <p
                        className="form-control fs-6"
                        id="registration-number"
                        style={{
                          border: 0,
                          borderBottom: "2px solid var(--font-color-2)",
                        }}
                      >
                        {selectedTool.id}
                      </p>
                    </div>
                    <div className="m-1">
                      <label
                        htmlFor="car-name"
                        className="fs-6"
                        style={{ color: "var(--font-color-2)" }}
                      >
                        Name
                      </label>
                      <p
                        className="form-control fs-6"
                        id="car-name"
                        style={{
                          border: 0,
                          borderBottom: "2px solid var(--font-color-2)",
                        }}
                      >
                        {selectedTool.name}
                      </p>
                    </div>
                  </div>
                  <div className="w-100 m-1 d-flex flex-column fs-6">
                    <div className="m-1">
                      <label
                        htmlFor="car-model"
                        className="fs-6"
                        style={{ color: "var(--font-color-2)" }}
                      >
                        State
                      </label>
                      <p
                        className="form-control fs-6"
                        id="car-model"
                        style={{
                          border: 0,
                          borderBottom: "2px solid var(--font-color-2)",
                        }}
                      >
                        {selectedTool.etat}
                      </p>
                    </div>
                    <div className="m-1">
                      <label
                        htmlFor="parkingLocation"
                        className="fs-6"
                        style={{ color: "var(--font-color-2)" }}
                      >
                        Parking
                      </label>
                      <Select
                        classNamePrefix="select"
                        name="parkingLocation"
                        id="parkingLocation"
                        options={parkingLocation}
                        defaultValue={parkingLocation[defaultparking]}
                        onChange={(e) => setParkingID(e.value)}
                      />
                    </div>
                  </div>
                </div>
              </div>

              <div className="modal-footer">
                <button
                  type="button"
                  className="btn"
                  data-dismiss="modal"
                  onClick={displayChangeParkingForm}
                  style={{ background: "var(--bg_icon_color)", color: "black" }}
                >
                  Close
                </button>
                <button
                  type="button"
                  className="btn"
                  onClick={() => displayConfirmation()}
                  style={{ background: "var(--noti_color_2)", color: "white" }}
                >
                  Delete tool
                </button>
                <button
                  type="button"
                  className="btn"
                  onClick={() => save()}
                  style={{ background: "var(--btn_color1)", color: "white" }}
                >
                  Save changes
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>
      {display && (
        <Confirmation
          displayConfirmation={displayConfirmation}
          Delete={deletevehicle}
        />
      )}
    </>
  );
};

const Confirmation = ({ displayConfirmation, Delete }) => {
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
          <div className="modal-body">
            <i
              className="bi bi-x-circle m-3 d-flex justify-content-center text-danger"
              style={{ fontSize: "55px" }}
            ></i>
            <p className="d-flex px-3 justify-content-center fs-5">
              Are tou sure you want to Delete this tool ?
            </p>
          </div>
          <div className="modal-footer">
            <button
              type="button"
              className="btn refuse-btn"
              data-dismiss="modal"
              onClick={displayConfirmation}
            >
              No
            </button>
            <button
              type="button"
              className="btn accept-btn"
              data-dismiss="modal"
              onClick={Delete}
              style={{ color: "black" }}
            >
              Yes
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

const AddtoolForm = ({ displayAddtoolForm, parkings }) => {
  let current = new Date();
  current.setMinutes(current.getMinutes() - current.getTimezoneOffset());
  current = current.toISOString().slice(0, 10);

  const [name, setName] = useState("");
  const [parkingID, setParkingID] = useState(parkings[0].id);

  const parkingLocation = [];
  parkings.map((p) => {
    parkingLocation.push({
      value: `${p.id}`,
      label: `${p.id} | ${p.adresse}`,
    });
  });

  const addNewTool = () => {
    let data = {
      name: name,
      parking: parkingID,
    };
    addTool(data);
    displayAddtoolForm();
  };
  const addTool = async (carData) => {
    await CarsAPIs.AddTool(carData).then((d) => console.log(d));
  };
  return (
    <div
      className="modal fade show d-block"
      id="exampleModalCenter"
      tabIndex="-1"
      role="dialog"
    >
      <div
        className="modal-dialog modal-dialog-centered  modal-md"
        role="dialog"
      >
        <div className="modal-content">
          <div className="modal-header">
            <h5 className="modal-title" id="Ckeck Form">
              Add Tool
            </h5>
          </div>
          <div className="modal-body">
            <div className="d-flex flex-column">
              <div className="m-1 w-100">
                <label
                  htmlFor="Name"
                  className="fs-6"
                  style={{ color: "var(--font-color-2)" }}
                >
                  Name
                </label>
                <input
                  type="text"
                  name="Name"
                  className="form-control"
                  id="Name"
                  required
                  value={name}
                  onChange={(v) => setName(v.target.value)}
                  style={{
                    border: 0,
                    borderBottom: "2px solid var(--font-color-2)",
                    height: "40px",
                  }}
                />
              </div>
              <div className="m-1 w-100">
                <label
                  htmlFor="parkingLocation"
                  className="fs-5"
                  style={{ color: "var(--font-color-2)" }}
                >
                  Parking
                </label>
                <Select
                  classNamePrefix="select"
                  name="parkingLocation"
                  id="parkingLocation"
                  options={parkingLocation}
                  defaultValue={parkingLocation[0]}
                  onChange={(v) => setParkingID(v.value)}
                />
              </div>
            </div>
          </div>

          <div className="modal-footer p-0 px-4">
            <button
              type="button"
              className="btn"
              data-dismiss="modal"
              onClick={displayAddtoolForm}
              style={{ background: "var(--bg_icon_color)", color: "black" }}
            >
              Close
            </button>
            <button
              type="button"
              className="btn"
              onClick={() => addNewTool()}
              style={{ background: "var(--btn_color1)", color: "white" }}
            >
              Add
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};
