export default class ProblemeAPIs {
  static problemeList(id) {
    return fetch(`http://127.0.0.1:8000/probleme/problemeList/${id}`)
      .then((response) => response.json())
      .then((data) => data)
      .catch((err) => console.log(err));
  }

  static problemeDetail(id) {
    return fetch(`http://127.0.0.1:8000/probleme/problemeDetail/${id}`)
      .then((response) => response.json())
      .then((data) => data)
      .catch((err) => console.log(err));
  }

  static addprobleme() {
    return fetch(`http://127.0.0.1:8000/probleme/addprobleme/`)
      .then((response) => response.json())
      .then((data) => data)
      .catch((err) => console.log(err));
  }

  static problemeUpdate(id, toDay , soloved , Gid) {
    return fetch(`http://127.0.0.1:8000/probleme/problemeUpdate/${id}`, {
      method: "PUT",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({response_date: toDay, response: soloved, garage_manager: Gid}),
    })
      .then((response) => response.json())
      .then((data) => data)
      .catch((err) => console.log(err));
  }
  static deleteleprobleme(id) {
    return fetch(`http://127.0.0.1:8000/probleme/deleteleprobleme/${id}`)
      .then((response) => response.json())
      .then((data) => data)
      .catch((err) => console.log(err));
  }
}
