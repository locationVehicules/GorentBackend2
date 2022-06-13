import { useState } from "react";
import { Main } from "../components/Main";

import { Enterprise } from "./Enterprise";
import { Driver } from "./Driver";
import { Owner } from "./Owner";
import { GarageManager } from "./GarageManager";
import { Secretary } from "./Secretary";
import { Renter } from "./Renter";
import { Admin } from "./Admin";

export const UserManagement = () => {
  const [renterE, setRenterE] = useState(true);
  const [renterP, setRenterP] = useState(false);
  const [driver, setDriver] = useState(false);
  const [owner, setOwner] = useState(false);
  const [secretary, setSecretary] = useState(false);
  const [garageManager, setGarageManager] = useState(false);
  const [admin, setAdmin] = useState(false);

  const [renterEActive, setRenterEActive] = useState("active");
  const [renterPActive, setRenterPActive] = useState(" ");
  const [driverActive, setDriverActive] = useState(" ");
  const [ownerActive, setOwnerActive] = useState(" ");
  const [secretaryActive, setSecretaryActive] = useState(" ");
  const [garageManagerActive, setGarageManagerActive] = useState(" ");
  const [adminActive, setAdminActive] = useState(" ");
  const ChangeFunction = (e) => {
    const targetVal = e.target.value;
    switch (targetVal) {
      case "renter-enterprise":
        setRenterE(true);
        setRenterP(false);
        setDriver(false);
        setOwner(false);
        setSecretary(false);
        setGarageManager(false);
        setAdmin(false);

        setRenterEActive("active");
        setRenterPActive("");
        setDriverActive("");
        setOwnerActive("");
        setSecretaryActive("");
        setGarageManagerActive("");
        setAdminActive("");
        break;
      case "renter-personnes":
        setRenterE(false);
        setRenterP(true);
        setDriver(false);
        setOwner(false);
        setSecretary(false);
        setGarageManager(false);
        setAdmin(false);

        setRenterEActive("");
        setRenterPActive("active");
        setDriverActive("");
        setOwnerActive("");
        setSecretaryActive("");
        setGarageManagerActive("");
        setAdminActive("");
        break;
      case "driver":
        setRenterE(false);
        setRenterP(false);
        setDriver(true);
        setOwner(false);
        setSecretary(false);
        setGarageManager(false);
        setAdmin(false);

        setRenterEActive("");
        setRenterPActive("");
        setDriverActive("active");
        setOwnerActive("");
        setSecretaryActive("");
        setGarageManagerActive("");
        setAdminActive("");
        break;
      case "owner":
        setRenterE(false);
        setRenterP(false);
        setDriver(false);
        setOwner(true);
        setSecretary(false);
        setGarageManager(false);
        setAdmin(false);

        setRenterEActive("");
        setRenterPActive("");
        setDriverActive("");
        setOwnerActive("active");
        setSecretaryActive("");
        setGarageManagerActive("");
        setAdminActive("");
        break;
      case "admin":
        setRenterE(false);
        setRenterP(false);
        setDriver(false);
        setOwner(false);
        setAdmin(true);
        setSecretary(false);
        setGarageManager(false);

        setRenterEActive("");
        setRenterPActive("");
        setDriverActive("");
        setOwnerActive("");
        setSecretaryActive("");
        setGarageManagerActive("");
        setAdminActive("active");
        break;
      case "secretary":
        setRenterE(false);
        setRenterP(false);
        setDriver(false);
        setOwner(false);
        setSecretary(true);
        setGarageManager(false);
        setAdmin(false);

        setRenterEActive("");
        setRenterPActive("");
        setDriverActive("");
        setOwnerActive("");
        setSecretaryActive("active");
        setGarageManagerActive("");
        setAdminActive("");
        break;
      case "garage-manager":
        setRenterE(false);
        setRenterP(false);
        setDriver(false);
        setOwner(false);
        setSecretary(false);
        setGarageManager(true);
        setAdmin(false);

        setRenterEActive("");
        setRenterPActive("");
        setDriverActive("");
        setOwnerActive("");
        setSecretaryActive("");
        setGarageManagerActive("active");
        setAdminActive("");
        break;
      default:
        break;
    }
  };

  const p = window.location.href.search("Secretary");
  return (
    <Main title={"Users Management"}>
      <div className="btn-group d-flex flex-wrap" role="group" aria-label="">
        <button
          type="button"
          className={`btn btn btn-secondary navbtns ${renterEActive}`}
          onClick={ChangeFunction}
          value="renter-enterprise"
          style={{
            backgroundColor: "var(--btn_color1)",
            fontWeight: "bold",
          }}
        >
          Enterprise
        </button>
        <button
          type="button"
          className={`btn btn btn-secondary navbtns ${renterPActive}`}
          onClick={ChangeFunction}
          value="renter-personnes"
          style={{
            backgroundColor: "var(--btn_color1)",
            fontWeight: "bold",
          }}
        >
          Renter
        </button>
        <button
          type="button"
          className={`btn btn btn-secondary navbtns ${driverActive}`}
          onClick={ChangeFunction}
          value="driver"
          style={{
            backgroundColor: "var(--btn_color1)",
            fontWeight: "bold",
          }}
        >
          Driver
        </button>
      </div>
      {p === -1 && (
        <div className="btn-group d-flex flex-wrap" role="group" aria-label="">
          <button
            type="button"
            className={`btn btn btn-secondary navbtns ${ownerActive}`}
            onClick={ChangeFunction}
            value="owner"
            style={{
              backgroundColor: "var(--btn_color1)",
              fontWeight: "bold",
            }}
          >
            Owner
          </button>
          <button
            type="button"
            className={`btn btn btn-secondary navbtns ${adminActive}`}
            onClick={ChangeFunction}
            value="admin"
            style={{
              backgroundColor: "var(--btn_color1)",
              fontWeight: "bold",
            }}
          >
            Admin
          </button>
          <button
            type="button"
            className={`btn btn btn-secondary navbtns ${secretaryActive}`}
            onClick={ChangeFunction}
            value="secretary"
            style={{
              backgroundColor: "var(--btn_color1)",
              fontWeight: "bold",
            }}
          >
            Secretary
          </button>
          <button
            type="button"
            className={`btn btn btn-secondary navbtns ${garageManagerActive}`}
            onClick={ChangeFunction}
            value="garage-manager"
            style={{
              backgroundColor: "var(--btn_color1)",
              fontWeight: "bold",
            }}
          >
            Garage Manager
          </button>
        </div>
      )}

      {renterE && <Enterprise />}
      {renterP && <Renter />}
      {driver && <Driver />}
      {owner && <Owner />}
      {secretary && <Secretary />}
      {garageManager && <GarageManager />}
      {admin && <Admin />}
    </Main>
  );
};
