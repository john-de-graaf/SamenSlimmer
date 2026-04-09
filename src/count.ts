import { QUESTIONS } from './data';

const counts: Record<string, number> = {};

QUESTIONS.forEach(q => {
  counts[q.themeId] = (counts[q.themeId] || 0) + 1;
});

console.log(counts);
