import { useState, useEffect } from "react";
import { Main } from "../components/Main";
import { ReplayForm } from "../components/ReplayForm";
import { AdministrationTable } from "../components/tables";

import QuestionAPIs from "../GetSetData/useAPIs/QuestionAPIs";

export const QuestionsManagement = () => {
  const [questions, setquestions] = useState(null);
  const [display, setDisplay] = useState(false);
  const [displayTable, setDisplayTable] = useState(false);
  const [selectedquestions, setSelectedquestions] = useState(null);
  const questionsList = [];
  const getQuestionList = async () => {
    await QuestionAPIs.QuestionList().then((data) => {
      setquestions(data);
      setDisplayTable(true);
    });
  };

  const submitReplay = async (id, data) => {
    await QuestionAPIs.QuestionUpdate(id, data);
    setDisplayTable(false);
  };
  useEffect(() => {
     getQuestionList();
  }, []);
  useEffect(() => {
    getQuestionList();
    (displayTable) &&
      questions.map((q) => 
        questionsList.push([q.id, q.question, q.response])); 
  }, [displayTable]);

  const replay = (QuesId) => {
    questions.map((q) => q.id == QuesId && setSelectedquestions(q));
    display ? setDisplay(false) : setDisplay(true);
  };
  return (
    <Main title={"Questions Management"}>
      <div className="container-fluid">
        {displayTable ? (
          <AdministrationTable
            tableTitle={"Questions"}
            headerList={["Questions ID", "Questions"]}
            bodyLines={questionsList}
            btnValue={"Replay"}
            functionBtn={replay}
          />
        ) : (
          <div className="container p-3 my-3 table-con">
            <h2 className="d-flex justify-content-center">
              There is no questions
            </h2>
          </div>
        )}
        {display && (
          <ReplayForm
            ReplayForm={replay}
            ReplayFormTite={"questions"}
            selectedItem={selectedquestions}
            submitReplay={submitReplay}
          />
        )}
      </div>
    </Main>
  );
};
