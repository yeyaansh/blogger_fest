import React from 'react';
import './loading_snippet.css';

const LiquidMorphLoader = () => {
  return (
    <div className="liquid-loader-container">
      <div className="liquid-loader">
        <svg viewBox="0 0 200 200" xmlns="http://www.w3.org/2000/svg">
          <defs>
            <filter id="goo">
              <feGaussianBlur in="SourceGraphic" stdDeviation="10" result="blur" />
              <feColorMatrix in="blur" mode="matrix" 
                values="1 0 0 0 0  0 1 0 0 0  0 0 1 0 0  0 0 0 20 -10" 
                result="goo" />
            </filter>
          </defs>
          
          <g filter="url(#goo)">
            <circle className="blob blob-1" cx="100" cy="100" r="20" />
            <circle className="blob blob-2" cx="100" cy="100" r="20" />
            <circle className="blob blob-3" cx="100" cy="100" r="20" />
            <circle className="blob blob-4" cx="100" cy="100" r="20" />
          </g>
        </svg>
      </div>
      
      {/* <div className="liquid-text">
        <span className="letter">L</span>
        <span className="letter">o</span>
        <span className="letter">a</span>
        <span className="letter">d</span>
        <span className="letter">i</span>
        <span className="letter">n</span>
        <span className="letter">g</span>
      </div> */}
    </div>
  );
};

export default LiquidMorphLoader;