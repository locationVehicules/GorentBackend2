import { useState } from "react";
import { Main } from "../components/Main";
import { Agencies } from "./Agencies";
import { Parkings } from "./Parkings";

export const AgenciesParkings = () => {
  const [agencies, setAgencies] = useState(true);
  const [agenciesActive, setAgenciesActive] = useState("active");
  const [parkings, setParkings] = useState(false);
  const [parkingsActive, setParkingsActive] = useState(" ");

const ChangeFunction = (e) => {
    const targetVal = e.target.value;
    switch (targetVal) {
      case "agencies":
        setAgencies(true);
        setParkings(false);

        setAgenciesActive("active");
        setParkingsActive("");
        break;
      case "parkings":
        setAgencies(false);
        setParkings(true);

        setAgenciesActive("");
        setParkingsActive("active");
        break;
      default:
        break;
    }
  }
  return (
    <Main title={"Users Management"}>
      <div className="btn-group d-flex flex-wrap" role="group" aria-label="">
        <button
          type="button"
          className={`btn btn btn-secondary navbtns ${agenciesActive}`}
          onClick={ChangeFunction}
          value="agencies"
          style={{
            backgroundColor: "var(--btn_color1)",
            fontWeight: "bold",
          }}
        >
          Agencies
        </button>
        <button
          type="button"
          className={`btn btn btn-secondary navbtns ${parkingsActive}`}
          onClick={ChangeFunction}
          value="parkings"
          style={{
            backgroundColor: "var(--btn_color1)",
            fontWeight: "bold",
          }}
        >
          Parkings
        </button>
      </div>
      {parkings && <Parkings />}
      {agencies && <Agencies />}
    </Main>
  );
};

