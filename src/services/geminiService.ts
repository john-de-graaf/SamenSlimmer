import { GoogleGenAI, Type, ThinkingLevel } from '@google/genai';
import { Question, ThemeId, Level, Player, ModeId } from '../types';
import { getSeasonalTheme } from '../data';

const apiKey = process.env.GEMINI_API_KEY || process.env.SamenSlimmer;
const ai = new GoogleGenAI({ apiKey: apiKey || '' });

async function fetchWikipediaImage(query: string): Promise<string | undefined> {
  if (!query || query.trim() === '') return undefined;
  
  const fetchFromWiki = async (lang: string) => {
    try {
      const controller = new AbortController();
      const timeoutId = setTimeout(() => controller.abort(), 1500); // 1.5s timeout for images
      
      const response = await fetch(`https://${lang}.wikipedia.org/w/api.php?action=query&prop=pageimages&format=json&piprop=original&titles=${encodeURIComponent(query)}&origin=*`, {
        signal: controller.signal
      });
      clearTimeout(timeoutId);
      
      const data = await response.json();
      const pages = data.query?.pages;
      if (pages) {
        const pageId = Object.keys(pages)[0];
        if (pageId !== '-1' && pages[pageId].original?.source) {
          return pages[pageId].original.source;
        }
      }
    } catch (e) {
      console.error(`Error fetching image from ${lang}.wikipedia:`, e);
    }
    return undefined;
  };

  try {
    const [nl, en] = await Promise.all([fetchFromWiki('nl'), fetchFromWiki('en')]);
    return nl || en;
  } catch (e) {
    return undefined;
  }
}

export async function generateJoke(age?: number, previousJokes: string[] = []): Promise<{setup: string, punchline: string}> {
  try {
    const avoidInstruction = previousJokes.length > 0 
      ? `\n\nBELANGRIJK: Vertel NIET een van de volgende moppen die de gebruiker al kent:\n${previousJokes.join('\n')}`
      : "";

    const randomSeed = Math.random().toString(36).substring(7);
    const prompt = `Vertel een heel korte, grappige kindermop voor een kind van ${age || 8} jaar oud. 
    De mop moet perfect te begrijpen zijn voor deze leeftijd.
    
    GEEF EEN NIEUWE MOP. Gebruik verschillende thema's (dieren, school, dokters, sport, etc.).
    Random seed voor variatie: ${randomSeed}
    
    ${avoidInstruction}
    
    Zorg dat de mop origineel is en niet een van de meest standaard moppen (zoals de tomaat met de paraplu).`;
    
    const response = await ai.models.generateContent({
      model: 'gemini-3-flash-preview',
      contents: prompt,
      config: {
        responseMimeType: "application/json",
        responseSchema: {
          type: Type.OBJECT,
          properties: {
            setup: { type: Type.STRING, description: "De setup of de vraag van de mop" },
            punchline: { type: Type.STRING, description: "De clou of het antwoord van de mop" }
          },
          required: ["setup", "punchline"]
        }
      }
    });
    
    const jsonStr = response.text?.trim() || "{}";
    const parsed = JSON.parse(jsonStr);
    return {
      setup: parsed.setup || "Waarom nam de tomaat een paraplu mee?",
      punchline: parsed.punchline || "Omdat het regende!"
    };
  } catch (e) {
    console.error("Error generating joke:", e);
    return {
      setup: "Waarom nam de tomaat een paraplu mee?",
      punchline: "Omdat het regende!"
    };
  }
}

export async function generateQuestions(
  themeId: ThemeId | null, 
  level: Level, 
  count: number = 5, 
  age?: number, 
  schoolLevel?: string, 
  quizmaster?: Player,
  difficultyAdjustment: number = 0, // -1: easier, 0: normal, 1: harder
  mode?: ModeId,
  previousQuestions?: string[]
): Promise<Question[]> {
  let themeText = '';
  if (!themeId || themeId === 'alles') {
    themeText = 'een willekeurig, leuk onderwerp (bijv. dieren, ruimte, natuur, geschiedenis, etc.)';
  } else if (themeId === 'seizoen') {
    const seasonal = getSeasonalTheme();
    themeText = `het actuele seizoen/feestdag: ${seasonal.title}`;
  } else {
    themeText = themeId;
  }

  const levelText = level === 'gemengd' ? 'een mix van makkelijk, midden en moeilijk' : level;
  const ageContext = age ? ` voor een kind van ${age} jaar oud` : '';
  const schoolContext = schoolLevel ? ` (niveau: ${schoolLevel})` : '';
  
  let prompt = '';
  
  if (quizmaster) {
    prompt = `Jij bent een quiz-assistent. De gebruiker is een kind van ${quizmaster.age} jaar oud genaamd ${quizmaster.name}. Dit kind is de "Quizmaster" en gaat deze vragen HARDOP VOORLEZEN aan volwassenen of oudere spelers.
    
    Genereer ${count} unieke en leuke quizvragen over het thema "${themeText}".
    
    BELANGRIJK VOOR DE QUIZMASTER MODUS:
    1. De INHOUD van de vragen moet uitdagend, grappig of interessant zijn voor VOLWASSENEN (of oudere spelers).
    2. De TAAL en WOORDKEUZE van de vragen en antwoorden moet heel SIMPEL zijn, zodat een kind van ${quizmaster.age} jaar het makkelijk en zonder struikelen kan voorlezen. Vermijd moeilijke woorden.
    3. Spreek de quizmaster direct aan in de uitleg (bijv. "Goed voorgelezen ${quizmaster.name}! Het antwoord is...").
    
    Geef ALTIJD EXACT 4 antwoordopties per vraag. Begin elke optie verplicht met een letter: "A) ", "B) ", "C) " en "D) ". Precies één optie is correct.
    Geef een duidelijke uitleg waarom het antwoord klopt (weer in simpele taal voor de quizmaster om voor te lezen).
    Voeg optioneel een leuk weetje (fact), een kleine opdracht (task) of een praatvraag (discussion) toe.`;
  } else {
    let difficultyInstruction = `\n\nCRUCIAAL VOOR LEEFTIJD EN NIVEAU:\nDe speler is ${age} jaar oud${schoolLevel ? ` en zit in ${schoolLevel}` : ''}.\nDe vragen, de antwoorden en de uitleg MOETEN perfect aansluiten bij de belevingswereld, woordenschat en het denkniveau van deze specifieke leeftijd.`;
      
    if (age && age < 8) {
      difficultyInstruction += `\n\nPROFIEL 4-7 JAAR (KLEUTERS/ONDERBOUW):
        - FOCUS: Herkennen en benoemen van de directe omgeving.
        - ONDERWERPEN: Basisdieren (hond, kat, boerderij), kleuren, vormen, tellen tot 10, voertuigen, kleding, dagelijkse routines, emoties (blij/boos).
        - VERBODEN: Geen landen, geen jaartallen, geen topografie, geen abstracte concepten (tijd, geld, gewicht), geen moeilijke woorden.
        - TAAL: Korte zinnen (max 6-8 woorden).
        - FOUTE ANTWOORDEN: Moeten grappig of overduidelijk fout zijn (bijv. "Wat geeft een koe?" -> "Patat").`;
      } else if (age && age >= 8 && age <= 11) {
        difficultyInstruction += `\n\nPROFIEL 8-11 JAAR (MIDDENBOUW/BOVENBOUW):
        - FOCUS: Weetjes, wereldoriëntatie en simpele logica.
        - ONDERWERPEN: Natuur, planeten, dino's, bekende Nederlanders, sportregels, basis geschiedenis (ridders, piraten), topografie van Nederland/Europa.
        - TAAL: Helder en informatief, maar vermijd jargon.
        - VOORBEELD: "Welke planeet staat het dichtst bij de zon?" of "Hoeveel spelers staan er in een voetbalteam?"`;
      } else if (age && age >= 12 && age <= 15) {
        difficultyInstruction += `\n\nPROFIEL 12-15 JAAR (MIDDELBARE SCHOOL):
        - FOCUS: Inzicht, verbanden en algemene ontwikkeling.
        - ONDERWERPEN: Actualiteit, popcultuur, sociale media, techniek, wereldgeschiedenis, biologie, aardrijkskunde.
        - TAAL: Modern en volwassen, maar passend bij de puberleeftijd.
        - VOORBEELD: "Wie schreef het dagboek over de Tweede Wereldoorlog terwijl ze ondergedoken zat in Amsterdam?"`;
      }
      
      if (age && age < 7) {
        difficultyInstruction += `
        
        GOUDEN VOORBEELDEN VOOR KLEUTERS:
        Vraag: Welk dier zegt “woef”?
        A) Kat | B) Hond (GOED) | C) Koe | D) Eend
        
        Vraag: Welk dier geeft melk?
        A) Koe (GOED) | B) Vis | C) Muis | D) Kip
        
        Bestudeer de simpelheid en humor van deze voorbeelden.`;
      }

      if (difficultyAdjustment > 0) {
        difficultyInstruction += ' Maak de vragen iets uitdagender voor dit specifieke niveau.';
      } else if (difficultyAdjustment < 0) {
        difficultyInstruction += ' Houd de vragen aan de makkelijke kant voor dit specifieke niveau.';
      }

    const typeInstruction = themeId === 'thee' 
      ? 'Genereer OPEN vragen (zonder antwoordopties) die aanzetten tot nadenken en een goed gesprek. Dit zijn "Teatopics" vragen. Geef GEEN antwoordopties.'
      : 'Geef ALTIJD EXACT 4 antwoordopties per vraag. Precies één optie is correct. Geef GEEN letters (zoals A, B, C, D) in de tekst van de opties, deze worden door de app toegevoegd. BELANGRIJK: De foute antwoorden (distractors) moeten ZEER PLAUSIBEL zijn en logisch in verband staan met de vraag. Ze moeten in EXACT dezelfde categorie vallen als het goede antwoord (bijv. als het antwoord een specifieke vogel is, zijn de foute antwoorden ook andere vogels; als het antwoord een jaartal is, zijn de foute antwoorden ook jaartallen in de buurt). Dit voorkomt dat het antwoord te makkelijk te raden is door eliminatie.';

    prompt = `Genereer ${count} unieke en leuke ${themeId === 'thee' ? 'open vragen' : 'quizvragen'}${ageContext}${schoolContext} over het thema "${themeText}" op het niveau "${levelText}".
    
    ${difficultyInstruction}
    
    ${typeInstruction}

    Thema-specifieke context:
    - Thee: Genereer diepere vragen die men aan elkaar kan stellen. Het zijn vragen om over na te denken voor een goed gesprek (Teatopics). Bijvoorbeeld: "Aan welke leeftijd heb je de mooiste herinneringen?".
    - Disney: Vragen over alle Disney en Pixar films (Mickey, Frozen, Lion King, Toy Story).
    - Disneyprinsessen: Focus op de bekende prinsessen (Assepoester, Sneeuwwitje, Ariël, Belle, Jasmine, Elsa, Anna, Vaiana, etc.).
    - Wereld: Aardrijkskunde, landen, oceanen, continenten.
    - Algemeen: Een mix van leuke weetjes over van alles en nog wat.

    BELANGRIJK VOOR FEITELIJKE JUISTHEID:
    - Alle vragen, antwoorden, uitleg en "Wist je dat?" feitjes MOETEN 100% feitelijk correct en wetenschappelijk/historisch onderbouwd zijn.
    - Gebruik alleen algemeen geaccepteerde feiten.
    - Als je twijfelt over een feit, kies dan een ander onderwerp waar je zeker van bent.
    - De "fact" (Wist je dat?) moet een verrassend maar WAAR gebeurd feitje zijn dat aansluit bij het onderwerp van de vraag.

    Zorg dat de vragen leerzaam en grappig zijn.
    Geef een duidelijke, kindvriendelijke uitleg waarom het antwoord klopt.
    Voeg ALTIJD een leuke praatvraag (discussion) toe die de spelers uitnodigt om samen na te denken of een ervaring te delen.
    Voeg optioneel een leuk weetje (fact) of een kleine opdracht (task) toe.`;
  }

  if (previousQuestions && previousQuestions.length > 0) {
    prompt += `
    
    BELANGRIJK: Genereer GEEN vragen die lijken op deze eerdere vragen:
    - ${previousQuestions.slice(-50).join('\n    - ')}`;
  }

  prompt += `
  
  EXTRA VOOR DE "SAMEN" MODUS:
  De "discussion" moet echt een open vraag zijn die aanzet tot een gesprekje tussen ouder en kind (bijv. "Heb jij wel eens een ... gezien?" of "Wat zou jij doen als ...?").`;

  prompt += `
  
  BELANGRIJK VOOR AFBEELDINGEN:
  - De "searchQuery" moet het ONDERWERP van de vraag omschrijven, NIET het antwoord.
  - Als de afbeelding het antwoord op de vraag zou verraden, laat "searchQuery" dan LEEG (null of lege string).
  - CRUCIAAL: Als de vraag is "Wat is dit?" of "Welk dier zie je hier?", dan mag de afbeelding NIET het antwoord bevatten in de searchQuery, maar het moet wel het onderwerp zijn.
  - ECHTER: Als de vraag is "Welk dier zegt boe?", dan mag de searchQuery NIET "Koe" zijn, want dat verraadt het antwoord. Gebruik dan "Boerderij".
  - De term moet een enkel zelfstandig naamwoord zijn dat op Wikipedia een duidelijke hoofdafbeelding heeft.
  
  Geef de output als een JSON array van objecten.`;

  try {
    const response = await ai.models.generateContent({
      model: 'gemini-3-flash-preview',
      contents: prompt,
      config: {
        thinkingConfig: { thinkingLevel: ThinkingLevel.LOW },
        responseMimeType: 'application/json',
        responseSchema: {
          type: Type.ARRAY,
          items: {
            type: Type.OBJECT,
            properties: {
              text: { type: Type.STRING, description: 'De vraag zelf' },
              options: {
                type: Type.ARRAY,
                items: {
                  type: Type.OBJECT,
                  properties: {
                    text: { type: Type.STRING, description: 'De antwoordoptie' },
                    isCorrect: { type: Type.BOOLEAN, description: 'Is dit het juiste antwoord?' }
                  },
                  required: ['text', 'isCorrect']
                },
                description: 'De mogelijke antwoorden (alleen voor quizvragen, laat leeg voor open vragen)'
              },
              explanation: { type: Type.STRING, description: 'Uitleg waarom het antwoord klopt' },
              searchQuery: { type: Type.STRING, description: 'Zoekterm voor Wikipedia afbeelding van het onderwerp (mag het antwoord NIET verraden)' },
              fact: { type: Type.STRING, description: 'Een leuk extra weetje (optioneel)' },
              task: { type: Type.STRING, description: 'Een kleine doe-opdracht (optioneel)' },
              discussion: { type: Type.STRING, description: 'Een leuke vraag om over te praten (optioneel)' }
            },
            required: ['text', 'explanation', 'searchQuery']
          }
        }
      }
    });

    const text = response.text;
    if (!text) return [];

    const parsed = JSON.parse(text);
    
    const questions = await Promise.all(parsed.map(async (q: any, index: number) => {
      const imageUrl = await fetchWikipediaImage(q.searchQuery);
      
      const options = (q.options || []).map((o: any, oIndex: number) => {
        return {
          id: `opt_${oIndex}`,
          text: o.text,
          isCorrect: o.isCorrect
        };
      });
      
      return {
        id: `gen_${Date.now()}_${index}`,
        themeId,
        level: level === 'gemengd' ? 'midden' : level, // fallback if gemengd
        type: themeId === 'thee' ? 'open' : 'multiple-choice',
        text: q.text,
        imageUrl,
        options: options.length > 0 ? options : undefined,
        explanation: q.explanation,
        fact: q.fact,
        task: q.task,
        discussion: q.discussion
      };
    }));
    
    return questions;
  } catch (error) {
    console.error('Error generating questions:', error);
    return [];
  }
}
