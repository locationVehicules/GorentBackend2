import React, { useState, useEffect } from "react";
import { Main } from "../components/Main";
import CarsAPIs from "../GetSetData/useAPIs/CarsAPIs";

import "../css/gerer_vehicules_style.css";

export const ChangeToolPrices = () => {
  const [tools, setTools] = useState(null);
  const [selectedTool, setSelectedTool] = useState(null);
  const [display, setDisplay] = useState(false);
  const [data, setData] = useState(false);

  const displayChangePriceForm = () => {
    setData(false);
    getToolList();
    display ? setDisplay(false) : setDisplay(true);
  };

  useEffect(() => {
    getToolList();
  }, [data]);

  const getToolList = async () => {
    let currentDate = new Date();
    currentDate.setMinutes(
      currentDate.getMinutes() - currentDate.getTimezoneOffset()
    );
    currentDate.setHours(currentDate.getHours() + 1);
    currentDate = currentDate.toISOString().slice(0, 10);
    await CarsAPIs.ViewToolDispo(currentDate, currentDate).then((data) => {
      setTools(data);
    });
    setData(true);
  };
  return (
    <Main title={"Change Tool Prices"}>
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
      <div className="p-3 d-flex flex-wrap justify-content-center" id="filterd">
        <div
          className="card m-1 my-auto"
          style={{
            maxHeight: "250px",
            maxWidth: "250px",
            borderRadius: "10px",
          }}
        >
          {display && (
            <ChangePriceForm
              displayChangePriceForm={displayChangePriceForm}
              selectedTool={selectedTool}
            />
          )}
        </div>
        {tools &&
          tools.map((t, i) => (
            <button
              onClick={() => {
                setSelectedTool(t);
                displayChangePriceForm();
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
                  <i className="bi bi-bookmark" style={{ color: "black" }}></i>
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
                  <span>{`Price: ${t.price} DZD`}</span>
                </li>
              </ul>
            </button>
          ))}
      </div>
    </Main>
  );
};

const ChangePriceForm = ({ displayChangePriceForm, selectedTool }) => {
  const [price, setPrice] = useState(selectedTool.price);

  const saveData = () => {
    CarsAPIs.UpdateToolPriceate(selectedTool.id, parseInt(price));
    displayChangePriceForm();
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
              Change Tool Prices
            </h4>
          </div>
          <div className="modal-body">
            <div className="d-flex flex-column ">
              <div className="w-100 m-1 d-flex flex-column fs-6">
                <div>
                  <label
                    htmlFor="renter-name"
                    className="fs-6"
                    style={{ color: "var(--font-color-2)" }}
                  >
                    Tool ID and Name
                  </label>
                  <p
                    className="form-control fs-6"
                    id="renter-name"
                    style={{
                      border: 0,
                      borderBottom: "2px solid var(--font-color-2)",
                    }}
                  >
                    {selectedTool.id} | {selectedTool.name}
                  </p>
                </div>
              </div>
              <div className="w-100 m-1 d-flex flex-column fs-6">
                <h6 style={{ fontWeight: "bold" }}>Price (DZD)</h6>
                <div className="d-flex flex-column flex-md-row">
                  <div className="m-1 w-100">
                    <label
                      htmlFor="old-d-price"
                      className="fs-6"
                      style={{ color: "var(--font-color-2)" }}
                    >
                      Old price
                    </label>
                    <p
                      className="form-control fs-6"
                      id="old-d-price"
                      style={{
                        border: 0,
                        borderBottom: "2px solid var(--font-color-2)",
                      }}
                    >
                      {selectedTool.price}
                    </p>
                  </div>
                  <div className="m-1 w-100">
                    <label
                      htmlFor="new-price"
                      className="fs-6"
                      style={{ color: "var(--font-color-2)" }}
                    >
                      New price
                    </label>
                    <input
                      type="number"
                      name="new-price"
                      className="form-control mt-1"
                      id="new-price"
                      defaultValue={selectedTool.price}
                      onChange={(e) => setPrice(e.target.value)}
                      placeholder={selectedTool.price}
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
          </div>

          <div className="modal-footer">
            <button
              type="button"
              className="btn"
              data-dismiss="modal"
              onClick={displayChangePriceForm}
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
