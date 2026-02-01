import React, { useState, useEffect } from "react";
import { Canvas } from "@react-three/fiber";
import { OrbitControls } from "@react-three/drei";
import Brain3D from "../Models/brainmodel";
import childNormal from "../assets/happy.png";
import childPhone from "../assets/c1.png";

export default function MentalScene() {
  const [stress, setStress] = useState(0);
  const [isRunning, setIsRunning] = useState(false);

  // Gradually increase stress when running
  useEffect(() => {
    if (!isRunning) return;
    const interval = setInterval(() => {
      setStress((prev) => Math.min(prev + 0.02, 1));
    }, 200);
    return () => clearInterval(interval);
  }, [isRunning]);

  // Emoji logic
  const getFace = () => {
    if (stress < 0.3) return "😊";
    if (stress < 0.7) return "😐";
    return "😞";
  };

  // Arrow color based on stress
  const getArrowColor = () => {
    if (stress < 0.3) return "#4CAF50";
    if (stress < 0.8) return "#FFA500";
    return "#cc0000";
  };

  // Button handlers
  const handleStart = () => setIsRunning(true);
  const handleReset = () => {
    setIsRunning(false);
    setStress(0);
  };

  return (
    <>
      <div
        className="navbar-floating"
        style={{
          display: "flex",
          alignItems: "center",
          justifyContent: "space-between",
          padding: "1rem 3rem",
          background: "#ffffff",
          position: "sticky",
          top: 0,
          zIndex: 999,
          boxShadow: "0 4px 20px rgba(0,0,0,0.06)",
        }}
      >
        {/* LOGO / BRAND */}
        <div
          style={{
            fontSize: "1.5rem",
            fontWeight: 700,
            color: "#4a10b4ea",
            cursor: "pointer",
          }}
        >
          MindGlow
        </div>

        {/* NAV LINKS */}
        <div
          style={{
            display: "flex",
            alignItems: "center",
            gap: "2rem",
          }}
        >
          <a
            href="/"
            style={{
              color: "#333",
              fontWeight: 500,
              textDecoration: "none",
            }}
          >
            Home
          </a>
          <a
            href="/lectures"
            style={{
              color: "#333",
              fontWeight: 500,
              textDecoration: "none",
            }}
          >
            Lectures
          </a>
          <a
            href="#"
            style={{
              color: "#333",
              fontWeight: 500,
              textDecoration: "none",
            }}
          >
            Perform Test
          </a>

          <a
            href="#"
            style={{
              color: "#333",
              fontWeight: 500,
              textDecoration: "none",
            }}
          >
            Health Conditions
          </a>

          {/* CTA BUTTON */}
          <a
            href="/signup"
            style={{
              background: "#4a10b4ea",
              color: "#fff",
              padding: "0.5rem 1.2rem",
              borderRadius: "20px",
              fontWeight: 500,
              textDecoration: "none",
            }}
          >
            Sign Up
          </a>
        </div>
      </div>
      
      {/*Lecturess*/}

      <div
        style={{
          display: "flex",
          flexDirection: "column",
          height: "100vh",
          width: "100%",
          //margin: "2%",
          alignContent: "center",
          backgroundColor: "#f2eef5",
          borderRadius: "15px",
          border: "2px solid #d1b3ff",
        }}
      >
        <h1 style={{ marginTop: "20px" , marginLeft: "20px" }}>Lecture 1</h1>
        <p style={{ marginLeft: "20px" , marginBottom: "10px" }}>
         <span style={{ fontWeight: "bold", color: "#4a10b4ea" }}>Excessive use of digital devices</span>  can lead to increased stress levels in children's brains. This is due to the overstimulation of neural pathways, which can result in anxiety, difficulty concentrating, and disrupted sleep patterns. It is important to monitor and limit screen time to promote healthier brain development and overall well-being.
        </p>
        {/* Buttons */}
        <div style={{ textAlign: "center", marginTop: "15px" }}>
          <button
            onClick={handleStart}
            style={{
              padding: "10px 20px",
              fontSize: "16px",
              marginRight: "10px",
              borderRadius: "8px",
              border: "none",
              backgroundColor: "#4CAF50",
              color: "white",
              cursor: "pointer",
            }}
          >
            Start
          </button>

          <button
            onClick={handleReset}
            style={{
              padding: "10px 20px",
              fontSize: "16px",
              borderRadius: "8px",
              border: "none",
              backgroundColor: "#cc0000",
              color: "white",
              cursor: "pointer",
            }}
          >
            Reset
          </button>
        </div>

        {/* Main Content */}
        <div style={{ display: "flex", flex: 1, alignItems: "center" }}>
          {/* LEFT - Child Image */}
          <div style={{ flex: 1, display: "flex", justifyContent: "center", marginLeft: "20px" }}>
            <img
              src={isRunning ? childPhone : childNormal}
              alt="child"
              style={{ width: "100%" }}
            />
          </div>

          {/* ARROW 1 */}
          <div
            style={{
              fontSize: "100px",
              color: getArrowColor(),
              animation: isRunning ? "moveArrow 1s infinite alternate" : "none",
            }}
          >
            ➜
          </div>

          {/* CENTER - Brain */}
          <div
            style={{
              flex: 1,
              height: "100%",
              display: "flex",
              flexDirection: "column",
              justifyContent: "center",
              alignItems: "center",
            }}
          >
            <Canvas camera={{ position: [0, 0, 12], fov: 50 }} gl={{ alpha: true }}>
              <ambientLight intensity={1.2} />
              <directionalLight position={[5, 10, 5]} intensity={1.5} />
              <Brain3D stress={stress} />
              <OrbitControls />
            </Canvas>

            <p
              style={{
                fontSize: "18px",
                fontWeight: "bold",
                color: "#cc0000",
                textAlign: "center",
              }}
            >
              {isRunning
                ? "Excessive use of devices is increasing brain stress"
                : "Relaxed brain keeps you happy"}
            </p>
          </div>


          {/* ARROW 2 */}
          <div
            style={{
              fontSize: "100px",
              color: getArrowColor(),
              animation: isRunning ? "moveArrow 1s infinite alternate" : "none",
            }}
          >
            ➜
          </div>

          {/* RIGHT - Emoji */}
          <div
            style={{
              flex: 1,
              display: "flex",
              justifyContent: "center",
              fontSize: "150px",
              transition: "0.5s",
            }}
          >
            {getFace()}
          </div>
        </div>

        {/* Arrow Animation */}
        <style>
          {`
            @keyframes moveArrow {
              0% { transform: translateX(0px); }
              100% { transform: translateX(15px); }
            }
          `}
        </style>
      </div>
    </>
    
  );
}
