# Hype't // Master Control Workspace

> "Everything you need, optimized."

Hype't is a hyper-minimalist, high-end personal lifestyle dashboard designed by **Clocked Development**. It consolidates fragmented daily utilities—mental health journaling, financial ledger tracking, biological cycle trends, and culinary preparation matrices—into a single, unified interface. 

Inspired by the structured layout of Trello but optimized for zero distractions, Hype't features a completely isolated workspace where individual modules are entirely hidden until requested via the master navigation network.

---

## ⚡ Core Philosophy & Security Architecture

Hype't operates strictly under a **zero-knowledge, client-side execution model**. It bypasses data-harvesting cloud databases and premium subscription paywalls entirely by utilizing sandboxed browser architecture:

* **Absolute Data Privacy:** Your financial logs, bio-cycle data, and emotional logs stay entirely inside your browser's persistent `localStorage`. No data packets ever leave your machine.
* **Cryptographic Journal Vault:** The mental health journal uses **AES-256 (Advanced Encryption Standard)** symmetric key cryptography via CryptoJS. Your entries are fully encrypted *before* being written to disk. Without your custom local passphrase, the raw strings are mathematically unreadable.
* **Hybrid Entry Sequence:** Access to the control panel is gated behind a premium security wall, offering instant access via a secure developer-assigned PIN or a simulated Discord OAuth2 client-side implicit grant handshake.

---

## 📂 Project Architecture

Unlike bloated modern web apps, Hype't uses a lightweight, mid-sized file structure optimized for speed and hardware acceleration:

```text
hypet/
├── index.html   # Main structural architecture and UI layouts
├── style.css    # Premium glassmorphic dark theme & custom animations
└── app.js       # Core cryptographic engine and state controller
