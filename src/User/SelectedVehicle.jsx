import React from "react";
import { Main } from "../components/Main";
import { ScrollTop } from "../components/ScrollTop";

import {
  VehicleCard,
  Location,
  Accessories,
} from "../publicPages/SelectedVehiclePage";

export const SelectedVehicle = ({ user }) => {
  window.scrollTo({
    top: 0,
    behavior: "smooth",
  });
  return (
    <Main title={"Rent"}>
      <ScrollTop />
      <VehicleCard path={`${user}/${user}/Rent/SearchResult`} />
      <Location />
      <Accessories path={`${user}/${user}/Rent/Payment`} />
    </Main>
  );
};
