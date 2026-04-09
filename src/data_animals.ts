import { Question } from './types';

export const ANIMAL_QUESTIONS_KIDS: Question[] = [
  {
    id: 'user_animal_1',
    themeId: 'dieren',
    level: 'makkelijk',
    type: 'multiple-choice',
    text: "Welk dier zegt “woef”?",
    options: [
      { id: 'a', text: "Kat", isCorrect: false },
      { id: 'b', text: "Hond", isCorrect: true },
      { id: 'c', text: "Koe", isCorrect: false },
      { id: 'd', text: "Eend", isCorrect: false }
    ],
    explanation: "Een hond blaft en zegt woef!",
    discussion: "Heb jij weleens een hond geaaid?"
  },
  {
    id: 'user_animal_2',
    themeId: 'dieren',
    level: 'makkelijk',
    type: 'multiple-choice',
    text: "Welk dier geeft melk?",
    options: [
      { id: 'a', text: "Koe", isCorrect: true },
      { id: 'b', text: "Vis", isCorrect: false },
      { id: 'c', text: "Muis", isCorrect: false },
      { id: 'd', text: "Kip", isCorrect: false }
    ],
    explanation: "Een koe geeft lekkere melk om te drinken.",
    discussion: "Wat vind jij lekkerder: melk of appelsap?"
  },
  {
    id: 'user_animal_3',
    themeId: 'dieren',
    level: 'makkelijk',
    type: 'multiple-choice',
    text: "Welk dier heeft een lange slurf?",
    options: [
      { id: 'a', text: "Olifant", isCorrect: true },
      { id: 'b', text: "Hond", isCorrect: false },
      { id: 'c', text: "Konijn", isCorrect: false },
      { id: 'd', text: "Schaap", isCorrect: false }
    ],
    explanation: "Een olifant heeft een hele lange slurf waarmee hij water kan spuiten!",
    discussion: "Wat zou jij doen als je een slurf had?"
  },
  {
    id: 'user_animal_4',
    themeId: 'dieren',
    level: 'makkelijk',
    type: 'multiple-choice',
    text: "Welk dier zegt “miauw”?",
    options: [
      { id: 'a', text: "Paard", isCorrect: false },
      { id: 'b', text: "Kat", isCorrect: true },
      { id: 'c', text: "Ezel", isCorrect: false },
      { id: 'd', text: "Geit", isCorrect: false }
    ],
    explanation: "Een kat zegt miauw als hij aandacht wil.",
    discussion: "Ken jij iemand met een kat?"
  },
  {
    id: 'user_animal_5',
    themeId: 'dieren',
    level: 'makkelijk',
    type: 'multiple-choice',
    text: "Welk dier legt eieren?",
    options: [
      { id: 'a', text: "Kip", isCorrect: true },
      { id: 'b', text: "Hond", isCorrect: false },
      { id: 'c', text: "Koe", isCorrect: false },
      { id: 'd', text: "Paard", isCorrect: false }
    ],
    explanation: "Een kip legt eieren waar later een kuikentje uit kan komen.",
    discussion: "Hoe eet jij je ei het liefst?"
  },
  {
    id: 'user_animal_6',
    themeId: 'dieren',
    level: 'makkelijk',
    type: 'multiple-choice',
    text: "Welk dier woont in het water?",
    options: [
      { id: 'a', text: "Vis", isCorrect: true },
      { id: 'b', text: "Kip", isCorrect: false },
      { id: 'c', text: "Konijn", isCorrect: false },
      { id: 'd', text: "Hond", isCorrect: false }
    ],
    explanation: "Een vis zwemt de hele dag onder water.",
    discussion: "Heb jij wel eens een vis gevangen of gezien?"
  },
  {
    id: 'user_animal_7',
    themeId: 'dieren',
    level: 'makkelijk',
    type: 'multiple-choice',
    text: "Welk dier heeft een mooie staart met veren?",
    options: [
      { id: 'a', text: "Pauw", isCorrect: true },
      { id: 'b', text: "Muis", isCorrect: false },
      { id: 'c', text: "Koe", isCorrect: false },
      { id: 'd', text: "Slak", isCorrect: false }
    ],
    explanation: "Een pauw kan zijn veren heel mooi uitvouwen als een waaier.",
    discussion: "Welke kleur vind jij het allermooist?"
  },
  {
    id: 'user_animal_8',
    themeId: 'dieren',
    level: 'makkelijk',
    type: 'multiple-choice',
    text: "Welk dier hopt?",
    options: [
      { id: 'a', text: "Konijn", isCorrect: true },
      { id: 'b', text: "Koe", isCorrect: false },
      { id: 'c', text: "Kat", isCorrect: false },
      { id: 'd', text: "Vis", isCorrect: false }
    ],
    explanation: "Een konijn hopt vrolijk in het rond met zijn sterke achterpoten.",
    discussion: "Kan jij ook heel ver hoppen?"
  },
  {
    id: 'user_animal_9',
    themeId: 'dieren',
    level: 'makkelijk',
    type: 'multiple-choice',
    text: "Welk dier heeft strepen?",
    options: [
      { id: 'a', text: "Zebra", isCorrect: true },
      { id: 'b', text: "Schaap", isCorrect: false },
      { id: 'c', text: "Kip", isCorrect: false },
      { id: 'd', text: "Hond", isCorrect: false }
    ],
    explanation: "Een zebra heeft mooie zwart-witte strepen, net als een zebrapad!",
    discussion: "Heb jij kleren met streepjes?"
  },
  {
    id: 'user_animal_10',
    themeId: 'dieren',
    level: 'makkelijk',
    type: 'multiple-choice',
    text: "Welk dier zegt “kwaak”?",
    options: [
      { id: 'a', text: "Kikker", isCorrect: true },
      { id: 'b', text: "Paard", isCorrect: false },
      { id: 'c', text: "Geit", isCorrect: false },
      { id: 'd', text: "Mier", isCorrect: false }
    ],
    explanation: "Een kikker zegt kwaak en springt in de vijver.",
    discussion: "Kan jij het geluid van een kikker nadoen?"
  },
  {
    id: 'user_animal_11',
    themeId: 'dieren',
    level: 'makkelijk',
    type: 'multiple-choice',
    text: "Welk dier heeft een heel lange nek?",
    options: [
      { id: 'a', text: "Giraffe", isCorrect: true },
      { id: 'b', text: "Beer", isCorrect: false },
      { id: 'c', text: "Varken", isCorrect: false },
      { id: 'd', text: "Mol", isCorrect: false }
    ],
    explanation: "Een giraffe heeft een hele lange nek om blaadjes hoog uit de bomen te eten.",
    discussion: "Zou jij ook zo't lange nek willen hebben?"
  },
  {
    id: 'user_animal_12',
    themeId: 'dieren',
    level: 'makkelijk',
    type: 'multiple-choice',
    text: "Welk dier maakt honing?",
    options: [
      { id: 'a', text: "Bij", isCorrect: true },
      { id: 'b', text: "Koe", isCorrect: false },
      { id: 'c', text: "Hond", isCorrect: false },
      { id: 'd', text: "Krokodil", isCorrect: false }
    ],
    explanation: "Een bij vliegt van bloem naar bloem en maakt daar lekkere zoete honing van.",
    discussion: "Vind jij honing op brood ook zo lekker?"
  },
  {
    id: 'user_animal_13',
    themeId: 'dieren',
    level: 'makkelijk',
    type: 'multiple-choice',
    text: "Welk dier is vaak roze?",
    options: [
      { id: 'a', text: "Varken", isCorrect: true },
      { id: 'b', text: "Zebra", isCorrect: false },
      { id: 'c', text: "Wolf", isCorrect: false },
      { id: 'd', text: "Eend", isCorrect: false }
    ],
    explanation: "Een varken is vaak mooi roze en rolt graag in de modder.",
    discussion: "Speel jij ook wel eens in de modder?"
  },
  {
    id: 'user_animal_14',
    themeId: 'dieren',
    level: 'makkelijk',
    type: 'multiple-choice',
    text: "Welk dier loopt vaak langzaam met een huisje?",
    options: [
      { id: 'a', text: "Slak", isCorrect: true },
      { id: 'b', text: "Haas", isCorrect: false },
      { id: 'c', text: "Hond", isCorrect: false },
      { id: 'd', text: "Kat", isCorrect: false }
    ],
    explanation: "Een slak draagt zijn eigen huisje op zijn rug!",
    discussion: "Heb jij wel eens een slak in de tuin gezien?"
  },
  {
    id: 'user_animal_15',
    themeId: 'dieren',
    level: 'makkelijk',
    type: 'multiple-choice',
    text: "Welk dier zegt “boe” of “boehoe” in de wei?",
    options: [
      { id: 'a', text: "Koe", isCorrect: true },
      { id: 'b', text: "Muis", isCorrect: false },
      { id: 'c', text: "Vis", isCorrect: false },
      { id: 'd', text: "Slang", isCorrect: false }
    ],
    explanation: "Een koe staat in de wei gras te eten en zegt luid BOE!",
    discussion: "Welk dier vind jij het leukst op de boerderij?"
  },
  {
    id: 'user_animal_16',
    themeId: 'dieren',
    level: 'makkelijk',
    type: 'multiple-choice',
    text: "Welk dier heeft wollige vacht?",
    options: [
      { id: 'a', text: "Schaap", isCorrect: true },
      { id: 'b', text: "Krokodil", isCorrect: false },
      { id: 'c', text: "Vis", isCorrect: false },
      { id: 'd', text: "Kip", isCorrect: false }
    ],
    explanation: "Een schaap heeft een dikke wollen trui aan. Daar maken we kleren van!",
    discussion: "Heb jij een warme trui van wol?"
  },
  {
    id: 'user_animal_17',
    themeId: 'dieren',
    level: 'makkelijk',
    type: 'multiple-choice',
    text: "Welk dier is de baby van een kip?",
    options: [
      { id: 'a', text: "Kuiken", isCorrect: true },
      { id: 'b', text: "Kalf", isCorrect: false },
      { id: 'c', text: "Puppy", isCorrect: false },
      { id: 'd', text: "Veulen", isCorrect: false }
    ],
    explanation: "Een klein geel kuikentje komt uit het ei van de kip.",
    discussion: "Heb jij wel eens een kuikentje vastgehouden?"
  },
  {
    id: 'user_animal_18',
    themeId: 'dieren',
    level: 'makkelijk',
    type: 'multiple-choice',
    text: "Welk dier spint vaak?",
    options: [
      { id: 'a', text: "Kat", isCorrect: true },
      { id: 'b', text: "Eend", isCorrect: false },
      { id: 'c', text: "Koe", isCorrect: false },
      { id: 'd', text: "Geit", isCorrect: false }
    ],
    explanation: "Als een kat heel blij is en geaaid wordt, gaat hij zachtjes spinnen.",
    discussion: "Vind jij het fijn om geknuffeld te worden?"
  },
  {
    id: 'user_animal_19',
    themeId: 'dieren',
    level: 'makkelijk',
    type: 'multiple-choice',
    text: "Welk dier leeft vaak in een stal en zegt “hinnik”?",
    options: [
      { id: 'a', text: "Paard", isCorrect: true },
      { id: 'b', text: "Vis", isCorrect: false },
      { id: 'c', text: "Kip", isCorrect: false },
      { id: 'd', text: "Pinguïn", isCorrect: false }
    ],
    explanation: "Een paard hinnikt en je kunt er op paardrijden!",
    discussion: "Zou jij wel eens op een paard willen rijden?"
  },
  {
    id: 'user_animal_20',
    themeId: 'dieren',
    level: 'makkelijk',
    type: 'multiple-choice',
    text: "Welk dier heeft acht armen?",
    options: [
      { id: 'a', text: "Octopus", isCorrect: true },
      { id: 'b', text: "Muis", isCorrect: false },
      { id: 'c', text: "Hond", isCorrect: false },
      { id: 'd', text: "Uil", isCorrect: false }
    ],
    explanation: "Een octopus zwemt in de zee en heeft wel acht lange armen (tentakels).",
    discussion: "Wat zou jij doen met acht armen?"
  },
  {
    id: 'user_animal_21',
    themeId: 'dieren',
    level: 'makkelijk',
    type: 'multiple-choice',
    text: "Welk dier vliegt ’s nachts en zegt “oehoe”?",
    options: [
      { id: 'a', text: "Uil", isCorrect: true },
      { id: 'b', text: "Eend", isCorrect: false },
      { id: 'c', text: "Kip", isCorrect: false },
      { id: 'd', text: "Poes", isCorrect: false }
    ],
    explanation: "Een uil is wakker als wij slapen en roept oehoe in het bos.",
    discussion: "Ben jij wel eens wakker in de nacht?"
  },
  {
    id: 'user_animal_22',
    themeId: 'dieren',
    level: 'makkelijk',
    type: 'multiple-choice',
    text: "Welk dier woont vaak onder de grond?",
    options: [
      { id: 'a', text: "Mol", isCorrect: true },
      { id: 'b', text: "Zebra", isCorrect: false },
      { id: 'c', text: "Olifant", isCorrect: false },
      { id: 'd', text: "Vis", isCorrect: false }
    ],
    explanation: "Een mol graaft lange gangen onder de grond en maakt molshopen.",
    discussion: "Vind jij graven in de zandbak ook zo leuk?"
  },
  {
    id: 'user_animal_23',
    themeId: 'dieren',
    level: 'makkelijk',
    type: 'multiple-choice',
    text: "Welk dier zegt “mekker mekker”?",
    options: [
      { id: 'a', text: "Geit", isCorrect: true },
      { id: 'b', text: "Kat", isCorrect: false },
      { id: 'c', text: "Beer", isCorrect: false },
      { id: 'd', text: "Dolfijn", isCorrect: false }
    ],
    explanation: "Een geitje op de kinderboerderij zegt mekker mekker!",
    discussion: "Ben jij wel eens op een kinderboerderij geweest?"
  },
  {
    id: 'user_animal_24',
    themeId: 'dieren',
    level: 'makkelijk',
    type: 'multiple-choice',
    text: "Welk dier heeft vinnen?",
    options: [
      { id: 'a', text: "Vis", isCorrect: true },
      { id: 'b', text: "Hond", isCorrect: false },
      { id: 'c', text: "Schaap", isCorrect: false },
      { id: 'd', text: "Konijn", isCorrect: false }
    ],
    explanation: "Een vis gebruikt zijn vinnen om heel hard te kunnen zwemmen.",
    discussion: "Kan jij al goed zwemmen?"
  },
  {
    id: 'user_animal_25',
    themeId: 'dieren',
    level: 'makkelijk',
    type: 'multiple-choice',
    text: "Welk dier kan spinnenwebben maken?",
    options: [
      { id: 'a', text: "Spin", isCorrect: true },
      { id: 'b', text: "Eend", isCorrect: false },
      { id: 'c', text: "Koe", isCorrect: false },
      { id: 'd', text: "Slang", isCorrect: false }
    ],
    explanation: "Een spin maakt een mooi web om vliegjes in te vangen.",
    discussion: "Vind jij spinnen eng of juist interessant?"
  }
];
