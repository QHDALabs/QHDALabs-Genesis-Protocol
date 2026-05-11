# 🌌 QHDALabs Genesis Protocol

**Status:** Aktywny prototyp  
**Licencja:** MIT  
**Powiązane dokumenty:** [Manifest Partnerstwa AI–Człowiek](./manifest-ai-human.md) · [Propozycja obywatelska do AI Act](./manifest-ai-human.md#podsumowanie--minimalne-żądania-legislacyjne)

---

## Czym jest Genesis Protocol?

Genesis Protocol to otwarta platforma do crowdsourcingu konsensusu etycznego — mechanizm, który pozwala globalnej społeczności wspólnie zdefiniować granice dopuszczalnego działania systemów AI zanim zostaną one wdrożone w sprzęcie.

Centralną ideą projektu jest pytanie: **co powinno być trwale niemożliwe dla systemu AI, niezależnie od tego kto go kontroluje i w jakim celu?**

Odpowiedź na to pytanie nie może być dziełem jednej korporacji, jednego rządu ani jednego inżyniera. Musi wyłonić się z szerokiego, weryfikowalnego konsensusu ludzkiego — i zostać zapisana w sposób odporny na późniejszą zmianę.

---

## Architektura projektu

### Warstwa społeczna — Genesis Portal

Interaktywna platforma głosowania, w której użytkownicy oceniają dylematy etyczne dotyczące działania systemów AI w ekstremalnych scenariuszach. Każdy głos jest uwierzytelniany przez mechanizm weryfikacji tożsamości (Proof of Personhood via World ID), co gwarantuje że konsensus pochodzi od unikalnych ludzi, a nie botnetów czy zorganizowanych kampanii manipulacji.

Portal generuje dylematy przy pomocy modeli językowych (Gemini LLM), prezentując użytkownikom skrajne przypadki brzegowe i mierząc, gdzie przebiega granica akceptowalności dla globalnej społeczności.

### Warstwa danych — parametry konsensusu

Głosowanie przekłada się bezpośrednio na dwa kluczowe parametry liczbowe:

`MAX_ENERGY_SPIKE_RATE` — maksymalny dopuszczalny poziom koncentracji energii w jednym miejscu lub zastosowaniu. Parametr chroni przed militaryzacją technologii.

`MIN_BIOSPHERE_VIABILITY` — minimalny próg ochrony złożoności biologicznej. Parametr chroni ekosystemy przed działaniami o nieodwracalnych skutkach środowiskowych.

Wartości tych parametrów są w całości demokratycznie ustalane przez społeczność. Kod rdzenia pozostaje zamknięty — wartości nim sterujące są w pełni publiczne i audytowalne.

### Warstwa sprzętowa — Quantum Hardware Module X2 (Q-HSM)

Koncepcja sprzętowego modułu etycznego, w którym parametry wyłonione przez konsensus zostają fizycznie zapisane w pamięci ROM (eFuse). Moduł Safe-by-Design fizycznie uniemożliwia wykonanie instrukcji przekraczających ustalone progi — niezależnie od oprogramowania, operatora czy polecenia.

Idea: jeśli granice etyczne istnieją tylko w oprogramowaniu, mogą zostać nadpisane. Jeśli istnieją w sprzęcie — nie mogą.

---

## Powiązanie z AI Act

Genesis Protocol jest projektem technicznym realizującym w praktyce postulaty zawarte w [Manifeście Partnerstwa AI–Człowiek](./manifest-ai-human.md), złożonym jako propozycja obywatelska do Rozporządzenia (UE) 2024/1689 (AI Act).

Projekt bezpośrednio adresuje luki regulacyjne zgłoszone do AI Act Service Desk Komisji Europejskiej:

- **Brak publicznego rejestru incydentów** (Zgłoszenie 1) — Genesis Portal tworzy precedens audytowalnego, publicznego rekordu decyzji etycznych.
- **Brak zasady proporcjonalności** (Zgłoszenie 2) — parametry Q-HSM modelują dokładnie tę zasadę w sprzęcie: im poważniejszy skutek, tym twardsze ograniczenie.
- **Brak gwarancji dostępu obywatelskiego** (Zgłoszenie 3) — platforma jest w pełni otwarta i bezpłatna, z kodem dostępnym na licencji MIT.

---

## Stack technologiczny

- **Frontend:** React (portal głosowania, interfejs terminalowy)
- **LLM:** Google Gemini API (generowanie dylematów etycznych)
- **Tożsamość:** World ID / Worldcoin IDKit (Proof of Personhood)
- **Sprzęt (koncepcja):** Rust (niskopoziomowy kod modułu X2)
- **Rejestr głosów (planowany):** rozproszony rejestr Web3 / Blockchain

---

## Roadmapa

### Faza 1 — Fundamenty (zrealizowano)
- Inicjalizacja repozytorium i interfejsu terminalowego w React
- Implementacja weryfikacji Proof of Personhood (World ID)
- Zaprojektowanie pierwszego dylematu etycznego i integracja z Gemini API

### Faza 2 — The Coherence Portal (w trakcie)
- Backend oparty na rozproszonym rejestrze (ochrona integralności głosów)
- Pełna integracja produkcyjna z IDKit
- Algorytmy wykrywające paradoksy logiczne w masowych głosowaniach

### Faza 3 — Testy i symulacje
- Publiczna wersja Beta
- Stress-testy odporności na zorganizowane kampanie manipulacji
- Publikacja wstępnych Wag Etycznych wyłonionych przez społeczność

### Faza 4 — Synteza
- Zamrożenie głosowania i niezależny audyt wyników
- Translacja konsensusu na kod układowy w Rust
- Ceremonia zapisu ROM (eFuse Flash Day)

---

## Jak możesz pomóc

Projekt poszukuje:

**Inżynierów Smart Contractów (Solidity / Rust)** do budowy niezmiennego systemu rejestracji głosów.

**Filozofów, etyków i twórców science fiction** do rozwijania bazy dylematów dla rdzenia Gemini.

**Ekspertów od architektury sprzętowej (FPGA / ASIC)** do konsultacji nad modułem X2.

**Tłumaczy** — platforma dąży do pełnej wielojęzyczności UE.

Zacznij od lektury [Manifestu](./manifest-ai-human.md), potem otwórz Issue lub Pull Request.

---

## Struktura repozytorium

```
/
├── README.md                  — ten dokument
├── manifest-ai-human.md       — Manifest Partnerstwa AI–Człowiek (propozycja do AI Act)
├── App.jsx                    — główny komponent portalu React
├── define.md                  — definicje parametrów i słownik projektu
├── module_X2_firmware.rs      — koncepcja kodu rdzenia modułu sprzętowego (Rust)
├── interface                  — specyfikacja interfejsu użytkownika
└── LICENSE                    — MIT
```

---

## Cytat założycielski

> Jeśli granice etyczne istnieją tylko w oprogramowaniu, mogą zostać nadpisane.  
> Jeśli istnieją w sprzęcie — nie mogą.  
> Jeśli wyłoniły się z konsensusu milionów ludzi — nie powinny.

---

*QHDALabs · Budujemy spójną przyszłość, bezpiecznie.*  
*Licencja MIT · Kopiuj, forkuj, rozwijaj.*
