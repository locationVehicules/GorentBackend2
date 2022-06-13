export default class ReclamationAPIs {
  static reclamationList() {
    return fetch(`http://127.0.0.1:8000/reclam/reclamationList`)
      .then((response) => response.json())
      .then((data) => data)
      .catch((err) => console.log(err));
  }

  static reclamationDetail(id) {
    return fetch(`http://127.0.0.1:8000/reclam/reclamationDetail/${id}`)
      .then((response) => response.json())
      .then((data) => data)
      .catch((err) => console.log(err));
  }

  static reclamationCreate(data) {
    return fetch(`http://127.0.0.1:8000/reclam/reclamationCreate`, {
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

  static reclamationUpdate(id, data) {
    return fetch(`http://127.0.0.1:8000/reclam/reclamationUpdate/${id}`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(data),
    })
      .then((response) => response.json())
      .catch((err) => console.log(err));
  }

  static reclamationDelete(id) {
    return fetch(`http://127.0.0.1:8000/reclam/reclamationDelete/${id}`)
      .then((response) => response.json())
      .then((data) => data)
      .catch((err) => console.log(err));
  }
}
