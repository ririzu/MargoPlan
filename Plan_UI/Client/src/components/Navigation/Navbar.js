//Template from https://www.youtube.com/watch?v=CXa0f4-dWi4 

import React, { useState, useEffect } from "react";
import { Link, useNavigate } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";

//REACT ICONS FROM https://react-icons.github.io/react-icons
import * as FaIcons from "react-icons/fa";
import { NavbarData } from "./SidebarData.js";
import "./NavbarStyle.css";
import MargoSLogo from "../../Images/MargoSolutions-logo.png";
import { getUserProfile } from "../../features/user/userActions.jsx";
import { logout } from "../../features/user/userSlice.jsx";

export default function Navbar(props) {
    const dispatch = useDispatch();
    const navigate = useNavigate();

    const { userInfo, userToken } = useSelector((state) => state.user);

    //FUNCTIONS
    const [Navbar, setNavbar] = useState(false)
    const showNavbar = () => setNavbar(!Navbar)

    // automatically authenticate user if token is found
    useEffect(() => {
        if (userToken) {
            dispatch(getUserProfile());
        }
    }, [userToken, dispatch]);

    return (
        <div>
            <div className="navbar">
                <div className="logoContainer">
                    <img src={MargoSLogo} className="margo-logo" />
                    <div className="margo-text">
                        MARGO SOLUTIONS
                    </div>
                </div>

                {userInfo &&
                    <div className="user-Info">
                        <div className="user-company">
                            Kiwi Hasbergsveien
                        </div>
                        <div className="user-name">
                            {userInfo.first_name} {" "} {userInfo.last_name}
                        </div>
                    </div>
                }


                {userInfo &&
                    <div className="searchIcon">
                        <FaIcons.FaSearch color="white" size={24} />
                    </div>
                }
            </div>

            <div className="menubar-container ">
                {/*<img src={logo} alt="Logo" alt=""/>*/}

                <Link className="menu-bars">
                    <FaIcons.FaBars onClick={showNavbar} className="menu-bar-icon" />
                </Link>
            </div>

            <nav className={Navbar ? 'nav-menu active' : 'nav-menu'}>
                <ul className="nav-menu-items">
                    <li className="navbar-toggle">
                        <Link className="menu-bars">
                            <FaIcons.FaBars onClick={showNavbar} />
                        </Link>
                    </li>
                    {userInfo &&
                        <div className="user-Info-Home">
                            <div className="user-Info-Home-company">
                                Kiwi Hasbergsveien
                            </div>
                            <div className="user-Info-Home-name">
                                {userInfo.first_name} {" "} {userInfo.last_name}
                            </div>
                        </div>}


                    {NavbarData.map((item, index) => {
                        return (
                            <li key={index} className={item.className}>
                                {item.title == 'Sign Out' ?
                                    <Link onClick={() => {
                                        dispatch(logout())
                                        setNavbar(!Navbar)
                                    }
                                    } to={item.path}> {item.icon}
                                        <span>{item.title}</span>
                                    </Link> :
                                    <Link
                                        onClick={() => setNavbar(!Navbar)}
                                        to={item.path}>
                                        {item.icon}
                                        <span>{item.title}</span>
                                    </Link>
                                }
                            </li>
                        );
                    })}

                </ul>
            </nav>
        </div >
    );
}