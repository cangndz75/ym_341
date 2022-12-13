import React, { useState, useEffect } from "react";
import axios from "axios";
import { Link } from "react-router-dom";
import Navbar from "./Navbar";
import { MdRemoveRedEye } from "react-icons/md";
import { MdDelete } from "react-icons/md";
import { RiEdit2Fill } from "react-icons/ri";
import { BsListNested } from "react-icons/bs";
import { GiOpenedFoodCan } from "react-icons/gi";
import firebase from "../firebase";
import { v4 as uuidv4 } from "uuid";
const Admin = (props) => {
  const [meetings, setMeeting] = useState([]);
  const ref = firebase.firestore().collection("meetings");
  useEffect(() => {
    loadMeetings();
  }, []);
  const loadMeetings = () => {
    ref.onSnapshot((querySnapshot) => {
      const items = [];
      querySnapshot.forEach((doc) => {
        items.push(doc.data());
      });
      setMeeting(items);
    });
  };
  const deleteMeeting = (meeting) => {
    ref.doc(meeting.id).delete();
    loadMeetings();
  };
  return (
    <div>
      <Navbar handleLogout={props.handleLogout} />
      <div className="container">
        <div className="py-4">
          <div className="d-flex justify-content-between">
            <h3>
              <span className="badge badge-success d-inline-flex py-2">
                <BsListNested /> Toplantılar
              </span>
            </h3>
            <Link
              className="btn btn-outline-dark d-inline-flex mb-2"
              to="/admin/Add"
            >
              Toplantı Ekle
            </Link>
          </div>
          <div className="table-responsive">
            <table className="table border shadow">
              <thead className="thead-dark">
                <tr>
                  <th scope="col">
                    <GiOpenedFoodCan />
                  </th>
                  <th scope="col">Başlık</th>
                  <th scope="col">Katılacaklar</th>
                  <th scope="col">Toplantı Saati</th>
                  <th>Detay/Düzenle/Sil</th>
                </tr>
              </thead>
              <tbody>
                {meetings.map((meeting, index) => (
                  <tr>
                    <th scope="row">{index + 1}</th>
                    <td>{meeting.name}</td>
                    <td>{meeting.email}</td>
                    <td>{meeting.number}</td>
                    <td>
                      <Link
                        className="btn btn-primary m-2"
                        to={`/admin/View/${meeting.id}`}
                      >
                        <MdRemoveRedEye />
                      </Link>
                      <Link
                        className="btn btn-outline-primary m-2"
                        to={`/admin/Edit/${meeting.id}`}
                      >
                        <RiEdit2Fill />
                      </Link>
                      <Link
                        className="btn btn-danger m-2"
                        onClick={() => deleteMeeting(meeting)}
                      >
                        <MdDelete />
                      </Link>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Admin;
