import React, { useState, useEffect } from "react";
import { Main } from "../components/Main";
import AdministrationAPIs from "../GetSetData/useAPIs/AdministrationAPIs";

import "../css/gerer_vehicules_style.css";

export const ChangeSalaries = () => {
  const [salaries, setSalaries] = useState();
  const [newData, setNewData] = useState(false);
  const [selectedType, setSelectedType] = useState(null);

  const [display, setDisplay] = useState(false);
  const displayChangeSalaryForm = () => {
    setNewData(false);
    getSalaries();
    display ? setDisplay(false) : setDisplay(true);
  };

  useEffect(() => {
    getSalaries();
  }, [newData]);

  const getSalaries = async () => {
    await AdministrationAPIs.SalariesList().then((data) => setSalaries(data));
    setNewData(true);
  };
  return (
    <Main title={"Change Employees Salaries"}>
      <div
        className="d-flex flex-wrap justify-content-center align-items-center"
        style={{
          height: "85vh",
          borderRadius: "10px",
        }}
      >
        {display && (
          <ChangeSalaryForm
            displayChangeSalaryForm={displayChangeSalaryForm}
            selectedType={selectedType}
          />
        )}
        {salaries &&
          salaries.map((s, i) => (
            <button
              onClick={() => {
                setSelectedType(s);
                displayChangeSalaryForm();
              }}
              key={i}
              style={{
                width: "250px",
                borderRadius: "10px",
              }}
              className="contract-card p-3 mx-3 my-2 my-md-0 d-flex flex-wrap justify-content-center "
            >
              <ul className="list-unstyled my-1 d-flex flex-column ">
                <li className="d-flex flex-wrap ">
                  <p className="my-1 mx-2">
                    <b>Type:</b>{" "}
                    <span className="p-1">
                      {s.type.charAt(0).toUpperCase() + s.type.slice(1)}
                    </span>
                  </p>
                </li>
                <li className="d-flex flex-wrap ">
                  <p className=" my-1 mx-2">
                    <b>Grade:</b>{" "}
                    <span className="p-1">
                      {s.grade.charAt(0).toUpperCase() + s.grade.slice(1)}
                    </span>
                  </p>
                </li>
                <li className="d-flex flex-wrap ">
                  <p className=" my-1 mx-2">
                    <b>Salary :</b> <span className="p-1">{s.Salary} DZD</span>
                  </p>
                </li>
              </ul>
            </button>
          ))}
      </div>
    </Main>
  );
};

const ChangeSalaryForm = ({ displayChangeSalaryForm, selectedType }) => {
  const [salary, setSalary] = useState(selectedType.Salary);

  const saveData = async () => {
    let data = {
      type: selectedType.type,
      grade: selectedType.grade,
      Salary: parseInt(salary),
    };
    await AdministrationAPIs.UpdateSalaries(selectedType.id, data);

    displayChangeSalaryForm();
  };

  return (
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
              Change Salary
            </h4>
          </div>
          <div className="modal-body">
            <div className="d-flex flex-md-row flex-column ">
              <div className="w-100 m-1 d-flex flex-column fs-6">
                <div>
                  <label
                    htmlFor="renter-name"
                    className="fs-6"
                    style={{ color: "var(--font-color-2)" }}
                  >
                    Type and Grade
                  </label>
                  <p
                    className="form-control fs-6"
                    id="renter-name"
                    style={{
                      border: 0,
                      borderBottom: "2px solid var(--font-color-2)",
                    }}
                  >
                    {selectedType.type.charAt(0).toUpperCase() +
                      selectedType.type.slice(1)}{" "}
                    {selectedType.grade.charAt(0).toUpperCase() +
                      selectedType.grade.slice(1)}
                  </p>
                </div>
              </div>
            </div>
            <div className="d-flex flex-column">
              <div className="d-flex flex-column flex-md-row">
                <div className="m-1 w-100">
                  <label
                    htmlFor="old-d-price"
                    className="fs-6"
                    style={{ color: "var(--font-color-2)" }}
                  >
                    Old salary
                  </label>
                  <p
                    className="form-control fs-6"
                    id="old-d-price"
                    style={{
                      border: 0,
                      borderBottom: "2px solid var(--font-color-2)",
                    }}
                  >
                    {selectedType.Salary}
                  </p>
                </div>
                <div className="m-1 w-100">
                  <label
                    htmlFor="new-price"
                    className="fs-6"
                    style={{ color: "var(--font-color-2)" }}
                  >
                    New salary
                  </label>
                  <input
                    type="number"
                    name="new-price"
                    className="form-control mt-1"
                    id="new-price"
                    defaultValue={selectedType.Salary}
                    onChange={(e) => setSalary(e.target.value)}
                    placeholder={selectedType.Salary}
                    required
                    style={{
                      border: 0,
                      borderBottom: "2px solid var(--font-color-2)",
                      height: "34px",
                    }}
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
              onClick={displayChangeSalaryForm}
              style={{ background: "var(--bg_icon_color)", color: "black" }}
            >
              Close
            </button>
            <button
              type="button"
              className="btn"
              onClick={() => saveData()}
              style={{ background: "var(--btn_color1)", color: "white" }}
            >
              Save changes
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};
