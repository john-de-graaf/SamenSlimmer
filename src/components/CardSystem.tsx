import React from 'react';
import { motion } from 'motion/react';
import { 
  ArrowLeft, Trophy, Star, BookOpen, User, HelpCircle,
  Bird, Apple, Ghost, Cpu, Pizza, Activity as ActivityIcon, Waves, Trees, RefreshCw,
  Crown, Shield, Sparkles, Puzzle, Camera,
  Flame, Calculator, Snowflake, Wand2, Moon, Sun, Rocket, Globe,
  Tv, Play, Gamepad2, Music, Castle, Car, Briefcase, Recycle, Smile, Skull, Bike, Map, Film, FlaskConical, Lightbulb, Coffee, Tent, Book,
  Rabbit, Telescope, Stethoscope, Flower, Ruler, Popcorn, Video, Gamepad, Headphones, Hourglass, Pen, Bus, Dices, IceCream, Shuffle, Compass, Wrench, Leaf, Paintbrush, Laugh, Battery, Bone, Medal, Umbrella, Library, Mountain, Clapperboard, Microscope, Info, Wand, Gem, Sigma, CupSoda, Ticket
} from 'lucide-react';
import { Player } from '../types';

const getIcon = (name: string, className: string) => {
  const icons: Record<string, any> = {
    Bird, Apple, Ghost, Cpu, Pizza, Activity: ActivityIcon, Waves, Trees, RefreshCw, User,
    Star, Trophy, Crown, Shield, Sparkles, BookOpen, HelpCircle, Puzzle, Camera,
    Flame, Calculator, Snowflake, Wand2, Moon, Sun, Rocket, Globe,
    Tv, Play, Gamepad2, Music, Castle, Car, Briefcase, Recycle, Smile, Skull, Bike, Map, Film, FlaskConical, Lightbulb, Coffee, Tent, Book,
    Rabbit, Telescope, Stethoscope, Flower, Ruler, Popcorn, Video, Gamepad, Headphones, Hourglass, Pen, Bus, Dices, IceCream, Shuffle, Compass, Wrench, Leaf, Paintbrush, Laugh, Battery, Bone, Medal, Umbrella, Library, Mountain, Clapperboard, Microscope, Info, Wand, Gem, Sigma, CupSoda, Ticket
  };
  const Icon = icons[name] || HelpCircle;
  return <Icon className={className} />;
};

const PLAYER_COLORS = [
  { id: 'red', bg: 'bg-rose-400' },
  { id: 'blue', bg: 'bg-sky-400' },
  { id: 'yellow', bg: 'bg-amber-300' },
  { id: 'green', bg: 'bg-emerald-400' },
  { id: 'orange', bg: 'bg-orange-400' },
  { id: 'pink', bg: 'bg-pink-400' },
  { id: 'purple', bg: 'bg-purple-400' },
  { id: 'cyan', bg: 'bg-cyan-400' },
  { id: 'lime', bg: 'bg-lime-400' },
  { id: 'indigo', bg: 'bg-indigo-400' },
];

export const AvatarIcon: React.FC<{ player?: Player, size?: 'xs' | 'sm' | 'md' | 'lg' | 'xl', className?: string }> = ({ player, size = 'md', className = "" }) => {
  if (!player) return null;
  const color = PLAYER_COLORS.find(c => c.id === player.favoriteColor) || PLAYER_COLORS[0];
  
  const sizeClasses = {
    xs: 'w-8 h-8',
    sm: 'w-10 h-10',
    md: 'w-14 h-14',
    lg: 'w-20 h-20',
    xl: 'w-32 h-32'
  };

  const iconSizes = {
    xs: 'w-4 h-4',
    sm: 'w-5 h-5',
    md: 'w-7 h-7',
    lg: 'w-10 h-10',
    xl: 'w-16 h-16'
  };

  return (
    <div className={`${sizeClasses[size]} rounded-2xl ${color.bg} flex items-center justify-center shadow-lg border-2 border-white/50 ${className}`}>
      {getIcon(player.iconName || 'User', `${iconSizes[size]} text-white drop-shadow-sm`)}
    </div>
  );
};

export const CollectionScreen: React.FC<{ 
  player: Player, 
  onBack: () => void, 
  useUniversalNav?: boolean;
}> = ({ player, onBack, useUniversalNav }) => {
  return (
    <motion.div 
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      className={`flex flex-col gap-6 w-full max-w-2xl mx-auto p-4 sm:p-8 ${useUniversalNav ? 'pb-32' : ''}`}
    >
      {/* Header */}
      <div className="flex items-center gap-4 bg-white p-6 sm:p-8 rounded-[2.5rem] shadow-xl border-2 border-slate-100">
        <button onClick={onBack} className="p-3 bg-slate-50 hover:bg-slate-100 rounded-2xl transition-all active:scale-90">
          <ArrowLeft size={24} className="text-slate-600" />
        </button>
        <div className="flex-1 flex items-center gap-4">
          <AvatarIcon player={player} size="lg" />
          <div>
            <h2 className="text-2xl font-black text-slate-800 uppercase tracking-tight leading-none">
              {player.name}
            </h2>
            <p className="text-slate-500 font-bold uppercase tracking-widest text-[10px] mt-1">
              {player.age} jaar
            </p>
          </div>
        </div>
      </div>

      {/* Stats */}
      <div className="bg-white p-8 rounded-[2.5rem] shadow-xl border-2 border-slate-100 flex flex-col items-center justify-center text-center">
        <div className="w-24 h-24 bg-indigo-100 text-indigo-600 rounded-full flex items-center justify-center mb-6 shadow-inner">
          <Trophy size={48} />
        </div>
        <h3 className="text-xl font-black text-slate-400 uppercase tracking-widest mb-2">Aantal Goede Vragen</h3>
        <p className="text-6xl font-black text-slate-800 tracking-tighter">
          {player.score}
        </p>
        
        <div className="grid grid-cols-2 gap-4 w-full mt-8 pt-8 border-t-2 border-slate-100">
          <div className="flex flex-col items-center">
            <span className="text-xs font-black text-slate-400 uppercase tracking-widest mb-1">Reeks</span>
            <div className="flex items-center gap-2 text-amber-500">
              <Star size={20} />
              <span className="text-2xl font-black">{player.consecutiveCorrect || 0}</span>
            </div>
          </div>
          <div className="flex flex-col items-center">
            <span className="text-xs font-black text-slate-400 uppercase tracking-widest mb-1">Totaal Beantwoord</span>
            <div className="flex items-center gap-2 text-blue-500">
              <BookOpen size={20} />
              <span className="text-2xl font-black">{player.totalAnswered || 0}</span>
            </div>
          </div>
        </div>
      </div>

      {/* Parent Dashboard - Statistics */}
      <div className="bg-white p-6 sm:p-8 rounded-[2.5rem] shadow-xl border-2 border-slate-100">
        <div className="flex items-center gap-3 mb-6">
          <div className="bg-indigo-100 p-2 rounded-xl text-indigo-600">
            <ActivityIcon size={20} />
          </div>
          <h3 className="text-xl font-black text-slate-800 uppercase tracking-tight">Ouder Dashboard</h3>
        </div>

        <div className="space-y-8">
          {/* Theme Performance */}
          <div>
            <h4 className="text-xs font-black text-slate-400 uppercase tracking-widest mb-4 flex items-center gap-2">
              <Star size={14} /> Prestaties per thema
            </h4>
            <div className="grid grid-cols-1 gap-3">
              {player.themeStats && Object.entries(player.themeStats).length > 0 ? (
                (Object.entries(player.themeStats) as [string, { correct: number; total: number }][]).map(([themeId, stats]) => {
                  const percentage = Math.round((stats.correct / stats.total) * 100);
                  return (
                    <div key={themeId} className="bg-slate-50 p-3 rounded-2xl border border-slate-100">
                      <div className="flex justify-between items-center mb-2">
                        <span className="font-bold text-slate-700 capitalize">{themeId}</span>
                        <span className="font-black text-indigo-600">{percentage}%</span>
                      </div>
                      <div className="w-full h-2 bg-slate-200 rounded-full overflow-hidden">
                        <motion.div 
                          initial={{ width: 0 }}
                          animate={{ width: `${percentage}%` }}
                          className="h-full bg-indigo-500"
                        />
                      </div>
                      <p className="text-[10px] text-slate-400 mt-1 font-bold uppercase">
                        {stats.correct} van de {stats.total} vragen goed
                      </p>
                    </div>
                  );
                })
              ) : (
                <p className="text-sm text-slate-400 italic">Nog geen thema-gegevens beschikbaar.</p>
              )}
            </div>
          </div>

          {/* Table Performance */}
          {player.tableStats && Object.entries(player.tableStats).length > 0 && (
            <div>
              <h4 className="text-xs font-black text-slate-400 uppercase tracking-widest mb-4 flex items-center gap-2">
                <Calculator size={14} /> Tafels Beheersing
              </h4>
              <div className="grid grid-cols-4 sm:grid-cols-6 gap-2">
                {(Object.entries(player.tableStats) as [string, { correct: number; total: number }][]).map(([table, stats]) => {
                  const percentage = Math.round((stats.correct / stats.total) * 100);
                  const isMastered = percentage >= 90 && stats.total >= 5;
                  return (
                    <div 
                      key={table} 
                      className={`p-2 rounded-xl border-2 flex flex-col items-center justify-center transition-all ${
                        isMastered ? 'bg-emerald-50 border-emerald-200' : 'bg-slate-50 border-slate-100'
                      }`}
                    >
                      <span className={`text-lg font-black ${isMastered ? 'text-emerald-600' : 'text-slate-700'}`}>
                        {table}
                      </span>
                      <span className="text-[8px] font-bold text-slate-400 uppercase">{percentage}%</span>
                      {isMastered && <Trophy size={10} className="text-emerald-500 mt-1" />}
                    </div>
                  );
                })}
              </div>
            </div>
          )}

          {/* Recent Mistakes */}
          {player.recentMistakes && player.recentMistakes.length > 0 && (
            <div>
              <h4 className="text-xs font-black text-slate-400 uppercase tracking-widest mb-4 flex items-center gap-2 text-rose-500">
                <HelpCircle size={14} /> Focus Punten (Recente foutjes)
              </h4>
              <div className="space-y-2">
                {player.recentMistakes.map((mistake, i) => (
                  <div key={i} className="p-3 bg-rose-50 rounded-xl border border-rose-100 text-sm">
                    <p className="text-slate-700 font-medium leading-tight mb-1">{mistake.questionText}</p>
                    <span className="text-[9px] font-black text-rose-400 uppercase tracking-widest">
                      Thema: {mistake.themeId}
                    </span>
                  </div>
                ))}
              </div>
            </div>
          )}

          {/* Learning Curve */}
          {player.levelHistory && player.levelHistory.length > 0 && (
            <div>
              <h4 className="text-xs font-black text-slate-400 uppercase tracking-widest mb-4 flex items-center gap-2">
                <Rocket size={14} /> Groeispurt (Niveau verloop)
              </h4>
              <div className="flex items-center gap-2 overflow-x-auto pb-2 no-scrollbar">
                {player.levelHistory.slice(-10).map((h, i) => (
                  <div key={i} className="shrink-0 flex flex-col items-center gap-1">
                    <div className={`w-8 h-8 rounded-lg flex items-center justify-center ${
                      h.adjustment > 0 ? 'bg-emerald-100 text-emerald-600' : 'bg-amber-100 text-amber-600'
                    }`}>
                      {h.adjustment > 0 ? <ArrowLeft className="rotate-90" size={16} /> : <ArrowLeft className="-rotate-90" size={16} />}
                    </div>
                    <span className="text-[8px] font-black text-slate-500 uppercase">{h.level}</span>
                  </div>
                ))}
              </div>
            </div>
          )}
        </div>
      </div>
    </motion.div>
  );
};
