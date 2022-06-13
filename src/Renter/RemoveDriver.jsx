import React, { useState } from "react";
import { Main } from "../components/Main";
import { AddRemoveTable } from "../components/tables";
import { Confirmation } from "../Owner/BlackList";

export const RemoveDriver = () => {
  const renters = [];
  const renter = ["SB19042019", "BENABDESSADOK", "Safa"];
  for (let i = 0; i < 30; i++) {
    renters.push(renter);
  }
  const [display, setDisplay] = useState(false);
  const [userID, setUserID] = useState();

  const displayConfirmation = () => {
    display ? setDisplay(false) : setDisplay(true);
  };
  const remove = (e) => {
    displayConfirmation();
    !userID && setUserID(e);
  };
   const yesFunction = async () => {
     console.log(`${userID} removed`);
   };
  return (
    <Main title={"Drivers List"}>
      <div className="container">
        <div id="search" className="d-flex m-1 mx-lg-2 px-3">
          <form className="d-flex">
            <i className="bi bi-search fs-5"></i>
            <input
              className="form-control form-control-sm ml-3 fs-6"
              type="text"
              placeholder="Search renter"
              aria-label="Search"
            />
          </form>
        </div>

        <AddRemoveTable
          headerList={["Driver ID", "First Name", "Last Name"]}
          bodyLines={renters}
          btnValue={"remove"}
          functionBtn={remove}
        />
        {display && (
          <Confirmation
            displayConfirmation={remove}
            yesFunction={yesFunction}
            confirmationText={"Are you sure you want to delete this driver ?"}
          />
        )}
      </div>
    </Main>
  );
};
