import React, { useState, useEffect, useCallback, useRef } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import confetti from 'canvas-confetti';
import { 
  Zap, Brain, Target, MousePointer2, Timer, 
  RotateCcw, Play, X, CheckCircle2, AlertCircle,
  Gamepad2, Star, Trophy, Heart, Smile, LayoutGrid
} from 'lucide-react';

// --- SHARED UI COMPONENTS ---

const GameOverlay: React.FC<{ 
  title: string; 
  description: string; 
  icon: React.ReactNode; 
  onStart: () => void; 
  onClose: () => void;
}> = ({ title, description, icon, onStart, onClose }) => (
  <div className="absolute inset-0 z-50 bg-slate-900/90 backdrop-blur-md flex items-center justify-center p-6 text-center rounded-[2.5rem] overflow-hidden">
    <div className="absolute top-4 right-4">
      <button onClick={onClose} className="p-2 text-slate-400 hover:text-white transition-colors">
        <X size={24} />
      </button>
    </div>
    <motion.div 
      initial={{ scale: 0.9, opacity: 0 }}
      animate={{ scale: 1, opacity: 1 }}
      className="max-w-xs"
    >
      <div className="w-20 h-20 bg-white/10 rounded-3xl flex items-center justify-center mx-auto mb-6 text-white">
        {icon}
      </div>
      <h2 className="text-3xl font-black text-white uppercase tracking-tight mb-2">{title}</h2>
      <p className="text-slate-400 font-medium mb-8">{description}</p>
      <button 
        onClick={onStart}
        className="w-full bg-indigo-500 hover:bg-indigo-400 text-white font-black py-4 rounded-2xl shadow-lg shadow-indigo-500/20 transition-all active:scale-95 flex items-center justify-center gap-2"
      >
        <Play size={20} fill="currentColor" /> START SPEL
      </button>
    </motion.div>
  </div>
);

const GameResults: React.FC<{ 
  score: number; 
  highScore: number; 
  onRestart: () => void; 
  onClose: () => void;
  message?: string;
  leaderboard?: { name: string; score: number }[];
  isTimeBased?: boolean;
  scoreLabel?: string;
  highScoreLabel?: string;
  customScoreDisplay?: string;
  customHighScoreDisplay?: string;
  nextPlayerName?: string;
  rank?: number | null;
}> = ({ 
  score, 
  highScore, 
  onRestart, 
  onClose, 
  message, 
  leaderboard,
  isTimeBased = false,
  scoreLabel = "Jouw Score",
  highScoreLabel = "Beste Score",
  customScoreDisplay,
  customHighScoreDisplay,
  nextPlayerName,
  rank
}) => (
  <motion.div 
    initial={{ y: 20, opacity: 0 }}
    animate={{ y: 0, opacity: 1 }}
    className="w-full bg-white rounded-[2.5rem] p-8 shadow-xl border-8 border-slate-100 text-center"
  >
    <div className="text-4xl mb-4">{rank ? '🎉' : '🏆'}</div>
    <h2 className="text-2xl font-black text-slate-800 uppercase tracking-tight mb-1">
      {rank ? `Gefeliciteerd!` : `Goed Gedaan!`}
    </h2>
    {rank && (
      <p className="text-emerald-500 font-black mb-4 text-lg animate-bounce">
        De {rank}e {isTimeBased ? 'tijd' : 'score'}!
      </p>
    )}
    {message && <p className="text-indigo-500 font-bold mb-4 text-sm">{message}</p>}
    
    <div className="grid grid-cols-2 gap-4 mb-6">
      <div className="bg-slate-50 rounded-2xl p-4 border border-slate-100">
        <p className="text-slate-400 text-[10px] font-black uppercase tracking-widest mb-1">{scoreLabel}</p>
        <p className="text-3xl font-black text-slate-800">
          {customScoreDisplay || (isTimeBased ? `${(score / 1000).toFixed(3)}s` : score)}
        </p>
      </div>
      <div className="bg-slate-50 rounded-2xl p-4 border border-slate-100">
        <p className="text-slate-400 text-[10px] font-black uppercase tracking-widest mb-1">{highScoreLabel}</p>
        <p className="text-3xl font-black text-indigo-500">
          {customHighScoreDisplay || (isTimeBased ? `${(highScore / 1000).toFixed(3)}s` : highScore)}
        </p>
      </div>
    </div>

    {leaderboard && leaderboard.length > 0 && (
      <div className="mb-6 text-left">
        <h3 className="text-[10px] font-black text-slate-400 uppercase tracking-widest mb-3 flex items-center gap-2 px-2">
          <Trophy size={12} /> Top 5 Spelers
        </h3>
        <div className="space-y-2">
          {leaderboard.map((entry, i) => (
            <div key={i} className="flex items-center justify-between bg-slate-50 p-3 rounded-xl border border-slate-100">
              <div className="flex items-center gap-3">
                <span className="text-indigo-500 font-black text-xs w-4">{i + 1}.</span>
                <span className="text-slate-700 font-bold text-sm truncate max-w-[120px]">{entry.name}</span>
              </div>
              <span className="text-indigo-600 font-black text-sm">
                {isTimeBased ? `${(entry.score / 1000).toFixed(3)}s` : entry.score}
              </span>
            </div>
          ))}
        </div>
      </div>
    )}

    <div className="flex gap-3">
      <button 
        onClick={onRestart}
        className="flex-1 bg-indigo-500 hover:bg-indigo-400 text-white font-black py-4 rounded-2xl shadow-lg shadow-indigo-500/20 transition-all active:scale-95 flex items-center justify-center gap-2"
      >
        <RotateCcw size={18} /> OPNIEUW
      </button>
      <button 
        onClick={onClose}
        className={`flex-1 ${nextPlayerName ? 'bg-rose-500 text-white shadow-lg shadow-rose-500/20' : 'bg-slate-100 text-slate-600'} hover:opacity-90 font-black py-4 rounded-2xl transition-all active:scale-95`}
      >
        {nextPlayerName ? `NU IS ${nextPlayerName.toUpperCase()}!` : 'STOPPEN'}
      </button>
    </div>
  </motion.div>
);

// --- 1. SIMON SAYS (KLEURTJES RADEN) ---

const SIMON_COLORS = [
  { id: 0, color: 'bg-rose-500', active: 'bg-rose-300', shadow: 'shadow-rose-500/50' },
  { id: 1, color: 'bg-sky-500', active: 'bg-sky-300', shadow: 'shadow-sky-500/50' },
  { id: 2, color: 'bg-emerald-500', active: 'bg-emerald-300', shadow: 'shadow-emerald-500/50' },
  { id: 3, color: 'bg-amber-400', active: 'bg-amber-200', shadow: 'shadow-amber-400/50' },
  { id: 4, color: 'bg-fuchsia-500', active: 'bg-fuchsia-300', shadow: 'shadow-fuchsia-500/50' },
  { id: 5, color: 'bg-orange-500', active: 'bg-orange-300', shadow: 'shadow-orange-500/50' },
];

export const SimonSays: React.FC<{ 
  onClose: () => void;
  playerName: string;
  nextPlayerName?: string;
  onSaveScore: (score: number) => number | null;
  leaderboard: { name: string; score: number }[];
}> = ({ onClose, playerName, nextPlayerName, onSaveScore, leaderboard }) => {
  const [sequence, setSequence] = useState<number[]>([]);
  const [userSequence, setUserSequence] = useState<number[]>([]);
  const [gameState, setGameState] = useState<'idle' | 'getReady' | 'showing' | 'playing' | 'gameOver'>('idle');
  const [activeButton, setActiveButton] = useState<number | null>(null);
  const [score, setScore] = useState(0);
  const [rank, setRank] = useState<number | null>(null);
  const highScore = leaderboard.length > 0 ? leaderboard[0].score : 0;

  const startSequence = () => {
    setScore(0);
    const firstColor = Math.floor(Math.random() * 6);
    setSequence([firstColor]);
    setGameState('showing');
  };

  const showSequence = useCallback(async (seq: number[]) => {
    setGameState('showing');
    await new Promise(r => setTimeout(r, 800));
    for (const colorId of seq) {
      setActiveButton(colorId);
      await new Promise(r => setTimeout(r, 500)); // Exactly 0.5s as requested
      setActiveButton(null);
      await new Promise(r => setTimeout(r, 250)); // Gap between colors for clarity
    }
    setGameState('playing');
    setUserSequence([]);
  }, []);

  useEffect(() => {
    if (gameState === 'showing' && sequence.length > 0) {
      showSequence(sequence);
    }
  }, [gameState, sequence, showSequence]);

  const handleButtonClick = (id: number) => {
    if (gameState !== 'playing') return;

    setActiveButton(id);
    setTimeout(() => setActiveButton(null), 300);

    const newUserSeq = [...userSequence, id];
    
    // Check if the current click is correct
    if (id !== sequence[userSequence.length]) {
      setGameState('gameOver');
      // Wrap in setTimeout to avoid "Cannot update a component while rendering a different component"
      setTimeout(() => {
        const achievedRank = onSaveScore(score);
        setRank(achievedRank);
      }, 0);
      return;
    }

    setUserSequence(newUserSeq);

    // If the user completed the full sequence
    if (newUserSeq.length === sequence.length) {
      setScore(s => s + 1);
      setTimeout(() => {
        // Add a new random color to the sequence
        setSequence(prev => [...prev, Math.floor(Math.random() * 6)]);
        setGameState('showing');
      }, 1000);
    }
  };

  const startGame = () => {
    setGameState('getReady');
  };

  return (
    <div className="flex flex-col gap-6 w-full max-w-md mx-auto">
      <div className="relative w-full aspect-square bg-white rounded-[3rem] p-8 shadow-2xl border-8 border-slate-100 flex flex-col items-center justify-center overflow-hidden">
        <button 
          onClick={onClose}
          className="absolute top-4 right-4 p-2 text-slate-400 hover:text-slate-600 transition-colors z-20"
        >
          <X size={20} />
        </button>
        <div className="absolute top-6 left-8 right-8 flex justify-between items-center">
          <div className="flex flex-col">
            <span className="text-[10px] font-black text-slate-400 uppercase tracking-widest">Score</span>
            <span className="text-2xl font-black text-slate-800">{score}</span>
          </div>
          <div className="flex flex-col items-center">
            <span className="text-[10px] font-black text-indigo-500 uppercase tracking-[0.2em] mb-1">Nu is</span>
            <span className="text-lg font-black text-slate-800 bg-indigo-50 px-4 py-1.5 rounded-2xl border-2 border-indigo-100 shadow-sm">
              {playerName}
            </span>
          </div>
          <div className="flex flex-col items-end">
            <span className="text-[10px] font-black text-slate-400 uppercase tracking-widest">Best</span>
            <span className="text-2xl font-black text-indigo-500">{highScore}</span>
          </div>
        </div>

        <AnimatePresence mode="wait">
          {gameState === 'idle' && (
            <motion.div key="idle" initial={{ scale: 0.8, opacity: 0 }} animate={{ scale: 1, opacity: 1 }} className="text-center">
              <Brain size={64} className="mx-auto mb-4 text-indigo-500" />
              <h2 className="text-3xl font-black text-slate-800 uppercase tracking-tight mb-2">Klaar?</h2>
              <p className="text-slate-500 font-bold mb-6">Onthoud de volgorde!</p>
              <button 
                onClick={() => setGameState('getReady')}
                className="bg-indigo-500 text-white font-black py-3 px-8 rounded-xl shadow-lg"
              >
                START
              </button>
            </motion.div>
          )}

          {gameState === 'getReady' && (
            <motion.div key="getReady" initial={{ scale: 0.8, opacity: 0 }} animate={{ scale: 1, opacity: 1 }} className="text-center">
              <Brain size={64} className="mx-auto mb-4 text-indigo-500 animate-bounce" />
              <h2 className="text-3xl font-black text-slate-800 uppercase tracking-tight mb-2">Klaar?</h2>
              <p className="text-slate-500 font-bold mb-6">Tik om te beginnen!</p>
              <button 
                onClick={startSequence}
                className="bg-indigo-500 text-white font-black py-3 px-8 rounded-xl shadow-lg"
              >
                START NU
              </button>
            </motion.div>
          )}

          {(gameState === 'showing' || gameState === 'playing') && (
            <div className="relative w-full aspect-square mt-8 flex items-center justify-center">
              {SIMON_COLORS.map((c, index) => {
                // Calculate position for hexagon (6 points)
                const angle = (index * 60 - 90) * (Math.PI / 180);
                const radius = 35; // percentage
                const x = 50 + radius * Math.cos(angle);
                const y = 50 + radius * Math.sin(angle);

                return (
                  <div
                    key={c.id}
                    style={{
                      position: 'absolute',
                      left: `${x}%`,
                      top: `${y}%`,
                      transform: 'translate(-50%, -50%)',
                      width: '28%',
                      height: '28%',
                    }}
                    className="flex items-center justify-center"
                  >
                    <motion.button
                      animate={{ scale: activeButton === c.id ? 1.1 : 1 }}
                      whileTap={{ scale: 0.95 }}
                      onClick={() => handleButtonClick(c.id)}
                      className={`w-full h-full rounded-2xl transition-all duration-200 shadow-xl ${
                        activeButton === c.id ? `${c.active} brightness-110 ${c.shadow} z-10` : `${c.color} opacity-80`
                      } ${gameState === 'playing' ? 'cursor-pointer' : 'cursor-default'}`}
                    />
                  </div>
                );
              })}
              {/* Center indicator */}
              <div className="w-12 h-12 rounded-full bg-slate-50 border-4 border-slate-100 flex items-center justify-center z-0">
                <div className={`w-3 h-3 rounded-full ${gameState === 'playing' ? 'bg-emerald-500 animate-pulse' : 'bg-slate-300'}`} />
              </div>
            </div>
          )}
        </AnimatePresence>
      </div>

      {gameState === 'gameOver' && (
        <GameResults 
          score={score} 
          highScore={highScore} 
          onRestart={startGame} 
          onClose={onClose}
          leaderboard={leaderboard}
          nextPlayerName={nextPlayerName}
          rank={rank}
        />
      )}
    </div>
  );
};

// --- 2. REACTION TIMER (REACTIESPEL) ---

export const ReactionTimer: React.FC<{ 
  onClose: () => void;
  playerName: string;
  nextPlayerName?: string;
  onSaveScore: (score: number) => number | null;
  leaderboard: { name: string; score: number }[];
}> = ({ onClose, playerName, nextPlayerName, onSaveScore, leaderboard }) => {
  const [gameState, setGameState] = useState<'idle' | 'getReady' | 'waiting' | 'ready' | 'result' | 'tooEarly'>('idle');
  const [startTime, setStartTime] = useState(0);
  const [reactionTime, setReactionTime] = useState(0);
  const [rank, setRank] = useState<number | null>(null);
  const bestTime = leaderboard.length > 0 ? leaderboard[0].score : 0;
  const timerRef = useRef<NodeJS.Timeout | null>(null);

  const startWaiting = () => {
    setGameState('waiting');
    const delay = Math.floor(Math.random() * 3000) + 2000; // 2-5 seconds
    timerRef.current = setTimeout(() => {
      setGameState('ready');
      setStartTime(Date.now());
    }, delay);
  };

  const handleTap = () => {
    if (gameState === 'idle') {
      setGameState('getReady');
    } else if (gameState === 'getReady') {
      startWaiting();
    } else if (gameState === 'waiting') {
      if (timerRef.current) clearTimeout(timerRef.current);
      setGameState('tooEarly');
    } else if (gameState === 'ready') {
      const time = Date.now() - startTime;
      setReactionTime(time);
      setGameState('result');
      
      // Wrap in setTimeout to avoid "Cannot update a component while rendering a different component"
      setTimeout(() => {
        const achievedRank = onSaveScore(time);
        setRank(achievedRank);
        
        if (achievedRank && achievedRank <= 3) {
          confetti({
            particleCount: 150,
            spread: 70,
            origin: { y: 0.6 },
            colors: ['#10b981', '#34d399', '#6ee7b7']
          });
        }
      }, 0);
    }
  };

  const handleRestart = () => {
    setGameState('idle');
  };

  useEffect(() => {
    // We removed the automatic start to let the user click "START" explicitly
  }, []);

  return (
    <div className="flex flex-col gap-6 w-full max-w-md mx-auto">
      <div 
        onPointerDown={(e) => {
          // Prevent default to avoid double-firing with onClick on some devices
          // but be careful with buttons inside
          if (gameState !== 'idle' && gameState !== 'tooEarly' && gameState !== 'result') {
            e.preventDefault();
            handleTap();
          }
        }}
        className={`relative w-full aspect-square rounded-[3rem] p-8 shadow-2xl flex flex-col items-center justify-center overflow-hidden transition-colors duration-300 cursor-pointer ${
          gameState === 'waiting' ? 'bg-rose-500' : 
          gameState === 'ready' ? 'bg-emerald-500' : 
          gameState === 'tooEarly' ? 'bg-amber-500' : 'bg-white'
        }`}
      >
        <button 
          onClick={(e) => { e.stopPropagation(); onClose(); }}
          className={`absolute top-4 right-4 p-2 transition-colors z-20 ${gameState === 'idle' || gameState === 'result' ? 'text-slate-400 hover:text-slate-600' : 'text-white/50 hover:text-white'}`}
        >
          <X size={20} />
        </button>

        <div className={`absolute top-6 left-0 right-0 flex justify-center z-10 transition-colors ${gameState === 'waiting' || gameState === 'ready' || gameState === 'tooEarly' ? 'text-white/80' : 'text-slate-400'}`}>
          <div className="flex flex-col items-center">
            <span className="text-[10px] font-black uppercase tracking-[0.2em] mb-1">Nu is</span>
            <span className={`text-lg font-black px-4 py-1.5 rounded-2xl border-2 shadow-sm ${gameState === 'waiting' || gameState === 'ready' || gameState === 'tooEarly' ? 'bg-white/10 border-white/20 text-white' : 'bg-slate-50 border-slate-100 text-slate-800'}`}>
              {playerName}
            </span>
          </div>
        </div>
        <AnimatePresence mode="wait">
          {gameState === 'idle' && (
            <motion.div key="idle" initial={{ scale: 0.8, opacity: 0 }} animate={{ scale: 1, opacity: 1 }} className="text-center">
              <Zap size={64} className="mx-auto mb-4 text-indigo-500" />
              <h2 className="text-3xl font-black text-slate-800 uppercase tracking-tight mb-2">Klaar?</h2>
              <p className="text-slate-500 font-bold mb-6">Tik om te beginnen</p>
              <button 
                onClick={(e) => { e.stopPropagation(); handleTap(); }}
                className="bg-indigo-500 text-white font-black py-3 px-8 rounded-xl shadow-lg"
              >
                START
              </button>
            </motion.div>
          )}

          {gameState === 'getReady' && (
            <motion.div key="getReady" initial={{ scale: 0.8, opacity: 0 }} animate={{ scale: 1, opacity: 1 }} className="text-center">
              <MousePointer2 size={64} className="mx-auto mb-4 text-indigo-500 animate-bounce" />
              <h2 className="text-3xl font-black text-slate-800 uppercase tracking-tight mb-2">Tik nu!</h2>
              <p className="text-slate-500 font-bold mb-6">Tik ergens op het scherm om te beginnen</p>
            </motion.div>
          )}

          {gameState === 'waiting' && (
            <motion.div key="waiting" initial={{ scale: 0.8, opacity: 0 }} animate={{ scale: 1, opacity: 1 }} className="text-center text-white">
              <h2 className="text-5xl font-black uppercase tracking-tighter">Wacht...</h2>
            </motion.div>
          )}

          {gameState === 'ready' && (
            <motion.div key="ready" initial={{ scale: 1.2, opacity: 0 }} animate={{ scale: 1, opacity: 1 }} className="text-center text-white">
              <h2 className="text-7xl font-black uppercase tracking-tighter">NU!</h2>
            </motion.div>
          )}

          {gameState === 'tooEarly' && (
            <motion.div key="tooEarly" className="text-center text-white">
              <AlertCircle size={64} className="mx-auto mb-4" />
              <h2 className="text-3xl font-black uppercase tracking-tight mb-2">Te Vroeg!</h2>
              <p className="font-bold mb-6">Wacht op het groene scherm.</p>
              <button onClick={(e) => { e.stopPropagation(); startWaiting(); }} className="bg-white text-amber-600 font-black py-3 px-8 rounded-xl">Probeer Weer</button>
            </motion.div>
          )}

          {gameState === 'result' && (
            <motion.div key="result" className="text-center">
              <CheckCircle2 size={64} className="mx-auto mb-4 text-emerald-500" />
              <h2 className="text-5xl font-black text-slate-800 tracking-tighter mb-2">{(reactionTime / 1000).toFixed(3)}s</h2>
              <p className="text-slate-500 font-bold uppercase tracking-widest text-xs mb-8">Jouw Reactietijd</p>
            </motion.div>
          )}
        </AnimatePresence>
      </div>

      {gameState === 'result' && (
        <GameResults 
          score={reactionTime} 
          highScore={bestTime} 
          onRestart={handleRestart} 
          onClose={onClose}
          leaderboard={leaderboard}
          isTimeBased={true}
          nextPlayerName={nextPlayerName}
          rank={rank}
        />
      )}
    </div>
  );
};

// --- 3. FAST TAPPER (SNEL TIKKEN) ---

export const FastTapper: React.FC<{ 
  onClose: () => void;
  playerName: string;
  nextPlayerName?: string;
  onSaveScore: (score: number) => number | null;
  leaderboard: { name: string; score: number }[];
}> = ({ onClose, playerName, nextPlayerName, onSaveScore, leaderboard }) => {
  const [score, setScore] = useState(0);
  const [timeLeft, setTimeLeft] = useState(10);
  const [gameState, setGameState] = useState<'idle' | 'getReady' | 'playing' | 'gameOver'>('idle');
  const [rank, setRank] = useState<number | null>(null);
  const highScore = leaderboard.length > 0 ? leaderboard[0].score : 0;
  const scoreRef = useRef(0);

  const startPlaying = () => {
    setScore(0);
    scoreRef.current = 0;
    setTimeLeft(10);
    setGameState('playing');
    setRank(null);
  };

  useEffect(() => {
    let timer: NodeJS.Timeout;
    if (gameState === 'playing' && timeLeft > 0) {
      timer = setInterval(() => {
        setTimeLeft(t => t - 1);
      }, 1000);
    } else if (timeLeft === 0 && gameState === 'playing') {
      setGameState('gameOver');
      // Wrap in setTimeout to avoid "Cannot update a component while rendering a different component"
      setTimeout(() => {
        const achievedRank = onSaveScore(scoreRef.current);
        setRank(achievedRank);
      }, 0);
    }
    return () => clearInterval(timer);
  }, [gameState, timeLeft, onSaveScore]);

  const handleTap = () => {
    if (gameState === 'idle') {
      setGameState('getReady');
    } else if (gameState === 'getReady') {
      startPlaying();
    } else if (gameState === 'playing') {
      const newScore = score + 1;
      setScore(newScore);
      scoreRef.current = newScore;
    }
  };

  const handleRestart = () => {
    setScore(0);
    scoreRef.current = 0;
    setTimeLeft(10);
    setGameState('idle');
  };

  useEffect(() => {
    // We removed the automatic start to let the user click "START" explicitly
  }, []);

  return (
    <div className="flex flex-col gap-6 w-full max-w-md mx-auto">
      <div className="relative w-full aspect-square bg-white rounded-[3rem] p-8 shadow-2xl border-8 border-slate-100 flex flex-col items-center justify-center overflow-hidden">
        <button 
          onClick={onClose}
          className="absolute top-4 right-4 p-2 text-slate-400 hover:text-slate-600 transition-colors z-20"
        >
          <X size={20} />
        </button>
        <div className="absolute top-6 left-8 right-8 flex justify-between items-center">
          <div className="flex flex-col">
            <span className="text-[10px] font-black text-slate-400 uppercase tracking-widest">Tikken</span>
            <span className="text-2xl font-black text-slate-800">{score}</span>
          </div>
          <div className="flex flex-col items-center">
            <span className="text-[10px] font-black text-indigo-500 uppercase tracking-[0.2em] mb-1">Nu is</span>
            <span className="text-lg font-black text-slate-800 bg-indigo-50 px-4 py-1.5 rounded-2xl border-2 border-indigo-100 shadow-sm">
              {playerName}
            </span>
          </div>
          <div className="flex flex-col items-end">
            <span className="text-[10px] font-black text-slate-400 uppercase tracking-widest">Tijd</span>
            <span className="text-2xl font-black text-rose-500">{timeLeft}s</span>
          </div>
        </div>

        <AnimatePresence mode="wait">
          {gameState === 'idle' && (
            <motion.div key="idle" initial={{ scale: 0.8, opacity: 0 }} animate={{ scale: 1, opacity: 1 }} className="text-center">
              <Zap size={64} className="mx-auto mb-4 text-indigo-500" />
              <h2 className="text-3xl font-black text-slate-800 uppercase tracking-tight mb-2">Klaar?</h2>
              <p className="text-slate-500 font-bold mb-6">Tik om te beginnen</p>
              <button 
                onClick={(e) => { e.stopPropagation(); handleTap(); }}
                className="bg-indigo-500 text-white font-black py-3 px-8 rounded-xl shadow-lg"
              >
                START
              </button>
            </motion.div>
          )}

          {gameState === 'getReady' && (
            <motion.div key="getReady" initial={{ scale: 0.8, opacity: 0 }} animate={{ scale: 1, opacity: 1 }} className="text-center">
              <MousePointer2 size={64} className="mx-auto mb-4 text-indigo-500 animate-bounce" />
              <h2 className="text-3xl font-black text-slate-800 uppercase tracking-tight mb-2">Klaar?</h2>
              <p className="text-slate-500 font-bold mb-6">Tik om te beginnen!</p>
              <button 
                onClick={(e) => { e.stopPropagation(); handleTap(); }}
                className="bg-indigo-500 text-white font-black py-3 px-8 rounded-xl shadow-lg"
              >
                START NU
              </button>
            </motion.div>
          )}

          {gameState === 'playing' && (
            <motion.div key="playing" initial={{ scale: 0.9, opacity: 0 }} animate={{ scale: 1, opacity: 1 }} className="flex flex-col items-center">
              <motion.button
                whileTap={{ scale: 0.9 }}
                onClick={handleTap}
                className="w-48 h-48 bg-indigo-500 rounded-full shadow-2xl shadow-indigo-500/40 flex items-center justify-center text-white border-8 border-white/20"
              >
                <MousePointer2 size={64} fill="currentColor" />
              </motion.button>
              <p className="mt-8 font-black text-slate-400 uppercase tracking-widest">Tik zo snel mogelijk!</p>
            </motion.div>
          )}
        </AnimatePresence>
      </div>

      {gameState === 'gameOver' && (
        <GameResults 
          score={score} 
          highScore={highScore} 
          onRestart={handleRestart} 
          onClose={onClose}
          message={`Dat zijn ${Math.round(score/10)} tikken per seconde!`}
          leaderboard={leaderboard}
          nextPlayerName={nextPlayerName}
          rank={rank}
        />
      )}
    </div>
  );
};

// --- 6. FOUR SECOND TIMER (4 SECONDEN STOPPEN) ---

export const FourSecondTimer: React.FC<{ 
  onClose: () => void;
  playerName: string;
  nextPlayerName?: string;
  onSaveScore: (score: number) => number | null;
  leaderboard: { name: string; score: number }[];
}> = ({ onClose, playerName, nextPlayerName, onSaveScore, leaderboard }) => {
  const [gameState, setGameState] = useState<'running' | 'stopped'>('running');
  const [startTime, setStartTime] = useState(Date.now());
  const [elapsed, setElapsed] = useState(0);
  const [rank, setRank] = useState<number | null>(null);
  const bestDiff = leaderboard.length > 0 ? leaderboard[0].score : null;

  const startTimer = () => {
    setGameState('running');
    setStartTime(Date.now());
    setElapsed(0);
  };

  const stopTimer = () => {
    const finalTime = Date.now() - startTime;
    setElapsed(finalTime);
    setGameState('stopped');
    const diff = Math.abs(4000 - finalTime);
    const achievedRank = onSaveScore(diff);
    setRank(achievedRank);

    if (achievedRank && achievedRank <= 3) {
      confetti({
        particleCount: 150,
        spread: 70,
        origin: { y: 0.6 },
        colors: ['#6366f1', '#8b5cf6', '#d946ef']
      });
    }
  };

  const handleRestart = () => {
    startTimer();
  };

  useEffect(() => {
    if (gameState === 'running') {
      const interval = setInterval(() => {
        setElapsed(Date.now() - startTime);
      }, 10);
      return () => clearInterval(interval);
    }
  }, [gameState, startTime]);

  useEffect(() => {
    // Removed automatic start
  }, []);

  const diff = Math.abs(4000 - elapsed);
  
  // Progress for the ring (0 to 1 over 4 seconds)
  // We'll let it loop or just stay full after 4s? 
  // Let's make it loop every 4 seconds for visual feedback
  const progress = (elapsed % 4000) / 4000;
  const circumference = 2 * Math.PI * 90;
  const strokeDashoffset = circumference - (progress * circumference);

  return (
    <div className="flex flex-col gap-6 w-full max-w-md mx-auto">
      <div className="relative w-full aspect-square bg-white rounded-[3rem] p-8 shadow-2xl border-8 border-slate-100 flex flex-col items-center justify-center overflow-hidden">
        <button 
          onClick={onClose}
          className="absolute top-4 right-4 p-2 text-slate-400 hover:text-slate-600 transition-colors z-20"
        >
          <X size={20} />
        </button>

        {/* Stats Header */}
        <div className="absolute top-6 left-10 right-10 flex justify-between items-start z-10">
          <div className="flex flex-col">
            <span className="text-[10px] font-black text-slate-400 uppercase tracking-[0.2em] mb-1">Doel</span>
            <div className="flex items-baseline gap-1">
              <span className="text-2xl font-black text-slate-800">4.000</span>
              <span className="text-xs font-bold text-slate-400">s</span>
            </div>
          </div>
          <div className="flex flex-col items-center">
            <span className="text-[10px] font-black text-indigo-500 uppercase tracking-[0.2em] mb-1">Nu is</span>
            <span className="text-lg font-black text-slate-800 bg-indigo-50 px-4 py-1.5 rounded-2xl border-2 border-indigo-100 shadow-sm">
              {playerName}
            </span>
          </div>
          {bestDiff !== null && (
            <div className="flex flex-col items-end">
              <span className="text-[10px] font-black text-slate-400 uppercase tracking-[0.2em] mb-1">Beste Afwijking</span>
              <div className="flex items-baseline gap-1">
                <span className="text-2xl font-black text-indigo-500">{(bestDiff / 1000).toFixed(3)}</span>
                <span className="text-xs font-bold text-indigo-300">s</span>
              </div>
            </div>
          )}
        </div>

        <AnimatePresence mode="wait">
          {(gameState === 'running' || gameState === 'stopped') && (
            <motion.div 
              key="active" 
              initial={{ opacity: 0 }} 
              animate={{ opacity: 1 }} 
              className="absolute inset-0 flex flex-col items-center justify-center gap-4"
            >
              {/* Timer Display with Ring */}
              <div className="relative flex items-center justify-center w-52 h-52">
                {/* Background Ring */}
                <svg className="absolute w-full h-full -rotate-90 transform" viewBox="0 0 200 200">
                  <circle
                    cx="100"
                    cy="100"
                    r="90"
                    fill="none"
                    stroke="currentColor"
                    strokeWidth="12"
                    className="text-slate-50"
                  />
                  {/* Progress Ring */}
                  <motion.circle
                    cx="100"
                    cy="100"
                    r="90"
                    fill="none"
                    stroke="currentColor"
                    strokeWidth="12"
                    strokeLinecap="round"
                    style={{
                      strokeDasharray: circumference,
                      strokeDashoffset: strokeDashoffset,
                    }}
                    className="text-indigo-500"
                  />
                </svg>

                {/* Timer Text */}
                <div className="text-center z-10">
                  <div className="text-5xl font-black text-slate-800 tabular-nums">
                    {(elapsed / 1000).toFixed(3)}
                    <span className="text-2xl ml-1 text-slate-400">s</span>
                  </div>
                  
                  {gameState === 'running' && elapsed > 4000 && (
                    <motion.div 
                      initial={{ opacity: 0 }}
                      animate={{ opacity: 1 }}
                      className="text-[10px] font-black text-rose-500 uppercase tracking-widest mt-2"
                    >
                      Over de tijd!
                    </motion.div>
                  )}
                </div>
              </div>

              {/* Stop Button */}
              <div className="z-10">
                {gameState === 'running' && (
                  <motion.button 
                    whileHover={{ scale: 1.1 }}
                    whileTap={{ scale: 0.9 }}
                    onClick={stopTimer}
                    className="relative group"
                  >
                    <div className="absolute -inset-4 bg-rose-500/30 rounded-full blur-xl group-hover:bg-rose-500/40 transition-all animate-pulse" />
                    <div className="relative w-28 h-28 bg-gradient-to-br from-rose-400 to-rose-600 rounded-full shadow-2xl shadow-rose-500/50 flex flex-col items-center justify-center text-white border-8 border-white/30 transition-all group-hover:border-white/50">
                      <span className="text-2xl font-black uppercase tracking-tighter drop-shadow-md">STOP!</span>
                      <div className="w-6 h-1 bg-white/30 rounded-full mt-1 group-hover:w-10 transition-all" />
                    </div>
                  </motion.button>
                )}
              </div>
            </motion.div>
          )}
        </AnimatePresence>
      </div>

      {gameState === 'stopped' && (
        <GameResults 
          score={diff}
          highScore={bestDiff || 0}
          leaderboard={leaderboard}
          onRestart={handleRestart}
          onClose={onClose}
          isTimeBased={true}
          scoreLabel="Jouw Afwijking"
          highScoreLabel="Beste Afwijking"
          customScoreDisplay={`${(diff / 1000).toFixed(3)}s`}
          customHighScoreDisplay={bestDiff !== null ? `${(bestDiff / 1000).toFixed(3)}s` : '-'}
          message={diff < 50 ? "BIJNA PERFECT! 🏆" : diff < 200 ? "Heel goed gedaan! ✨" : "Blijf oefenen! 💪"}
          nextPlayerName={nextPlayerName}
          rank={rank}
        />
      )}
    </div>
  );
};

// --- 7. DOTS AND BOXES (KAMERTJE VERHUREN) ---

export const DotsAndBoxes: React.FC<{ 
  onClose: () => void; 
  playerName: string;
  nextPlayerName?: string;
  onSaveScore: (score: number, pName?: string) => void; 
  leaderboard: { name: string; score: number }[]; 
}> = ({ onClose, playerName, nextPlayerName, onSaveScore, leaderboard }) => {
  const [isPvP, setIsPvP] = useState(!!nextPlayerName);
  const [p1Name, setP1Name] = useState(playerName);
  const [p2Name, setP2Name] = useState(nextPlayerName || "Robot");

  const GRID_SIZE = 6; // 6x6 dots = 5x5 boxes
  const SPACING = 240 / (GRID_SIZE - 1);
  const BOX_SIZE = SPACING - 16;
  const LINE_THICKNESS = 6;
  const DOT_SIZE = 12;

  const [horizontalLines, setHorizontalLines] = useState<boolean[][]>(
    Array(GRID_SIZE).fill(null).map(() => Array(GRID_SIZE - 1).fill(false))
  );
  const [verticalLines, setVerticalLines] = useState<boolean[][]>(
    Array(GRID_SIZE - 1).fill(null).map(() => Array(GRID_SIZE).fill(false))
  );
  const [boxes, setBoxes] = useState<(number | null)[][]>(
    Array(GRID_SIZE - 1).fill(null).map(() => Array(GRID_SIZE - 1).fill(null))
  );
  const [currentPlayer, setCurrentPlayer] = useState(0); // 0 = Player, 1 = AI
  const [scores, setScores] = useState([0, 0]);
  const [gameState, setGameState] = useState<'idle' | 'playing' | 'gameOver'>('idle');
  const highScore = leaderboard.length > 0 ? leaderboard[0].score : 0;

  const startGame = () => {
    setHorizontalLines(Array(GRID_SIZE).fill(null).map(() => Array(GRID_SIZE - 1).fill(false)));
    setVerticalLines(Array(GRID_SIZE - 1).fill(null).map(() => Array(GRID_SIZE).fill(false)));
    setBoxes(Array(GRID_SIZE - 1).fill(null).map(() => Array(GRID_SIZE - 1).fill(null)));
    setScores([0, 0]);
    setCurrentPlayer(0);
    setGameState('playing');
  };

  useEffect(() => {
    if (gameState === 'gameOver') {
      onSaveScore(scores[0], p1Name);
      if (isPvP) {
        onSaveScore(scores[1], p2Name);
      }
    }
  }, [gameState]);

  const checkNewBoxes = (hLines: boolean[][], vLines: boolean[][], player: number) => {
    let newBoxesFound = false;
    const newBoxes = [...boxes.map(row => [...row])];
    const newScores = [...scores];

    for (let r = 0; r < GRID_SIZE - 1; r++) {
      for (let c = 0; c < GRID_SIZE - 1; c++) {
        if (newBoxes[r][c] === null) {
          if (hLines[r][c] && hLines[r + 1][c] && vLines[r][c] && vLines[r][c + 1]) {
            newBoxes[r][c] = player;
            newScores[player]++;
            newBoxesFound = true;
          }
        }
      }
    }

    return { newBoxes, newScores, newBoxesFound };
  };

  const handleLineClick = (type: 'h' | 'v', r: number, c: number) => {
    if (gameState !== 'playing') return;
    if (!isPvP && currentPlayer !== 0) return;
    if (type === 'h' && horizontalLines[r][c]) return;
    if (type === 'v' && verticalLines[r][c]) return;

    const nextHLines = [...horizontalLines.map(row => [...row])];
    const nextVLines = [...verticalLines.map(row => [...row])];

    if (type === 'h') nextHLines[r][c] = true;
    else nextVLines[r][c] = true;

    const { newBoxes, newScores, newBoxesFound } = checkNewBoxes(nextHLines, nextVLines, currentPlayer);
    
    setHorizontalLines(nextHLines);
    setVerticalLines(nextVLines);
    setBoxes(newBoxes);
    setScores(newScores);

    if (!newBoxesFound) {
      setCurrentPlayer(currentPlayer === 0 ? 1 : 0);
    } else if (newScores[0] + newScores[1] === (GRID_SIZE - 1) * (GRID_SIZE - 1)) {
      setGameState('gameOver');
    }
  };

  // Simple AI
  useEffect(() => {
    if (!isPvP && gameState === 'playing' && currentPlayer === 1) {
      const timer = setTimeout(() => {
        const availableLines: { type: 'h' | 'v', r: number, c: number }[] = [];
        for (let r = 0; r < GRID_SIZE; r++) {
          for (let c = 0; c < GRID_SIZE - 1; c++) {
            if (!horizontalLines[r][c]) availableLines.push({ type: 'h', r, c });
          }
        }
        for (let r = 0; r < GRID_SIZE - 1; r++) {
          for (let c = 0; c < GRID_SIZE; c++) {
            if (!verticalLines[r][c]) availableLines.push({ type: 'v', r, c });
          }
        }

        if (availableLines.length > 0) {
          // Try to complete a box if possible
          let chosenLine = availableLines[Math.floor(Math.random() * availableLines.length)];
          
          // Simple AI logic: if a box has 3 lines, complete it
          for (let r = 0; r < GRID_SIZE - 1; r++) {
            for (let c = 0; c < GRID_SIZE - 1; c++) {
              const lines = [
                { type: 'h', r, c, active: horizontalLines[r][c] },
                { type: 'h', r: r + 1, c, active: horizontalLines[r + 1][c] },
                { type: 'v', r, c, active: verticalLines[r][c] },
                { type: 'v', r, c: c + 1, active: verticalLines[r][c + 1] }
              ];
              const activeCount = lines.filter(l => l.active).length;
              if (activeCount === 3) {
                const missing = lines.find(l => !l.active)!;
                chosenLine = { type: missing.type as 'h' | 'v', r: missing.r, c: missing.c };
                break;
              }
            }
          }

          const nextHLines = [...horizontalLines.map(row => [...row])];
          const nextVLines = [...verticalLines.map(row => [...row])];

          if (chosenLine.type === 'h') nextHLines[chosenLine.r][chosenLine.c] = true;
          else nextVLines[chosenLine.r][chosenLine.c] = true;

          const { newBoxes, newScores, newBoxesFound } = checkNewBoxes(nextHLines, nextVLines, 1);
          
          setHorizontalLines(nextHLines);
          setVerticalLines(nextVLines);
          setBoxes(newBoxes);
          setScores(newScores);

          if (!newBoxesFound) {
            setCurrentPlayer(0);
          } else if (newScores[0] + newScores[1] === (GRID_SIZE - 1) * (GRID_SIZE - 1)) {
            setGameState('gameOver');
          }
        }
      }, 600);
      return () => clearTimeout(timer);
    }
  }, [currentPlayer, gameState, horizontalLines, verticalLines, boxes, scores]);

  useEffect(() => {
    if (gameState === 'idle') {
      startGame();
    }
  }, []);

  return (
    <div className="flex flex-col gap-6 w-full max-w-md mx-auto">
      <div className="relative w-full aspect-square bg-white rounded-[3rem] p-8 shadow-2xl border-8 border-slate-100 flex flex-col items-center justify-center overflow-hidden">
        <button 
          onClick={onClose}
          className="absolute top-4 right-4 p-2 text-slate-400 hover:text-slate-600 transition-colors z-20"
        >
          <X size={20} />
        </button>
        <div className="absolute top-6 left-8 right-8 flex justify-between items-center">
          <div className="flex flex-col">
            <span className="text-[10px] font-black text-slate-400 uppercase tracking-widest">{p1Name}</span>
            <span className="text-2xl font-black text-indigo-500">{scores[0]}</span>
          </div>
          <div className="text-center">
            <div className={`px-3 py-1 rounded-full text-[10px] font-black uppercase tracking-widest ${currentPlayer === 0 ? 'bg-indigo-100 text-indigo-600' : 'bg-rose-100 text-rose-600'}`}>
              {currentPlayer === 0 ? `${p1Name} Beurt` : `${p2Name} Beurt`}
            </div>
          </div>
          <div className="flex flex-col items-end">
            <span className="text-[10px] font-black text-slate-400 uppercase tracking-widest">{p2Name}</span>
            <span className="text-2xl font-black text-rose-500">{scores[1]}</span>
          </div>
        </div>

        <div className="relative mt-8" style={{ width: '240px', height: '240px' }}>
          {/* Boxes */}
          {boxes.map((row, r) => row.map((owner, c) => (
            <AnimatePresence key={`box-${r}-${c}`}>
              {owner !== null && (
                <motion.div 
                  initial={{ scale: 0, opacity: 0 }} animate={{ scale: 1, opacity: 1 }}
                  className={`absolute rounded-lg flex items-center justify-center text-white font-black text-lg ${owner === 0 ? 'bg-indigo-500/20 text-indigo-500' : 'bg-rose-500/20 text-rose-500'}`}
                  style={{
                    top: r * SPACING + 8,
                    left: c * SPACING + 8,
                    width: BOX_SIZE,
                    height: BOX_SIZE
                  }}
                >
                  {owner === 0 ? p1Name[0] : p2Name[0]}
                </motion.div>
              )}
            </AnimatePresence>
          )))}

          {/* Horizontal Lines */}
          {horizontalLines.map((row, r) => row.map((active, c) => (
            <button
              key={`h-${r}-${c}`}
              onClick={() => handleLineClick('h', r, c)}
              className={`absolute rounded-full transition-all ${active ? (currentPlayer === 0 && !horizontalLines[r][c] ? 'bg-indigo-500' : 'bg-slate-800') : 'bg-slate-100 hover:bg-slate-200'}`}
              style={{
                top: r * SPACING - (LINE_THICKNESS / 2),
                left: c * SPACING + 8,
                width: BOX_SIZE,
                height: LINE_THICKNESS,
                cursor: active ? 'default' : 'pointer'
              }}
            />
          )))}

          {/* Vertical Lines */}
          {verticalLines.map((row, r) => row.map((active, c) => (
            <button
              key={`v-${r}-${c}`}
              onClick={() => handleLineClick('v', r, c)}
              className={`absolute rounded-full transition-all ${active ? (currentPlayer === 0 && !verticalLines[r][c] ? 'bg-indigo-500' : 'bg-slate-800') : 'bg-slate-100 hover:bg-slate-200'}`}
              style={{
                top: r * SPACING + 8,
                left: c * SPACING - (LINE_THICKNESS / 2),
                width: LINE_THICKNESS,
                height: BOX_SIZE,
                cursor: active ? 'default' : 'pointer'
              }}
            />
          )))}

          {/* Dots */}
          {[...Array(GRID_SIZE)].map((_, r) => [...Array(GRID_SIZE)].map((_, c) => (
            <div 
              key={`dot-${r}-${c}`}
              className="absolute bg-slate-300 rounded-full"
              style={{
                top: r * SPACING - (DOT_SIZE / 2),
                left: c * SPACING - (DOT_SIZE / 2),
                width: DOT_SIZE,
                height: DOT_SIZE
              }}
            />
          )))}
        </div>
      </div>

      {gameState === 'gameOver' && (
        <GameResults 
          score={isPvP ? (scores[0] > scores[1] ? scores[0] : scores[1]) : scores[0]} 
          highScore={highScore} 
          onRestart={startGame} 
          onClose={onClose}
          message={scores[0] > scores[1] ? `${p1Name} heeft gewonnen!` : scores[0] < scores[1] ? `${p2Name} heeft gewonnen!` : 'Gelijkspel!'}
          leaderboard={leaderboard}
        />
      )}
    </div>
  );
};
