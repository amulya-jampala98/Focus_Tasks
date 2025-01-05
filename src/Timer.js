import React from "react";

function Timer({ timeLeft, duration }) {
  const radius = 140; 
  const circumference = 2 * Math.PI * radius; 
  const progress = ((duration * 60 - timeLeft) / (duration * 60)) * 100; 

  return (
    <div style={{ position: "relative", width: "300px", height: "300px" }}>
      <svg
        width="300"
        height="300"
        viewBox="0 0 300 300"
        xmlns="http://www.w3.org/2000/svg"
      >
        {/* Background Circle */}
        <circle
          cx="150"
          cy="150"
          r={radius}
          fill="none"
          stroke="#d3d3d3"
          strokeWidth="5"
        
        />
        {/* Progress Circle */}
        <circle
          cx="150"
          cy="150"
          r={radius}
          fill="none"
          stroke="red"
          strokeWidth="5"
          strokeDasharray={circumference}
          strokeDashoffset={
            circumference - (progress / 100) * circumference
          } /* Animation Effect */
          style={{
            transition: "stroke-dashoffset 1s linear",
            transform: "rotate(-90deg)",
            transformOrigin: "50% 50%",
          }}
        />
      </svg>
      {/* Timer Text */}
      <div
        style={{
          position: "absolute",
          top: "50%",
          left: "50%",
          transform: "translate(-50%, -50%)",
          fontSize: "2rem",
          color: "white",
        }}
      >
        {Math.floor(timeLeft / 60)}:{(timeLeft % 60).toString().padStart(2, "0")}
      </div>
    </div>
  );
}

export default Timer;
