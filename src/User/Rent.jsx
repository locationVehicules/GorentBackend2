
import React, { useState, useRef, useContext, useEffect } from "react";

import { Main } from "../components/Main";
import { FindVehicle } from "../publicPages/LandingPage";
import { Reservation } from "../GetSetData/Contexts";

export const Rent = ({ user }) => {
  const context = useContext(Reservation);
  let currentDate = new Date();
  currentDate.setMinutes(
    currentDate.getMinutes() - currentDate.getTimezoneOffset()
  );
  currentDate.setHours(currentDate.getHours() + 1);
  currentDate = currentDate.toISOString().slice(0, 16);

  let afterHcurrentDate = new Date();
  afterHcurrentDate.setMinutes(
    afterHcurrentDate.getMinutes() - afterHcurrentDate.getTimezoneOffset()
  );
  afterHcurrentDate.setHours(afterHcurrentDate.getHours() + 25);
  afterHcurrentDate = afterHcurrentDate.toISOString().slice(0, 16);

  useEffect(() => {
    context.rentDate[1](currentDate);
    context.returnDate[1](afterHcurrentDate);
    context.rentLocation[1]("Adrar");
    context.returnLocation[1]("Adrar");
    context.selectedVehicle[1](null);
    context.selectedParking[1](null);
    let totalHours = (new Date(afterHcurrentDate) - new Date(currentDate)) / 36e5;
    context.nbHours[1](Math.round(totalHours % 24));
    context.nbDays[1](Math.round(totalHours / 24));
    context.total[1](0);
    context.tools[1]("");
    context.driver[1]("");
    context.renter[1]("");
    context.paymentMethod[1]("On Ligne");
    context.signatureD[1](null);
    context.signatureR[1](null);
    context.stateR[1](null);
    context.cardNum[1]("");
    context.cardDate[1]("");
    context.cardName[1]("");
    context.promotion[1](0);
    context.bill[1](null);
    context.contract[1](null);
  },[])
  return (

    <Main title={"Rent"}>
      <FindVehicle path={`${user}/${user}/Rent/SearchResult`} />
    </Main>
  );
};
