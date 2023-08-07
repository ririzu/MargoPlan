import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { registerUser } from "../../features/user/userActions";

//Style
import './RegisterStyle.css';


//components
// import {RegisterData} from './RegisterData.js';


export default function Register(props) {


    const { loading, userInfo, error, success } = useSelector(
        (state) => state.user
    );
    const dispatch = useDispatch();
    const navigate = useNavigate();


    //   useEffect(() => {
    //     // redirect authenticated user to profile screen
    //     if (userInfo) navigate("/profile");
    //     // redirect user to login page if registration was successful
    //     // if (success) navigate("/login");
    //   }, [navigate, userInfo]);


    const [check, setChecked] = useState(false);
    const [first_name, setFirstName] = useState("");
    const [last_name, setLastName] = useState("");
    const [company, setCompany] = useState("");
    const [address_, setAddress_] = useState("");
    const [email, setEmail] = useState("");
    const [mobile_no, setMobileNo] = useState("");
    const [password_, setPassword_] = useState("");
    const [repeatPassword, setRepeatPassword] = useState("");

    const [firstNameError, setFirstNameError] = useState("");
    const [lastNameError, setLastNameError] = useState("");
    const [companyError, setCompanyError] = useState("");
    const [addressError, setAddressError] = useState("");
    const [mobileError, setMobileError] = useState("");
    const [emailError, setEmailError] = useState("");
    const [passwordError, setPasswordError] = useState("");
    const [repeatPasswordError, setRepeatPasswordError] = useState("");

    useEffect(() => {
        if (first_name == "") {
            setFirstNameError("");
        }
        else if (first_name.length < 2) {
            setFirstNameError("Maa inneholde mins 2 bokstaver");
        }
        else {
            setFirstNameError("");
        }
    }, [first_name]);

    useEffect(() => {
        if (last_name == "") {
            setLastNameError("");
        } else if (last_name.length < 2) {
            setLastNameError("Maa inneholde mins 2 bokstaver");
        } else {
            setLastNameError("");
        }
    }, [last_name]);

    useEffect(() => {
        if (company == "") {
            setCompanyError("");
        }
        else if (company.length < 2) {
            setCompanyError("Maa inneholde mins 2 bokstavers");
        } else {
            setCompanyError("");
        }
    }, [company]);

    useEffect(() => {
        if (address_ == "") {
            setAddressError("");
        }

        else if (address_.length < 2) {
            setAddressError("Maa inneholde mins 2 bokstaver");
        }
        else {
            setAddressError("");
        }
    }, [address_]);

    useEffect(() => {
        if (mobile_no == "") {
            setMobileError("");
        }
        else if (!/^\d{1,11}$/.test(mobile_no)) {
            setMobileError("Ugyldig mobile nummer");
        }
        else {
            setMobileError("");
        }
    }, [mobile_no]);

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
            setPasswordError("Maa inneholde mins 7 tegn");
        } else {
            setPasswordError("");
        }
    }, [password_]);

    useEffect(() => {
        if (repeatPassword == "") {
            setRepeatPasswordError("");
        } else if (password_ != repeatPassword) {
            setRepeatPasswordError("Password mismatch");
        } else {
            setRepeatPasswordError("");
        }
    }, [repeatPassword]);

    const handleSubmit = async (event) => {
        event.preventDefault();

        if (first_name == "") {
            setFirstNameError("Feltet er tom");
        }

        if (last_name == "") {
            setLastNameError("Feltet er tom");
        }

        if (company == "") {
            setCompanyError("Feltet er tom");
        }

        if (address_ == "") {
            setAddressError("Feltet er tom");
        }

        if (mobile_no == "") {
            setMobileError("Feltet er tom");
        }

        if (email == "") {
            setEmailError("Feltet er tom");
        }
        if (password_ == "") {
            setPasswordError("Feltet er tom");
        }

        if (repeatPassword == "") {
            setRepeatPasswordError("Gjenta passord er tom");
        }

        if (
            firstNameError == "" &&
            lastNameError == "" &&
            companyError == "" &&
            addressError == "" &&
            mobileError == "" &&
            emailError == "" &&
            passwordError == "" &&
            repeatPasswordError == "" &&

            first_name != "" &&
            last_name != "" &&
            company != "" &&
            address_ != "" &&
            mobile_no != "" &&
            email != "" &&
            password_ != "" &&
            repeatPassword != ""
        ) {
            dispatch(
                registerUser({
                    first_name, last_name, company, address_, mobile_no, email, password_
                })
            );

            console.log(" User Registered!");
        } else {
            console.log("Error!");
        }
    }

    return (
        // Registerskjema
        <form onSubmit={handleSubmit}
            className="registerForm--container">

            <div className="input--container">
                {/* Tom input felt. Spesifikasjoner til feltet hentes fra RegisterData.js*/}
                <div>
                    <input
                        className="input--field"
                        type="text"
                        placeholder="Enter Name"
                        value={first_name}
                        onChange={event => setFirstName(event.target.value)}
                    />
                    {firstNameError != "" &&
                        <div className="Login-form-field-error-meesage">
                            {firstNameError}
                        </div>
                    }
                </div>

                <div>
                    <input
                        className="input--field"
                        type="text"
                        placeholder="Enter Surname"
                        value={last_name}
                        onChange={event => setLastName(event.target.value)}
                    />
                    {lastNameError != "" &&
                        <div className="Login-form-field-error-meesage">
                            {lastNameError}
                        </div>
                    }
                </div>

                <div>
                    <input
                        className="input--field"
                        type="text"
                        placeholder="Enter Company Name"
                        value={company}
                        onChange={event => setCompany(event.target.value)}
                    />
                    {companyError != "" &&
                        <div className="Login-form-field-error-meesage">
                            {companyError}
                        </div>
                    }
                </div>

                <div>
                    <input
                        className="input--field"
                        type="text"
                        placeholder="Enter Address"
                        value={address_}
                        onChange={event => setAddress_(event.target.value)}
                    />
                    {addressError != "" &&
                        <div className="Login-form-field-error-meesage">
                            {addressError}
                        </div>
                    }
                </div>

                <div>
                    <input
                        className="input--field"
                        type="text"
                        placeholder="Enter Phone number"
                        value={mobile_no}
                        onChange={event => setMobileNo(event.target.value)}
                    />
                    {mobileError != "" &&
                        <div className="Login-form-field-error-meesage">
                            {mobileError}
                        </div>
                    }
                </div>

                <div>
                    <input
                        className="input--field"
                        type="email"
                        placeholder="Enter Email"
                        value={email}
                        onChange={event => setEmail(event.target.value)}
                    />
                    {emailError != "" &&
                        <div className="Login-form-field-error-meesage">
                            {emailError}
                        </div>
                    }
                </div>

                <div>
                    <input
                        className="input--field"
                        type="password"
                        name="passord"
                        placeholder="Enter Password"
                        value={password_}
                        onChange={event => setPassword_(event.target.value)}
                    />
                    {passwordError != "" &&
                        <div className="Login-form-field-error-meesage">
                            {passwordError}
                        </div>
                    }
                </div>

                <div>
                    <input
                        className="input--field"
                        type="password"
                        placeholder="Confirm Password"
                        value={repeatPassword}
                        onChange={event => setRepeatPassword(event.target.value)}
                    />
                    {repeatPasswordError != "" &&
                        <div className="Login-form-field-error-meesage">
                            {repeatPasswordError}
                        </div>
                    }
                </div>
            </div>


            <div className="bottom--container">
                <div className="agreement-container">
                    <input className="chekbox" type="checkbox" value={check} onChange={() => setChecked(!check)} />
                    <div className="agreement-text">
                        I have read and agree with the
                        <a href="#"> terms</a>
                    </div>
                </div>

                    {
                        error != null && error.split(' ').pop() == 'register' ?
                            <div className={`Login-form-field-error-meesage`}>
                                {error.replace(/\w+[.!?]?$/, '')}
                            </div> :
                            success == 'User has been Registered Successfully!' &&
                            <div className={`Login-form-field-error-meesage text-success`}>
                                {success}
                            </div>
                    }

                    <button disabled={!check} type="submit" className="register--button">REGISTER</button>

                <p className="existing--account">Already have an account?
                    <a onClick={() => navigate('/login')}
                        style={{ cursor: "pointer" }}
                        className="sign--in"> Sign In</a>
                </p>

            </div>

        </form>
    );
}