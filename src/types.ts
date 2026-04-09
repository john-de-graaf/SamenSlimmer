export type Level = 'makkelijk' | 'midden' | 'moeilijk' | 'gemengd';
export type ThemeId = 'dieren' | 'natuur' | 'ruimte' | 'lichaam' | 'rekenen' | 'taal' | 'verkeer' | 'geschiedenis' | 'kiezen' | 'eten' | 'alles' | 'wereld' | 'beroepen' | 'milieu' | 'kunst' | 'emoties' | 'techniek' | 'dinos' | 'sport' | 'seizoen' | 'tvseries' | 'youtube' | 'roblox' | 'muziek' | 'vrije-tijd' | 'boeken' | 'aardrijkskunde' | 'films-series' | 'wetenschap' | 'algemeen' | 'vrije tijd' | 'disney' | 'prinsessen' | 'tafels' | 'thee' | 'kletsen';
export type ModeId = 'alleen' | 'samen' | 'beurt' | 'familie' | 'quizmaster';

export interface Experiment {
  id: string;
  themeId: ThemeId;
  title: string;
  description: string;
  materials: string[];
  steps: string[];
  iconName: string;
}

export interface Theme {
  id: ThemeId;
  title: string;
  iconName: string;
  color: string;
  imageUrl?: string;
  experimentId?: string;
}

export interface Mode {
  id: ModeId;
  title: string;
  description: string;
  iconName: string;
}

export interface QuizOption {
  id: string;
  text: string;
  isCorrect: boolean;
}

export interface Player {
  id: string;
  name: string;
  age: number;
  schoolLevel?: string;
  favoriteColor?: string;
  iconName?: string;
  levels: Level[];
  score: number;
  answered: number;
  consecutiveCorrect: number;
  consecutiveWrong: number;
  tafelsCorrect?: number; // Number of correct multiplication tables
  lastLoginDate?: string; // YYYY-MM-DD
  loginStreak?: number; // Consecutive days played
  answeredQuestionIds?: string[]; // IDs of questions already answered by this player
  globalRank?: number;
  shownJokes?: string[]; // List of jokes already shown to this player to avoid repetition
  totalAnswered?: number;
  themeStats?: Record<string, { correct: number; total: number }>;
  tableStats?: Record<number, { correct: number; total: number }>;
  recentMistakes?: { questionText: string; themeId: ThemeId; date: string }[];
  levelHistory?: { date: string; level: Level; adjustment: number }[];
}

export type QuestionType = 'multiple-choice' | 'open';

export interface Question {
  id: string;
  type?: QuestionType;
  themeId: ThemeId;
  level: Level | 'alle';
  text: string;
  imageUrl?: string;
  options?: QuizOption[];
  explanation: string;
  discussion?: string;
  task?: string;
  fact?: string;
}
