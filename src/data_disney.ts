import { Question } from './types';

export const DISNEY_QUESTIONS: Question[] = [
  {
    id: 'disney_1',
    themeId: 'disney',
    level: 'makkelijk',
    text: 'Wie is het beroemdste muisje van Disney?',
    options: [
      { id: 'a', text: 'Jerry', isCorrect: false },
      { id: 'b', text: 'Mickey Mouse', isCorrect: true },
      { id: 'c', text: 'Stuart Little', isCorrect: false },
      { id: 'd', text: 'Speedy Gonzales', isCorrect: false }
    ],
    explanation: 'Mickey Mouse is het gezicht van Disney en werd al in 1928 bedacht!',
    discussion: 'Heb jij wel eens Mickey Mouse oren opgehad?'
  },
  {
    id: 'disney_2',
    themeId: 'disney',
    level: 'makkelijk',
    text: 'Welke kleur heeft de auto Bliksem McQueen in de film Cars?',
    options: [
      { id: 'a', text: 'Blauw', isCorrect: false },
      { id: 'b', text: 'Geel', isCorrect: false },
      { id: 'c', text: 'Rood', isCorrect: true },
      { id: 'd', text: 'Groen', isCorrect: false }
    ],
    explanation: 'Bliksem McQueen is een knalrode raceauto!',
    discussion: 'Welke kleur auto vind jij het allermooist?'
  },
  {
    id: 'disney_3',
    themeId: 'disney',
    level: 'midden',
    text: 'Hoe heet het sneeuwpopje uit de film Frozen?',
    options: [
      { id: 'a', text: 'Frosty', isCorrect: false },
      { id: 'b', text: 'Olaf', isCorrect: true },
      { id: 'c', text: 'Sven', isCorrect: false },
      { id: 'd', text: 'Kristoff', isCorrect: false }
    ],
    explanation: 'Olaf is het vrolijke sneeuwpopje dat van warme knuffels houdt.',
    discussion: 'Zou jij ook een sneeuwpop willen zijn die niet smelt?'
  },
  {
    id: 'disney_4',
    themeId: 'disney',
    level: 'midden',
    text: 'In welke film komt de leeuw Simba voor?',
    options: [
      { id: 'a', text: 'Bambi', isCorrect: false },
      { id: 'b', text: 'The Lion King', isCorrect: true },
      { id: 'c', text: 'Madagascar', isCorrect: false },
      { id: 'd', text: 'Jungle Boek', isCorrect: false }
    ],
    explanation: 'Simba is de hoofdrolspeler in The Lion King, hij wordt de koning van de Leeuwenrots.',
    discussion: 'Welk dier uit The Lion King vind jij het grappigst?'
  },
  {
    id: 'disney_5',
    themeId: 'disney',
    level: 'moeilijk',
    text: 'Wat is de naam van de krab in De Kleine Zeemeermin?',
    options: [
      { id: 'a', text: 'Flounder', isCorrect: false },
      { id: 'b', text: 'Sebastian', isCorrect: true },
      { id: 'c', text: 'Scuttle', isCorrect: false },
      { id: 'd', text: 'King Triton', isCorrect: false }
    ],
    explanation: 'Sebastian is de dirigent en de adviseur van Koning Triton.',
    discussion: 'Welk liedje uit De Kleine Zeemeermin kun jij meezingen?'
  },
  {
    id: 'disney_6',
    themeId: 'disney',
    level: 'makkelijk',
    text: 'Wie is de beste vriend van Mickey Mouse?',
    options: [
      { id: 'a', text: 'Pluto', isCorrect: false },
      { id: 'b', text: 'Donald Duck', isCorrect: true },
      { id: 'c', text: 'Goofy', isCorrect: false },
      { id: 'd', text: 'Boris Boef', isCorrect: false }
    ],
    explanation: 'Donald Duck is de onhandige maar trouwe vriend van Mickey.',
    discussion: 'Kun jij Donald Duck nadoen?'
  },
  {
    id: 'disney_7',
    themeId: 'disney',
    level: 'makkelijk',
    text: 'Welk dier is Bambi?',
    options: [
      { id: 'a', text: 'Konijn', isCorrect: false },
      { id: 'b', text: 'Hertje', isCorrect: true },
      { id: 'c', text: 'Beer', isCorrect: false },
      { id: 'd', text: 'Vos', isCorrect: false }
    ],
    explanation: 'Bambi is een jong hertje dat opgroeit in het bos.',
    discussion: 'Heb jij wel eens een hertje in het echt gezien?'
  },
  {
    id: 'disney_8',
    themeId: 'disney',
    level: 'midden',
    text: 'Hoe heet de houten pop die een echte jongen wil worden?',
    options: [
      { id: 'a', text: 'Pinokkio', isCorrect: true },
      { id: 'b', text: 'Peter Pan', isCorrect: false },
      { id: 'c', text: 'Dumbo', isCorrect: false },
      { id: 'd', text: 'Mowgli', isCorrect: false }
    ],
    explanation: 'Pinokkio zijn neus groeit als hij liegt!',
    discussion: 'Wat zou jij doen als je neus groeide bij een leugentje?'
  },
  {
    id: 'disney_9',
    themeId: 'disney',
    level: 'midden',
    text: 'Welk dier is Dumbo?',
    options: [
      { id: 'a', text: 'Leeuw', isCorrect: false },
      { id: 'b', text: 'Olifant', isCorrect: true },
      { id: 'c', text: 'Tijger', isCorrect: false },
      { id: 'd', text: 'Aap', isCorrect: false }
    ],
    explanation: 'Dumbo is een olifantje met hele grote oren waarmee hij kan vliegen.',
    discussion: 'Waar zou jij naartoe vliegen als je kon vliegen?'
  },
  {
    id: 'disney_10',
    themeId: 'disney',
    level: 'moeilijk',
    text: 'Hoe heet de gemene vrouw in 101 Dalmatiërs?',
    options: [
      { id: 'a', text: 'Maleficent', isCorrect: false },
      { id: 'b', text: 'Cruella de Vil', isCorrect: true },
      { id: 'c', text: 'Ursula', isCorrect: false },
      { id: 'd', text: 'Jafar', isCorrect: false }
    ],
    explanation: 'Cruella de Vil wil een jas maken van de vacht van de puppy\'s.',
    discussion: 'Wat is jouw lievelingshondenras?'
  },
  {
    id: 'disney_11',
    themeId: 'disney',
    level: 'makkelijk',
    text: 'Hoe heet de cowboy in Toy Story?',
    options: [
      { id: 'a', text: 'Buzz Lightyear', isCorrect: false },
      { id: 'b', text: 'Woody', isCorrect: true },
      { id: 'c', text: 'Rex', isCorrect: false },
      { id: 'd', text: 'Hamm', isCorrect: false }
    ],
    explanation: 'Woody is de leider van het speelgoed van Andy.',
    discussion: 'Welk speelgoed is jouw allergrootste favoriet?'
  },
  {
    id: 'disney_12',
    themeId: 'disney',
    level: 'makkelijk',
    text: 'Wat zegt Buzz Lightyear altijd?',
    options: [
      { id: 'a', text: 'Hakuna Matata', isCorrect: false },
      { id: 'b', text: 'Tot de sterren en daar voorbij!', isCorrect: true },
      { id: 'c', text: 'Ik ben een cowboy', isCorrect: false },
      { id: 'd', text: 'Laten we gaan!', isCorrect: false }
    ],
    explanation: 'Buzz Lightyear denkt in het begin dat hij een echte Space Ranger is.',
    discussion: 'Zou jij ook een ruimtevaarder willen zijn?'
  },
  {
    id: 'disney_13',
    themeId: 'disney',
    level: 'midden',
    text: 'Wie is de vader van Nemo?',
    options: [
      { id: 'a', text: 'Marlin', isCorrect: true },
      { id: 'b', text: 'Bruce', isCorrect: false },
      { id: 'c', text: 'Crush', isCorrect: false },
      { id: 'd', text: 'Gill', isCorrect: false }
    ],
    explanation: 'Marlin zwemt de hele oceaan over om zijn zoon Nemo te vinden.',
    discussion: 'Wat is het verste dat jij ooit van huis bent geweest?'
  },
  {
    id: 'disney_14',
    themeId: 'disney',
    level: 'midden',
    text: 'Welke vis vergeet altijd alles in Finding Nemo?',
    options: [
      { id: 'a', text: 'Nemo', isCorrect: false },
      { id: 'b', text: 'Dory', isCorrect: true },
      { id: 'c', text: 'Squirt', isCorrect: false },
      { id: 'd', text: 'Destiny', isCorrect: false }
    ],
    explanation: 'Dory is een blauwe vis die lijdt aan korte-termijn geheugenverlies.',
    discussion: 'Wat vergeet jij wel eens?'
  },
  {
    id: 'disney_15',
    themeId: 'disney',
    level: 'moeilijk',
    text: 'Hoe heet de stad waar de film Monsters en Co. zich afspeelt?',
    options: [
      { id: 'a', text: 'Monstropolis', isCorrect: true },
      { id: 'b', text: 'Zootopia', isCorrect: false },
      { id: 'c', text: 'Radiator Springs', isCorrect: false },
      { id: 'd', text: 'San Fransokyo', isCorrect: false }
    ],
    explanation: 'In Monstropolis wekken monsters energie op door kinderen te laten schrikken (en later door ze te laten lachen!).',
    discussion: 'Wat vind jij grappiger: een monster dat brult of een monster dat een grapje maakt?'
  },
  {
    id: 'disney_16',
    themeId: 'disney',
    level: 'makkelijk',
    text: 'Wie is de kleine groene alien uit Star Wars (nu ook bij Disney)?',
    options: [
      { id: 'a', text: 'Yoda', isCorrect: true },
      { id: 'b', text: 'Chewbacca', isCorrect: false },
      { id: 'c', text: 'R2-D2', isCorrect: false },
      { id: 'd', text: 'C-3PO', isCorrect: false }
    ],
    explanation: 'Yoda is een hele wijze en sterke Jedi-meester.',
    discussion: 'Kun jij praten als Yoda? "Groot de kracht is!"'
  },
  {
    id: 'disney_17',
    themeId: 'disney',
    level: 'makkelijk',
    text: 'Welke superheld heeft een schild met een ster?',
    options: [
      { id: 'a', text: 'Iron Man', isCorrect: false },
      { id: 'b', text: 'Captain America', isCorrect: true },
      { id: 'c', text: 'Thor', isCorrect: false },
      { id: 'd', text: 'Hulk', isCorrect: false }
    ],
    explanation: 'Captain America is een van de leiders van de Avengers.',
    discussion: 'Welke superkracht zou jij het liefst willen hebben?'
  },
  {
    id: 'disney_18',
    themeId: 'disney',
    level: 'midden',
    text: 'Hoe heet de robot uit de film Wall-E die de aarde opruimt?',
    options: [
      { id: 'a', text: 'Eve', isCorrect: false },
      { id: 'b', text: 'Wall-E', isCorrect: true },
      { id: 'c', text: 'Baymax', isCorrect: false },
      { id: 'd', text: 'Rodney', isCorrect: false }
    ],
    explanation: 'Wall-E is een kleine robot die verliefd wordt op de moderne robot Eve.',
    discussion: 'Zou jij een robotvriendje willen hebben?'
  },
  {
    id: 'disney_19',
    themeId: 'disney',
    level: 'midden',
    text: 'Welk dier is Remy in de film Ratatouille?',
    options: [
      { id: 'a', text: 'Muis', isCorrect: false },
      { id: 'b', text: 'Rat', isCorrect: true },
      { id: 'c', text: 'Hamster', isCorrect: false },
      { id: 'd', text: 'Cavia', isCorrect: false }
    ],
    explanation: 'Remy is een rat die een geweldige kok wil worden in Parijs.',
    discussion: 'Wat is het lekkerste dat jij ooit hebt gegeten?'
  },
  {
    id: 'disney_20',
    themeId: 'disney',
    level: 'moeilijk',
    text: 'Hoe heet de opa in de film Up?',
    options: [
      { id: 'a', text: 'Carl Fredricksen', isCorrect: true },
      { id: 'b', text: 'Charles Muntz', isCorrect: false },
      { id: 'c', text: 'Russell', isCorrect: false },
      { id: 'd', text: 'Dug', isCorrect: false }
    ],
    explanation: 'Carl laat zijn huis vliegen met duizenden ballonnen om naar de Paradijswatervallen te gaan.',
    discussion: 'Als jij je huis kon laten vliegen, waar zou je dan naartoe gaan?'
  },
  {
    id: 'disney_21',
    themeId: 'disney',
    level: 'makkelijk',
    text: 'Wie is de vriend van Winnie de Poeh die altijd vrolijk is en springt?',
    options: [
      { id: 'a', text: 'Knorretje', isCorrect: false },
      { id: 'b', text: 'Teigetje', isCorrect: true },
      { id: 'c', text: 'Iejoor', isCorrect: false },
      { id: 'd', text: 'Konijn', isCorrect: false }
    ],
    explanation: 'Teigetje springt op zijn staart en is altijd vol energie.',
    discussion: 'Kun jij ook zo hoog springen als Teigetje?'
  },
  {
    id: 'disney_22',
    themeId: 'disney',
    level: 'makkelijk',
    text: 'Wat eet Winnie de Poeh het allerliefst?',
    options: [
      { id: 'a', text: 'Appels', isCorrect: false },
      { id: 'b', text: 'Honing', isCorrect: true },
      { id: 'c', text: 'Kaas', isCorrect: false },
      { id: 'd', text: 'Koekjes', isCorrect: false }
    ],
    explanation: 'Winnie de Poeh heeft altijd een pot honing bij zich in het Honderd Bunderbos.',
    discussion: 'Wat vind jij lekker op je brood?'
  },
  {
    id: 'disney_23',
    themeId: 'disney',
    level: 'midden',
    text: 'Hoe heet het jongetje dat opgevoed is door wolven in Jungle Boek?',
    options: [
      { id: 'a', text: 'Tarzan', isCorrect: false },
      { id: 'b', text: 'Mowgli', isCorrect: true },
      { id: 'c', text: 'Baloe', isCorrect: false },
      { id: 'd', text: 'Bagheera', isCorrect: false }
    ],
    explanation: 'Mowgli beleeft avonturen met de beer Baloe en de panter Bagheera.',
    discussion: 'Zou jij in de jungle willen wonen?'
  },
  {
    id: 'disney_24',
    themeId: 'disney',
    level: 'midden',
    text: 'Welk liedje zingt Baloe de beer in Jungle Boek?',
    options: [
      { id: 'a', text: 'Hakuna Matata', isCorrect: false },
      { id: 'b', text: 'Als je van beren leren kan', isCorrect: true },
      { id: 'c', text: 'Laat het los', isCorrect: false },
      { id: 'd', text: 'Onder de zee', isCorrect: false }
    ],
    explanation: 'Baloe leert Mowgli dat je je niet druk moet maken en moet genieten van het leven.',
    discussion: 'Waar word jij heel erg vrolijk van?'
  },
  {
    id: 'disney_25',
    themeId: 'disney',
    level: 'moeilijk',
    text: 'Hoe heet de gemene tijger in Jungle Boek?',
    options: [
      { id: 'a', text: 'Shere Khan', isCorrect: true },
      { id: 'b', text: 'Kaa', isCorrect: false },
      { id: 'c', text: 'King Louie', isCorrect: false },
      { id: 'd', text: 'Scar', isCorrect: false }
    ],
    explanation: 'Shere Khan is de gevaarlijke tijger die bang is voor vuur.',
    discussion: 'Welk dier vind jij het spannendst in de dierentuin?'
  },
  {
    id: 'disney_26',
    themeId: 'disney',
    level: 'makkelijk',
    text: 'Hoe heet de zus van Elsa in Frozen?',
    options: [
      { id: 'a', text: 'Anna', isCorrect: true },
      { id: 'b', text: 'Belle', isCorrect: false },
      { id: 'c', text: 'Ariël', isCorrect: false },
      { id: 'd', text: 'Moana', isCorrect: false }
    ],
    explanation: 'Anna gaat op een gevaarlijk avontuur om haar zus Elsa te redden.',
    discussion: 'Heb jij een broer of zus? Of een hele goede vriend?'
  },
  {
    id: 'disney_27',
    themeId: 'disney',
    level: 'makkelijk',
    text: 'Welk dier is Sven in Frozen?',
    options: [
      { id: 'a', text: 'Paard', isCorrect: false },
      { id: 'b', text: 'Rendier', isCorrect: true },
      { id: 'c', text: 'Hond', isCorrect: false },
      { id: 'd', text: 'Ijsbeer', isCorrect: false }
    ],
    explanation: 'Sven is het trouwe rendier van Kristoff.',
    discussion: 'Wat zou jij een rendier te eten geven?'
  },
  {
    id: 'disney_28',
    themeId: 'disney',
    level: 'midden',
    text: 'Hoe heet de halfgod in de film Moana (Vaiana)?',
    options: [
      { id: 'a', text: 'Maui', isCorrect: true },
      { id: 'b', text: 'Tamatoa', isCorrect: false },
      { id: 'c', text: 'Hei Hei', isCorrect: false },
      { id: 'd', text: 'Pua', isCorrect: false }
    ],
    explanation: 'Maui heeft een magische vishaak waarmee hij van vorm kan veranderen.',
    discussion: 'Als jij in een dier kon veranderen, welk dier zou je dan zijn?'
  },
  {
    id: 'disney_29',
    themeId: 'disney',
    level: 'midden',
    text: 'Wat is Hei Hei voor een dier in Moana?',
    options: [
      { id: 'a', text: 'Varken', isCorrect: false },
      { id: 'b', text: 'Kip', isCorrect: true },
      { id: 'c', text: 'Hond', isCorrect: false },
      { id: 'd', text: 'Vogel', isCorrect: false }
    ],
    explanation: 'Hei Hei is een nogal onhandige kip die per ongeluk mee gaat op de boot.',
    discussion: 'Wat is het grappigste dier dat je kent?'
  },
  {
    id: 'disney_30',
    themeId: 'disney',
    level: 'moeilijk',
    text: 'Hoe heet de krab die van glimmende dingen houdt in Moana?',
    options: [
      { id: 'a', text: 'Tamatoa', isCorrect: true },
      { id: 'b', text: 'Sebastian', isCorrect: false },
      { id: 'c', text: 'Crush', isCorrect: false },
      { id: 'd', text: 'Hank', isCorrect: false }
    ],
    explanation: 'Tamatoa zingt het liedje "Shiny" en heeft zijn schild versierd met goud.',
    discussion: 'Welk glimmend ding vind jij heel mooi?'
  },
  {
    id: 'disney_31',
    themeId: 'disney',
    level: 'makkelijk',
    text: 'Hoe heet de blauwe alien die bevriend is met Lilo?',
    options: [
      { id: 'a', text: 'Stitch', isCorrect: true },
      { id: 'b', text: 'E.T.', isCorrect: false },
      { id: 'c', text: 'Yoda', isCorrect: false },
      { id: 'd', text: 'Wall-E', isCorrect: false }
    ],
    explanation: 'Stitch is Experiment 626, maar hij leert wat familie (Ohana) betekent.',
    discussion: 'Wat betekent familie voor jou?'
  },
  {
    id: 'disney_32',
    themeId: 'disney',
    level: 'makkelijk',
    text: 'In welke stad woont Lilo?',
    options: [
      { id: 'a', text: 'Parijs', isCorrect: false },
      { id: 'b', text: 'Hawaii', isCorrect: true },
      { id: 'c', text: 'Londen', isCorrect: false },
      { id: 'd', text: 'New York', isCorrect: false }
    ],
    explanation: 'Lilo en Stitch speelt zich af op het prachtige eiland Hawaii.',
    discussion: 'Zou jij wel eens willen surfen op een grote golf?'
  },
  {
    id: 'disney_33',
    themeId: 'disney',
    level: 'midden',
    text: 'Hoe heet de vliegende olifant?',
    options: [
      { id: 'a', text: 'Dumbo', isCorrect: true },
      { id: 'b', text: 'Bambi', isCorrect: false },
      { id: 'c', text: 'Simba', isCorrect: false },
      { id: 'd', text: 'Baloe', isCorrect: false }
    ],
    explanation: 'Dumbo gebruikt zijn grote oren om te vliegen in het circus.',
    discussion: 'Wat is jouw verborgen talent?'
  },
  {
    id: 'disney_34',
    themeId: 'disney',
    level: 'midden',
    text: 'Wie is de vijand van Peter Pan?',
    options: [
      { id: 'a', text: 'Kapitein Haak', isCorrect: true },
      { id: 'b', text: 'Jafar', isCorrect: false },
      { id: 'c', text: 'Scar', isCorrect: false },
      { id: 'd', text: 'Hades', isCorrect: false }
    ],
    explanation: 'Kapitein Haak is een piraat die heel bang is voor de krokodil.',
    discussion: 'Waarom denk je dat Kapitein Haak bang is voor de krokodil?'
  },
  {
    id: 'disney_35',
    themeId: 'disney',
    level: 'moeilijk',
    text: 'Hoe heet het elfje dat altijd bij Peter Pan is?',
    options: [
      { id: 'a', text: 'Tinkerbell', isCorrect: true },
      { id: 'b', text: 'Flora', isCorrect: false },
      { id: 'c', text: 'Fauna', isCorrect: false },
      { id: 'd', text: 'Mooiweertje', isCorrect: false }
    ],
    explanation: 'Tinkerbell gebruikt elfenstof om mensen te laten vliegen.',
    discussion: 'Als jij kon vliegen, waar zou je dan als eerste naartoe gaan?'
  },
  {
    id: 'disney_36',
    themeId: 'disney',
    level: 'makkelijk',
    text: 'Welk dier is Donald Duck?',
    options: [
      { id: 'a', text: 'Gans', isCorrect: false },
      { id: 'b', text: 'Eend', isCorrect: true },
      { id: 'c', text: 'Kip', isCorrect: false },
      { id: 'd', text: 'Zwaan', isCorrect: false }
    ],
    explanation: 'Donald Duck is een witte eend met een matrozenpakje.',
    discussion: 'Welk kledingstuk draag jij het liefst?'
  },
  {
    id: 'disney_37',
    themeId: 'disney',
    level: 'makkelijk',
    text: 'Hoe heten de drie neefjes van Donald Duck?',
    options: [
      { id: 'a', text: 'Kwik, Kwek en Kwak', isCorrect: true },
      { id: 'b', text: 'Mickey, Donald en Goofy', isCorrect: false },
      { id: 'c', text: 'Bibi, Bobo en Bubu', isCorrect: false },
      { id: 'd', text: 'Kwik, Kwek en Kwek', isCorrect: false }
    ],
    explanation: 'Kwik, Kwek en Kwak wonen bij hun oom Donald.',
    discussion: 'Heb jij neefjes of nichtjes?'
  },
  {
    id: 'disney_38',
    themeId: 'disney',
    level: 'midden',
    text: 'Wie is de rijkste eend ter wereld?',
    options: [
      { id: 'a', text: 'Donald Duck', isCorrect: false },
      { id: 'b', text: 'Dagobert Duck', isCorrect: true },
      { id: 'c', text: 'Guus Geluk', isCorrect: false },
      { id: 'd', text: 'Willie Wortel', isCorrect: false }
    ],
    explanation: 'Oom Dagobert heeft een enorm geldpakhuis waar hij graag in zwemt.',
    discussion: 'Wat zou jij doen met een pakhuis vol met geld?'
  },
  {
    id: 'disney_39',
    themeId: 'disney',
    level: 'midden',
    text: 'Hoe heet de uitvinder in Duckstad?',
    options: [
      { id: 'a', text: 'Willie Wortel', isCorrect: true },
      { id: 'b', text: 'Dagobert Duck', isCorrect: false },
      { id: 'c', text: 'Guus Geluk', isCorrect: false },
      { id: 'd', text: 'Donald Duck', isCorrect: false }
    ],
    explanation: 'Willie Wortel maakt de gekste uitvindingen, vaak met hulp van Lampje.',
    discussion: 'Wat zou jij willen uitvinden?'
  },
  {
    id: 'disney_40',
    themeId: 'disney',
    level: 'moeilijk',
    text: 'Wie is de eeuwige geluksvogel in Duckstad?',
    options: [
      { id: 'a', text: 'Donald Duck', isCorrect: false },
      { id: 'b', text: 'Guus Geluk', isCorrect: true },
      { id: 'c', text: 'Dagobert Duck', isCorrect: false },
      { id: 'd', text: 'Willie Wortel', isCorrect: false }
    ],
    explanation: 'Guus Geluk wint altijd alles zonder er moeite voor te doen.',
    discussion: 'Heb jij wel eens iets gewonnen?'
  },
  {
    id: 'disney_41',
    themeId: 'disney',
    level: 'makkelijk',
    text: 'Hoe heet de sneeuwman uit Frozen?',
    options: [
      { id: 'a', text: 'Olaf', isCorrect: true },
      { id: 'b', text: 'Frosty', isCorrect: false },
      { id: 'c', text: 'Sven', isCorrect: false },
      { id: 'd', text: 'Kristoff', isCorrect: false }
    ],
    explanation: 'Olaf houdt van warme knuffels en de zomer!',
    discussion: 'Geef eens iemand een hele dikke knuffel!'
  },
  {
    id: 'disney_42',
    themeId: 'disney',
    level: 'makkelijk',
    text: 'Wat voor dier is Goofy?',
    options: [
      { id: 'a', text: 'Kat', isCorrect: false },
      { id: 'b', text: 'Hond', isCorrect: true },
      { id: 'c', text: 'Koe', isCorrect: false },
      { id: 'd', text: 'Paard', isCorrect: false }
    ],
    explanation: 'Goofy is een hele grappige en onhandige hond.',
    discussion: 'Wat is het grappigste dat jij ooit hebt gedaan?'
  },
  {
    id: 'disney_43',
    themeId: 'disney',
    level: 'midden',
    text: 'Hoe heet het aapje van Aladdin?',
    options: [
      { id: 'a', text: 'Abu', isCorrect: true },
      { id: 'b', text: 'Iago', isCorrect: false },
      { id: 'c', text: 'Rajah', isCorrect: false },
      { id: 'd', text: 'Genie', isCorrect: false }
    ],
    explanation: 'Abu is het trouwe aapje dat Aladdin helpt in Agrabah.',
    discussion: 'Als jij een dier als beste vriend mocht kiezen, welk dier zou dat zijn?'
  },
  {
    id: 'disney_44',
    themeId: 'disney',
    level: 'midden',
    text: 'Hoeveel wensen mag Aladdin doen bij de Geest?',
    options: [
      { id: 'a', text: '1 wens', isCorrect: false },
      { id: 'b', text: '3 wensen', isCorrect: true },
      { id: 'c', text: '5 wensen', isCorrect: false },
      { id: 'd', text: 'Onbeperkt', isCorrect: false }
    ],
    explanation: 'De Geest uit de lamp geeft Aladdin 3 wensen.',
    discussion: 'Welke 3 wensen zou jij doen?'
  },
  {
    id: 'disney_45',
    themeId: 'disney',
    level: 'moeilijk',
    text: 'Hoe heet de papegaai van Jafar in Aladdin?',
    options: [
      { id: 'a', text: 'Iago', isCorrect: true },
      { id: 'b', text: 'Zazu', isCorrect: false },
      { id: 'c', text: 'Sebastian', isCorrect: false },
      { id: 'd', text: 'Flit', isCorrect: false }
    ],
    explanation: 'Iago is de grappige maar gemene papegaai die Jafar helpt.',
    discussion: 'Kun jij een vogel nadoen?'
  },
  {
    id: 'disney_46',
    themeId: 'disney',
    level: 'makkelijk',
    text: 'Wie is de koning van de Leeuwenrots?',
    options: [
      { id: 'a', text: 'Mufasa', isCorrect: true },
      { id: 'b', text: 'Scar', isCorrect: false },
      { id: 'c', text: 'Timon', isCorrect: false },
      { id: 'd', text: 'Pumbaa', isCorrect: false }
    ],
    explanation: 'Mufasa is de vader van Simba en de koning aan het begin van de film.',
    discussion: 'Wie is de baas bij jou thuis?'
  },
  {
    id: 'disney_47',
    themeId: 'disney',
    level: 'makkelijk',
    text: 'Wat betekent "Hakuna Matata"?',
    options: [
      { id: 'a', text: 'Heel veel eten', isCorrect: false },
      { id: 'b', text: 'Geen zorgen', isCorrect: true },
      { id: 'c', text: 'Lekker slapen', isCorrect: false },
      { id: 'd', text: 'Hard rennen', isCorrect: false }
    ],
    explanation: 'Timon en Pumbaa leren Simba dat je je geen zorgen moet maken.',
    discussion: 'Waar maak jij je wel eens zorgen over?'
  },
  {
    id: 'disney_48',
    themeId: 'disney',
    level: 'midden',
    text: 'Welk dier is Pumbaa in The Lion King?',
    options: [
      { id: 'a', text: 'Stokstaartje', isCorrect: false },
      { id: 'b', text: 'Wrattenzwijn', isCorrect: true },
      { id: 'c', text: 'Hyena', isCorrect: false },
      { id: 'd', text: 'Baviaan', isCorrect: false }
    ],
    explanation: 'Pumbaa is een wrattenzwijn en de beste vriend van Timon.',
    discussion: 'Wie is jouw allerbeste vriend?'
  },
  {
    id: 'disney_49',
    themeId: 'disney',
    level: 'midden',
    text: 'Welk dier is Timon in The Lion King?',
    options: [
      { id: 'a', text: 'Stokstaartje', isCorrect: true },
      { id: 'b', text: 'Wrattenzwijn', isCorrect: false },
      { id: 'c', text: 'Aap', isCorrect: false },
      { id: 'd', text: 'Vogel', isCorrect: false }
    ],
    explanation: 'Timon is een grappig stokstaartje.',
    discussion: 'Kun jij ook zo rechtop staan als een stokstaartje?'
  },
  {
    id: 'disney_50',
    themeId: 'disney',
    level: 'moeilijk',
    text: 'Hoe heet de wijze baviaan in The Lion King?',
    options: [
      { id: 'a', text: 'Rafiki', isCorrect: true },
      { id: 'b', text: 'Zazu', isCorrect: false },
      { id: 'c', text: 'Mufasa', isCorrect: false },
      { id: 'd', text: 'Scar', isCorrect: false }
    ],
    explanation: 'Rafiki is de sjamaan die Simba presenteert aan alle dieren.',
    discussion: 'Wat is het wijste dat iemand ooit tegen je heeft gezegd?'
  },
  {
    id: 'disney_51',
    themeId: 'disney',
    level: 'makkelijk',
    text: 'Hoe heet de robot in de film Big Hero 6?',
    options: [
      { id: 'a', text: 'Baymax', isCorrect: true },
      { id: 'b', text: 'Wall-E', isCorrect: false },
      { id: 'c', text: 'Rodney', isCorrect: false },
      { id: 'd', text: 'R2-D2', isCorrect: false }
    ],
    explanation: 'Baymax is een opblaasbare robot die is ontworpen om mensen te helpen.',
    discussion: 'Zou jij een robotvriend willen hebben die op een grote marshmallow lijkt?'
  },
  {
    id: 'disney_52',
    themeId: 'disney',
    level: 'makkelijk',
    text: 'Welk dier is Bambi?',
    options: [
      { id: 'a', text: 'Een hertje', isCorrect: true },
      { id: 'b', text: 'Een konijn', isCorrect: false },
      { id: 'c', text: 'Een vos', isCorrect: false },
      { id: 'd', text: 'Een beer', isCorrect: false }
    ],
    explanation: 'Bambi is een jong hertje dat opgroeit in het bos.',
    discussion: 'Welke dieren heb jij wel eens in het bos gezien?'
  },
  {
    id: 'disney_53',
    themeId: 'disney',
    level: 'midden',
    text: 'Hoe heet de gemene leeuw in De Leeuwenkoning?',
    options: [
      { id: 'a', text: 'Scar', isCorrect: true },
      { id: 'b', text: 'Mufasa', isCorrect: false },
      { id: 'c', text: 'Simba', isCorrect: false },
      { id: 'd', text: 'Zazu', isCorrect: false }
    ],
    explanation: 'Scar is de oom van Simba en hij wil zelf koning worden.',
    discussion: 'Vind jij Scar een enge leeuw?'
  },
  {
    id: 'disney_54',
    themeId: 'disney',
    level: 'midden',
    text: 'In welke stad woont de familie van de film 101 Dalmatiërs?',
    options: [
      { id: 'a', text: 'Londen', isCorrect: true },
      { id: 'b', text: 'Parijs', isCorrect: false },
      { id: 'c', text: 'New York', isCorrect: false },
      { id: 'd', text: 'Amsterdam', isCorrect: false }
    ],
    explanation: 'De film speelt zich af in de stad Londen.',
    discussion: 'Zou jij 101 honden in huis willen hebben?'
  },
  {
    id: 'disney_55',
    themeId: 'disney',
    level: 'moeilijk',
    text: 'Hoe heet de krekel in Pinokkio?',
    options: [
      { id: 'a', text: 'Japie Krekel', isCorrect: true },
      { id: 'b', text: 'Sebastiaan', isCorrect: false },
      { id: 'c', text: 'Mushu', isCorrect: false },
      { id: 'd', text: 'Pascal', isCorrect: false }
    ],
    explanation: 'Japie Krekel (Jiminy Cricket) is het geweten van Pinokkio.',
    discussion: 'Heb jij ook wel eens een stemmetje in je hoofd dat zegt wat goed of fout is?'
  },
  {
    id: 'disney_56',
    themeId: 'disney',
    level: 'makkelijk',
    text: 'Wat voor soort dier is Goofy?',
    options: [
      { id: 'a', text: 'Een hond', isCorrect: true },
      { id: 'b', text: 'Een koe', isCorrect: false },
      { id: 'c', text: 'Een paard', isCorrect: false },
      { id: 'd', text: 'Een muis', isCorrect: false }
    ],
    explanation: 'Goofy is een van de beste vrienden van Mickey Muis en hij is een hond.',
    discussion: 'Wie is jouw grappigste vriend?'
  },
  {
    id: 'disney_57',
    themeId: 'disney',
    level: 'makkelijk',
    text: 'Hoe heet de kleine blauwe alien die bevriend is met Lilo?',
    options: [
      { id: 'a', text: 'Stitch', isCorrect: true },
      { id: 'b', text: 'E.T.', isCorrect: false },
      { id: 'c', text: 'Buzz', isCorrect: false },
      { id: 'd', text: 'Olaf', isCorrect: false }
    ],
    explanation: 'Stitch is experiment 626 en hij landt op Hawaii.',
    discussion: 'Geloof jij dat er aliens bestaan?'
  },
  {
    id: 'disney_58',
    themeId: 'disney',
    level: 'midden',
    text: 'Welk dier helpt Assepoester met het maken van haar jurk?',
    options: [
      { id: 'a', text: 'Muizen', isCorrect: true },
      { id: 'b', text: 'Vogels', isCorrect: false },
      { id: 'c', text: 'Honden', isCorrect: false },
      { id: 'd', text: 'Katten', isCorrect: false }
    ],
    explanation: 'De muizen Jaq en Gus helpen Assepoester met haar jurk.',
    discussion: 'Zou jij willen dat dieren je konden helpen met je huiswerk?'
  },
  {
    id: 'disney_59',
    themeId: 'disney',
    level: 'midden',
    text: 'Hoe heet de gemene vrouw in 101 Dalmatiërs?',
    options: [
      { id: 'a', text: 'Cruella de Vil', isCorrect: true },
      { id: 'b', text: 'Maleficent', isCorrect: false },
      { id: 'c', text: 'Ursula', isCorrect: false },
      { id: 'd', text: 'Moeder Gothel', isCorrect: false }
    ],
    explanation: 'Cruella de Vil wil een jas maken van de vacht van de puppy\'s.',
    discussion: 'Wat vind jij de gemeenste Disney-schurk?'
  },
  {
    id: 'disney_60',
    themeId: 'disney',
    level: 'moeilijk',
    text: 'Wat is de naam van de stad in de film Monsters en Co.?',
    options: [
      { id: 'a', text: 'Monstropolis', isCorrect: true },
      { id: 'b', text: 'Zootropolis', isCorrect: false },
      { id: 'c', text: 'Radiator Springs', isCorrect: false },
      { id: 'd', text: 'Agrabah', isCorrect: false }
    ],
    explanation: 'Monstropolis is de stad waar alle monsters wonen.',
    discussion: 'Zou jij in een stad vol monsters willen wonen?'
  },
  {
    id: 'disney_61',
    themeId: 'disney',
    level: 'makkelijk',
    text: 'Hoe heet de cowboy in Toy Story?',
    options: [
      { id: 'a', text: 'Woody', isCorrect: true },
      { id: 'b', text: 'Buzz', isCorrect: false },
      { id: 'c', text: 'Jessie', isCorrect: false },
      { id: 'd', text: 'Bullseye', isCorrect: false }
    ],
    explanation: 'Woody is de favoriete speelgoedpop van Andy.',
    discussion: 'Welk speelgoed is jouw favoriet?'
  },
  {
    id: 'disney_62',
    themeId: 'disney',
    level: 'makkelijk',
    text: 'Hoe heet de ruimtevaarder in Toy Story?',
    options: [
      { id: 'a', text: 'Buzz Lightyear', isCorrect: true },
      { id: 'b', text: 'Woody', isCorrect: false },
      { id: 'c', text: 'Rex', isCorrect: false },
      { id: 'd', text: 'Zurg', isCorrect: false }
    ],
    explanation: 'Buzz Lightyear denkt eerst dat hij een echte ruimtevaarder is.',
    discussion: 'Zou jij naar de ruimte willen reizen?'
  },
  {
    id: 'disney_63',
    themeId: 'disney',
    level: 'midden',
    text: 'Wat voor soort vis is Nemo?',
    options: [
      { id: 'a', text: 'Een clownvis', isCorrect: true },
      { id: 'b', text: 'Een haai', isCorrect: false },
      { id: 'c', text: 'Een goudvis', isCorrect: false },
      { id: 'd', text: 'Een dolfijn', isCorrect: false }
    ],
    explanation: 'Nemo is een oranje met witte clownvis.',
    discussion: 'Heb jij wel eens een aquarium gezien?'
  },
  {
    id: 'disney_64',
    themeId: 'disney',
    level: 'midden',
    text: 'Hoe heet de blauwe vis die alles vergeet in Finding Nemo?',
    options: [
      { id: 'a', text: 'Dory', isCorrect: true },
      { id: 'b', text: 'Marlin', isCorrect: false },
      { id: 'c', text: 'Bruce', isCorrect: false },
      { id: 'd', text: 'Crush', isCorrect: false }
    ],
    explanation: 'Dory lijdt aan korte-termijn geheugenverlies.',
    discussion: 'Vergeet jij ook wel eens belangrijke dingen?'
  },
  {
    id: 'disney_65',
    themeId: 'disney',
    level: 'moeilijk',
    text: 'Hoe heet de rat die kan koken in Ratatouille?',
    options: [
      { id: 'a', text: 'Remy', isCorrect: true },
      { id: 'b', text: 'Emile', isCorrect: false },
      { id: 'c', text: 'Django', isCorrect: false },
      { id: 'd', text: 'Linguini', isCorrect: false }
    ],
    explanation: 'Remy droomt ervan om een grote chef-kok in Parijs te worden.',
    discussion: 'Wat is het lekkerste dat jij kunt koken (of eten)?'
  },
  {
    id: 'disney_66',
    themeId: 'disney',
    level: 'makkelijk',
    text: 'Hoe heet de sneeuwpop in Frozen?',
    options: [
      { id: 'a', text: 'Olaf', isCorrect: true },
      { id: 'b', text: 'Sven', isCorrect: false },
      { id: 'c', text: 'Kristoff', isCorrect: false },
      { id: 'd', text: 'Hans', isCorrect: false }
    ],
    explanation: 'Olaf houdt van warme knuffels en de zomer.',
    discussion: 'Hou jij ook van warme knuffels?'
  },
  {
    id: 'disney_67',
    themeId: 'disney',
    level: 'makkelijk',
    text: 'Welke kleur is de auto Bliksem McQueen?',
    options: [
      { id: 'a', text: 'Rood', isCorrect: true },
      { id: 'b', text: 'Blauw', isCorrect: false },
      { id: 'c', text: 'Geel', isCorrect: false },
      { id: 'd', text: 'Groen', isCorrect: false }
    ],
    explanation: 'Bliksem McQueen is een rode raceauto met het nummer 95.',
    discussion: 'Zou jij een snelle raceauto willen zijn?'
  },
  {
    id: 'disney_68',
    themeId: 'disney',
    level: 'midden',
    text: 'Hoe heet het eiland waar Moana woont?',
    options: [
      { id: 'a', text: 'Motunui', isCorrect: true },
      { id: 'b', text: 'Hawaii', isCorrect: false },
      { id: 'c', text: 'Te Fiti', isCorrect: false },
      { id: 'd', text: 'Lalotai', isCorrect: false }
    ],
    explanation: 'Moana woont op het prachtige eiland Motunui.',
    discussion: 'Zou jij op een eiland willen wonen?'
  },
  {
    id: 'disney_69',
    themeId: 'disney',
    level: 'midden',
    text: 'Hoe heet de halfgod die Moana helpt?',
    options: [
      { id: 'a', text: 'Maui', isCorrect: true },
      { id: 'b', text: 'Tamatoa', isCorrect: false },
      { id: 'c', text: 'Heihei', isCorrect: false },
      { id: 'd', text: 'Tui', isCorrect: false }
    ],
    explanation: 'Maui heeft een magische vishaak en kan van vorm veranderen.',
    discussion: 'Als jij van vorm kon veranderen, welk dier zou je dan willen zijn?'
  },
  {
    id: 'disney_70',
    themeId: 'disney',
    level: 'moeilijk',
    text: 'Wat is de naam van de hond in de film Up?',
    options: [
      { id: 'a', text: 'Dug', isCorrect: true },
      { id: 'b', text: 'Kevin', isCorrect: false },
      { id: 'c', text: 'Russell', isCorrect: false },
      { id: 'd', text: 'Alpha', isCorrect: false }
    ],
    explanation: 'Dug is een hond die kan praten via een speciale halsband.',
    discussion: 'Wat zou jouw huisdier zeggen als hij kon praten?'
  },
  {
    id: 'disney_71',
    themeId: 'disney',
    level: 'makkelijk',
    text: 'Hoe heet de kleine muis die bevriend is met Dombo?',
    options: [
      { id: 'a', text: 'Timothy', isCorrect: true },
      { id: 'b', text: 'Mickey', isCorrect: false },
      { id: 'c', text: 'Gus', isCorrect: false },
      { id: 'd', text: 'Bernard', isCorrect: false }
    ],
    explanation: 'Timothy Muis helpt Dombo om te leren vliegen met zijn grote oren.',
    discussion: 'Wat is jouw grootste talent?'
  },
  {
    id: 'disney_72',
    themeId: 'disney',
    level: 'makkelijk',
    text: 'Wat voor soort dier is Simba?',
    options: [
      { id: 'a', text: 'Een leeuw', isCorrect: true },
      { id: 'b', text: 'Een tijger', isCorrect: false },
      { id: 'c', text: 'Een luipaard', isCorrect: false },
      { id: 'd', text: 'Een jakhals', isCorrect: false }
    ],
    explanation: 'Simba is de zoon van Mufasa en de toekomstige leeuwenkoning.',
    discussion: 'Welk dier uit de jungle vind jij het stoerst?'
  },
  {
    id: 'disney_73',
    themeId: 'disney',
    level: 'midden',
    text: 'Hoe heet de vos in de film Robin Hood?',
    options: [
      { id: 'a', text: 'Robin Hood', isCorrect: true },
      { id: 'b', text: 'Kleine Jan', isCorrect: false },
      { id: 'c', text: 'Broeder Tuck', isCorrect: false },
      { id: 'd', text: 'Prins Jan', isCorrect: false }
    ],
    explanation: 'In de Disney-versie van Robin Hood zijn alle personages dieren.',
    discussion: 'Zou jij een held willen zijn die steelt van de rijken en geeft aan de armen?'
  },
  {
    id: 'disney_74',
    themeId: 'disney',
    level: 'midden',
    text: 'Hoe heet de beer in Jungle Boek?',
    options: [
      { id: 'a', text: 'Baloe', isCorrect: true },
      { id: 'b', text: 'Bagheera', isCorrect: false },
      { id: 'c', text: 'Shere Khan', isCorrect: false },
      { id: 'd', text: 'Koning Lowietje', isCorrect: false }
    ],
    explanation: 'Baloe leert Mowgli over de "Bare Necessities" van het leven.',
    discussion: 'Wat zijn voor jou de belangrijkste dingen in het leven?'
  },
  {
    id: 'disney_75',
    themeId: 'disney',
    level: 'moeilijk',
    text: 'Hoe heet de kat in de film Alice in Wonderland die kan verdwijnen?',
    options: [
      { id: 'a', text: 'Cheshire Cat', isCorrect: true },
      { id: 'b', text: 'Dinah', isCorrect: false },
      { id: 'c', text: 'Lucifer', isCorrect: false },
      { id: 'd', text: 'Figaro', isCorrect: false }
    ],
    explanation: 'De Cheshire Cat heeft een grote glimlach en kan zichzelf onzichtbaar maken.',
    discussion: 'Wat zou jij doen als je onzichtbaar kon worden?'
  },
  {
    id: 'disney_76',
    themeId: 'disney',
    level: 'makkelijk',
    text: 'Hoe heet de vriendin van Mickey Muis?',
    options: [
      { id: 'a', text: 'Minnie Muis', isCorrect: true },
      { id: 'b', text: 'Daisy Duck', isCorrect: false },
      { id: 'c', text: 'Katrien Duck', isCorrect: false },
      { id: 'd', text: 'Clarabella Koe', isCorrect: false }
    ],
    explanation: 'Minnie Muis is herkenbaar aan haar strik en gestippelde jurk.',
    discussion: 'Draag jij ook wel eens een strik of een mooie jurk?'
  },
  {
    id: 'disney_77',
    themeId: 'disney',
    level: 'makkelijk',
    text: 'Hoe heet de eend die altijd pech heeft?',
    options: [
      { id: 'a', text: 'Donald Duck', isCorrect: true },
      { id: 'b', text: 'Dagobert Duck', isCorrect: false },
      { id: 'c', text: 'Kwik, Kwek en Kwak', isCorrect: false },
      { id: 'd', text: 'Guus Geluk', isCorrect: false }
    ],
    explanation: 'Donald Duck is beroemd om zijn matrozenpak en zijn driftige buien.',
    discussion: 'Word jij ook wel eens heel erg boos als iets niet lukt?'
  },
  {
    id: 'disney_78',
    themeId: 'disney',
    level: 'midden',
    text: 'Hoe heet de rijkste eend ter wereld?',
    options: [
      { id: 'a', text: 'Dagobert Duck', isCorrect: true },
      { id: 'b', text: 'Donald Duck', isCorrect: false },
      { id: 'c', text: 'Guus Geluk', isCorrect: false },
      { id: 'd', text: 'Otto van Drakenstein', isCorrect: false }
    ],
    explanation: 'Oom Dagobert heeft een groot geldpakhuis waar hij in zijn munten zwemt.',
    discussion: 'Wat zou jij doen met een pakhuis vol geld?'
  },
  {
    id: 'disney_79',
    themeId: 'disney',
    level: 'midden',
    text: 'Hoe heten de drie neefjes van Donald Duck?',
    options: [
      { id: 'a', text: 'Kwik, Kwek en Kwak', isCorrect: true },
      { id: 'b', text: 'Mickey, Donald en Goofy', isCorrect: false },
      { id: 'c', text: 'Bibi, Lulu en Babs', isCorrect: false },
      { id: 'd', text: 'Hup, Stap en Sprong', isCorrect: false }
    ],
    explanation: 'Kwik, Kwek en Kwak dragen petjes in de kleuren rood, blauw en groen.',
    discussion: 'Heb jij ook neefjes of nichtjes waar je veel mee speelt?'
  },
  {
    id: 'disney_80',
    themeId: 'disney',
    level: 'moeilijk',
    text: 'Wat is de naam van de vliegende olifant?',
    options: [
      { id: 'a', text: 'Dombo', isCorrect: true },
      { id: 'b', text: 'Horton', isCorrect: false },
      { id: 'c', text: 'Lumpy', isCorrect: false },
      { id: 'd', text: 'Tantor', isCorrect: false }
    ],
    explanation: 'Dombo (Dumbo) kan vliegen dankzij zijn enorme oren.',
    discussion: 'Wat is het meest bijzondere aan jou?'
  },
  {
    id: 'disney_81',
    themeId: 'disney',
    level: 'makkelijk',
    text: 'Hoe heet de jongen die nooit volwassen wil worden?',
    options: [
      { id: 'a', text: 'Peter Pan', isCorrect: true },
      { id: 'b', text: 'Pinokkio', isCorrect: false },
      { id: 'c', text: 'Aladdin', isCorrect: false },
      { id: 'd', text: 'Tarzan', isCorrect: false }
    ],
    explanation: 'Peter Pan woont in Nooitgedachtland met de Verloren Jongens.',
    discussion: 'Zou jij ook voor altijd een kind willen blijven?'
  },
  {
    id: 'disney_82',
    themeId: 'disney',
    level: 'makkelijk',
    text: 'Hoe heet het elfje dat bevriend is met Peter Pan?',
    options: [
      { id: 'a', text: 'Tinkelbel', isCorrect: true },
      { id: 'b', text: 'Flora', isCorrect: false },
      { id: 'c', text: 'Mooiweertje', isCorrect: false },
      { id: 'd', text: 'Fauna', isCorrect: false }
    ],
    explanation: 'Tinkelbel (Tinker Bell) gebruikt elfenstof om mensen te laten vliegen.',
    discussion: 'Waar zou jij naartoe vliegen als je kon vliegen?'
  },
  {
    id: 'disney_83',
    themeId: 'disney',
    level: 'midden',
    text: 'Hoe heet de piraat met een haak als hand?',
    options: [
      { id: 'a', text: 'Kapitein Haak', isCorrect: true },
      { id: 'b', text: 'Jack Sparrow', isCorrect: false },
      { id: 'c', text: 'Zwartbaard', isCorrect: false },
      { id: 'd', text: 'Long John Silver', isCorrect: false }
    ],
    explanation: 'Kapitein Haak is de aartsvijand van Peter Pan.',
    discussion: 'Ben jij bang voor krokodillen?'
  },
  {
    id: 'disney_84',
    themeId: 'disney',
    level: 'midden',
    text: 'Welk dier heeft de hand van Kapitein Haak opgegeten?',
    options: [
      { id: 'a', text: 'Een krokodil', isCorrect: true },
      { id: 'b', text: 'Een haai', isCorrect: false },
      { id: 'c', text: 'Een walvis', isCorrect: false },
      { id: 'd', text: 'Een octopus', isCorrect: false }
    ],
    explanation: 'De krokodil heeft ook een wekker ingeslikt, zodat je hem hoort aankomen.',
    discussion: 'Wat is het engste geluid dat je kent?'
  },
  {
    id: 'disney_85',
    themeId: 'disney',
    level: 'moeilijk',
    text: 'Hoe heet de stad waar de film Zootropolis zich afspeelt?',
    options: [
      { id: 'a', text: 'Zootropolis', isCorrect: true },
      { id: 'b', text: 'San Fransokyo', isCorrect: false },
      { id: 'c', text: 'Monstropolis', isCorrect: false },
      { id: 'd', text: 'Radiator Springs', isCorrect: false }
    ],
    explanation: 'Zootropolis is een stad waar alle dieren in harmonie samenleven.',
    discussion: 'Welk dier zou jij willen zijn in Zootropolis?'
  },
  {
    id: 'disney_86',
    themeId: 'disney',
    level: 'makkelijk',
    text: 'Hoe heet het konijn dat politieagent wil worden in Zootropolis?',
    options: [
      { id: 'a', text: 'Judy Hopps', isCorrect: true },
      { id: 'b', text: 'Nick Wilde', isCorrect: false },
      { id: 'c', text: 'Stampertje', isCorrect: false },
      { id: 'd', text: 'Bambi', isCorrect: false }
    ],
    explanation: 'Judy Hopps is het eerste konijn bij de politie van Zootropolis.',
    discussion: 'Wat wil jij later worden?'
  },
  {
    id: 'disney_87',
    themeId: 'disney',
    level: 'makkelijk',
    text: 'Hoe heet de vos die Judy helpt in Zootropolis?',
    options: [
      { id: 'a', text: 'Nick Wilde', isCorrect: true },
      { id: 'b', text: 'Robin Hood', isCorrect: false },
      { id: 'c', text: 'Tod', isCorrect: false },
      { id: 'd', text: 'Finnick', isCorrect: false }
    ],
    explanation: 'Nick Wilde is een slimme vos die Judy helpt een mysterie op te lossen.',
    discussion: 'Vind jij vossen slim of sluw?'
  },
  {
    id: 'disney_88',
    themeId: 'disney',
    level: 'midden',
    text: 'Hoe heet de film over een familie met superkrachten?',
    options: [
      { id: 'a', text: 'The Incredibles', isCorrect: true },
      { id: 'b', text: 'Big Hero 6', isCorrect: false },
      { id: 'c', text: 'Sky High', isCorrect: false },
      { id: 'd', text: 'Avengers', isCorrect: false }
    ],
    explanation: 'De familie Parr probeert een normaal leven te leiden ondanks hun krachten.',
    discussion: 'Welke superkracht zou jij willen hebben?'
  },
  {
    id: 'disney_89',
    themeId: 'disney',
    level: 'midden',
    text: 'Hoe heet de baby in The Incredibles?',
    options: [
      { id: 'a', text: 'Jack-Jack', isCorrect: true },
      { id: 'b', text: 'Dash', isCorrect: false },
      { id: 'c', text: 'Violet', isCorrect: false },
      { id: 'd', text: 'Bob', isCorrect: false }
    ],
    explanation: 'Jack-Jack heeft heel veel verschillende superkrachten.',
    discussion: 'Wat is het grappigste dat een baby die je kent ooit heeft gedaan?'
  },
  {
    id: 'disney_90',
    themeId: 'disney',
    level: 'moeilijk',
    text: 'Hoe heet de modeontwerpster voor superhelden in The Incredibles?',
    options: [
      { id: 'a', text: 'Edna Mode', isCorrect: true },
      { id: 'b', text: 'Cruella de Vil', isCorrect: false },
      { id: 'c', text: 'Yzma', isCorrect: false },
      { id: 'd', text: 'Maleficent', isCorrect: false }
    ],
    explanation: 'Edna Mode zegt altijd: "No capes!" (Geen capes!).',
    discussion: 'Waarom denk je dat capes gevaarlijk zijn voor superhelden?'
  },
  {
    id: 'disney_91',
    themeId: 'disney',
    level: 'makkelijk',
    text: 'Hoe heet de film over een jongen die naar de dodenwereld reist?',
    options: [
      { id: 'a', text: 'Coco', isCorrect: true },
      { id: 'b', text: 'Encanto', isCorrect: false },
      { id: 'c', text: 'Luca', isCorrect: false },
      { id: 'd', text: 'Soul', isCorrect: false }
    ],
    explanation: 'Miguel wil muzikant worden en reist naar het Land van de Doden.',
    discussion: 'Speel jij een muziekinstrument?'
  },
  {
    id: 'disney_92',
    themeId: 'disney',
    level: 'makkelijk',
    text: 'Hoe heet de hond van Miguel in Coco?',
    options: [
      { id: 'a', text: 'Dante', isCorrect: true },
      { id: 'b', text: 'Hector', isCorrect: false },
      { id: 'c', text: 'Pepita', isCorrect: false },
      { id: 'd', text: 'Coco', isCorrect: false }
    ],
    explanation: 'Dante is een Xolo-hond en de trouwe vriend van Miguel.',
    discussion: 'Wat is de leukste naam voor een hond?'
  },
  {
    id: 'disney_93',
    themeId: 'disney',
    level: 'midden',
    text: 'Hoe heet de film over een magisch huis in Colombia?',
    options: [
      { id: 'a', text: 'Encanto', isCorrect: true },
      { id: 'b', text: 'Coco', isCorrect: false },
      { id: 'c', text: 'Moana', isCorrect: false },
      { id: 'd', text: 'Raya', isCorrect: false }
    ],
    explanation: 'De familie Madrigal woont in een huis dat "Casita" wordt genoemd.',
    discussion: 'Welke magische gave zou jij willen hebben?'
  },
  {
    id: 'disney_94',
    themeId: 'disney',
    level: 'midden',
    text: 'Over wie mogen we niet praten in Encanto?',
    options: [
      { id: 'a', text: 'Bruno', isCorrect: true },
      { id: 'b', text: 'Mirabel', isCorrect: false },
      { id: 'c', text: 'Luisa', isCorrect: false },
      { id: 'd', text: 'Isabela', isCorrect: false }
    ],
    explanation: 'Het liedje "We Don\'t Talk About Bruno" werd een enorme hit.',
    discussion: 'Kun jij het liedje over Bruno zingen?'
  },
  {
    id: 'disney_95',
    themeId: 'disney',
    level: 'moeilijk',
    text: 'Hoe heet de film over zeemonsters in Italië?',
    options: [
      { id: 'a', text: 'Luca', isCorrect: true },
      { id: 'b', text: 'Soul', isCorrect: false },
      { id: 'c', text: 'Onward', isCorrect: false },
      { id: 'd', text: 'Turning Red', isCorrect: false }
    ],
    explanation: 'Luca en Alberto zijn zeemonsters die in mensen veranderen op het land.',
    discussion: 'Zou jij een geheim kunnen bewaren, net als Luca?'
  },
  {
    id: 'disney_96',
    themeId: 'disney',
    level: 'makkelijk',
    text: 'Hoe heet de film over een meisje dat in een rode panda verandert?',
    options: [
      { id: 'a', text: 'Turning Red', isCorrect: true },
      { id: 'b', text: 'Luca', isCorrect: false },
      { id: 'c', text: 'Encanto', isCorrect: false },
      { id: 'd', text: 'Brave', isCorrect: false }
    ],
    explanation: 'Meilin Lee verandert in een grote rode panda als ze sterke emoties voelt.',
    discussion: 'In welk dier zou jij veranderen als je heel enthousiast was?'
  },
  {
    id: 'disney_97',
    themeId: 'disney',
    level: 'makkelijk',
    text: 'Hoe heet de film over een jazzmuzikant die zijn ziel verliest?',
    options: [
      { id: 'a', text: 'Soul', isCorrect: true },
      { id: 'b', text: 'Coco', isCorrect: false },
      { id: 'c', text: 'Inside Out', isCorrect: false },
      { id: 'd', text: 'Up', isCorrect: false }
    ],
    explanation: 'Joe Gardner leert wat het leven echt de moeite waard maakt.',
    discussion: 'Wat maakt jou echt gelukkig?'
  },
  {
    id: 'disney_98',
    themeId: 'disney',
    level: 'midden',
    text: 'Hoe heet de film over de emoties in het hoofd van een meisje?',
    options: [
      { id: 'a', text: 'Binnenstebuiten (Inside Out)', isCorrect: true },
      { id: 'b', text: 'Soul', isCorrect: false },
      { id: 'c', text: 'Turning Red', isCorrect: false },
      { id: 'd', text: 'Frozen', isCorrect: false }
    ],
    explanation: 'De emoties zijn Plezier, Verdriet, Angst, Afkeer en Woede.',
    discussion: 'Welke emotie voel jij vandaag het meest?'
  },
  {
    id: 'disney_99',
    themeId: 'disney',
    level: 'midden',
    text: 'Hoe heet de film over een robot die de aarde schoonmaakt?',
    options: [
      { id: 'a', text: 'Wall-E', isCorrect: true },
      { id: 'b', text: 'Robots', isCorrect: false },
      { id: 'c', text: 'Big Hero 6', isCorrect: false },
      { id: 'd', text: 'Bolt', isCorrect: false }
    ],
    explanation: 'Wall-E wordt verliefd on een andere robot genaamd EVE.',
    discussion: 'Hoe kunnen we de aarde beter schoonhouden?'
  },
  {
    id: 'disney_100',
    themeId: 'disney',
    level: 'moeilijk',
    text: 'Hoe heet de film over een hond die denkt dat hij superkrachten heeft?',
    options: [
      { id: 'a', text: 'Bolt', isCorrect: true },
      { id: 'b', text: 'Pluto', isCorrect: false },
      { id: 'c', text: 'Dug', isCorrect: false },
      { id: 'd', text: 'Lady', isCorrect: false }
    ],
    explanation: 'Bolt is een tv-ster die denkt dat zijn krachten echt zijn.',
    discussion: 'Als jouw huisdier een superheld was, wat zou zijn kracht dan zijn?'
  },
  {
    id: 'disney_101',
    themeId: 'disney',
    level: 'moeilijk',
    text: 'Hoe heet de vogel in de film Up?',
    options: [
      { id: 'a', text: 'Kevin', isCorrect: true },
      { id: 'b', text: 'Becky', isCorrect: false },
      { id: 'c', text: 'Zazu', isCorrect: false },
      { id: 'd', text: 'Iago', isCorrect: false }
    ],
    explanation: 'Kevin is een zeldzame, kleurrijke vogel die dol is op chocolade.',
    discussion: 'Wat is jouw lievelingssnoepje?'
  }
];
