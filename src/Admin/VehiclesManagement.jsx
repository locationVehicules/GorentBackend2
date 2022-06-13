import { useState, useEffect } from "react";
import { Main } from "../components/Main";
import { ScrollTop } from "../components/ScrollTop";
import QrReader from "react-qr-scanner";
import Select from "react-select";
import CarsAPIs from "../GetSetData/useAPIs/CarsAPIs";
import ParkingAPIs from "../GetSetData/useAPIs/ParkingAPIs";
import "../css/gerer_vehicules_style.css";

export const VehiclesManagement = () => {
  const [vehicles, setVehicles] = useState(null);
  const [parkings, setParkings] = useState(null);
  const [selectedVehicle, setSelectedVehicle] = useState(null);
  const [dispoSpots, setDispoSpots] = useState(null);
  const [display, setDisplay] = useState(false);
  const [data, setData] = useState(false);
  const [displayAdd, setDisplayAdd] = useState(false);

  useEffect(() => {
    getVehicleList();
    getParkingList();
    parkings && vehicles && setDispoSpots(getDispoSpots(parkings, vehicles));
  }, [data]);

  const getParkingList = async () => {
    await ParkingAPIs.parckingList().then((data) => setParkings(data));
    setData(true);
  };

  const getVehicleList = async () => {
    await CarsAPIs.carsList().then((data) =>
      setVehicles(data.filter((data) => data.etat !== "not available"))
    );
  };

  const displayChangeParkingForm = () => {
    setData(false);
    display ? setDisplay(false) : setDisplay(true);
  };
  const displayAddVehicleForm = () => {
    setData(false);
    displayAdd ? setDisplayAdd(false) : setDisplayAdd(true);
  };
  return (
    <Main title={"Vehicles Management"}>
      <ScrollTop />
      <div>
        <div className="d-flex flex-wrap justify-content-between align-items-center ">
          <div id="search" className="d-flex m-1 mx-lg-2 px-3">
            <form className="d-flex">
              <i className="bi bi-search fs-5"></i>
              <input
                className="form-control form-control-sm ml-3 fs-6"
                type="text"
                placeholder="by registration number"
                aria-label="Search"
              />
            </form>
          </div>
          <div className="d-flex m-1 mx-lg-2">
            <button
              type="button"
              className="btn w-100 d-flex justify-content-center align-items-center btns rounded-circle"
              onClick={displayAddVehicleForm}
            >
              <i className="bi bi-plus-lg fs-6"></i> Add New Vehicle
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
            <ParkingQRscanner
              displayChangeParkingForm={displayChangeParkingForm}
            />
            {display && (
              <ChangeParkingForm
                displayChangeParkingForm={displayChangeParkingForm}
                selectedVehicle={selectedVehicle}
                parkings={dispoSpots}
              />
            )}
            {displayAdd && (
              <AddVehicleForm
                displayAddVehicleForm={displayAddVehicleForm}
                parkings={dispoSpots}
              />
            )}
          </div>
          {vehicles &&
            parkings &&
            vehicles.map((v, i) => (
              <button
                onClick={() => {
                  setSelectedVehicle(v);
                  displayChangeParkingForm();
                  setSelectedVehicle(v);
                }}
                key={i}
                style={{
                  width: "240px",
                  borderRadius: "10px",
                }}
                className="card p-3 m-1 border d-flex flex-column justify-content-between"
              >
                <div
                  className="img-containe d-flex"
                  style={{
                    maxHeight: "50%",
                    maxWidth: "100%",
                  }}
                >
                  <img
                    className=" p-2"
                    src={`https://cdn.imagin.studio/getImage?customer=img&${v.photo
                      .replaceAll("%3D", "=")
                      .replace(
                        "%26",
                        "&"
                      )}&angle=23&width=2600&zoomType=fullscreen`}
                    alt={`${v.name}_photo`}
                  />
                </div>
                <ul
                  className="info list-unstyled d-flex flex-column align-items-start"
                  style={{
                    maxHeight: "50%",
                    maxWidth: "100%",
                  }}
                >
                  <li>
                    <i
                      className="bi bi-123 px-1 py-0 fs-5"
                      style={{
                        color: "black",
                        border: "1px solid black",
                        borderRadius: "6px",
                      }}
                    ></i>
                    <span className="px-1">{v.matricule} </span>
                  </li>
                  <li>
                    <img
                      style={{
                        maxHeight: "40px",
                        marginRight: "10px",
                      }}
                      src="https://img.icons8.com/ios-filled/50/000000/audi.png"
                      alt="audi"
                    />
                    {v.name}
                  </li>
                  <li>
                    <i className="bi bi-slack" style={{ color: "black" }}></i>
                    <span>{`${v.modele}`} </span>
                  </li>

                  <li>
                    <i
                      className="bi bi-file-ppt fs-5"
                      style={{ color: "black" }}
                    ></i>
                    <span>{`Parking ID: ${v.parking}`}</span>
                  </li>
                  <li>
                    <i
                      className="bi bi-geo-alt fs-5"
                      style={{ color: "black" }}
                    ></i>
                    <span>{`adresse: ${parkings[v.parking - 1].adresse}`}</span>
                  </li>

                  <li>
                    <i
                      className="bi bi-geo fs-5"
                      style={{ color: "black" }}
                    ></i>
                    <span>{`Spot: ${v.spotLetter}-${v.spotNumber}`} </span>
                  </li>
                </ul>
              </button>
            ))}
        </div>
      </div>
    </Main>
  );
};

const ParkingQRscanner = ({ displayChangeParkingForm }) => {
  const delay = 100;
  const [result, setResult] = useState();

  useEffect(() => {
    result !== undefined && displayChangeParkingForm();
  }, [result]);

  const handleError = (error) => {
    console.error(error);
  };

  return (
    <>
      <QrReader
        style={{
          width: "100%",
          height: "100%",
          border: "3px solid var(--bg_icon_color)",
          borderRadius: "10px",
        }}
        delay={delay}
        onError={handleError}
        onScan={(result) => setResult(result?.text)}
      />
    </>
  );
};

const ChangeParkingForm = ({
  displayChangeParkingForm,
  selectedVehicle,
  parkings,
}) => {
  const [parkingID, setParkingID] = useState(selectedVehicle.parking);
  const [parkingSpotL, setParkingSpotL] = useState(selectedVehicle.spotLetter);
  const [parkingSpotN, setParkingSpotN] = useState(selectedVehicle.spotNumber);
  const [parkingSpots, setParkingSpots] = useState([]);
  const [defaultparking, setDefaultParkings] = useState(0);
  const [newPark, setNewPark] = useState(false);
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

  const getParkingSpots = (v) => {
    setNewPark(false);
    let spots = [];
    parkings.map((p) => {
      v.value === `${p.id}` &&
        spots.push({ value: `${p.spot}`, label: `${p.spot}` });
    });
    setParkingSpots(spots);
    setParkingID(parseInt(v.value));
    setParkingSpotL(spots[0].value.split("-")[0]);
    setParkingSpotN(parseInt(spots[0].value.split("-")[1]));
  };
  useEffect(() => {
    parkingLocation.map((parking, index) => {
      parking.value == selectedVehicle.parking && setDefaultParkings(index);
    });

    parkingSpots.push({
      value: `${selectedVehicle.spotLetter}-${selectedVehicle.spotNumber}`,
      label: `${selectedVehicle.spotLetter}-${selectedVehicle.spotNumber}`,
    });
    parkings.map((p) => {
      selectedVehicle.parking == `${p.id}` &&
        parkingSpots.push({ value: `${p.spot}`, label: `${p.spot}` });
    });
    setNewPark(true);
  }, [parkingSpots]);

  const save = () => {
    updateCarParking(selectedVehicle.id, parkingID, parkingSpotL, parkingSpotN);
    displayChangeParkingForm();
  };
  const deletevehicle = () => {
    Delete(selectedVehicle.id);
    displayConfirmation();
    displayChangeParkingForm();
  };

  const [display, setDisplay] = useState(false);

  const displayConfirmation = () => {
    display ? setDisplay(false) : setDisplay(true);
  };

  const Delete = async (id) => {
    await CarsAPIs.DeleteCar(id).then((d) => console.log(d));
  };
  const updateCarParking = async (id, parking_id, spot_letter, spot_number) => {
    await CarsAPIs.UpdateCarParking(
      id,
      parking_id,
      spot_letter,
      spot_number
    ).then((d) => console.log(d));
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
          className="modal-dialog modal-dialog-centered modal-lg"
          role="dialog"
        >
          <div className="modal-content">
            <div className="modal-header">
              <h4 className="modal-title" id="Ckeck Form">
                Change Vehicle Parking
              </h4>
            </div>
            <div className="modal-body">
              <div className="vehicle-info d-flex flex-md-row flex-column m-2 p-3 border ">
                <div className="w-100">
                  <div className="d-flex flex-md-row flex-column ">
                    <div className="w-100 m-1 d-flex flex-column fs-6">
                      <div className="m-1">
                        <label
                          htmlFor="registration-number"
                          className="fs-6"
                          style={{ color: "var(--font-color-2)" }}
                        >
                          Registration Number
                        </label>
                        <p
                          className="form-control fs-6"
                          id="registration-number"
                          style={{
                            border: 0,
                            borderBottom: "2px solid var(--font-color-2)",
                          }}
                        >
                          {selectedVehicle.matricule}
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
                          {selectedVehicle.name}
                        </p>
                      </div>
                      <div className="m-1">
                        <label
                          htmlFor="car-model"
                          className="fs-6"
                          style={{ color: "var(--font-color-2)" }}
                        >
                          Model
                        </label>
                        <p
                          className="form-control fs-6"
                          id="car-model"
                          style={{
                            border: 0,
                            borderBottom: "2px solid var(--font-color-2)",
                          }}
                        >
                          {selectedVehicle.modele}
                        </p>
                      </div>
                    </div>
                    <div className="w-100 m-1 d-flex flex-column fs-5 ">
                      <label
                        htmlFor="photo-permit"
                        className="fs-5"
                        style={{ color: "var(--font-color-2)" }}
                      >
                        Vehicle Photo
                      </label>
                      <div className="m-auto mt-1 w-100 h-100 border rounded">
                        <div
                          className="img-containe d-flex"
                          style={{
                            maxHeight: "100%",
                            maxWidth: "100%",
                          }}
                        >
                          <img
                            className=" p-2"
                            src={`https://cdn.imagin.studio/getImage?customer=img&${selectedVehicle.photo
                              .replaceAll("%3D", "=")
                              .replace(
                                "%26",
                                "&"
                              )}&angle=23&width=2600&zoomType=fullscreen`}
                            alt={`${selectedVehicle.name}_photo`}
                          />
                        </div>
                      </div>
                    </div>
                  </div>

                  <div className="d-flex flex-column flex-md-row">
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
                        defaultValue={parkingLocation[defaultparking]}
                        onChange={(v) => getParkingSpots(v)}
                      />
                    </div>
                    <div className="m-1 w-100">
                      <label
                        className="fs-5"
                        style={{ color: "var(--font-color-2)" }}
                      >
                        Spot
                      </label>
                      {newPark && (
                        <Select
                          className="parkingSpots"
                          classNamePrefix="select"
                          id="parkingSpot"
                          name="parkingSpots"
                          options={parkingSpots}
                          defaultValue={parkingSpots[0]}
                          onChange={(v) => {
                            setParkingSpotL(v.value.split("-")[0]);
                            setParkingSpotN(parseInt(v.value.split("-")[1]));
                          }}
                        />
                      )}
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
                  Delete vehicle
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
              Are tou sure you want to Delete this vehicle ?
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

const AddVehicleForm = ({ displayAddVehicleForm, parkings }) => {
  const modelOptions = [
    { value: "Coupe", label: "Coupe" },
    { value: "SUV", label: "Sport Utility Vehicle" },
    { value: "Hatchback", label: "Hatchback" },
    { value: "Crossover", label: "Crossover" },
    { value: "Convertible", label: "Convertible" },
    { value: "Sedan", label: "Sedan" },
    { value: "Sports ", label: "Sports " },
    { value: "Minivan", label: "Minivan" },
    { value: "Wagon", label: "Station Wagon" },
    { value: "Pickup", label: "Pickup Truck " },
  ];
  const colourOptions = [
    { value: "gray", label: "Gray" },
    { value: "blue", label: "Blue" },
    { value: "red", label: "Red" },
    { value: "black", label: "Black" },
    { value: "white", label: "White" },
    { value: "green", label: "Green" },
  ];
  const gearBoxOptions = [
    { value: "m", label: "Manual" },
    { value: "a", label: "Automatic" },
  ];
  const engineOptions = [
    { value: "e", label: "Essence" },
    { value: "d", label: "Diesel" },
    { value: "h", label: "Hybride" },
    { value: "el", label: "Electric" },
  ];
  const placeOptions = [
    { value: 4, label: "4" },
    { value: 2, label: "2" },
    { value: 3, label: "3" },
    { value: 5, label: "5" },
    { value: 7, label: "7" },
    { value: 12, label: "12" },
    { value: 30, label: "30" },
  ];
  const mobilityOptions = [
    { value: "false", label: "unsupportive" },
    { value: "true", label: "supportive" },
  ];
  const vehicleCategoryOptions = [
    { value: "Car", label: "Car" },
    { value: "Bus", label: "Bus" },
    { value: "Moto", label: "Moto" },
  ];
  let spots = [];
  parkings.map((p) => {
    parkings[0].id == `${p.id}` &&
      spots.push({ value: `${p.spot}`, label: `${p.spot}` });
  });
  let current = new Date();
  current.setMinutes(current.getMinutes() - current.getTimezoneOffset());
  current = current.toISOString().slice(0, 10);

  const [name, setName] = useState("");
  const [matricule, setMatricule] = useState("");
  const [modele, setModele] = useState(modelOptions[0].value);
  const [type, setType] = useState(vehicleCategoryOptions[0].value);
  const [buyYear, setBuyYear] = useState(current);
  const [gearBox, setGearBox] = useState(gearBoxOptions[0].value);
  const [nbPlace, setNbPlace] = useState(placeOptions[0].value);
  const [couleur, setCouleur] = useState(colourOptions[0].value);
  const [mobiliteReduite, setMobiliteReduite] = useState(
    mobilityOptions[0].value === "true"
  );
  const [moteurType, setMoteurType] = useState(engineOptions[0].value);
  const [parkingSpotL, setParkingSpotL] = useState(
    spots[0].value.split("-")[0]
  );
  const [parkingSpotN, setParkingSpotN] = useState(
    parseInt(spots[0].value.split("-")[1])
  );
  const [parkingID, setParkingID] = useState(parkings[0].id);

  const [parkingSpots, setParkingSpots] = useState(spots);
  const [newPark, setNewPark] = useState(false);
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

  const getParkingSpots = (v) => {
    setNewPark(false);
    let spots = [];
    parkings.map((p) => {
      v.value === `${p.id}` &&
        spots.push({ value: `${p.spot}`, label: `${p.spot}` });
    });
    setParkingSpots(spots);
    setParkingID(parseInt(v.value));
    setParkingSpotL(spots[0].value.split("-")[0]);
    setParkingSpotN(parseInt(spots[0].value.split("-")[1]));
  };
  useEffect(() => {
    setNewPark(true);
  }, [parkingSpots]);

  const [display, setDisplay] = useState(false);

  const displayConfirmation = () => {
    display ? setDisplay(false) : setDisplay(true);
  };

  const Delete = async (id) => {
    await CarsAPIs.DeleteCar(id).then((d) => console.log(d));
  };
  const updateCarParking = async (id, parking_id, spot_letter, spot_number) => {
    await CarsAPIs.UpdateCarParking(
      id,
      parking_id,
      spot_letter,
      spot_number
    ).then((d) => console.log(d));
  };

  const addVehicule = () => {
    let data = {
      name: name,
      matricule: matricule,
      modele: modele,
      type: type.toLowerCase(),
      buy_year: buyYear,
      gear_box: gearBox,
      nb_place: nbPlace,
      couleur: couleur,
      mobilité_reduite: mobiliteReduite === "true",
      moteur_type: moteurType,
      spotLetter: parkingSpotL,
      spotNumber: parkingSpotN,
      photo: `make=${name.split(" ")[0].toLowerCase()}&modelFamily=${name
        .split(" ")[1]
        .toLowerCase()}`,
      parking: parkingID,
    };
    addCar(data);
    displayAddVehicleForm();
  };
  const addCar = async (carData) => {
    await CarsAPIs.AddCar(carData).then((d) => console.log(d));
  };
  return (
    <div
      className="modal fade show d-block"
      id="exampleModalCenter"
      tabIndex="-1"
      role="dialog"
    >
      <div
        className="modal-dialog modal-dialog-centered  modal-lg"
        role="dialog"
      >
        <div className="modal-content">
          <div className="modal-header">
            <h5 className="modal-title" id="Ckeck Form">
              Add Vehicle
            </h5>
          </div>
          <div className="modal-body">
            <div className="d-flex flex-md-row flex-column ">
              <div className="w-100 m-1 d-flex flex-column fs-6">
                <div className="d-flex flex-column flex-md-row">
                  <div className="m-1 w-100">
                    <label
                      htmlFor="last-Name"
                      className="fs-6"
                      style={{ color: "var(--font-color-2)" }}
                    >
                      Registration Number
                    </label>
                    <input
                      type="text"
                      name="registration-number"
                      className="form-control"
                      id="registration-number"
                      placeholder="12550 122 25"
                      required
                      value={matricule}
                      onChange={(v) => setMatricule(v.target.value)}
                      style={{
                        border: 0,
                        borderBottom: "2px solid var(--font-color-2)",
                        height: "40px",
                      }}
                    />
                  </div>
                  <div className="m-1 w-100">
                    <label
                      htmlFor="year-of-purchase"
                      className="fs-6"
                      style={{ color: "var(--font-color-2)" }}
                    >
                      Year of purchase
                    </label>
                    <input
                      type="date"
                      name="year-of-purchase"
                      className="form-control"
                      id="year of purchase"
                      placeholder=""
                      value={buyYear}
                      onChange={(v) => {
                        setBuyYear(v.target.value);
                      }}
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
                      htmlFor="model"
                      className="fs-6"
                      style={{ color: "var(--font-color-2)" }}
                    >
                      Model
                    </label>
                    <Select
                      classNamePrefix="select"
                      name="modelOptions"
                      id="modelOptions"
                      options={modelOptions}
                      defaultValue={modelOptions[0]}
                      onChange={(v) => setModele(v.value)}
                    />
                  </div>
                  <div className="m-1 w-100">
                    <label
                      htmlFor="type"
                      className="fs-6"
                      style={{ color: "var(--font-color-2)" }}
                    >
                      Brand
                    </label>
                    <input
                      type="text"
                      name="brand"
                      className="form-control"
                      id="brand"
                      placeholder="(ex: Toyota Avensis)"
                      value={name}
                      onChange={(v) => setName(v.target.value)}
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
                      htmlFor="color"
                      className="fs-6"
                      style={{ color: "var(--font-color-2)" }}
                    >
                      Color
                    </label>
                    <Select
                      classNamePrefix="select"
                      name="colourOptions"
                      id="colourOptions"
                      options={colourOptions}
                      defaultValue={colourOptions[0]}
                      onChange={(v) => setCouleur(v.value)}
                    />
                  </div>
                  <div className="m-1 w-100">
                    <label
                      htmlFor="gearbox-type"
                      className="fs-6"
                      style={{ color: "var(--font-color-2)" }}
                    >
                      Gearbox type
                    </label>
                    <Select
                      classNamePrefix="select"
                      name="gearBox"
                      id="gearBox"
                      options={gearBoxOptions}
                      defaultValue={gearBoxOptions[0]}
                      onChange={(v) => setGearBox(v.value)}
                    />
                  </div>
                </div>
                <div className="d-flex flex-column flex-md-row">
                  <div className="m-1 w-100">
                    <label
                      htmlFor="type-of-ngine"
                      className="fs-6"
                      style={{ color: "var(--font-color-2)" }}
                    >
                      Type of Engine
                    </label>
                    <Select
                      classNamePrefix="select"
                      name="engine"
                      id="engine"
                      options={engineOptions}
                      defaultValue={engineOptions[0]}
                      onChange={(v) => setMoteurType(v.value)}
                    />
                  </div>
                  <div className="m-1 w-100">
                    <label
                      htmlFor="number-seat"
                      className="fs-6"
                      style={{ color: "var(--font-color-2)" }}
                    >
                      Number Seat
                    </label>
                    <Select
                      classNamePrefix="select"
                      name="place"
                      id="place"
                      options={placeOptions}
                      defaultValue={placeOptions[0]}
                      onChange={(v) => setNbPlace(v.value)}
                    />
                  </div>
                </div>
                <div className="d-flex flex-column flex-md-row">
                  <div className="m-1 w-100">
                    <label
                      htmlFor="number-seat"
                      className="fs-6"
                      style={{ color: "var(--font-color-2)" }}
                    >
                      Reduced Mobility
                    </label>
                    <Select
                      classNamePrefix="select"
                      name="mobility"
                      id="mobility"
                      options={mobilityOptions}
                      defaultValue={mobilityOptions[0]}
                      onChange={(v) => setMobiliteReduite(v.value)}
                    />
                  </div>
                  <div className="m-1 w-100">
                    <label
                      htmlFor="vehicle-category"
                      className="fs-6"
                      style={{ color: "var(--font-color-2)" }}
                    >
                      Vehicle Category
                    </label>
                    <Select
                      className="vehicle-category"
                      classNamePrefix="select"
                      name="vehicle-categor"
                      options={vehicleCategoryOptions}
                      defaultValue={vehicleCategoryOptions[0]}
                      onChange={(v) => setType(v.value)}
                    />
                  </div>
                </div>
              </div>
            </div>

            <div className="d-flex flex-column flex-md-row">
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
                  onChange={(v) => getParkingSpots(v)}
                />
              </div>
              <div className="m-1 w-100">
                <label
                  className="fs-5"
                  style={{ color: "var(--font-color-2)" }}
                >
                  Spot
                </label>
                {newPark && (
                  <Select
                    className="parkingSpots"
                    classNamePrefix="select"
                    id="parkingSpot"
                    name="parkingSpots"
                    options={parkingSpots}
                    defaultValue={parkingSpots[0]}
                    onChange={(v) => {
                      setParkingSpotL(v.value.split("-")[0]);
                      setParkingSpotN(parseInt(v.value.split("-")[1]));
                    }}
                  />
                )}
              </div>
            </div>
          </div>

          <div className="modal-footer p-0 px-4">
            <button
              type="button"
              className="btn"
              data-dismiss="modal"
              onClick={displayAddVehicleForm}
              style={{ background: "var(--bg_icon_color)", color: "black" }}
            >
              Close
            </button>
            <button
              type="button"
              className="btn"
              onClick={() => addVehicule()}
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

const getDispoSpots = (parkings, vehicles) => {
  let allParksSpot = [];
  parkings.map((p) => {
    let alNum = p.capacite / 10;
    for (let i = "A".charCodeAt(0); i < "A".charCodeAt(0) + alNum; i++) {
      for (let j = 1; j <= 10; j++) {
        allParksSpot.push({
          id: p.id,
          adresse: p.adresse,
          spot: `${String.fromCharCode(i)}-${j}`,
        });
      }
    }
  });
  let nonDispoSpots = [];
  vehicles.map((v) => {
    let e = false,
      ad = null;
    allParksSpot.map((ap) => {
      if (
        ap.id === v.parking &&
        ap.spot === `${v.spotLetter}-${v.spotNumber}`
      ) {
        e = true;
        ad = ap.adresse;
      }
    });
    e &&
      nonDispoSpots.push({
        id: v.parking,
        adresse: ad,
        spot: `${v.spotLetter}-${v.spotNumber}`,
      });
  });

  let dispo = [];
  allParksSpot.map((p) => {
    let e = false;
    nonDispoSpots.map((ap) => {
      if (ap.id === p.id && ap.spot === p.spot) {
        e = true;
      }
    });
    !e && dispo.push(p);
  });
  return dispo;
};
