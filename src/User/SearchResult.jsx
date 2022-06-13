import React from "react";
import { Main } from "../components/Main";
import { ScrollTop } from "../components/ScrollTop";
import {
  DisplatDatesPlaces,
  Catégories,
} from "../publicPages/SearchResultPage";

export const SearchResult = ({ user }) => {
  window.scrollTo({
    top: 0,
    behavior: "smooth",
  });
  return (
    <Main title={"Rent"}>
      <ScrollTop />
      <DisplatDatesPlaces />
      <Catégories
        path={`${user}/${user}/Rent/SelectedVehicle`}
      />
    </Main>
  );
};
