import React from "react";

import "../css/tables.css";

export class DisplayTable extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      tableTitle: props.tableTitle,
      headerList: props.headerList,
      bodyLines: props.bodyLines,
    };
  }

  render() {
    const { tableTitle, headerList, bodyLines } = this.state;
    return (
      <div className="container p-3 my-3 table-con">
        <h4> {tableTitle} </h4>
        <div className="table-responsive forscrolling">
          <table className="table table-borderless mt-3 text-center text-nowrap">
            <thead>
              <tr>
                {headerList.map((h, index) => (
                  <th key={index} scope="col">
                    {h}
                  </th>
                ))}
              </tr>
            </thead>

            <tbody>
              {bodyLines.map((l, index) => (
                <tr key={index}>
                  {l.map((c, index) => (
                    <td
                      key={index}
                      className={!isNaN(c) ? "car-mod fs-6" : " "}
                    >
                      {c}
                    </td>
                  ))}
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    );
  }
}

export class AddRemoveTable extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      headerList: props.headerList,
      bodyLines: props.bodyLines,
      btnValue: props.btnValue,
    };
    this.functionBtn = this.props.functionBtn.bind();
  }

  render() {
    const { headerList, bodyLines, btnValue } = this.state;
    return (
      <div className="container p-3 my-3 table-con">
        <div className="table-responsive forscrolling">
          <table className="table table-borderless mt-3 text-center text-nowrap">
            <thead>
              <tr>
                {headerList.map((h, index) => (
                  <th key={index} scope="col">
                    {h}
                  </th>
                ))}
                <th scope="col"></th>
              </tr>
            </thead>

            <tbody>
              {bodyLines.map((l, index) => (
                <tr key={index}>
                  {l.map((c, index) => (
                    <td
                      key={index}
                      className={!isNaN(c) ? "car-mod fs-6" : " "}
                    >
                      {c}
                    </td>
                  ))}
                  <td>
                    <button
                      className="btn border border-secondary"
                      onClick={() => this.functionBtn(l[0])}
                    >
                      {btnValue}
                    </button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    );
  }
}

export class AdministrationTable extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      tableTitle: props.tableTitle,
      headerList: props.headerList,
      bodyLines: props.bodyLines,
    };
    this.functionBtn = this.props.functionBtn.bind();
  }

  render() {
    const { tableTitle, headerList, bodyLines } = this.state;
    return (
      <div className="container p-3 my-3 table-con">
        <h4> {tableTitle} </h4>
        <div className="table-responsive forscrolling">
          <table className="table table-borderless mt-3 text-center text-nowrap">
            <thead>
              <tr>
                {headerList.map((h, index) => (
                  <th key={index} scope="col">
                    {h}
                  </th>
                ))}
                <th scope="col"></th>
              </tr>
            </thead>

            <tbody>
              {bodyLines.map((l, index) => (
                <tr key={index}>
                  {l.map(
                    (c, index) =>
                      index !== l.length - 1 && (
                        <td
                          key={index}
                          className={!isNaN(c) ? "car-mod fs-6" : " "}
                        >
                          {c}
                        </td>
                      )
                  )}
                  <td>
                    <button
                      value={l[l.length - 1]}
                      className="btn border border-secondary"
                      onClick={() => this.functionBtn(l[0])}
                    >
                      {l[l.length - 1] ? "View" : "Replay"}
                    </button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    );
  }
}
