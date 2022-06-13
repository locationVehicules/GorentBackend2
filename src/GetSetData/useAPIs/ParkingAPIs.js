export default class ParkingAPIs {
  static parckingList() {
    return fetch(`http://127.0.0.1:8000/parck/parckingList/`)
      .then((response) => response.json())
      .then((data) => data)
      .catch((err) => console.log(err));
  }

  static parckingDetail(id) {
    return fetch(`http://127.0.0.1:8000/parck/parckingDetail/${id}`)
      .then((response) => response.json())
      .then((data) => data)
      .catch((err) => console.log(err));
  }

  static addparcking() {
    return fetch(`http://127.0.0.1:8000/parck/addparcking/`)
      .then((response) => response.json())
      .then((data) => data)
      .catch((err) => console.log(err));
  }

  static parckingUpdate(id) {
    return fetch(`http://127.0.0.1:8000/parck/parckingUpdate/${id}`)
      .then((response) => response.json())
      .then((data) => data)
      .catch((err) => console.log(err));
  }

  static deleteleParcking(id) {
    return fetch(`http://127.0.0.1:8000/parck/deleteleParcking/${id}`)
      .then((response) => response.json())
      .then((data) => data)
      .catch((err) => console.log(err));
  }
}
