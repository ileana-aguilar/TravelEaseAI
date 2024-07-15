import React from 'react';

const IconFeed = ({ size = 27, stroke = 'black', fillColor = 'none' }) => (
  <svg
    width={size}
    height={size * (29 / 27)} // Maintain aspect ratio
    viewBox="0 0 27 29"
    fill={fillColor} // Use fillColor for the fill attribute
    xmlns="http://www.w3.org/2000/svg"
  >
    <path
      d="M7.59375 12.9896C10.079 12.9896 12.0938 10.8256 12.0938 8.15625C12.0938 5.48687 10.079 3.32291 7.59375 3.32291C5.10847 3.32291 3.09375 5.48687 3.09375 8.15625C3.09375 10.8256 5.10847 12.9896 7.59375 12.9896Z"
      stroke={stroke}
      strokeLinecap="round"
      strokeLinejoin="round"
    />
    <path
      d="M19.4062 25.6771C21.8915 25.6771 23.9062 23.5131 23.9062 20.8437C23.9062 18.1744 21.8915 16.0104 19.4062 16.0104C16.921 16.0104 14.9062 18.1744 14.9062 20.8437C14.9062 23.5131 16.921 25.6771 19.4062 25.6771Z"
      stroke={stroke}
      strokeLinecap="round"
      strokeLinejoin="round"
    />
    <path
      d="M19.4062 12.9896C21.8915 12.9896 23.9062 10.8256 23.9062 8.15625C23.9062 5.48687 21.8915 3.32291 19.4062 3.32291C16.921 3.32291 14.9062 5.48687 14.9062 8.15625C14.9062 10.8256 16.921 12.9896 19.4062 12.9896Z"
      stroke={stroke}
      strokeLinecap="round"
      strokeLinejoin="round"
    />
    <path
      d="M7.59375 25.6771C10.079 25.6771 12.0938 23.5131 12.0938 20.8437C12.0938 18.1744 10.079 16.0104 7.59375 16.0104C5.10847 16.0104 3.09375 18.1744 3.09375 20.8437C3.09375 23.5131 5.10847 25.6771 7.59375 25.6771Z"
      stroke={stroke}
      strokeLinecap="round"
      strokeLinejoin="round"
    />
  </svg>
);

export default IconFeed;
