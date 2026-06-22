# 🔒 CyberVault – Advanced Password Generator

<p align="center">
  <a href="https://disha3031.github.io/CyberVault/"><strong>Live Deployment Link »</strong></a>
</p>

<p align="center">
  A state-of-the-art, feature-rich web application engineered to generate cryptographically secure passwords instantly, featuring real-time telemetry metrics, immersive audio feedback, and an interactive UI.
</p>

---

## 📖 Project Description

**CyberVault** is a next-generation security utility designed to eliminate weak, predictable, and human-biased credentials. While standard web utilities rely on predictable random methods like `Math.random()`, CyberVault leverages the client-side **Web Crypto API** to ensure true mathematical randomness and absolute cryptographic integrity.

Beyond core generation, CyberVault serves as an educational framework—providing real-time feedback on security parameters including password strength, entropy calculation (bits), and estimated brute-force crack timelines. Bundled with custom system-matching themes, fluid layout adjustments, canvas physics, and dynamic audio synthesis, CyberVault delivers a premium, engaging tool for daily digital asset protection.

---

## ✨ Features

* **Cryptographically Secure Generation:** Powered natively by the browser's hardware-backed Web Crypto API (`crypto.getRandomValues`).
* **Granular Customization:** Adjustable length bounds scaling from **6 to 32 characters** with individual inclusion matrix controls for:
  * Uppercase Characters (`A-Z`)
  * Lowercase Characters (`a-z`)
  * Numeric Sets (`0-9`)
  * Special Symbology (`!@#$%^&*...`)
* **Real-time Security Telemetry:**
  * Contextual security score indexing.
  * **Password Entropy Analysis** parsed in absolute bits.
  * Algorithmic estimations of brute-force computing times.
* **Session Tracking Engine:** Built-in history logging featuring localized structural toggles to securely audit or hide past keys during a live session.
* **Premium Interactive UX:**
  * Dynamic cloud-drop password entrance animation.
  * In-app badge achievement and custom notification dispatchers.
  * Canvas-based confetti particle bursts triggered upon securing strong generation keys.
  * Lightweight custom audio frequencies synthesized directly using the **Web Audio API**.
* **Modern Utilities:** One-click copy-to-clipboard actions and persistent visibility overlays.

---

## 🚀 Live Demo

Experience the production environment live in your browser:  
🔗 **[CyberVault Production Hub](https://disha3031.github.io/CyberVault/)**

---

## 🛠️ Technologies Used

### Frontend Architecture
* **HTML5:** Semantic document object model, clean form nodes, and layout structure.
* **CSS3:** Advanced responsive rendering leveraging **CSS Grid**, **Flexbox**, custom keyframe layers, and unified orchestration utilizing global **CSS Variables (Custom Properties)**.
* **JavaScript (ES6+):** Vanilla asynchronous event looping, metric calculations, and structural UI data synchronization.

### Specialized Web APIs & Libraries
* **Web Crypto API:** Executes secure client-side pseudorandom token seeding.
* **Web Audio API:** Programmatically synthesizes real-time sound cues without external asset loading.
* **Canvas Confetti:** High-performance vector particle rendering library for user interactions.

---
## 💻 Steps to Run the Project Locally

Because CyberVault is built using modern, native web standard APIs, it runs entirely on the client side. No package installations, node dependencies, or compilation steps are required. 

Follow the steps below to set up and run your local development instance:

### 1. Clone the Codebase
Open your preferred terminal application and execute the git command to pull down the repository:
```bash
git clone [https://github.com/disha3031/CyberVault.git](https://github.com/disha3031/CyberVault.git)

