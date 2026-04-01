import React, { useState, useEffect, Suspense } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Star, Trophy, ArrowRight, RefreshCcw, Home, Sparkles, Brain, BookOpen, Utensils, Zap, ShieldCheck } from "lucide-react";
import { Canvas } from "@react-three/fiber";
import { OrbitControls, PerspectiveCamera } from "@react-three/drei";
import Brain3D from "../Models/brainmodel";

const testSets = {
  general: {
    title: "Mind Power Test!",
    icon: <Zap size={24} />,
    questions: [
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
    ]
  },
  academic: {
    title: "School Hero Test!",
    icon: <BookOpen size={24} />,
    questions: [
      {
        id: 1,
        question: "How do you feel about school today?",
        options: [
          { label: "Excited!", emoji: "🎒", score: 2 },
          { label: "It's okay", emoji: "🏫", score: 1 },
          { label: "Bored", emoji: "😴", score: 0 },
        ],
      },
      {
        id: 2,
        question: "Do you find it easy to focus on your lessons?",
        options: [
          { label: "Very easy", emoji: "🎯", score: 2 },
          { label: "Sometimes", emoji: "🤔", score: 1 },
          { label: "Hard to focus", emoji: "🦋", score: 0 },
        ],
      },
      {
        id: 3,
        question: "Did you finish your homework or assignments?",
        options: [
          { label: "All done!", emoji: "✅", score: 2 },
          { label: "Most of it", emoji: "📝", score: 1 },
          { label: "Not yet", emoji: "⏳", score: 0 },
        ],
      },
      {
        id: 4,
        question: "How often do you read books for fun?",
        options: [
          { label: "Every day!", emoji: "📚", score: 2 },
          { label: "Once in a while", emoji: "📖", score: 1 },
          { label: "Rarely", emoji: "📵", score: 0 },
        ],
      },
      {
        id: 5,
        question: "Do you enjoy sharing what you learned with others?",
        options: [
          { label: "Yes, I love it!", emoji: "🗣️", score: 2 },
          { label: "A little bit", emoji: "😊", score: 1 },
          { label: "Not really", emoji: "🤐", score: 0 },
        ],
      },
    ]
  },
  food: {
    title: "Healthy Eater Test!",
    icon: <Utensils size={24} />,
    questions: [
      {
        id: 1,
        question: "Did you have a healthy breakfast this morning?",
        options: [
          { label: "Yes, it was yummy!", emoji: "🥣", score: 2 },
          { label: "Just a small snack", emoji: "🍎", score: 1 },
          { label: "I skipped it", emoji: "❌", score: 0 },
        ],
      },
      {
        id: 2,
        question: "How many servings of fruits or veggies did you have today?",
        options: [
          { label: "3 or more!", emoji: "🥦", score: 2 },
          { label: "1 or 2", emoji: "🥕", score: 1 },
          { label: "None today", emoji: "🍩", score: 0 },
        ],
      },
      {
        id: 3,
        question: "How much water did you drink today?",
        options: [
          { label: "Plenty of water!", emoji: "💧", score: 2 },
          { label: "A little bit", emoji: "🥛", score: 1 },
          { label: "Mostly soda/juice", emoji: "🥤", score: 0 },
        ],
      },
      {
        id: 4,
        question: "How often do you eat junk food or sweets?",
        options: [
          { label: "Rarely", emoji: "🥗", score: 2 },
          { label: "Sometimes", emoji: "🍕", score: 1 },
          { label: "Quite often", emoji: "🍭", score: 0 },
        ],
      },
      {
        id: 5,
        question: "Do you eat your meals at the same time every day?",
        options: [
          { label: "Yes, regularly", emoji: "⏰", score: 2 },
          { label: "Sometimes", emoji: "🍽️", score: 1 },
          { label: "No, it varies", emoji: "🤷", score: 0 },
        ],
      },
    ]
  }
};

type CategoryKey = keyof typeof testSets;

export default function PerformTest() {
  const [step, setStep] = useState(0); // 0: Start, 1: Quiz, 2: Game, 3: Result
  const [selectedCategory, setSelectedCategory] = useState<CategoryKey>("general");
  const [currentQuestion, setCurrentQuestion] = useState(0);
  const [score, setScore] = useState(0);
  const [gameScore, setGameScore] = useState(0);
  const [stars, setStars] = useState<{ id: number; x: number; y: number }[]>([]);

  const questions = testSets[selectedCategory].questions;
  
  const maxQuizScore = questions.reduce((acc, q) => {
    const maxOptionScore = Math.max(...q.options.map(o => o.score));
    return acc + maxOptionScore;
  }, 0);
  
  const totalPossible = maxQuizScore + 10;
  const finalScore = score + gameScore;
  const stressLevel = Math.max(0, 1 - finalScore / totalPossible);

  useEffect(() => {
    if (step === 2) {
      const interval = setInterval(() => {
        if (stars.length < 10) {
          setStars((prev) => [
            ...prev,
            {
              id: Math.random(),
              x: Math.random() * 80 + 10,
              y: Math.random() * 60 + 20,
            },
          ]);
        }
      }, 800);
      return () => clearInterval(interval);
    }
  }, [step, stars]);

  const handleCategorySelect = (category: CategoryKey) => {
    setSelectedCategory(category);
    setStep(1);
  };

  const handleOptionClick = (optionScore: number) => {
    setScore(score + optionScore);
    if (currentQuestion < questions.length - 1) {
      setCurrentQuestion(currentQuestion + 1);
    } else {
      setStep(2);
    }
  };

  const collectStar = (id: number) => {
    setGameScore(gameScore + 1);
    setStars(stars.filter((s) => s.id !== id));
    if (gameScore + 1 >= 10) {
      setStep(3);
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
        background: "linear-gradient(135deg, #f8faff 0%, #e0e7ff 100%)",
        display: "flex",
        flexDirection: "column",
        alignItems: "center",
        padding: "3rem 1rem",
        fontFamily: "'Segoe UI', Roboto, sans-serif",
      }}
    >
      {/* Back to Home/Lectures */}
      <div style={{ width: "100%", maxWidth: "800px", marginBottom: "2rem", display: 'flex', gap: '2rem' }}>
        <a href="/" style={{ display: 'flex', alignItems: 'center', gap: '0.5rem', color: '#4a10b4ea', textDecoration: 'none', fontWeight: '800', fontSize: "1rem" }}>
          <Home size={20} /> Home
        </a>
        <a href="/lectures" style={{ display: 'flex', alignItems: 'center', gap: '0.5rem', color: '#4a10b4ea', textDecoration: 'none', fontWeight: '800', fontSize: "1rem" }}>
          <Brain size={20} /> Lectures
        </a>
      </div>

      <motion.div
        initial={{ opacity: 0, y: 30 }}
        animate={{ opacity: 1, y: 0 }}
        style={{
          background: "white",
          borderRadius: "40px",
          padding: "3rem",
          width: "100%",
          maxWidth: "700px",
          boxShadow: "0 25px 60px rgba(74, 16, 180, 0.1)",
          textAlign: "center",
          position: "relative",
          overflow: "hidden",
          border: "1px solid rgba(255,255,255,0.8)"
        }}
      >
        <AnimatePresence mode="wait">
          {step === 0 && (
            <motion.div
              key="start"
              initial={{ opacity: 0, scale: 0.9 }}
              animate={{ opacity: 1, scale: 1 }}
              exit={{ opacity: 0, scale: 0.9 }}
            >
              <div style={{ display: "inline-flex", background: "#edf2ff", color: "#4a10b4ea", padding: "0.5rem 1rem", borderRadius: "50px", fontWeight: "700", fontSize: "0.8rem", marginBottom: "1.5rem" }}>
                <ShieldCheck size={14} style={{ marginRight: '5px' }} /> MIND CHALLENGE
              </div>
              <h1 style={{ color: "#2d3436", fontSize: "2.8rem", marginBottom: "1rem", fontWeight: "800" , paddingLeft: "2rem" }}>Brain Quizzes! 🧠</h1>
              <p style={{ fontSize: "1.2rem", color: "#636e72", marginBottom: "2.5rem", lineHeight: "1.6" }}>
                Let's see how your brain is doing today with some fun questions and a game!
              </p>
              
              <div style={{ display: "flex", flexDirection: "column", gap: "1.2rem" }}>
                {(Object.keys(testSets) as CategoryKey[]).map((key) => (
                  <motion.button
                    key={key}
                    whileHover={{ scale: 1.02, y: -2 }}
                    whileTap={{ scale: 0.98 }}
                    onClick={() => handleCategorySelect(key)}
                    style={{
                      background: "#e8bcf3",
                      color: "#2d3436",
                      width: "50%",
                      marginLeft: "25%",
                      padding: "1.5rem",
                      fontSize: "1.2rem",
                      border: "2px solid #f0f0f0",
                      borderRadius: "24px",
                      cursor: "pointer",
                      display: "flex",
                      alignItems: "center",
                      justifyContent: "space-between",
                      fontWeight: "700",
                      transition: "all 0.3s",
                      boxShadow: "0 4px 10px rgba(0,0,0,0.02)"
                    }}
                    onMouseOver={(e) => {
                      e.currentTarget.style.borderColor = "#4a10b4ea";
                      e.currentTarget.style.color = "#4a10b4ea";
                    }}
                    onMouseOut={(e) => {
                      e.currentTarget.style.borderColor = "#f0f0f0";
                      e.currentTarget.style.color = "#2d3436";
                    }}
                  >
                    <span style={{ display: "flex", alignItems: "center", gap: "1rem" }}>
                      <div style={{ background: "#f8faff", padding: "0.8rem", borderRadius: "16px" }}>
                        {testSets[key].icon}
                      </div>
                      {testSets[key].title}
                    </span>
                    <ArrowRight size={24} />
                  </motion.button>
                ))}
              </div>
            </motion.div>
          )}

          {step === 1 && (
            <motion.div
              key="quiz"
              initial={{ opacity: 0, x: 50 }}
              animate={{ opacity: 1, x: 0 }}
              exit={{ opacity: 0, x: -50 }}
            >
              <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: "1.5rem", color: "#4a10b4ea", fontWeight: "800", fontSize: "0.9rem", textTransform: "uppercase", letterSpacing: "1px" }}>
                <span>{testSets[selectedCategory].title}</span>
                <span>Question {currentQuestion + 1} / {questions.length}</span>
              </div>
              <div
                style={{
                  height: "12px",
                  background: "#f0f2f5",
                  borderRadius: "10px",
                  marginBottom: "3rem",
                  overflow: "hidden",
                }}
              >
                <motion.div
                  initial={{ width: 0 }}
                  animate={{ width: `${((currentQuestion + 1) / questions.length) * 100}%` }}
                  style={{ height: "100%", background: "linear-gradient(90deg, #4a10b4ea, #6c5ce7)", boxShadow: "0 0 15px rgba(74, 16, 180, 0.3)" }}
                />
              </div>

              <h2 style={{ fontSize: "2.2rem", marginBottom: "2.5rem", fontWeight: "800", color: "#2d3436" }}>
                {questions[currentQuestion].question}
              </h2>

              <div
                style={{
                  display: "grid",
                  gridTemplateColumns: "1fr",
                  gap: "1.2rem",
                }}
              >
                {questions[currentQuestion].options.map((option, idx) => (
                  <motion.button
                    key={idx}
                    whileHover={{ scale: 1.02, x: 5 }}
                    whileTap={{ scale: 0.98 }}
                    onClick={() => handleOptionClick(option.score)}
                    style={{
                      background: "#e8bcf3",
                      border: "2px solid #f0f2f5",
                      padding: "1.2rem 2rem",
                      borderRadius: "24px",
                      width: "40%",
                      // marginLeft: "35%",
                      cursor: "pointer",
                      display: "flex",
                      alignItems: "center",
                      gap: "1.5rem",
                      transition: "0.2s",
                      textAlign: "left"
                    }}
                    onMouseOver={e => e.currentTarget.style.borderColor = "#4a10b4ea"}
                    onMouseOut={e => e.currentTarget.style.borderColor = "#f0f2f5"}
                  >
                    <span style={{ fontSize: "2.5rem" }}>{option.emoji}</span>
                    <span style={{ fontWeight: "700", color: "#2d3436", fontSize: "1.2rem" }}>{option.label}</span>
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
              style={{ minHeight: "450px" }}
            >
              <div style={{ display: "inline-flex", background: "#fff9db", color: "#f59f00", padding: "0.5rem 1rem", borderRadius: "50px", fontWeight: "700", fontSize: "0.8rem", marginBottom: "1.5rem" }}>
                BONUS ROUND! ✨
              </div>
              <h2 style={{ color: "#2d3436", fontSize: "2.2rem", fontWeight: "800" }}>Brain Power Boost!</h2>
              <p style={{ color: "#636e72", marginBottom: "1.5rem" }}>Catch 10 glowing stars to finish the test!</p>
              
              <div style={{ display: "flex", justifyContent: "center", gap: "1rem", marginBottom: "1.5rem" }}>
                {Array.from({ length: 10 }).map((_, i) => (
                  <Star 
                    key={i} 
                    size={20} 
                    fill={i < gameScore ? "#ffd700" : "#eee"} 
                    color={i < gameScore ? "#ffd700" : "#eee"} 
                  />
                ))}
              </div>

              <div
                style={{
                  height: "350px",
                  background: "linear-gradient(180deg, #f8faff 0%, #f1f4ff 100%)",
                  borderRadius: "32px",
                  position: "relative",
                  overflow: "hidden",
                  border: "2px dashed #4a10b422",
                  cursor: "crosshair"
                }}
              >
                {stars.map((star) => (
                  <motion.div
                    key={star.id}
                    initial={{ scale: 0, rotate: -45 }}
                    animate={{ scale: [1, 1.2, 1], rotate: 0 }}
                    transition={{ repeat: Infinity, duration: 1 }}
                    onClick={() => collectStar(star.id)}
                    style={{
                      position: "absolute",
                      left: `${star.x}%`,
                      top: `${star.y}%`,
                      cursor: "pointer",
                      filter: "drop-shadow(0 0 10px rgba(255, 215, 0, 0.5))"
                    }}
                  >
                    <Star size={45} fill="#ffd700" color="#ffd700" />
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
              <div style={{ marginBottom: "2rem" }}>
                <motion.div
                  initial={{ rotate: -20, scale: 0 }}
                  animate={{ rotate: 0, scale: 1 }}
                  transition={{ type: "spring", damping: 10 }}
                >
                  <Trophy size={80} color="#ffd700" fill="#ffd700" style={{ filter: "drop-shadow(0 10px 20px rgba(255, 215, 0, 0.3))" }} />
                </motion.div>
                <h1 style={{ color: "#2d3436", fontSize: "2.5rem", fontWeight: "800", marginTop: "1rem" }}>Amazing Job!</h1>
                <p style={{ color: "#636e72" }}>You've completed the {testSets[selectedCategory].title}</p>
              </div>
              
              <div style={{ 
                height: "300px", 
                marginBottom: "2rem", 
                background: "#f8faff", 
                borderRadius: "32px", 
                position: "relative",
                border: "1px solid #f0f2f5"
              }}>
                <Suspense fallback={
                  <div style={{ display: "flex", justifyContent: "center", alignItems: "center", height: "100%" }}>
                    <RefreshCcw className="animate-spin" size={32} color="#4a10b4ea" />
                  </div>
                }>
                  <Canvas shadows gl={{ antialias: true, alpha: true }}>
                    <PerspectiveCamera makeDefault position={[0, 0, 12]} fov={50} />
                    <ambientLight intensity={1.5} />
                    <pointLight position={[10, 10, 10]} intensity={2} castShadow />
                    <Brain3D stress={stressLevel} baseColor="#4a10b4ea" />
                    <OrbitControls enableZoom={false} autoRotate autoRotateSpeed={1} />
                  </Canvas>
                </Suspense>
              </div>

              <div style={{ 
                background: "white", 
                padding: "1.5rem", 
                borderRadius: "24px", 
                boxShadow: "0 10px 30px rgba(0,0,0,0.03)", 
                marginBottom: "2rem",
                border: "1px solid #f0f2f5"
              }}>
                <div style={{ fontSize: "1rem", fontWeight: "700", color: "#b2bec3", textTransform: "uppercase" }}>Final Mind Score</div>
                <div style={{ fontSize: "3.5rem", fontWeight: "900", color: "#4CAF50" }}>{finalScore}</div>
                <p style={{ color: "#636e72", lineHeight: 1.6, fontSize: "1.1rem", marginTop: "1rem" }}>
                  {finalScore > (totalPossible * 0.7)
                    ? "Your brain is glowing! You are doing a great job taking care of your mind. Keep playing and learning!"
                    : "You are doing good! Remember to take breaks from screens and play outside to keep your brain happy."}
                </p>
              </div>

              <div style={{ display: "flex", gap: "1.2rem", justifyContent: "center" }}>
                <motion.button
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.95 }}
                  onClick={resetTest}
                  style={{
                    padding: "1rem 2rem",
                    width: "20%",
                    borderRadius: "50px",
                    border: "2px solid #4a10b4ea",
                    background: "transparent",
                    color: "#4a10b4ea",
                    fontWeight: "800",
                    cursor: "pointer",
                    display: "flex",
                    alignItems: "center",
                    gap: "0.6rem",
                  }}
                >
                  <RefreshCcw size={20} /> Try Another
                </motion.button>
                <motion.a
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.95 }}
                  href="/lectures"
                  style={{
                    padding: "1rem 2rem",
                    // width: "20%",
                    borderRadius: "50px",
                    background: "#4a10b4ea",
                    color: "white",
                    fontWeight: "800",
                    textDecoration: "none",
                    display: "flex",
                    alignItems: "center",
                    gap: "0.6rem",
                    boxShadow: "0 10px 20px rgba(74, 16, 180, 0.2)"
                  }}
                >
                  <Sparkles size={20} /> Visit Lab
                </motion.a>
              </div>
            </motion.div>
          )}
        </AnimatePresence>
      </motion.div>

      <footer style={{ marginTop: "4rem", color: "#b2bec3", fontSize: "0.9rem", fontWeight: "600" }}>
        © 2026 MindGlow • The Science of Happy Minds
      </footer>
    </div>
  );
}
