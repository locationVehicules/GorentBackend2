export default class paymentAPIs {
  static Pay(total) {
    return fetch("http://127.0.0.1:8000/payment/Pay/", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        aumount: total,
      }),
    })
      .then((res) => res.json())
      .then((data) => data)
      .catch((err) => console.log(err));
  }
  static PayInfo(data) {
    return fetch("http://127.0.0.1:8000/payment/AddPayment/", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(data),
    })
      .then((res) => res.json())
      .then((data) => data)
      .catch((err) => console.log(err));
  }

  static updatePayInfo(id,data) {
    return fetch(`http://127.0.0.1:8000/payment/UpdatePayment/${id}`, {
      method: "PUT",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(data),
    })
      .then((res) => res.json())
      .then((data) => data)
      .catch((err) => console.log(err));
  }
}
