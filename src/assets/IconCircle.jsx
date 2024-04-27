import React from 'react';

const IconEllipse = ({ size = 159, fill = '#D9D9D9' }) => (
  <svg 
    width={size} 
    height={(size * 154) / 159} // Maintain aspect ratio based on original dimensions
    viewBox="0 0 159 154" 
    fill="none" 
    xmlns="http://www.w3.org/2000/svg"
  >
    <ellipse 
      cx="79.5" 
      cy="77" 
      rx="79.5" 
      ry="77" 
      fill={fill} // Use fill prop to control color dynamically
    />
  </svg>
);

export default IconEllipse;
