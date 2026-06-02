# 🚀 Creative Machine Learning & Full-Stack UI Engineering Portfolio

Welcome to my personal portfolio repository! This project serves as a production-grade showcase of my work operating at the intersection of quantitative data processing, modern full-stack web applications, and immersive frontend interactions. 

The entire site is optimized for performance, clean typography, and seamless dark-mode glassmorphism visual balance.

---

## 🛠️ Core Tech Stack & Architecture

* **Framework:** Next.js 14+ (App Router) / React Ecosystem
* **Styling:** Tailwind CSS (Fluid responsive layouts, custom translucent gradients, and backdrop blurs)
* **3D Graphics:** React Three Fiber (R3F) & `@react-three/drei` (Three.js WebGL Wrapper)
* **Form Infrastructure:** Asynchronous Web3Forms API Pipeline

---

## ✨ Spotlight Feature: Embedded Interactive 3D Teacup

Integrated directly alongside the responsive Contact Form layout is a lightweight, custom-engineered **3D Teacup Canvas** designed to elevate standard user engagement into a memorable interaction.

### ⚙️ Technical Highlights:
* **Dynamic Mirror Chrome Material:** Engineered with a roughness factor of `0.02` and full `1.0` metalness coupled with a virtual studio environment lightmap. The cup dynamically bounces sharp highlights as users spin or orbit the camera.
* **Controlled Rotation Matrix:** Clicking the cup doesn't just spin it indefinitely—it calculates exactly one fluid $360^\circ$ ($2\pi$ radians) lap using physics-based linear interpolation (`lerp`), scaling up smoothly to reveal a clean UI overlay.
* **Recessed Realism:** Built using precise nested cylindrical coordinates to map a hollow inner chamber. The organic tea liquid is deeply recessed down into the base, eliminating visual clipping and creating true perspective depth when viewed from above.
* **Polished Obsidian Saucer:** A mathematically lathed, deep black saucer (`#050505`) with low roughness to ground the shimmering cup with premium ceramic highlights.

---

## 🚀 Installation & Local Environment Setup

### 1. Clone the Source Repository
```bash
git clone [https://github.com/Butkii025/my-portfolio.git](https://github.com/Butkii025/my-portfolio.git)
cd my-portfolio

2.Install Project Dependencies
Ensure your workspace includes the core rendering engines required to parse the WebGL viewports cleanly:

Bash
npm install three @react-three/fiber @react-three/drei

3. Initialize Local Engine
Bash
npm run dev
Navigate to http://localhost:3000 to view your local deployment environment live.


📬 Form State Lifecycle
The asymmetric grid module routes contact messages seamlessly across four explicit transactional states:
idle ➡️ loading ➡️ success or error

This safeguards asynchronous request loops on the client thread, changing the behavior of the interaction state machine automatically while maintaining persistent canvas states in the concurrent 3D workspace viewport.

----------------------------------------------------------------------------------------------------------