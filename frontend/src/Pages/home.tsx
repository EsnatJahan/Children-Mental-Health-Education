import React, { useState } from "react";
import { motion } from "framer-motion";
import '../CssFiles/home.css';
import bgimg from '../assets/bg3.png';
import m7 from '../assets/m7.png';
import m8 from '../assets/m8.png';
import m11 from '../assets/m11.png';
import m10 from '../assets/m10.png';
// import img1 from '../assets/mental1.png'; // Image for What is Mental Health
// import img2 from '../assets/emotional.png'; // Image for Emotional Well-being
// import img3 from '../assets/about.png'; // Image for About Us

interface InfoCardProps {
  title: string;
  description: React.ReactNode;
  img: string;
  reverse?: boolean; // to alternate layout
   textAlign?: "left" | "center" | "right"; 
}

const InfoCard: React.FC<InfoCardProps> = ({ title, description, img, reverse }) => {
  return (
    <div className={`info-card-wrapper ${reverse ? "reverse" : ""}`}>
      {/* Left / Right image */}
      <div className="info-card-image">
        <img src={img} alt={title} />
      </div>

      {/* Text */}
      <div className="info-card-text">
        <h2>{title}</h2>
        <p>{description}</p>
      </div>
    </div>
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
        animate={{ opacity: 1, y: 0 }}
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
        // textAlign="left"
        reverse
        description={
      <div className="info-points">
        <p>
          Helps <span className="highlight">understand emotions</span> and manage stress.
        </p>
        <p>
          Teaches <span className="highlight">coping strategies</span> for stress and anxiety.
        </p>
        <p>
          Builds <span className="highlight">emotional resilience</span> and mental well-being.
        </p>
        
        <p>
          Encourages <span className="highlight">seeking help</span> and support.
        </p>
      </div>
    }

      />



        <InfoCard
          title="About Us"
          description="We aim to promote mental health awareness, reduce stigma, and provide resources for self-care and community support, while educating individuals on emotional well-being and resilience, and building stronger communities that support mental wellness for everyone."
          img={m10}
        />
      </div>

      {/* Counter Demo */}
      
      <footer>
        © 2026 Mental Health Education Project
      </footer>
    </>
  );
};

export default Home;
