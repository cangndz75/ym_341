import React, { useState } from "react";
import axios from "axios";
import { useHistory } from "react-router-dom";
import firebase from "../firebase";
import { v4 as uuidv4 } from "uuid";
import "./meetings.css";
const Add = () => {
  let history = useHistory();
  const [meeting, setMeeting] = useState({
    name: "",
    email: "",
    number: "",
    id: uuidv4(),
  });
  const ref = firebase.firestore().collection("meetings");
  const { name, email, number } = meeting;
  const onInputChange = (e) => {
    setMeeting({ ...meeting, [e.target.name]: e.target.value });
  };
  const onSubmit = async (e) => {
    e.preventDefault();
    ref.doc(meeting.id).set(meeting);
    history.push("/admin");
  };
  return (
    <div className="container mt-4">
      <div className="my-auto mx-auto shadow p-5" id="add">
        <h2 className="text-center mb-4">Toplantı Ekle</h2>
        <form onSubmit={(e) => onSubmit(e)}>
          <div className="form-group">
            <input
              type="text"
              autoFocus
              required
              className="form-control form-control-lg"
              placeholder="Başlık"
              name="name"
              value={name}
              onChange={(e) => onInputChange(e)}
            />
          </div>
          <div className="form-group">
            <input
              type="email"
              autoFocus
              required
              className="form-control form-control-lg"
              placeholder="E-mail"
              name="email"
              value={email}
              onChange={(e) => onInputChange(e)}
            />
          </div>
          <div className="form-group">
            <input
              type="text"
              autoFocus
              required
              className="form-control form-control-lg"
              placeholder="Toplantı Saati"
              name="number"
              value={number}
              onChange={(e) => onInputChange(e)}
            />
          </div>

          <button className="btn btn-warning">Ekle</button>
        </form>
      </div>
    </div>
  );
};
export default Add;
