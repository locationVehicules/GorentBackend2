export default class CarsAPIs {
  static carsList() {
    return fetch(`http://127.0.0.1:8000/cars/carsList/`)
      .then((response) => response.json())
      .then((data) => data)
      .catch((err) => console.log(err));
  }
  static toolList() {
    return fetch(`http://127.0.0.1:8000/cars/toolList/`)
      .then((response) => response.json())
      .then((data) => data)
      .catch((err) => console.log(err));
  }
  static carDetail(id) {
    return fetch(`http://127.0.0.1:8000/cars/carDetail/${id}`)
      .then((response) => response.json())
      .then((data) => data)
      .catch((err) => console.log(err));
  }
  static ViewCarsDispo(rentDate, returnDate) {
    return fetch("http://127.0.0.1:8000/cars/ViewCarsDispo/", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ issue_date: rentDate, return_date: returnDate }),
    })
      .then((response) => response.json())
      .then((data) => data)
      .catch((err) => console.log(err));
  }
  static ViewToolDispo(rentDate, returnDate) {
    return fetch("http://127.0.0.1:8000/cars/ViewToolDispo/", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ issue_date: rentDate, return_date: returnDate }),
    })
      .then((response) => response.json())
      .then((data) => data)
      .catch((err) => console.log(err));
  }
  static UpdateCarPriceate(id, priceDay, priceHour) {
    return fetch(`http://127.0.0.1:8000/cars/UpdateCarPrice/${id}`, {
      method: "PUT",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ priceD: priceDay, priceH: priceHour }),
    })
      .then((response) => response.json())
      .then((data) => data)
      .catch((err) => console.log(err));
  }
  static UpdateToolPriceate(id, priceNew) {
    
    return fetch(`http://127.0.0.1:8000/cars/UpdateToolPrice/${id}`, {
      method: "PUT",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ price: priceNew }),
    })
      .then((response) => response.json())
      .then((data) => data)
      .catch((err) => console.log(err));
  }
  static UpdateCarParking(id, parkingID, spot_letter, spot_number) {
    return fetch(`http://127.0.0.1:8000/cars/UpdateCarParking/${id}`, {
      method: "PUT",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        parking: parkingID,
        spotLetter: spot_letter,
        spotNumber: spot_number,
      }),
    })
      .then((response) => response.json())
      .then((data) => data)
      .catch((err) => console.log(err));
  }
  static UpdateToolParking(id, parkingID) {
    return fetch(`http://127.0.0.1:8000/cars/UpdateToolParking/${id}`, {
      method: "PUT",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        parking: parkingID,
      }),
    })
      .then((response) => response.json())
      .then((data) => data)
      .catch((err) => console.log(err));
  }

  static UpdateCarState(id, state) {
    return fetch(`http://127.0.0.1:8000/cars/UpdateCarState/${id}`, {
      method: "PUT",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        etat: state,
      }),
    })
      .then((response) => response.json())
      .then((data) => data)
      .catch((err) => console.log(err));
  }

  static DeleteCar(id) {
    return fetch(`http://127.0.0.1:8000/cars/DeleteCar/${id}`, {
      method: "PUT",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        etat: "not available",
      }),
    })
      .then((response) => response)
      .then((data) => data)
      .catch((err) => console.log(err));
  }
  static DeleteTool(id) {
    return fetch(`http://127.0.0.1:8000/cars/DeleteTool/${id}`, {
      method: "PUT",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        etat: "not available",
      }),
    })
      .then((response) => response)
      .then((data) => data)
      .catch((err) => console.log(err));
  }

  static AddCar(data) {
    return fetch(`http://127.0.0.1:8000/cars/AddCar/`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(data),
    })
      .then((response) => response)
      .then((data) => data)
      .catch((err) => console.log(err));
  }

  static AddTool(data) {
    return fetch(`http://127.0.0.1:8000/cars/AddTool/`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(data),
    })
      .then((response) => response)
      .then((data) => data)
      .catch((err) => console.log(err));
  }
}
