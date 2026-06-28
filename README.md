# My Engineering Portfolio

Welcome to my personal portfolio repository, this project serves as a production-grade showcase of my work operating at the intersection of quantitative data processing, modern full-stack web applications, and immersive interactions. 

The entire site is optimized for performance, clean typography, and seamless dark-mode glassmorphism visual balance.

---

## 🛠️ Core Tech Stack & Architecture

* **Framework:** Next.js 14+ (App Router) / React Ecosystem
* **Styling:** Tailwind CSS (Fluid responsive layouts, custom translucent gradients, and backdrop blurs)
* **3D Graphics:** React Three Fiber (R3F) & `@react-three/drei` (Three.js WebGL Wrapper)

---

## ✨ Spotlight Feature: Embedded Interactive 3D Teacup

Integrated directly alongside the responsive Contact Form layout is a lightweight, custom-engineered **3D Teacup Canvas** designed to elevate standard user engagement into a memorable interaction.

### ⚙️ Technical Highlights:
* **Dynamic Mirror Chrome Material:** Engineered with a roughness factor of `0.02` and full `1.0` metalness coupled with a virtual studio environment lightmap. The cup dynamically bounces sharp highlights as users spin or orbit the camera.
* **Controlled Rotation Matrix:** Clicking the cup doesn't just spin it indefinitely—it calculates exactly one fluid $360^\circ$ ($2\pi$ radians) lap using physics-based linear interpolation (`lerp`), scaling up smoothly to reveal a clean UI overlay.
* **Recessed Realism:** Built using precise nested cylindrical coordinates to map a hollow inner chamber. The organic tea liquid is deeply recessed down into the base, eliminating visual clipping and creating true perspective depth when viewed from above.
* **Polished Obsidian Saucer:** A mathematically lathed, deep black saucer (`#050505`) with low roughness to ground the shimmering cup with premium ceramic highlights.

---
## ⚖️ License & Attribution

This project is open-source software licensed under the **MIT License**.

### Terms of Use:
* You are completely free to clone this repository, fork the UI architecture, or modify the 3D canvas pipeline logic for your own applications.
* The original copyright notice and permission notice must be preserved in all copies or substantial portions of the software.


[![License: MIT](https://img.shields.io/badge/License-MIT-green.svg)](/LICENSE)

----------------------------------------------------------------------------------------------------------
