import React from "react";
import { HomeData } from "./HomeData.js";
import { Link, useNavigate } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import "./HomeStyle.css";


export default function Home(props) {

    const dispatch = useDispatch();
    const navigate = useNavigate();

    const { userInfo, userToken } = useSelector((state) => state.user);

    return (
        // Hjem/Meny Knapper
        // Henter data fra HomeData

        <>
            {userInfo &&
                <>

                    <div className="user-Info-Home-Container">
                        <div className="user-Info-Home">
                            <div className="user-Info-Home-company">
                                Kiwi Hasbergsveien
                            </div>
                            <div className="user-Info-Home-name">
                                {userInfo.first_name} {" "} {userInfo.last_name}
                            </div>
                        </div>
                    </div>

                    <div className="active-cart-Info-Home">
                        <div className="active-cart-Info-text">
                            ACTIVE MARGO CART USERS NOW: xxxxx
                        </div>
                        <div className="active-cart-Info-text">
                            ACTIVE MARGO CART USERS TODAY: xxxxx
                        </div>
                    </div>
                </>
            }

            <div className="home-item-container">
                {HomeData.map((item, index) => {
                    return (
                        <li key={index} className={item.className}>
                            <Link to={item.path}>
                                <span>{item.title}</span>
                            </Link>
                        </li>
                    );
                })}
            </div>
        </>
    );
}