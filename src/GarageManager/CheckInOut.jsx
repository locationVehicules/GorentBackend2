import React from "react";
import { Main } from "../components/Main";
import { CheckQRscanner } from "./check";

export const CheckInOut = () => {
  return (
    <Main title={"Check In | Check out"}>
      <div className="qr-scanner w-50 h-50 m-auto mr-2 my-3">
        <CheckQRscanner />
      </div>
    </Main>
  );
};
