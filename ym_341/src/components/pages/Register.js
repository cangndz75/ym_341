import React from 'react'
import { Link, Redirect,useHistory } from 'react-router-dom';
import firebase from '../firebase'
import { useState ,useEffect} from 'react'
import { AiFillEye } from "react-icons/ai"
import { AiFillEyeInvisible } from "react-icons/ai"
import './Register.css'


const Register = () => {
    let history=useHistory()

    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const [emailError, setEmailError] = useState("");
    const [passwordError, setPasswordError] = useState("");



    const clearInputs = () => {
        setEmail('')
        setPassword('')
    }
    const clearErrors = () => {
        setEmailError('')
        setPasswordError('')
    }

    const handleSignup = () => {
        clearErrors()
        firebase
            .auth()
            .createUserWithEmailAndPassword(email, password)
            .then(res => {
              
              history.push('/login')
            })
            .catch(err => {
                clearInputs()
                switch (err.code) {
                    case "auth/email-already-in-use":
                    case "auth/invalid-email":
                        setEmailError(err.message)
                        break;
                    case "auth/weak-password":
                        setPasswordError(err.message)
                        break;
                }
            }) 
    }
    
    
    
    const [showPassword,setShowPassword]=useState(false)
    return (

        <div className="container py-5 mt-5">


            <div className="mx-auto my-auto shadow p-5" id="container-login">
  
                <h2 className="text-center mb-4">Kayıt Ol</h2>
                <div className="form-group">
                    <input
                        type="email"
                        autoFocus required
                        className="form-control form-control-lg"
                        placeholder="E-mail"
                        name="Email"
                        value={email}
                        onChange={e => setEmail(e.target.value)}
                    />
                    {emailError? <p className=" alert alert-danger mt-1 errorMsg">{emailError}</p> :<p></p>}
                </div>
                <div className="form-group position-relative">
                    <input
                        type={showPassword ? "text":"password"}
                        autoFocus required
                        className="form-control form-control-lg"
                        placeholder="Şifre"
                        name="Password"
                        value={password}
                        onChange={e => setPassword(e.target.value)}
                    />
                    <div class="" id="toggler-icon"><button class="btn btn-light py-2" id="toggle-button" onClick={()=>setShowPassword(!showPassword)}>{showPassword ? <AiFillEye /> : <AiFillEyeInvisible />}</button></div>
                    
                    {passwordError? <p className=" alert alert-danger mt-1 errorMsg">{passwordError}</p> :<p></p>}
                </div>

                <div className="btnContainer">
                            <button class="btn btn-primary btn-lg btn-block mt-2 mb-2" onClick={handleSignup}>Kayıt Ol</button>
                            <p class="m-4 text-right">Hesabın varsa
                                <Link to="/login"><button class="btn btn-secondary btn-sm ml-2">Giriş Yap</button></Link></p>
                </div>
            </div>
        </div>
    )
}
export default Register;
