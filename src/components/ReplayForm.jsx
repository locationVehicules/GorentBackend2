import React, { useState } from "react";

export const ReplayForm = ({
  ReplayForm,
  ReplayFormTite,
  selectedItem,
  submitReplay,
}) => {
  const [replay, setReplay] = useState(selectedItem.response);
  const Replay = () => {
    if (selectedItem.response) {
      ReplayForm();
    } else {
      let currentDate = new Date();
      currentDate.setMinutes(
        currentDate.getMinutes() - currentDate.getTimezoneOffset()
      );
      currentDate.setHours(currentDate.getHours() + 1);
      currentDate = currentDate.toISOString().slice(0, 10);

      console.log(selectedItem);
      let data = selectedItem.motif
        ? {
            motif: selectedItem.motif,
            response: replay,
            post_date: selectedItem.post_date,
            response_date: currentDate,
            renter: selectedItem.renter,
            Owner: JSON.parse(localStorage.getItem("owner")),
          }
        : {
            question: selectedItem.question,
            response: replay,
            post_date: selectedItem.post_date,
            response_date: currentDate,
            admin: JSON.parse(localStorage.getItem("admin")),
            Renter: selectedItem.Renter,
          };
      submitReplay(selectedItem.id, data);
      ReplayForm();
    }
  };
  return (
    <div
      className="modal fade show d-block"
      id="exampleModalCenter"
      tabIndex="-1"
      role="dialog"
    >
      <div
        className="modal-dialog modal-dialog-centered modal-lg"
        role="dialog"
      >
        <div className="modal-content">
          <div className="modal-header">
            <h4 className="modal-title" id="Ckeck Form">
              {`${ReplayFormTite} : ${selectedItem.id} `}
            </h4>
          </div>
          <div className="modal-body">
            <h4 htmlFor="Answers" className="form-label">
              Replay
            </h4>
            <textarea
              className="form-control"
              id="Replay"
              rows="8"
              value={replay ? replay : " "}
              onChange={(e) => setReplay(e.target.value)}
              readOnly={selectedItem.response ? true : false}
              placeholder={
                selectedItem.response
                  ? `${selectedItem.response}`
                  : "Replay here..."
              }
            ></textarea>

            <div className="modal-footer">
              <button
                type="button"
                className="btn"
                data-dismiss="modal"
                onClick={ReplayForm}
                style={{ background: "var(--bg_icon_color)", color: "black" }}
              >
                Close
              </button>
              <button
                type="button"
                className="btn"
                data-dismiss="modal"
                onClick={() => Replay()}
                style={{ background: "var(--btn_color1)", color: "white" }}
              >
                {selectedItem.response ? "OK" : "Send"}
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};
