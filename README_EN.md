# 🌌 QHDALabs — Genesis Protocol

**Status:** Active Prototyping · **AI Act:** Submitted · **Priority:** 2 High · **Ethical Firmware:** ROM Locked · **Identity:** World ID · **License:** MIT

> 🇵🇱 **Polish version:** [README.md](./README.md)

---

## Ethical Rules Calibration Interface [Q-HSM ROM]
*powered by Google Gemini AI*

---

## What is Genesis Protocol?

Genesis Protocol is an open platform for crowdsourcing ethical consensus — a mechanism that allows the global community to collectively define the boundaries of permissible AI system behaviour **before** they are embedded in hardware.

The central question of the project: **what should be permanently impossible for an AI system, regardless of who controls it and for what purpose?**

The answer to that question cannot be the work of a single corporation, a single government, or a single engineer. It must emerge from broad, verifiable human consensus — and be recorded in a way that is resistant to subsequent change.

> If ethical boundaries exist only in software, they can be overwritten.  
> If they exist in hardware — they cannot.  
> If they emerged from the consensus of millions of people — they should not be.

---

## Context: Why Now?

<details>
<summary><strong>📖 Karen Hao, "Empire of AI" — the book that changes the conversation</strong></summary>

In May 2025, **Karen Hao** — investigative journalist and the first person ever to profile OpenAI for MIT Technology Review — published *Empire of AI: Dreams and Nightmares in Sam Altman's OpenAI*. It immediately became a New York Times bestseller and won the National Book Critics Circle Award for Nonfiction.

Hao's book and her interview (YouTube channel [@mk_thisisit](https://www.youtube.com/watch?v=iOtJAOV82IM)) represent one of the most important contributions to the AI debate in recent years. Hao reveals:

- **The ideology behind the AGI race** — the cult of the "machine god" and rituals inside OpenAI
- **A bubble bigger than the dot-coms** — staggering capital outlays against still-uncertain benefits
- **AI as a new form of colonialism** — from data workers in Kenya to water activists in Chile
- **The threat to democracy** — concentration of power in the hands of a few tech companies
- **The degradation of intellectual work** — and the question of whether AI companies profit from fear of unemployment

Hao's thesis directly resonates with the AI–Human Partnership Manifesto and substantiates every demand of Genesis Protocol: a public incident register, the proportionality principle, guaranteed citizen access.

**If you understand what Hao is saying — you understand why we are building Genesis Protocol.**

</details>

---

## Project Architecture

### Social Layer — Genesis Portal

An interactive voting platform where users evaluate ethical dilemmas about AI system behaviour in extreme scenarios. Every vote is authenticated through an identity verification mechanism (**Proof of Personhood via World ID**), guaranteeing that consensus comes from unique humans, not botnets or organized manipulation campaigns.

The portal generates dilemmas using language models (Gemini LLM), presenting users with extreme edge cases and measuring where the boundary of acceptability lies for the global community.

### Data Layer — Consensus Parameters

Voting translates directly into two key numerical parameters:

- **`MAX_ENERGY_SPIKE_RATE`** — the maximum permissible level of energy concentration in one place or application. This parameter protects against the militarization of technology.
- **`MIN_BIOSPHERE_VIABILITY`** — the minimum threshold for protecting biological complexity. This parameter protects ecosystems from actions with irreversible environmental consequences.

The values of these parameters are determined entirely democratically by the community. The core code remains closed — the values that govern it are fully public and auditable.

### Hardware Layer — Quantum Hardware Module X2 (Q-HSM)

A conceptual hardware ethics module in which consensus-derived parameters are physically written to ROM memory (eFuse). The **Safe-by-Design** module physically prevents the execution of instructions exceeding established thresholds — regardless of software, operator or command.

---

## Citizen Initiative — EU AI Act

In May 2026 we filed three formal regulatory gap submissions to the AI Act Service Desk of the European Commission (DIGIT CSM). All documents are publicly available in the `EU-AI-Act-submissions/` folder.

| Submission | Subject | Status |
|-----------|---------|--------|
| Submission 1 | No public AI incident register | ⏳ Awaiting response |
| Submission 2 | No principle of proportionality of AI decision impact | ⏳ Awaiting response |
| Submission 3 | No guaranteed EU citizen access to AI | ⏳ Awaiting response |

**Priority assigned by EC system: 2 — High.** Details in `STATUS.md`.

Genesis Protocol directly addresses these gaps:
- **No incident register** — Genesis Portal creates a precedent for an auditable, public record of ethical decisions.
- **No proportionality principle** — Q-HSM parameters model exactly this principle in hardware: the more serious the consequence, the harder the constraint.
- **No access guarantee** — the platform is fully open and free, with code under the MIT license.

---

## Manifesto Documents

| Document | Language | Link |
|----------|----------|------|
| AI–Human Partnership Manifesto | 🇬🇧 English | [manifest-ai-human-EN.md](./manifest-ai-human-EN.md) |
| Manifest Partnerstwa AI–Człowiek | 🇵🇱 Polish | [manifest-ai-human-PL.md](./EU-AI-Act-submissions/manifest-ai-human-PL.md) |
| Main version (external links) | 🇵🇱 Polish | [manifest-ai-human.md](./manifest-ai-human.md) |

---

## Portal Features

- 🧬 **Dilemma Zero** — interactive ethical scenario: save the colonists or protect the bacterial ecosystem?
- 🤖 **AI Dilemma Generation** — Gemini generates new sci-fi scenarios on demand
- 🔬 **AI Consequence Analysis** — Gemini analyses the consequences of your decision in terminal style
- ⚙️ **Live ROM Preview** — the `MIN_BIOSPHERE_VIABILITY` threshold updates live in Rust code
- 🌍 **Bilingual** — full PL / EN support
- 👁️ **World ID** — proof of humanity (Worldcoin IDKit / Proof of Personhood)

---

## Tech Stack

- **Frontend:** React + Vite + Tailwind CSS
- **LLM:** Google Gemini API (ethical dilemma generation)
- **Identity:** World ID / Worldcoin IDKit (Proof of Personhood)
- **Hardware (concept):** Rust — low-level module X2 code
- **Vote registry (planned):** distributed Web3 / Blockchain ledger

---

## Quick Start

### 1. Clone the repository
```bash
git clone https://github.com/QHDALabs/QHDALabs-Genesis-Protocol.git
cd QHDALabs-Genesis-Protocol
```

### 2. Install dependencies
```bash
npm install
```

### 3. Configure the API key
```bash
cp .env.example .env
```
Open `.env` and replace `your_gemini_api_key_here` with your key from [aistudio.google.com](https://aistudio.google.com):
```
VITE_GEMINI_API_KEY=AIza...your_key_here
```
> ⚠️ Never commit the `.env` file to the repository!

### 4. Run locally
```bash
npm run dev
```
App available at: `http://localhost:5173`

Without an API key, the app runs but the "Generate dilemma" and "Analyse consequences" buttons will return a connection error.

### Production Build
```bash
npm run build   # files go to dist/
npm run preview # local build preview
```

The `dist/` folder is ready for deployment on Vercel, Netlify, GitHub Pages, etc.

---

## Repository Structure

```
/
├── README.md                        — Polish version
├── README_EN.md                     — this document
├── manifest-ai-human.md             — Manifesto (main version, external links)
├── manifest-ai-human-EN.md          — Manifesto (English)
├── EU-AI-Act-submissions/
│   ├── STATUS.md
│   ├── manifest-ai-human-PL.md      — Manifesto (full Polish version)
│   ├── propozycja-obywatelska.txt
│   ├── zgloszenie-1-rejestr-incydentow.txt
│   ├── zgloszenie-2-proporcjonalnosc.txt
│   └── zgloszenie-3-dostep-publiczny.txt
├── src/
│   ├── App.jsx
│   ├── main.jsx
│   └── index.css
├── index.html
├── define.md
├── module_X2_firmware.rs
├── .env.example
├── package.json
├── vite.config.js
├── tailwind.config.js
├── postcss.config.js
└── LICENSE
```

---

## Roadmap

**Phase 1 — Foundations ✅**
- Repository and terminal interface initialization in React
- Proof of Personhood verification (World ID) implementation
- First ethical dilemma design and Gemini API integration
- Citizen proposal filed to EC AI Act Service Desk

**Phase 2 — The Coherence Portal ⏳**
- Backend based on distributed ledger (vote integrity protection)
- Full production integration with IDKit
- Algorithms detecting logical paradoxes in mass voting

**Phase 3 — Testing and Simulations**
- Public Beta
- Stress-tests for resistance to organized manipulation campaigns
- Publication of preliminary Ethical Weights derived by the community

**Phase 4 — Synthesis**
- Voting freeze and independent audit of results
- Consensus translation into firmware code in Rust
- ROM Write Ceremony (eFuse Flash Day)

---

## How You Can Help

We are looking for:
- **Smart Contract Engineers** (Solidity / Rust) to build an immutable vote registry
- **Philosophers, ethicists and science fiction writers** to develop the dilemma base for the Gemini core
- **Hardware architecture experts** (FPGA / ASIC) to consult on module X2
- **Lawyers and EU law experts** to develop legislative proposals
- **Translators** — the platform aims for full EU multilingualism

Start by reading `manifest-ai-human-EN.md`, then open an Issue or Pull Request.

---

## Environment Variables

| Variable | Description |
|----------|-------------|
| `VITE_GEMINI_API_KEY` | Google Gemini API key (required for AI features) |

---

*QHDALabs · Building a coherent future, safely.*  
*MIT License · Copy, fork, develop.*
