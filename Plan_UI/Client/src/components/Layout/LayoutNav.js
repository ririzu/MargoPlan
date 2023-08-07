//Template from https://www.youtube.com/watch?v=CXa0f4-dWi4 

import React, { useState } from "react";
import "./Layout.css";



export default function LayoutNav(props) {

    //FUNCTIONS
    const [EndreLayout, setEndreLayout] = useState(false);
    const showEndreLayout = () => setEndreLayout(!EndreLayout);
    const [EndreVareplassering, setEndreVareplassering] = useState(false);
    const showEndreVarePlassering = () => setEndreVareplassering(!EndreVareplassering);



    return (

        <div className="layout-container">

            <div className="navigation-container">
                {/*NAVIGATION SECTION*/}
                <div className="endre-layout">
                    <ul><li><button onClick={showEndreLayout} className={EndreLayout && 'active'}>Layout</button></li></ul>
                </div>

                <div className={EndreLayout ? "layout-content active" : "layout-content"} >

                    <button>Ny Hylle</button>
                    <button>Slett Hylle</button>
                    <button>Flytt Hylle</button>
                    <button>Rediger Hylle</button>

                </div>

                <div className="endre-vareplassering">
                    <ul><li><button onClick={showEndreVarePlassering} className={EndreVareplassering && 'active'}>Vareplassering</button></li></ul>
                </div>

                <div className={EndreVareplassering ? "vareplassering-content active" : "vareplassering-content"}>

                    <button>Ny Vare</button>
                    <button>Slett vare</button>
                    <button>Rediger Hylle</button>

                </div>
            </div>
            {/*||||||||||||||||||||||||||||||||||||||||||||||||||||||||||*/}
            {/*NAVIGATION SECTION-------------ENDRE LAYOUT*/}

                <div className="hylle-container">
                    <div className="hlle-heading">NY HYLLE</div>

                    <div className="shape-container">
                        <div className="shape-txt">Rektangulær</div>
                        <div className="rectangle"></div>
                    </div>

                    <div className="shape-container">
                        <div className="shape-txt">Kvadratisk</div>
                        <div className="square"></div>
                    </div>

                    <div className="shape-container">
                    <div className="shape-txt">Sirkulær</div>
                        <div className="circle"></div>
                    </div>
                </div>
            </div>
    );
}