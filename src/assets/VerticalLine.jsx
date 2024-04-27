import React from 'react';

const VerticalLine = ({ height = 28, stroke = '#C2C2C2' }) => (
  <svg 
    width="1" // Width remains constant as it defines the line thickness
    height={height} // Height can be adjusted via props
    viewBox={`0 0 1 ${height}`} // Update viewBox to accommodate varying heights
    fill="none" 
    xmlns="http://www.w3.org/2000/svg"
  >
    <line x1="0.5" x2="0.5" y2={height} stroke={stroke} /> // Use stroke prop for color
  </svg>
);

export default VerticalLine;
