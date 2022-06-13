import React, { Component } from "react";
import {
  NavBar,
  FindVehicle,
  ServiceAndOffers,
  HowItWork,
  QuestionAndAnswer,
  Footer,
} from "./LandingPage";
import "../css/style.css";
import { ScrollTop } from "../components/ScrollTop";

export class LandingPage extends Component {
  constructor(props) {
    super(props);
    document.body.style.background = "var(--body-color1)";
  }
  render() {
    window.scrollTo({
      top: 0,
      behavior: "smooth",
    });
    return (
      <>
        <NavBar />
        <ScrollTop />
        <FindVehicle path={`SearchResultPage`} />
        <ServiceAndOffers />
        <HowItWork />
        <QuestionAndAnswer />
        <Footer />
      </>
    );
  }
}
