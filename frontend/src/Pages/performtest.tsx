import React, { useState, useEffect, Suspense } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Star, Trophy, ArrowRight, RefreshCcw, Home, Sparkles, Brain } from "lucide-react";
import { Canvas } from "@react-three/fiber";
import { OrbitControls } from "@react-three/drei";
import Brain3D from "../Models/brainmodel";
import { a } from "@react-spring/three";

const questions = [
  {
    id: 1,
    question: "How did you sleep last night?",
    options: [
      { label: "Great!", emoji: "😴", score: 2 },
      { label: "Okay", emoji: "😐", score: 1 },
      { label: "Tired", emoji: "😫", score: 0 },
    ],
  },
  {
    id: 2,
    question: "How much time did you spend on your phone today?",
    options: [
      { label: "Just a bit", emoji: "⏱️", score: 2 },
      { label: "A lot!", emoji: "📱", score: 0 },
      { label: "None at all!", emoji: "🌳", score: 3 },
    ],
  },
  {
    id: 3,
    question: "How is your mood right now?",
    options: [
      { label: "Happy!", emoji: "😊", score: 2 },
      { label: "Sad", emoji: "😢", score: 0 },
      { label: "Angry", emoji: "😠", score: 0 },
      { label: "Calm", emoji: "😌", score: 2 },
    ],
  },
  {
    id: 4,
    question: "Did you play outside today?",
    options: [
      { label: "Yes, it was fun!", emoji: "⚽", score: 2 },
      { label: "No, stayed inside", emoji: "🏠", score: 0 },
    ],
  },
  {
    id: 5,
    question: "Do you feel ready to learn something new?",
    options: [
      { label: "YES!", emoji: "🚀", score: 2 },
      { label: "Maybe later", emoji: "🥱", score: 1 },
    ],
  },
];

export default function PerformTest() {
  const [step, setStep] = useState(0); // 0: Start, 1: Quiz, 2: Game, 3: Result
  const [currentQuestion, setCurrentQuestion] = useState(0);
  const [score, setScore] = useState(0);
  const [gameScore, setGameScore] = useState(0);
  const [stars, setStars] = useState<{ id: number; x: number; y: number }[]>([]);

  const totalPossible = 21; // 11 from quiz + 10 from game
  const finalScore = score + gameScore;
  const stressLevel = Math.max(0, 1 - finalScore / totalPossible);

  // Simple game logic: Collect stars
  useEffect(() => {
    if (step === 2) {
      const interval = setInterval(() => {
        if (stars.length < 10) {
          setStars((prev) => [
            ...prev,
            {
              id: Math.random(),
              x: Math.random() * 80 + 10, // 10% to 90%
              y: Math.random() * 60 + 20, // 20% to 80%
            },
          ]);
        }
      }, 800);
      return () => clearInterval(interval);
    }
  }, [step, stars]);

  const handleOptionClick = (optionScore: number) => {
    setScore(score + optionScore);
    if (currentQuestion < questions.length - 1) {
      setCurrentQuestion(currentQuestion + 1);
    } else {
      setStep(2); // Move to Game
    }
  };

  const collectStar = (id: number) => {
    setGameScore(gameScore + 1);
    setStars(stars.filter((s) => s.id !== id));
    if (gameScore + 1 >= 10) {
      setStep(3); // Move to Result
    }
  };

  const resetTest = () => {
    setStep(0);
    setCurrentQuestion(0);
    setScore(0);
    setGameScore(0);
    setStars([]);
  };

  return (
    <div
      style={{
        minHeight: "100vh",
        background: "linear-gradient(135deg, #f5f7fa 0%, #c3cfe2 100%)",
        display: "flex",
        flexDirection: "column",
        alignItems: "center",
        padding: "2rem",
        fontFamily: "'Segoe UI', Tahoma, Geneva, Verdana, sans-serif",
      }}
    >
      {/* Nav Links */}
      <div style={{ alignSelf: 'flex-start', marginBottom: '1rem', display: 'flex', gap: '1.5rem' }}>
        <a href="/" style={{ display: 'flex', alignItems: 'center', gap: '0.5rem', color: '#4a10b4ea', textDecoration: 'none', fontWeight: 'bold' }}>
          <Home size={20} /> Home
        </a>
        <a href="/lectures" style={{ display: 'flex', alignItems: 'center', gap: '0.5rem', color: '#4a10b4ea', textDecoration: 'none', fontWeight: 'bold' }}>
          <Brain size={20} /> Lectures
        </a>
      </div>

      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        style={{
          background: "white",
          borderRadius: "24px",
          padding: "2rem",
          width: "100%",
          maxWidth: "600px",
          boxShadow: "0 10px 30px rgba(0,0,0,0.1)",
          textAlign: "center",
          position: "relative",
          overflow: "hidden",
        }}
      >
        <AnimatePresence mode="wait">
          {step === 0 && (
            <motion.div
              key="start"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
            >
              <h1 style={{ color: "#4a10b4ea", fontSize: "2.5rem", marginBottom: "1rem" }}>Mind Power Test! 🧠</h1>
              <p style={{ fontSize: "1.2rem", color: "#666", marginBottom: "2rem" }}>
                Let's see how your brain is doing today with some fun questions and a game!
              </p>
              <button
                onClick={() => setStep(1)}
                style={{
                  background: "#4a10b4ea",
                  width: "35%",
                  // height: "auto",
                  color: "white",
                  padding: "1rem 2rem",
                  fontSize: "1.5rem",
                  border: "none",
                  borderRadius: "50px",
                  cursor: "pointer",
                  display: "inline-flex",
                  alignItems: "center",
                  gap: "0.5rem",
                  boxShadow: "0 4px 15px rgba(74, 16, 180, 0.3)",
                }}
              >
                Start Fun! <ArrowRight />
              </button>
            </motion.div>
          )}

          {step === 1 && (
            <motion.div
              key="quiz"
              initial={{ opacity: 0, x: 50 }}
              animate={{ opacity: 1, x: 0 }}
              exit={{ opacity: 0, x: -50 }}
            >
              <div style={{ marginBottom: "1rem", color: "#4a10b4ea", fontWeight: "bold" }}>
                Question {currentQuestion + 1} of {questions.length}
              </div>
              <div
                style={{
                  height: "10px",
                  background: "#eee",
                  borderRadius: "5px",
                  marginBottom: "2rem",
                  overflow: "hidden",
                }}
              >
                <motion.div
                  initial={{ width: 0 }}
                  animate={{ width: `${((currentQuestion + 1) / questions.length) * 100}%` }}
                  style={{ height: "100%", background: "#4a10b4ea" }}
                />
              </div>

              <h2 style={{ fontSize: "1.8rem", marginBottom: "2rem" }}>
                {questions[currentQuestion].question}
              </h2>

              <div
                style={{
                  display: "grid",
                  gridTemplateColumns: "repeat(auto-fit, minmax(140px, 1fr))",
                  gap: "1rem",
                }}
              >
                {questions[currentQuestion].options.map((option, idx) => (
                  <motion.button
                    key={idx}
                    whileHover={{ scale: 1.05 }}
                    whileTap={{ scale: 0.95 }}
                    onClick={() => handleOptionClick(option.score)}
                    style={{
                      background: "#f8f9fa",
                      border: "2px solid #e9ecef",
                      padding: "1.5rem",
                      borderRadius: "16px",
                      cursor: "pointer",
                      display: "flex",
                      flexDirection: "column",
                      alignItems: "center",
                      gap: "0.5rem",
                      transition: "border-color 0.2s",
                    }}
                  >
                    <span style={{ fontSize: "3rem" }}>{option.emoji}</span>
                    <span style={{ fontWeight: "600", color: "#333" }}>{option.label}</span>
                  </motion.button>
                ))}
              </div>
            </motion.div>
          )}

          {step === 2 && (
            <motion.div
              key="game"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              style={{ minHeight: "400px" }}
            >
              <h2 style={{ color: "#4a10b4ea" }}>Brain Power Boost! ✨</h2>
              <p>Catch 10 happy stars to see your result!</p>
              <div style={{ fontSize: "1.5rem", fontWeight: "bold", margin: "1rem 0" }}>
                Stars: {gameScore} / 10
              </div>

              <div
                style={{
                  height: "300px",
                  background: "#f0f4ff",
                  borderRadius: "16px",
                  position: "relative",
                  overflow: "hidden",
                  border: "2px dashed #4a10b444",
                }}
              >
                {stars.map((star) => (
                  <motion.div
                    key={star.id}
                    initial={{ scale: 0 }}
                    animate={{ scale: [1, 1.2, 1] }}
                    transition={{ repeat: Infinity, duration: 1 }}
                    onClick={() => collectStar(star.id)}
                    style={{
                      position: "absolute",
                      left: `${star.x}%`,
                      top: `${star.y}%`,
                      cursor: "pointer",
                      color: "#ffd700",
                    }}
                  >
                    <Star size={40} fill="#ffd700" />
                  </motion.div>
                ))}
              </div>
            </motion.div>
          )}

          {step === 3 && (
            <motion.div
              key="result"
              initial={{ scale: 0.8, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              style={{ padding: "1rem" }}
            >
              <Trophy size={60} color="#ffd700" style={{ marginBottom: "0.5rem" }} />
              <h1 style={{ color: "#4a10b4ea", marginBottom: "0.5rem" }}>Amazing Job!</h1>
              
              <div style={{ height: "200px", marginBottom: "1rem" }}>
                <Suspense fallback={<div>Loading brain...</div>}>
                  <Canvas camera={{ position: [0, 0, 10], fov: 40 }} gl={{ alpha: true }}>
                    <ambientLight intensity={1.5} />
                    <directionalLight position={[5, 10, 5]} intensity={2} />
                    <Brain3D stress={stressLevel} />
                    <OrbitControls enableZoom={false} />
                  </Canvas>
                </Suspense>
              </div>

              <div style={{ fontSize: "1.4rem", margin: "0.5rem 0" }}>
                Your Mind Score: <span style={{ fontWeight: "bold", color: "#4CAF50" }}>{finalScore}</span>
              </div>
              <p style={{ color: "#666", lineHeight: 1.6, fontSize: "0.95rem" }}>
                {finalScore > 15
                  ? "Your brain is glowing! You are doing a great job taking care of your mind. Keep playing and learning!"
                  : "You are doing good! Remember to take breaks from screens and play outside to keep your brain happy."}
              </p>

              <div style={{ marginTop: "1.5rem", display: "flex", gap: "1rem", justifyContent: "center" }}>
                <button
                  onClick={resetTest}
                  style={{
                    padding: "0.7rem 1.2rem",
                    borderRadius: "12px",
                    border: "2px solid #4a10b4ea",
                    background: "transparent",
                    color: "#4a10b4ea",
                    fontWeight: "bold",
                    cursor: "pointer",
                    display: "flex",
                    alignItems: "center",
                    gap: "0.4rem",
                  }}
                >
                  <RefreshCcw size={16} /> Try Again
                </button>
                <a
                  href="/lectures"
                  style={{
                    padding: "0.7rem 1.2rem",
                    borderRadius: "12px",
                    background: "#4a10b4ea",
                    color: "white",
                    fontWeight: "bold",
                    textDecoration: "none",
                    display: "flex",
                    alignItems: "center",
                    gap: "0.4rem",
                  }}
                >
                  <Sparkles size={16} /> Learn More
                </a>
              </div>
            </motion.div>
          )}
        </AnimatePresence>
      </motion.div>

      <footer style={{ marginTop: "2rem", color: "#888", fontSize: "0.8rem" }}>
        © 2026 MindGlow - Mental Health for Kids
      </footer>
    </div>
  );
}
