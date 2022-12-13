import React from "react";
import { useState, useEffect } from "react";
import axios from "axios";
import "./Users.css";
import Navbar from "./Navbar";
import firebase from "../firebase";
const User = (props) => {
  const [searchMeeting, setSearchMeeting] = useState([]);
  const [meetings, setMeeting] = useState([]);
  const ref = firebase.firestore().collection("meetings");
  useEffect(() => {
    loadMeetings();
  }, []);
  const loadMeetings = async () => {
    ref.onSnapshot((querySnapshot) => {
      const items = [];
      querySnapshot.forEach((doc) => {
        items.push(doc.data());
      });
      setMeeting(items);
    });
  };
  return (
    <div id="meetings">
      <Navbar />
      <input
        id="search"
        className="ml-4 mt-3 pl-3 py-2"
        type="text"
        placeholder="Ara..."
        onChange={(event) => {
          setSearchMeeting(event.target.value);
        }}
      />
      <div className="shadow mb-5">
        <div className="w-100 p-1 text-center">
          <h1 className="mt-2">Toplantılarım</h1>
        </div>
      </div>
      <div className="map">
        {meetings
          .filter((val) => {
            if (searchMeeting == "") {
              return val;
            } else if (
              val.name.toLowerCase().includes(searchMeeting.toLowerCase())
            ) {
              return val;
            }
          })
          .map((meeting, index) => (
            <section id="meetings2">
              <div className="ml-3 mb-5 mr-3 text-center">
                <div className="row">
                  <div>
                    <div className="card col">
                      <div className="card-body">
                        <h3 className="mb-4">{meeting.name}</h3>
                        <div className="text-left">
                          <h5>
                            E-mail:
                            <span className="ml-2">{meeting.email}</span>g
                          </h5>
                          <hr />
                          <h5>
                            Toplantı Saati:
                            <span className="ml-2">{meeting.number}</span>g
                          </h5>
                          <hr />
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </section>
          ))}
      </div>
    </div>
  );
};
export default User;
