import React, { useState, useEffect } from "react";
import { Link, useNavigate } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import {
    loginUser,
} from "../../features/user/userActions";


//Components
import "./Register";

//Style
import "./LoginStyle.css"

export default function Login() {

    const {
        loading,
        userInfo,
        error,
        success
    } = useSelector((state) => state.user);

    const dispatch = useDispatch();
    const navigate = useNavigate();

    const [email, setEmail] = useState("");
    const [password_, setPassword] = useState("");

    const [emailError, setEmailError] = useState("");
    const [passwordError, setPasswordError] = useState("");

    useEffect(() => {
        if (userInfo) {
            navigate("/");
        }
    }, [navigate, userInfo]);


    useEffect(() => {
        if (email == "") {
            setEmailError("");
        } else if (!/^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,4}$/i.test(email)) {
            setEmailError("Ugjyldig email addresse");
        } else {
            setEmailError("");
        }
    }, [email]);

    useEffect(() => {
        if (password_ == "") {
            setPasswordError("");
        } else if (password_.length < 7) {
            setPasswordError("Passordet maa ha minst 7 tegn");
        } else {
            setPasswordError("");
        }
    }, [password_]);


    //HANDLE SUBMIT
    function handleSubmit(e) {
        e.preventDefault()
        console.log("Loged in");

        if (email == "") {
            setEmailError("Email er tom");
        }
        if (password_ == "") {
            setPasswordError("Email er tom");
        }

        if (
            emailError == "" &&
            passwordError == "" &&
            email != "" &&
            password_ != ""
        ) {
            console.log("login User!");
            dispatch(loginUser({ email, password_ }));
        } else {
            console.log("Error!");
        }
    }


    return (
        <div className="loginContainer">
            <main className="main--login_form">
                <form>
                    <div className="form--container">
                        <div className="field-container">
                            <div className="label-input">Email *</div>
                            <input
                                className="login--input"
                                type="email"
                                name="Email"
                                placeholder="Email"
                                value={email}
                                onChange={(e) => setEmail(e.target.value)}
                            />
                            {emailError != "" &&
                                <div className="Login-form-field-error-meesage">
                                    {emailError}
                                </div>
                            }
                        </div>

                        <div className="field-container">
                            <div className="label-input">Password *</div>
                            <input
                                className="login--input"
                                type="password"
                                placeholder="Password"
                                value={password_}
                                onChange={(e) => setPassword(e.target.value)}
                            />
                            {passwordError != "" &&
                                <div className="Login-form-field-error-meesage">
                                    {passwordError}
                                </div>
                            }
                        </div>
                    </div>

                    {/* <Link className="forgotten--password" href="#">Forgot password</Link> */}

                    <div className="submissionContainer">
                        {
                            error != null && error.split(' ').pop() == 'login' &&
                            <div className={`Login-form-field-error-meesage`}>
                                {error.replace(/\w+[.!?]?$/, '')}
                            </div>
                        }
                    </div>

                    {
                        <button type="submit"
                            onClick={handleSubmit}
                            className="login--btn">Login
                        </button>
                    }

                    <br />

                    <div className="signUp--section">
                        <p>Don't have an account?
                            <a
                                onClick={() => navigate('/register')}
                                style={{ cursor: "pointer" }}
                            > Sign Up</a>
                        </p>
                    </div>

                </form>
            </main>
        </div>
    )
}