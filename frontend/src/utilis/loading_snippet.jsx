import { useSelector } from 'react-redux';
import './loading_snippet.css';
import { useState, useEffect } from 'react';

const LiquidMorphLoader = () => {


const currentTheme = useSelector((state) => state.slice1.darkMode)
  console.log(currentTheme)
  return (
    <div className={`liquid-loader-container ${currentTheme}`}>
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
    </div>
  );
};

export default LiquidMorphLoader;