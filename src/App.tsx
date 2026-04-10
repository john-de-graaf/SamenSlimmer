import { useState, useEffect, useMemo, useCallback } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import confetti from 'canvas-confetti';
import { 
  Cat, Leaf, Rocket, Heart, Calculator, BookOpen, 
  Car, Castle, Home, HelpCircle, Zap, Apple,
  User, Users, RefreshCw, Star, Trophy, ArrowRight, CheckCircle2, XCircle, Play, Pencil, X,
  Bot, Power, Cpu, Database, Gamepad2, BatteryCharging, Trash2, Plus, Loader2, RotateCcw, Palette,
  Ghost, Smile, Music, Camera, Sun, Moon, Cloud, Pizza, Coffee, Bike,
  Activity as ActivityIcon, Bird, Droplets, Lock, Ruler, Mountain, FlaskConical, Sparkles,
  Globe, Briefcase, Recycle, Mic, Award, ChevronDown, ChevronUp,
  Gift, Snowflake, Crown, Flower2, Calendar, Shield, Brain, Target, Timer,
  Wand2, Disc, Trees, IceCream, Sword, Utensils, Glasses, Waves, Coins, ShoppingBag, LayoutGrid, PiggyBank, Puzzle, ArrowLeft, Flame, PartyPopper, MessageCircle,
  Layout
} from 'lucide-react';
import { Level, ModeId, ThemeId, Question, QuizOption, Player, Experiment } from './types';
import { THEMES, MODES, QUESTIONS, EXPERIMENTS, getSeasonalTheme } from './data';
import { KLETSEN_QUESTIONS } from './data_kletsen';
import { CollectionScreen, AvatarIcon } from './components/CardSystem';
import { generateQuestions, generateJokes } from './services/geminiService';
import { SimonSays, ReactionTimer, FastTapper, FourSecondTimer, DotsAndBoxes } from './components/MiniGames';

// Helper to get Lucide icon by name
const getIcon = (name: string, className: string) => {
  const icons: Record<string, any> = {
    Cat, Leaf, Rocket, Heart, Calculator, BookOpen,
    Car, Castle, Home, HelpCircle, Zap, Apple,
    User, Users, RefreshCw, Palette, Star, Trophy, Gamepad2, Bot,
    Ghost, Smile, Music, Camera, Sun, Moon, Cloud, Pizza, Coffee, Bike,
    Activity: ActivityIcon, Bird, Droplets, Lock, Ruler, Mountain, FlaskConical, Sparkles,
    Globe, Briefcase, Recycle, Cpu, Mic, Award,
    Gift, Snowflake, Crown, Flower2, Calendar, Shield, Brain, Target, Timer,
    Wand2, Disc, Trees, IceCream, Sword, Utensils, Glasses, Waves, Coins, ShoppingBag, LayoutGrid, PiggyBank, PartyPopper, MessageCircle
  };
  const Icon = icons[name] || HelpCircle;
  return <Icon className={className} />;
};

// Helper to get theme background colors and patterns
const getThemeBackground = (themeId: ThemeId | null) => {
  let color1, color2, patternColor;
  if (!themeId) {
    return { 
      color1: 'bg-slate-400/10', 
      color2: 'bg-slate-400/10', 
      patternUrl: `data:image/svg+xml,%3Csvg width='40' height='40' xmlns='http://www.w3.org/2000/svg'%3E%3Cpath d='M0 0h40v1H0zM0 0h1v40H0z' fill='%2364748b' fill-opacity='0.05'/%3E%3C/svg%3E` 
    };
  }
  switch (themeId) {
    case 'dieren': color1 = 'bg-orange-400/20'; color2 = 'bg-amber-400/20'; patternColor = '%23f97316'; break;
    case 'natuur': color1 = 'bg-green-400/20'; color2 = 'bg-emerald-400/20'; patternColor = '%2322c55e'; break;
    case 'ruimte': color1 = 'bg-indigo-400/20'; color2 = 'bg-violet-400/20'; patternColor = '%236366f1'; break;
    case 'lichaam': color1 = 'bg-rose-400/20'; color2 = 'bg-pink-400/20'; patternColor = '%23f43f5e'; break;
    case 'rekenen': color1 = 'bg-blue-400/20'; color2 = 'bg-cyan-400/20'; patternColor = '%233b82f6'; break;
    case 'taal': color1 = 'bg-yellow-400/20'; color2 = 'bg-amber-400/20'; patternColor = '%23eab308'; break;
    case 'verkeer': color1 = 'bg-slate-400/20'; color2 = 'bg-gray-400/20'; patternColor = '%2364748b'; break;
    case 'geschiedenis': color1 = 'bg-stone-400/20'; color2 = 'bg-orange-300/20'; patternColor = '%2378716c'; break;
    case 'tvseries': color1 = 'bg-purple-400/20'; color2 = 'bg-indigo-400/20'; patternColor = '%23a855f7'; break;
    case 'youtube': color1 = 'bg-red-400/20'; color2 = 'bg-rose-400/20'; patternColor = '%23ef4444'; break;
    case 'roblox': color1 = 'bg-slate-400/20'; color2 = 'bg-blue-400/20'; patternColor = '%2364748b'; break;
    case 'muziek': color1 = 'bg-indigo-400/20'; color2 = 'bg-blue-400/20'; patternColor = '%236366f1'; break;
    case 'kiezen': color1 = 'bg-purple-400/20'; color2 = 'bg-fuchsia-400/20'; patternColor = '%23a855f7'; break;
    case 'eten': color1 = 'bg-lime-400/20'; color2 = 'bg-green-400/20'; patternColor = '%2384cc16'; break;
    case 'alles': color1 = 'bg-fuchsia-400/20'; color2 = 'bg-violet-400/20'; patternColor = '%23d946ef'; break;
    case 'seizoen': {
      const seasonal = getSeasonalTheme();
      if (seasonal.title.includes('Sinterklaas')) { color1 = 'bg-red-400/20'; color2 = 'bg-yellow-400/20'; patternColor = '%23ef4444'; }
      else if (seasonal.title.includes('Kerst') || seasonal.title.includes('Winter')) { color1 = 'bg-blue-300/20'; color2 = 'bg-slate-200/20'; patternColor = '%233b82f6'; }
      else if (seasonal.title.includes('Lente') || seasonal.title.includes('Pasen')) { color1 = 'bg-green-300/20'; color2 = 'bg-yellow-200/20'; patternColor = '%2322c55e'; }
      else if (seasonal.title.includes('Zomer')) { color1 = 'bg-yellow-400/20'; color2 = 'bg-orange-300/20'; patternColor = '%23eab308'; }
      else if (seasonal.title.includes('Herfst') || seasonal.title.includes('Halloween')) { color1 = 'bg-orange-400/20'; color2 = 'bg-amber-600/20'; patternColor = '%23f97316'; }
      else { color1 = 'bg-slate-400/20'; color2 = 'bg-gray-400/20'; patternColor = '%2364748b'; }
      break;
    }
    case 'thee': color1 = 'bg-amber-400/20'; color2 = 'bg-orange-400/20'; patternColor = '%23f59e0b'; break;
    case 'tafels': color1 = 'bg-amber-400/20'; color2 = 'bg-yellow-400/20'; patternColor = '%23f59e0b'; break;
    default: color1 = 'bg-cyan-400/20'; color2 = 'bg-indigo-400/20'; patternColor = '%2306b6d4'; break;
  }

  const dots = `data:image/svg+xml,%3Csvg width='20' height='20' xmlns='http://www.w3.org/2000/svg'%3E%3Ccircle cx='2' cy='2' r='2' fill='${patternColor}' fill-opacity='0.1'/%3E%3C/svg%3E`;
  const grid = `data:image/svg+xml,%3Csvg width='40' height='40' xmlns='http://www.w3.org/2000/svg'%3E%3Cpath d='M0 0h40v1H0zM0 0h1v40H0z' fill='${patternColor}' fill-opacity='0.05'/%3E%3C/svg%3E`;
  const crosses = `data:image/svg+xml,%3Csvg width='20' height='20' xmlns='http://www.w3.org/2000/svg'%3E%3Cpath d='M9 0h2v20H9zM0 9h20v2H0z' fill='${patternColor}' fill-opacity='0.05'/%3E%3C/svg%3E`;
  const diagonal = `data:image/svg+xml,%3Csvg width='10' height='10' xmlns='http://www.w3.org/2000/svg'%3E%3Cpath d='M-1 11L11 -1M9 11L11 9M-1 1L1 -1' stroke='${patternColor}' stroke-opacity='0.08' stroke-width='1'/%3E%3C/svg%3E`;

  let patternUrl = grid;
  switch (themeId) {
    case 'dieren':
    case 'natuur':
    case 'eten':
    case 'alles':
    case 'seizoen':
      patternUrl = dots; break;
    case 'ruimte':
    case 'lichaam':
      patternUrl = diagonal; break;
    case 'rekenen':
    case 'taal':
      patternUrl = grid; break;
    case 'verkeer':
    case 'geschiedenis':
    case 'tvseries':
    case 'youtube':
    case 'roblox':
    case 'muziek':
    case 'kiezen':
    case 'thee':
    case 'tafels':
      patternUrl = crosses; break;
  }

  return { color1, color2, patternUrl };
};

type Screen = 'start' | 'setup' | 'quiz' | 'feedback' | 'end' | 'settings' | 'players' | 'player-edit' | 'collection' | 'tafels-select' | 'tafels-play' | 'gameroom';

const PLAYER_COLORS = [
  { id: 'red', bg: 'bg-red-600', text: 'text-red-600', border: 'border-red-200', light: 'bg-red-50', ring: 'ring-red-500' },
  { id: 'blue', bg: 'bg-blue-600', text: 'text-blue-600', border: 'border-blue-200', light: 'bg-blue-50', ring: 'ring-blue-500' },
  { id: 'yellow', bg: 'bg-yellow-400', text: 'text-yellow-600', border: 'border-yellow-200', light: 'bg-yellow-50', ring: 'ring-yellow-400' },
  { id: 'green', bg: 'bg-green-600', text: 'text-green-600', border: 'border-green-200', light: 'bg-green-50', ring: 'ring-green-500' },
  { id: 'orange', bg: 'bg-orange-500', text: 'text-orange-600', border: 'border-orange-200', light: 'bg-orange-50', ring: 'ring-orange-500' },
  { id: 'pink', bg: 'bg-pink-500', text: 'text-pink-600', border: 'border-pink-200', light: 'bg-pink-50', ring: 'ring-pink-500' },
  { id: 'purple', bg: 'bg-purple-600', text: 'text-purple-600', border: 'border-purple-200', light: 'bg-purple-50', ring: 'ring-purple-500' },
  { id: 'cyan', bg: 'bg-cyan-500', text: 'text-cyan-600', border: 'border-cyan-200', light: 'bg-cyan-50', ring: 'ring-cyan-500' },
  { id: 'lime', bg: 'bg-lime-500', text: 'text-lime-600', border: 'border-lime-200', light: 'bg-lime-50', ring: 'ring-lime-500' },
  { id: 'indigo', bg: 'bg-indigo-600', text: 'text-indigo-600', border: 'border-indigo-200', light: 'bg-indigo-50', ring: 'ring-indigo-500' },
];

const PLAYER_ICONS = [
  { id: 'cat', icon: 'Cat', label: 'Poes' },
  { id: 'rocket', icon: 'Rocket', label: 'Raket' },
  { id: 'heart', icon: 'Heart', label: 'Hartje' },
  { id: 'globe', icon: 'Globe', label: 'Wereld' },
  { id: 'star', icon: 'Star', label: 'Ster' },
  { id: 'trophy', icon: 'Trophy', label: 'Beker' },
  { id: 'gamepad', icon: 'Gamepad2', label: 'Gamen' },
  { id: 'bot', icon: 'Bot', label: 'Robot' },
  { id: 'ghost', icon: 'Ghost', label: 'Spookje' },
  { id: 'smile', icon: 'Smile', label: 'Blij' },
  { id: 'pizza', icon: 'Pizza', label: 'Pizza' },
  { id: 'bike', icon: 'Bike', label: 'Fiets' },
  { id: 'bird', icon: 'Bird', label: 'Vogel' },
  { id: 'apple', icon: 'Apple', label: 'Appel' },
  { id: 'music', icon: 'Music', label: 'Muziek' },
  { id: 'camera', icon: 'Camera', label: 'Foto' },
  { id: 'sun', icon: 'Sun', label: 'Zon' },
  { id: 'moon', icon: 'Moon', label: 'Maan' },
  { id: 'cloud', icon: 'Cloud', label: 'Wolk' },
  { id: 'coffee', icon: 'Coffee', label: 'Warme Choco' },
  { id: 'activity', icon: 'Activity', label: 'Hartslag' },
  { id: 'mountain', icon: 'Mountain', label: 'Bergen' },
  { id: 'flask', icon: 'FlaskConical', label: 'Proefje' },
  { id: 'sparkles', icon: 'Sparkles', label: 'Magie' },
  { id: 'globe', icon: 'Globe', label: 'Wereld' },
  { id: 'award', icon: 'Award', label: 'Medaille' },
  { id: 'gift', icon: 'Gift', label: 'Cadeau' },
  { id: 'snowflake', icon: 'Snowflake', label: 'Sneeuw' },
  { id: 'crown', icon: 'Crown', label: 'Kroon' },
  { id: 'flower', icon: 'Flower2', label: 'Bloem' },
  { id: 'shield', icon: 'Shield', label: 'Schild' },
  { id: 'wand', icon: 'Wand2', label: 'Toverstaf' },
  { id: 'icecream', icon: 'IceCream', label: 'Ijsje' },
  { id: 'sword', icon: 'Sword', label: 'Zwaard' },
  { id: 'glasses', icon: 'Glasses', label: 'Bril' },
];

const APP_FACTS = [
  "Wist je dat een blauwe vinvis een hart heeft zo groot als een auto?",
  "Wist je dat er op Mars reusachtige stofstormen zijn die maanden kunnen duren?",
  "Wist je dat honing de enige voeding is die nooit bederft?",
  "Wist je dat een octopus drie harten en negen hersenen heeft?",
  "Wist je dat de Eiffeltoren in de zomer wel 15 centimeter kan groeien door de hitte?",
  "Wist je dat dolfijnen met één oog open slapen om op te letten?",
  "Wist je dat een dag op Venus langer duurt dan een jaar op Venus?",
  "Wist je dat olifanten de enige dieren zijn die niet kunnen springen?",
  "Wist je dat je neus wel 50.000 verschillende geuren kan onthouden?",
  "Wist je dat een kameleon zijn ogen onafhankelijk van elkaar kan bewegen?",
  "Wist je dat de hoogste berg in ons zonnestelsel op Mars staat?",
  "Wist je dat bijen kunnen rekenen en het getal 'nul' begrijpen?",
  "Wist je dat ridders vroeger wel 25 kilo aan harnas moesten dragen?",
  "Wist je dat een banaan eigenlijk een bes is, maar een aardbei niet?",
  "Wist je dat er meer bomen op aarde zijn dan sterren in ons melkwegstelsel?",
  "Wist je dat Leonardo da Vinci de Mona Lisa in meer dan 10 jaar schilderde?",
  "Wist je dat robots al meer dan 50 jaar geleden in de ruimte zijn geweest?",
  "Wist je dat sommige dinosauriërs veren hadden, net als vogels?",
  "Wist je dat de eerste Olympische Spelen meer dan 2700 jaar geleden waren?",
  "Wist je dat muziek luisteren je planten kan helpen om sneller te groeien?",
  "Wist je dat Walt Disney vroeger bang was voor muizen?"
];

const Robot = () => (
  <motion.div
    className="flex flex-col items-center scale-90"
    animate={{ y: [-5, 5, -5] }}
    transition={{ repeat: Infinity, duration: 3, ease: "easeInOut" }}
  >
    {/* Antenna */}
    <div className="relative">
      <div className="w-1 h-6 bg-cyan-400 mx-auto" />
      <div className="w-3 h-3 bg-cyan-400 rounded-full -mt-1" />
    </div>
    {/* Head */}
    <motion.div
      className="w-20 h-16 bg-cyan-500 rounded-lg flex items-center justify-center gap-2 mb-2 shadow-lg border-2 border-cyan-400"
      animate={{ rotate: [-2, 2, -2] }}
      transition={{ repeat: Infinity, duration: 2, ease: "easeInOut" }}
    >
      <div className="w-4 h-4 bg-white rounded-full animate-pulse" />
      <div className="w-4 h-4 bg-white rounded-full animate-pulse" />
    </motion.div>
    {/* Body */}
    <div className="w-24 h-24 bg-cyan-600 rounded-xl flex flex-col items-center justify-center shadow-lg border-4 border-cyan-500/50 gap-2">
      <div className="w-12 h-2 bg-cyan-400 rounded-full" />
      <div className="w-12 h-2 bg-cyan-400 rounded-full" />
    </div>
  </motion.div>
);

export default function App() {
  const [screen, setScreen] = useState<Screen>('start');
  const [currentFactIndex, setCurrentFactIndex] = useState(0);

  // Cycle fun facts
  useEffect(() => {
    if (screen === 'start') {
      const timer = setInterval(() => {
        setCurrentFactIndex((prev) => (prev + 1) % APP_FACTS.length);
      }, 7000);
      return () => clearInterval(timer);
    }
  }, [screen]);
  
  // Game Config
  const [level, setLevel] = useState<Level>('gemengd');
  const [theme, setTheme] = useState<ThemeId | null>(null);
  const [mode, setMode] = useState<ModeId>('alleen');
  const [selectedPlayerIds, setSelectedPlayerIds] = useState<string[]>([]);
  
  // Game State
  const [activeQuestions, setActiveQuestions] = useState<Question[]>([]);
  const [currentIndex, setCurrentIndex] = useState(0);
  const [score, setScore] = useState(0);
  const [answeredCount, setAnsweredCount] = useState(0);
  const [selectedOption, setSelectedOption] = useState<QuizOption | null>(null);
  const [currentPlayer, setCurrentPlayer] = useState(1);
  const [isLoading, setIsLoading] = useState(false);
  const [isFetchingMore, setIsFetchingMore] = useState(false);
  const [waitingForNextQuestion, setWaitingForNextQuestion] = useState(false);
  const [showExperimentModal, setShowExperimentModal] = useState(false);
  const [activeExperiment, setActiveExperiment] = useState<Experiment | null>(null);
  const [activeKletsenQuestion, setActiveKletsenQuestion] = useState<Question | null>(null);
  const [recentQuestionTexts, setRecentQuestionTexts] = useState<string[]>(() => {
    const saved = localStorage.getItem('samenslim_recent_questions');
    return saved ? JSON.parse(saved) : [];
  });

  useEffect(() => {
    localStorage.setItem('samenslim_recent_questions', JSON.stringify(recentQuestionTexts));
  }, [recentQuestionTexts]);

  // Player State
  const [players, setPlayers] = useState<Player[]>(() => {
    const saved = localStorage.getItem('samenslim_players');
    return saved ? JSON.parse(saved) : [];
  });
  const [gamePlayers, setGamePlayers] = useState<Player[]>([]);
  const [newPlayerName, setNewPlayerName] = useState('');
  const [newPlayerAge, setNewPlayerAge] = useState<number>(8);
  const [newPlayerSchoolLevel, setNewPlayerSchoolLevel] = useState<string>('');
  const [newPlayerColor, setNewPlayerColor] = useState<string>('indigo');
  const [newPlayerIcon, setNewPlayerIcon] = useState<string>('cat');
  const [editingPlayerId, setEditingPlayerId] = useState<string | null>(null);
  const [selectedPlayerId, setSelectedPlayerId] = useState<string | null>(null);
  const [lastActivePlayerId, setLastActivePlayerId] = useState<string | null>(() => {
    return localStorage.getItem('samenslim_last_player');
  });

  useEffect(() => {
    if (selectedPlayerId) {
      setLastActivePlayerId(selectedPlayerId);
      localStorage.setItem('samenslim_last_player', selectedPlayerId);
    }
  }, [selectedPlayerId]);
  const [currentPlayerIndex, setCurrentPlayerIndex] = useState(0);
  const [levelChangeMessage, setLevelChangeMessage] = useState<string | null>(null);
  const [showTurnOverlay, setShowTurnOverlay] = useState(false);
  const [showProgressModal, setShowProgressModal] = useState(false);
  const [activeSetupSection, setActiveSetupSection] = useState<'theme' | 'mode'>('theme');
  const [showDiscussion, setShowDiscussion] = useState(false);
  const [hasDiscussed, setHasDiscussed] = useState(false);
  const [jokes, setJokes] = useState<{setup: string, punchline: string}[]>([]);
  const [shownPunchlines, setShownPunchlines] = useState<number[]>([]);
  const [isFetchingJokes, setIsFetchingJokes] = useState(false);
  const [globalShownJokes, setGlobalShownJokes] = useState<string[]>(() => {
    const saved = localStorage.getItem('samenslim_global_jokes');
    return saved ? JSON.parse(saved) : [];
  });
  const [shownKletsenIds, setShownKletsenIds] = useState<string[]>(() => {
    const saved = localStorage.getItem('samenslim_shown_kletsen');
    return saved ? JSON.parse(saved) : [];
  });

  useEffect(() => {
    localStorage.setItem('samenslim_shown_kletsen', JSON.stringify(shownKletsenIds));
  }, [shownKletsenIds]);

  const fetchJokes = useCallback(async (age?: number) => {
    if (isFetchingJokes) return;
    setIsFetchingJokes(true);
    try {
      const newJokes = await generateJokes(age || 8, 3, globalShownJokes);
      setJokes(newJokes);
      setShownPunchlines([]);
      
      const jokeTexts = newJokes.map(j => `${j.setup} ${j.punchline}`);
      setGlobalShownJokes(prev => [...prev, ...jokeTexts].slice(-100));
    } catch (e) {
      console.error("Error fetching jokes:", e);
    } finally {
      setIsFetchingJokes(false);
    }
  }, [isFetchingJokes, globalShownJokes]);

  const togglePunchline = (index: number) => {
    setShownPunchlines(prev => 
      prev.includes(index) ? prev.filter(i => i !== index) : [...prev, index]
    );
  };

  // Pre-load jokes on startup
  useEffect(() => {
    const preload = async () => {
      if (jokes.length === 0 && !isFetchingJokes) {
        fetchJokes(8);
      }
    };
    preload();
  }, []); // Only on mount

  useEffect(() => {
    localStorage.setItem('samenslim_global_jokes', JSON.stringify(globalShownJokes));
  }, [globalShownJokes]);
  const [currentTable, setCurrentTable] = useState<number[]>([]);
  const [selectedTables, setSelectedTables] = useState<number[]>([]);
  const [currentSum, setCurrentSum] = useState<{a: number, b: number, answer: number} | null>(null);
  const [userAnswer, setUserAnswer] = useState('');
  const [tafelFeedback, setTafelFeedback] = useState<'correct' | 'wrong' | null>(null);
  const [activeMiniGame, setActiveMiniGame] = useState<'simon' | 'reaction' | 'tapper' | 'fourSecond' | 'dotsAndBoxes' | null>(null);
  const [pendingMiniGame, setPendingMiniGame] = useState<'simon' | 'reaction' | 'tapper' | 'fourSecond' | 'dotsAndBoxes' | null>(null);
  const [selectedMiniGamePlayerIds, setSelectedMiniGamePlayerIds] = useState<string[]>([]);
  const [miniGameStarted, setMiniGameStarted] = useState(false);
  const [miniGamePlayerIds, setMiniGamePlayerIds] = useState<string[]>([]);
  const [currentMiniGamePlayerIndex, setCurrentMiniGamePlayerIndex] = useState(0);
  const [showMiniGameTurnTransition, setShowMiniGameTurnTransition] = useState(false);
  const [gameroomTab, setGameroomTab] = useState<'basis' | 'games'>('basis');
  const [useUniversalNav, setUseUniversalNav] = useState<boolean>(() => {
    const saved = localStorage.getItem('samenslim_use_nav');
    return saved === 'true';
  });

  useEffect(() => {
    localStorage.setItem('samenslim_use_nav', String(useUniversalNav));
  }, [useUniversalNav]);
  const [highScores, setHighScores] = useState<Record<string, { name: string, score: number }[]>>(() => {
    const saved = localStorage.getItem('samenslim_highscores');
    return saved ? JSON.parse(saved) : {};
  });

  const saveHighScore = useCallback((gameId: string, name: string, score: number, lowerIsBetter = false) => {
    const gameScores = highScores[gameId] || [];
    const newScoreObj = { name, score };
    const allScores = [...gameScores, newScoreObj]
      .sort((a, b) => lowerIsBetter ? a.score - b.score : b.score - a.score);
    
    // Find the rank of the new score using the object reference
    const rank = allScores.indexOf(newScoreObj) + 1;

    setHighScores(prev => {
      const updated = { ...prev, [gameId]: allScores.slice(0, 5) };
      localStorage.setItem('samenslim_highscores', JSON.stringify(updated));
      return updated;
    });

    return rank <= 5 ? rank : null;
  }, [highScores]);

  const resetHighScores = () => {
    setHighScores({});
    localStorage.removeItem('samenslim_highscores');
  };

  const generateTafelSum = (tables: number[]) => {
    if (tables.length === 0) return;
    const a = tables[Math.floor(Math.random() * tables.length)];
    const b = Math.floor(Math.random() * 10) + 1; // Usually tables go up to 10 or 12, I'll use 10 for standard
    setCurrentSum({ a, b, answer: a * b });
    setUserAnswer('');
    setTafelFeedback(null);
  };

  const startTafels = (tables: number[]) => {
    setCurrentTable(tables);
    generateTafelSum(tables);
    setScreen('tafels-play');
  };

  const checkTafelAnswer = () => {
    if (!currentSum) return;
    const isCorrect = parseInt(userAnswer) === currentSum.answer;
    if (isCorrect) {
      setTafelFeedback('correct');
      confetti({
        particleCount: 100,
        spread: 70,
        origin: { y: 0.6 },
        zIndex: 9999
      });
      
      // Add score to current player
      if (gamePlayers.length > 0) {
        const currentPlayerObj = gamePlayers[currentPlayerIndex];
        const updatedPlayers = players.map(p => {
          if (p.id === currentPlayerObj.id) {
            return { ...p, score: (p.score || 0) + 1 };
          }
          return p;
        });
        // Update players in background
        setPlayers(updatedPlayers);
        localStorage.setItem('samenslim_players', JSON.stringify(updatedPlayers));

        // DELAY updating gamePlayers so the header reflects the change
        setTimeout(() => {
          setGamePlayers(prev => prev.map(p => {
            if (p.id === currentPlayerObj.id) {
              return { ...p, score: (p.score || 0) + 1 };
            }
            return p;
          }));
        }, 1400);
      }

      setTimeout(() => {
        generateTafelSum(currentTable);
      }, 1500);
    } else {
      setTafelFeedback('wrong');
      setTimeout(() => {
        setTafelFeedback(null);
        setUserAnswer('');
      }, 1000);
    }
  };

  useEffect(() => {
    if (waitingForNextQuestion) {
      if (activeQuestions.length > currentIndex + 1) {
        setWaitingForNextQuestion(false);
        setIsLoading(false);
        setCurrentIndex(currentIndex + 1);
        setScreen('quiz');
        setShowDiscussion(false);
        setHasDiscussed(false);
        if (players.length > 1 || mode === 'beurt') {
          setShowTurnOverlay(true);
          setTimeout(() => setShowTurnOverlay(false), 2000);
        }
      } else if (!isFetchingMore) {
        // Fetch finished but no new questions were added
        setWaitingForNextQuestion(false);
        setIsLoading(false);
        // If we really have no more questions, end the game
        // Or we could show a message, but ending is safest
      }
    }
  }, [activeQuestions, waitingForNextQuestion, currentIndex, players.length, mode, isFetchingMore]);

  const updatePlayers = (newPlayers: Player[]) => {
    const today = new Date().toISOString().split('T')[0];
    const month = new Date().getMonth();

    const processedPlayers = newPlayers.map(p => {
      let updatedP = { ...p };
      
      // 1. Update Login Streak
      if (updatedP.lastLoginDate !== today) {
        let newStreak = updatedP.loginStreak || 0;
        if (updatedP.lastLoginDate) {
          const lastDate = new Date(updatedP.lastLoginDate);
          const currentDate = new Date(today);
          const diffTime = Math.abs(currentDate.getTime() - lastDate.getTime());
          const diffDays = Math.ceil(diffTime / (1000 * 60 * 60 * 24));
          if (diffDays === 1) {
            newStreak += 1;
          } else if (diffDays > 1) {
            newStreak = 1;
          }
        } else {
          newStreak = 1;
        }
        updatedP.lastLoginDate = today;
        updatedP.loginStreak = newStreak;
      }

      return updatedP;
    });

    setPlayers(processedPlayers);
    localStorage.setItem('samenslim_players', JSON.stringify(processedPlayers));
  };


  const savePlayer = () => {
    if (!newPlayerName.trim()) return;
    
    // Determine initial level based on age and school level
    let initialLevel: Level = 'makkelijk';
    
    if (newPlayerSchoolLevel === 'Middelbare' || newPlayerSchoolLevel === 'Groep 7' || newPlayerSchoolLevel === 'Groep 8' || newPlayerAge > 10) {
      initialLevel = 'moeilijk';
    } else if (newPlayerSchoolLevel === 'Groep 5' || newPlayerSchoolLevel === 'Groep 6' || newPlayerAge >= 8) {
      initialLevel = 'midden';
    }

    if (editingPlayerId) {
      const updatedPlayers = players.map(p => {
        if (p.id === editingPlayerId) {
          return {
            ...p,
            name: newPlayerName.trim(),
            age: newPlayerAge,
            schoolLevel: newPlayerSchoolLevel || undefined,
            favoriteColor: newPlayerColor,
            iconName: newPlayerIcon,
            levels: [initialLevel], // Reset levels to match new age/status
          };
        }
        return p;
      });
      updatePlayers(updatedPlayers);
      setEditingPlayerId(null);
    } else {
      const newPlayer: Player = {
        id: Date.now().toString(),
        name: newPlayerName.trim(),
        age: newPlayerAge,
        schoolLevel: newPlayerSchoolLevel || undefined,
        favoriteColor: newPlayerColor,
        iconName: newPlayerIcon,
        levels: [initialLevel],
        score: 0,
        answered: 0,
        consecutiveCorrect: 0,
        consecutiveWrong: 0,
        answeredQuestionIds: [],
        globalRank: 0
      };
      updatePlayers([...players, newPlayer]);
    }
    
    setNewPlayerName('');
    setNewPlayerAge(8);
    setNewPlayerSchoolLevel('');
    setNewPlayerColor('indigo');
    setNewPlayerIcon('cat');
    setScreen('players');
  };

  const editPlayer = (player: Player) => {
    setEditingPlayerId(player.id);
    setNewPlayerName(player.name);
    setNewPlayerAge(player.age);
    setNewPlayerSchoolLevel(player.schoolLevel || '');
    setNewPlayerColor(player.favoriteColor || 'indigo');
    setNewPlayerIcon(player.iconName || 'cat');
    setScreen('player-edit');
  };

  const addNewPlayer = () => {
    setEditingPlayerId(null);
    setNewPlayerName('');
    setNewPlayerAge(8);
    setNewPlayerSchoolLevel('');
    setNewPlayerColor('indigo');
    setNewPlayerIcon('cat');
    setScreen('player-edit');
  };

  const cancelEdit = () => {
    setEditingPlayerId(null);
    setNewPlayerName('');
    setNewPlayerAge(8);
    setNewPlayerSchoolLevel('');
    setNewPlayerColor('indigo');
    setNewPlayerIcon('cat');
    setScreen('players');
  };

  const removePlayer = (id: string) => {
    updatePlayers(players.filter(p => p.id !== id));
  };

  const resetScores = () => {
    updatePlayers(players.map(p => ({ 
      ...p, 
      score: 0, 
      answered: 0, 
      consecutiveCorrect: 0, 
      consecutiveWrong: 0,
      tafelsCorrect: 0,
      totalAnswered: 0,
      answeredQuestionIds: [],
      shownJokes: []
    })));
    
    // Also reset mini-game high scores
    setHighScores({});
    localStorage.removeItem('samenslim_highscores');
    
    // Also reset global joke history
    setGlobalShownJokes([]);
    localStorage.removeItem('samenslim_global_jokes');
  };

  const clearPlayers = () => {
    updatePlayers([]);
    setHighScores({});
    localStorage.removeItem('samenslim_highscores');
    setGlobalShownJokes([]);
    localStorage.removeItem('samenslim_global_jokes');
    setShownKletsenIds([]);
    localStorage.removeItem('samenslim_shown_kletsen');
  };

  useEffect(() => {
    // Automatic transition removed to allow time for discussion
  }, [screen]);

  const fetchMoreQuestions = async (currentTheme: ThemeId | null, currentLevel: Level, count: number = 5, playerIndex?: number, force: boolean = false) => {
    if ((isFetchingMore && !force) || !currentTheme) return;
    setIsFetchingMore(true);
    try {
      // Try to get AI questions
      const targetIndex = playerIndex !== undefined ? playerIndex : currentPlayerIndex;
      const currentPlayer = gamePlayers.length > 0 ? gamePlayers[targetIndex] : undefined;
      const difficultyAdjustment = currentPlayer ? (currentPlayer.consecutiveCorrect >= 3 ? 1 : (currentPlayer.consecutiveWrong >= 2 ? -1 : 0)) : 0;
      
      // If currentLevel is 'gemengd', use the specific player's level so the AI knows exactly what to generate
      const specificLevel = currentLevel === 'gemengd' && currentPlayer
        ? currentPlayer.levels[0]
        : currentLevel;
      
      // Collect all answered question IDs for all active players
      const allAnsweredIds = new Set<string>();
      gamePlayers.forEach(p => p.answeredQuestionIds?.forEach(id => allAnsweredIds.add(id)));
      const activeIds = new Set<string>(activeQuestions.map(q => q.id));
      const excludeIds: string[] = [...Array.from(allAnsweredIds), ...Array.from(activeIds)];

      let staticPool: Question[] = QUESTIONS.filter(q => (currentTheme === 'alles' || q.themeId === currentTheme) && !excludeIds.includes(q.id)) as Question[];
      
      if (currentLevel !== 'gemengd') {
        staticPool = staticPool.filter(q => {
           if (q.themeId === 'thee') return true;
           const isYoung = gamePlayers.some(p => p.age < 8);
           if (isYoung && q.level === 'moeilijk') return false;
           return q.level === specificLevel || q.level === 'alle';
        });
      } else {
        const isYoung = gamePlayers.some(p => p.age < 8);
        if (isYoung) {
          staticPool = staticPool.filter(q => q.level !== 'moeilijk');
        }
        const neededLevels = new Set<Level>();
        gamePlayers.forEach(p => p.levels.forEach(l => neededLevels.add(l)));
        staticPool = staticPool.filter(q => q.themeId === 'thee' || q.level === 'alle' || neededLevels.has(q.level as Level));
      }

      const staticToUse = staticPool.sort(() => 0.5 - Math.random()).slice(0, count);
      let newQs: Question[] = staticToUse.map(q => {
        return {
          ...q,
          options: q.options?.map((o) => ({
            ...o,
            text: o.text.replace(/^[A-D]\) /, '')
          }))
        };
      }) as Question[];

      const needed = count - newQs.length;
      if (needed > 0) {
        const aiQs = await generateQuestions(
          currentTheme, 
          specificLevel, 
          needed, 
          currentPlayer?.age, 
          currentPlayer?.schoolLevel,
          undefined,
          difficultyAdjustment,
          mode,
          [...recentQuestionTexts, ...newQs.map(q => q.text)]
        );
        newQs = [...newQs, ...aiQs];
      }
      
      if (newQs.length > 0) {
        setActiveQuestions(prev => {
          // Double check to avoid duplicates when adding
          const existingIds = new Set(prev.map(q => q.id));
          const uniqueNewQs = newQs.filter(q => !existingIds.has(q.id));
          return [...prev, ...uniqueNewQs];
        });
      }
    } catch (e) {
      console.error(e);
    } finally {
      setIsFetchingMore(false);
    }
  };

  const startGame = async () => {
    if (!theme) return;

    setScore(0);
    setAnsweredCount(0);
    setSelectedOption(null);
    setCurrentPlayer(1);

    // Determine mode and level
    let fetchLevel = level;
    let activePlayers = players;

    if (players.length > 0) {
      if (selectedPlayerIds.length > 0) {
        activePlayers = players.filter(p => selectedPlayerIds.includes(p.id));
      } else {
        // Default to all players if none selected
        activePlayers = players;
      }
      
      // Auto-adjust mode based on number of players
      if (activePlayers.length === 1) {
        setMode('alleen');
      } else if (mode === 'alleen' && activePlayers.length > 1) {
        setMode('beurt');
      }

      setGamePlayers(activePlayers);
      setCurrentPlayerIndex(0);
      fetchLevel = 'gemengd';
    } else {
      setGamePlayers([]);
    }

    if (theme === 'tafels') {
      setScreen('tafels-select');
      return;
    }

    // 1. Instant Start with static questions
    // Collect all levels needed by active players
    const neededLevels = new Set<Level>();
    activePlayers.forEach(p => p.levels.forEach(l => neededLevels.add(l)));
    const allAnsweredIds = new Set<string>();
    activePlayers.forEach(p => p.answeredQuestionIds?.forEach(id => allAnsweredIds.add(id)));

    let staticPool: Question[] = QUESTIONS.filter(q => (theme === 'alles' || q.themeId === theme) && !allAnsweredIds.has(q.id)) as Question[];
    
    if (fetchLevel === 'gemengd') {
      // Mixed mode: only include questions that match at least one player's level
      // AND for adults, avoid questions marked as 'alle' if they are too simple
      staticPool = staticPool.filter(q => {
        if (q.themeId === 'thee') return true;
        const isYoung = activePlayers.some(p => p.age < 8);
        if (isYoung && q.level === 'moeilijk') return false;
        
        const matchesLevel = q.level === 'alle' || neededLevels.has(q.level as Level);
        return matchesLevel;
      });
    } else {
      staticPool = staticPool.filter(q => q.themeId === 'thee' || q.level === fetchLevel || q.level === 'alle');
    }
    
    // Prioritize AI questions because they are tailored to age and school level.
    // Show loading screen while fetching the first batch.
    setIsLoading(true);
    try {
      const firstPlayer = gamePlayers.length > 0 ? gamePlayers[0] : undefined;
      const difficultyAdjustment = firstPlayer ? (firstPlayer.consecutiveCorrect >= 3 ? 1 : (firstPlayer.consecutiveWrong >= 2 ? -1 : 0)) : 0;
      
      const specificLevel = fetchLevel === 'gemengd' && firstPlayer
        ? firstPlayer.levels[0]
        : fetchLevel;
      
      let initialBatch: Question[] = [];
      const staticToUse = staticPool.filter(q => q.level === specificLevel || q.level === 'alle').sort(() => 0.5 - Math.random());
      
      if (staticToUse.length > 0) {
        // Grab just ONE static question to start immediately
        initialBatch = [staticToUse[0]].map(q => {
          return {
            ...q,
            options: q.options?.map((o) => ({
              ...o,
              text: o.text.replace(/^[A-D]\) /, '')
            }))
          };
        }) as Question[];
      } else {
        // If no static questions, fetch just ONE AI question to start as quickly as possible
        const aiQs = await generateQuestions(
          theme, 
          specificLevel, 
          1, 
          firstPlayer?.age, 
          firstPlayer?.schoolLevel, 
          undefined,
          difficultyAdjustment,
          mode,
          recentQuestionTexts
        );
        initialBatch = aiQs;
      }
      
      if (initialBatch.length > 0) {
        setActiveQuestions(initialBatch);
        setCurrentIndex(0);
        setScreen('quiz');
        setShowDiscussion(false);
        setHasDiscussed(false);
        setIsLoading(false); // Stop loading immediately so user can play
        
        if (players.length > 1 || mode === 'beurt') {
          setShowTurnOverlay(true);
          setTimeout(() => setShowTurnOverlay(false), 2000);
        }
        
        // Fetch the remaining questions in the background
        const fetchRemainingBackground = async () => {
          setIsFetchingMore(true);
          try {
            const aiQs = await generateQuestions(
              theme, 
              specificLevel, 
              4, // Fetch 4 more for the first player
              firstPlayer?.age, 
              firstPlayer?.schoolLevel, 
              undefined,
              difficultyAdjustment,
              mode,
              [...recentQuestionTexts, initialBatch[0]?.text].filter(Boolean) as string[]
            );
            
            if (aiQs.length > 0) {
              setActiveQuestions(prev => {
                const existingIds = new Set(prev.map(q => q.id));
                const uniqueNewQs = aiQs.filter(q => !existingIds.has(q.id));
                return [...prev, ...uniqueNewQs];
              });
            }
            
            // Then fetch for other players sequentially
            if (gamePlayers.length > 1) {
              for (let i = 1; i < gamePlayers.length; i++) {
                await fetchMoreQuestions(theme, fetchLevel, 3, i, true);
              }
            } else {
              // Buffer for single player
              await fetchMoreQuestions(theme, fetchLevel, 3, undefined, true);
            }
          } catch (e) {
            console.error("Background fetch failed:", e);
          } finally {
            setIsFetchingMore(false);
          }
        };
        
        fetchRemainingBackground();
      } else {
        // Absolute fallback if even static pool is empty and AI failed
        let absoluteFallback: Question[] = (QUESTIONS.slice(0, 5) as Question[]).map(q => {
          return {
            ...q,
            options: q.options?.map((o) => ({
              ...o,
              text: o.text.replace(/^[A-D]\) /, '')
            }))
          };
        }) as Question[];
        setActiveQuestions(absoluteFallback);
        setCurrentIndex(0);
        setScreen('quiz');
        setShowDiscussion(false);
        setHasDiscussed(false);
      }
    } catch (e) {
      console.error(e);
      let absoluteFallback: Question[] = (QUESTIONS.slice(0, 5) as Question[]).map(q => {
        return {
          ...q,
          options: q.options?.map((o) => ({
            ...o,
            text: o.text.replace(/^[A-D]\) /, '')
          }))
        };
      }) as Question[];
      setActiveQuestions(absoluteFallback);
      setCurrentIndex(0);
      setScreen('quiz');
      setShowDiscussion(false);
      setHasDiscussed(false);
    } finally {
      setIsLoading(false);
    }
  };

  const triggerMegaConfetti = () => {
    const duration = 3 * 1000;
    const animationEnd = Date.now() + duration;
    const defaults = { startVelocity: 45, spread: 360, ticks: 120, zIndex: 9999 };

    const randomInRange = (min: number, max: number) => Math.random() * (max - min) + min;

    const interval: any = setInterval(function() {
      const timeLeft = animationEnd - Date.now();

      if (timeLeft <= 0) {
        return clearInterval(interval);
      }

      const particleCount = 100 * (timeLeft / duration);
      
      // Left side burst
      confetti({ 
        ...defaults, 
        particleCount, 
        origin: { x: randomInRange(0.1, 0.3), y: Math.random() - 0.2 },
        colors: ['#ff0000', '#00ff00', '#0000ff', '#ffff00', '#ff00ff', '#00ffff']
      });
      
      // Right side burst
      confetti({ 
        ...defaults, 
        particleCount, 
        origin: { x: randomInRange(0.7, 0.9), y: Math.random() - 0.2 },
        colors: ['#ff0000', '#00ff00', '#0000ff', '#ffff00', '#ff00ff', '#00ffff']
      });

      // "Balloons" - large circular particles
      if (Math.random() > 0.7) {
        confetti({
          ...defaults,
          particleCount: 10,
          origin: { x: randomInRange(0.2, 0.8), y: Math.random() - 0.1 },
          shapes: ['circle'],
          scalar: 4,
          gravity: 0.5,
          drift: randomInRange(-2, 2),
          colors: ['#FF6B6B', '#4ECDC4', '#FFE66D', '#FF9F1C', '#7067CF']
        });
      }
    }, 150);
  };

  const triggerKletsen = () => {
    // 30% chance to trigger a kletsen question after a regular question
    if (Math.random() > 0.3) {
      const currentLevel = gamePlayers.length > 0 ? gamePlayers[currentPlayerIndex]?.levels?.[0] : level;
      
      // Filter pool to exclude already shown questions
      let pool = KLETSEN_QUESTIONS.filter(q => 
        (q.level === currentLevel || q.level === 'alle') && 
        !shownKletsenIds.includes(q.id)
      );

      // If all questions for this level have been shown, reset the history for this level
      if (pool.length === 0) {
        pool = KLETSEN_QUESTIONS.filter(q => q.level === currentLevel || q.level === 'alle');
        // Clear history for these IDs so we can start fresh
        const idsToRemove = pool.map(q => q.id);
        setShownKletsenIds(prev => prev.filter(id => !idsToRemove.includes(id)));
      }

      if (pool.length > 0) {
        const randomQ = pool[Math.floor(Math.random() * pool.length)];
        setActiveKletsenQuestion(randomQ);
        setShownKletsenIds(prev => [...prev, randomQ.id]);
      }
    } else {
      setActiveKletsenQuestion(null);
    }
  };

  const handleTeaQuestionDone = () => {
    const currentQ = activeQuestions[currentIndex];
    setRecentQuestionTexts(prev => [...prev.slice(-49), currentQ.text]);
    
    if (gamePlayers.length > 0) {
      const pId = gamePlayers[currentPlayerIndex]?.id;
      const newPlayers = [...players];
      const pIndex = newPlayers.findIndex(p => p.id === pId);
      
      if (pIndex !== -1) {
        const p = newPlayers[pIndex];
        p.answered += 1;
        
        if (!p.answeredQuestionIds) p.answeredQuestionIds = [];
        if (!p.answeredQuestionIds.includes(currentQ.id)) {
          p.answeredQuestionIds.push(currentQ.id);
        }
        updatePlayers(newPlayers);
      }
    } else {
      setAnsweredCount(a => a + 1);
    }
    triggerKletsen();
    nextQuestion();
  };

  const handleAnswer = (option: QuizOption) => {
    setSelectedOption(option);
    triggerKletsen();
    
    const currentQ = activeQuestions[currentIndex];
    setRecentQuestionTexts(prev => [...prev.slice(-49), currentQ.text]);
    
    if (gamePlayers.length > 0) {
      const pId = gamePlayers[currentPlayerIndex]?.id;
      const newPlayers = [...players];
      const pIndex = newPlayers.findIndex(p => p.id === pId);
      
      if (pIndex !== -1) {
        const p = newPlayers[pIndex];
        p.answered += 1;
        
        // Add current question to answered list
        if (!p.answeredQuestionIds) p.answeredQuestionIds = [];
        if (!p.answeredQuestionIds.includes(currentQ.id)) {
          p.answeredQuestionIds.push(currentQ.id);
        }

        // Update stats for parents
        if (!p.themeStats) p.themeStats = {};
        if (!p.themeStats[currentQ.themeId]) p.themeStats[currentQ.themeId] = { correct: 0, total: 0 };
        p.themeStats[currentQ.themeId].total += 1;

        if (option.isCorrect) {
          p.themeStats[currentQ.themeId].correct += 1;
          p.score += 1;
          p.consecutiveCorrect += 1;
          p.consecutiveWrong = 0;
          
          // Table stats
          if (currentQ.themeId === 'tafels' && currentSum) {
            if (!p.tableStats) p.tableStats = {};
            const tableNum = currentSum.b;
            if (!p.tableStats[tableNum]) p.tableStats[tableNum] = { correct: 0, total: 0 };
            p.tableStats[tableNum].total += 1;
            p.tableStats[tableNum].correct += 1;
          }
          
          if (p.score > 0 && p.score % 5 === 0) {
            fetchJokes(p.age);
          }
          
          const currentTheme = activeQuestions[currentIndex].themeId;
          if (currentTheme === 'tafels') {
            p.tafelsCorrect = (p.tafelsCorrect || 0) + 1;
          }
          

          confetti({
            particleCount: 150,
            spread: 100,
            origin: { y: 0.6 },
            colors: ['#06b6d4', '#4f46e5', '#10b981', '#f59e0b', '#ec4899', '#8b5cf6'],
            zIndex: 9999
          });
          
          // Extra bursts for "powerful" effect
          setTimeout(() => {
            confetti({
              particleCount: 80,
              angle: 60,
              spread: 55,
              origin: { x: 0 },
              colors: ['#06b6d4', '#4f46e5', '#10b981'],
              zIndex: 9999
            });
            confetti({
              particleCount: 80,
              angle: 120,
              spread: 55,
              origin: { x: 1 },
              colors: ['#ec4899', '#8b5cf6', '#f59e0b'],
              zIndex: 9999
            });
          }, 200);
          
          // Adaptive Level UP
          if (p.consecutiveCorrect >= 3) {
            const currentMaxLevel = p.levels[p.levels.length - 1];
            let nextLevel: Level | null = null;
            if (currentMaxLevel === 'makkelijk') nextLevel = 'midden';
            else if (currentMaxLevel === 'midden') nextLevel = 'moeilijk';
            
            if (nextLevel && !p.levels.includes(nextLevel)) {
              p.levels = [...p.levels, nextLevel];
              p.consecutiveCorrect = 0;
              
              if (!p.levelHistory) p.levelHistory = [];
              p.levelHistory.push({ date: new Date().toISOString(), level: nextLevel, adjustment: 1 });
              
              setLevelChangeMessage(`${p.name} is nu zo goed dat we ${nextLevel} toevoegen! 🚀`);
              setTimeout(() => setLevelChangeMessage(null), 4000);
            }
          }
        } else {
          p.consecutiveWrong += 1;
          p.consecutiveCorrect = 0;
          
          // Record mistake
          if (!p.recentMistakes) p.recentMistakes = [];
          p.recentMistakes = [
            { questionText: currentQ.text, themeId: currentQ.themeId, date: new Date().toISOString() },
            ...p.recentMistakes
          ].slice(0, 5);

          // Table stats failure
          if (currentQ.themeId === 'tafels' && currentSum) {
            if (!p.tableStats) p.tableStats = {};
            const tableNum = currentSum.b;
            if (!p.tableStats[tableNum]) p.tableStats[tableNum] = { correct: 0, total: 0 };
            p.tableStats[tableNum].total += 1;
          }
          
          // Adaptive Level DOWN
          if (p.consecutiveWrong >= 2) {
            if (p.levels.length > 1) {
              const highestLevel = p.levels[p.levels.length - 1];
              if (highestLevel !== 'makkelijk') {
                p.levels = p.levels.filter(l => l !== highestLevel);
                p.consecutiveWrong = 0;
                
                if (!p.levelHistory) p.levelHistory = [];
                const newLevel = p.levels[p.levels.length - 1];
                p.levelHistory.push({ date: new Date().toISOString(), level: newLevel, adjustment: -1 });
                
                setLevelChangeMessage(`Geen zorgen ${p.name}, we maken het even iets makkelijker. 🎈`);
                setTimeout(() => setLevelChangeMessage(null), 4000);
              }
            }
          }
        }
        updatePlayers(newPlayers);
        
        const newGamePlayers = [...gamePlayers];
        newGamePlayers[currentPlayerIndex] = p;
        
        // DELAY updating gamePlayers so the header reflects the change
        setTimeout(() => {
          setGamePlayers(newGamePlayers);
        }, 1400);
      }
    } else {
      setAnsweredCount(c => c + 1);
      if (option.isCorrect) {
        setScore(s => {
          const newScore = s + 1;
          if (newScore > 0 && newScore % 5 === 0) {
            fetchJokes();
          }
          return newScore;
        });
        confetti({
          particleCount: 150,
          spread: 100,
          origin: { y: 0.6 },
          colors: ['#06b6d4', '#4f46e5', '#10b981', '#f59e0b', '#ec4899', '#8b5cf6'],
          zIndex: 9999
        });
        
        // Extra bursts
        setTimeout(() => {
          confetti({
            particleCount: 80,
            angle: 60,
            spread: 55,
            origin: { x: 0 },
            colors: ['#06b6d4', '#4f46e5', '#10b981'],
            zIndex: 9999
          });
          confetti({
            particleCount: 80,
            angle: 120,
            spread: 55,
            origin: { x: 1 },
            colors: ['#ec4899', '#8b5cf6', '#f59e0b'],
            zIndex: 9999
          });
        }, 200);
      }
    }

    setTimeout(() => {
      setScreen('feedback');
    }, 800);
  };

  const handleShowExperiment = () => {
    const currentTheme = THEMES.find(t => t.id === theme);
    if (currentTheme?.experimentId) {
      const exp = EXPERIMENTS.find(e => e.id === currentTheme.experimentId);
      if (exp) {
        setActiveExperiment(exp);
        setShowExperimentModal(true);
      }
    }
  };

  const nextQuestion = async () => {
    setSelectedOption(null);
    setActiveKletsenQuestion(null);
    
    const nextIdx = currentIndex + 1;
    
    // Check if we need to fetch more generally
    if (nextIdx >= activeQuestions.length - 3 && !isFetchingMore) {
      let fetchLevel = level;
      if (players.length > 0) fetchLevel = 'gemengd';
      const nextPlayerIdx = gamePlayers.length > 0 ? (currentPlayerIndex + 1) % gamePlayers.length : undefined;
      fetchMoreQuestions(theme, fetchLevel, 5, nextPlayerIdx);
    }

    if (gamePlayers.length > 0) {
      const nextPlayerIdx = (currentPlayerIndex + 1) % gamePlayers.length;
      const nextPlayer = gamePlayers[nextPlayerIdx];
      
      // Find a question that matches the next player's levels
      let swapIdx = nextIdx;
      let found = false;
      
      const findMatchingQuestion = () => {
        let idx = nextIdx;
        while (idx < activeQuestions.length) {
          const q = activeQuestions[idx];
          
          const matches = q.level === 'alle' || nextPlayer.levels.includes(q.level as Level) || nextPlayer.levels.includes('gemengd');
            
          if (matches) {
            return idx;
          }
          idx++;
        }
        return -1;
      };

      swapIdx = findMatchingQuestion();
      found = swapIdx !== -1;
      
      if (!found) {
        // WE DON'T HAVE A QUESTION FOR THIS PLAYER! Fetch immediately.
        setIsLoading(true);
        let fetchLevel = level;
        if (players.length > 0) fetchLevel = 'gemengd';
        
        // Force fetch by passing true
        await fetchMoreQuestions(theme, fetchLevel, 3, nextPlayerIdx, true);
        
        setIsLoading(false);
        
        // Try finding again after fetch
        swapIdx = findMatchingQuestion();
        found = swapIdx !== -1;
      }
      
      if (found && swapIdx !== nextIdx) {
        // Swap questions
        const newActive = [...activeQuestions];
        const temp = newActive[nextIdx];
        newActive[nextIdx] = newActive[swapIdx];
        newActive[swapIdx] = temp;
        setActiveQuestions(newActive);
      } else if (!found) {
        // Absolute fallback if fetch failed: just use the next question but it might be wrong level
        // We can't do much else here without breaking the game loop
      }
      
      setCurrentPlayerIndex(nextPlayerIdx);
    } else if (mode === 'beurt') {
      setCurrentPlayer(p => p === 1 ? 2 : 1);
    }

    if (nextIdx < activeQuestions.length) {
      setCurrentIndex(nextIdx);
      setScreen('quiz');
      setShowDiscussion(false);
      setHasDiscussed(false);
      
      if (players.length > 1 || mode === 'beurt') {
        setShowTurnOverlay(true);
        setTimeout(() => setShowTurnOverlay(false), 2000);
      }
    } else {
      // If we run out of questions entirely, wait for background fetch
      setIsLoading(true);
      setWaitingForNextQuestion(true);
      
      // If not currently fetching, trigger a fetch
      if (!isFetchingMore) {
        fetchMoreQuestions(theme, level, 5);
      }
    }
  };

  const currentQ = activeQuestions[currentIndex];
  
  const currentOptions = useMemo(() => {
    if (!currentQ || !currentQ.options) return [];
    
    // Stable seeded shuffle function
    const shuffle = <T,>(array: T[], seedStr: string): T[] => {
      const seed = seedStr.split('').reduce((acc, char) => acc + char.charCodeAt(0), 0);
      const result = [...array];
      for (let i = result.length - 1; i > 0; i--) {
        const j = Math.floor(Math.abs(Math.sin(seed + i) * (i + 1)));
        [result[i], result[j]] = [result[j], result[i]];
      }
      return result;
    };

    if (currentQ.options.length === 4) {
      return shuffle(currentQ.options, currentQ.id);
    }
    
    // Pad to 4 options
    const padded = [...currentQ.options];
    const themeQuestions = QUESTIONS.filter(q => q.themeId === currentQ.themeId && q.id !== currentQ.id);
    
    // Prioritize options from the same level
    const sameLevelQuestions = themeQuestions.filter(q => q.level === currentQ.level);
    const otherLevelQuestions = themeQuestions.filter(q => q.level !== currentQ.level);
    
    const getOptionsFromQuestions = (qs: typeof QUESTIONS) => {
      const incorrect = qs.flatMap(q => q.options?.filter(o => !o.isCorrect) || []).map(o => o.text);
      const correct = qs.map(q => q.options?.find(o => o.isCorrect)?.text).filter(Boolean) as string[];
      return [...incorrect, ...correct];
    };
    
    const sameLevelOptions = getOptionsFromQuestions(sameLevelQuestions);
    const otherLevelOptions = getOptionsFromQuestions(otherLevelQuestions);
    
    const combinedOptions = [...sameLevelOptions, ...otherLevelOptions];
    const uniqueOtherOptions = Array.from(new Set(combinedOptions)).filter(t => !currentQ.options!.some(o => o.text === t));
    
    let i = 0;
    while (padded.length < 4 && i < uniqueOtherOptions.length) {
      padded.push({
        id: `padded-${i}-${currentQ.id}`,
        text: uniqueOtherOptions[i],
        isCorrect: false
      });
      i++;
    }
    
    // If still not enough, try ANY other question's options
    if (padded.length < 4) {
      const allOtherOptions = QUESTIONS.filter(q => q.id !== currentQ.id)
        .flatMap(q => q.options?.map(o => o.text) || []);
      const uniqueAllOtherOptions = Array.from(new Set(allOtherOptions)).filter(t => !padded.some(o => o.text === t));
      
      let j = 0;
      while (padded.length < 4 && j < uniqueAllOtherOptions.length) {
        padded.push({
          id: `padded-global-${j}-${currentQ.id}`,
          text: uniqueAllOtherOptions[j],
          isCorrect: false
        });
        j++;
      }
    }
    
    const fallbacks = ['Geen van deze', 'Iets anders', 'Niet van toepassing', 'Misschien'];
    let f = 0;
    while (padded.length < 4) {
      padded.push({
        id: `fallback-${f}-${currentQ.id}`,
        text: fallbacks[f],
        isCorrect: false
      });
      f++;
    }
    
    // Stable shuffle based on question ID
    const seed = currentQ.id.split('').reduce((acc, char) => acc + char.charCodeAt(0), 0);
    return padded.sort((a, b) => {
      const pseudoRandom = Math.sin(seed + a.text.length + b.text.length);
      return pseudoRandom > 0 ? 1 : -1;
    });
  }, [currentQ]);

  const bgTheme = getThemeBackground(theme);

  return (
    <div className="min-h-screen bg-slate-50 text-slate-800 font-sans selection:bg-cyan-200 flex flex-col items-center p-1 sm:p-8 overflow-x-hidden transition-colors duration-700">
      {/* Decorative background elements */}
      <div className="fixed inset-0 pointer-events-none overflow-hidden flex justify-center">
        <div className={`absolute top-[-10%] left-[-10%] w-[40%] h-[40%] ${bgTheme.color1} rounded-full blur-3xl transition-colors duration-1000`} />
        <div className={`absolute bottom-[-10%] right-[-10%] w-[40%] h-[40%] ${bgTheme.color2} rounded-full blur-3xl transition-colors duration-1000`} />
        {/* Subtle dynamic pattern */}
        <div 
          className="absolute inset-0 opacity-50 transition-all duration-1000" 
          style={{ backgroundImage: `url("${bgTheme.patternUrl}")` }}
        />
      </div>

      <div className="w-full max-w-2xl flex-1 flex flex-col relative z-10">
        
        {/* Header */}
        <header className="flex justify-between items-center py-2 sm:py-4 mb-2 sm:mb-6">
          <div 
            className="flex items-center gap-3 cursor-pointer group"
            onClick={() => setScreen('start')}
          >
            <div className="bg-cyan-500 p-2.5 rounded-2xl text-white shadow-lg shadow-cyan-500/30 group-hover:scale-110 transition-transform">
              <Home size={26} fill="currentColor" />
            </div>
            </div>
          
          {levelChangeMessage && (
            <motion.div 
              initial={{ opacity: 0, y: -20 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0 }}
              className="absolute top-20 left-1/2 -translate-x-1/2 z-50 bg-indigo-600 text-white px-6 py-3 rounded-2xl shadow-xl font-bold text-sm whitespace-nowrap flex items-center gap-2"
            >
              <Star size={18} fill="currentColor" />
              {levelChangeMessage}
            </motion.div>
          )}
          
          {screen !== 'start' && screen !== 'setup' && screen !== 'end' && (
            <div className="flex items-center gap-2 sm:gap-3">
              <div className="flex items-center gap-2 bg-white px-3 sm:px-4 py-2 rounded-2xl shadow-sm border-2 border-slate-100">
                <span className="font-bold text-slate-500 text-xs sm:text-sm uppercase tracking-wider hidden sm:inline">Vraag</span>
                <span className="font-black text-slate-700 font-mono text-base sm:text-lg">
                  {currentIndex + 1}
                </span>
              </div>
              {!useUniversalNav && (
                <button
                  onClick={() => setScreen('start')}
                  className="bg-slate-100 hover:bg-slate-200 text-slate-700 px-3 sm:px-4 py-2 rounded-2xl font-bold transition-colors border-2 border-slate-200 shadow-sm text-sm sm:text-base flex items-center gap-2"
                  title="Naar beginpagina"
                >
                  <Home size={18} className="sm:hidden" />
                  <span className="hidden sm:inline">Home</span>
                </button>
              )}
              <span className="text-sm font-black text-cyan-600 ml-4 hidden sm:inline">SamenSlimmer</span>
            </div>
          )}
        </header>

        {/* Main Content Area */}
        <main className="flex-1 flex flex-col relative">
          <AnimatePresence>
            {showTurnOverlay && (
              <motion.div
                key="turn-overlay"
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                exit={{ opacity: 0, scale: 1.1 }}
                className="fixed inset-0 z-[100] flex items-center justify-center overflow-hidden"
              >
                {/* Dynamic Background */}
                <div className={`absolute inset-0 ${
                  gamePlayers.length > 0 
                    ? (PLAYER_COLORS.find(c => c.id === gamePlayers[currentPlayerIndex]?.favoriteColor)?.bg || 'bg-indigo-600')
                    : 'bg-indigo-600'
                }`}>
                  <div className="absolute inset-0 opacity-30">
                    {[...Array(20)].map((_, i) => (
                      <motion.div
                        key={i}
                        initial={{ 
                          x: Math.random() * 100 + '%', 
                          y: Math.random() * 100 + '%',
                          scale: Math.random() * 0.5 + 0.5,
                          opacity: Math.random() * 0.5 + 0.2
                        }}
                        animate={{ 
                          y: [null, '-20%', '120%'],
                          rotate: [0, 360]
                        }}
                        transition={{ 
                          duration: 5 + Math.random() * 10, 
                          repeat: Infinity,
                          ease: "linear"
                        }}
                        className="absolute text-white/20"
                      >
                        {i % 3 === 0 ? <Star size={40} fill="currentColor" /> : i % 3 === 1 ? <Sparkles size={30} /> : <Globe size={35} fill="currentColor" />}
                      </motion.div>
                    ))}
                  </div>
                </div>

                <motion.div 
                  initial={{ scale: 0.8, y: 50, opacity: 0 }}
                  animate={{ scale: 1, y: 0, opacity: 1 }}
                  exit={{ scale: 1.2, opacity: 0 }}
                  transition={{ type: 'spring', damping: 15 }}
                  className="text-center text-white p-8 max-w-lg w-full relative z-10"
                >
                  <div className="relative mb-10 inline-block">
                    <motion.div
                      animate={{ 
                        scale: [1, 1.2, 1],
                        rotate: [0, 5, -5, 0]
                      }}
                      transition={{ duration: 4, repeat: Infinity }}
                      className="absolute -inset-8 bg-white/20 rounded-full blur-2xl"
                    />
                    
                    <motion.div
                      initial={{ scale: 0.5, rotate: -20 }}
                      animate={{ scale: 1, rotate: 0 }}
                      transition={{ delay: 0.2, type: 'spring', damping: 12 }}
                      className="relative z-10 flex items-center justify-center w-44 h-44 bg-white/20 rounded-[3rem] backdrop-blur-xl shadow-[0_20px_50px_rgba(0,0,0,0.3)] border-4 border-white/30"
                    >
                      {gamePlayers.length > 0 && gamePlayers[currentPlayerIndex]?.iconName ? (
                        getIcon(gamePlayers[currentPlayerIndex]?.iconName || 'User', "w-24 h-24 text-white drop-shadow-2xl")
                      ) : (
                        <Users size={100} className="text-white drop-shadow-2xl" />
                      )}
                    </motion.div>
                  </div>
                  
                  <motion.div
                    initial={{ y: 30, opacity: 0 }}
                    animate={{ y: 0, opacity: 1 }}
                    transition={{ delay: 0.3 }}
                  >
                    <h2 className="text-2xl font-black uppercase tracking-[0.5em] text-white/90 mb-4 drop-shadow-md">
                      {gamePlayers.length > 0 ? "Kom op!" : "Volgende beurt"}
                    </h2>
                    
                    <div className="text-7xl font-black tracking-tighter mb-8 drop-shadow-[0_10px_10px_rgba(0,0,0,0.5)] bg-clip-text text-transparent bg-gradient-to-b from-white to-white/70">
                      {gamePlayers.length > 0 ? (gamePlayers[currentPlayerIndex]?.name || 'Gast') : `Speler ${currentPlayer}`}
                    </div>
                    
                    <div className="flex justify-center gap-6">
                      {[0, 1, 2].map(i => (
                        <motion.div 
                          key={i}
                          animate={{ 
                            scale: [1, 1.5, 1],
                            opacity: [0.5, 1, 0.5]
                          }}
                          transition={{ 
                            duration: 1, 
                            repeat: Infinity, 
                            delay: i * 0.2 
                          }}
                          className="w-3 h-3 bg-white rounded-full shadow-[0_0_10px_white]"
                        />
                      ))}
                    </div>
                  </motion.div>
                </motion.div>
              </motion.div>
            )}
          </AnimatePresence>

          <AnimatePresence mode="wait">
            
            {/* START SCREEN */}
            {screen === 'start' && (
              <motion.div 
                key="start"
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -20 }}
                className={`flex flex-col items-center justify-center gap-12 py-8 sm:py-12 text-center -mt-12 sm:mt-0 ${useUniversalNav ? 'pb-32' : ''}`}
              >
                <div className="relative">
                  <motion.div
                    animate={{ rotate: 360 }}
                    transition={{ duration: 10, repeat: Infinity, ease: "linear" }}
                    className="absolute inset-0 border-4 border-dashed border-cyan-300 rounded-full"
                  />
                  <motion.div
                    animate={{ rotate: -360 }}
                    transition={{ duration: 15, repeat: Infinity, ease: "linear" }}
                    className="absolute -inset-4 border-4 border-dashed border-indigo-300 rounded-full"
                  />
                  <motion.div
                    animate={{ rotate: 360 }}
                    transition={{ duration: 20, repeat: Infinity, ease: "linear" }}
                    className="absolute -inset-12 rounded-full flex items-center justify-center"
                  >
                    <span className="text-cyan-600 font-bold tracking-widest text-lg">SAMENSLIMMER</span>
                  </motion.div>
                  <div className="w-48 h-48 sm:w-56 sm:h-56 bg-white rounded-full flex items-center justify-center shadow-xl shadow-cyan-500/10 border-4 border-cyan-100 m-4 relative z-10">
                    <Robot />
                  </div>
                </div>
                
                <div className="space-y-2 sm:space-y-4">
                  <h2 className="text-2xl sm:text-5xl font-black text-slate-800">
                    Klaar om te spelen?
                  </h2>
                  <p className="text-sm sm:text-lg text-slate-500 max-w-md mx-auto font-medium px-4">
                    Ontdek de wereld, leer nieuwe dingen en klets gezellig samen!
                  </p>
                  
                  {/* Fun Facts - Automatic cycling with fade */}
                  <div className="h-24 flex items-center justify-center overflow-hidden">
                    <AnimatePresence mode="wait">
                      <motion.div
                        key={currentFactIndex}
                        initial={{ opacity: 0, y: 10 }}
                        animate={{ opacity: 1, y: 0 }}
                        exit={{ opacity: 0, y: -10 }}
                        transition={{ duration: 1.5 }}
                        className="text-sm sm:text-lg text-slate-500 max-w-md mx-auto font-medium px-4 italic opacity-80"
                      >
                        <span className="block not-italic font-black text-xs sm:text-sm uppercase tracking-widest mb-1 opacity-70">Wist je dat?</span>
                        {APP_FACTS[currentFactIndex]}
                      </motion.div>
                    </AnimatePresence>
                  </div>
                </div>

                <motion.button 
                  whileHover={{ scale: 1.05, y: -5 }}
                  whileTap={{ scale: 0.95 }}
                  onClick={() => {
                    setScreen('gameroom');
                    setGameroomTab('basis');
                    if (gamePlayers.length === 0 && players.length > 0) {
                      setGamePlayers([players[0]]);
                      setCurrentPlayerIndex(0);
                    }
                  }}
                  className="bg-gradient-to-r from-cyan-500 to-indigo-600 text-white text-xl sm:text-2xl font-black py-4 sm:py-6 px-8 sm:px-12 rounded-3xl shadow-xl shadow-cyan-500/30 hover:shadow-cyan-500/50 transition-all flex items-center gap-4 uppercase tracking-wide relative overflow-hidden group -mt-4 sm:mt-0"
                >
                  <div className="absolute inset-0 bg-white/20 translate-y-full group-hover:translate-y-0 transition-transform duration-300" />
                  <Gamepad2 size={28} fill="currentColor" className="relative z-10" />
                  <span className="relative z-10">Start</span>
                </motion.button>

                <div className="flex flex-col sm:flex-row gap-4 mt-2 sm:mt-8">
                  <motion.button 
                    whileHover={{ scale: 1.05 }}
                    whileTap={{ scale: 0.95 }}
                    onClick={() => setScreen('players')}
                    className="text-slate-600 hover:text-indigo-600 transition-all flex items-center gap-2 text-xs font-black uppercase tracking-widest bg-white px-4 sm:px-6 py-2.5 sm:py-3 rounded-2xl border-2 border-slate-100 shadow-sm hover:shadow-md hover:border-indigo-100"
                  >
                    <Users size={16} />
                    Deelnemers
                  </motion.button>
                </div>
              </motion.div>
            )}

            {/* GAMEROOM SCREEN */}
            {screen === 'gameroom' && (
              <motion.div 
                key="gameroom"
                initial={{ opacity: 0, scale: 0.95 }}
                animate={{ opacity: 1, scale: 1 }}
                exit={{ opacity: 0, scale: 1.05 }}
                className={`flex flex-col gap-6 w-full max-w-4xl mx-auto mt-4 sm:mt-8 ${useUniversalNav ? 'pb-32' : ''}`}
              >
                <div className="flex items-center justify-between -mt-6 sm:-mt-4 mb-1 sm:mb-4">
                  <motion.button
                    whileHover={{ scale: 1.05, x: -2 }}
                    whileTap={{ scale: 0.95 }}
                    onClick={() => {
                      if (activeMiniGame) {
                        setActiveMiniGame(null);
                      } else if (gameroomTab === 'games') {
                        setGameroomTab('basis');
                      } else {
                        setScreen('home');
                      }
                    }}
                    className="flex items-center gap-2 text-slate-500 font-black uppercase text-xs tracking-widest hover:text-slate-800 transition-colors"
                  >
                    <div className="bg-slate-100 p-2 rounded-xl">
                      <X size={16} />
                    </div>
                    {activeMiniGame ? 'Stop Spel' : gameroomTab === 'games' ? 'Terug' : useUniversalNav ? '' : 'Home'}
                  </motion.button>

                  <h2 className="text-xl sm:text-2xl font-black text-slate-800 uppercase tracking-tight absolute left-1/2 -translate-x-1/2">
                    {activeMiniGame ? 'Aan de slag!' : gameroomTab === 'basis' ? 'Kies een spel' : 'Gameroom'}
                  </h2>

                  <div className="w-20" /> {/* Spacer for centering */}
                </div>

                {activeMiniGame ? (
                  <div className="flex flex-col items-center">
                    {showMiniGameTurnTransition ? (
                      <motion.div 
                        initial={{ opacity: 0, y: 20 }}
                        animate={{ opacity: 1, y: 0 }}
                        className="bg-white p-8 rounded-[3rem] shadow-2xl border-8 border-slate-100 w-full max-w-md text-center"
                      >
                        <h3 className="text-xl font-black text-slate-400 uppercase tracking-[0.2em] mb-4">
                          {currentPlayerIndex === 0 && gamePlayers.length > 1 ? "Wie begint er?" : "Nu aan de beurt"}
                        </h3>
                        <div className="w-24 h-24 bg-indigo-100 rounded-full flex items-center justify-center mx-auto mb-6 text-indigo-600 border-4 border-white shadow-lg">
                          {getIcon(gamePlayers[currentPlayerIndex]?.iconName || 'User', "w-12 h-12")}
                        </div>
                        <h3 className="text-4xl font-black text-slate-800 uppercase tracking-tight mb-2">
                          {gamePlayers[currentPlayerIndex]?.name}!
                        </h3>
                        <p className="text-slate-500 font-medium mb-8">Ben je er klaar voor?</p>
                        
                        <motion.button
                          whileHover={{ scale: 1.05 }}
                          whileTap={{ scale: 0.95 }}
                          onClick={() => setShowMiniGameTurnTransition(false)}
                          className="w-full py-6 rounded-2xl bg-gradient-to-r from-indigo-500 to-blue-600 text-white font-black uppercase tracking-widest text-xl shadow-xl shadow-indigo-200"
                        >
                          Start Nu!
                        </motion.button>
                      </motion.div>
                    ) : (
                      (() => {
                        const activePlayer = gamePlayers[currentPlayerIndex];
                        const activePlayerName = activePlayer ? activePlayer.name : "Gast";
                        
                        // If looping, next player is either the next in array or the first one if we are at the end
                        const nextPlayerIndex = (currentPlayerIndex + 1) % gamePlayers.length;
                        const nextPlayer = gamePlayers.length > 1 ? gamePlayers[nextPlayerIndex] : undefined;
                        const nextPlayerName = nextPlayer ? nextPlayer.name : undefined;
                        
                        const handleMiniGameClose = () => {
                          if (activeMiniGame === 'dotsAndBoxes') {
                            setActiveMiniGame(null);
                            return;
                          }
                          
                          // Always move to next player (looping)
                          setCurrentPlayerIndex(nextPlayerIndex);
                          setShowMiniGameTurnTransition(true);
                        };

                        return (
                          <>
                            {activeMiniGame === 'simon' && (
                            <SimonSays 
                              onClose={handleMiniGameClose} 
                              playerName={activePlayerName}
                              nextPlayerName={nextPlayerName}
                              onSaveScore={(score) => saveHighScore('simon', activePlayerName, score)}
                              leaderboard={highScores['simon'] || []}
                            />
                          )}
                          {activeMiniGame === 'reaction' && (
                            <ReactionTimer 
                              onClose={handleMiniGameClose} 
                              playerName={activePlayerName}
                              nextPlayerName={nextPlayerName}
                              onSaveScore={(score) => saveHighScore('reaction', activePlayerName, score, true)}
                              leaderboard={highScores['reaction'] || []}
                            />
                          )}
                          {activeMiniGame === 'tapper' && (
                            <FastTapper 
                              onClose={handleMiniGameClose} 
                              playerName={activePlayerName}
                              nextPlayerName={nextPlayerName}
                              onSaveScore={(score) => saveHighScore('tapper', activePlayerName, score)}
                              leaderboard={highScores['tapper'] || []}
                            />
                          )}
                          {activeMiniGame === 'fourSecond' && (
                            <FourSecondTimer 
                              onClose={handleMiniGameClose} 
                              playerName={activePlayerName}
                              nextPlayerName={nextPlayerName}
                              onSaveScore={(score) => saveHighScore('fourSecond', activePlayerName, score, true)}
                              leaderboard={highScores['fourSecond'] || []}
                            />
                          )}
                          {activeMiniGame === 'dotsAndBoxes' && (
                            <DotsAndBoxes 
                              onClose={handleMiniGameClose} 
                              playerName={activePlayerName}
                              nextPlayerName={nextPlayerName}
                              onSaveScore={(score, pName) => saveHighScore('dotsAndBoxes', pName || activePlayerName, score)}
                              leaderboard={highScores['dotsAndBoxes'] || []}
                            />
                          )}
                        </>
                      );
                    })())}
                </div>
              ) : (
                  <div className="space-y-4 sm:space-y-8">
                    {gameroomTab === 'basis' ? (
                      <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                        {/* Spel 1: De Grote Quiz */}
                        <motion.button
                          whileHover={{ scale: 1.02, y: -2 }}
                          whileTap={{ scale: 0.98 }}
                          onClick={() => { setTheme('alles'); setScreen('setup'); setActiveSetupSection('mode'); }}
                          className="bg-gradient-to-br from-fuchsia-400 to-purple-600 p-4 sm:p-8 rounded-3xl shadow-lg text-white flex flex-col items-center text-center gap-2 sm:gap-4 relative overflow-hidden group"
                        >
                          <div className="absolute -right-4 -bottom-4 opacity-20 rotate-12 group-hover:scale-110 transition-transform">
                            <HelpCircle size={120} />
                          </div>
                          <div className="bg-white/20 p-3 sm:p-5 rounded-2xl backdrop-blur-sm">
                            <HelpCircle size={32} className="sm:w-10 sm:h-10" />
                          </div>
                          <div>
                            <h3 className="text-xl sm:text-2xl font-black uppercase tracking-wide">De Grote Quiz</h3>
                            <p className="text-fuchsia-100 text-sm sm:text-base font-medium mt-1">Test je kennis over alles!</p>
                          </div>
                        </motion.button>

                        {/* Spel 2: Tafelsommen */}
                        <motion.button
                          whileHover={{ scale: 1.02, y: -2 }}
                          whileTap={{ scale: 0.98 }}
                          onClick={() => { setTheme('tafels'); setScreen('tafels-select'); }}
                          className="bg-gradient-to-br from-amber-400 to-orange-500 p-4 sm:p-8 rounded-3xl shadow-lg text-white flex flex-col items-center text-center gap-2 sm:gap-4 relative overflow-hidden group"
                        >
                          <div className="absolute -right-4 -bottom-4 opacity-20 rotate-12 group-hover:scale-110 transition-transform">
                            <Calculator size={120} />
                          </div>
                          <div className="bg-white/20 p-3 sm:p-5 rounded-2xl backdrop-blur-sm">
                            <Calculator size={32} className="sm:w-10 sm:h-10" />
                          </div>
                          <div>
                            <h3 className="text-xl sm:text-2xl font-black uppercase tracking-wide">Tafels Oefenen</h3>
                            <p className="text-amber-100 text-sm sm:text-base font-medium mt-1">Word een rekenwonder!</p>
                          </div>
                        </motion.button>

                        {/* Spel 3: Moppen Tappen */}
                        <motion.button
                          whileHover={{ scale: 1.02, y: -2 }}
                          whileTap={{ scale: 0.98 }}
                          onClick={() => fetchJokes()}
                          className="bg-gradient-to-br from-blue-400 to-indigo-600 p-4 sm:p-8 rounded-3xl shadow-lg text-white flex flex-col items-center text-center gap-2 sm:gap-4 relative overflow-hidden group"
                        >
                          <div className="absolute -right-4 -bottom-4 opacity-20 rotate-12 group-hover:scale-110 transition-transform">
                            <Smile size={120} />
                          </div>
                          <div className="bg-white/20 p-3 sm:p-5 rounded-2xl backdrop-blur-sm">
                            <Smile size={32} className="sm:w-10 sm:h-10" />
                          </div>
                          <div>
                            <h3 className="text-xl sm:text-2xl font-black uppercase tracking-wide">Moppen Tappen</h3>
                            <p className="text-blue-100 text-sm sm:text-base font-medium mt-1">Lachen is gezond!</p>
                          </div>
                        </motion.button>

                        {/* Spel 5: Gameroom (Mini-games) */}
                        <motion.button
                          whileHover={{ scale: 1.02, y: -2 }}
                          whileTap={{ scale: 0.98 }}
                          onClick={() => setGameroomTab('games')}
                          className="bg-gradient-to-br from-slate-700 to-slate-900 p-4 sm:p-8 rounded-3xl shadow-lg text-white flex flex-col items-center text-center gap-2 sm:gap-4 relative overflow-hidden group"
                        >
                          <div className="absolute -right-4 -bottom-4 opacity-20 rotate-12 group-hover:scale-110 transition-transform">
                            <Gamepad2 size={120} />
                          </div>
                          <div className="bg-white/20 p-3 sm:p-5 rounded-2xl backdrop-blur-sm">
                            <Gamepad2 size={32} className="sm:w-10 sm:h-10" />
                          </div>
                          <div>
                            <h3 className="text-xl sm:text-2xl font-black uppercase tracking-wide">Gameroom</h3>
                            <p className="text-slate-300 text-sm sm:text-base font-medium mt-1">Mini-games & meer!</p>
                          </div>
                        </motion.button>
                      </div>
                    ) : (
                      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
                        {/* Spel 2: Reactiespel */}
                        <motion.button
                          whileHover={{ scale: 1.02, y: -2 }}
                          whileTap={{ scale: 0.98 }}
                          onClick={() => { 
                            setPendingMiniGame('reaction');
                            setSelectedMiniGamePlayerIds(players.map(p => p.id));
                          }}
                          className="bg-gradient-to-br from-rose-400 to-pink-600 p-6 rounded-3xl shadow-lg text-white flex flex-col items-center text-center gap-4 relative overflow-hidden group"
                        >
                          <div className="absolute -right-4 -bottom-4 opacity-20 rotate-12 group-hover:scale-110 transition-transform">
                            <Zap size={100} />
                          </div>
                          <div className="bg-white/20 p-4 rounded-2xl backdrop-blur-sm">
                            <Zap size={32} />
                          </div>
                          <div>
                            <h3 className="text-xl font-black uppercase tracking-wide">Reactiespel</h3>
                            <p className="text-rose-100 font-medium text-sm mt-1">Hoe snel ben jij?</p>
                          </div>
                        </motion.button>

                        {/* Spel 3: Snel Tikken */}
                        <motion.button
                          whileHover={{ scale: 1.02, y: -2 }}
                          whileTap={{ scale: 0.98 }}
                          onClick={() => { 
                            setPendingMiniGame('tapper');
                            setSelectedMiniGamePlayerIds(players.map(p => p.id));
                          }}
                          className="bg-gradient-to-br from-orange-400 to-amber-600 p-6 rounded-3xl shadow-lg text-white flex flex-col items-center text-center gap-4 relative overflow-hidden group"
                        >
                          <div className="absolute -right-4 -bottom-4 opacity-20 rotate-12 group-hover:scale-110 transition-transform">
                            <Timer size={100} />
                          </div>
                          <div className="bg-white/20 p-4 rounded-2xl backdrop-blur-sm">
                            <Timer size={32} />
                          </div>
                          <div>
                            <h3 className="text-xl font-black uppercase tracking-wide">Snel Tikken</h3>
                            <p className="text-orange-100 font-medium text-sm mt-1">Hoe vaak kun je tikken?</p>
                          </div>
                        </motion.button>

                        {/* Spel 6: 4 Seconden */}
                        <motion.button
                          whileHover={{ scale: 1.02, y: -2 }}
                          whileTap={{ scale: 0.98 }}
                          onClick={() => { 
                            setPendingMiniGame('fourSecond');
                            setSelectedMiniGamePlayerIds(players.map(p => p.id));
                          }}
                          className="bg-gradient-to-br from-purple-400 to-indigo-600 p-6 rounded-3xl shadow-lg text-white flex flex-col items-center text-center gap-4 relative overflow-hidden group"
                        >
                          <div className="absolute -right-4 -bottom-4 opacity-20 rotate-12 group-hover:scale-110 transition-transform">
                            <Timer size={100} />
                          </div>
                          <div className="bg-white/20 p-4 rounded-2xl backdrop-blur-sm">
                            <Timer size={32} />
                          </div>
                          <div>
                            <h3 className="text-xl font-black uppercase tracking-wide">4 Seconden</h3>
                            <p className="text-purple-100 font-medium text-sm mt-1">Stop precies op 4.000s!</p>
                          </div>
                        </motion.button>

                        {/* Spel 7: Kamertje Verhuren */}
                        <motion.button
                          whileHover={{ scale: 1.02, y: -2 }}
                          whileTap={{ scale: 0.98 }}
                          onClick={() => { 
                            setPendingMiniGame('dotsAndBoxes');
                            setSelectedMiniGamePlayerIds(players.map(p => p.id));
                          }}
                          className="bg-gradient-to-br from-slate-400 to-slate-600 p-6 rounded-3xl shadow-lg text-white flex flex-col items-center text-center gap-4 relative overflow-hidden group"
                        >
                          <div className="absolute -right-4 -bottom-4 opacity-20 rotate-12 group-hover:scale-110 transition-transform">
                            <LayoutGrid size={100} />
                          </div>
                          <div className="bg-white/20 p-4 rounded-2xl backdrop-blur-sm">
                            <LayoutGrid size={32} />
                          </div>
                          <div>
                            <h3 className="text-xl font-black uppercase tracking-wide">Kamertje Verhuren</h3>
                            <p className="text-slate-100 font-medium text-sm mt-1">Maak de meeste boxen!</p>
                          </div>
                        </motion.button>
                      </div>
                    )}
                  </div>
                )}

                {/* Player Selection Overlay for Mini-games */}
                <AnimatePresence>
                  {pendingMiniGame && (
                    <motion.div
                      initial={{ opacity: 0, y: 20 }}
                      animate={{ opacity: 1, y: 0 }}
                      exit={{ opacity: 0, y: 20 }}
                      className="absolute inset-0 z-50 bg-slate-50 rounded-3xl p-6 flex flex-col"
                    >
                      <div className="flex items-center justify-between mb-4">
                        <h3 className="text-xl font-black text-slate-800 uppercase tracking-tight">Wie doen er mee?</h3>
                        <button 
                          onClick={() => setPendingMiniGame(null)}
                          className="p-2 text-slate-400 hover:text-slate-600 transition-colors"
                        >
                          <X size={24} />
                        </button>
                      </div>

                      {/* Start Button at the top for better accessibility */}
                      <div className="mb-6">
                        <button
                          disabled={selectedMiniGamePlayerIds.length === 0}
                          onClick={() => {
                            const selectedPlayers = players.filter(p => selectedMiniGamePlayerIds.includes(p.id));
                            const finalPlayers = selectedPlayers.length > 0 ? selectedPlayers : [{ id: 'gast', name: 'Gast', score: 0, answered: 0, consecutiveCorrect: 0, consecutiveWrong: 0, iconName: 'User', favoriteColor: 'indigo' }];
                            
                            setActiveMiniGame(pendingMiniGame);
                            setMiniGameStarted(true);
                            setGamePlayers(finalPlayers);
                            setCurrentPlayerIndex(0);
                            
                            // Scroll to top when starting a game
                            window.scrollTo({ top: 0, behavior: 'smooth' });
                            
                            // Special handling for turn transitions
                            if (pendingMiniGame === 'dotsAndBoxes') {
                              setShowMiniGameTurnTransition(false);
                            } else {
                              setShowMiniGameTurnTransition(finalPlayers.length > 0);
                            }
                            
                            setPendingMiniGame(null);
                          }}
                          className={`w-full py-4 rounded-2xl font-black text-xl uppercase tracking-wide shadow-lg transition-all flex items-center justify-center gap-3 ${
                            selectedMiniGamePlayerIds.length > 0
                              ? 'bg-indigo-500 text-white hover:bg-indigo-600 active:scale-95'
                              : 'bg-slate-200 text-slate-400 cursor-not-allowed'
                          }`}
                        >
                          <Play size={24} fill="currentColor" />
                          Spel Starten!
                        </button>
                      </div>

                      <div className="flex-1 overflow-y-auto space-y-3 pr-2">
                        {players.length > 0 ? (
                          players.map(player => (
                            <button
                              key={player.id}
                              onClick={() => {
                                setSelectedMiniGamePlayerIds(prev => 
                                  prev.includes(player.id) 
                                    ? prev.filter(id => id !== player.id)
                                    : [...prev, player.id]
                                );
                              }}
                              className={`w-full flex items-center gap-4 p-4 rounded-2xl border-2 transition-all ${
                                selectedMiniGamePlayerIds.includes(player.id)
                                  ? 'border-indigo-500 bg-indigo-50'
                                  : 'border-slate-100 bg-white hover:border-slate-200'
                              }`}
                            >
                              <div className={`p-2 rounded-xl ${
                                selectedMiniGamePlayerIds.includes(player.id) ? 'bg-indigo-500 text-white' : 'bg-slate-100 text-slate-400'
                              }`}>
                                <AvatarIcon player={player} size="sm" />
                              </div>
                              <span className={`font-bold text-lg ${
                                selectedMiniGamePlayerIds.includes(player.id) ? 'text-indigo-700' : 'text-slate-600'
                              }`}>
                                {player.name}
                              </span>
                              <div className="ml-auto">
                                {selectedMiniGamePlayerIds.includes(player.id) ? (
                                  <div className="w-6 h-6 bg-indigo-500 rounded-full flex items-center justify-center text-white">
                                    <CheckCircle2 size={16} />
                                  </div>
                                ) : (
                                  <div className="w-6 h-6 border-2 border-slate-200 rounded-full" />
                                )}
                              </div>
                            </button>
                          ))
                        ) : (
                          <div className="text-center py-8 flex flex-col gap-4">
                            <p className="text-slate-500 font-medium">Geen deelnemers gevonden.</p>
                            <button
                              onClick={() => {
                                setPendingMiniGame(null);
                                setScreen('players');
                              }}
                              className="bg-indigo-100 text-indigo-600 font-black py-3 px-6 rounded-xl"
                            >
                              Deelnemers toevoegen
                            </button>
                            <div className="flex items-center gap-2 text-slate-300 my-2">
                              <div className="h-[1px] flex-1 bg-slate-200"></div>
                              <span className="text-[10px] font-black uppercase tracking-widest">of</span>
                              <div className="h-[1px] flex-1 bg-slate-200"></div>
                            </div>
                            <button
                              onClick={() => {
                                setActiveMiniGame(pendingMiniGame);
                                setMiniGameStarted(true);
                                setGamePlayers([{ id: 'gast', name: 'Gast', score: 0, answered: 0, consecutiveCorrect: 0, consecutiveWrong: 0, iconName: 'User', favoriteColor: 'indigo' }]);
                                setCurrentPlayerIndex(0);
                                setShowMiniGameTurnTransition(false);
                                setPendingMiniGame(null);
                                window.scrollTo({ top: 0, behavior: 'smooth' });
                              }}
                              className="bg-slate-800 text-white font-black py-3 px-6 rounded-xl shadow-lg"
                            >
                              Speel als Gast
                            </button>
                          </div>
                        )}
                      </div>
                    </motion.div>
                  )}
                </AnimatePresence>
              </motion.div>
            )}

            {/* PLAYERS SCREEN */}
            {screen === 'players' && (
              <motion.div 
                key="players"
                initial={{ opacity: 0, scale: 0.95 }}
                animate={{ opacity: 1, scale: 1 }}
                exit={{ opacity: 0, scale: 1.05 }}
                className={`flex flex-col gap-6 w-full max-w-md mx-auto ${useUniversalNav ? 'pb-32' : ''}`}
              >
                <div className="bg-white p-8 rounded-3xl shadow-xl border-2 border-slate-100">
                  <div className="flex items-center gap-4 mb-6">
                    <div className="bg-indigo-100 p-3 rounded-2xl text-indigo-600">
                      <Users size={24} />
                    </div>
                    <div>
                      <h2 className="text-2xl font-black text-slate-800 uppercase tracking-tight">Deelnemers</h2>
                    </div>
                  </div>

                  {/* Deelnemers List */}
                  <section className="mb-8">
                    {players.length > 0 ? (
                      <div className="flex flex-col gap-3 mb-6">
                        {players.map(p => {
                          const playerColor = PLAYER_COLORS.find(c => c.id === p.favoriteColor) || PLAYER_COLORS[9];
                          return (
                            <motion.div 
                              key={p.id} 
                              whileHover={{ scale: 1.02, y: -2 }}
                              onClick={() => {
                                setSelectedPlayerId(p.id);
                                setScreen('collection');
                              }}
                              className={`flex items-center gap-4 ${playerColor.light} p-4 rounded-[2.5rem] border-2 ${playerColor.border} hover:shadow-lg hover:shadow-${p.favoriteColor}-200/50 transition-all cursor-pointer group relative overflow-hidden`}
                            >
                              {/* Background Pattern Decoration */}
                              <div className="absolute -right-4 -bottom-4 opacity-5 rotate-12 pointer-events-none">
                                {getIcon(p.iconName || 'cat', "w-24 h-24")}
                              </div>

                              {/* Large Avatar Section */}
                              <div className={`shrink-0 w-20 h-20 rounded-3xl ${playerColor.bg} flex items-center justify-center shadow-lg border-4 border-white relative z-10`}>
                                {getIcon(p.iconName || 'cat', "w-10 h-10 text-white drop-shadow-md")}
                                
                                {p.completedAvatars && p.completedAvatars.length > 0 && (
                                  <div className="absolute -top-2 -right-2 bg-amber-400 text-white w-7 h-7 rounded-full flex items-center justify-center border-2 border-white shadow-sm">
                                    <Trophy size={14} />
                                  </div>
                                )}
                              </div>

                              <div className="flex-1 min-w-0 relative z-10">
                                <div className="flex items-center gap-2 mb-1">
                                  <span className={`font-black ${playerColor.text} text-xl uppercase tracking-tight`}>{p.name}</span>
                                  <div className="flex gap-1 shrink-0">
                                    <span className="text-[10px] font-black bg-white/80 text-slate-500 px-2 py-0.5 rounded-full uppercase tracking-wider shadow-sm border border-slate-100">
                                      {p.age}j
                                    </span>
                                  </div>
                                </div>

                                <div className="flex items-center gap-3 mb-2">
                                  <span className="text-sm font-black text-slate-600 uppercase tracking-widest">
                                    Goede antwoorden: <span className="text-indigo-600 text-lg">{p.score}</span>
                                  </span>
                                </div>

                                {/* Collection Button Label */}
                                <div className="mt-3 flex flex-wrap items-center gap-2">
                                  <button 
                                     onClick={(e) => {
                                       e.stopPropagation();
                                       setSelectedPlayerId(p.id);
                                       setScreen('collection');
                                     }}
                                     className={`flex items-center gap-2 ${playerColor.bg} text-white px-3 py-1.5 rounded-xl shadow-sm hover:brightness-110 active:scale-95 transition-all`}
                                   >
                                     <Palette size={12} />
                                     <span className="text-[9px] font-black uppercase tracking-widest">Mijn Slimme Wereld</span>
                                   </button>
                                 </div>
                               </div>

                              {/* Edit/Delete Buttons */}
                              <div className="flex flex-col gap-1 shrink-0 relative z-10" onClick={e => e.stopPropagation()}>
                                <button 
                                  onClick={() => editPlayer(p)} 
                                  className={`text-slate-400 hover:${playerColor.text} hover:bg-white p-2 rounded-xl transition-all`}
                                  title="Aanpassen"
                                >
                                  <Pencil size={18} />
                                </button>
                                <button 
                                  onClick={() => removePlayer(p.id)} 
                                  className="text-slate-400 hover:text-rose-500 hover:bg-white p-2 rounded-xl transition-all"
                                  title="Verwijderen"
                                >
                                  <Trash2 size={18} />
                                </button>
                              </div>
                            </motion.div>
                          );
                        })}
                      </div>
                    ) : (
                      <div className="bg-slate-50 border-2 border-dashed border-slate-200 rounded-3xl p-8 text-center mb-6">
                        <Users size={40} className="text-slate-300 mx-auto mb-3" />
                        <p className="text-slate-400 font-bold">Nog geen deelnemers toegevoegd</p>
                      </div>
                    )}

                    <motion.button
                      whileHover={{ scale: 1.02, y: -2 }}
                      whileTap={{ scale: 0.98 }}
                      onClick={addNewPlayer}
                      className="w-full bg-gradient-to-r from-indigo-500 to-purple-600 text-white py-5 rounded-2xl font-black uppercase tracking-wide shadow-xl shadow-indigo-500/20 flex items-center justify-center gap-3 relative overflow-hidden group"
                    >
                      <div className="absolute inset-0 bg-white/20 translate-y-full group-hover:translate-y-0 transition-transform duration-300" />
                      <Plus size={24} className="relative z-10" />
                      <span className="relative z-10">Nieuwe Deelnemer Toevoegen</span>
                    </motion.button>
                  </section>

                  <div className="space-y-3 mb-8 pt-6 border-t border-slate-100">
                    <h3 className="text-sm font-black text-slate-400 uppercase tracking-widest mb-2">Acties</h3>
                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                      <motion.button 
                        whileHover={{ scale: 1.05 }}
                        whileTap={{ scale: 0.95 }}
                        onClick={resetScores} 
                        className="flex items-center justify-center gap-2 bg-amber-100 text-amber-700 px-4 py-4 rounded-2xl font-black text-sm hover:bg-amber-200 transition-all uppercase tracking-wide border-2 border-amber-200/50 shadow-sm"
                      >
                        <RotateCcw size={18} />
                        Reset Scores
                      </motion.button>
                      <motion.button 
                        whileHover={{ scale: 1.05 }}
                        whileTap={{ scale: 0.95 }}
                        onClick={clearPlayers} 
                        className="flex items-center justify-center gap-2 bg-rose-100 text-rose-700 px-4 py-4 rounded-2xl font-black text-sm hover:bg-rose-200 transition-all uppercase tracking-wide border-2 border-rose-200/50 shadow-sm"
                      >
                        <Trash2 size={18} />
                        Wis Namen
                      </motion.button>
                      <motion.button 
                        whileHover={{ scale: 1.05 }}
                        whileTap={{ scale: 0.95 }}
                        onClick={() => setUseUniversalNav(!useUniversalNav)} 
                        className={`flex items-center justify-center gap-2 ${useUniversalNav ? 'bg-indigo-100 text-indigo-700 border-indigo-200' : 'bg-slate-100 text-slate-700 border-slate-200'} px-4 py-4 rounded-2xl font-black text-sm transition-all uppercase tracking-wide border-2 shadow-sm col-span-full`}
                      >
                        <Layout size={18} />
                        Navigatiebalk: {useUniversalNav ? 'AAN' : 'UIT'}
                      </motion.button>
                      <motion.button 
                        whileHover={{ scale: 1.05 }}
                        whileTap={{ scale: 0.95 }}
                        onClick={() => setScreen('settings')} 
                        className="flex items-center justify-center gap-2 bg-cyan-100 text-cyan-700 px-4 py-4 rounded-2xl font-black text-sm hover:bg-cyan-200 transition-all uppercase tracking-wide border-2 border-cyan-200/50 shadow-sm sm:col-span-2"
                      >
                        <Database size={18} />
                        Database Vragen
                      </motion.button>
                    </div>
                  </div>
                  
                  {!useUniversalNav && (
                    <motion.button 
                      whileHover={{ scale: 1.02, x: -5 }}
                      whileTap={{ scale: 0.98 }}
                      onClick={() => setScreen('start')}
                      className="w-full bg-slate-800 hover:bg-slate-700 text-white font-black py-5 rounded-2xl transition-all uppercase tracking-wide shadow-lg shadow-slate-800/20 flex items-center justify-center gap-3"
                    >
                      <ArrowLeft size={20} />
                      Terug naar Home
                    </motion.button>
                  )}
                </div>
              </motion.div>
            )}

            {/* PLAYER EDIT/ADD SCREEN */}
            {screen === 'player-edit' && (
              <motion.div 
                key="player-edit"
                initial={{ opacity: 0, x: 20 }}
                animate={{ opacity: 1, x: 0 }}
                exit={{ opacity: 0, x: -20 }}
                className="flex flex-col gap-6 w-full max-w-md mx-auto"
              >
                <div className="bg-white p-8 rounded-3xl shadow-xl border-2 border-slate-100">
                  <div className="flex items-center gap-4 mb-8">
                    <div className={`p-3 rounded-2xl ${editingPlayerId ? 'bg-amber-100 text-amber-600' : 'bg-indigo-100 text-indigo-600'}`}>
                      {editingPlayerId ? <Pencil size={24} /> : <Plus size={24} />}
                    </div>
                    <div>
                      <h2 className="text-2xl font-black text-slate-800 uppercase tracking-tight">
                        {editingPlayerId ? 'Deelnemer Aanpassen' : 'Nieuwe Deelnemer'}
                      </h2>
                      <p className="text-slate-500 font-medium">Vul de gegevens in</p>
                    </div>
                  </div>

                  <div className="space-y-6">
                    <div className="space-y-2">
                      <div className="flex justify-between items-center px-1">
                        <label className="text-xs font-black text-slate-400 uppercase tracking-widest flex items-center gap-1.5">
                          <User size={14} className="text-indigo-400" />
                          Naam
                        </label>
                      </div>
                      <input
                        type="text"
                        placeholder="Bijv. Lucas"
                        value={newPlayerName}
                        onChange={e => setNewPlayerName(e.target.value)}
                        onKeyDown={e => e.key === 'Enter' && savePlayer()}
                        className="w-full bg-slate-50 border-2 border-slate-200 rounded-2xl px-5 py-4 font-bold text-slate-700 focus:outline-none focus:border-indigo-400 transition-all"
                        autoFocus
                      />
                    </div>

                    <div className="space-y-2">
                      <div className="flex justify-between items-center px-1">
                        <label className="text-xs font-black text-slate-400 uppercase tracking-widest flex items-center gap-1.5">
                          <Star size={14} className="text-indigo-400" />
                          Leeftijd
                        </label>
                        <span className="text-[10px] font-bold text-indigo-500/60 italic bg-indigo-50 px-2 py-0.5 rounded-full">
                          Helpt de AI! ✨
                        </span>
                      </div>
                      
                      <div className="flex items-center justify-between bg-slate-50 border-2 border-slate-200 rounded-2xl p-2 focus-within:border-indigo-400 transition-all">
                        <button 
                          onClick={() => setNewPlayerAge(prev => Math.max(3, prev - 1))}
                          className="w-12 h-12 flex items-center justify-center text-slate-400 hover:text-indigo-600 hover:bg-white rounded-xl transition-all shadow-sm active:scale-90"
                        >
                          -
                        </button>
                        <div className="flex flex-col items-center">
                          <span className="text-2xl font-black text-slate-800 leading-none">{newPlayerAge}</span>
                          <span className="text-[10px] font-black text-slate-400 uppercase tracking-widest mt-1">jaar oud</span>
                        </div>
                        <button 
                          onClick={() => setNewPlayerAge(prev => Math.min(99, prev + 1))}
                          className="w-12 h-12 flex items-center justify-center text-slate-400 hover:text-indigo-600 hover:bg-white rounded-xl transition-all shadow-sm active:scale-90"
                        >
                          +
                        </button>
                      </div>
                    </div>

                    <div className="space-y-2">
                      <label className="text-xs font-black text-slate-400 uppercase tracking-widest ml-1 flex items-center gap-1.5">
                        <BookOpen size={14} className="text-indigo-400" />
                        Schoolniveau (optioneel)
                      </label>
                      <div className="grid grid-cols-3 gap-2">
                        {['Groep 1-2', 'Groep 3', 'Groep 4', 'Groep 5', 'Groep 6', 'Groep 7', 'Groep 8', 'Middelbare', 'MBO of hoger'].map(lvl => (
                          <button
                            key={lvl}
                            onClick={() => {
                              setNewPlayerSchoolLevel(lvl);
                              if (lvl === 'MBO of hoger' && newPlayerAge < 16) {
                                setNewPlayerAge(16);
                              } else if (lvl === 'Middelbare' && newPlayerAge < 12) {
                                setNewPlayerAge(12);
                              } else if (lvl.startsWith('Groep') && newPlayerAge > 12) {
                                // Optional: reset age if it's way off for primary school
                                if (lvl === 'Groep 1-2') setNewPlayerAge(5);
                                else if (lvl === 'Groep 3') setNewPlayerAge(6);
                                else if (lvl === 'Groep 4') setNewPlayerAge(7);
                                else if (lvl === 'Groep 5') setNewPlayerAge(8);
                                else if (lvl === 'Groep 6') setNewPlayerAge(9);
                                else if (lvl === 'Groep 7') setNewPlayerAge(10);
                                else if (lvl === 'Groep 8') setNewPlayerAge(11);
                              }
                            }}
                            className={`py-2 px-1 rounded-xl border-2 font-bold text-[10px] transition-all ${
                              newPlayerSchoolLevel === lvl
                                ? 'border-indigo-500 bg-indigo-50 text-indigo-700'
                                : 'border-slate-100 bg-slate-50 text-slate-500 hover:border-slate-200'
                            }`}
                          >
                            {lvl}
                          </button>
                        ))}
                      </div>
                    </div>

                    <div className="space-y-4">
                      <div className="flex justify-center mb-4">
                        <div className="relative group">
                          <div className={`absolute inset-0 bg-${newPlayerColor}-400/20 blur-2xl rounded-full scale-150 animate-pulse`} />
                          <div className="relative bg-white p-6 rounded-3xl border-4 border-slate-100 shadow-xl">
                            <AvatarIcon 
                              player={{
                                id: 'preview',
                                name: newPlayerName || 'Preview',
                                age: newPlayerAge,
                                favoriteColor: newPlayerColor,
                                iconName: newPlayerIcon,
                                score: 0,
                                answered: 0,
                                consecutiveCorrect: 0,
                                consecutiveWrong: 0,
                                globalRank: 0,
                                levels: []
                              }}
                              size="xl"
                            />
                          </div>
                        </div>
                      </div>

                      <div className="space-y-2">
                        <label className="text-xs font-black text-slate-400 uppercase tracking-widest ml-1 flex items-center gap-1.5">
                          <Palette size={14} className="text-indigo-400" />
                          Lievelingskleur
                        </label>
                        <div className="flex flex-wrap gap-2">
                          {PLAYER_COLORS.map(color => (
                            <button
                              key={color.id}
                              onClick={() => setNewPlayerColor(color.id)}
                              className={`w-8 h-8 rounded-full ${color.bg} transition-all ${
                                newPlayerColor === color.id 
                                  ? 'ring-4 ring-offset-2 ring-slate-200 scale-110' 
                                  : 'hover:scale-110'
                              }`}
                              title={color.id}
                            />
                          ))}
                        </div>
                      </div>

                      <div className="space-y-4">
                        <label className="text-xs font-black text-slate-400 uppercase tracking-widest ml-1 flex items-center gap-1.5">
                          <Gamepad2 size={14} className="text-indigo-400" />
                          Kies een icoontje
                        </label>
                        <div className="grid grid-cols-5 sm:grid-cols-7 gap-2 max-h-48 overflow-y-auto p-2 bg-slate-50 rounded-2xl border-2 border-slate-100 custom-scrollbar">
                          {PLAYER_ICONS.map(item => {
                            const isSelected = newPlayerIcon === item.icon;
                            const playerColor = PLAYER_COLORS.find(c => c.id === newPlayerColor) || PLAYER_COLORS[9];
                            
                            return (
                              <button
                                key={item.id}
                                onClick={() => setNewPlayerIcon(item.icon)}
                                className={`aspect-square rounded-xl flex items-center justify-center transition-all relative group ${
                                  isSelected 
                                    ? `${playerColor.bg} text-white shadow-lg scale-110 z-10 ring-4 ring-white` 
                                    : 'bg-white text-slate-400 hover:bg-slate-100 hover:text-slate-600 border border-slate-100 shadow-sm'
                                }`}
                                title={item.label}
                              >
                                {getIcon(item.icon, isSelected ? "w-6 h-6" : "w-5 h-5")}
                                {!isSelected && (
                                  <div className="absolute -bottom-8 left-1/2 -translate-x-1/2 bg-slate-800 text-white text-[8px] px-2 py-1 rounded opacity-0 group-hover:opacity-100 transition-opacity whitespace-nowrap z-20 pointer-events-none uppercase font-black tracking-widest">
                                    {item.label}
                                  </div>
                                )}
                              </button>
                            );
                          })}
                        </div>
                      </div>
                    </div>

                    <div className="flex gap-3 pt-6">
                      <motion.button
                        whileHover={{ scale: 1.02 }}
                        whileTap={{ scale: 0.98 }}
                        onClick={cancelEdit}
                        className="flex-1 bg-slate-100 text-slate-600 py-4 rounded-2xl font-black uppercase tracking-wide hover:bg-slate-200 transition-all border-2 border-slate-200/50"
                      >
                        Annuleren
                      </motion.button>
                      <motion.button
                        whileHover={{ scale: 1.02 }}
                        whileTap={{ scale: 0.98 }}
                        onClick={savePlayer}
                        disabled={!newPlayerName.trim()}
                        className={`flex-[2] text-white py-4 rounded-2xl font-black uppercase tracking-wide transition-all flex items-center justify-center gap-2 shadow-lg relative overflow-hidden group ${
                          editingPlayerId 
                            ? 'bg-gradient-to-r from-amber-400 to-orange-500 shadow-orange-500/20' 
                            : 'bg-gradient-to-r from-indigo-500 to-purple-600 shadow-indigo-500/20'
                        } disabled:opacity-50 disabled:cursor-not-allowed`}
                      >
                        <div className="absolute inset-0 bg-white/20 translate-y-full group-hover:translate-y-0 transition-transform duration-300" />
                        <span className="relative z-10 flex items-center gap-2">
                          {editingPlayerId ? <CheckCircle2 size={20} /> : <Plus size={20} />}
                          {editingPlayerId ? 'Opslaan' : 'Toevoegen'}
                        </span>
                      </motion.button>
                    </div>
                  </div>
                </div>
              </motion.div>
            )}
            {/* SETTINGS / DATABASE SCREEN */}
            {screen === 'settings' && (
              <motion.div 
                key="settings"
                initial={{ opacity: 0, scale: 0.95 }}
                animate={{ opacity: 1, scale: 1 }}
                exit={{ opacity: 0, scale: 1.05 }}
                className="flex flex-col gap-6 w-full max-w-md mx-auto"
              >
                <div className="bg-white p-8 rounded-3xl shadow-xl border-2 border-slate-100">
                  <div className="flex items-center gap-4 mb-6">
                    <div className="bg-cyan-100 p-3 rounded-2xl text-cyan-600">
                      <Database size={24} />
                    </div>
                    <div>
                      <h2 className="text-2xl font-black text-slate-800 uppercase tracking-tight">Database</h2>
                      <p className="text-slate-500 font-medium">Overzicht van alle vragen</p>
                    </div>
                  </div>

                  <div className="space-y-3">
                    {THEMES.filter(t => t.id !== 'alles').map(t => {
                      const count = QUESTIONS.filter(q => q.themeId === t.id).length;
                      return (
                        <div key={t.id} className="flex items-center justify-between p-3 rounded-2xl bg-slate-50 border border-slate-100">
                          <div className="flex items-center gap-3">
                            <div className={`p-2 rounded-lg ${t.color.split(' ')[0]}`}>
                              {getIcon(t.iconName, "w-5 h-5")}
                            </div>
                            <span className="font-bold text-slate-700">{t.title}</span>
                          </div>
                          <div className="flex items-center gap-2">
                            <span className="font-black text-slate-900">{count}</span>
                            <span className="text-xs font-bold text-slate-400 uppercase">Vragen</span>
                          </div>
                        </div>
                      );
                    })}
                  </div>

                  <div className="mt-8 pt-6 border-t border-slate-100">
                    <div className="flex justify-between items-center mb-6">
                      <span className="font-bold text-slate-500 uppercase text-xs tracking-widest">Totaal in database</span>
                      <span className="text-2xl font-black text-cyan-600">{QUESTIONS.length}</span>
                    </div>
                    
                    {!useUniversalNav && (
                      <button 
                        onClick={() => setScreen('start')}
                        className="w-full bg-slate-800 hover:bg-slate-700 text-white font-black py-4 rounded-2xl transition-all active:scale-95 uppercase tracking-wide"
                      >
                        Terug naar Home
                      </button>
                    )}
                  </div>
                </div>
              </motion.div>
            )}

            {/* SETUP SCREEN */}
            {screen === 'setup' && (
              <motion.div 
                key="setup"
                initial={{ opacity: 0, x: 20 }}
                animate={{ opacity: 1, x: 0 }}
                exit={{ opacity: 0, x: -20 }}
                className={`flex flex-col gap-8 w-full pb-32 relative ${useUniversalNav ? 'pb-48' : ''}`}
              >
                {/* Decorative background elements */}
                <div className="absolute -top-20 -left-20 w-64 h-64 bg-cyan-200/20 rounded-full blur-3xl pointer-events-none" />
                <div className="absolute top-1/2 -right-20 w-80 h-80 bg-purple-200/20 rounded-full blur-3xl pointer-events-none" />

                <div className="text-center mb-2 bg-white/80 backdrop-blur-sm p-6 rounded-3xl shadow-sm border-2 border-slate-100 relative z-10">
                  <h2 className="text-3xl font-black text-slate-800 uppercase tracking-tight">Stel je spel in</h2>
                  <p className="text-slate-500 font-medium mt-2">Kies je thema en hoe je wilt spelen.</p>
                </div>

                {/* Theme */}
                <section className="bg-white/90 backdrop-blur-sm p-4 sm:p-6 rounded-3xl shadow-sm border-2 border-slate-100 relative z-10">
                  <div 
                    className="flex items-center justify-between cursor-pointer"
                    onClick={() => setActiveSetupSection(activeSetupSection === 'theme' ? 'mode' : 'theme')}
                  >
                    <h3 className="text-xl font-black text-slate-700 flex items-center gap-3 uppercase tracking-wide">
                      <div className="bg-cyan-100 p-2 rounded-xl text-cyan-600"><Database size={20}/></div>
                      1. Thema
                      {activeSetupSection !== 'theme' && theme && (
                        <span className="text-sm text-cyan-500 ml-2 normal-case tracking-normal bg-cyan-50 px-3 py-1 rounded-full border border-cyan-100">
                          {THEMES.find(th => th.id === theme)?.title}
                        </span>
                      )}
                    </h3>
                    <div className="text-slate-400">
                      {activeSetupSection === 'theme' ? <ChevronUp /> : <ChevronDown />}
                    </div>
                  </div>
                  
                  <AnimatePresence>
                    {activeSetupSection === 'theme' && (
                      <motion.div
                        initial={{ height: 0, opacity: 0 }}
                        animate={{ height: 'auto', opacity: 1 }}
                        exit={{ height: 0, opacity: 0 }}
                        className="overflow-hidden"
                      >
                        <div className="grid grid-cols-3 sm:grid-cols-4 gap-3 pt-6">
                          {[THEMES[0], getSeasonalTheme(), ...THEMES.slice(1)].map(t => {
                            const isSelected = theme === t.id;
                            const { color1, color2, patternUrl } = getThemeBackground(t.id);
                            const themeColorClass = t.color.split(' ')[1].replace('text-', 'border-');
                            const themeBaseColor = t.color.split(' ')[1].replace('text-', '');

                            return (
                              <motion.button
                                key={t.id === 'seizoen' ? `seizoen-${t.title}` : t.id}
                                whileHover={{ scale: 1.05, y: -4 }}
                                whileTap={{ scale: 0.95 }}
                                onClick={() => {
                                  setTheme(t.id);
                                  setActiveSetupSection('mode');
                                }}
                                className={`p-3 rounded-2xl border-2 flex flex-col items-center text-center gap-2 transition-all duration-300 relative overflow-hidden group ${isSelected ? `${themeColorClass} shadow-xl ring-2 ring-offset-2 ring-${themeBaseColor}` : 'border-slate-100 shadow-sm hover:border-slate-300'}`}
                                style={{ 
                                  backgroundColor: isSelected ? 'white' : '#f8fafc',
                                  borderColor: isSelected ? undefined : '#f1f5f9'
                                }}
                              >
                                {t.id === 'seizoen' && (
                                  <div className="absolute top-0 right-0 bg-amber-400 text-white text-[10px] font-black px-2 py-0.5 rounded-bl-lg z-30 uppercase tracking-tighter shadow-sm">
                                    Nieuw!
                                  </div>
                                )}

                                {/* Animated Background Layer */}
                                <motion.div 
                                  className={`absolute inset-0 opacity-20 ${color1}`}
                                  animate={isSelected ? {
                                    scale: [1, 1.1, 1],
                                    rotate: [0, 2, -2, 0]
                                  } : {}}
                                  transition={{ duration: 10, repeat: Infinity, ease: "linear" }}
                                />
                                
                                <div className={`absolute inset-0 opacity-10 ${color2} bg-gradient-to-br from-white to-transparent`} />

                                {/* Pattern Background */}
                                <div 
                                  className="absolute inset-0 opacity-[0.08] pointer-events-none z-10" 
                                  style={{ backgroundImage: `url("${patternUrl}")` }} 
                                />

                                {/* Image Background */}
                                {t.imageUrl && (
                                  <div className={`absolute inset-0 transition-all duration-700 ${isSelected ? 'opacity-40 scale-110' : 'opacity-5 group-hover:opacity-15 group-hover:scale-110'}`}>
                                    <img src={t.imageUrl} alt="" className="w-full h-full object-cover" referrerPolicy="no-referrer" />
                                    <div className={`absolute inset-0 bg-gradient-to-t from-white via-white/20 to-transparent`} />
                                  </div>
                                )}

                                {/* Icon Container */}
                                <motion.div 
                                  className={`p-3 rounded-xl ${t.color.split(' ')[0]} ${t.color.split(' ')[1]} relative z-20 transition-all duration-300 shadow-sm`}
                                  animate={isSelected ? { rotate: [0, -10, 10, 0] } : {}}
                                  transition={{ duration: 0.5, repeat: isSelected ? Infinity : 0, repeatDelay: 2 }}
                                >
                                  {getIcon(t.iconName, "w-6 h-6")}
                                </motion.div>

                                {/* Label */}
                                <span className={`font-black text-[10px] sm:text-xs uppercase tracking-wider relative z-20 transition-colors duration-300 ${isSelected ? t.color.split(' ')[1] : 'text-slate-500'}`}>
                                  {t.title}
                                </span>

                                {/* Selection Glow */}
                                {isSelected && (
                                  <motion.div 
                                    layoutId="theme-glow"
                                    className={`absolute inset-0 z-0 opacity-20 blur-xl ${color1}`}
                                  />
                                )}
                              </motion.button>
                            );
                          })}
                        </div>
                      </motion.div>
                    )}
                  </AnimatePresence>
                </section>

                {/* Mode / Players */}
                <section className="bg-white/90 backdrop-blur-sm p-4 sm:p-6 rounded-3xl shadow-sm border-2 border-slate-100 relative z-10">
                  <div 
                    className="flex items-center justify-between cursor-pointer"
                    onClick={() => setActiveSetupSection(activeSetupSection === 'mode' ? 'theme' : 'mode')}
                  >
                    <h3 className="text-xl font-black text-slate-700 flex items-center gap-3 uppercase tracking-wide">
                      <div className="bg-emerald-100 p-2 rounded-xl text-emerald-600"><Users size={20}/></div>
                      2. Wie speelt er mee?
                      {activeSetupSection !== 'mode' && (
                        <span className="text-sm text-emerald-500 ml-2 normal-case tracking-normal bg-emerald-50 px-3 py-1 rounded-full border border-emerald-100">
                          {selectedPlayerIds.length === 0 
                            ? (players.length > 1 ? 'Iedereen' : players[0]?.name || 'Gast')
                            : selectedPlayerIds.length === 1 
                              ? players.find(p => p.id === selectedPlayerIds[0])?.name
                              : `${selectedPlayerIds.length} spelers`}
                        </span>
                      )}
                    </h3>
                    <div className="text-slate-400">
                      {activeSetupSection === 'mode' ? <ChevronUp /> : <ChevronDown />}
                    </div>
                  </div>

                  <AnimatePresence>
                    {activeSetupSection === 'mode' && (
                      <motion.div
                        initial={{ height: 0, opacity: 0 }}
                        animate={{ height: 'auto', opacity: 1 }}
                        exit={{ height: 0, opacity: 0 }}
                        className="overflow-hidden"
                      >
                        <div className="pt-6">
                          {players.length > 0 ? (
                            <div className="grid grid-cols-2 sm:grid-cols-3 gap-3">
                              {players.map(p => {
                                const isSelected = selectedPlayerIds.includes(p.id);
                                const color = PLAYER_COLORS.find(c => c.id === p.favoriteColor);
                                return (
                                  <motion.button
                                    key={p.id}
                                    whileHover={{ scale: 1.05 }}
                                    whileTap={{ scale: 0.95 }}
                                    onClick={() => {
                                      const newIds = selectedPlayerIds.includes(p.id)
                                        ? selectedPlayerIds.filter(id => id !== p.id)
                                        : [...selectedPlayerIds, p.id];
                                      setSelectedPlayerIds(newIds);
                                      // Auto mode adjustment
                                      if (newIds.length === 1) setMode('alleen');
                                      else setMode('beurt');
                                    }}
                                    className={`p-4 rounded-2xl border-2 transition-all flex flex-col items-center gap-2 relative overflow-hidden ${isSelected
                                      ? `${color?.bg || 'bg-indigo-600'} text-white border-transparent shadow-lg`
                                      : 'bg-white text-slate-600 border-slate-100 hover:border-emerald-200'}`}
                                  >
                                    <div className={`p-2 rounded-xl ${isSelected ? 'bg-white/20' : color?.light || 'bg-slate-50'}`}>
                                      {getIcon(p.iconName || 'User', "w-6 h-6")}
                                    </div>
                                    <span className="font-bold text-sm truncate w-full text-center">{p.name}</span>
                                    {isSelected && (
                                      <motion.div 
                                        layoutId={`player-check-${p.id}`}
                                        className="absolute top-2 right-2 w-2 h-2 rounded-full bg-white"
                                      />
                                    )}
                                  </motion.button>
                                );
                              })}
                            </div>
                          ) : (
                            <div className="text-center py-8 bg-slate-50 rounded-2xl border-2 border-dashed border-slate-200">
                              <p className="text-slate-500 font-medium mb-4">Nog geen spelers aangemaakt!</p>
                              <button 
                                onClick={() => setScreen('players')}
                                className="bg-indigo-500 text-white px-6 py-2 rounded-xl font-bold text-sm"
                              >
                                Speler toevoegen
                              </button>
                            </div>
                          )}
                          
                          {selectedPlayerIds.length === 0 && players.length > 1 && (
                            <p className="text-[10px] text-slate-400 mt-4 italic text-center">Iedereen doet mee als je niemand kiest.</p>
                          )}
                          
                          {selectedPlayerIds.length > 1 && (
                            <div className="mt-4 p-3 bg-emerald-50 rounded-xl border border-emerald-100 flex items-center gap-3">
                              <div className="bg-emerald-500 p-1.5 rounded-lg text-white">
                                <RefreshCw size={14} />
                              </div>
                              <p className="text-[10px] text-emerald-700 font-bold uppercase tracking-wider">
                                Om de beurt spelen: Geef de telefoon door!
                              </p>
                            </div>
                          )}
                        </div>
                      </motion.div>
                    )}
                  </AnimatePresence>
                </section>

                {/* Start Button */}
                <div className="fixed bottom-0 left-0 right-0 p-4 bg-slate-50/90 backdrop-blur-md border-t border-slate-200 flex justify-center z-20">
                  <button 
                    onClick={startGame}
                    disabled={isLoading || !theme}
                    className="w-full max-w-2xl bg-cyan-500 hover:bg-cyan-400 disabled:bg-slate-300 disabled:text-slate-500 text-white text-xl font-black py-5 px-8 rounded-2xl shadow-xl shadow-cyan-500/30 transition-all active:scale-95 flex items-center justify-center gap-3 uppercase tracking-wide"
                  >
                    {isLoading ? (
                      <>Vragen ophalen... <Loader2 className="animate-spin" size={24} /></>
                    ) : !theme ? (
                      <>Kies eerst een thema! <HelpCircle size={24} /></>
                    ) : (
                      <>Start de Quiz! <Play fill="currentColor" size={24} /></>
                    )}
                  </button>
                </div>
              </motion.div>
            )}

            {/* TAFELS SELECT SCREEN */}
            {screen === 'tafels-select' && (
              <motion.div 
                key="tafels-select"
                initial={{ opacity: 0, scale: 0.95 }}
                animate={{ opacity: 1, scale: 1 }}
                exit={{ opacity: 0, scale: 1.05 }}
                className={`flex flex-col gap-4 w-full max-w-lg mx-auto ${useUniversalNav ? 'pb-32' : ''}`}
              >
                <div className="bg-white p-6 rounded-3xl shadow-xl border-2 border-slate-100 text-center">
                  <h2 className="text-2xl font-black text-slate-800 uppercase tracking-tight mb-1">Tafelsommen 💡</h2>
                  <p className="text-slate-500 text-sm font-medium mb-6">Kies één of meer tafels om te oefenen!</p>
                  
                  <div className="grid grid-cols-4 gap-3 mb-6">
                    {[1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12].map(num => {
                      const isSelected = selectedTables.includes(num);
                      return (
                        <motion.button
                          key={num}
                          whileHover={{ scale: 1.1, rotate: [0, -5, 5, 0] }}
                          whileTap={{ scale: 0.9 }}
                          onClick={() => {
                            if (isSelected) {
                              setSelectedTables(prev => prev.filter(t => t !== num));
                            } else {
                              setSelectedTables(prev => [...prev, num]);
                            }
                          }}
                          className={`aspect-square rounded-2xl flex items-center justify-center text-xl font-black transition-all relative overflow-hidden ${
                            isSelected 
                              ? 'bg-amber-500 text-white shadow-lg shadow-amber-500/30 border-b-4 border-amber-700' 
                              : 'bg-slate-50 text-slate-400 border-2 border-slate-100 hover:border-amber-200 hover:text-amber-500'
                          }`}
                        >
                          <span className="relative z-10">{num}</span>
                          {isSelected && (
                            <motion.div 
                              animate={{ scale: [1, 1.5, 1], opacity: [0.2, 0.5, 0.2] }}
                              transition={{ duration: 2, repeat: Infinity }}
                              className="absolute inset-0 bg-white/30 blur-xl"
                            />
                          )}
                        </motion.button>
                      );
                    })}
                  </div>
                  
                  <div className="flex flex-col gap-3">
                    <button
                      onClick={() => {
                        const all = [1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12];
                        if (selectedTables.length === all.length) {
                          setSelectedTables([]);
                        } else {
                          setSelectedTables(all);
                        }
                      }}
                      className="w-full bg-slate-100 text-slate-600 py-3 rounded-2xl font-bold text-sm uppercase tracking-widest hover:bg-slate-200 transition-all active:scale-95 flex items-center justify-center gap-2"
                    >
                      <RefreshCw size={18} />
                      {selectedTables.length === 12 ? 'Deselecteer alles' : 'Selecteer alles'}
                    </button>

                    <button
                      onClick={() => startTafels(selectedTables)}
                      disabled={selectedTables.length === 0}
                      className={`w-full py-4 rounded-2xl font-black text-xl uppercase tracking-widest shadow-lg transition-all active:scale-95 flex items-center justify-center gap-3 ${
                        selectedTables.length > 0
                          ? 'bg-gradient-to-r from-amber-400 to-orange-500 text-white hover:shadow-amber-500/30'
                          : 'bg-slate-200 text-slate-400 cursor-not-allowed shadow-none'
                      }`}
                    >
                      <Play size={24} fill="currentColor" />
                      Start met {selectedTables.length} {selectedTables.length === 1 ? 'tafel' : 'tafels'}
                    </button>
                  </div>
                  
                  <button 
                    onClick={() => {
                      setScreen('setup');
                      setSelectedTables([]);
                    }}
                    className="mt-6 text-slate-400 font-black uppercase tracking-widest text-[10px] hover:text-slate-600 transition-all"
                  >
                    Terug naar instellingen
                  </button>
                </div>
              </motion.div>
            )}

            {/* TAFELS PLAY SCREEN */}
            {screen === 'tafels-play' && currentSum && (
              <motion.div 
                key="tafels-play"
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -20 }}
                className="flex flex-col gap-4 w-full max-w-sm mx-auto items-center"
              >
                <div className="w-full bg-white p-6 rounded-3xl shadow-xl border-2 border-amber-100 text-center relative overflow-hidden">
                  <div className="absolute top-0 left-0 w-full h-2 bg-gradient-to-r from-amber-400 to-orange-500" />
                  
                  <div className="mb-2">
                    <span className="bg-amber-100 text-amber-700 px-3 py-0.5 rounded-full font-black text-[10px] uppercase tracking-widest">
                      Tafel van {currentTable.length === 12 ? 'alles' : currentTable.join(', ')}
                    </span>
                  </div>
                  
                  <div className="flex items-center justify-center gap-4 text-4xl sm:text-5xl font-black text-slate-800 my-4">
                    <span>{currentSum.a}</span>
                    <span className="text-amber-500">×</span>
                    <span>{currentSum.b}</span>
                    <span className="text-slate-300">=</span>
                  </div>
                  
                  <div className={`text-3xl font-black p-4 rounded-2xl border-2 transition-all min-h-[70px] flex items-center justify-center ${
                    tafelFeedback === 'correct' ? 'bg-emerald-50 border-emerald-500 text-emerald-600' :
                    tafelFeedback === 'wrong' ? 'bg-rose-50 border-rose-500 text-rose-600' :
                    'bg-slate-50 border-slate-200 text-slate-800'
                  }`}>
                    {userAnswer || '?'}
                  </div>
                </div>
                
                {/* Numeric Keypad */}
                <div className="grid grid-cols-3 gap-2 w-full max-w-[280px]">
                  {[1, 2, 3, 4, 5, 6, 7, 8, 9, 'C', 0, 'OK'].map(val => (
                    <button
                      key={val}
                      onClick={() => {
                        if (val === 'C') setUserAnswer('');
                        else if (val === 'OK') checkTafelAnswer();
                        else if (userAnswer.length < 3) setUserAnswer(prev => prev + val);
                      }}
                      className={`p-4 rounded-xl font-black text-xl transition-all active:scale-90 shadow-sm ${
                        val === 'OK' ? 'bg-emerald-500 text-white hover:bg-emerald-400' :
                        val === 'C' ? 'bg-rose-100 text-rose-600 hover:bg-rose-200' :
                        'bg-white text-slate-700 hover:bg-slate-50 border border-slate-100'
                      }`}
                    >
                      {val}
                    </button>
                  ))}
                </div>
                
                <button 
                  onClick={() => setScreen('tafels-select')}
                  className="text-slate-400 font-black uppercase tracking-widest text-[10px] hover:text-slate-600 transition-all"
                >
                  Andere tafel kiezen
                </button>
              </motion.div>
            )}

            {/* QUIZ SCREEN */}
            {screen === 'quiz' && currentQ && (
              <motion.div 
                key={`quiz-${currentQ.id}`}
                initial={{ opacity: 0, scale: 0.95 }}
                animate={{ opacity: 1, scale: 1 }}
                exit={{ opacity: 0, scale: 1.05 }}
                className="flex flex-col gap-8 h-full justify-center my-auto"
              >
                <div className={`bg-white p-8 rounded-[2.5rem] shadow-lg shadow-slate-200/50 border-4 text-center relative overflow-hidden mt-2 ${
                  gamePlayers.length > 0 
                    ? (PLAYER_COLORS.find(c => c.id === gamePlayers[currentPlayerIndex]?.favoriteColor)?.border || 'border-cyan-100')
                    : 'border-cyan-100'
                }`}>
                  <div className={`absolute top-0 left-0 w-full h-2 bg-gradient-to-r ${
                    gamePlayers.length > 0
                      ? `${PLAYER_COLORS.find(c => c.id === gamePlayers[currentPlayerIndex]?.favoriteColor)?.bg || 'from-cyan-400'} to-indigo-500`
                      : 'from-cyan-400 to-indigo-500'
                  }`} />
                  
                  {currentQ.imageUrl && (
                    // Alleen verbergen als het antwoord in de URL staat EN het geen "Wat is dit?" vraag is
                    !(
                      currentQ.options?.some(opt => 
                        opt.isCorrect && currentQ.imageUrl?.toLowerCase().includes(opt.text.toLowerCase().replace(/\s/g, '_'))
                      ) && 
                      !currentQ.text.toLowerCase().includes('zie je') && 
                      !currentQ.text.toLowerCase().includes('is dit') &&
                      !currentQ.text.toLowerCase().includes('welk dier') &&
                      !currentQ.text.toLowerCase().includes('welke vogel') &&
                      !currentQ.text.toLowerCase().includes('welke plant')
                    )
                  ) && (
                    <div className="mt-2 mb-4 flex justify-center">
                      <div className="relative group">
                        <div className="absolute -inset-1 bg-gradient-to-r from-cyan-400 to-indigo-500 rounded-2xl blur opacity-25 group-hover:opacity-50 transition duration-1000 group-hover:duration-200"></div>
                        <img 
                          src={currentQ.imageUrl} 
                          alt="Vraag beeld" 
                          className="relative max-h-48 sm:max-h-64 object-contain rounded-2xl shadow-md border-2 border-white"
                          referrerPolicy="no-referrer"
                        />
                      </div>
                    </div>
                  )}

                  <h2 className="text-2xl sm:text-3xl font-black text-slate-800 leading-snug mt-2">
                    {currentQ.text}
                  </h2>
                </div>
                
                {currentQ.themeId === 'thee' ? (
                  <div className="flex flex-col items-center mt-4 gap-4">
                    <motion.button
                      whileHover={{ scale: 1.05 }}
                      whileTap={{ scale: 0.95 }}
                      onClick={triggerMegaConfetti}
                      className="bg-gradient-to-r from-yellow-400 to-orange-500 text-white font-black py-4 px-8 rounded-2xl shadow-lg shadow-orange-500/20 flex items-center justify-center gap-3 uppercase tracking-wide border-b-4 border-orange-700"
                    >
                      <PartyPopper size={24} className="animate-bounce" />
                      <span>Confetti Explosie!</span>
                      <Sparkles size={20} className="animate-pulse" />
                    </motion.button>

                    <motion.button
                      whileHover={{ scale: 1.05, x: 5 }}
                      whileTap={{ scale: 0.95 }}
                      onClick={handleTeaQuestionDone}
                      className="bg-amber-500 hover:bg-amber-400 text-white text-xl font-black py-5 px-10 rounded-2xl shadow-lg shadow-amber-500/30 transition-all flex items-center justify-center gap-3 uppercase tracking-wide border-b-4 border-amber-700"
                    >
                      Volgende <ArrowRight />
                    </motion.button>
                  </div>
                ) : (
                  <div className="grid gap-4 sm:grid-cols-2">
                    {currentOptions.map((opt, index) => {
                      const isSelected = selectedOption?.id === opt.id;
                      const showCorrect = selectedOption && opt.isCorrect;
                      const showWrong = isSelected && !opt.isCorrect;
                      
                      let btnClass = "bg-white border-2 border-slate-200 hover:border-cyan-400 text-slate-700";
                      if (showCorrect) btnClass = "bg-emerald-50 border-emerald-500 text-emerald-800 shadow-lg shadow-emerald-500/20";
                      if (showWrong) btnClass = "bg-rose-50 border-rose-500 text-rose-800 shadow-lg shadow-rose-500/20";

                      return (
                        <motion.button
                          key={opt.id}
                          whileHover={!selectedOption ? { scale: 1.02, y: -2 } : {}}
                          whileTap={!selectedOption ? { scale: 0.98 } : {}}
                          onClick={() => !selectedOption && handleAnswer(opt)}
                          disabled={!!selectedOption}
                          className={`p-6 rounded-[2rem] text-xl font-black transition-all flex items-center justify-between gap-4 relative overflow-hidden group ${btnClass}`}
                        >
                          <div className="flex items-center gap-4 relative z-10">
                            <div className={`w-10 h-10 rounded-xl flex items-center justify-center text-sm font-black border-2 ${
                              showCorrect ? 'bg-emerald-500 text-white border-emerald-400' :
                              showWrong ? 'bg-rose-500 text-white border-rose-400' :
                              'bg-slate-50 text-slate-400 border-slate-100 group-hover:bg-cyan-50 group-hover:text-cyan-500 group-hover:border-cyan-200'
                            }`}>
                              {String.fromCharCode(65 + index)}
                            </div>
                            <span className="text-left leading-tight">{opt.text}</span>
                          </div>
                          
                          <div className="relative z-10">
                            {showCorrect && <CheckCircle2 className="text-emerald-500 w-8 h-8" />}
                            {showWrong && <XCircle className="text-rose-500 w-8 h-8" />}
                          </div>

                          {/* Background Glow on Hover */}
                          {!selectedOption && (
                            <div className="absolute inset-0 bg-gradient-to-br from-cyan-50 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
                          )}
                        </motion.button>
                      );
                    })}
                  </div>
                )}
                

              </motion.div>
            )}

            {/* FEEDBACK SCREEN */}
            {screen === 'feedback' && currentQ && selectedOption && (
              <motion.div 
                key="feedback"
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                className="flex flex-col gap-6 bg-white p-8 rounded-[2.5rem] shadow-xl shadow-slate-200/50 border-4 border-slate-100 my-auto relative overflow-hidden"
              >
                <div className={`absolute top-0 left-0 w-full h-3 ${selectedOption.isCorrect ? 'bg-emerald-500' : 'bg-rose-500'}`} />
                
                <div className="flex items-center justify-between gap-4 mb-2 mt-2">
                  <div className="flex items-center gap-4">
                    {selectedOption.isCorrect ? (
                      <div className="bg-emerald-100 p-4 rounded-2xl text-emerald-600">
                        <CheckCircle2 size={40} />
                      </div>
                    ) : (
                      <div className="bg-rose-100 p-4 rounded-2xl text-rose-600">
                        <XCircle size={40} />
                      </div>
                    )}
                    <h2 className={`text-3xl font-black uppercase tracking-tight ${selectedOption.isCorrect ? 'text-emerald-600' : 'text-rose-600'}`}>
                      {selectedOption.isCorrect ? 'Goed gedaan!' : 'Oeps, bijna!'}
                    </h2>
                  </div>
                </div>

                <div className="space-y-4 text-lg text-slate-700 font-medium">
                  <div className="bg-slate-50 p-6 rounded-2xl border-2 border-slate-100">
                    {currentQ.imageUrl && (
                      <div className="flex justify-center mb-4 max-h-48 overflow-hidden rounded-xl">
                        <img 
                          src={currentQ.imageUrl} 
                          alt="Uitleg beeld" 
                          className="max-w-full h-auto object-contain rounded-lg shadow-sm"
                          referrerPolicy="no-referrer"
                        />
                      </div>
                    )}
                    <p>{currentQ.explanation}</p>
                  </div>

                  {currentQ.fact && (
                    <div className="flex gap-4 items-start bg-cyan-50 p-6 rounded-2xl border-2 border-cyan-100 text-cyan-900">
                      <Globe className="shrink-0 text-cyan-500 mt-1" />
                      <p><strong className="uppercase tracking-wide text-sm text-cyan-700 block mb-1">Weetje:</strong> {currentQ.fact}</p>
                    </div>
                  )}

                  {currentQ.task && (
                    <div className="flex gap-4 items-start bg-rose-50 p-6 rounded-2xl border-2 border-rose-100 text-rose-900">
                      <Globe className="shrink-0 text-rose-500 mt-1" />
                      <p><strong className="uppercase tracking-wide text-sm text-rose-700 block mb-1">Mini-opdracht:</strong> {currentQ.task}</p>
                    </div>
                  )}

                  {activeKletsenQuestion && (
                    <motion.div 
                      initial={{ opacity: 0, scale: 0.95 }}
                      animate={{ opacity: 1, scale: 1 }}
                      className="flex flex-col gap-4 bg-pink-50 p-6 rounded-3xl border-4 border-pink-100 text-pink-900 shadow-lg shadow-pink-200/30"
                    >
                      <div className="flex gap-4 items-start">
                        <div className="bg-pink-500 p-2 rounded-xl text-white shadow-md">
                          <MessageCircle size={24} />
                        </div>
                        <div className="space-y-1">
                          <strong className="uppercase tracking-widest text-xs text-pink-600 block font-black">Samen Kletsen 💬</strong>
                          <p className="text-xl font-black leading-tight">{activeKletsenQuestion.text}</p>
                        </div>
                      </div>
                      
                      <div className="bg-white/60 p-4 rounded-2xl border-2 border-pink-100/50">
                        <p className="text-pink-800 font-bold italic">"{activeKletsenQuestion.discussion}"</p>
                      </div>

                      <div className="flex justify-center mt-2">
                        <button
                          onClick={() => {
                            confetti({
                              particleCount: 100,
                              spread: 70,
                              origin: { y: 0.6 },
                              colors: ['#ec4899', '#f472b6', '#fb7185'],
                              zIndex: 9999
                            });
                          }}
                          className="bg-pink-500 text-white px-6 py-3 rounded-2xl font-black text-sm uppercase tracking-widest shadow-lg shadow-pink-500/30 hover:bg-pink-400 transition-all active:scale-90 flex items-center gap-3"
                        >
                          <Smile size={20} />
                          Gezellig!
                        </button>
                      </div>
                    </motion.div>
                  )}
                </div>

                {THEMES.find(t => t.id === theme)?.experimentId && (
                  <motion.button
                    initial={{ scale: 0.9, opacity: 0 }}
                    animate={{ scale: 1, opacity: 1 }}
                    whileHover={{ scale: 1.02 }}
                    whileTap={{ scale: 0.98 }}
                    onClick={handleShowExperiment}
                    className="mt-2 bg-gradient-to-r from-amber-400 to-orange-500 text-white font-black py-4 px-8 rounded-2xl shadow-lg shadow-orange-500/20 flex items-center justify-center gap-3 uppercase tracking-wide border-b-4 border-orange-700"
                  >
                    <FlaskConical size={24} />
                    <span>Bonus Ontdekking!</span>
                    <Sparkles size={20} className="animate-pulse" />
                  </motion.button>
                )}

                {selectedOption?.isCorrect && (
                  <motion.button
                    initial={{ scale: 0.9, opacity: 0 }}
                    animate={{ scale: 1, opacity: 1 }}
                    whileHover={{ scale: 1.05 }}
                    whileTap={{ scale: 0.95 }}
                    onClick={triggerMegaConfetti}
                    className="mt-4 bg-gradient-to-r from-yellow-400 to-orange-500 text-white font-black py-4 px-8 rounded-2xl shadow-lg shadow-orange-500/20 flex items-center justify-center gap-3 uppercase tracking-wide border-b-4 border-orange-700"
                  >
                    <PartyPopper size={24} className="animate-bounce" />
                    <span>Confetti Explosie!</span>
                    <Sparkles size={20} className="animate-pulse" />
                  </motion.button>
                )}

                <motion.button 
                  whileHover={{ scale: 1.05, x: 5 }}
                  whileTap={{ scale: 0.95 }}
                  onClick={nextQuestion}
                  className="mt-6 bg-cyan-500 hover:bg-cyan-400 text-white text-xl font-black py-5 px-8 rounded-2xl shadow-lg shadow-cyan-500/30 transition-all flex items-center justify-center gap-3 uppercase tracking-wide border-b-4 border-cyan-700"
                >
                  Volgende <ArrowRight />
                </motion.button>
              </motion.div>
            )}

          </AnimatePresence>

          {/* EXPERIMENT MODAL */}
          <AnimatePresence>
            {showExperimentModal && activeExperiment && (
              <div className="fixed inset-0 z-[100] flex items-center justify-center p-4">
                <motion.div
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  exit={{ opacity: 0 }}
                  onClick={() => setShowExperimentModal(false)}
                  className="absolute inset-0 bg-slate-900/80 backdrop-blur-sm"
                />
                <motion.div
                  initial={{ scale: 0.9, opacity: 0, y: 20 }}
                  animate={{ scale: 1, opacity: 1, y: 0 }}
                  exit={{ scale: 0.9, opacity: 0, y: 20 }}
                  className="relative w-full max-w-lg bg-white rounded-[2.5rem] shadow-2xl overflow-hidden flex flex-col max-h-[90vh]"
                >
                  {/* Header */}
                  <div className="bg-gradient-to-r from-amber-400 to-orange-500 p-6 text-white flex items-center justify-between shrink-0">
                    <div className="flex items-center gap-4">
                      <div className="bg-white/20 p-3 rounded-2xl backdrop-blur-md">
                        {getIcon(activeExperiment.iconName, "w-8 h-8 text-white")}
                      </div>
                      <div>
                        <h3 className="text-2xl font-black uppercase tracking-tight leading-none">Bonus Ontdekking!</h3>
                        <p className="text-amber-100 text-sm font-bold mt-1">Samen experimenteren</p>
                      </div>
                    </div>
                    <button 
                      onClick={() => setShowExperimentModal(false)}
                      className="bg-white/20 hover:bg-white/30 p-2 rounded-full transition-colors"
                    >
                      <XCircle size={24} />
                    </button>
                  </div>

                  {/* Content */}
                  <div className="p-8 overflow-y-auto custom-scrollbar space-y-8">
                    <div className="space-y-2">
                      <h4 className="text-2xl font-black text-slate-800">{activeExperiment.title}</h4>
                      <p className="text-slate-600 font-medium leading-relaxed">{activeExperiment.description}</p>
                    </div>

                    {/* Materials */}
                    <div className="bg-amber-50 p-6 rounded-3xl border-2 border-amber-100 space-y-3">
                      <h5 className="font-black text-amber-800 uppercase tracking-widest text-xs flex items-center gap-2">
                        <Plus size={14} /> Wat heb je nodig?
                      </h5>
                      <ul className="grid grid-cols-1 gap-2">
                        {activeExperiment.materials.map((m, i) => (
                          <li key={i} className="flex items-center gap-3 text-amber-900 font-bold">
                            <div className="w-2 h-2 rounded-full bg-amber-400 shrink-0" />
                            {m}
                          </li>
                        ))}
                      </ul>
                    </div>

                    {/* Steps */}
                    <div className="space-y-4">
                      <h5 className="font-black text-slate-400 uppercase tracking-widest text-xs flex items-center gap-2">
                        <ArrowRight size={14} /> Zo doe je het:
                      </h5>
                      <div className="space-y-4">
                        {activeExperiment.steps.map((step, i) => (
                          <div key={i} className="flex gap-4 items-start">
                            <div className="w-8 h-8 rounded-xl bg-slate-100 flex items-center justify-center font-black text-slate-500 shrink-0 border-2 border-slate-200">
                              {i + 1}
                            </div>
                            <p className="text-slate-700 font-medium pt-1">{step}</p>
                          </div>
                        ))}
                      </div>
                    </div>

                    <div className="bg-emerald-50 p-6 rounded-3xl border-2 border-emerald-100 text-emerald-800 flex gap-4 items-start">
                      <Ghost className="shrink-0 text-emerald-500 mt-1" />
                      <p className="text-sm font-bold italic">Vraag altijd even hulp aan een volwassene als je iets gaat proberen!</p>
                    </div>
                  </div>

                  {/* Footer */}
                  <div className="p-6 bg-slate-50 border-t border-slate-100 shrink-0">
                    <button
                      onClick={() => setShowExperimentModal(false)}
                      className="w-full bg-slate-800 hover:bg-slate-700 text-white font-black py-4 rounded-2xl transition-all active:scale-95 uppercase tracking-widest text-sm"
                    >
                      Cool, gaan we doen!
                    </button>
                  </div>
                </motion.div>
              </div>
            )}
          </AnimatePresence>

          {/* PROGRESS MODAL */}
          <AnimatePresence>
            {showProgressModal && (
              <div className="fixed inset-0 z-[100] flex items-center justify-center p-4">
                <motion.div
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  exit={{ opacity: 0 }}
                  onClick={() => setShowProgressModal(false)}
                  className="absolute inset-0 bg-slate-900/80 backdrop-blur-sm"
                />
                <motion.div
                  initial={{ scale: 0.9, opacity: 0, y: 20 }}
                  animate={{ scale: 1, opacity: 1, y: 0 }}
                  exit={{ scale: 0.9, opacity: 0, y: 20 }}
                  className="relative w-full max-w-lg bg-white rounded-[2.5rem] shadow-2xl overflow-hidden flex flex-col max-h-[90vh]"
                >
                  {/* Header */}
                  <div className="bg-gradient-to-r from-yellow-400 to-amber-500 p-6 text-white flex items-center justify-between shrink-0">
                    <div className="flex items-center gap-4">
                      <div className="bg-white/20 p-3 rounded-2xl backdrop-blur-md">
                        <Globe className="w-8 h-8 text-white" fill="currentColor" />
                      </div>
                      <div>
                        <h3 className="text-2xl font-black uppercase tracking-tight leading-none">Voortgang</h3>
                        <p className="text-amber-100 text-sm font-bold mt-1">Hoe ver zijn jullie?</p>
                      </div>
                    </div>
                    <button 
                      onClick={() => setShowProgressModal(false)}
                      className="bg-white/20 hover:bg-white/30 p-2 rounded-full transition-colors"
                    >
                      <XCircle size={24} />
                    </button>
                  </div>

                  {/* Content */}
                  <div className="p-6 overflow-y-auto custom-scrollbar space-y-6">
                    {gamePlayers.length > 0 ? (
                      gamePlayers.map((p) => {
                        const currentLevel = Math.floor((p.score || 0) / 10) + 1;
                        const currentScore = p.score || 0;
                        const progress = (currentScore % 10) / 10 * 100;
                        
                        return (
                          <div key={p.id} className="bg-slate-50 p-5 rounded-3xl border-2 border-slate-100">
                            <div className="flex items-center justify-between mb-4">
                              <div className="flex items-center gap-3">
                                <div className={`w-10 h-10 rounded-2xl bg-${p.favoriteColor || 'indigo'}-100 text-${p.favoriteColor || 'indigo'}-600 flex items-center justify-center`}>
                                  {getIcon(p.iconName || 'cat', "w-6 h-6")}
                                </div>
                                <span className="font-black text-slate-700 text-lg">{p.name}</span>
                              </div>
                              <div className="text-right">
                                <div className="font-black text-indigo-600 text-lg">Level {currentLevel}</div>
                                <div className="text-xs font-bold text-slate-400 uppercase">{currentScore} Goed</div>
                              </div>
                            </div>
                            
                            {/* Score Bar */}
                            <div className="h-4 bg-slate-200 rounded-full overflow-hidden relative">
                              <motion.div 
                                initial={{ width: 0 }}
                                animate={{ width: `${progress}%` }}
                                className="absolute top-0 left-0 h-full bg-gradient-to-r from-indigo-500 to-purple-500 rounded-full"
                              />
                            </div>
                          </div>
                        );
                      })
                    ) : (
                      <div className="text-center py-8">
                        <p className="text-slate-500 font-medium">Je speelt zonder profiel. Maak spelers aan om je score bij te houden!</p>
                      </div>
                    )}
                  </div>

                  {/* Footer */}
                  <div className="p-6 bg-slate-50 border-t border-slate-100 shrink-0">
                    <button
                      onClick={() => setShowProgressModal(false)}
                      className="w-full bg-slate-800 hover:bg-slate-700 text-white font-black py-4 rounded-2xl transition-all active:scale-95 uppercase tracking-widest text-sm"
                    >
                      Verder Spelen
                    </button>
                  </div>
                </motion.div>
              </div>
            )}
            {/* COLLECTION SCREEN */}
            {screen === 'collection' && selectedPlayerId && (
              <CollectionScreen 
                player={players.find(p => p.id === selectedPlayerId)!}
                onBack={() => setScreen('players')}
                useUniversalNav={useUniversalNav}
              />
            )}
            {/* JOKE MODAL */}
            {jokes.length > 0 && (
              <div className="fixed inset-0 z-[100] flex items-center justify-center p-4 bg-slate-900/80 backdrop-blur-sm">
                <motion.div 
                  initial={{ scale: 0.8, opacity: 0, y: 20 }}
                  animate={{ scale: 1, opacity: 1, y: 0 }}
                  className="bg-white rounded-[2.5rem] p-6 sm:p-8 max-w-md w-full text-center shadow-2xl border-4 border-yellow-400 relative overflow-hidden flex flex-col max-h-[90vh]"
                >
                  <div className="absolute top-0 left-0 w-full h-32 bg-gradient-to-b from-yellow-100 to-transparent opacity-50 pointer-events-none" />
                  <div className="text-5xl sm:text-6xl mb-4 relative z-10 animate-bounce">😂</div>
                  <h2 className="text-xl sm:text-2xl font-black text-slate-800 uppercase tracking-tight mb-2 relative z-10">
                    {screen === 'gameroom' ? 'Moppenboek!' : '5 Vragen Goed!'}
                  </h2>
                  <p className="text-slate-500 font-medium mb-4 relative z-10">
                    {jokes.length === 1 ? 'Hier is een leuke mop:' : `Hier zijn ${jokes.length} leuke moppen:`}
                  </p>
                  
                  <div className="flex-1 overflow-y-auto space-y-4 pr-2 mb-6 relative z-10 custom-scrollbar">
                    {jokes.map((j, idx) => (
                      <div key={idx} className="bg-slate-50 rounded-2xl p-4 border-2 border-slate-100 text-left">
                        <p className="text-lg text-slate-800 font-bold leading-relaxed">{j.setup}</p>
                        {shownPunchlines.includes(idx) ? (
                          <motion.p 
                            initial={{ opacity: 0, y: 10 }}
                            animate={{ opacity: 1, y: 0 }}
                            className="text-xl text-indigo-600 font-black leading-relaxed mt-3 pt-3 border-t border-slate-200"
                          >
                            {j.punchline}
                          </motion.p>
                        ) : (
                          <button 
                            onClick={() => togglePunchline(idx)}
                            className="mt-3 text-sm font-black text-indigo-500 uppercase tracking-widest hover:text-indigo-600 transition-colors flex items-center gap-1"
                          >
                            Klik voor de clou! ✨
                          </button>
                        )}
                      </div>
                    ))}
                  </div>

                  <div className="flex flex-col gap-3 w-full relative z-10">
                    <button 
                      disabled={isFetchingJokes}
                      onClick={() => {
                        const age = gamePlayers.length > 0 ? (gamePlayers[currentPlayerIndex]?.age || 8) : 8;
                        fetchJokes(age);
                      }}
                      className={`w-full font-black py-4 rounded-2xl transition-all active:scale-95 uppercase tracking-wide shadow-xl flex items-center justify-center gap-2 ${
                        isFetchingJokes 
                          ? 'bg-slate-200 text-slate-400 cursor-not-allowed shadow-none' 
                          : 'bg-indigo-500 hover:bg-indigo-600 text-white shadow-indigo-500/20'
                      }`}
                    >
                      {isFetchingJokes ? (
                        <>
                          <Loader2 size={20} className="animate-spin" />
                          <span>Nieuwe moppen zoeken...</span>
                        </>
                      ) : (
                        'Nieuwe moppen!'
                      )}
                    </button>
                    <button 
                      onClick={() => {
                        setJokes([]);
                        setShownPunchlines([]);
                      }}
                      className="w-full bg-slate-200 hover:bg-slate-300 text-slate-700 font-bold py-3 rounded-2xl transition-all active:scale-95 uppercase tracking-wide"
                    >
                      {screen === 'gameroom' ? 'Terug naar menu' : 'Door naar de quiz!'}
                    </button>
                  </div>
                </motion.div>
              </div>
            )}
          </AnimatePresence>

          {/* UNIVERSAL NAVIGATION BAR */}
          {useUniversalNav && screen !== 'play' && screen !== 'tafels-play' && !(screen === 'gameroom' && activeMiniGame) && (
            <div className="fixed bottom-0 left-0 right-0 z-[60] p-4 pointer-events-none">
              <motion.div 
                initial={{ y: 100 }}
                animate={{ y: 0 }}
                className="max-w-md mx-auto bg-white/90 backdrop-blur-xl rounded-[2rem] shadow-2xl border-2 border-slate-100 p-2 flex items-center justify-around pointer-events-auto"
              >
                <button 
                  onClick={() => setScreen('start')}
                  className={`flex flex-col items-center gap-1 p-3 rounded-2xl transition-all ${screen === 'start' ? 'bg-indigo-100 text-indigo-600' : 'text-slate-400 hover:bg-slate-50'}`}
                >
                  <Home size={24} />
                  <span className="text-[10px] font-black uppercase tracking-widest">Home</span>
                </button>
                
                <button 
                  onClick={() => setScreen('players')}
                  className={`flex flex-col items-center gap-1 p-3 rounded-2xl transition-all ${screen === 'players' ? 'bg-purple-100 text-purple-600' : 'text-slate-400 hover:bg-slate-50'}`}
                >
                  <Users size={24} />
                  <span className="text-[10px] font-black uppercase tracking-widest">Spelers</span>
                </button>

                <button 
                  onClick={() => {
                    if (players.length > 0) {
                      setSelectedPlayerId(players[0].id);
                      setScreen('collection');
                    } else {
                      setScreen('players');
                    }
                  }}
                  className={`flex flex-col items-center gap-1 p-3 rounded-2xl transition-all ${screen === 'collection' ? 'bg-amber-100 text-amber-600' : 'text-slate-400 hover:bg-slate-50'}`}
                >
                  <Palette size={24} />
                  <span className="text-[10px] font-black uppercase tracking-widest">Wereld</span>
                </button>

                <button 
                  onClick={() => setShowProgressModal(true)}
                  className={`flex flex-col items-center gap-1 p-3 rounded-2xl transition-all text-slate-400 hover:bg-slate-50`}
                >
                  <Trophy size={24} />
                  <span className="text-[10px] font-black uppercase tracking-widest">Score</span>
                </button>
              </motion.div>
            </div>
          )}
        </main>
      </div>
    </div>
  );
}
