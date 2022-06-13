export default class BillAPIs {
  static BillList() {
    return fetch(`http://127.0.0.1:8000/Bill/BillList/`)
      .then((response) => response.json())
      .then((data) => data)
      .catch((err) => console.log(err));
  }

  static BillDetail(id) {
    return fetch(`http://127.0.0.1:8000/Bill/BillDetail/${id}`)
      .then((response) => response.json())
      .then((data) => data)
      .catch((err) => console.log(err));
  }
  static AddBill(data) {
    return fetch("http://127.0.0.1:8000/Bill/AddBill/", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(data),
    })
      .then((response) => response.json())
      .then((data) => data)
      .catch((err) => console.log(err));
  }
  static BillUpdate(id, data) {
    return fetch(`http://127.0.0.1:8000/Bill/BillUpdate/${id}`, {
      method: "PUT",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(data),
    })
      .then((response) => response.json())
      .then((data) => data)
      .catch((err) => console.log(err));
  }
  static deleteBill(id, data) {
    return fetch(`http://127.0.0.1:8000/Bill/deleteBill/${id}`, {
      method: "DELETE",
      headers: {
        "Content-Type": "application/json",
      },
    })
      .then((response) => response.json())
      .then((data) => data)
      .catch((err) => console.log(err));
  }
}
