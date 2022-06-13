export default class QuestionAPIs {
  static QuestionList() {
    return fetch(`http://127.0.0.1:8000/question/QuestionList/`)
      .then((response) => response.json())
      .then((data) => data)
      .catch((err) => console.log(err));
  }
  static QuestionDetail(id) {
    return fetch(`http://127.0.0.1:8000/question/QuestionDetail/${id}`)
      .then((response) => response.json())
      .then((data) => data)
      .catch((err) => console.log(err));
  }
  static AddQuestion(data) {
    return fetch(`http://127.0.0.1:8000/question/AddQuestion/`, {
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
  static QuestionUpdate(id, data) {
    return fetch(`http://127.0.0.1:8000/question/QuestionUpdate/${id}`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(data),
    })
      .then((response) => response.json())
      .catch((err) => console.log(err));
  }
  static deleteQuestion(id) {
    return fetch(`http://127.0.0.1:8000/question/deleteQuestion/${id}`)
      .then((response) => response.json())
      .then((data) => data)
      .catch((err) => console.log(err));
  }
  static postQuestion(data) {
    return fetch(`http://127.0.0.1:8000/question/postQuestion/`, {
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
}
