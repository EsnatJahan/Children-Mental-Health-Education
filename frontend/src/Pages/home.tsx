import { useState } from "react";
import { motion } from "framer-motion";
import { HeartPulse, Brain, BookOpen, Users } from "lucide-react";
import '../CssFiles/home.css';
import bgimg from '../assets/bg.png';

function Home() {
  const [count, setCount] = useState(0);

  return (
    <>

      {/* Background Section */}
      <div
        className="bg-container"
        style={{ backgroundImage: `url(${bgimg})` }}
      >
        {/* Blur Overlay */}
        <div className="bg-blur"></div>

        
        {/* Navbar options floating on bg */}
        <div className="navbar-floating">
          <a href="#">Sign In</a>
          <a href="#">Find Support</a>
          <a href="#">Health Conditions</a>
        </div>
        

        {/* Content */}
        <div className="content">
          <h1>Mental Health Education</h1>
          <p>
            Promoting awareness, emotional well-being, and mental resilience.
          </p>
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
          Learn about mental well-being, reduce stigma, and build emotional
          resilience through education.
        </p>

        <button className="primary-btn">
          Get Started
        </button>
      </motion.div>

      {/* Features Section */}
      <div className="features">
        <div className="card">
          <HeartPulse size={32} />
          <h3>Emotional Well-being</h3>
          <p>Understand emotions, stress, and healthy coping strategies.</p>
        </div>

        <div className="card">
          <Brain size={32} />
          <h3>Mental Disorders</h3>
          <p>Learn basics of anxiety, depression, and common conditions.</p>
        </div>

        <div className="card">
          <BookOpen size={32} />
          <h3>Self-Help Skills</h3>
          <p>Simple mindfulness and self-care techniques.</p>
        </div>

        <div className="card">
          <Users size={32} />
          <h3>Social Support</h3>
          <p>Role of family, friends, and community support.</p>
        </div>
      </div>

      {/* Counter Demo (kept from Vite template) */}
      <div className="card center">
        <button onClick={() => setCount(count + 1)}>
          Awareness clicks: {count}
        </button>
        <p>Each click represents spreading awareness 💚</p>
      </div>

      {/* Footer */}
      <footer>
        © 2026 Mental Health Education Project
      </footer>
    </>
  );
}

export default Home;
