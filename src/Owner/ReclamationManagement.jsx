import React, { useEffect, useState } from "react";
import { Main } from "../components/Main";
import { ReplayForm } from "../components/ReplayForm";
import { AdministrationTable } from "../components/tables";
import ReclamationAPIs from "../GetSetData/useAPIs/ReclamationAPIs";

export const ReclamationManagement = () => {
  const [reclamation, setReclamation] = useState(null);
  const [display, setDisplay] = useState(false);
  const [displayTable, setDisplayTable] = useState(false);
  const [selectedReclamation, setSelectedReclamation] = useState(null);
  const reclamationList = [];
  const getReclamationList = async () => {
    await ReclamationAPIs.reclamationList().then((data) => {
      setReclamation(data);
      setDisplayTable(true);
    });
  };

  const submitReplay = async (id, data) => {
    await ReclamationAPIs.reclamationUpdate(id, data).then();
    setDisplayTable(false);
  };
  useEffect(() => {
    getReclamationList();
  }, []);

  useEffect(() => {
    getReclamationList();
    if (displayTable) {
      reclamation.map((r) =>
        reclamationList.push([r.id, r.renter, r.motif, r.response])
      );
    }
  }, [displayTable]);

  const replay = (RecId) => {
    reclamation.map((r) => r.id == RecId && setSelectedReclamation(r));
    display ? setDisplay(false) : setDisplay(true);
  };
  return (
    <Main title={"Reclamation Management"}>
      <div className="container-fluid">
        {displayTable ? (
          <AdministrationTable
            tableTitle={"Reclamation"}
            headerList={["Reclamation ID", "User ID", "Reclamation"]}
            bodyLines={reclamationList}
            btnValue={"Replay"}
            functionBtn={replay}
          />
        ) : (
          <div className="container p-3 my-3 table-con">
            <h2 className="d-flex justify-content-center">
              There is no reclamation{" "}
            </h2>
          </div>
        )}
        {display && (
          <ReplayForm
            ReplayForm={replay}
            ReplayFormTite={"Reclamation"}
            selectedItem={selectedReclamation}
            submitReplay={submitReplay}
          />
        )}
      </div>
    </Main>
  );
};
