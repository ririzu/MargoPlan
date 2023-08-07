import React from 'react';
import LayoutNav from './LayoutNav.js'
import MapCanvas from './MapCanvas.js';

//Setter sammen Mapping Canvaset og LayoutNa (Layout Navigasjon)
export default function Layout() {
    return (
        <div className='canvasContainer'>


            <div className='canvasTopContainer'>
                <div className='canvasTop'>
                    <div className='status-txt'>STATUS: LAGRET</div>
                    <div className='btns-container'>
                        <div className='btn-angre'>ANGRE</div>
                        <div className='btn-lagre'>LAGRE</div>
                    </div>
                </div>
            </div>

            <div className='mainLayout'>

                <LayoutNav />
                <MapCanvas />
            </div>
        </div>
    );
}
