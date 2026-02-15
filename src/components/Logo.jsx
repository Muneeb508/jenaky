const Logo = ({ className = "" }) => {
  return (
    <svg 
      viewBox="0 0 200 60" 
      className={className}
      fill="none" 
      xmlns="http://www.w3.org/2000/svg"
    >
      <text 
        x="10" 
        y="42" 
        fontFamily="serif" 
        fontSize="32" 
        fontWeight="700" 
        fill="#50162E"
        letterSpacing="2"
      >
        JENAKY
      </text>
      <path 
        d="M 10 48 L 190 48" 
        stroke="#50162E" 
        strokeWidth="1.5"
        opacity="0.3"
      />
      <circle cx="195" cy="48" r="2" fill="#50162E" opacity="0.6" />
    </svg>
  );
};

export default Logo;
