export default class ContartAPIs {
  static ContratList() {
    return fetch(`http://127.0.0.1:8000/Contrat/ContratList/`)
      .then((response) => response.json())
      .then((data) => data)
      .catch((err) => console.log(err));
  }

  static ContratDetail(id) {
    return fetch(`http://127.0.0.1:8000/Contrat/ContratDetail/${id}`)
      .then((response) => response.json())
      .then((data) => data)
      .catch((err) => console.log(err));
  }

  static AddContrat(data) {
    return fetch(`http://127.0.0.1:8000/Contrat/AddContrat/`, {
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

  static ContratUpdate(id , signatureData) {
    return fetch(`http://127.0.0.1:8000/Contrat/ContratUpdate/${id}`, {
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

  static deleteContrat(id) {
    return fetch(`http://127.0.0.1:8000/Contrat/deleteContrat/${id}`)
      .then((response) => response.json())
      .then((data) => data)
      .catch((err) => console.log(err));
  }
}
