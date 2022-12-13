import React, { useState, useEffect } from "react";
import axios from "axios";
import {Link, useHistory, useParams } from "react-router-dom";
import firebase from "../firebase";
import "./meetings.css";
const ref = firebase.firestore().collection("meetings");
const Edit = () => {
  let history = useHistory();
  const ref = firebase.firestore().collection("meetings");
  const { id } = useParams();
  const [meeting, setMeeting] = useState({
    name: "",
    email: "",
    number: "",

    id: id,
  });

  const { name, email, number } = meeting;
  const onInputChange = (name) => (e) => {
    setMeeting({ ...meeting, [name]: e.target.value });
  };
  const onSubmit = async (e) => {
    e.preventDefault();
    ref
      .doc(meeting.id)
      .update({ name: name, email: email, number: number, id: id })
      .then((res) => console.log("eklendi"));
    history.push("/admin");
  };

  useEffect(() => {
    ref
      .doc(meeting.id)
      .get()
      .then((snapshot) =>
        setMeeting({
          ...snapshot,
          name: snapshot.data().name,
          email: snapshot.data().email,
          number: snapshot.data().number,
          id: snapshot.id,
        })
      );
  }, []);
  return (
    <div className="container mt-4">
    <Link
        className="btn btn-primary d-inline-flex mt-4 ml-4 p-2 d-flex justify-content-end"
        to="/admin"
      >
        Geri
      </Link>
      <div className="mx-auto my-auto shadow p-5" id="edit">
        <h2 className="text-center mb-4">Düzenle</h2>
        <form onSubmit={(e) => onSubmit(e)}>
          <div className="form-group">
            <input
              type="text"
              className="form-control form-control-lg"
              placeholder="Başlık"
              name="name"
              value={name}
              onChange={onInputChange("name")}
            />
          </div>
          <div className="form-group">
            <input
              type="email"
              className="form-control form-control-lg"
              placeholder="Email"
              name="email"
              value={email}
              onChange={onInputChange("email")}
            />
          </div>
          <div className="form-group">
            <input
              type="text"
              className="form-control form-control-lg"
              placeholder="Toplantı Saati"
              name="text"
              value={number}
              onChange={onInputChange("number")}
            />
          </div>

          <button className="btn btn-warning">Güncelle</button>
        </form>
      </div>
    </div>
  );
};
export default Edit;
