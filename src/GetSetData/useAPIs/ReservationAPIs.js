export default class ReservationAPIs {
  static async reservationCarOnLigne(data, driver) {
    let d = data;
    let rentDate = new Date(d.rentDate[0]);
    let returnDate = new Date(d.returnDate[0]);
    rentDate = `${rentDate.getFullYear()}-${
      rentDate.getMonth() + 1
    }-${rentDate.getDate()} ${rentDate.getHours()}:${rentDate.getMinutes()}:00`;
    returnDate = `${returnDate.getFullYear()}-${
      returnDate.getMonth() + 1
    }-${returnDate.getDate()} ${returnDate.getHours()}:${returnDate.getMinutes()}:00`;
    let renter = JSON.parse(localStorage.getItem("myId"));
    let tools;
    if (d.tools[0] !== "") {
      tools = d.tools[0].split("-").map(Number);
    }
    return await fetch(`http://127.0.0.1:8000/reservation/reservationCar/`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        issue_date: rentDate,
        return_date: returnDate,
        issue_location: d.rentLocation[0],
        return_location: d.returnLocation[0],
        car_rented: d.selectedVehicle[0].id,
        sort_checker: null,
        enter_checker: null,
        Driver: driver,
        Renter: renter,
        state: d.stateR[0],
        tool_rented: tools,
      }),
    })
      .then((response) => response.json())
      .then((data) => data)
      .catch((err) => console.log(err));
  }
  static reservationList() {
    return fetch(`http://127.0.0.1:8000/reservation/reservationList/`)
      .then((response) => response.json())
      .then((data) => data)
      .catch((err) => console.log(err));
  }
  static userReservationList(id) {
    return fetch(`http://127.0.0.1:8000/reservation/userReservationList/${id}`)
      .then((response) => response.json())
      .then((data) => data)
      .catch((err) => console.log(err));
  }
  static reservationDetail(id) {
    return fetch(`http://127.0.0.1:8000/reservation/reservationDetail/${id}`)
      .then((response) => response.json())
      .then((data) => data)
      .catch((err) => console.log(err));
  }

  static ExtendReservationDate(id) {
    return fetch(
      `http://127.0.0.1:8000/reservation/ExtendReservationDate/${id}`
    )
      .then((response) => response.json())
      .then((data) => data)
      .catch((err) => console.log(err));
  }
  static rcancelreservation(id) {
    return fetch(`http://127.0.0.1:8000/reservation/cancelreservation/${id}`)
      .then((response) => response.json())
      .then((data) => data)
      .catch((err) => console.log(err));
  }

  static ReservationUpdate(id, signatureData) {
    return fetch(`http://127.0.0.1:8000/reservation/ReservationUpdate/${id}`, {
      method: "PUT",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(signatureData),
    })
      .then((response) => response.json())
      .then((data) => data)
      .catch((err) => console.log(err));
  }
}
