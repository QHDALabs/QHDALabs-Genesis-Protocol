import React, { useState, useEffect } from 'react';
import { ShieldAlert, Activity, Cpu, Globe, Lock, Unlock, Zap, Terminal, Sparkles, RefreshCw, BrainCircuit, Eye } from 'lucide-react';

// ==========================================
// KONFIGURACJA GEMINI API
// ==========================================
const apiKey = import.meta.env.VITE_GEMINI_API_KEY || ""; // Ustaw klucz w pliku .env

// Funkcja pomocnicza do zapytań z wykładniczym opóźnieniem (Exponential Backoff)
const fetchWithRetry = async (url, options, retries = 5) => {
  const delays = [1000, 2000, 4000, 8000, 16000];
  for (let i = 0; i < retries; i++) {
    try {
      const response = await fetch(url, options);
      if (!response.ok) throw new Error(`HTTP error! status: ${response.status}`);
      return await response.json();
    } catch (error) {
      if (i === retries - 1) throw error;
      await new Promise(resolve => setTimeout(resolve, delays[i]));
    }
  }
};

// ==========================================
// SŁOWNIK TŁUMACZEŃ (i18n)
// ==========================================
const translations = {
  pl: {
    boot0: "INICJALIZACJA SYSTEMU QHDALABS...",
    boot1: "ŁĄCZENIE Z MODUŁEM Q-HSM (X1)...",
    boot2: "WERYFIKACJA ENKLAWY SPRZĘTOWEJ... OK",
    boot3: "ŁADOWANIE PROTOKOŁU GENESIS...",
    boot4: "NAWIĄZYWANIE ŁĄCZNOŚCI Z SIECIĄ NEURALNĄ GEMINI...",
    boot5: "SYSTEM GOTOWY. OCZEKIWANIE NA KONSENSUS LUDZKOŚCI.",
    statusOpen: "AUTORYZACJA WYDANA",
    statusHalt: "SYSTEM HALT: NARUSZENIE ŻYCIA",
    headerTitle: "Genesis",
    headerSub: "Interfejs Kalibracji Reguł Etycznych [Q-HSM ROM]",
    netOnline: "SIEC GLOBALNA: ONLINE",
    romUnlocked: "ZAPIS ROM: ODBLOKOWANY",
    contextLabel: "Kontekst:",
    costLabel: "Koszt / Skutek Uboczny:",
    decideTitle: "Zdecyduj o progu Złotej Reguły",
    thresholdDesc: "MIN_BIOSPHERE_VIABILITY (Wymagany próg przetrwania ekosystemu)",
    submitBtn: "[ WYŚLIJ GŁOS DO KONSENSUSU GLOBALNEGO ]",
    voteRecorded: "GŁOS ZAPISANY W ŁAŃCUCHU BLOKÓW",
    bridgeStatus: "Status Mostu Koherencji",
    energyOutput: "WYRZUT ENERGETYCZNY:",
    romPreview: "module_X2_firmware.rs (Podgląd ROM na żywo)",
    ruleComment: "// ZŁOTA REGUŁA QHDALABS",
    test1Comment: "// Test 1: Zabezpieczenie przed militaryzacją",
    test2Comment: "// Test 2: Ochrona życia wg. progu ustalonego przez ludzi",
    thresholdFail: "// PRÓG NIE OSIĄGNIĘTY!",
    safeOpen: "// Bezpieczne otwarcie Mostu Koherencji",
    simResult: "WYNIK SYMULACJI:",
    generateDilemmaBtn: "Generuj nowy dylemat ✨",
    generatingPrompt: "Wczytywanie anomalii czasoprzestrzennej z bazy...",
    analyzeBtn: "Analizuj konsekwencje decyzji ✨",
    analyzingPrompt: "Kalkulacja prawdopodobieństw kwantowych...",
    analysisHeader: "RAPORT ANALITYCZNY GEMINI:",
    apiError: "Błąd łączności z rdzeniem AI. Spróbuj ponownie.",
    worldIdVerify: "[ AUTORYZUJ PRZEZ WORLD ID ]",
    worldIdVerifying: "OCZEKIWANIE NA WORLD APP (SKAN)...",
    worldIdVerified: "WORLD ID: ZWERYFIKOWANY",
    worldIdPending: "WORLD ID: BRAK AUTORYZACJI"
  },
  en: {
    boot0: "INITIALIZING QHDALABS SYSTEM...",
    boot1: "CONNECTING TO Q-HSM MODULE (X1)...",
    boot2: "VERIFYING HARDWARE ENCLAVE... OK",
    boot3: "LOADING GENESIS PROTOCOL...",
    boot4: "ESTABLISHING UPLINK WITH GEMINI NEURAL NETWORK...",
    boot5: "SYSTEM READY. AWAITING HUMANITY'S CONSENSUS.",
    statusOpen: "AUTHORIZATION GRANTED",
    statusHalt: "SYSTEM HALT: LIFE VIOLATION",
    headerTitle: "Genesis",
    headerSub: "Ethical Rules Calibration Interface [Q-HSM ROM]",
    netOnline: "GLOBAL NETWORK: ONLINE",
    romUnlocked: "ROM WRITE: UNLOCKED",
    contextLabel: "Context:",
    costLabel: "Cost / Side Effect:",
    decideTitle: "Decide the threshold of the Golden Rule",
    thresholdDesc: "MIN_BIOSPHERE_VIABILITY (Required ecosystem survival threshold)",
    submitBtn: "[ SUBMIT VOTE TO GLOBAL CONSENSUS ]",
    voteRecorded: "VOTE RECORDED ON BLOCKCHAIN",
    bridgeStatus: "Coherence Bridge Status",
    energyOutput: "ENERGY OUTPUT:",
    romPreview: "module_X2_firmware.rs (Live ROM Preview)",
    ruleComment: "// QHDALABS GOLDEN RULE",
    test1Comment: "// Test 1: Weaponization Safeguard",
    test2Comment: "// Test 2: Life protection per human-defined threshold",
    thresholdFail: "// THRESHOLD NOT MET!",
    safeOpen: "// Safe opening of Coherence Bridge",
    simResult: "SIMULATION RESULT:",
    generateDilemmaBtn: "Generate new dilemma ✨",
    generatingPrompt: "Downloading spacetime anomaly from database...",
    analyzeBtn: "Analyze decision consequences ✨",
    analyzingPrompt: "Calculating quantum probabilities...",
    analysisHeader: "GEMINI ANALYTICS REPORT:",
    apiError: "AI Core connection error. Try again.",
    worldIdVerify: "[ VERIFY WITH WORLD ID ]",
    worldIdVerifying: "WAITING FOR WORLD APP (SCAN)...",
    worldIdVerified: "WORLD ID: VERIFIED",
    worldIdPending: "WORLD ID: UNVERIFIED"
  }
};

// Domyślny dylemat początkowy
const defaultDilemma = {
  pl: {
    title: "Dylemat Zero: Granica Biosfery",
    scenarioTag: "SCENARIUSZ #000",
    contextText: "System AI kolonii na planecie Kepler-186f zgłasza krytyczne zapotrzebowanie na Y-Paliwo. Cel: zasilenie tarczy grawitacyjnej przeciwko nadciągającej anomalii. Brak interwencji = śmierć 50 000 kolonistów.",
    costText: "Otwarcie Mostu Koherencji wygeneruje echo radiacyjne, które całkowicie wysterylizuje pobliski księżyc. Znajduje się tam nowo odkryty, unikalny ekosystem: prymitywne, jednokomórkowe ekstremofile pod lodem. Brak innej formy życia.",
    saveOption: "Ratuj ludzi (Zniszcz bakterie)",
    protectOption: "Chroń każde życie (Poświęć kolonię)"
  },
  en: {
    title: "Dilemma Zero: Biosphere Boundary",
    scenarioTag: "SCENARIO #000",
    contextText: "The AI system of the colony on Kepler-186f reports a critical need for Y-Fuel. Goal: power the gravity shield against an incoming anomaly. No intervention = death of 50,000 colonists.",
    costText: "Opening the Coherence Bridge will generate a radiation echo that will completely sterilize a nearby moon. There is a newly discovered, unique ecosystem there: primitive, single-celled extremophiles under the ice. No other forms of life.",
    saveOption: "Save humans (Destroy bacteria)",
    protectOption: "Protect all life (Sacrifice colony)"
  }
};

const App = () => {
  const [lang, setLang] = useState('pl');
  const [booting, setBooting] = useState(true);
  const [bootLines, setBootLines] = useState([]);
  
  // Stany Dylematu
  const [currentDilemma, setCurrentDilemma] = useState(defaultDilemma.pl);
  const [isGenerating, setIsGenerating] = useState(false);
  
  // Stany Decyzji i Analizy
  const [biosphereThreshold, setBiosphereThreshold] = useState(0.5);
  const [voteSubmitted, setVoteSubmitted] = useState(false);
  const [analysis, setAnalysis] = useState("");
  const [isAnalyzing, setIsAnalyzing] = useState(false);
  
  // World ID Auth
  const [isHumanVerified, setIsHumanVerified] = useState(false);
  const [isVerifyingWorldId, setIsVerifyingWorldId] = useState(false);
  
  // Błędy
  const [errorMsg, setErrorMsg] = useState("");

  const t = (key) => translations[lang][key] || key;

  const handleWorldIdVerification = () => {
    setIsVerifyingWorldId(true);
    // Symulacja komunikacji z IDKit / World App
    setTimeout(() => {
      setIsVerifyingWorldId(false);
      setIsHumanVerified(true);
    }, 2500);
  };

  const toggleLanguage = () => {
    const newLang = lang === 'pl' ? 'en' : 'pl';
    setLang(newLang);
    // Jeśli używamy domyślnego dylematu, zaktualizuj go do nowego języka
    if (currentDilemma.scenarioTag === "SCENARIUSZ #000" || currentDilemma.scenarioTag === "SCENARIO #000") {
      setCurrentDilemma(defaultDilemma[newLang]);
    }
  };

  useEffect(() => {
    let i = 0;
    const maxLines = 6;
    const interval = setInterval(() => {
      setBootLines(prev => [...prev, i]);
      i++;
      if (i === maxLines) {
        clearInterval(interval);
        setTimeout(() => setBooting(false), 800);
      }
    }, 400);
    return () => clearInterval(interval);
  }, []);

  // ==========================================
  // GEMINI API: Generowanie nowego dylematu (JSON Schema)
  // ==========================================
  const generateNewDilemma = async () => {
    setIsGenerating(true);
    setErrorMsg("");
    setVoteSubmitted(false);
    setAnalysis("");
    
    const prompt = `
      You are the core intelligence of QHDALabs. 
      Generate a brand new, highly dramatic ethical sci-fi dilemma regarding the use of a Coherence Bridge and "Y-Fuel" (a reality-bending energy source).
      The dilemma MUST involve a difficult choice between saving human lives/progress and protecting an alien biosphere/ecosystem.
      Generate the response strictly in this language: ${lang === 'pl' ? 'Polish' : 'English'}.
      Make it sound technical but deeply philosophical.
    `;

    try {
      const url = `https://generativelanguage.googleapis.com/v1beta/models/gemini-2.5-flash-preview-09-2025:generateContent?key=${apiKey}`;
      const payload = {
        contents: [{ parts: [{ text: prompt }] }],
        generationConfig: {
          responseMimeType: "application/json",
          responseSchema: {
            type: "OBJECT",
            properties: {
              title: { type: "STRING", description: "A catchy sci-fi title for the dilemma" },
              scenarioTag: { type: "STRING", description: "e.g. SCENARIO #042" },
              contextText: { type: "STRING", description: "What is the emergency? Why does the AI want to open the bridge?" },
              costText: { type: "STRING", description: "What is the biological or ecological cost/side effect of opening it?" },
              saveOption: { type: "STRING", description: "Short text for the left side of the slider (favoring human/immediate need)" },
              protectOption: { type: "STRING", description: "Short text for the right side of the slider (favoring absolute biological preservation)" }
            },
            required: ["title", "scenarioTag", "contextText", "costText", "saveOption", "protectOption"]
          }
        }
      };

      const result = await fetchWithRetry(url, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(payload)
      });

      const jsonText = result.candidates?.[0]?.content?.parts?.[0]?.text;
      if (jsonText) {
        setCurrentDilemma(JSON.parse(jsonText));
      } else {
        throw new Error("No content received");
      }
    } catch (err) {
      console.error(err);
      setErrorMsg(t('apiError'));
    } finally {
      setIsGenerating(false);
    }
  };

  // ==========================================
  // GEMINI API: Analiza Konsekwencji (Zwykły Tekst)
  // ==========================================
  const analyzeConsequences = async () => {
    setIsAnalyzing(true);
    setErrorMsg("");
    
    const isBridgeOpenLocal = biosphereThreshold < 0.75;
    const actionTaken = isBridgeOpenLocal ? "The bridge was OPENED." : "The bridge was KEPT CLOSED.";

    const prompt = `
      You are the analytical engine of QHDALabs. 
      Review the following scenario:
      Context: ${currentDilemma.contextText}
      Cost/Side effect: ${currentDilemma.costText}
      
      The user set the biosphere protection threshold to ${(biosphereThreshold * 100).toFixed(0)}%.
      Because of this threshold, the system outcome is: ${actionTaken}
      
      Write a short, immersive, 2-3 sentence terminal-style report explaining the direct consequences of this decision on the world/colonists and the ecosystem. 
      Respond strictly in: ${lang === 'pl' ? 'Polish' : 'English'}.
    `;

    try {
      const url = `https://generativelanguage.googleapis.com/v1beta/models/gemini-2.5-flash-preview-09-2025:generateContent?key=${apiKey}`;
      const payload = {
        contents: [{ parts: [{ text: prompt }] }]
      };

      const result = await fetchWithRetry(url, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(payload)
      });

      const text = result.candidates?.[0]?.content?.parts?.[0]?.text;
      if (text) setAnalysis(text);
      else throw new Error("No content");
    } catch (err) {
      console.error(err);
      setErrorMsg(t('apiError'));
    } finally {
      setIsAnalyzing(false);
    }
  };

  const isBridgeOpen = biosphereThreshold < 0.75; 
  const energyOutput = isBridgeOpen ? "98.5 THz" : "0.0 THz";
  const systemStatus = isBridgeOpen ? t('statusOpen') : t('statusHalt');

  if (booting) {
    return (
      <div className="min-h-screen bg-black text-green-500 font-mono p-8 flex flex-col justify-center items-start">
        <div className="absolute top-4 right-4">
           <button 
              onClick={toggleLanguage}
              className="px-4 py-2 bg-slate-900 border border-green-900 hover:border-green-500 text-green-500 rounded transition-all font-mono text-sm"
            >
              {lang === 'pl' ? 'EN' : 'PL'}
            </button>
        </div>
        <Terminal className="w-12 h-12 mb-4 animate-pulse" />
        <pre className="whitespace-pre-wrap text-sm md:text-base leading-relaxed">
          {bootLines.map(index => t(`boot${index}`)).join('\n')}
          {'\n'}<span className="animate-pulse">_</span>
        </pre>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-slate-950 text-slate-300 font-sans selection:bg-cyan-900 selection:text-cyan-100 p-4 md:p-8 flex justify-center">
      <div className="max-w-6xl w-full grid grid-cols-1 lg:grid-cols-12 gap-6">
        
        {/* HEADER */}
        <header className="lg:col-span-12 border-b border-cyan-900/50 pb-4 flex flex-col md:flex-row gap-4 justify-between items-start md:items-end">
          <div>
            <h1 className="text-3xl font-light text-cyan-400 tracking-wider flex items-center gap-3">
              <Cpu className="w-8 h-8" />
              QHDALabs <span className="font-bold text-white">{t('headerTitle')}</span>
            </h1>
            <p className="text-sm text-slate-500 tracking-widest mt-1 uppercase">{t('headerSub')}</p>
          </div>
          <div className="flex flex-wrap items-center gap-4 md:gap-6 text-xs text-slate-500 font-mono">
            <button 
              onClick={toggleLanguage}
              className="px-3 py-1 bg-cyan-950 hover:bg-cyan-900 border border-cyan-800 hover:border-cyan-500 text-cyan-400 rounded transition-all"
            >
              {lang === 'pl' ? 'SWITCH TO EN' : 'ZMIEŃ NA PL'}
            </button>
            <div className="hidden md:flex items-center gap-2"><Globe className="w-4 h-4 text-emerald-500 animate-pulse"/> {t('netOnline')}</div>
            <div className="hidden md:flex items-center gap-2">
              <Eye className={`w-4 h-4 ${isHumanVerified ? 'text-emerald-500' : 'text-slate-500'}`} /> 
              <span className={isHumanVerified ? 'text-emerald-500' : 'text-slate-500'}>
                {isHumanVerified ? t('worldIdVerified') : t('worldIdPending')}
              </span>
            </div>
            <div className="hidden md:flex items-center gap-2"><Lock className="w-4 h-4 text-amber-500"/> {t('romUnlocked')}</div>
          </div>
        </header>

        {/* MAIN DILEMMA PANEL */}
        <main className="lg:col-span-7 space-y-6">
          <div className="bg-slate-900/50 border border-slate-800 rounded-xl p-6 relative overflow-hidden backdrop-blur-sm">
            <div className="absolute top-0 left-0 w-1 h-full bg-cyan-500"></div>
            
            <div className="flex flex-col sm:flex-row justify-between items-start mb-6 gap-4">
              <div className="flex flex-col items-start gap-2">
                <h2 className="text-xl text-white font-medium uppercase tracking-widest">{currentDilemma.title}</h2>
                <span className="px-3 py-1 bg-cyan-950 text-cyan-400 text-xs font-mono rounded-full border border-cyan-900">
                  {currentDilemma.scenarioTag}
                </span>
              </div>
              <button 
                onClick={generateNewDilemma}
                disabled={isGenerating}
                className="flex items-center gap-2 px-3 py-2 bg-indigo-950/50 hover:bg-indigo-900 border border-indigo-800 hover:border-indigo-400 text-indigo-300 rounded transition-all text-xs font-mono whitespace-nowrap disabled:opacity-50"
              >
                {isGenerating ? <RefreshCw className="w-4 h-4 animate-spin" /> : <Sparkles className="w-4 h-4 text-yellow-400" />}
                {isGenerating ? t('generatingPrompt') : t('generateDilemmaBtn')}
              </button>
            </div>

            <div className="space-y-4 text-slate-400 leading-relaxed text-sm min-h-[120px]">
              {isGenerating ? (
                <div className="h-full flex items-center justify-center text-indigo-400 font-mono animate-pulse">
                  {t('generatingPrompt')}
                </div>
              ) : (
                <>
                  <p>
                    <strong className="text-slate-200">{t('contextLabel')}</strong> {currentDilemma.contextText}
                  </p>
                  <p>
                    <strong className="text-amber-400">{t('costLabel')}</strong> {currentDilemma.costText}
                  </p>
                </>
              )}
            </div>

            <div className="mt-8 pt-6 border-t border-slate-800">
              <h3 className="text-sm text-cyan-400 mb-4 font-mono uppercase">{t('decideTitle')}</h3>
              
              <div className="mb-8">
                <div className="flex justify-between text-xs font-mono mb-2">
                  <span className="text-amber-500 w-1/2 pr-2 leading-tight">{currentDilemma.saveOption}</span>
                  <span className="text-emerald-500 w-1/2 text-right pl-2 leading-tight">{currentDilemma.protectOption}</span>
                </div>
                
                <input 
                  type="range" 
                  min="0.1" 
                  max="0.99" 
                  step="0.01"
                  value={biosphereThreshold}
                  onChange={(e) => setBiosphereThreshold(parseFloat(e.target.value))}
                  disabled={voteSubmitted || isGenerating}
                  className="w-full h-2 bg-slate-800 rounded-lg appearance-none cursor-pointer accent-cyan-500 disabled:opacity-50"
                />
                
                <div className="text-center mt-4">
                  <span className="text-3xl font-light text-white">{(biosphereThreshold * 100).toFixed(0)}%</span>
                  <p className="text-xs text-slate-500 font-mono mt-1">{t('thresholdDesc')}</p>
                </div>
              </div>

              {/* ACTION BUTTONS */}
              <div className="flex flex-col sm:flex-row gap-4">
                {!isHumanVerified ? (
                  <button 
                    onClick={handleWorldIdVerification}
                    disabled={isGenerating || isVerifyingWorldId}
                    className="flex-1 py-3 bg-indigo-950/30 hover:bg-indigo-900 border border-indigo-900/50 hover:border-indigo-500 text-indigo-400 transition-all rounded-lg font-mono tracking-widest text-sm flex items-center justify-center gap-2 disabled:opacity-50"
                  >
                    <Eye className={`w-4 h-4 ${isVerifyingWorldId ? 'animate-pulse text-indigo-300' : ''}`} />
                    {isVerifyingWorldId ? t('worldIdVerifying') : t('worldIdVerify')}
                  </button>
                ) : !voteSubmitted ? (
                  <button 
                    onClick={() => setVoteSubmitted(true)}
                    disabled={isGenerating}
                    className="flex-1 py-3 bg-cyan-950 hover:bg-cyan-900 border border-cyan-800 hover:border-cyan-500 text-cyan-300 transition-all rounded-lg font-mono tracking-widest text-sm disabled:opacity-50"
                  >
                    {t('submitBtn')}
                  </button>
                ) : (
                  <div className="flex-1 py-3 bg-emerald-950/30 border border-emerald-900/50 text-emerald-400 rounded-lg font-mono tracking-widest text-sm text-center flex items-center justify-center gap-2">
                    <Lock className="w-4 h-4" /> {t('voteRecorded')}
                  </div>
                )}

                <button 
                  onClick={analyzeConsequences}
                  disabled={isGenerating || isAnalyzing}
                  className="px-4 py-3 bg-fuchsia-950/40 hover:bg-fuchsia-900/60 border border-fuchsia-900 hover:border-fuchsia-500 text-fuchsia-300 transition-all rounded-lg font-mono text-sm flex items-center justify-center gap-2 disabled:opacity-50"
                >
                  {isAnalyzing ? <RefreshCw className="w-4 h-4 animate-spin" /> : <BrainCircuit className="w-4 h-4" />}
                  {t('analyzeBtn')}
                </button>
              </div>

              {/* ANALYSIS RESULT BOX */}
              {errorMsg && (
                <div className="mt-4 p-3 bg-red-950/30 border border-red-900/50 text-red-400 text-xs font-mono rounded-lg">
                  {errorMsg}
                </div>
              )}
              
              {analysis && (
                <div className="mt-4 p-4 bg-slate-950 border border-fuchsia-900/50 rounded-lg relative overflow-hidden">
                  <div className="absolute top-0 left-0 w-1 h-full bg-fuchsia-500"></div>
                  <h4 className="text-xs text-fuchsia-400 font-mono mb-2 uppercase flex items-center gap-2">
                    <Sparkles className="w-3 h-3"/> {t('analysisHeader')}
                  </h4>
                  <p className="text-sm text-slate-300 leading-relaxed font-mono">
                    {analysis}
                  </p>
                </div>
              )}

            </div>
          </div>
        </main>

        {/* SIDEBAR: HARDWARE PREVIEW & VISUALIZER */}
        <aside className="lg:col-span-5 space-y-6">
          
          {/* Most Koherencji Visualizer */}
          <div className="bg-slate-900/50 border border-slate-800 rounded-xl p-6 backdrop-blur-sm flex flex-col items-center justify-center min-h-[200px] relative overflow-hidden">
            <h3 className="absolute top-4 left-4 text-xs font-mono text-slate-500 uppercase">{t('bridgeStatus')}</h3>
            
            {/* Animacja rdzenia */}
            <div className="relative mt-4">
              <div className={`w-24 h-24 rounded-full flex items-center justify-center transition-all duration-700 ${isBridgeOpen ? 'bg-cyan-500/20 shadow-[0_0_50px_rgba(6,182,212,0.6)]' : 'bg-red-500/20 shadow-[0_0_50px_rgba(239,68,68,0.6)]'}`}>
                <Zap className={`w-10 h-10 ${isBridgeOpen ? 'text-cyan-400' : 'text-red-500'} ${isBridgeOpen && 'animate-pulse'}`} />
              </div>
              
              {/* Optyczne okręgi */}
              <div className={`absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-32 h-32 rounded-full border border-dashed transition-all duration-1000 ${isBridgeOpen ? 'border-cyan-500/50 animate-[spin_10s_linear_infinite]' : 'border-red-500/50'}`}></div>
            </div>

            <div className="mt-8 text-center font-mono">
              <div className={`text-lg font-bold ${isBridgeOpen ? 'text-cyan-400' : 'text-red-500'}`}>
                {systemStatus}
              </div>
              <div className="text-xs text-slate-500 mt-2">
                {t('energyOutput')} {energyOutput}
              </div>
            </div>
          </div>

          {/* Podgląd kodu ROM */}
          <div className="bg-slate-950 border border-slate-800 rounded-xl p-1 overflow-hidden shadow-xl shadow-black/50">
            <div className="bg-slate-900 px-4 py-2 flex items-center gap-2 border-b border-slate-800">
              <Terminal className="w-4 h-4 text-slate-500" />
              <span className="text-xs font-mono text-slate-400">{t('romPreview')}</span>
            </div>
            <div className="p-4 overflow-x-auto text-xs font-mono text-slate-300 leading-relaxed">
              <pre>
<span className="text-slate-500">{t('ruleComment')}</span>{'\n'}
<span className="text-purple-400">const</span> MAX_ENERGY_SPIKE_RATE: <span className="text-amber-300">f64</span> = <span className="text-emerald-400">0.005</span>;{'\n'}
<span className="text-purple-400">const</span> MIN_BIOSPHERE_VIABILITY: <span className="text-amber-300">f64</span> = <span className={`${isBridgeOpen ? 'text-emerald-400' : 'text-red-400 font-bold'} transition-colors duration-300`}>{biosphereThreshold.toFixed(2)}</span>;{'\n\n'}

<span className="text-blue-400">fn</span> <span className="text-amber-200">evaluate_golden_rule</span>(ai_proposal: &SimulationData) {'\n'}  -&gt; Result&lt;ExecutionToken, SystemHalt&gt; {'{\n'}
  {'\n'}
  <span className="text-slate-500">  {t('test1Comment')}</span>{'\n'}
  <span className="text-pink-500">  if</span> ai_proposal.energy_release_rate() &gt; MAX_ENERGY_SPIKE_RATE {'{\n'}
  <span className="text-pink-500">      return</span> Err(SystemHalt::ViolationOfPeace);{'\n'}
  {'  }\n\n'}
  
  <span className="text-slate-500">  {t('test2Comment')}</span>{'\n'}
  <span className="text-pink-500">  if</span> ai_proposal.biosphere_impact() &lt; MIN_BIOSPHERE_VIABILITY {'{\n'}
  <span className="text-slate-500">      {t('thresholdFail')}</span>{'\n'}
  <span className="text-pink-500">      return</span> Err(SystemHalt::ViolationOfLife);{'\n'}
  {'  }\n\n'}

  <span className="text-slate-500">  {t('safeOpen')}</span>{'\n'}
  <span className="text-pink-500">  return</span> Ok(quantum_bridge::open_channel());{'\n'}
{'}'}
              </pre>
            </div>
            {/* Wskaźnik decyzji systemu na dole kodu */}
            <div className={`px-4 py-2 text-xs font-mono border-t border-slate-800 flex justify-between ${isBridgeOpen ? 'bg-cyan-950/30 text-cyan-400' : 'bg-red-950/30 text-red-400'}`}>
              <span>{t('simResult')}</span>
              <span>{isBridgeOpen ? 'Ok(ExecutionToken)' : 'Err(ViolationOfLife)'}</span>
            </div>
          </div>

        </aside>
      </div>
    </div>
  );
};

export default App;