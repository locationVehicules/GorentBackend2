import { BrowserRouter as Router, Route, Routes } from "react-router-dom";

import { LandingPage } from "./publicPages/publicPages";
import { Login, SignUp, GetRenterInfos } from "./publicPages/LogPages";
import { SearchResultPage } from "./publicPages/SearchResultPage";
import { SelectedVehiclePage } from "./publicPages/SelectedVehiclePage";

import { Page404 } from "./components/Page404";
import { Rent } from "./User/Rent";
import { Rentals } from "./User/Rentals";
import { ContactAdministrator } from "./User/ContactAdministrator";
import { Settings } from "./User/Settings";
import { MyContract } from "./User/MyContract";
import { SearchResult } from "./User/SearchResult";
import { SelectedVehicle } from "./User/SelectedVehicle";
import { Payment } from "./User/Payment";

import { ParkingManagement } from "./GarageManager/ParkingManagement";
import { CheckInOut } from "./GarageManager/CheckInOut";

import { UserManagement } from "./Admin/UserManagement";
import { QuestionsManagement } from "./Admin/QuestionsManagement";
import { VehiclesManagement } from "./Admin/VehiclesManagement";
import { ToolsManagement } from "./Admin/ToolsManagement";
import { AgenciesParkings } from "./Admin/AgenciesParkings";

import { IdentifyDriver } from "./Renter/IdentifyDriver";
import { RemoveDriver } from "./Renter/RemoveDriver";
import { AddProblem } from "./Renter/AddProblem";

import { BlackList } from "./Owner/BlackList";
import { ChangePrices } from "./Owner/ChangePrices";
import { ChangeSalaries } from "./Owner/ChangeSalaries";
import { ChangeToolPrices } from "./Owner/ChangeToolPrices";
import { ReclamationManagement } from "./Owner/ReclamationManagement";
import { Status } from "./Owner/Status";

import { RentalsManagement } from "./Secretariat/RentalsManagement";
import { Contract } from "./Secretariat/Contract";

import { AdminApp } from "./Admin/AdminApp";
import { GarageManagerApp } from "./GarageManager/GarageManagerApp";
import { OwnerApp } from "./Owner/OwnerApp";
import { RenterApp } from "./Renter/RenterApp";
import { SecretariatApp } from "./Secretariat/SecretariatApp";

import React, { useState } from "react";

import { Reservation } from "./GetSetData/Contexts";

export const App = () => {
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
  // Reservation data
  const [rentDate, setRentDate] = useState(currentDate);
  const [returnDate, setReturnDate] = useState(afterHcurrentDate);
  const [rentLocation, setRentLocation] = useState("Adrar");
  const [returnLocation, setReturnLocation] = useState("Adrar");
  const [selectedVehicle, setSelectedVehicle] = useState(null);
  const [selectedParking, setSelectedParking] = useState(null);
  let totalHours = (new Date(returnDate) - new Date(rentDate)) / 36e5;
  const [nbHours, setNbHours] = useState(Math.round(totalHours % 24));
  const [nbDays, setNbDay] = useState(Math.round(totalHours / 24));
  const [total, setTotal] = useState(0);
  const [tools, setTools] = useState("");
  const [DriverID, setDriverID] = useState("");
  const [RenterID, setRenterID] = useState("");
  const [payMethod, setPayMethod] = useState("On Ligne");
  const [signatureD, setSignatureD] = useState(null);
  const [signatureR, setSignatureR] = useState(null);
  const [stateR, setStateR] = useState(null);
  const [cardNum, setCardNum] = useState("");
  const [cardDate, setCardDate] = useState("");
  const [cardName, setCardName] = useState("");
  const [promo, setPromo] = useState(0);
  const [bill, setBill] = useState(null);
  const [contract, setContract] = useState(null);

  return (
    <>
      <Reservation.Provider
        value={{
          rentDate: [rentDate, setRentDate],
          returnDate: [returnDate, setReturnDate],
          rentLocation: [rentLocation, setRentLocation],
          returnLocation: [returnLocation, setReturnLocation],
          selectedVehicle: [selectedVehicle, setSelectedVehicle],
          selectedParking: [selectedParking, setSelectedParking],
          nbHours: [nbHours, setNbHours],
          nbDays: [nbDays, setNbDay],
          total: [total, setTotal],
          tools: [tools, setTools],
          driver: [DriverID, setDriverID],
          renter: [RenterID, setRenterID],
          paymentMethod: [payMethod, setPayMethod],
          cardNum: [cardNum, setCardNum],
          cardDate: [cardDate, setCardDate],
          cardName: [cardName, setCardName],
          signatureD: [signatureD, setSignatureD],
          signatureR: [signatureR, setSignatureR],
          stateR: [stateR, setStateR],
          promotion: [promo, setPromo],
          bill: [bill, setBill],
          contract: [contract, setContract],
        }}
      >
        <Router>
          <Routes>
            <Route exact index path="/" element={<LandingPage />} />
            <Route
              exact
              path="SearchResultPage"
              element={<SearchResultPage />}
            />
            <Route
              exact
              path="SelectedVehiclePage"
              element={<SelectedVehiclePage />}
            />
            <Route exact path="GetRenterInfos" element={<GetRenterInfos />} />
            <Route exact path="Login" element={<Login />} />
            <Route exact path="SignUp" element={<SignUp />} />
            <Route path="*" element={<Page404 />} />
            <Route exact path="Admin" element={<AdminApp />}>
              <Route
                path="Admin/User-management"
                element={<UserManagement />}
              />
              <Route
                exact
                path="Admin/Vehicles-management"
                element={<VehiclesManagement />}
              />
              <Route
                exact
                path="Admin/tools-management"
                element={<ToolsManagement />}
              />
              <Route
                exact
                path="Admin/Questions-management"
                element={<QuestionsManagement />}
              />
              <Route
                exact
                path="Admin/Agencies-Parkings"
                element={<AgenciesParkings />}
              />
              <Route path="*" element={<Page404 />} />
            </Route>
            <Route exact path="Owner" element={<OwnerApp />}>
              <Route path="Owner/Black-list" element={<BlackList />} />
              <Route
                path="Owner/Reclamation-management"
                element={<ReclamationManagement />}
              />
              <Route path="Owner/Change-prices" element={<ChangePrices />} />
              <Route
                path="Owner/Change-tools-prices"
                element={<ChangeToolPrices />}
              />
              <Route
                path="Owner/Change-Salaries"
                element={<ChangeSalaries />}
              />
              <Route path="Owner/Status" element={<Status />} />
              <Route path="*" element={<Page404 />} />
            </Route>
            <Route exact path="GarageManager" element={<GarageManagerApp />}>
              <Route
                exact
                path="GarageManager/Change-state"
                element={<ParkingManagement />}
              />
              <Route
                exact
                path="GarageManager/Check-in-out"
                element={<CheckInOut />}
              />

              <Route path="*" element={<Page404 />} />
            </Route>
            <Route exact path="Renter" element={<RenterApp />}>
              <Route path="Renter/Rent" element={<Rent user={"Renter"} />} />
              <Route
                path="Renter/Rent/SearchResult"
                element={<SearchResult user={"Renter"} />}
              />
              <Route
                path="Renter/Rent/SelectedVehicle"
                element={<SelectedVehicle user={"Renter"} />}
              />
              <Route
                path="Renter/Rent/Payment"
                element={<Payment user={"Renter"} />}
              />
              <Route
                path="Renter/Rentals"
                element={<Rentals user={"Renter"} />}
              />
              <Route
                path="Renter/add-problem"
                element={<AddProblem user={"Renter"} />}
              />
              <Route
                path="Renter/Rentals/MyContract"
                element={<MyContract user={"Renter"} />}
              />
              <Route
                path="Renter/Identify-driver"
                element={<IdentifyDriver />}
              />
              <Route path="Renter/Drivers-list" element={<RemoveDriver />} />
              <Route
                path="Renter/Contact-administrator"
                element={<ContactAdministrator />}
              />
              <Route path="Renter/Settings" element={<Settings />} />
              <Route path="*" element={<RenterApp />} />
            </Route>
            <Route exact path="Secretary" element={<SecretariatApp />}>
              <Route
                path="Secretary/Rentals-management"
                element={<RentalsManagement />}
              />
              <Route
                path="Secretary/Rentals-management/Contract"
                element={<Contract user={"Secretary"} />}
              />
              <Route
                path="Secretary/User-management"
                element={<UserManagement />}
              />
              <Route
                exact
                path="Secretary/tools-management"
                element={<ToolsManagement />}
              />
              <Route
                path="Secretary/Vehicles-management"
                element={<VehiclesManagement />}
              />
              <Route path="*" element={<SecretariatApp />} />
            </Route>
          </Routes>
        </Router>
      </Reservation.Provider>
    </>
  );
};
