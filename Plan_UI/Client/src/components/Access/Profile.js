import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { getUserProfile, updateUser } from "../../features/user/userActions";

//Style
import './RegisterStyle.css';


//components
// import {RegisterData} from './RegisterData.js';


export default function Profile(props) {


    const { loading, userInfo, error, success } = useSelector(
        (state) => state.user
    );

    const dispatch = useDispatch();
    const navigate = useNavigate();

    const [first_name, setFirstName] = useState("");
    const [last_name, setLastName] = useState("");
    const [company, setCompany] = useState("");
    const [address_, setAddress_] = useState("");
    const [mobile_no, setMobileNo] = useState("");
    const [email, setEmail] = useState("");

    const [firstNameError, setFirstNameError] = useState("");
    const [lastNameError, setLastNameError] = useState("");
    const [companyError, setCompanyError] = useState("");
    const [addressError, setAddressError] = useState("");
    const [mobileError, setMobileError] = useState("");
    const [emailError, setEmailError] = useState("");

    useEffect(() => {
        if (userInfo != null) {
            setFirstName(userInfo?.first_name)
            setLastName(userInfo?.last_name)
            setCompany(userInfo?.company)
            setAddress_(userInfo?.address_)
            setMobileNo(userInfo?.mobile_no)
            setEmail(userInfo?.email)
        }
    }, [userInfo]);


    useEffect(() => {
        if (first_name == "") {
            setFirstNameError("");
        }
        else if (first_name.length < 3) {
            setFirstNameError("First name should be atleast of 3 characters");
        }
        else {
            setFirstNameError("");
        }
    }, [first_name]);

    useEffect(() => {
        if (last_name == "") {
            setLastNameError("");
        } else if (last_name.length < 3) {
            setLastNameError("Last name should be atleast of 3 characters");
        } else {
            setLastNameError("");
        }
    }, [last_name]);

    useEffect(() => {
        if (company == "") {
            setCompanyError("");
        }
        else if (company.length < 3) {
            setCompanyError("Company name should be atleast of 3 characters");
        } else {
            setCompanyError("");
        }
    }, [company]);

    useEffect(() => {
        if (address_ == "") {
            setAddressError("");
        }

        else if (address_.length < 5) {
            setAddressError("Address should be atleast of 5 characters");
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
            setMobileError("Invalid mobile number");
        }
        else {
            setMobileError("");
        }
    }, [mobile_no]);

    useEffect(() => {
        if (email == "") {
            setEmailError("");
        } else if (!/^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,4}$/i.test(email)) {
            setEmailError("Invalid email address");
        } else {
            setEmailError("");
        }
    }, [email]);

    const handleSubmit = async (event) => {
        event.preventDefault();

        if (first_name == "") {
            setFirstNameError("empty");
        }

        if (last_name == "") {
            setLastNameError("empty");
        }

        if (company == "") {
            setCompanyError("empty");
        }

        if (mobile_no == "") {
            setMobileError("empty");
        }

        if (email == "") {
            setEmailError("empty");
        }

        if (
            firstNameError == "" &&
            lastNameError == "" &&
            companyError == "" &&
            addressError == "" &&
            mobileError == "" &&
            emailError == "" &&

            first_name != "" &&
            last_name != "" &&
            company != "" &&
            address_ != "" &&
            mobile_no != "" &&
            email != ""
        ) {
            dispatch(
                updateUser({
                    first_name, last_name, company, address_, mobile_no, email
                })
            );

            console.log(" User Updated!");
        } else {
            console.log("Error!");
        }
    }

    console.log('userInfo', userInfo)

    return (
        // Registerskjema
        <>

            {userInfo != null ?
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

                    </div>

                    <div className="bottom--container">
                        {
                            error != null && error.split(' ').pop() == 'profile' ?
                                <div className={`Login-form-field-error-meesage`}>
                                    {error.replace(/\w+[.!?]?$/, '')}
                                </div> :
                                success == 'User Profile has been Updated Successfully!' &&
                                <div className={`Login-form-field-error-meesage text-success`}>
                                    {success}
                                </div>
                        }
                            <button type="submit" className="register--button">UPDATE PROFILE</button>

                    </div>
                </form> :

                <div className="text-heading">No Profile Found</div>
            }
        </>
    );
}