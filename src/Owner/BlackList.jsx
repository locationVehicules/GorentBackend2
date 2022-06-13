import React, { useState, useEffect } from "react";
import { Main } from "../components/Main";
import { AddRemoveTable } from "../components/tables";
import AdministrationAPIs from "../GetSetData/useAPIs/AdministrationAPIs";

export const BlackList = () => {
  const [BlackList, setBlackList] = useState(null);
  const [user, setUser] = useState("");
  const [renters, setRenters] = useState([]);
  const [displayTable, setDisplayTable] = useState(false);

  const [display, setDisplay] = useState(false);
  const [userID, setUserID] = useState(null);

  const reRender = (e) => {
    let value = e.target.value;
    setDisplayTable(false);
    setUser(value);
    let allBlackList = renters;
    value !== ""
      ? setBlackList(
          allBlackList.filter((renter) => renter[1] === parseInt(value))
        )
      : setBlackList(allBlackList);
  };

  useEffect(() => {
    BlackList && setDisplayTable(true);
  }, [BlackList]);

  useEffect(() => {
    getBalckList();
  }, []);

  const getBalckList = async () => {
    let r = [];
    await AdministrationAPIs.BlackList().then(
      (data) =>
        data && data.map((d) => r.push([d.id, d.account, d.add_date, d.motif]))
    );
    setRenters(r);
    r.length !== 0 && setBlackList(r);
    r.length !== 0 && setDisplayTable(true);
  };

  const displayConfirmation = () => {
    display ? setDisplay(false) : setDisplay(true);
  };
  const unblock = (e) => {
    displayConfirmation();
    setUserID(e);
  };

  const yesFunction = async () => {
    setDisplayTable(false);
    await AdministrationAPIs.blackListDelete(parseInt(userID));
    setUser("");
    getBalckList();
  };
  return (
    <Main title={"Black List"}>
      <div className="container-fluid">
        <div className="d-flex justify-content-between">
          <div id="search" className="d-flex m-1 mx-lg-2 px-3">
            <form className="d-flex">
              <i className="bi bi-search fs-5"></i>
              <input
                value={user}
                onChange={reRender}
                className="form-control form-control-sm ml-3 fs-6"
                type="text"
                placeholder="Search driver"
                aria-label="Search"
              />
            </form>
          </div>
        </div>
        {displayTable ? (
          <AddRemoveTable
            headerList={["Number", "Driver ID", "Date", "Raison"]}
            bodyLines={BlackList}
            btnValue={"Unblock"}
            functionBtn={unblock}
          />
        ) : (
          <div className="container p-3 my-3 table-con">
            <h2 className="d-flex justify-content-center">No one Blocked</h2>
          </div>
        )}
        {display && (
          <Confirmation
            displayConfirmation={displayConfirmation}
            yesFunction={yesFunction}
            confirmationText={" You want to unblock this driver?"}
          />
        )}
      </div>
    </Main>
  );
};

export const Confirmation = ({
  displayConfirmation,
  confirmationText,
  yesFunction,
}) => {
  const yes = () => {
    yesFunction();
    displayConfirmation();
  };
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
              {confirmationText}
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
              onClick={() => yes()}
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
