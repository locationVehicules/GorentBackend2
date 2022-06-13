export default class AdministrationAPIs {
  static UserDetail(id) {
    return fetch(`http://127.0.0.1:8000/staff/accountDetail/${id}`)
      .then((response) => response.json())
      .then((data) => data)
      .catch((err) => console.log(err));
  }

  static userUpdate(id) {
    return fetch(`http://127.0.0.1:8000/staff/accountUpdate/${id}`)
      .then((response) => response.json())
      .then((data) => data)
      .catch((err) => console.log(err));
  }

  static UserRegister() {
    return fetch(`http://127.0.0.1:8000/staff/signup/`)
      .then((response) => response.json())
      .then((data) => data)
      .catch((err) => console.log(err));
  }

  static userLogin(data) {
    return fetch(`http://127.0.0.1:8000/staff/login/`,{
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

  static userLogout() {
  return fetch(`http://127.0.0.1:8000/staff/logout/`)
    .then((response) => response.json())
    .then((data) => data)
    .catch((err) => console.log(err));
}

  static BlackList() {
  return fetch(`http://127.0.0.1:8000/staff/BlackList/`)
    .then((response) => response.json())
    .then((data) => data)
    .catch((err) => console.log(err));
}

  static BlackListDetail(id) {
  return fetch(`http://127.0.0.1:8000/staff/BlackListDetail/${id}`)
    .then((response) => response.json())
    .then((data) => data)
    .catch((err) => console.log(err));
}

  static AddBlackList() {
  return fetch(`http://127.0.0.1:8000/staff/addBlackList/`)
    .then((response) => response.json())
    .then((data) => data)
    .catch((err) => console.log(err));
}

  static BlackListUpdate(id) {
  return fetch(`http://127.0.0.1:8000/staff/UpdateBlackList/${id}`)
    .then((response) => response.json())
    .then((data) => data)
    .catch((err) => console.log(err));
}

  static blackListDelete(id) {
  return fetch(`http://127.0.0.1:8000/staff/deleteBlackList/${id}`, {
    method: "DELETE",
    headers: {
      "Content-Type": "application/json",
    },
  })
    .then((response) => response.json())
    .then((data) => data)
    .catch((err) => console.log(err));
}

  static RenterList() {
  return fetch(`http://127.0.0.1:8000/staff/RenterList/`)
    .then((response) => response.json())
    .then((data) => data)
    .catch((err) => console.log(err));
}

  static RenterDetail(id) {
  return fetch(`http://127.0.0.1:8000/staff/RenterDetail/${id}`)
    .then((response) => response.json())
    .then((data) => data)
    .catch((err) => console.log(err));
}

  static AgencyDetail(id) {
  return fetch(`http://127.0.0.1:8000/staff/getAgencyDetail/${id}`)
    .then((response) => response.json())
    .then((data) => data)
    .catch((err) => console.log(err));
}

  static DriverList() {
  return fetch(`http://127.0.0.1:8000/staff/DriverList/`)
    .then((response) => response.json())
    .then((data) => data)
    .catch((err) => console.log(err));
}
  static EnterpriseDriverList(id) {
  return fetch(`http://127.0.0.1:8000/staff/enterpriseDriverList/${id}`)
    .then((response) => response.json())
    .then((data) => data)
    .catch((err) => console.log(err));
}

  static DriverDetail(id) {
  return fetch(`http://127.0.0.1:8000/staff/DriverDetail/${id}`)
    .then((response) => response.json())
    .then((data) => data)
    .catch((err) => console.log(err));
}

  static AddRenter() {
  return fetch(`http://127.0.0.1:8000/staff/addRenter/`)
    .then((response) => response.json())
    .then((data) => data)
    .catch((err) => console.log(err));
}

  static RenterUpdate(id) {
  return fetch(`http://127.0.0.1:8000/staff/UpdateRenter/${id}`)
    .then((response) => response.json())
    .then((data) => data)
    .catch((err) => console.log(err));
}

  static deleteRenter(id) {
  return fetch(`http://127.0.0.1:8000/staff/deleteRenter/${id}`)
    .then((response) => response.json())
    .then((data) => data)
    .catch((err) => console.log(err));
}

  static viewAllDriverDispo(rentDate, returnDate) {
  return fetch(`http://127.0.0.1:8000/staff/DriverDispo/`, {
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

  static SalariesList() {
  return fetch(`http://127.0.0.1:8000/staff/SalariesList/`)
    .then((response) => response.json())
    .then((data) => data)
    .catch((err) => console.log(err));
}

  static UpdateSalaries(id, data) {
  return fetch(`http://127.0.0.1:8000/staff/SalariesUpdate/${id}`, {
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
}
