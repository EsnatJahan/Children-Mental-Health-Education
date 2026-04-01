import React, { useState, useEffect, Suspense } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Canvas } from "@react-three/fiber";
import { OrbitControls, Stage, PerspectiveCamera } from "@react-three/drei";
import { 
  Home, 
  Brain, 
  Gamepad2, 
  BookOpen, 
  Trees, 
  Moon, 
  Info, 
  ArrowRight,
  ShieldCheck,
  Zap,
  Heart,
  RefreshCw,
  Sparkles
} from "lucide-react";
import Brain3D from "../Models/brainmodel";
import childNormal from "../assets/happy.png";
import childPhone from "../assets/c1.png";

type ActivityType = 'none' | 'screen' | 'reading' | 'outdoor' | 'sleep';

export default function MentalScene() {
  const [stress, setStress] = useState(0);
  const [activeActivity, setActiveActivity] = useState<ActivityType>('none');

  // Brain Logic based on activity
  useEffect(() => {
    let interval: any;
    
    if (activeActivity === 'screen') {
      interval = setInterval(() => {
        setStress((prev) => Math.min(prev + 0.04, 1));
      }, 400);
    } else if (activeActivity === 'outdoor' || activeActivity === 'sleep') {
      interval = setInterval(() => {
        setStress((prev) => Math.max(prev - 0.06, 0));
      }, 400);
    } else if (activeActivity === 'reading') {
      interval = setInterval(() => {
        setStress((prev) => Math.max(prev - 0.02, 0.1));
      }, 400);
    }

    return () => clearInterval(interval);
  }, [activeActivity]);

  const activities = [
    { 
      id: 'screen', 
      label: 'Video Games', 
      icon: <Gamepad2 size={24} />, 
      color: '#ff4757', 
      description: 'Too much screen time can make your brain "spark" with too much energy!' 
    },
    { 
      id: 'reading', 
      label: 'Reading', 
      icon: <BookOpen size={24} />, 
      color: '#2f3542', 
      description: 'Reading helps your brain focus and stay calm like a quiet library.' 
    },
    { 
      id: 'outdoor', 
      label: 'Outdoor Play', 
      icon: <Trees size={24} />, 
      color: '#2ed573', 
      description: 'Fresh air and running help your brain "breathe" and lower stress.' 
    },
    { 
      id: 'sleep', 
      label: 'Deep Sleep', 
      icon: <Moon size={24} />, 
      color: '#1e90ff', 
      description: 'When you sleep, your brain "cleans" itself and recharges for tomorrow!' 
    },
  ];

  const getBrainStatus = () => {
    if (stress < 0.3) return { label: "Super Happy!", color: "#2ed573", emoji: "🌈", sub: "Doing Great!" };
    if (stress < 0.7) return { label: "A Bit Tired", color: "#ffa502", emoji: "☁️", sub: "Needs Rest" };
    return { label: "High Stress!", color: "#ff4757", emoji: "⚡", sub: "Calm Down" };
  };

  const status = getBrainStatus();

  return (
    <div style={{ 
      minHeight: "100vh", 
      background: "#f8faff", 
      fontFamily: "'Segoe UI', Roboto, Helvetica, Arial, sans-serif",
      color: "#2d3436"
    }}>
      {/* Navigation */}
      <nav style={{
        display: "flex",
        alignItems: "center",
        justifyContent: "space-between",
        padding: "1.2rem 4rem",
        background: "rgba(255, 255, 255, 0.8)",
        backdropFilter: "blur(10px)",
        boxShadow: "0 4px 30px rgba(0,0,0,0.03)",
        position: "sticky",
        top: 0,
        zIndex: 100,
        borderBottom: "1px solid #f0f0f0"
      }}>
        <div style={{ fontSize: "1.6rem", fontWeight: "800", color: "#4a10b4ea", display: "flex", alignItems: "center", gap: "0.6rem" }}>
          <Brain size={36} fill="#4a10b4ea" strokeWidth={1.5} /> 
          <span style={{ letterSpacing: "-0.5px" }}>MindGlow</span>
        </div>
        <div style={{ display: "flex", gap: "2.5rem", alignItems: "center" }}>
          <a href="/" style={{ textDecoration: "none", color: "#636e72", fontWeight: "600", display: "flex", alignItems: "center", gap: "0.4rem", transition: "0.2s" }} onMouseOver={e => e.currentTarget.style.color = "#4a10b4ea"} onMouseOut={e => e.currentTarget.style.color = "#636e72"}>
            <Home size={18} /> Home
          </a>
          <a href="/performtest" style={{ textDecoration: "none", color: "#636e72", fontWeight: "600", display: "flex", alignItems: "center", gap: "0.4rem", transition: "0.2s" }} onMouseOver={e => e.currentTarget.style.color = "#4a10b4ea"} onMouseOut={e => e.currentTarget.style.color = "#636e72"}>
            <ShieldCheck size={18} /> Take Test
          </a>
          <a href="/signup" style={{ 
            background: "#4a10b4ea", 
            color: "white", 
            padding: "0.7rem 1.5rem", 
            borderRadius: "50px", 
            textDecoration: "none",
            fontWeight: "700",
            boxShadow: "0 10px 20px rgba(74, 16, 180, 0.2)",
            transition: "0.3s transform"
          }} onMouseOver={e => e.currentTarget.style.transform = "scale(1.05)"} onMouseOut={e => e.currentTarget.style.transform = "scale(1)"}>Join Now</a>
        </div>
      </nav>

      <main style={{ maxWidth: "1300px", margin: "0 auto", padding: "3rem 2rem" }}>
        
        {/* Title Section */}
        <header style={{ textAlign: "center", marginBottom: "4rem" }}>
          <motion.div
            initial={{ scale: 0.8, opacity: 0 }}
            animate={{ scale: 1, opacity: 1 }}
            style={{ display: "inline-flex", alignItems: "center", gap: "0.5rem", background: "#edf2ff", color: "#4a10b4ea", padding: "0.5rem 1rem", borderRadius: "50px", fontWeight: "700", fontSize: "0.9rem", marginBottom: "1.5rem" }}
          >
            <Sparkles size={16} /> INTERACTIVE LEARNING
          </motion.div>
          <motion.h1 
            initial={{ y: 20, opacity: 0 }}
            animate={{ y: 0, opacity: 1 }}
            transition={{ delay: 0.1 }}
            style={{ color: "#2d3436", fontSize: "3.5rem", marginBottom: "1rem", fontWeight: "800", letterSpacing: "-1px" }}
          >
            Explore Your <span style={{ color: "#4a10b4ea", position: "relative" }}>
              Amazing Brain
              <motion.div 
                initial={{ width: 0 }} animate={{ width: "100%" }} transition={{ delay: 0.5, duration: 1 }}
                style={{ position: "absolute", bottom: "8px", left: 0, height: "12px", background: "#4a10b422", zIndex: -1, borderRadius: "5px" }} 
              />
            </span>! 🧠
          </motion.h1>
          <p style={{ color: "#636e72", fontSize: "1.3rem", maxWidth: "600px", margin: "0 auto", lineHeight: "1.5" }}>
            The Brain Lab helps you see how your daily activities change your mind's energy and mood!
          </p>
        </header>

        <div style={{ display: "grid", gridTemplateColumns: "1.3fr 1fr", gap: "3rem", alignItems: "start" }}>
          
          {/* CONTROL PANEL */}
          <div style={{ display: "flex", flexDirection: "column", gap: "2rem" }}>
            
            {/* Status Card */}
            <motion.div 
              layout
              style={{
                background: "white",
                padding: "2rem",
                borderRadius: "32px",
                boxShadow: "0 20px 50px rgba(0,0,0,0.06)",
                border: `1px solid ${status.color}33`,
                position: "relative",
                overflow: "hidden"
              }}
            >
              <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", marginBottom: "1.5rem" }}>
                <div>
                  <h3 style={{ margin: 0, color: "#636e72", fontSize: "0.9rem", textTransform: "uppercase", letterSpacing: "1px" }}>Power Meter</h3>
                  <div style={{ fontSize: "1.8rem", fontWeight: "800", color: status.color }}>{status.label}</div>
                </div>
                <div style={{ fontSize: "3.5rem" }}>{status.emoji}</div>
              </div>
              
              <div style={{ height: "30px", background: "#f0f2f5", borderRadius: "15px", overflow: "hidden", position: "relative", marginBottom: "1rem" }}>
                <motion.div 
                  animate={{ width: `${(1 - stress) * 100}%`, background: status.color }}
                  style={{ height: "100%", borderRadius: "15px", boxShadow: `0 0 20px ${status.color}66` }}
                />
              </div>
              <div style={{ display: "flex", justifyContent: "space-between", fontSize: "0.85rem", color: "#b2bec3", fontWeight: "700" }}>
                <span>DRAINED</span>
                <span>FULLY CHARGED!</span>
              </div>
            </motion.div>

            {/* Activities Selection */}
            <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: "1.2rem" }}>
              {activities.map((act) => (
                <motion.button
                  key={act.id}
                  whileHover={{ y: -5, boxShadow: "0 10px 25px rgba(0,0,0,0.08)" }}
                  whileTap={{ scale: 0.95 }}
                  onClick={() => setActiveActivity(act.id as ActivityType)}
                  style={{
                    padding: "1.5rem 1rem",
                    borderRadius: "28px",
                    border: "none",
                    width: "10%",
                    marginLeft: "30%",
                    background: activeActivity === act.id ? act.color : "white",
                    color: activeActivity === act.id ? "yellow" : "#2d3436",
                    cursor: "pointer",
                    display: "flex",
                    flexDirection: "column",
                    alignItems: "center",
                    gap: "0.8rem",
                    boxShadow: activeActivity === act.id 
                      ? `0 15px 30px ${act.color}44` 
                      : "0 4px 15px rgba(0,0,0,0.03)",
                    transition: "all 0.3s cubic-bezier(0.4, 0, 0.2, 1)"
                  }}
                >
                  <div style={{ 
                    background: activeActivity === act.id ? "rgba(255,255,255,0.2)" : `${act.color}11`, 
                    padding: "0.8rem", 
                    borderRadius: "20px",
                    color: activeActivity === act.id ? "white" : act.color
                  }}>
                    {act.icon}
                  </div>
                  <span style={{ fontWeight: "700", fontSize: "1rem" }}>{act.label}</span>
                </motion.button>
              ))}
            </div>

            {/* Dynamic Tip */}
            <AnimatePresence mode="wait">
              {activeActivity !== 'none' && (
                <motion.div
                  key={activeActivity}
                  initial={{ opacity: 0, scale: 0.9 }}
                  animate={{ opacity: 1, scale: 1 }}
                  exit={{ opacity: 0, scale: 0.9 }}
                  style={{
                    background: "#ffffff",
                    padding: "1.8rem",
                    borderRadius: "32px",
                    boxShadow: "0 15px 35px rgba(0,0,0,0.05)",
                    borderLeft: `8px solid ${activities.find(a => a.id === activeActivity)?.color}`
                  }}
                >
                  <div style={{ display: "flex", alignItems: "center", gap: "0.8rem", marginBottom: "0.8rem" }}>
                    <Info size={24} color="#4a10b4ea" />
                    <span style={{ fontWeight: "800", color: "#4a10b4ea", letterSpacing: "0.5px" }}>LAB DISCOVERY</span>
                  </div>
                  <p style={{ margin: 0, fontSize: "1.1rem", color: "#636e72", lineHeight: "1.6", fontWeight: "500" }}>
                    {activities.find(a => a.id === activeActivity)?.description}
                  </p>
                </motion.div>
              )}
            </AnimatePresence>

            <button 
              onClick={() => { setActiveActivity('none'); setStress(0); }}
              style={{
                marginTop: "1rem",
                padding: "1.2rem",
                borderRadius: "24px",
                border: "2px solid #dfe6e9",
                background: "transparent",
                width: "50%",
                marginLeft: "25%",
                color: "#8f9da3",
                fontWeight: "700",
                fontSize: "1rem",
                cursor: "pointer",
                display: "flex",
                alignItems: "center",
                justifyContent: "center",
                gap: "0.5rem",
                transition: "0.2s"
              }}
              onMouseOver={e => { e.currentTarget.style.color = "#636e72"; e.currentTarget.style.borderColor = "#636e72"; }}
              onMouseOut={e => { e.currentTarget.style.color = "#b2bec3"; e.currentTarget.style.borderColor = "#dfe6e9"; }}
            >
              <RefreshCw size={18} /> Restart Simulation
            </button>
          </div>

          {/* 3D VISUALIZER PANEL */}
          <div style={{ 
            background: "linear-gradient(180deg, #ffffff 0%, #f1f4ff 100%)", 
            borderRadius: "48px", 
            padding: "3rem", 
            height: "700px", 
            boxShadow: "0 40px 100px rgba(0,0,0,0.08)",
            display: "flex",
            flexDirection: "column",
            position: "relative",
            overflow: "hidden",
            border: "1px solid white"
          }}>
            
            {/* Visualizer Header */}
            <div style={{ position: "absolute", top: "2rem", left: "2rem", right: "2rem", display: "flex", justifyContent: "space-between", zIndex: 10 }}>
              <div style={{ background: "white", padding: "0.5rem 1rem", borderRadius: "50px", fontWeight: "700", fontSize: "0.8rem", color: "#b2bec3", boxShadow: "0 4px 10px rgba(0,0,0,0.02)" }}>
                3D BRAIN SCAN v2.0
              </div>
              <div style={{ display: "flex", gap: "0.5rem" }}>
                <div style={{ width: "12px", height: "12px", borderRadius: "50%", background: "#ff4757" }} />
                <div style={{ width: "12px", height: "12px", borderRadius: "50%", background: "#ffa502" }} />
                <div style={{ width: "12px", height: "12px", borderRadius: "50%", background: "#2ed573" }} />
              </div>
            </div>

            <div style={{ flex: 1, position: "relative", cursor: "grab" }}>
              <Suspense fallback={
                <div style={{ display: "flex", flexDirection: "column", justifyContent: "center", alignItems: "center", height: "100%", gap: "1rem" }}>
                  <motion.div animate={{ rotate: 360 }} transition={{ repeat: Infinity, duration: 1, ease: "linear" }}>
                    <Brain size={40} color="#4a10b4ea" />
                  </motion.div>
                  <span style={{ fontWeight: "700", color: "#b2bec3" }}>PREPARING 3D SCAN...</span>
                </div>
              }>
                <Canvas camera={{ position: [0, 0, 12], fov: 50 }} gl={{ alpha: true }}>
                  <ambientLight intensity={1.2} />
                  <directionalLight position={[5, 10, 5]} intensity={1.5} />
                  <Brain3D stress={stress} />
                  <OrbitControls enableZoom={false} autoRotate autoRotateSpeed={0.5} />
                </Canvas>
              </Suspense>
            </div>

            {/* Activity Comparison Footer */}
            <div style={{ 
              background: "rgba(255, 255, 255, 0.5)", 
              backdropFilter: "blur(10px)",
              borderRadius: "32px",
              padding: "1.5rem",
              display: "flex", 
              justifyContent: "space-between", 
              alignItems: "center",
              marginTop: "auto"
            }}>
              <div style={{ display: "flex", alignItems: "center", gap: "1.5rem" }}>
                <motion.div 
                  key={activeActivity}
                  initial={{ scale: 0.8, opacity: 0 }}
                  animate={{ scale: 1, opacity: 1 }}
                  style={{ textAlign: "center" }}
                >
                  <div style={{ background: "white", padding: "0.5rem", borderRadius: "20px", boxShadow: "0 10px 20px rgba(0,0,0,0.05)", marginBottom: "0.5rem" }}>
                    <img 
                      src={activeActivity === 'screen' ? childPhone : childNormal} 
                      alt="Current State" 
                      style={{ height: "80px", width: "80px", objectFit: "contain" }} 
                    />
                  </div>
                  <div style={{ fontSize: "0.75rem", fontWeight: "800", color: "#636e72" }}>YOUR ACTION</div>
                </motion.div>

                <motion.div 
                  animate={{ 
                    x: activeActivity === 'none' ? 0 : [0, 8, 0],
                    opacity: activeActivity === 'none' ? 0.3 : 1
                  }}
                  transition={{ repeat: Infinity, duration: 1.5 }}
                  style={{ color: status.color }}
                >
                  <ArrowRight size={32} />
                </motion.div>

                <div style={{ textAlign: "center" }}>
                  <motion.div 
                    animate={{ scale: [1, 1.1, 1] }}
                    transition={{ repeat: Infinity, duration: 2 }}
                    style={{ fontSize: "3.5rem", marginBottom: "0.2rem" }}
                  >
                    {status.emoji}
                  </motion.div>
                  <div style={{ fontSize: "0.75rem", fontWeight: "800", color: "#636e72" }}>RESULT</div>
                </div>
              </div>

              <div style={{ textAlign: "right", borderLeft: "2px solid rgba(0,0,0,0.05)", paddingLeft: "1.5rem" }}>
                <div style={{ fontSize: "0.8rem", fontWeight: "700", color: "#b2bec3", marginBottom: "0.2rem" }}>CURRENT EFFECT</div>
                <div style={{ fontSize: "1.2rem", fontWeight: "800", color: status.color }}>
                  {status.sub}
                </div>
              </div>
            </div>

            {/* Particle Effects for Stress */}
            <AnimatePresence>
              {activeActivity === 'screen' && (
                <motion.div 
                  initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }}
                  style={{ position: "absolute", top: "30%", left: "50%", transform: "translateX(-50%)", pointerEvents: "none" }}
                >
                  <motion.div animate={{ y: [-20, 20, -20], rotate: [0, 10, -10, 0] }} transition={{ repeat: Infinity, duration: 2 }}>
                    <Zap size={100} color="#ff4757" style={{ opacity: 0.1 }} />
                  </motion.div>
                </motion.div>
              )}
              {(activeActivity === 'outdoor' || activeActivity === 'sleep') && (
                <motion.div 
                  initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }}
                  style={{ position: "absolute", top: "30%", left: "50%", transform: "translateX(-50%)", pointerEvents: "none" }}
                >
                  <motion.div animate={{ scale: [0.8, 1.2, 0.8] }} transition={{ repeat: Infinity, duration: 3 }}>
                    <Heart size={100} color="#2ed573" style={{ opacity: 0.1 }} />
                  </motion.div>
                </motion.div>
              )}
            </AnimatePresence>
          </div>

        </div>

        {/* Footer Lesson Section */}
        <motion.section 
          initial={{ opacity: 0, y: 50 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          style={{
            marginTop: "6rem",
            padding: "4rem",
            background: "linear-gradient(135deg, #4a10b4ea 0%, #6c5ce7 100%)",
            borderRadius: "56px",
            color: "white",
            textAlign: "center",
            boxShadow: "0 30px 60px rgba(74, 16, 180, 0.2)",
            position: "relative",
            overflow: "hidden"
          }}
        >
          {/* Decorative shapes */}
          <div style={{ position: "absolute", top: "-20px", left: "-20px", width: "150px", height: "150px", borderRadius: "50%", background: "white", opacity: 0.05 }} />
          <div style={{ position: "absolute", bottom: "-50px", right: "-50px", width: "200px", height: "200px", borderRadius: "50%", background: "white", opacity: 0.05 }} />

          <h2 style={{ fontSize: "2.8rem", marginBottom: "1.5rem", fontWeight: "800" }}>The MindGlow Mission 🌟</h2>
          <p style={{ fontSize: "1.3rem", maxWidth: "850px", margin: "0 auto 3rem", lineHeight: "1.7", opacity: 0.9 }}>
            Just like your body needs healthy food to grow tall, your brain needs "Mindful Habits" to stay smart and happy. 
            Finding the right balance between tech, play, and rest is the secret superpower of every hero!
          </p>
          
          <div style={{ display: "flex", justifyContent: "center", gap: "3rem", flexWrap: "wrap" }}>
            {[
              { label: "Brain Safety", icon: <ShieldCheck /> },
              { label: "Daily Nature", icon: <Trees /> },
              { label: "Deep Power-Up", icon: <Moon /> }
            ].map((item, i) => (
              <motion.div 
                key={i}
                whileHover={{ scale: 1.1 }}
                style={{ display: "flex", flexDirection: "column", alignItems: "center", gap: "0.8rem" }}
              >
                <div style={{ background: "rgba(255,255,255,0.2)", padding: "1.2rem", borderRadius: "24px" }}>
                  {item.icon}
                </div>
                <span style={{ fontWeight: "700", fontSize: "1.1rem" }}>{item.label}</span>
              </motion.div>
            ))}
          </div>
        </motion.section>

      </main>

      <footer style={{ textAlign: "center", padding: "4rem 2rem", borderTop: "1px solid #f0f0f0", background: "white" }}>
        <div style={{ color: "#2d3436", fontWeight: "800", fontSize: "1.2rem", marginBottom: "0.5rem" }}>MindGlow Laboratory</div>
        <div style={{ color: "#b2bec3", fontSize: "0.9rem" }}>Helping the next generation grow brighter minds since 2026.</div>
      </footer>
    </div>
  );
}
