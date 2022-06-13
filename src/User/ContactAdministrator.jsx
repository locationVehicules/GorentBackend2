import React, { useState } from "react";
import Select from "react-select";
import QrReader from "react-qr-scanner";
import { Main } from "../components/Main";
import QuestionAPIs from "../GetSetData/useAPIs/QuestionAPIs";
import ReclamationAPIs from "../GetSetData/useAPIs/ReclamationAPIs";

export const ContactAdministrator = () => {
  const [type, setType] = useState("Questions");
  const [questionsActive, setQuestionsActive] = useState("active");
  const [reclamationActive, setReclamationActive] = useState("");
  const [isProblem, setIsProblem] = useState(false);
  const [problemActive, setProblemActive] = useState("");
  const [replay, setReplay] = useState("");
  const [display, setDisplay] = useState(false);

  const problemType = [
    { value: "mechanical", label: "mechanical" },
    { value: "electrical", label: "electrical" },
    { value: "suspension", label: "suspension" },
    { value: "cleaning", label: "cleaning" },
    { value: "body", label: "body" },
    { value: "other", label: "other" },
  ];
  const ChangeFunction = (e) => {
    setType(e.target.value);
    setReplay("");
    switch (type) {
      case "Questions":
        setQuestionsActive("active");
        setReclamationActive("");
        setProblemActive("");
        setIsProblem(false);
        break;
      case "Reclamation":
        setQuestionsActive("");
        setReclamationActive("active");
        setProblemActive("");
        setIsProblem(false);
        break;
      default:
        break;
    }
  };

  const sendQuestion = async () => {
    let currentDate = new Date();
    currentDate.setMinutes(
      currentDate.getMinutes() - currentDate.getTimezoneOffset()
    );
    currentDate.setHours(currentDate.getHours() + 1);
    currentDate = currentDate.toISOString().slice(0, 10);
    let data = {
      question: replay,
      post_date: currentDate,
      Renter: JSON.parse(localStorage.getItem("myId")),
    };
    await QuestionAPIs.postQuestion(data);
    setReplay("");
  };
  const sendReclamation = async () => {
    let currentDate = new Date();
    currentDate.setMinutes(
      currentDate.getMinutes() - currentDate.getTimezoneOffset()
    );
    currentDate.setHours(currentDate.getHours() + 1);
    currentDate = currentDate.toISOString().slice(0, 10);
    let data = {
      motif: replay,
      response: null,
      post_date: currentDate,
      response_date: null,
      renter: JSON.parse(localStorage.getItem("myId")),
      Owner: null,
    };
    await ReclamationAPIs.reclamationCreate(data);
    setReplay("");
  };

  const contact = () => {
    switch (type) {
      case "Questions":
        sendQuestion();
        break;
      case "Reclamation":
        sendReclamation();
        break;
      default:
        break;
    }
  };

  return (
    <Main title={"Contact Administrator"}>
      <div className="btn-group d-flex flex-wrap" role="group" aria-label="">
        <button
          type="button"
          className={`btn btn btn-secondary navbtns ${questionsActive}`}
          onClick={ChangeFunction}
          value="Questions"
          style={{
            backgroundColor: "var(--btn_color1)",
            fontWeight: "bold",
          }}
        >
          Questions
        </button>
        <button
          type="button"
          className={`btn btn btn-secondary navbtns ${reclamationActive}`}
          onClick={ChangeFunction}
          value="Reclamation"
          style={{
            backgroundColor: "var(--btn_color1)",
            fontWeight: "bold",
          }}
        >
          Reclamation
        </button>
      </div>
      <form className="d-flex flex-column m-auto w-100 my-3">
        <textarea
          className="form-control"
          id="Replay"
          rows="10"
          maxLength="250"
          placeholder="Write here..."
          value={replay}
          onChange={(e) => setReplay(e.target.value)}
        ></textarea>
        <div className="btn d-flex justify-content-end">
          <button
            type="button"
            className="btn d-flex justify-content-center align-items-center"
            data-dismiss="modal"
            onClick={() => contact()}
            style={{
              background: "var(--btn_color1)",
              color: "white",
              width: "100px",
            }}
          >
            send
          </button>
        </div>
      </form>
    </Main>
  );
};
