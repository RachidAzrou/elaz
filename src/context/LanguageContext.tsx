import { createContext, useContext, useState, type ReactNode } from 'react';

type Language = 'nl' | 'en' | 'fr';

interface LanguageContextType {
  language: Language;
  setLanguage: (lang: Language) => void;
  t: (key: string) => string;
}

const translations = {
  nl: {
    // Navigation
    'nav.about': 'Wie we zijn',
    'nav.initiatives': 'Initiatieven',
    'nav.approach': 'Aanpak',
    'nav.contact': 'Contact',
    
    // Hero
    'hero.tagline': 'Wij bouwen digitale oplossingen voor problemen die bedrijven elke dag voelen',
    'hero.description': 'Geen generieke software, maar gerichte producten die ontstaan uit operationele realiteit. We identificeren knelpunten zoals overbelasting, inefficiënte communicatie en manuele processen en vertalen die naar slimme, schaalbare oplossingen.',
    'hero.cta.primary': 'Bekijk onze initiatieven',
    'hero.cta.secondary': 'Neem contact op',
    
    // Who We Are
    'who.title': 'Wie we zijn',
    'who.p1': 'ELAZ Group wordt geleid door drie founders met een achtergrond in quality assurance en digitale innovatie. Samen hebben we meer dan twintig jaar ervaring in het analyseren en verbeteren van complexe systemen.',
    'who.p2': 'We hebben jarenlang gezien waar het fout loopt: niet bij de tools, maar in hoe processen werken onder druk. In de praktijk breken systemen op de momenten dat ze net moeten standhouden.',
    'who.p3': 'Dat inzicht bepaalt hoe wij vandaag bouwen.',
    'who.p4': 'We combineren onze QA-ervaring met kennis in AI en business architectuur om oplossingen te ontwikkelen die niet alleen technisch kloppen, maar ook effectief werken in de realiteit van de werkvloer.',
    'who.founder1.name': 'Hassan Lajhad',
    'who.founder1.role': 'Co-founder — Technology & AI Implementation',
    'who.founder2.name': 'Rachid Azrou',
    'who.founder2.role': 'Co-founder — Product & AI Architecture',
    'who.founder3.name': 'Jawad El Khalki',
    'who.founder3.role': 'Co-founder — Product Operations & QA',
    'who.foundersTagline': 'Samen meer dan 20 jaar ervaring in het analyseren en verbeteren van kritische systemen onder operationele druk.',
    
    // How We Work
    'how.title': 'Onze aanpak',
    'how.intro': 'Wij vertrekken niet vanuit hoe processen zouden moeten werken, maar vanuit hoe ze effectief werken.',
    'how.step1.title': 'Waar loopt het fout',
    'how.step1.desc': 'We identificeren waar systemen breken onder druk.',
    'how.step2.title': 'Begrijpen',
    'how.step2.desc': 'We analyseren hoe processen vandaag in de praktijk verlopen.',
    'how.step3.title': 'Hoe wordt er echt gewerkt',
    'how.step3.desc': 'We kijken naar de realiteit, niet naar documentatie.',
    'how.step4.title': 'Wat werkt wel / niet',
    'how.step4.desc': 'We valideren met mensen op de werkvloer.',
    'how.step5.title': 'Wat moet er veranderen',
    'how.step5.desc': 'We bouwen oplossingen die aansluiten op bestaande gewoontes.',
    'how.step6.title': 'Blijven verbeteren',
    'how.step6.desc': 'We sturen continu bij op basis van gebruik.',
    
    // Initiatives
    'initiatives.title': 'Huidige initiatieven',
    'initiatives.sonexa.label': 'GEZONDHEIDSZORG',
    'initiatives.sonexa.body': 'Sonexa richt zich op het structureren van telefonische en administratieve workflows in medische praktijken, vertrekkend vanuit de realiteit van de dagelijkse werking.',
    'initiatives.cta': 'Bekijk initiatief',

    // Sonexa page
    'sonexa.badge': 'Onderzoek · Medische praktijken',
    'sonexa.hero.headline': 'De telefoon blijft gaan.\nAdministratie stapelt zich op tussen consultaties.',
    'sonexa.hero.sub':
      'In veel praktijken zien we hetzelfde terugkomen.\nWe spreken met artsen en teams om te begrijpen waar het vastloopt.\nEerst begrijpen wat er echt speelt, daarna pas oplossingen.',
    'sonexa.hero.ctaSurvey': 'Deel uw ervaring (\u00b14 min)',
    'sonexa.hero.ctaContact': 'Liever een kort gesprek?',
    'sonexa.trust.t1': 'Gericht op medische praktijken',
    'sonexa.trust.t2': 'Vertrekt vanuit de praktijk',
    'sonexa.trust.t3': 'Geen vaste oplossing vooraf',

    'sonexa.survey.label': 'Bevraging',
    'sonexa.survey.title': 'Herkent u dit in uw praktijk?',
    'sonexa.survey.p1': 'Telefoons die consultaties onderbreken. Administratie die tussendoor moet. Terugbelverzoeken die blijven liggen.',
    'sonexa.survey.p2': 'Via een korte bevraging willen we begrijpen waar de druk het grootst is en wat als eerste aandacht verdient.',
    'sonexa.survey.cta': 'Deel uw ervaring (\u00b14 min)',
    'sonexa.survey.note1': 'Duurt slechts enkele minuten',
    'sonexa.survey.note2': 'Geen opvolging zonder uw toestemming',
    'sonexa.survey.note3': 'Resultaten worden gedeeld met deelnemers',

    'sonexa.context.title': 'Waarom dit onderzoek',
    'sonexa.context.p1': 'In veel praktijken blijft de telefoon een terugkerende bron van onderbreking. Afspraken, voorschriften, uitslagen en terugbelverzoeken komen verspreid binnen, vaak op de drukste momenten.',
    'sonexa.context.p2': 'Dat is niet uitzonderlijk. We zien dit patroon in meerdere praktijken terugkomen. Sonexa wil deze realiteit in kaart brengen op basis van wat praktijken zelf ervaren.',

    'sonexa.focus.title': 'Wat we vandaag doen',
    'sonexa.focus.lead': 'Sonexa zit in een fase van onderzoek. We werken samen met praktijken om:',
    'sonexa.focus.li1': 'Terugkerende telefonische en administratieve patronen in kaart te brengen',
    'sonexa.focus.li2': 'Te begrijpen hoe praktijken dit vandaag opvangen',
    'sonexa.focus.li3': 'Knelpunten te zien tijdens piekmomenten',
    'sonexa.focus.li4': 'Zicht te krijgen op waar processen vertragen',
    'sonexa.focus.footer': 'We vertrekken vanuit de praktijk, niet vanuit aannames.',

    'sonexa.how.title': 'Onze werkwijze',
    'sonexa.how.step1.title': 'Luisteren',
    'sonexa.how.step1.desc': 'Gesprekken met praktijken over wat dagelijks druk geeft.',
    'sonexa.how.step2.title': 'Analyseren',
    'sonexa.how.step2.desc': 'Concrete situaties en werkwijzen in kaart brengen.',
    'sonexa.how.step3.title': 'Valideren',
    'sonexa.how.step3.desc': 'Inzichten toetsen bij wie het dagelijks ervaart.',
    'sonexa.how.step4.title': 'Vertalen',
    'sonexa.how.step4.desc': 'Stap voor stap richting toepasbare oplossingen.',

    'sonexa.future.title': 'Waar dit naartoe leidt',
    'sonexa.future.lead': 'Op basis van wat we horen willen we werken aan oplossingen die:',
    'sonexa.future.li1': 'Administratieve druk verlagen',
    'sonexa.future.li2': 'Telefonische belasting beter organiseren',
    'sonexa.future.li3': 'Aansluiten op hoe er vandaag gewerkt wordt',
    'sonexa.future.li4': 'De controle in de praktijk laten',
    'sonexa.future.footer': 'We bouwen pas als de realiteit voldoende duidelijk is.',

    'sonexa.who.title': 'Voor wie is dit relevant',
    'sonexa.who.li1': 'Huisartsenpraktijken',
    'sonexa.who.li1.desc': 'Waar de telefoon continu rinkelt tussen consulten door.',
    'sonexa.who.li2': 'Groepspraktijken',
    'sonexa.who.li2.desc': 'Waar co\u00f6rdinatie en administratie over meerdere artsen loopt.',
    'sonexa.who.li3': 'Specialistenpraktijken',
    'sonexa.who.li3.desc': 'Waar planning en terugbelverzoeken structureel druk geven.',
    'sonexa.who.li4': 'Tandartspraktijken',
    'sonexa.who.li4.desc': 'Waar afspraken, spoedvragen en administratie elkaar voortdurend kruisen.',

    'sonexa.closing.title': 'Liever een gesprek?',
    'sonexa.closing.body': 'Vult u liever geen formulier in? Dat begrijpen we. Praktijken die hun ervaring mondeling willen delen of willen meedenken, zijn welkom om contact op te nemen.',
    'sonexa.closing.ctaContact': 'Neem contact op',
    'sonexa.closing.ctaPlan': 'Plan een kort gesprek',

    // Contact
    'contact.title': 'Contact',
    'contact.body': 'Voor vragen of samenwerkingen:',
    'contact.email': 'contact@elazgroup.com',
    'contact.company': 'ELAZ GROUP',
    'contact.legalForm': 'VOF',
    'contact.vatNumber': 'BE1034.408.394',
    'contact.location': 'Antwerpen, België',
    'contact.lblAddress': 'Adres',
    'contact.lblEmail': 'E-mailadres',
    'contact.lblEnterprise': 'Ondernemingsnummer',
    'contact.enterpriseNumber': '1034.408.394',
    'contact.lblPhone': 'Telefoon',
    'contact.mapOpen': 'Openen in Google Maps',
    'contact.address': 'Uitbreidingstraat 84\n2600 Antwerpen\nBelgië',
    'contact.phone': '',
    'contact.form.name': 'Naam',
    'contact.form.email': 'E-mail',
    'contact.form.company': 'Organisatie (optioneel)',
    'contact.form.message': 'Bericht',
    'contact.form.submit': 'Verstuur bericht',
    'contact.form.hint': 'Opent uw e-mailapp met een voorbereid bericht aan contact@elazgroup.com.',
    'contact.form.errorRequired': 'Vul naam, e-mail en bericht in.',
    'contact.form.errorEmail': 'Geef een geldig e-mailadres op.',

    // Privacy policy
    'privacy.docTitle': 'Privacybeleid — ELAZ Group',
    'privacy.eyebrow': 'PRIVACYBELEID',
    'privacy.title': 'Privacybeleid',
    'privacy.updated': 'Laatst bijgewerkt: 15/02/2026',
    'privacy.intro.p1':
      'ELAZ GROUP VOF hecht belang aan de bescherming van uw persoonsgegevens en respecteert uw privacy.',
    'privacy.intro.p2':
      'Dit privacybeleid beschrijft hoe wij persoonsgegevens verzamelen, gebruiken en beschermen via onze website.',
    'privacy.s1.title': '1. Verantwoordelijke voor de verwerking',
    'privacy.s1.line1': 'ELAZ GROUP VOF',
    'privacy.s1.line2': 'Uitbreidingstraat 84',
    'privacy.s1.line3': '2600 Antwerpen',
    'privacy.s1.line4': 'België',
    'privacy.s1.vat': 'Ondernemingsnummer / BTW: BE 1034.408.394',
    'privacy.s1.emailLabel': 'E-mail:',
    'privacy.s1.email': 'contact@elazgroup.com',
    'privacy.s2.title': '2. Welke gegevens wij verzamelen',
    'privacy.s2.p1':
      'Wij verzamelen enkel persoonsgegevens die u vrijwillig verstrekt via onze website.',
    'privacy.s2.surveyTitle': 'Enquête (Sonexa initiatief)',
    'privacy.s2.survey.p1': 'Via de bevraging kunnen volgende gegevens worden verzameld:',
    'privacy.s2.survey.bullet1': 'e-mailadres (optioneel)',
    'privacy.s2.survey.p2': 'Het invullen van uw e-mailadres is niet verplicht.',
    'privacy.s2.survey.p3':
      'Wij verzamelen geen naam, telefoonnummer of andere identificerende gegevens via de enquête.',
    'privacy.s3.title': '3. Doeleinden van de verwerking',
    'privacy.s3.intro': 'Wij verwerken uw gegevens uitsluitend voor de volgende doeleinden:',
    'privacy.s3.li1': 'het analyseren van input in het kader van het Sonexa initiatief',
    'privacy.s3.li2': 'het beter begrijpen van operationele uitdagingen in medische praktijken',
    'privacy.s3.li3':
      'het eventueel contacteren van u indien u vrijwillig uw e-mailadres heeft opgegeven',
    'privacy.s3.footer': 'Uw gegevens worden niet gebruikt voor marketingdoeleinden.',
    'privacy.s4.title': '4. Rechtsgrond',
    'privacy.s4.p1': 'De verwerking van uw persoonsgegevens gebeurt op basis van:',
    'privacy.s4.li1':
      'uw toestemming (bij het vrijwillig invullen van de enquête en eventueel opgeven van uw e-mailadres)',
    'privacy.s5.title': '5. Bewaartermijn',
    'privacy.s5.p1':
      'Uw gegevens worden niet langer bewaard dan noodzakelijk voor de hierboven vermelde doeleinden.',
    'privacy.s5.concrete': 'Concreet:',
    'privacy.s5.li1':
      'enquêtegegevens worden bewaard zolang ze relevant zijn voor het onderzoeks- en validatietraject van Sonexa',
    'privacy.s5.li2': 'contactgegevens (indien opgegeven) worden verwijderd zodra ze niet langer nodig zijn',
    'privacy.s6.title': '6. Delen van gegevens met derden',
    'privacy.s6.p1':
      'Uw gegevens worden niet verkocht of gedeeld met externe partijen voor commerciële doeleinden.',
    'privacy.s6.tech': 'Technisch kunnen gegevens worden verwerkt via:',
    'privacy.s6.li1': 'Supabase (database en opslaginfrastructuur)',
    'privacy.s6.footer':
      'Wij zorgen ervoor dat deze verwerking gebeurt conform de geldende privacywetgeving.',
    'privacy.s7.title': '7. Beveiliging',
    'privacy.s7.intro':
      'Wij nemen passende technische en organisatorische maatregelen om uw persoonsgegevens te beschermen tegen:',
    'privacy.s7.li1': 'ongeoorloofde toegang',
    'privacy.s7.li2': 'verlies',
    'privacy.s7.li3': 'misbruik',
    'privacy.s8.title': '8. Uw rechten',
    'privacy.s8.intro': 'U heeft het recht om:',
    'privacy.s8.li1': 'inzage te krijgen in uw persoonsgegevens',
    'privacy.s8.li2': 'correctie te vragen van onjuiste gegevens',
    'privacy.s8.li3': 'verwijdering van uw gegevens te vragen',
    'privacy.s8.li4': 'bezwaar te maken tegen verwerking',
    'privacy.s8.contact': 'U kan hiervoor contact opnemen via:',
    'privacy.s8.email': 'contact@elazgroup.com',
    'privacy.s9.title': '9. Wijzigingen',
    'privacy.s9.p1': 'ELAZ GROUP VOF behoudt zich het recht voor dit privacybeleid te wijzigen.',
    'privacy.s9.p2': 'De meest recente versie is steeds beschikbaar op de website.',
    // Cookie policy & banner
    'cookies.docTitle': 'Cookiebeleid — ELAZ Group',
    'cookies.eyebrow': 'COOKIEBELEID',
    'cookies.title': 'Cookiebeleid',
    'cookies.updated': 'Laatst bijgewerkt: 3 april 2026',
    'cookies.intro':
      'Deze website maakt uitsluitend gebruik van functionele cookies.',
    'cookies.s1.title': '1. Wat zijn cookies',
    'cookies.s1.p1':
      'Cookies zijn kleine tekstbestanden die op uw toestel worden geplaatst wanneer u een website bezoekt.',
    'cookies.s1.p2': 'Ze zorgen ervoor dat de website correct functioneert.',
    'cookies.s2.title': '2. Welke cookies gebruiken wij',
    'cookies.s2.intro':
      'Wij gebruiken enkel functionele cookies die noodzakelijk zijn voor:',
    'cookies.s2.li1': 'het correct laden van de website',
    'cookies.s2.li2': 'basisfunctionaliteiten',
    'cookies.s2.footer':
      'Deze cookies verzamelen geen persoonsgegevens en worden niet gebruikt voor tracking.',
    'cookies.s3.title': '3. Geen tracking of marketingcookies',
    'cookies.s3.intro': 'Deze website maakt geen gebruik van:',
    'cookies.s3.li1': 'analytische cookies (zoals Google Analytics)',
    'cookies.s3.li2': 'marketingcookies',
    'cookies.s3.li3': 'trackingtools',
    'cookies.s3.footer': 'Uw surfgedrag wordt niet gevolgd.',
    'cookies.s4.title': '4. Beheer van cookies',
    'cookies.s4.p1':
      'Omdat wij enkel functionele cookies gebruiken, is toestemming niet vereist.',
    'cookies.s4.p2':
      'U kan cookies wel zelf beheren of verwijderen via uw browserinstellingen.',
    'cookies.s5.title': '5. Contact',
    'cookies.s5.p1': 'Voor vragen over dit cookiebeleid kan u contact opnemen via:',
    'cookies.s5.email': 'contact@elazgroup.com',
    'cookies.banner.p1':
      'Wij gebruiken enkel functionele cookies die noodzakelijk zijn voor het correct functioneren van deze website.',
    'cookies.banner.p2': 'Er worden geen tracking- of marketingcookies gebruikt.',
    'cookies.banner.p3':
      'Voor meer informatie kan u ons cookiebeleid raadplegen.',
    'cookies.banner.more': 'Meer info',
    'cookies.banner.ok': 'OK',

    // Footer
    'footer.privacy': 'Privacy',
    'footer.cookies': 'Cookiebeleid',
    'footer.copyright': '© 2026 ELAZ Group. Alle rechten voorbehouden.',
  },
  
  en: {
    // Navigation
    'nav.about': 'Who we are',
    'nav.initiatives': 'Initiatives',
    'nav.approach': 'Approach',
    'nav.contact': 'Contact',
    
    // Hero
    'hero.tagline': 'We build digital solutions for problems businesses feel every day',
    'hero.description': 'No generic software: targeted products born from operational reality. We spot bottlenecks like overload, inefficient communication, and manual work and turn them into smart, scalable solutions.',
    'hero.cta.primary': 'Explore our initiatives',
    'hero.cta.secondary': 'Get in touch',
    
    // Who We Are
    'who.title': 'Who we are',
    'who.p1': 'ELAZ Group is led by three founders with a background in quality assurance and digital innovation. Together we have more than twenty years of experience analyzing and improving complex systems.',
    'who.p2': 'Over the years we have seen where things go wrong: not with the tools, but in how processes behave under pressure. In practice, systems fail at the moments they are supposed to hold up.',
    'who.p3': 'That insight shapes how we build today.',
    'who.p4': 'We combine our QA experience with knowledge in AI and business architecture to develop solutions that are not only technically sound, but also effective on the shop floor.',
    'who.founder1.name': 'Hassan Lajhad',
    'who.founder1.role': 'Co-founder — Technology & AI Implementation',
    'who.founder2.name': 'Rachid Azrou',
    'who.founder2.role': 'Co-founder — Product & AI Architecture',
    'who.founder3.name': 'Jawad El Khalki',
    'who.founder3.role': 'Co-founder — Product Operations & QA',
    'who.foundersTagline': 'Together, more than 20 years of experience analyzing and improving critical systems under operational pressure.',
    
    // How We Work
    'how.title': 'How we approach problems',
    'how.intro': 'We start from how processes actually work, not from how they are supposed to work on paper.',
    'how.step1.title': 'Where it breaks',
    'how.step1.desc': 'We identify where systems fail under pressure.',
    'how.step2.title': 'Understand',
    'how.step2.desc': 'We analyze how processes run in practice today.',
    'how.step3.title': 'How work really happens',
    'how.step3.desc': 'We look at reality, not documentation.',
    'how.step4.title': 'What works / what does not',
    'how.step4.desc': 'We validate with people on the ground.',
    'how.step5.title': 'What needs to change',
    'how.step5.desc': 'We build solutions that fit existing habits.',
    'how.step6.title': 'Keep improving',
    'how.step6.desc': 'We continuously adjust based on usage.',
    
    // Initiatives
    'initiatives.title': 'Current initiatives',
    'initiatives.sonexa.label': 'HEALTHCARE',
    'initiatives.sonexa.body': 'Sonexa focuses on structuring telephone and administrative workflows in medical practices, grounded in the day-to-day reality of how they operate.',
    'initiatives.cta': 'View initiative',

    // Sonexa page
    'sonexa.badge': 'Research · Medical practices',
    'sonexa.hero.headline': 'The phone keeps ringing.\nAdmin piles up between consultations.',
    'sonexa.hero.sub':
      'We see the same patterns coming back in many practices.\nWe speak with doctors and teams to understand where things get stuck.\nFirst understand what is really going on, then solutions.',
    'sonexa.hero.ctaSurvey': 'Share your experience (±4 min)',
    'sonexa.hero.ctaContact': 'Prefer a short conversation?',
    'sonexa.trust.t1': 'Focused on medical practices',
    'sonexa.trust.t2': 'Starting from the field',
    'sonexa.trust.t3': 'No fixed solution upfront',

    'sonexa.survey.label': 'Survey',
    'sonexa.survey.title': 'Do you recognize this in your practice?',
    'sonexa.survey.p1': 'Phones interrupting consultations. Admin squeezed between patients. Callbacks piling up.',
    'sonexa.survey.p2': 'Through a short survey we want to understand where pressure is highest and what deserves attention first.',
    'sonexa.survey.cta': 'Share your experience (\u00b14 min)',
    'sonexa.survey.note1': 'Takes only a few minutes',
    'sonexa.survey.note2': 'No follow-up without your consent',
    'sonexa.survey.note3': 'Results shared with participants',

    'sonexa.context.title': 'Why this research',
    'sonexa.context.p1': 'In many practices, the phone remains a recurring source of interruption. Appointments, prescriptions, results and callbacks come in throughout the day, often at the busiest moments.',
    'sonexa.context.p2': 'That is not unusual. We see this pattern across multiple practices. Sonexa wants to map this reality based on what practices themselves experience.',

    'sonexa.focus.title': 'What we are doing today',
    'sonexa.focus.lead': 'Sonexa is in a research phase. We work with practices to:',
    'sonexa.focus.li1': 'Map recurring telephone and administrative patterns',
    'sonexa.focus.li2': 'Understand how practices handle this today',
    'sonexa.focus.li3': 'Identify bottlenecks during peak moments',
    'sonexa.focus.li4': 'See where processes slow down',
    'sonexa.focus.footer': 'We start from the practice, not from assumptions.',

    'sonexa.how.title': 'Our approach',
    'sonexa.how.step1.title': 'Listen',
    'sonexa.how.step1.desc': 'Talking with practices about what creates daily pressure.',
    'sonexa.how.step2.title': 'Analyze',
    'sonexa.how.step2.desc': 'Mapping concrete situations and ways of working.',
    'sonexa.how.step3.title': 'Validate',
    'sonexa.how.step3.desc': 'Testing findings with those who experience them daily.',
    'sonexa.how.step4.title': 'Translate',
    'sonexa.how.step4.desc': 'Step by step toward applicable solutions.',

    'sonexa.future.title': 'Where this leads',
    'sonexa.future.lead': 'Based on what we hear, we want to work toward solutions that:',
    'sonexa.future.li1': 'Reduce administrative pressure',
    'sonexa.future.li2': 'Better organize telephone load',
    'sonexa.future.li3': 'Fit how work is done today',
    'sonexa.future.li4': 'Keep control within the practice',
    'sonexa.future.footer': 'We only build once the reality is clear enough.',

    'sonexa.who.title': 'Who this is for',
    'sonexa.who.li1': 'General practices',
    'sonexa.who.li1.desc': 'Where the phone keeps ringing between consultations.',
    'sonexa.who.li2': 'Group practices',
    'sonexa.who.li2.desc': 'Where coordination and admin runs across multiple doctors.',
    'sonexa.who.li3': 'Specialist practices',
    'sonexa.who.li3.desc': 'Where scheduling and callbacks create ongoing pressure.',
    'sonexa.who.li4': 'Dental practices',
    'sonexa.who.li4.desc': 'Where appointments, urgent requests and admin constantly overlap.',

    'sonexa.closing.title': 'Prefer a conversation?',
    'sonexa.closing.body': 'Rather not fill in a form? We understand. Practices that prefer to share their experience verbally or want to think along are welcome to get in touch.',
    'sonexa.closing.ctaContact': 'Get in touch',
    'sonexa.closing.ctaPlan': 'Schedule a short call',

    // Contact
    'contact.title': 'Contact',
    'contact.body': 'For questions or collaboration inquiries:',
    'contact.email': 'contact@elazgroup.com',
    'contact.company': 'ELAZ GROUP',
    'contact.legalForm': 'VOF',
    'contact.vatNumber': 'BE1034.408.394',
    'contact.location': 'Antwerp, Belgium',
    'contact.lblAddress': 'Address',
    'contact.lblEmail': 'Email address',
    'contact.lblEnterprise': 'Company number',
    'contact.enterpriseNumber': '1034.408.394',
    'contact.lblPhone': 'Phone',
    'contact.mapOpen': 'Open in Google Maps',
    'contact.address': 'Uitbreidingstraat 84\n2600 Antwerp\nBelgium',
    'contact.phone': '',
    'contact.form.name': 'Name',
    'contact.form.email': 'Email',
    'contact.form.company': 'Organization (optional)',
    'contact.form.message': 'Message',
    'contact.form.submit': 'Send message',
    'contact.form.hint': 'Opens your email app with a draft to contact@elazgroup.com.',
    'contact.form.errorRequired': 'Please fill in name, email, and message.',
    'contact.form.errorEmail': 'Please enter a valid email address.',

    // Privacy policy
    'privacy.docTitle': 'Privacy Policy — ELAZ Group',
    'privacy.eyebrow': 'PRIVACY POLICY',
    'privacy.title': 'Privacy policy',
    'privacy.updated': 'Last updated: 15/02/2026',
    'privacy.intro.p1':
      'ELAZ GROUP VOF is committed to protecting your personal data and respects your privacy.',
    'privacy.intro.p2':
      'This privacy policy describes how we collect, use, and protect personal data through our website.',
    'privacy.s1.title': '1. Data controller',
    'privacy.s1.line1': 'ELAZ GROUP VOF',
    'privacy.s1.line2': 'Uitbreidingstraat 84',
    'privacy.s1.line3': '2600 Antwerp',
    'privacy.s1.line4': 'Belgium',
    'privacy.s1.vat': 'Company / VAT number: BE 1034.408.394',
    'privacy.s1.emailLabel': 'Email:',
    'privacy.s1.email': 'contact@elazgroup.com',
    'privacy.s2.title': '2. Data we collect',
    'privacy.s2.p1':
      'We only collect personal data that you voluntarily provide through our website.',
    'privacy.s2.surveyTitle': 'Survey (Sonexa initiative)',
    'privacy.s2.survey.p1': 'Through the survey, the following data may be collected:',
    'privacy.s2.survey.bullet1': 'email address (optional)',
    'privacy.s2.survey.p2': 'Providing your email address is not mandatory.',
    'privacy.s2.survey.p3':
      'We do not collect name, phone number, or other identifying data through the survey.',
    'privacy.s3.title': '3. Purposes of processing',
    'privacy.s3.intro': 'We process your data solely for the following purposes:',
    'privacy.s3.li1': 'analysing input in the context of the Sonexa initiative',
    'privacy.s3.li2': 'better understanding operational challenges in medical practices',
    'privacy.s3.li3':
      'contacting you if you have voluntarily provided your email address',
    'privacy.s3.footer': 'Your data is not used for marketing purposes.',
    'privacy.s4.title': '4. Legal basis',
    'privacy.s4.p1': 'Processing of your personal data is based on:',
    'privacy.s4.li1':
      'your consent (when you voluntarily complete the survey and optionally provide your email address)',
    'privacy.s5.title': '5. Retention period',
    'privacy.s5.p1':
      'We keep your data no longer than necessary for the purposes described above.',
    'privacy.s5.concrete': 'Specifically:',
    'privacy.s5.li1':
      'survey data are retained for as long as they are relevant to the Sonexa research and validation track',
    'privacy.s5.li2':
      'contact details (if provided) are deleted as soon as they are no longer needed',
    'privacy.s6.title': '6. Sharing data with third parties',
    'privacy.s6.p1':
      'Your data are not sold or shared with external parties for commercial purposes.',
    'privacy.s6.tech': 'Technically, data may be processed via:',
    'privacy.s6.li1': 'Supabase (database and storage infrastructure)',
    'privacy.s6.footer':
      'We ensure that such processing complies with applicable privacy legislation.',
    'privacy.s7.title': '7. Security',
    'privacy.s7.intro':
      'We implement appropriate technical and organisational measures to protect your personal data against:',
    'privacy.s7.li1': 'unauthorised access',
    'privacy.s7.li2': 'loss',
    'privacy.s7.li3': 'misuse',
    'privacy.s8.title': '8. Your rights',
    'privacy.s8.intro': 'You have the right to:',
    'privacy.s8.li1': 'access your personal data',
    'privacy.s8.li2': 'request correction of inaccurate data',
    'privacy.s8.li3': 'request erasure of your data',
    'privacy.s8.li4': 'object to processing',
    'privacy.s8.contact': 'You can contact us at:',
    'privacy.s8.email': 'contact@elazgroup.com',
    'privacy.s9.title': '9. Changes',
    'privacy.s9.p1': 'ELAZ GROUP VOF reserves the right to change this privacy policy.',
    'privacy.s9.p2': 'The most recent version is always available on the website.',
    // Cookie policy & banner
    'cookies.docTitle': 'Cookie Policy — ELAZ Group',
    'cookies.eyebrow': 'COOKIE POLICY',
    'cookies.title': 'Cookie policy',
    'cookies.updated': 'Last updated: 3 April 2026',
    'cookies.intro': 'This website uses only functional cookies.',
    'cookies.s1.title': '1. What are cookies',
    'cookies.s1.p1':
      'Cookies are small text files placed on your device when you visit a website.',
    'cookies.s1.p2': 'They allow the website to work correctly.',
    'cookies.s2.title': '2. Which cookies we use',
    'cookies.s2.intro': 'We use only functional cookies that are necessary for:',
    'cookies.s2.li1': 'loading the website correctly',
    'cookies.s2.li2': 'basic functionality',
    'cookies.s2.footer':
      'These cookies do not collect personal data and are not used for tracking.',
    'cookies.s3.title': '3. No tracking or marketing cookies',
    'cookies.s3.intro': 'This website does not use:',
    'cookies.s3.li1': 'analytics cookies (such as Google Analytics)',
    'cookies.s3.li2': 'marketing cookies',
    'cookies.s3.li3': 'tracking tools',
    'cookies.s3.footer': 'Your browsing behaviour is not tracked.',
    'cookies.s4.title': '4. Managing cookies',
    'cookies.s4.p1':
      'Because we only use functional cookies, consent is not required.',
    'cookies.s4.p2':
      'You can still manage or delete cookies yourself through your browser settings.',
    'cookies.s5.title': '5. Contact',
    'cookies.s5.p1': 'For questions about this cookie policy, you can contact us at:',
    'cookies.s5.email': 'contact@elazgroup.com',
    'cookies.banner.p1':
      'We use only functional cookies that are necessary for this website to work correctly.',
    'cookies.banner.p2': 'We do not use tracking or marketing cookies.',
    'cookies.banner.p3': 'For more information, please read our cookie policy.',
    'cookies.banner.more': 'More info',
    'cookies.banner.ok': 'OK',

    // Footer
    'footer.privacy': 'Privacy',
    'footer.cookies': 'Cookie policy',
    'footer.copyright': '© 2026 ELAZ Group. All rights reserved.',
  },
  
  fr: {
    // Navigation
    'nav.about': 'À propos',
    'nav.initiatives': 'Initiatives',
    'nav.approach': 'Approche',
    'nav.contact': 'Contact',
    
    // Hero
    'hero.tagline': 'Nous créons des solutions numériques pour les problèmes que les entreprises vivent au quotidien',
    'hero.description': 'Pas de logiciel générique : des produits ciblés, issus de la réalité opérationnelle. Nous identifions les goulots d\'étranglement comme la surcharge, la communication inefficace et les processus manuels, et nous les transformons en solutions intelligentes et évolutives.',
    'hero.cta.primary': 'Découvrir nos initiatives',
    'hero.cta.secondary': 'Nous contacter',
    
    // Who We Are
    'who.title': 'Qui nous sommes',
    'who.p1': 'ELAZ Group est dirigé par trois fondateurs issus de l\'assurance qualité et de l\'innovation numérique. Ensemble, nous avons plus de vingt ans d\'expérience dans l\'analyse et l\'amélioration de systèmes complexes.',
    'who.p2': 'Pendant des années, nous avons vu où ça bloque : pas dans les outils, mais dans le fonctionnement des processus sous pression. Concrètement, les systèmes lâchent au moment où ils devraient tenir.',
    'who.p3': 'Ce constat détermine comment nous construisons aujourd\'hui.',
    'who.p4': 'Nous combinons notre expérience QA avec des compétences en IA et en architecture d\'entreprise pour développer des solutions qui sont non seulement solides techniquement, mais qui fonctionnent aussi concrètement sur le terrain.',
    'who.founder1.name': 'Hassan Lajhad',
    'who.founder1.role': 'Co-founder — Technology & AI Implementation',
    'who.founder2.name': 'Rachid Azrou',
    'who.founder2.role': 'Co-founder — Product & AI Architecture',
    'who.founder3.name': 'Jawad El Khalki',
    'who.founder3.role': 'Co-founder — Product Operations & QA',
    'who.foundersTagline': 'Ensemble, plus de 20 ans d\'expérience dans l\'analyse et l\'amélioration de systèmes critiques sous pression opérationnelle.',
    
    // How We Work
    'how.title': 'Notre approche',
    'how.intro': 'Nous partons de la façon dont les processus fonctionnent réellement, et non de la façon dont ils devraient fonctionner sur le papier.',
    'how.step1.title': 'Où ça coince',
    'how.step1.desc': 'Nous identifions où les systèmes cèdent sous la pression.',
    'how.step2.title': 'Comprendre',
    'how.step2.desc': 'Nous analysons comment les processus se déroulent aujourd\'hui en pratique.',
    'how.step3.title': 'Comment le travail se fait vraiment',
    'how.step3.desc': 'Nous regardons la réalité, pas la documentation.',
    'how.step4.title': 'Ce qui marche / ne marche pas',
    'how.step4.desc': 'Nous validons avec les personnes sur le terrain.',
    'how.step5.title': 'Ce qui doit changer',
    'how.step5.desc': 'Nous construisons des solutions qui s\'alignent sur les habitudes existantes.',
    'how.step6.title': 'Continuer à améliorer',
    'how.step6.desc': 'Nous ajustons en continu en fonction de l\'usage.',
    
    // Initiatives
    'initiatives.title': 'Initiatives actuelles',
    'initiatives.sonexa.label': 'SANTÉ',
    'initiatives.sonexa.body': 'Sonexa vise à structurer les workflows téléphoniques et administratifs dans les cabinets médicaux, en partant de la réalité du fonctionnement quotidien.',
    'initiatives.cta': 'Voir l\'initiative',

    // Sonexa page
    'sonexa.badge': 'Recherche · Cabinets médicaux',
    'sonexa.hero.headline': 'Le téléphone n’arrête pas de sonner.\nL’administratif s’accumule entre les consultations.',
    'sonexa.hero.sub':
      'Dans de nombreux cabinets, nous voyons les mêmes constats revenir.\nNous échangeons avec des médecins et des équipes pour comprendre où ça bloque.\nD’abord comprendre ce qui se joue réellement, ensuite les solutions.',
    'sonexa.hero.ctaSurvey': 'Partagez votre expérience (±4 min)',
    'sonexa.hero.ctaContact': 'Préférez un court échange ?',
    'sonexa.trust.t1': 'Axé sur les cabinets médicaux',
    'sonexa.trust.t2': 'Part du terrain',
    'sonexa.trust.t3': 'Pas de solution figée d’avance',

    'sonexa.survey.label': 'Enquête',
    'sonexa.survey.title': 'Reconnaissez-vous cela dans votre cabinet ?',
    'sonexa.survey.p1': 'Des téléphones qui interrompent les consultations. De l’administratif entre les patients. Des rappels qui s’accumulent.',
    'sonexa.survey.p2': 'Via une courte enquête, nous voulons comprendre où la pression est la plus forte et ce qui mérite d’abord attention.',
    'sonexa.survey.cta': 'Partagez votre expérience (±4 min)',
    'sonexa.survey.note1': 'Ne prend que quelques minutes',
    'sonexa.survey.note2': 'Aucun suivi sans votre consentement',
    'sonexa.survey.note3': 'Résultats partagés avec les participants',

    'sonexa.context.title': 'Pourquoi cette recherche',
    'sonexa.context.p1': 'Dans de nombreux cabinets, le téléphone reste une source d’interruption récurrente. Rendez-vous, ordonnances, résultats et rappels arrivent de façon éclatée, souvent aux heures de pointe.',
    'sonexa.context.p2': 'Ce n’est pas exceptionnel. Nous voyons ce schéma dans de nombreux cabinets. Sonexa veut cartographier cette réalité en partant de ce que les cabinets vivent au quotidien.',

    'sonexa.focus.title': 'Ce que nous faisons aujourd’hui',
    'sonexa.focus.lead': 'Sonexa est en phase de recherche. Nous travaillons avec des cabinets pour :',
    'sonexa.focus.li1': 'Cartographier les tâches téléphoniques et administratives récurrentes',
    'sonexa.focus.li2': 'Comprendre comment elles sont traitées aujourd’hui',
    'sonexa.focus.li3': 'Identifier les goulots d’étranglement en période de pointe',
    'sonexa.focus.li4': 'Voir où les processus ralentissent structurellement',
    'sonexa.focus.footer': 'Nous partons du terrain, pas des suppositions.',

    'sonexa.how.title': 'Notre méthode',
    'sonexa.how.step1.title': 'Écouter',
    'sonexa.how.step1.desc': 'Échanges avec les cabinets sur les points de pression quotidiens.',
    'sonexa.how.step2.title': 'Analyser',
    'sonexa.how.step2.desc': 'Cartographie des situations concrètes et des flux de travail.',
    'sonexa.how.step3.title': 'Valider',
    'sonexa.how.step3.desc': 'Tester les conclusions avec ceux qui les vivent au quotidien.',
    'sonexa.how.step4.title': 'Traduire',
    'sonexa.how.step4.desc': 'Progressivement vers des solutions applicables.',

    'sonexa.future.title': 'Où cela mène',
    'sonexa.future.lead': 'Sur la base de ce que nous entendons, nous voulons travailler vers des solutions qui :',
    'sonexa.future.li1': 'Réduisent la charge administrative',
    'sonexa.future.li2': 'Structurent mieux la charge téléphonique',
    'sonexa.future.li3': 'S’alignent sur les flux existants',
    'sonexa.future.li4': 'Préservent le contrôle au sein du cabinet',
    'sonexa.future.footer': 'Nous ne construisons que lorsque la réalité est suffisamment claire.',

    'sonexa.who.title': 'Pour qui est-ce pertinent',
    'sonexa.who.li1': 'Cabinets de médecine générale',
    'sonexa.who.li1.desc': 'Où le téléphone sonne sans cesse entre les consultations.',
    'sonexa.who.li2': 'Cabinets de groupe',
    'sonexa.who.li2.desc': 'Où coordination et administratif se répartissent entre plusieurs médecins.',
    'sonexa.who.li3': 'Cabinets spécialisés',
    'sonexa.who.li3.desc': 'Où la planification et les rappels génèrent une pression structurelle.',
    'sonexa.who.li4': 'Cabinets dentaires',
    'sonexa.who.li4.desc': 'Où rendez-vous, urgences et administratif se croisent en permanence.',

    'sonexa.closing.title': 'Préférez un échange ?',
    'sonexa.closing.body': 'Vous préférez ne pas remplir de formulaire ? On comprend. Les cabinets qui souhaitent partager leur vécu à l’oral ou réfléchir avec nous sont les bienvenus.',
    'sonexa.closing.ctaContact': 'Nous contacter',
    'sonexa.closing.ctaPlan': 'Planifier un court échange',

    // Privacy policy
    'privacy.docTitle': 'Politique de confidentialité — ELAZ Group',
    'privacy.eyebrow': 'POLITIQUE DE CONFIDENTIALITÉ',
    'privacy.title': 'Politique de confidentialité',
    'privacy.updated': 'Dernière mise à jour : 15/02/2026',
    'privacy.intro.p1':
      'ELAZ GROUP VOF accorde une grande importance à la protection de vos données personnelles et respecte votre vie privée.',
    'privacy.intro.p2':
      'Cette politique de confidentialité décrit comment nous collectons, utilisons et protégeons les données personnelles via notre site web.',
    'privacy.s1.title': '1. Responsable du traitement',
    'privacy.s1.line1': 'ELAZ GROUP VOF',
    'privacy.s1.line2': 'Uitbreidingstraat 84',
    'privacy.s1.line3': '2600 Anvers',
    'privacy.s1.line4': 'Belgique',
    'privacy.s1.vat': 'Numéro d’entreprise / TVA : BE 1034.408.394',
    'privacy.s1.emailLabel': 'E-mail :',
    'privacy.s1.email': 'contact@elazgroup.com',
    'privacy.s2.title': '2. Données que nous collectons',
    'privacy.s2.p1':
      'Nous ne collectons que les données personnelles que vous fournissez volontairement via notre site web.',
    'privacy.s2.surveyTitle': 'Enquête (initiative Sonexa)',
    'privacy.s2.survey.p1': 'Via l’enquête, les données suivantes peuvent être collectées :',
    'privacy.s2.survey.bullet1': 'adresse e-mail (facultatif)',
    'privacy.s2.survey.p2': 'La communication de votre adresse e-mail n’est pas obligatoire.',
    'privacy.s2.survey.p3':
      'Nous ne collectons pas de nom, numéro de téléphone ni d’autres données d’identification via l’enquête.',
    'privacy.s3.title': '3. Finalités du traitement',
    'privacy.s3.intro': 'Nous traitons vos données uniquement aux fins suivantes :',
    'privacy.s3.li1': 'analyser les contributions dans le cadre de l’initiative Sonexa',
    'privacy.s3.li2': 'mieux comprendre les défis opérationnels dans les cabinets médicaux',
    'privacy.s3.li3':
      'vous contacter le cas échéant si vous avez volontairement fourni votre adresse e-mail',
    'privacy.s3.footer': 'Vos données ne sont pas utilisées à des fins marketing.',
    'privacy.s4.title': '4. Base juridique',
    'privacy.s4.p1': 'Le traitement de vos données personnelles repose sur :',
    'privacy.s4.li1':
      'votre consentement (lorsque vous remplissez volontairement l’enquête et fournissez éventuellement votre adresse e-mail)',
    'privacy.s5.title': '5. Durée de conservation',
    'privacy.s5.p1':
      'Vos données ne sont conservées pas plus longtemps que nécessaire aux fins décrites ci-dessus.',
    'privacy.s5.concrete': 'Concrètement :',
    'privacy.s5.li1':
      'les données d’enquête sont conservées tant qu’elles sont pertinentes pour le parcours de recherche et de validation de Sonexa',
    'privacy.s5.li2':
      'les coordonnées (si fournies) sont supprimées dès qu’elles ne sont plus nécessaires',
    'privacy.s6.title': '6. Partage avec des tiers',
    'privacy.s6.p1':
      'Vos données ne sont pas vendues ni partagées avec des tiers à des fins commerciales.',
    'privacy.s6.tech': 'Techniquement, les données peuvent être traitées via :',
    'privacy.s6.li1': 'Supabase (base de données et infrastructure de stockage)',
    'privacy.s6.footer':
      'Nous veillons à ce que ce traitement soit conforme à la législation applicable en matière de protection des données.',
    'privacy.s7.title': '7. Sécurité',
    'privacy.s7.intro':
      'Nous mettons en œuvre des mesures techniques et organisationnelles appropriées pour protéger vos données personnelles contre :',
    'privacy.s7.li1': 'l’accès non autorisé',
    'privacy.s7.li2': 'la perte',
    'privacy.s7.li3': 'l’usage abusif',
    'privacy.s8.title': '8. Vos droits',
    'privacy.s8.intro': 'Vous avez le droit de :',
    'privacy.s8.li1': 'accéder à vos données personnelles',
    'privacy.s8.li2': 'demander la rectification de données inexactes',
    'privacy.s8.li3': 'demander l’effacement de vos données',
    'privacy.s8.li4': 'vous opposer au traitement',
    'privacy.s8.contact': 'Pour exercer ces droits, contactez-nous à :',
    'privacy.s8.email': 'contact@elazgroup.com',
    'privacy.s9.title': '9. Modifications',
    'privacy.s9.p1': 'ELAZ GROUP VOF se réserve le droit de modifier cette politique de confidentialité.',
    'privacy.s9.p2': 'La version la plus récente est toujours disponible sur le site web.',
    // Cookie policy & banner
    'cookies.docTitle': 'Politique relative aux cookies — ELAZ Group',
    'cookies.eyebrow': 'POLITIQUE COOKIES',
    'cookies.title': 'Politique relative aux cookies',
    'cookies.updated': 'Dernière mise à jour : 3 avril 2026',
    'cookies.intro': 'Ce site utilise uniquement des cookies fonctionnels.',
    'cookies.s1.title': '1. Qu’est-ce qu’un cookie',
    'cookies.s1.p1':
      'Les cookies sont de petits fichiers texte déposés sur votre appareil lorsque vous visitez un site web.',
    'cookies.s1.p2': 'Ils permettent au site de fonctionner correctement.',
    'cookies.s2.title': '2. Quels cookies utilisons-nous',
    'cookies.s2.intro': 'Nous utilisons uniquement des cookies fonctionnels nécessaires pour :',
    'cookies.s2.li1': 'charger correctement le site',
    'cookies.s2.li2': 'les fonctionnalités de base',
    'cookies.s2.footer':
      'Ces cookies ne collectent pas de données personnelles et ne sont pas utilisés pour le suivi.',
    'cookies.s3.title': '3. Pas de cookies de suivi ou marketing',
    'cookies.s3.intro': 'Ce site n’utilise pas :',
    'cookies.s3.li1': 'de cookies analytiques (tels que Google Analytics)',
    'cookies.s3.li2': 'de cookies marketing',
    'cookies.s3.li3': 'd’outils de suivi',
    'cookies.s3.footer': 'Votre navigation n’est pas suivie.',
    'cookies.s4.title': '4. Gestion des cookies',
    'cookies.s4.p1':
      'Comme nous n’utilisons que des cookies fonctionnels, le consentement n’est pas requis.',
    'cookies.s4.p2':
      'Vous pouvez toutefois gérer ou supprimer les cookies via les paramètres de votre navigateur.',
    'cookies.s5.title': '5. Contact',
    'cookies.s5.p1': 'Pour toute question sur cette politique cookies, contactez-nous à :',
    'cookies.s5.email': 'contact@elazgroup.com',
    'cookies.banner.p1':
      'Nous utilisons uniquement des cookies fonctionnels nécessaires au bon fonctionnement de ce site.',
    'cookies.banner.p2': 'Aucun cookie de suivi ou marketing n’est utilisé.',
    'cookies.banner.p3': 'Pour plus d’informations, consultez notre politique relative aux cookies.',
    'cookies.banner.more': 'Plus d’infos',
    'cookies.banner.ok': 'OK',

    // Contact
    'contact.title': 'Contact',
    'contact.body': 'Pour des questions ou des demandes de collaboration:',
    'contact.email': 'contact@elazgroup.com',
    'contact.company': 'ELAZ GROUP',
    'contact.legalForm': 'VOF',
    'contact.vatNumber': 'BE1034.408.394',
    'contact.location': 'Anvers, Belgique',
    'contact.lblAddress': 'Adresse',
    'contact.lblEmail': 'Adresse e-mail',
    'contact.lblEnterprise': 'Numéro d’entreprise',
    'contact.enterpriseNumber': '1034.408.394',
    'contact.lblPhone': 'Téléphone',
    'contact.mapOpen': 'Ouvrir dans Google Maps',
    'contact.address': 'Uitbreidingstraat 84\n2600 Anvers\nBelgique',
    'contact.phone': '',
    'contact.form.name': 'Nom',
    'contact.form.email': 'E-mail',
    'contact.form.company': 'Organisation (optionnel)',
    'contact.form.message': 'Message',
    'contact.form.submit': 'Envoyer le message',
    'contact.form.hint': 'Ouvre votre application e-mail avec un brouillon vers contact@elazgroup.com.',
    'contact.form.errorRequired': 'Veuillez remplir le nom, l’e-mail et le message.',
    'contact.form.errorEmail': 'Veuillez entrer une adresse e-mail valide.',

    // Footer
    'footer.privacy': 'Confidentialité',
    'footer.cookies': 'Politique cookies',
    'footer.copyright': '© 2026 ELAZ Group. Tous droits réservés.',
  },
};

const LanguageContext = createContext<LanguageContextType | undefined>(undefined);

export function LanguageProvider({ children }: { children: ReactNode }) {
  const [language, setLanguage] = useState<Language>('nl');

  const t = (key: string): string => {
    const dict = translations[language] as Record<string, string | undefined>;
    return dict[key] ?? key;
  };

  return (
    <LanguageContext.Provider value={{ language, setLanguage, t }}>
      {children}
    </LanguageContext.Provider>
  );
}

export function useLanguage() {
  const context = useContext(LanguageContext);
  if (context === undefined) {
    throw new Error('useLanguage must be used within a LanguageProvider');
  }
  return context;
}