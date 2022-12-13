import React, { useState, useEffect } from "react";
import { Link, useParams, useHistory } from "react-router-dom";
import "./meetings.css";
import firebase from "../firebase";
const View = () => {
  let history = useHistory();
  const ref = firebase.firestore().collection("meetings");
  const { id } = useParams();
  const [meeting, setMeeting] = useState({
    name: "",
    email: "",
    number: "",
    id: id,
  });

  const { name, email, numbe } = meeting;
  const onInputChange = (name) => (e) => {
    setMeeting({ ...meeting, [name]: e.target.value });
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
    <div className="container">
      <Link
        className="btn btn-primary d-inline-flex mt-4 ml-4 p-2 d-flex justify-content-end"
        to="/admin"
      >
        Geri
      </Link>
      <div className="mx-auto my-auto py-4" id="view">
        <h2 className="text-center">
          <span className="badge badge-success">Toplantılarım</span>
        </h2>

        <ul className="list-group ">
          <li className="list-group-item list-group-item-action list-group-item-info font-weight-bold ">
            BAŞLIK: {meeting.name}
          </li>
          <li className="list-group-item list-group-item-action list-group-item-primary">
            E-MAIL:{" "}
            <span className="badge badge-primary badge-pill ml-5">
              {meeting.email}
            </span>
          </li>
          <li className="list-group-item list-group-item-action list-group-item-secondary">
            SAAT:
            <span className="badge badge-primary badge-pill ml-5">
              {meeting.number}
            </span>
          </li>
        </ul>
      </div>
    </div>
  );
};
export default View;
