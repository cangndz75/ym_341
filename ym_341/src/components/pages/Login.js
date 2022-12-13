import React from "react";
import { Link, Redirect, useHistory } from "react-router-dom";
import firebase from "../firebase";
import { useState, useEffect } from "react";
import { AiFillEye } from "react-icons/ai";
import { AiFillEyeInvisible } from "react-icons/ai";
import { FcGoogle } from "react-icons/fc";
import "./Register.css";
const setLocalStorage = (key, value) => {
  if (window !== "undefined") {
    localStorage.setItem(key, JSON.stringify(value));
  }
};

const Login = () => {
  let history = useHistory();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [emailError, setEmailError] = useState("");
  const [passwordError, setPasswordError] = useState("");

  const clearInputs = () => {
    setEmail("");
    setPassword("");
  };
  const clearErrors = () => {
    setEmailError("");
    setPasswordError("");
  };
  const handleSignInwithGoogle = () => {
    if (document.getElementById("User").checked) {
      var provider = new firebase.auth.GoogleAuthProvider();
      firebase
        .auth()
        .signInWithPopup(provider)
        .then((res) => {
          if (window !== "undefined") {
            if (localStorage.getItem("user") !== null) {
              localStorage.removeItem("user");
            } else {
              localStorage.removeItem("admin");
            }
          }
          setLocalStorage("user", res.user);
          console.log(res.user);
          history.push("/user");
        })
        .catch((error) => {
          var errorCode = error.code;
          var errorMessage = error.message;
          var email = error.email;
          var credential = error.credential;
          // ...
        });
    } else if (document.getElementById("Admin").checked) {
      window.alert("Admin girişi yapın.");
    } else {
      window.alert("Kullanıcı seçin.");
    }
  };
  const handleLogin = () => {
    if (document.getElementById("User").checked) {
      clearErrors();
      firebase
        .auth()
        .signInWithEmailAndPassword(email, password)
        .then((res) => {
          if (window !== "undefined") {
            if (localStorage.getItem("user") !== null) {
              localStorage.removeItem("user");
            } else {
              localStorage.removeItem("admin");
            }
          }
          setLocalStorage("user", res.user);
          console.log(res.user);
          history.push("/user");
        })
        .catch((err) => {
          clearInputs();
          switch (err.code) {
            case "auth/invalid-email":
            case "auth/user-disabled":
            case "auth/user-not-found":
              setEmailError(err.message);
              break;
            case "auth/wrong-password":
              setPasswordError(err.message);
              break;
          }
        });
    } else if (document.getElementById("Admin").checked) {
      if (email === "admin@gmail.com" && password === "admin123") {
        if (window !== "undefined") {
          if (localStorage.getItem("user") !== null) {
            localStorage.removeItem("user");
          } else {
            localStorage.removeItem("admin");
          }
        }
        setLocalStorage("admin", {
          email: "admin@gmail.com",
          password: "admin123",
        });
        history.push("/admin");
      } else {
        window.alert("Admin olarak giriş yapın!");
      }
    } else {
      window.alert("Boşlukları doldurun.");
    }
  };

  const [showPassword, setShowPassword] = useState(false);
  return (
    <div className="container py-5 mt-5">
      <div className="mx-auto my-auto shadow p-5" id="container-login">
        <h2 className="text-center mb-4">OverReact</h2>
        <div className="form-group">
          <input
            type="email"
            autoFocus
            required
            className="form-control form-control-lg"
            placeholder="E-mail giriniz"
            name="Email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
          />
          {emailError ? (
            <p className=" alert alert-danger mt-1 errorMsg">{emailError}</p>
          ) : (
            <p></p>
          )}
        </div>
        <div className="form-group position-relative">
          <input
            type={showPassword ? "text" : "password"}
            autoFocus
            required
            className="form-control form-control-lg"
            placeholder="Şifre giriniz"
            name="Password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
          />
          <div class="text-right" id="toggler-icon">
            <button
              class="btn btn-light py-2"
              id="toggle-button"
              onClick={() => setShowPassword(!showPassword)}
            >
              {showPassword ? <AiFillEye /> : <AiFillEyeInvisible />}
            </button>
          </div>
          {passwordError ? (
            <p className=" alert alert-danger mt-1 errorMsg">{passwordError}</p>
          ) : (
            <p></p>
          )}
        </div>

        <div className="btnContainer">
          <div className="form-check form-check-inline">
            <input
              className="form-check-input"
              type="radio"
              name="Usertype"
              id="Admin"
              value="Admin"
            />
            <label className="form-check-label" for="Admin">
              Admin
            </label>
          </div>
          <div className="form-check form-check-inline">
            <input
              className="form-check-input"
              type="radio"
              name="Usertype"
              id="User"
              value="User"
            />
            <label className="form-check-label" for="User">
              Kullanıcı
            </label>
          </div>
          <button
            class="btn btn-primary btn-lg btn-block mt-2 mb-2"
            onClick={handleLogin}
          >
            Giriş Yap
          </button>
          <button
            class="btn btn-outline-dark rounded-pill btn-lg  mt-2 mb-2"
            onClick={handleSignInwithGoogle}
          >
            Google ile giriş yap <FcGoogle />
          </button>
          <p class="m-4 text-right">
            Hesabın yoksa
            <Link to="/register">
              <button class="btn btn-secondary btn-sm ml-2">Kayıt Ol</button>
            </Link>
          </p>
        </div>
      </div>
    </div>
  );
};
export default Login;
