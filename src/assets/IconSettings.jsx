import React from 'react';

const IconSettings = ({ size = 24, fill = 'black' }) => (
    <svg
      width={size}  // allows dynamic resizing based on props
      height={size} // maintains the square aspect ratio
      viewBox="0 0 36 36"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
    >
      <g clipPath="url(#clip0_15_432)">
        <path d="M18.1001 11C14.2001 11 11.1001 14.1 11.1001 18C11.1001 21.9 14.2001 25 18.1001 25C22.0001 25 25.1001 21.9 25.1001 18C25.1001 14.1 22.0001 11 18.1001 11ZM18.1001 23C15.3001 23 13.1001 20.8 13.1001 18C13.1001 15.2 15.3001 13 18.1001 13C20.9001 13 23.1001 15.2 23.1001 18C23.1001 20.8 20.9001 23 18.1001 23Z" fill={fill} />
        <path d="M32.8 14.7L30 13.8L29.4 12.3L30.8 9.7C31.1 9.1 31 8.3 30.5 7.8L28.1 5.4C27.6 4.9 26.8 4.8 26.2 5.1L23.6 6.5L22.1 5.9L21.2 3.1C21 2.5 20.4 2 19.7 2H16.3C15.6 2 15 2.5 14.9 3.2L14 6C13.4 6.1 12.9 6.3 12.4 6.6L9.8 5.2C9.2 4.9 8.4 5 7.9 5.5L5.5 7.9C5 8.4 4.9 9.2 5.2 9.8L6.5 12.3C6.3 12.8 6.1 13.4 5.9 13.9L3.1 14.8C2.5 15 2 15.6 2 16.3V19.7C2 20.4 2.5 21 3.2 21.2L6 22.1L6.6 23.6L5.2 26.2C4.9 26.8 5 27.6 5.5 28.1L7.9 30.5C8.4 31 9.2 31.1 9.8 30.8L12.4 29.4L13.9 30L14.8 32.9C15 33.5 15.6 34 16.3 34H19.7C20.4 34 21 33.5 21.2 32.9L22.1 30L23.6 29.4L26.2 30.8C26.8 31.1 27.6 31 28.1 30.5L30.5 28.1C31 27.6 31.1 26.8 30.8 26.2L29.4 23.6L30 22.1L32.9 21.2C33.5 21 34 20.4 34 19.7V16.3C34 15.6 33.5 14.9 32.8 14.7ZM32 19.4L28.4 20.5L28.3 21L27.4 23.1L27.1 23.6L28.9 26.9L26.9 28.9L23.6 27.1L23.1 27.4C22.4 27.8 21.7 28.1 21 28.3L20.5 28.4L19.4 32H16.6L15.5 28.4L15 28.3L12.9 27.4L12.4 27.1L9.1 28.9L7.1 26.9L8.9 23.6L8.6 23.1C8.2 22.4 7.9 21.7 7.7 21L7.6 20.5L4 19.4V16.6L7.4 15.6L7.6 15.1C7.8 14.3 8.1 13.6 8.5 12.9L8.8 12.4L7.1 9.1L9.1 7.1L12.3 8.9L12.8 8.6C13.5 8.2 14.2 7.9 15 7.7L15.5 7.5L16.6 4H19.4L20.5 7.5L21 7.7C21.7 7.9 22.4 8.2 23.1 8.6L23.6 8.9L26.9 7.1L28.9 9.1L27.1 12.4L27.4 12.9C27.8 13.6 28.1 14.3 28.3 15L28.4 15.5L32 16.6V19.4Z" fill={fill} />
      </g>
      <defs>
        <clipPath id="clip0_15_432">
          <rect width="36" height="36" fill="white"/>
        </clipPath>
      </defs>
    </svg>
  );

export default IconSettings;
