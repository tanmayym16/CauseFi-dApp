import React from "react";

const Logo = ({ color = "" }) => {
  // Custom CauseFi logo: stylized C and F with blockchain motif
  return (
    <svg
      className={`w-10 h-10 ${color}`}
      viewBox="0 0 48 48"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      aria-label="CauseFi Logo"
      role="img"
    >
      {/* Outer C */}
      <path
        d="M36 12C33 8 27 6 21 8C13 11 10 22 16 30C21 37 33 36 36 28"
        stroke="#8c6dfd"
        strokeWidth="4"
        strokeLinecap="round"
        strokeLinejoin="round"
        fill="none"
      />
      {/* F shape */}
      <path
        d="M28 16V34M28 16H36M28 24H34"
        stroke="#4acd8d"
        strokeWidth="3"
        strokeLinecap="round"
        strokeLinejoin="round"
        fill="none"
      />
      {/* Blockchain motif: 3 connected dots */}
      <circle cx="16" cy="30" r="2.2" fill="#4acd8d" />
      <circle cx="21" cy="8" r="2.2" fill="#8c6dfd" />
      <circle cx="36" cy="28" r="2.2" fill="#8c6dfd" />
      <line x1="18" y1="29" x2="21" y2="10" stroke="#4acd8d" strokeWidth="1.5" />
      <line x1="22.5" y1="9" x2="34" y2="27" stroke="#8c6dfd" strokeWidth="1.5" />
    </svg>
  );
};

export default Logo;
