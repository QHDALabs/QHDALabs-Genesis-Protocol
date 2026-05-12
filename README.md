# 🌌 QHDALabs — Genesis Protocol

[![Status: Active Prototyping](https://img.shields.io/badge/Status-Active_Prototyping-blue.svg)](#) [![AI Act: Submitted](https://img.shields.io/badge/AI_Act-Submitted_to_EC-green.svg)](https://digitcsm.service-now.com/csp?id=digit_sc_category&sys_id=c093f5423b6bea10cc404a2a85e45aba) [![Priority: 2 High](https://img.shields.io/badge/Priority-2_High-orange.svg)](#) [![Ethical Firmware: ROM Locked](https://img.shields.io/badge/Firmware-Hardware_ROM_Locked-red.svg)](#) [![Identity: World ID](https://img.shields.io/badge/Identity-World_ID-black.svg)](#) [![License: MIT](https://img.shields.io/badge/License-MIT-green.svg)](https://github.com/QHDALabs/QHDALabs-Genesis-Protocol/blob/main/LICENSE)

> Interfejs Kalibracji Reguł Etycznych [Q-HSM ROM]  
> Ethical Rules Calibration Interface — powered by Google Gemini AI


---

## Czym jest Genesis Protocol?

Genesis Protocol to otwarta platforma do crowdsourcingu konsensusu etycznego — mechanizm, który pozwala globalnej społeczności wspólnie zdefiniować granice dopuszczalnego działania systemów AI zanim zostaną one wdrożone w sprzęcie.

Centralną ideą projektu jest pytanie: **co powinno być trwale niemożliwe dla systemu AI, niezależnie od tego kto go kontroluje i w jakim celu?**

Odpowiedź na to pytanie nie może być dziełem jednej korporacji, jednego rządu ani jednego inżyniera. Musi wyłonić się z szerokiego, weryfikowalnego konsensusu ludzkiego — i zostać zapisana w sposób odporny na późniejszą zmianę.

> *Jeśli granice etyczne istnieją tylko w oprogramowaniu, mogą zostać nadpisane.  
> Jeśli istnieją w sprzęcie — nie mogą.  
> Jeśli wyłoniły się z konsensusu milionów ludzi — nie powinny.*

---

## Architektura projektu

### Warstwa społeczna — Genesis Portal

Interaktywna platforma głosowania, w której użytkownicy oceniają dylematy etyczne dotyczące działania systemów AI w ekstremalnych scenariuszach. Każdy głos jest uwierzytelniany przez mechanizm weryfikacji tożsamości (Proof of Personhood via World ID), co gwarantuje że konsensus pochodzi od unikalnych ludzi, a nie botnetów czy zorganizowanych kampanii manipulacji.

Portal generuje dylematy przy pomocy modeli językowych (Gemini LLM), prezentując użytkownikom skrajne przypadki brzegowe i mierząc, gdzie przebiega granica akceptowalności dla globalnej społeczności.

### Warstwa danych — parametry konsensusu

Głosowanie przekłada się bezpośrednio na dwa kluczowe parametry liczbowe:

- **`MAX_ENERGY_SPIKE_RATE`** — maksymalny dopuszczalny poziom koncentracji energii w jednym miejscu lub zastosowaniu. Parametr chroni przed militaryzacją technologii.
- **`MIN_BIOSPHERE_VIABILITY`** — minimalny próg ochrony złożoności biologicznej. Parametr chroni ekosystemy przed działaniami o nieodwracalnych skutkach środowiskowych.

Wartości tych parametrów są w całości demokratycznie ustalane przez społeczność. Kod rdzenia pozostaje zamknięty — wartości nim sterujące są w pełni publiczne i audytowalne.

### Warstwa sprzętowa — Quantum Hardware Module X2 (Q-HSM)

Koncepcja sprzętowego modułu etycznego, w którym parametry wyłonione przez konsensus zostają fizycznie zapisane w pamięci ROM (eFuse). Moduł Safe-by-Design fizycznie uniemożliwia wykonanie instrukcji przekraczających ustalone progi — niezależnie od oprogramowania, operatora czy polecenia.

---

## Inicjatywa obywatelska — AI Act

W maju 2025 złożyliśmy trzy formalne zgłoszenia luk regulacyjnych do AI Act Service Desk Komisji Europejskiej (DIGIT CSM). Wszystkie dokumenty są publicznie dostępne w folderze `EU-AI-Act-submissions/`.

| Zgłoszenie | Temat | Status |
|---|---|---|
| Zgłoszenie 1 | Brak publicznego rejestru incydentów AI | ⏳ Oczekuje na odpowiedź |
| Zgłoszenie 2 | Brak zasady proporcjonalności wpływu decyzji AI | ⏳ Oczekuje na odpowiedź |
| Zgłoszenie 3 | Brak gwarancji dostępu obywateli UE do AI | ⏳ Oczekuje na odpowiedź |
| Propozycja obywatelska | Pełny dokument załączony do zgłoszeń | — |

Priorytet nadany przez system KE: **2 — High**. Szczegóły w `STATUS.md`.

Genesis Protocol bezpośrednio adresuje te luki:
- **Brak rejestru incydentów** — Genesis Portal tworzy precedens audytowalnego, publicznego rekordu decyzji etycznych.
- **Brak zasady proporcjonalności** — parametry Q-HSM modelują dokładnie tę zasadę w sprzęcie: im poważniejszy skutek, tym twardsze ograniczenie.
- **Brak gwarancji dostępu** — platforma jest w pełni otwarta i bezpłatna, z kodem na licencji MIT.

Jeśli chcesz złożyć podobne zgłoszenie w swoim kraju — możesz użyć tych dokumentów jako szablonu.

---

## Funkcje portalu / Features

- 🧬 **Dylemat Zero** — interaktywny scenariusz etyczny: ratować kolonistów czy chronić bakteryjny ekosystem?
- 🤖 **Generowanie dylematów AI** — Gemini generuje nowe scenariusze sci-fi na żądanie
- 🔬 **Analiza konsekwencji AI** — Gemini analizuje skutki twojej decyzji w stylu terminala
- ⚙️ **Live ROM Preview** — próg `MIN_BIOSPHERE_VIABILITY` aktualizuje się na żywo w kodzie Rust
- 🌍 **Dwujęzyczność** — pełne wsparcie PL / EN
- 👁️ **World ID** — weryfikacja człowieczeństwa (Worldcoin IDKit / Proof of Personhood)

---

## Stack technologiczny

- **Frontend:** React + Vite + Tailwind CSS
- **LLM:** Google Gemini API (generowanie dylematów etycznych)
- **Tożsamość:** World ID / Worldcoin IDKit (Proof of Personhood)
- **Sprzęt (koncepcja):** Rust — niskopoziomowy kod modułu X2
- **Rejestr głosów (planowany):** rozproszony rejestr Web3 / Blockchain

---

## Wymagania / Requirements

- [Node.js](https://nodejs.org/) w wersji **18 lub nowszej** (sprawdź: `node -v`)
- Klucz API Google Gemini (darmowy): [aistudio.google.com](https://aistudio.google.com/app/apikey)

---

## Szybki start / Quick Start

### 1. Sklonuj repozytorium

```bash
git clone https://github.com/QHDALabs/QHDALabs-Genesis-Protocol.git
cd QHDALabs-Genesis-Protocol
```

### 2. Zainstaluj zależności

```bash
npm install
```

### 3. Skonfiguruj klucz API

Skopiuj plik przykładowy i wpisz swój klucz Gemini:

```bash
cp .env.example .env
```

Otwórz `.env` w edytorze i zastąp `your_gemini_api_key_here` swoim kluczem:

```
VITE_GEMINI_API_KEY=AIza...twój_klucz_tutaj
```

> ⚠️ **Nigdy nie commituj pliku `.env` do repozytorium!** Plik `.gitignore` już go wyklucza.

### 4. Uruchom lokalnie

```bash
npm run dev
```

Aplikacja będzie dostępna pod adresem: **http://localhost:5173**

Bez klucza API aplikacja działa, ale przyciski „Generuj dylemat" i „Analizuj konsekwencje" zwrócą błąd połączenia.

---

## Budowanie do produkcji / Production Build

```bash
npm run build   # pliki trafią do dist/
npm run preview # podgląd builda lokalnie
```

Folder `dist/` gotowy do wdrożenia na Vercel, Netlify, GitHub Pages itp.

---

## Struktura repozytorium

```
/
├── README.md                        — ten dokument
├── manifest-ai-human.md             — Manifest Partnerstwa AI–Człowiek
├── EU-AI-Act-submissions/           — zgłoszenia do KE + status
│   ├── STATUS.md
│   ├── propozycja-obywatelska.txt
│   ├── zgloszenie-1-rejestr-incydentow.txt
│   ├── zgloszenie-2-proporcjonalnosc.txt
│   └── zgloszenie-3-dostep-publiczny.txt
├── src/
│   ├── App.jsx                      — główny komponent portalu React
│   ├── main.jsx                     — punkt wejścia React
│   └── index.css                    — style globalne + Tailwind
├── index.html
├── define.md                        — definicje parametrów i słownik projektu
├── module_X2_firmware.rs            — koncepcja kodu modułu sprzętowego (Rust)
├── .env.example                     — szablon zmiennych środowiskowych
├── package.json
├── vite.config.js
├── tailwind.config.js
├── postcss.config.js
└── LICENSE                          — MIT
```

---

## Roadmapa

**Faza 1 — Fundamenty ✅**
- Inicjalizacja repozytorium i interfejsu terminalowego w React
- Implementacja weryfikacji Proof of Personhood (World ID)
- Zaprojektowanie pierwszego dylematu etycznego i integracja z Gemini API
- Złożenie propozycji obywatelskiej do AI Act Service Desk KE

**Faza 2 — The Coherence Portal ⏳**
- Backend oparty na rozproszonym rejestrze (ochrona integralności głosów)
- Pełna integracja produkcyjna z IDKit
- Algorytmy wykrywające paradoksy logiczne w masowych głosowaniach

**Faza 3 — Testy i symulacje**
- Publiczna wersja Beta
- Stress-testy odporności na zorganizowane kampanie manipulacji
- Publikacja wstępnych Wag Etycznych wyłonionych przez społeczność

**Faza 4 — Synteza**
- Zamrożenie głosowania i niezależny audyt wyników
- Translacja konsensusu na kod układowy w Rust
- Ceremonia zapisu ROM (eFuse Flash Day)

---

## Jak możesz pomóc

- **Inżynierów Smart Contractów** (Solidity / Rust) do budowy niezmiennego systemu rejestracji głosów
- **Filozofów, etyków i twórców science fiction** do rozwijania bazy dylematów dla rdzenia Gemini
- **Ekspertów od architektury sprzętowej** (FPGA / ASIC) do konsultacji nad modułem X2
- **Prawników i ekspertów od prawa UE** do rozwijania propozycji legislacyjnych
- **Tłumaczy** — platforma dąży do pełnej wielojęzyczności UE

Zacznij od lektury `manifest-ai-human.md`, potem otwórz Issue lub Pull Request.

---

## Zmienne środowiskowe

| Zmienna | Opis |
|---|---|
| `VITE_GEMINI_API_KEY` | Klucz API Google Gemini (wymagany dla funkcji AI) |

---

*QHDALabs · Budujemy spójną przyszłość, bezpiecznie.*  
*Licencja MIT · Kopiuj, forkuj, rozwijaj.*