import React, { useState } from "react";
import { motion } from "framer-motion";
import '../CssFiles/home.css';
import bgimg from '../assets/m12.png';
import m7 from '../assets/m7.png';
import m8 from '../assets/m8.png';
import m10 from '../assets/m10.png';

interface InfoCardProps {
  title: string;
  description: React.ReactNode;
  img: string;
  reverse?: boolean; // slide from right if true, left if false
}

const InfoCard: React.FC<InfoCardProps> = ({ title, description, img, reverse }) => {
  return (
    <motion.div
      className={`info-card-wrapper ${reverse ? "reverse" : ""}`}
      initial={{ opacity: 0, x: reverse ? 200 : -200 }} // start from left or right
      whileInView={{ opacity: 1, x: 0 }} // animate when in viewport
      viewport={{ once: true, amount: 0.5 }} // trigger when 60% visible, only once
      transition={{ duration: 0.8, ease: "easeOut" }}
    >
      <div className="info-card-image">
        <img src={img} alt={title} />
      </div>

      <div className="info-card-text">
        <h2>{title}</h2>
        <p>{description}</p>
      </div>
    </motion.div>
  );
};

const Home: React.FC = () => {
  const [count, setCount] = useState<number>(0);

  return (
    <>
      {/* Background Section */}
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
            href="#"
            style={{
              color: "#333",
              fontWeight: 500,
              textDecoration: "none",
            }}
          >
            Find Support
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



      {/* HERO SPLIT SECTION */}
      <div
        className="hero-split"
        style={{
          display: "flex",
          height: "70vh",
          maxHeight: "650px",
          // padding: "4",
          marginBottom: "3rem",
          marginTop: "4rem",
        }}
      >
        {/* LEFT IMAGE (2/3) */}
        <div
          style={{
            flex: 2, // ✅ 2 parts
            backgroundImage: `url(${bgimg})`,
            backgroundSize: "cover",
            backgroundPosition: "center",
          }}
        />

        {/* RIGHT CONTENT */}
        <motion.div
          className="hero-content"
          initial={{ opacity: 0, x: 60 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.6 }}
          style={{
            flex: 1,
            display: "flex",
            flexDirection: "column",
            justifyContent: "center",
            alignItems: "center",
            padding: "3rem", // 🔽 slightly reduced padding
            textAlign: "center",
          }}
        >

          <h1 style={{ fontSize: "3rem" }}>
            <span style={{ color: "#3ebcb4ea" }}>Mind</span><span style={{ color: "#4a10b4ea" }}>Glow</span>
          </h1>

          <p
            style={{
              margin: "1rem 0 2rem",
              fontSize: "1.1rem",
              lineHeight: 1.6,
            }}
          >
            Promoting awareness, emotional well-being, and mental resilience.
          </p>

          <button
            className="primary-btn"
            style={{
              backgroundColor: "#4a10b4ea", // ✅ add this
              color: "#fff",
              border: "none",
              borderRadius: "8px",
              padding: "0.8rem 2rem",
              fontSize: "1rem",
              cursor: "pointer",
              width: "150px",
            }}
          >
            Get Started
          </button>

        </motion.div>
      </div>

      {/* Hero Section */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
        transition={{ duration: 0.6 }}
        className="hero"
        style={{
          justifyContent: "center",
          alignItems: "center",
          textAlign: "center",
        }}
      >
        <h2>Mental Health Education</h2>
        <p>
          Learn about mental well-being, reduce stigma, and build emotional resilience through education.
        </p>
      </motion.div>

      {/* Info Cards */}
      <div className="bottom-sections">
        <InfoCard
          title="What is Mental Health?"
          description="Mental health includes our emotional, psychological, and social well-being. It affects how we think, feel, and act. It also helps determine how we handle stress, relate to others, and make choices."
          img={m7}
        />

        <InfoCard
          title="Why Mental Health Education Matters?"
          img={m8}
          reverse
          description={
            <div className="info-points">
              <p>Helps <span className="highlight">understand emotions</span> and manage stress.</p>
              <p>Teaches <span className="highlight">coping strategies</span> for stress and anxiety.</p>
              <p>Builds <span className="highlight">emotional resilience</span> and mental well-being.</p>
              <p>Encourages <span className="highlight">seeking help</span> and support.</p>
            </div>
          }
        />

        <InfoCard
          title="About Us"
          description="We aim to promote mental health awareness, reduce stigma, and provide resources for self-care and community support, while educating individuals on emotional well-being and resilience, and building stronger communities that support mental wellness for everyone."
          img={m10}
        />
      </div>

      <footer>
        © 2026 Mental Health Education Project
      </footer>
    </>
  );
};

export default Home;
