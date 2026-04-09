const fs = require('fs');

const text = `
1–25
Welk dier zegt “woef”? A. Kat
B. Hond
C. Koe
D. Eend
Antwoord: B
Welk dier geeft melk? A. Koe
B. Vis
C. Muis
D. Kip
Antwoord: A
Welk dier heeft een lange slurf? A. Olifant
B. Hond
C. Konijn
D. Schaap
Antwoord: A
Welk dier zegt “miauw”? A. Paard
B. Kat
C. Ezel
D. Geit
Antwoord: B
Wel dier legt eieren? A. Kip
B. Hond
C. Koe
D. Paard
Antwoord: A
Welk dier woont in het water? A. Vis
B. Kip
C. Konijn
D. Hond
Antwoord: A
Welk dier heeft een mooie staart met veren? A. Pauw
B. Muis
C. Koe
D. Slak
Antwoord: A
Welk dier hopt? A. Konijn
B. Koe
C. Kat
D. Vis
Antwoord: A
Welk dier heeft strepen? A. Zebra
B. Schaap
C. Kip
D. Hond
Antwoord: A
Welk dier zegt “kwaak”? A. Kikker
B. Paard
C. Geit
D. Mier
Antwoord: A
Welk dier heeft een heel lange nek? A. Giraffe
B. Beer
C. Varken
D. Mol
Antwoord: A
Welk dier maakt honing? A. Bij
B. Koe
C. Hond
D. Krokodil
Antwoord: A
Welk dier is vaak roze? A. Varken
B. Zebra
C. Wolf
D. Eend
Antwoord: A
Welk dier loopt vaak langzaam met een huisje? A. Slak
B. Haas
C. Hond
D. Kat
Antwoord: A
Welk dier zegt “boe” of “boehoe” in de wei? A. Koe
B. Muis
C. Vis
D. Slang
Antwoord: A
Welk dier heeft wollige vacht? A. Schaap
B. Krokodil
C. Vis
D. Kip
Antwoord: A
Welk dier is de baby van een kip? A. Kuiken
B. Kalf
C. Puppy
D. Veulen
Antwoord: A
Welk dier spint vaak? A. Kat
B. Eend
C. Koe
D. Geit
Antwoord: A
Welk dier leeft vaak in een stal en zegt “hinnik”? A. Paard
B. Vis
C. Kip
D. Pinguïn
Antwoord: A
Welk dier heeft acht armen? A. Octopus
B. Muis
C. Hond
D. Uil
Antwoord: A
Welk dier vliegt ’s nachts en zegt “oehoe”? A. Uil
B. Eend
C. Kip
D. Poes
Antwoord: A
Welk dier woont vaak onder de grond? A. Mol
B. Zebra
C. Olifant
D. Vis
Antwoord: A
Welk dier zegt “mekker mekker”? A. Geit
B. Kat
C. Beer
D. Dolfijn
Antwoord: A
Welk dier heeft vinnen? A. Vis
B. Hond
C. Schaap
D. Konijn
Antwoord: A
Welk dier kan spinnenwebben maken? A. Spin
B. Eend
C. Koe
D. Slang
Antwoord: A
26–50
Welk dier kwaakt en springt? A. Kikker
B. Muis
C. Beer
D. Paard
Antwoord: A
Welk dier heeft zwarte en witte strepen? A. Zebra
B. Tijger
C. Giraffe
D. Hond
Antwoord: A
Welk dier heeft een manen? A. Leeuw
B. Vis
C. Kip
D. Muis
Antwoord: A
Welk dier eet graag wortels? A. Konijn
B. Kat
C. Vis
D. Uil
Antwoord: A
Welk dier zwemt en zegt “kwak kwak”? A. Eend
B. Beer
C. Koe
D. Slang
Antwoord: A
Welk dier draagt zijn baby in een buidel? A. Kangoeroe
B. Paard
C. Vis
D. Kip
Antwoord: A
Welk dier heeft scherpe tanden en leeft soms in de jungle? A. Tijger
B. Schaap
C. Konijn
D. Eend
Antwoord: A
Welk dier leeft op een boerderij en knort? A. Varken
B. Dolfijn
C. Uil
D. Zebra
Antwoord: A
Welk dier kan heel hoog vliegen? A. Adelaar
B. Slak
C. Konijn
D. Mol
Antwoord: A
Welk dier is geel en zwart en kan steken? A. Bij
B. Schaap
C. Vis
D. Hond
Antwoord: A
Welk dier heeft scharen en loopt zijwaarts? A. Krab
B. Kat
C. Muis
D. Geit
Antwoord: A
Welk dier is groot, grijs en zwaar? A. Olifant
B. Eend
C. Kip
D. Slak
Antwoord: A
Welk dier leeft graag in zee en springt soms uit het water? A. Dolfijn
B. Geit
C. Kip
D. Mier
Antwoord: A
Welk dier heeft een schild op zijn rug? A. Schildpad
B. Hond
C. Paard
D. Koe
Antwoord: A
Welk dier is vaak koning van de jungle? A. Leeuw
B. Kikker
C. Eend
D. Slak
Antwoord: A
Welk dier kan niet vliegen maar is wel een vogel? A. Pinguïn
B. Mus
C. Uil
D. Papegaai
Antwoord: A
Welk dier klimt graag in bomen en eet bananen? A. Aap
B. Koe
C. Geit
D. Slang
Antwoord: A
Welk dier maakt wol? A. Schaap
B. Vis
C. Muis
D. Kikker
Antwoord: A
Welk dier kan van kleur veranderen? A. Kameleon
B. Hond
C. Paard
D. Kip
Antwoord: A
Welk dier heeft een heel stekelige rug? A. Egel
B. Konijn
C. Dolfijn
D. Kat
Antwoord: A
Welk dier kruipt zonder poten? A. Slang
B. Schaap
C. Paard
D. Uil
Antwoord: A
Welk dier heeft een pluizige staart en klimt in bomen? A. Eekhoorn
B. Koe
C. Vis
D. Slak
Antwoord: A
Welk dier is vaak de baby van een hond? A. Puppy
B. Kuiken
C. Kalf
D. Veulen
Antwoord: A
Welk dier is de baby van een koe? A. Kalf
B. Puppy
C. Lam
D. Kuiken
Antwoord: A
Welk dier is de baby van een schaap? A. Lam
B. Kalf
C. Veulen
D. Kitten
Antwoord: A
51–75
Welk dier is de baby van een kat? A. Kitten
B. Lam
C. Kuiken
D. Kalf
Antwoord: A
Welk dier is de baby van een paard? A. Veulen
B. Puppy
C. Lam
D. Big
Antwoord: A
Welk dier is de baby van een varken? A. Big
B. Kalf
C. Kuiken
D. Kitten
Antwoord: A
Welk dier zegt “beeeh”? A. Schaap
B. Vis
C. Muis
D. Krokodil
Antwoord: A
Welk dier woont vaak in een hondenhok? A. Hond
B. Koe
C. Eend
D. Geit
Antwoord: A
Welk dier heeft klauwen en zegt soms “rauwr”? A. Leeuw
B. Konijn
C. Vis
D. Slak
Antwoord: A
Welk dier zwemt in een kom als huisdier? A. Goudvis
B. Eend
C. Kangoeroe
D. Geit
Antwoord: A
Welk dier heeft vaak zachte pootjes en snorharen? A. Kat
B. Koe
C. Kip
D. Schildpad
Antwoord: A
Welk dier draagt vaak een ruiter? A. Paard
B. Vis
C. Slak
D. Uil
Antwoord: A
Welk dier leeft in een mierennest? A. Mier
B. Dolfijn
C. Eend
D. Konijn
Antwoord: A
Welk dier houdt van kaas in verhaaltjes? A. Muis
B. Leeuw
C. Vis
D. Geit
Antwoord: A
Welk dier heeft een zachte vacht en lange oren? A. Konijn
B. Krokodil
C. Krab
D. Pinguïn
Antwoord: A
Welk dier leeft vaak in de sneeuw en op ijs? A. Pinguïn
B. Aap
C. Tijger
D. Paard
Antwoord: A
Welk dier kan heel hard brullen? A. Leeuw
B. Slak
C. Muis
D. Vis
Antwoord: A
Welk dier heeft hoeven? A. Paard
B. Kat
C. Kikker
D. Spin
Antwoord: A
Welk dier heeft stekels en rolt zich soms op? A. Egel
B. Schaap
C. Kangoeroe
D. Kip
Antwoord: A
Welk dier heeft een rode kam op zijn kop? A. Haan
B. Dolfijn
C. Schildpad
D. Muis
Antwoord: A
Welk dier wordt vaak wakker als het donker is? A. Uil
B. Kip
C. Koe
D. Paard
Antwoord: A
Welk dier leeft vaak in een aquarium? A. Vis
B. Geit
C. Kat
D. Aap
Antwoord: A
Welk dier kan aan een tak slingeren? A. Aap
B. Koe
C. Pinguïn
D. Eend
Antwoord: A
Welk dier heeft een lange pluimstaart en bewaart nootjes? A. Eekhoorn
B. Vis
C. Slang
D. Schaap
Antwoord: A
Welk dier heeft een rug vol bobbels en loopt in de woestijn? A. Kameel
B. Koe
C. Egel
D. Hond
Antwoord: A
Welk dier heeft een schild en kan langzaam lopen? A. Schildpad
B. Haas
C. Kat
D. Geit
Antwoord: A
Welk dier knipt met zijn scharen? A. Krab
B. Kip
C. Muis
D. Zebra
Antwoord: A
Welk dier hangt soms ondersteboven? A. Vleermuis
B. Konijn
C. Koe
D. Eend
Antwoord: A
76–100
Welk dier kan een web maken? A. Spin
B. Kikker
C. Paard
D. Pinguïn
Antwoord: A
Welk dier heeft een snavel? A. Eend
B. Hond
C. Kat
D. Konijn
Antwoord: A
Welk dier heet ook wel een poezenkind? A. Kitten
B. Kalf
C. Big
D. Veulen
Antwoord: A
Welk dier is groot en woont in zee? A. Walvis
B. Mier
C. Hamster
D. Kip
Antwoord: A
Welk dier blaft? A. Hond
B. Kat
C. Schaap
D. Koe
Antwoord: A
Welk dier spint als het blij is? A. Kat
B. Leeuw
C. Vis
D. Geit
Antwoord: A
Welk dier heeft veren? A. Vogel
B. Vis
C. Hond
D. Slang
Antwoord: A
Welk dier kan meestal vliegen? A. Vogel
B. Schildpad
C. Paard
D. Koe
Antwoord: A
Welk dier zegt “tok tok”? A. Kip
B. Kikker
C. Vis
D. Hond
Antwoord: A
Welk dier eet graag blaadjes hoog uit bomen? A. Giraffe
B. Muis
C. Slak
D. Krab
Antwoord: A
Welk dier leeft in de zee en heeft een staartvin? A. Dolfijn
B. Schaap
C. Haan
D. Mol
Antwoord: A
Welk dier heeft zwarte stippen en is rood? A. Lieveheersbeestje
B. Egel
C. Kikker
D. Slang
Antwoord: A
Welk dier kruipt heel langzaam? A. Slak
B. Haas
C. Paard
D. Hond
Antwoord: A
Welk dier heeft een lange tong en vangt vliegjes? A. Kikker
B. Paard
C. Kat
D. Zebra
Antwoord: A
Welk dier woont graag in een hok en piept? A. Hamster
B. Olifant
C. Kameel
D. Krokodil
Antwoord: A
Welk dier is geel en zegt “piep piep”? A. Kuiken
B. Big
C. Kalf
D. Lam
Antwoord: A
Welk dier heeft een wollige baby die lam heet? A. Schaap
B. Hond
C. Eend
D. Slang
Antwoord: A
Welk dier leeft vaak in een vijver en zwemt? A. Eend
B. Leeuw
C. Geit
D. Kameel
Antwoord: A
Welk dier heeft vaak snorharen en jaagt op muizen? A. Kat
B. Konijn
C. Schaap
D. Walvis
Antwoord: A
Welk dier heeft heel veel tandjes en zwemt in zee? A. Haai
B. Kip
C. Egel
D. Aap
Antwoord: A
Welk dier heeft een slurf en grote oren? A. Olifant
B. Kikker
C. Slak
D. Krab
Antwoord: A
Welk dier leeft graag in bomen en zegt soms “oe oe aa aa”? A. Aap
B. Geit
C. Pinguïn
D. Vis
Antwoord: A
Welk dier draagt een huisje op zijn rug? A. Schildpad
B. Leeuw
C. Krokodil
D. Paard
Antwoord: A
Welk dier heeft stekels, maar is geen cactus? A. Egel
B. Lam
C. Muis
D. Vis
Antwoord: A
Welk dier kan heel hoog springen met sterke achterpoten? A. Kangoeroe
B. Schildpad
C. Koe
D. Slak
Antwoord: A
101–125
Welk dier kan krijsen en praat soms woorden na? A. Papegaai
B. Schaap
C. Mol
D. Kalf
Antwoord: A
Welk dier woont op de boerderij en kraait in de ochtend? A. Haan
B. Vis
C. Kat
D. Beer
Antwoord: A
Welk dier is wit of bruin en geeft wol? A. Schaap
B. Hond
C. Uil
D. Dolfijn
Antwoord: A
Welk dier leeft in zee en heeft acht armen? A. Octopus
B. Koe
C. Zebra
D. Kuiken
Antwoord: A
Welk dier maakt een cocon en wordt later een vlinder? A. Rups
B. Vis
C. Geit
D. Eend
Antwoord: A
Welk dier vliegt van bloem naar bloem en is later een mooie vlieger? A. Vlinder
B. Krab
C. Paard
D. Kikker
Antwoord: A
Welk dier heeft een natte neus en kwispelt? A. Hond
B. Mier
C. Uil
D. Slak
Antwoord: A
Welk dier leeft in de sloot en heeft een gladde huid? A. Kikker
B. Leeuw
C. Zebra
D. Haan
Antwoord: A
Welk dier heeft een dikke vacht en kan brullen in de kou? A. Beer
B. Slak
C. Eend
D. Muis
Antwoord: A
Welk dier is klein, rood en zwart en landt op je hand? A. Lieveheersbeestje
B. Walvis
C. Kameel
D. Geit
Antwoord: A
Welk dier leeft vaak in een hok met stro en legt eieren? A. Kip
B. Koe
C. Muis
D. Vis
Antwoord: A
Welk dier zwemt in de zee en spuit water uit een gat bovenop? A. Walvis
B. Konijn
C. Slang
D. Kat
Antwoord: A
Welk dier heeft een lange staart en woont soms in de jungle? A. Aap
B. Schaap
C. Pinguïn
D. Egel
Antwoord: A
Welk dier heeft een kam en flappert met zijn vleugels op de boerderij? A. Haan
B. Kikker
C. Slak
D. Mol
Antwoord: A
Welk dier heeft strepen en lijkt een beetje op een paard? A. Zebra
B. Geit
C. Slang
D. Walvis
Antwoord: A
Welk dier woont in een korf en maakt honing? A. Bij
B. Koe
C. Poes
D. Kalf
Antwoord: A
Welk dier fladdert rond een lamp in de avond? A. Nachtvlinder
B. Hamster
C. Krab
D. Kameel
Antwoord: A
Welk dier glijdt over de grond zonder pootjes? A. Slang
B. Kip
C. Hond
D. Schaap
Antwoord: A
Welk dier heeft een snuit en wroet in de modder? A. Varken
B. Dolfijn
C. Uil
D. Zebra
Antwoord: A
Welk dier heeft een pluizige staart en springt van tak naar tak? A. Eekhoorn
B. Geit
C. Vis
D. Slak
Antwoord: A
Welk dier heeft grote tanden en bouwt dammen? A. Bever
B. Kikker
C. Schaap
D. Papegaai
Antwoord: A
Welk dier slaapt graag veel en vangt soms muizen? A. Kat
B. Koe
C. Eend
D. Giraffe
Antwoord: A
Welk dier heeft flippers en waddelt? A. Pinguïn
B. Haan
C. Mier
D. Aap
Antwoord: A
Welk dier woont vaak in een kooi en rent in een rad? A. Hamster
B. Geit
C. Paard
D. Krokodil
Antwoord: A
Welk dier hangt in een web en wacht op vliegjes? A. Spin
B. Kat
C. Koe
D. Leeuw
Antwoord: A
126–150
Welk dier heeft een hele lange nek om blaadjes te eten? A. Giraffe
B. Slak
C. Kip
D. Krab
Antwoord: A
Welk dier woont in zee en heeft een hard pantser? A. Krab
B. Schaap
C. Haan
D. Konijn
Antwoord: A
Welk dier heeft grote oren en stampt soms? A. Olifant
B. Muis
C. Vis
D. Kip
Antwoord: A
Welk dier heeft een zachte vacht en spitse oren? A. Kat
B. Schildpad
C. Kikker
D. Slang
Antwoord: A
Welk dier leeft op de boerderij en zegt “boe”? A. Koe
B. Uil
C. Aap
D. Vis
Antwoord: A
Welk dier kan heel snel rennen en heeft strepen of vlekken? A. Jachtluipaard
B. Slak
C. Kip
D. Egel
Antwoord: A
Welk dier klimt graag en heeft vaak een lange staart? A. Aap
B. Koe
C. Schaap
D. Krab
Antwoord: A
Welk dier leeft vaak in een stal en eet hooi? A. Paard
B. Vis
C. Eend
D. Bij
Antwoord: A
Welk dier is klein, piept en houdt soms van graantjes? A. Muis
B. Kameel
C. Walvis
D. Geit
Antwoord: A
Welk dier heeft een bek en zwemt in een vijver? A. Eend
B. Hond
C. Egel
D. Slang
Antwoord: A
Welk dier heeft een dikke huid en leeft soms in Afrika? A. Neushoorn
B. Kip
C. Vis
D. Slak
Antwoord: A
Welk dier heeft een groot bekje en leeft in de rivier? A. Nijlpaard
B. Muis
C. Haan
D. Hamster
Antwoord: A
Welk dier is groen en kan op een blad zitten? A. Kikker
B. Kameel
C. Zebra
D. Haan
Antwoord: A
Welk dier is klein, zwart en loopt in een rij? A. Mier
B. Walvis
C. Schaap
D. Pinguïn
Antwoord: A
Welk dier kruipt en heeft een slakkenhuis? A. Slak
B. Kalf
C. Haan
D. Paard
Antwoord: A
Welk dier heeft twee grote scharen in zee? A. Kreeft
B. Konijn
C. Koe
D. Kat
Antwoord: A
Welk dier springt van lelieblad naar lelieblad? A. Kikker
B. Hond
C. Kameel
D. Zebra
Antwoord: A
Welk dier leeft in zee en heeft een spitse rugvin? A. Haai
B. Kip
C. Lam
D. Geit
Antwoord: A
Welk dier heeft zachte veren en zegt “tok”? A. Kip
B. Slang
C. Krab
D. Hamster
Antwoord: A
Welk dier draagt soms mensen op zijn rug? A. Paard
B. Vis
C. Mier
D. Slak
Antwoord: A
Welk dier houdt van honing in verhaaltjes? A. Beer
B. Zebra
C. Walvis
D. Uil
Antwoord: A
Welk dier heeft een roze krulstaart? A. Varken
B. Kikker
C. Krokodil
D. Papegaai
Antwoord: A
Welk dier heeft zwarte en gele strepen en zoemt? A. Bij
B. Konijn
C. Muis
D. Schildpad
Antwoord: A
Welk dier woont graag in zee en heeft tentakels? A. Octopus
B. Egel
C. Koe
D. Haan
Antwoord: A
Welk dier is groot, bruin en kan in een bos leven? A. Beer
B. Slang
C. Mier
D. Hamster
Antwoord: A
151–175
Welk dier heeft een snavel en kan fluiten? A. Vogel
B. Koe
C. Paard
D. Vis
Antwoord: A
Welk dier heeft een pluizig kuikentje als baby? A. Kip
B. Geit
C. Hond
D. Kat
Antwoord: A
Welk dier heeft een natte huid en leeft bij water? A. Kikker
B. Leeuw
C. Kameel
D. Schaap
Antwoord: A
Welk dier heeft vinnen en schubben? A. Vis
B. Hond
C. Aap
D. Konijn
Antwoord: A
Welk dier heeft een slurf en sproeit water? A. Olifant
B. Muis
C. Geit
D. Kip
Antwoord: A
Welk dier is heel klein en maakt een web in een hoek? A. Spin
B. Haan
C. Zebra
D. Kalf
Antwoord: A
Welk dier heeft een wollige jas en zegt “beeeh”? A. Schaap
B. Krokodil
C. Slak
D. Uil
Antwoord: A
Welk dier knaagt graag en heeft grote voortanden? A. Bever
B. Eend
C. Koe
D. Pinguïn
Antwoord: A
Welk dier leeft in zee en zingt soms onder water? A. Walvis
B. Mier
C. Hamster
D. Geit
Antwoord: A
Welk dier rent graag in een wiel? A. Hamster
B. Leeuw
C. Zebra
D. Slang
Antwoord: A
Welk dier heeft een kleurrijke staart met veel veren? A. Pauw
B. Muis
C. Slak
D. Kikker
Antwoord: A
Welk dier heeft een harde rug en trekt zich terug in zijn schild? A. Schildpad
B. Hond
C. Haan
D. Geit
Antwoord: A
Welk dier heeft een bek vol tanden en woont in het water? A. Krokodil
B. Konijn
C. Muis
D. Schaap
Antwoord: A
Welk dier houdt van noten en heeft een pluimstaart? A. Eekhoorn
B. Vis
C. Kat
D. Walvis
Antwoord: A
Welk dier maakt vaak “oehoe”? A. Uil
B. Geit
C. Hond
D. Krab
Antwoord: A
Welk dier heeft vlekken en een lange nek? A. Giraffe
B. Pinguïn
C. Slak
D. Hamster
Antwoord: A
Welk dier springt hoog en draagt een baby in een buidel? A. Kangoeroe
B. Koe
C. Egel
D. Mier
Antwoord: A
Welk dier heeft scherpe klauwen en woont soms in de bergen? A. Adelaar
B. Schildpad
C. Konijn
D. Vis
Antwoord: A
Welk dier is een jong varken? A. Big
B. Kuiken
C. Lam
D. Puppy
Antwoord: A
Welk dier is een jong paard? A. Veulen
B. Kitten
C. Kalf
D. Big
Antwoord: A
Welk dier is een jong schaap? A. Lam
B. Puppy
C. Kuiken
D. Kalf
Antwoord: A
Welk dier is een jong koe? A. Kalf
B. Lam
C. Big
D. Veulen
Antwoord: A
Welk dier is een jong kat? A. Kitten
B. Puppy
C. Lam
D. Big
Antwoord: A
Welk dier is een jong hond? A. Puppy
B. Kuiken
C. Kalf
D. Veulen
Antwoord: A
Welk dier zegt “knor knor”? A. Varken
B. Uil
C. Dolfijn
D. Eend
Antwoord: A
176–200
Welk dier heeft vleugels en veren? A. Vogel
B. Hond
C. Kat
D. Slang
Antwoord: A
Welk dier leeft graag in een vijver en kwaakt? A. Kikker
B. Leeuw
C. Paard
D. Egel
Antwoord: A
Welk dier heeft een pluizige vacht en lange oren? A. Konijn
B. Krokodil
C. Krab
D. Pinguïn
Antwoord: A
Welk dier is heel groot en woont in de oceaan? A. Walvis
B. Mier
C. Slak
D. Hamster
Antwoord: A
Welk dier zoemt rond bloemen? A. Bij
B. Schaap
C. Haan
D. Vis
Antwoord: A
Welk dier heeft zwarte stippen en kan vliegen? A. Lieveheersbeestje
B. Egel
C. Kameel
D. Slang
Antwoord: A
Welk dier heeft een zachte pels en vangt muizen? A. Kat
B. Geit
C. Walvis
D. Krab
Antwoord: A
Welk dier heeft een slurf, maar geen neus zoals wij? A. Olifant
B. Haan
C. Kip
D. Vis
Antwoord: A
Welk dier woont vaak in een hok en knabbelt? A. Konijn
B. Krokodil
C. Dolfijn
D. Zebra
Antwoord: A
Welk dier kraait vroeg in de ochtend? A. Haan
B. Muis
C. Schaap
D. Haai
Antwoord: A
Welk dier leeft op het ijs en zwemt goed? A. Pinguïn
B. Geit
C. Aap
D. Egel
Antwoord: A
Welk dier heeft een mooie waaierstaart? A. Pauw
B. Krab
C. Kalf
D. Hond
Antwoord: A
Welk dier maakt een hol onder de grond? A. Mol
B. Eend
C. Walvis
D. Haan
Antwoord: A
Welk dier heeft een lange nek en eet blaadjes? A. Giraffe
B. Kikker
C. Slak
D. Kip
Antwoord: A
Welk dier glijdt door het gras? A. Slang
B. Hamster
C. Schaap
D. Uil
Antwoord: A
Welk dier springt op een tak en bewaart eikeltjes? A. Eekhoorn
B. Koe
C. Vis
D. Pinguïn
Antwoord: A
Welk dier draagt een dik schild op zijn rug? A. Schildpad
B. Kat
C. Muis
D. Geit
Antwoord: A
Welk dier heeft een grote bek en scherpe tanden in de rivier? A. Krokodil
B. Kuiken
C. Konijn
D. Lam
Antwoord: A
Welk dier heeft strepen en brult? A. Tijger
B. Schaap
C. Slak
D. Krab
Antwoord: A
Welk dier heeft een wollige baby die lam heet? A. Schaap
B. Vis
C. Geit
D. Haan
Antwoord: A
Welk dier loopt vaak in een rij met andere dezelfde dieren? A. Mier
B. Walvis
C. Zebra
D. Kat
Antwoord: A
Welk dier heeft een dikke vacht en woont soms in koude landen? A. IJsbeer
B. Krab
C. Eend
D. Slang
Antwoord: A
Welk dier heeft een krulstaart en ligt graag in modder? A. Varken
B. Uil
C. Haai
D. Aap
Antwoord: A
Welk dier kan goed zwemmen en klapt met zijn staart? A. Bever
B. Kip
C. Hamster
D. Geit
Antwoord: A
Welk dier is klein, heeft vleugels en maakt honing? A. Bij
B. Kat
C. Slak
D. Koe
Antwoord: A
201–225
Welk dier heeft een lange staart en kan hoog slingeren? A. Aap
B. Egel
C. Vis
D. Krab
Antwoord: A
Welk dier is groot, grijs en heeft dikke poten? A. Olifant
B. Mier
C. Kip
D. Slak
Antwoord: A
Welk dier eet graag gras in de wei? A. Koe
B. Haai
C. Uil
D. Pinguïn
Antwoord: A
Welk dier geeft zachte wol voor een trui? A. Schaap
B. Krab
C. Krokodil
D. Dolfijn
Antwoord: A
Welk dier heeft een pluizige staart en springt in bomen? A. Eekhoorn
B. Koe
C. Slak
D. Schildpad
Antwoord: A
Welk dier woont in zee en heeft een glimlachend gezicht? A. Dolfijn
B. Muis
C. Kip
D. Haan
Antwoord: A
Welk dier heeft een schelpachtig huisje op zijn rug? A. Schildpad
B. Hond
C. Leeuw
D. Walvis
Antwoord: A
Welk dier is klein, zacht en piept in een kooi? A. Hamster
B. Kangoeroe
C. Zebra
D. Kameel
Antwoord: A
Welk dier heeft twee grote oren en hopt? A. Konijn
B. Slang
C. Krab
D. Vis
Antwoord: A
Welk dier heeft een lange snuit en veel tanden in het water? A. Krokodil
B. Kat
C. Lam
D. Kuiken
Antwoord: A
Welk dier heeft een manen en lijkt op de koning van de dieren? A. Leeuw
B. Muis
C. Slak
D. Geit
Antwoord: A
Welk dier zwemt met vinnen in de kom? A. Goudvis
B. Haan
C. Paard
D. Egel
Antwoord: A
Welk dier fladdert kleurrijk in de tuin? A. Vlinder
B. Krab
C. Slang
D. Hamster
Antwoord: A
Welk dier heeft een rode kam en woont op de boerderij? A. Haan
B. Dolfijn
C. Walvis
D. Schildpad
Antwoord: A
Welk dier maakt een web tussen takken of in huis? A. Spin
B. Koe
C. Kikker
D. Pinguïn
Antwoord: A
Welk dier maakt “kwaak” en leeft bij water? A. Kikker
B. Geit
C. Kat
D. Uil
Antwoord: A
Welk dier is klein, zwart-geel en zoemt? A. Bij
B. Leeuw
C. Slak
D. Muis
Antwoord: A
Welk dier heeft een lange nek met vlekken? A. Giraffe
B. Krab
C. Hamster
D. Vis
Antwoord: A
Welk dier heeft een dikke grijze huid en een hoorn op zijn neus? A. Neushoorn
B. Schaap
C. Haan
D. Kalf
Antwoord: A
Welk dier woont op de boerderij en zegt “tok tok tok”? A. Kip
B. Vis
C. Slang
D. Mier
Antwoord: A
Welk dier heeft tentakels en leeft diep in zee? A. Octopus
B. Konijn
C. Koe
D. Geit
Antwoord: A
Welk dier draagt zijn baby in een buidel? A. Kangoeroe
B. Pinguïn
C. Haan
D. Slak
Antwoord: A
Welk dier hangt ondersteboven in een grot? A. Vleermuis
B. Kat
C. Schaap
D. Krab
Antwoord: A
Welk dier loopt langzaam en laat een slijmspoor achter? A. Slak
B. Leeuw
C. Geit
D. Vis
Antwoord: A
Welk dier heeft een mooie gekleurde staart en paradeert? A. Pauw
B. Muis
C. Egel
D. Kikker
Antwoord: A
226–250
Welk dier zegt “woef woef”? A. Hond
B. Kat
C. Eend
D. Koe
Antwoord: A
Welk dier zegt “miauw miauw”? A. Kat
B. Paard
C. Geit
D. Vis
Antwoord: A
Welk dier zegt “kwaak kwaak”? A. Eend
B. Hond
C. Schaap
D. Mier
Antwoord: A
Welk dier zegt “boe”? A. Koe
B. Slang
C. Krab
D. Uil
Antwoord: A
Welk dier zegt “beeeh”? A. Schaap
B. Dolfijn
C. Kangoeroe
D. Vis
Antwoord: A
Welk dier zegt “knor knor”? A. Varken
B. Zebra
C. Aap
D. Hamster
Antwoord: A
Welk dier zegt “tok tok”? A. Kip
B. Krab
C. Slak
D. Walvis
Antwoord: A
Welk dier zegt “hinnik”? A. Paard
B. Geit
C. Kat
D. Muis
Antwoord: A
Welk dier zegt “oehoe”? A. Uil
B. Koe
C. Eend
D. Kikker
Antwoord: A
Welk dier zoemt? A. Bij
B. Schildpad
C. Konijn
D. Schaap
Antwoord: A
Welk dier spint? A. Kat
B. Krokodil
C. Haan
D. Vis
Antwoord: A
Welk dier heeft een slurf? A. Olifant
B. Zebra
C. Kip
D. Mier
Antwoord: A
Welk dier heeft strepen? A. Zebra
B. Schaap
C. Hond
D. Slak
Antwoord: A
Welk dier heeft vlekken en een lange nek? A. Giraffe
B. Eend
C. Geit
D. Krab
Antwoord: A
Welk dier heeft een schild? A. Schildpad
B. Kat
C. Haan
D. Muis
Antwoord: A
Welk dier heeft stekels? A. Egel
B. Koe
C. Pinguïn
D. Vis
Antwoord: A
Welk dier maakt honing? A. Bij
B. Hamster
C. Walvis
D. Slang
Antwoord: A
Welk dier eet graag nootjes? A. Eekhoorn
B. Krokodil
C. Kip
D. Haai
Antwoord: A
Welk dier bewaart water in zijn lichaam en loopt in de woestijn? A. Kameel
B. Konijn
C. Uil
D. Mier
Antwoord: A
Welk dier heeft een grote bek en woont in Afrika? A. Nijlpaard
B. Haan
C. Hamster
D. Vis
Antwoord: A
Welk dier heeft een hoorn op zijn neus? A. Neushoorn
B. Schaap
C. Dolfijn
D. Kip
Antwoord: A
Welk dier heeft scherpe tanden en zwemt in zee? A. Haai
B. Konijn
C. Kalf
D. Slak
Antwoord: A
Welk dier is de koning van de jungle? A. Leeuw
B. Mier
C. Eend
D. Krab
Antwoord: A
Welk dier leeft in zee en springt vrolijk? A. Dolfijn
B. Geit
C. Haan
D. Muis
Antwoord: A
Welk dier hopt en heeft lange oren? A. Konijn
B. Schildpad
C. Krokodil
D. Vis
Antwoord: A
`;

const lines = text.split('\n').map(l => l.trim()).filter(l => l);
const questions = [];
let currentQuestion = null;

for (let i = 0; i < lines.length; i++) {
  const line = lines[i];
  if (line.match(/^\d+–\d+$/)) continue; // skip headers like 1-25

  if (line.startsWith('Welk dier') || line.startsWith('Wel dier')) {
    // New question
    // Sometimes the option A is on the same line: "Welk dier zegt “woef”? A. Kat"
    let qText = line;
    let optA = '';
    const match = line.match(/(.*?)\s+A\.\s+(.*)/);
    if (match) {
      qText = match[1];
      optA = match[2];
    }
    currentQuestion = {
      text: qText,
      options: [],
      answer: ''
    };
    if (optA) {
      currentQuestion.options.push({ letter: 'A', text: optA });
    }
    questions.push(currentQuestion);
  } else if (line.match(/^[A-D]\.\s+(.*)/)) {
    const match = line.match(/^([A-D])\.\s+(.*)/);
    if (currentQuestion) {
      currentQuestion.options.push({ letter: match[1], text: match[2] });
    }
  } else if (line.startsWith('Antwoord:')) {
    if (currentQuestion) {
      currentQuestion.answer = line.replace('Antwoord:', '').trim();
    }
  }
}

// Generate TS code
let tsCode = `import { Question } from './types';\n\nexport const ANIMAL_QUESTIONS_KIDS: Question[] = [\n`;

questions.forEach((q, idx) => {
  if (q.options.length !== 4) {
    console.log('Skipping invalid question:', q.text, q.options);
    return;
  }
  
  const correctOpt = q.options.find(o => o.letter === q.answer);
  const correctText = correctOpt ? correctOpt.text : '';
  
  tsCode += `  {
    id: 'user_animal_${idx + 1}',
    themeId: 'dieren',
    level: 'makkelijk',
    type: 'multiple-choice',
    text: "${q.text.replace(/"/g, '\\"')}",
    options: [
      { id: 'a', text: "${q.options[0].text.replace(/"/g, '\\"')}", isCorrect: ${q.answer === 'A'} },
      { id: 'b', text: "${q.options[1].text.replace(/"/g, '\\"')}", isCorrect: ${q.answer === 'B'} },
      { id: 'c', text: "${q.options[2].text.replace(/"/g, '\\"')}", isCorrect: ${q.answer === 'C'} },
      { id: 'd', text: "${q.options[3].text.replace(/"/g, '\\"')}", isCorrect: ${q.answer === 'D'} }
    ],
    explanation: "Dat klopt! Het goede antwoord is ${correctText}.",
    discussion: "Wat is jouw lievelingsdier?"
  },\n`;
});

tsCode += `];\n`;

fs.writeFileSync('src/data_animals.ts', tsCode);
console.log('Generated ' + questions.length + ' questions.');
