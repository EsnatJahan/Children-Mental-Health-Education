# MindGlow - Mental Health Education Project

## Project Overview
MindGlow is a web-based mental health education platform designed to promote awareness, emotional well-being, and resilience. The application provides interactive educational content, including 3D visualizations of the human brain to demonstrate the physiological effects of stress and digital overstimulation.

### Core Technologies
- **Framework:** React 19 with TypeScript
- **Build Tool:** Vite
- **3D Rendering:** Three.js, `@react-three/fiber`, `@react-three/drei`
- **Animations:** Framer Motion
- **Styling:** Tailwind CSS (v4), Vanilla CSS
- **Routing:** React Router DOM (v7)
- **Icons:** Lucide React, React Icons

---

## Getting Started

### Prerequisites
- Node.js (Latest LTS recommended)
- npm or yarn

### Installation
Navigate to the `frontend` directory and install dependencies:
```bash
cd frontend
npm install
```

### Key Commands
- **Development:** `npm run dev` - Starts the Vite development server.
- **Build:** `npm run build` - Compiles the project using TypeScript and Vite.
- **Lint:** `npm run lint` - Runs ESLint to check for code quality and style issues.
- **Preview:** `npm run preview` - Previews the production build locally.

---

## Project Structure
The project is organized as a single-page application (SPA) within the `frontend` directory:

- **`frontend/src/`**: Main source code.
  - **`Pages/`**: Contains the primary views of the application.
    - `home.tsx`: Landing page with overview and introduction.
    - `lectures.tsx`: Interactive educational scene with 3D brain simulation.
    - `login.tsx` / `signup.tsx`: Authentication pages.
  - **`Models/`**: React Three Fiber components.
    - `brainmodel.tsx`: Interactive 3D brain model using GLTF.
  - **`assets/`**: Static assets including images and 3D models (`.glb`).
  - **`CssFiles/`**: Component-specific CSS files.
  - `main.tsx`: Application entry point and routing configuration.

---

## Development Conventions

### Architecture
- **Functional Components:** All components should be implemented as functional components using TypeScript for type safety.
- **Routing:** Centralized routing is managed in `main.tsx` using `react-router-dom`.
- **State Management:** Local state (`useState`, `useEffect`) is used for interactive simulations and UI transitions.

### Styling
- **Hybrid Approach:** The project uses a mix of Tailwind CSS for utility-first styling and component-specific CSS files for complex layouts.
- **Animations:** Use `framer-motion` for UI transitions and scroll animations to enhance the "alive" feel of the application.

### 3D Visuals
- 3D models are loaded via `useGLTF` from `@react-three/drei`.
- Dynamic visual feedback (e.g., stress coloring) is implemented within the `useFrame` hook in Three.js components.

---

## Roadmap & Features
- [x] 3D Brain Stress Simulation
- [x] Educational Content Cards
- [x] Responsive Navigation
- [x] User Progress Tracking (Mental Health Tests)
- [ ] Health Conditions Documentation
- [ ] Backend Integration for User Accounts
