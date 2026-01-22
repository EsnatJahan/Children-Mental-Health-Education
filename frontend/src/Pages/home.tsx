import React, { useState } from "react";
import { motion } from "framer-motion";
import '../CssFiles/home.css';
import bgimg from '../assets/bg3.png';
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
      viewport={{ once: true, amount: 0.6 }} // trigger when 60% visible, only once
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
        className="bg-container"
        style={{ backgroundImage: `url(${bgimg})` }}
      >
        <div className="bg-blur"></div>
        <div className="navbar-floating">
          <a href="/signup">Sign Up</a>
          <a href="#">Find Support</a>
          <a href="#">Health Conditions</a>
        </div>
        <div className="content">
          <h1>Mind<span style={{ color: "#4a10b4ea" }}>Glow</span></h1>
          <p>Promoting awareness, emotional well-being, and mental resilience.</p>
          <button className="primary-btn">Get Started</button>
        </div>
      </div>

      {/* Hero Section */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
        transition={{ duration: 0.6 }}
        className="hero"
      >
        <h1>Mental Health Education</h1>
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
