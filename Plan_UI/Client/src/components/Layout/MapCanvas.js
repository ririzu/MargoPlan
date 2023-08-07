import React, { useState, useRef } from 'react';
import './Layout.css';

export default function MainLayout() {
  const ROWS = 72; /*720px:10px --> CSS: .pixel width */
  const COLS = 88; /*880px:10px --> CSS: .pixel height */

  // Set the initial state of the canvas as a 450x550 grid of white pixels
  const [canvas, setCanvas] = useState(Array(ROWS).fill(Array(COLS).fill('#BEB2D7')));

  // initial zoom level
  const [zoomLevel, setZoomLevel] = useState(1);

  // Canvas Referanse
  const canvasRef = useRef(null);

  // Zoom in and out
  const handleWheel = (event) => {
    event.preventDefault();
    const zoomDelta = event.deltaY > 0 ? -0.1 : 0.1;
    setZoomLevel((prevZoom) => Math.max(0.1, Math.min(prevZoom + zoomDelta, 3)));
  };

  // Render canvas
  return (
    <div className="map-canvas" onWheel={handleWheel}>
      
      {/* current zoom level */}
      <div
        className="canvas-inner"
        style={{
          transform: `scale(${zoomLevel})`,
          transformOrigin: 'top left',
        }}
        ref={canvasRef}
      >

        {canvas.map((row, i) => (
          <div key={i} style={{ display: 'flex' }}>
            {row.map((color, j) => (
              <div
                key={`${i}-${j}`}
                className="pixel"
                style={{ backgroundColor: color }}
              />
            ))}
          </div>
        ))}
      </div>
    </div>
  );
}

