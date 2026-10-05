export type CompanyStage = 'startup' | 'scaleup' | 'established';

export interface Company {
  slug: string;
  displayName: string;
  shortDescription: string;
  logo?: string;
  published: boolean;
  stage: CompanyStage;
}

const companyStages = {
  startup: `anocca berget-ai blykalla doconomy dokku elain endra functionland humy ipify karma kovant legora lightbringer lovable millow moleculent novatron-fusion reselo segr smartcella stilla tandem-health tavion tiptapp validio whywaste`,
  scaleup: `acast aira airmee albacross alight anyfin bannerflow billogram bitrefill bokio booli brite-payments candela climeon cloudworks detectify doctrin doktor-se einride elonroad embark-studios embla epidemic-sound evroc firstvet froda funnel getaccept ingrid instabee iron-gate-studio jobylon juni kivra kognity kry lassie lifesum liquid-wind lunar magma magma-math mathem matsmart mavenoid mediatool mentimeter messente mestro mindler monitor-erp mynt na-kd natural-cycles neko-health neo4j normative northmill northvolt olink open-pay patchworks planacy planhat polarium position-green qasa qred quartr quinyx qvantum rebtel sana-ai scrive sellpy seon stegra stravito strossle stunlock-studios syre talentech teamtailor telness-tech teragence unomaly upsales vercel-sweden voi voyado xensam xvivo zimpler`,
  established: `alltid-oppet apotea aprea-therapeutics arrowhead-game-studios assessio avalanche-studios avanza axis-communications bambora bankid bhg-group bico bioarctic blocket boozt byredo camurus cdon cellink cint clavister coffee-stain-studios desenio ea-dice efficy embracer ericsson etraveli evolution fatshark formpipe fortnox g5-entertainment hacksaw-gaming hazelight-studios hemnet hexagon hms-networks huawei-sweden iar-systems ifs king koenigsegg klarna lendo lime-technologies machinegames massive-entertainment mio modern-times-group mojang netent nordnet oatly optimizely outpost24 pagero paradox-interactive plejd polestar pricerunner qlik qliro questback raysearch recorded-future resurs revolutionrace saab scania sectra sinch skandia snow-software soundtrap spotify spotify-for-artists starbreeze stillfront storytel superoffice svea-bank swish syncron talentsoft tarsier-studios telavox tele2 telenor-sweden telia thunderful tink tobii tobii-dynavox too-good-to-go tradera truecaller trustly veoneer vitec voicetech volvo-cars volvo-group yubico zettle`,
} satisfies Record<CompanyStage, string>;

const companyStageBySlug = new Map<string, CompanyStage>(
  Object.entries(companyStages).flatMap(([stage, slugs]) =>
    slugs.split(' ').map((slug) => [slug, stage as CompanyStage] as const),
  ),
);

const companyEntries: Omit<Company, 'stage'>[] = [
  // ============================================================
  // CONSUMER / INTERNET
  // ============================================================

  {
    slug: 'spotify',
    displayName: 'Spotify',
    shortDescription: 'Global audio streaming and podcast platform.',
    published: false,
  },
  {
    slug: 'klarna',
    displayName: 'Klarna',
    shortDescription: 'Global payments and financial services platform.',
    published: false,
  },
  {
    slug: 'truecaller',
    displayName: 'Truecaller',
    shortDescription: 'Caller identification and communication platform.',
    published: false,
  },
  {
    slug: 'epidemic-sound',
    displayName: 'Epidemic Sound',
    shortDescription: 'Digital music platform for creators and businesses.',
    published: false,
  },
  {
    slug: 'storytel',
    displayName: 'Storytel',
    shortDescription: 'Audiobook and digital publishing subscription platform.',
    published: false,
  },
  {
    slug: 'boozt',
    displayName: 'Boozt',
    shortDescription: 'Nordic online fashion and lifestyle retailer.',
    published: false,
  },
  {
    slug: 'byredo',
    displayName: 'Byredo',
    shortDescription: 'Digital-first luxury beauty and lifestyle brand.',
    published: false,
  },
  {
    slug: 'revolutionrace',
    displayName: 'RevolutionRace',
    shortDescription: 'Digital outdoor apparel company.',
    published: false,
  },
  {
    slug: 'na-kd',
    displayName: 'NA-KD',
    shortDescription: 'Digital fashion and e-commerce platform.',
    published: false,
  },
  {
    slug: 'oatly',
    displayName: 'Oatly',
    shortDescription: 'Plant-based food and consumer brand.',
    published: false,
  },
  {
    slug: 'mathem',
    displayName: 'Mathem',
    shortDescription: 'Online grocery and logistics platform.',
    published: false,
  },
  {
    slug: 'matsmart',
    displayName: 'Matsmart',
    shortDescription: 'Online marketplace for surplus food.',
    published: false,
  },
  {
    slug: 'karma',
    displayName: 'Karma',
    shortDescription: 'Marketplace connecting consumers with surplus food.',
    published: false,
  },
  {
    slug: 'instabee',
    displayName: 'Instabee',
    shortDescription: 'Technology-enabled last-mile delivery platform.',
    published: false,
  },
  {
    slug: 'voi',
    displayName: 'Voi',
    shortDescription: 'European micromobility and electric scooter platform.',
    published: false,
  },
  {
    slug: 'tiptapp',
    displayName: 'Tiptapp',
    shortDescription: 'Peer-to-peer marketplace for moving and recycling items.',
    published: false,
  },
  {
    slug: 'tradera',
    displayName: 'Tradera',
    shortDescription: 'Swedish online marketplace for second-hand commerce.',
    published: false,
  },
  {
    slug: 'hemnet',
    displayName: 'Hemnet',
    shortDescription: 'Swedish property marketplace and housing platform.',
    published: false,
  },
  {
    slug: 'booli',
    displayName: 'Booli',
    shortDescription: 'Property search and housing data platform.',
    published: false,
  },
  {
    slug: 'qasa',
    displayName: 'Qasa',
    shortDescription: 'Digital rental housing marketplace.',
    published: false,
  },

  // ============================================================
  // AI
  // ============================================================

  {
    slug: 'lovable',
    displayName: 'Lovable',
    shortDescription: 'AI platform for building software with natural language.',
    published: false,
  },
  {
    slug: 'legora',
    displayName: 'Legora',
    shortDescription: 'Agentic AI workspace for legal professionals.',
    published: false,
  },
  {
    slug: 'sana-ai',
    displayName: 'Sana AI',
    shortDescription: 'AI-powered knowledge, learning and productivity platform.',
    published: false,
  },
  {
    slug: 'neko-health',
    displayName: 'Neko Health',
    shortDescription: 'Data-driven preventive healthcare and diagnostics platform.',
    published: false,
  },
  {
    slug: 'tandem-health',
    displayName: 'Tandem Health',
    shortDescription: 'AI copilot for healthcare professionals.',
    published: false,
  },
  {
    slug: 'quartr',
    displayName: 'Quartr',
    shortDescription: 'Financial research and company intelligence platform.',
    published: false,
  },
  {
    slug: 'magma',
    displayName: 'Magma',
    shortDescription: 'Collaborative digital whiteboard and design platform.',
    published: false,
  },
  {
    slug: 'magma-math',
    displayName: 'Magma Math',
    shortDescription: 'AI-powered mathematics learning platform.',
    published: false,
  },
  {
    slug: 'lightbringer',
    displayName: 'Lightbringer',
    shortDescription: 'AI-powered intellectual property platform.',
    published: false,
  },
  {
    slug: 'tavion',
    displayName: 'Tavion',
    shortDescription: 'AI technology startup building intelligent software systems.',
    published: false,
  },
  {
    slug: 'humy',
    displayName: 'Humy',
    shortDescription: 'AI-powered education and learning platform.',
    published: false,
  },
  {
    slug: 'kognity',
    displayName: 'Kognity',
    shortDescription: 'Digital learning platform for schools.',
    published: false,
  },
  {
    slug: 'mentimeter',
    displayName: 'Mentimeter',
    shortDescription: 'Interactive presentation and audience engagement platform.',
    published: false,
  },

  // ============================================================
  // FINTECH / PAYMENTS
  // ============================================================

  {
    slug: 'tink',
    displayName: 'Tink',
    shortDescription: 'Open banking and financial data platform.',
    published: false,
  },
  {
    slug: 'trustly',
    displayName: 'Trustly',
    shortDescription: 'Open banking payments platform.',
    published: false,
  },
  {
    slug: 'qliro',
    displayName: 'Qliro',
    shortDescription: 'Digital payments and financial services platform.',
    published: false,
  },
  {
    slug: 'anyfin',
    displayName: 'Anyfin',
    shortDescription: 'Digital consumer finance and refinancing platform.',
    published: false,
  },
  {
    slug: 'billogram',
    displayName: 'Billogram',
    shortDescription: 'Digital billing and payment automation platform.',
    published: false,
  },
  {
    slug: 'mynt',
    displayName: 'Mynt',
    shortDescription: 'Corporate cards and financial management platform.',
    published: false,
  },
  {
    slug: 'juni',
    displayName: 'Juni',
    shortDescription: 'Financial platform for digital businesses.',
    published: false,
  },
  {
    slug: 'bokio',
    displayName: 'Bokio',
    shortDescription: 'Cloud accounting and business management platform.',
    published: false,
  },
  {
    slug: 'zettle',
    displayName: 'Zettle',
    shortDescription: 'Payments and commerce platform for small businesses.',
    published: false,
  },
  {
    slug: 'bambora',
    displayName: 'Bambora',
    shortDescription: 'Payment technology and merchant services platform.',
    published: false,
  },
  {
    slug: 'segr',
    displayName: 'SEGR',
    shortDescription: 'Swedish financial technology platform.',
    published: false,
  },
  {
    slug: 'open-pay',
    displayName: 'OpenPayd',
    shortDescription: 'Embedded banking and payments infrastructure.',
    published: false,
  },
  {
    slug: 'lunar',
    displayName: 'Lunar',
    shortDescription: 'Digital banking and financial services platform.',
    published: false,
  },

  // ============================================================
  // SAAS / B2B SOFTWARE
  // ============================================================

  {
    slug: 'voyado',
    displayName: 'Voyado',
    shortDescription: 'Retail technology platform for customer experience, loyalty and marketing.',
    published: false,
  },
  {
    slug: 'fortnox',
    displayName: 'Fortnox',
    shortDescription: 'Cloud-based business and accounting software platform.',
    published: false,
  },
  {
    slug: 'sinch',
    displayName: 'Sinch',
    shortDescription: 'Cloud communications and customer engagement platform.',
    published: false,
  },
  {
    slug: 'neo4j',
    displayName: 'Neo4j',
    shortDescription: 'Graph database and data intelligence platform.',
    published: false,
  },
  {
    slug: 'recorded-future',
    displayName: 'Recorded Future',
    shortDescription: 'Cyber threat intelligence and security platform.',
    published: false,
  },
  {
    slug: 'funnel',
    displayName: 'Funnel',
    shortDescription: 'Marketing data aggregation and analytics platform.',
    published: false,
  },
  {
    slug: 'teamtailor',
    displayName: 'Teamtailor',
    shortDescription: 'Applicant tracking and recruitment platform.',
    published: false,
  },
  {
    slug: 'scrive',
    displayName: 'Scrive',
    shortDescription: 'Electronic signature and agreement automation platform.',
    published: false,
  },
  {
    slug: 'superoffice',
    displayName: 'SuperOffice',
    shortDescription: 'CRM and customer relationship management platform.',
    published: false,
  },
  {
    slug: 'efficy',
    displayName: 'Efficy',
    shortDescription: 'CRM and customer experience software platform.',
    published: false,
  },
  {
    slug: 'syncron',
    displayName: 'Syncron',
    shortDescription: 'Cloud software for service parts and asset management.',
    published: false,
  },
  {
    slug: 'mediatool',
    displayName: 'Mediatool',
    shortDescription: 'Marketing planning and media management platform.',
    published: false,
  },
  {
    slug: 'alight',
    displayName: 'Alight',
    shortDescription: 'Digital commerce and customer experience technology.',
    published: false,
  },
  {
    slug: 'telavox',
    displayName: 'Telavox',
    shortDescription: 'Cloud communications and business telephony platform.',
    published: false,
  },
  {
    slug: 'telness-tech',
    displayName: 'Telness Tech',
    shortDescription: 'Cloud-native telecom software platform.',
    published: false,
  },
  {
    slug: 'bannerflow',
    displayName: 'Bannerflow',
    shortDescription: 'Creative management and digital advertising platform.',
    published: false,
  },
  {
    slug: 'northmill',
    displayName: 'Northmill',
    shortDescription: 'Digital banking and financial technology platform.',
    published: false,
  },
  {
    slug: 'mestro',
    displayName: 'Mestro',
    shortDescription: 'Cloud software for energy and sustainability management.',
    published: false,
  },
  {
    slug: 'albacross',
    displayName: 'Albacross',
    shortDescription: 'B2B website visitor identification and sales intelligence platform.',
    published: false,
  },
  {
    slug: 'upsales',
    displayName: 'Upsales',
    shortDescription: 'CRM and sales engagement platform.',
    published: false,
  },
  {
    slug: 'getaccept',
    displayName: 'GetAccept',
    shortDescription: 'Digital sales room and proposal automation platform.',
    published: false,
  },
  {
    slug: 'questback',
    displayName: 'Questback',
    shortDescription: 'Enterprise feedback and survey platform.',
    published: false,
  },
  {
    slug: 'position-green',
    displayName: 'Position Green',
    shortDescription: 'Sustainability reporting and ESG management platform.',
    published: false,
  },
  {
    slug: 'planacy',
    displayName: 'Planacy',
    shortDescription: 'Financial planning and performance management software.',
    published: false,
  },

  // ============================================================
  // DEVELOPER / CLOUD / INFRASTRUCTURE
  // ============================================================

  {
    slug: 'evroc',
    displayName: 'Evroc',
    shortDescription: 'European cloud infrastructure company.',
    published: false,
  },
  {
    slug: 'cloudworks',
    displayName: 'Cloudworks',
    shortDescription: 'Cloud infrastructure and technology company.',
    published: false,
  },
  {
    slug: 'functionland',
    displayName: 'Functionland',
    shortDescription: 'Decentralized data and storage infrastructure company.',
    published: false,
  },
  {
    slug: 'vercel-sweden',
    displayName: 'Vercel Sweden',
    shortDescription: 'Swedish-founded developer infrastructure company.',
    published: false,
  },
  {
    slug: 'dokku',
    displayName: 'Dokku',
    shortDescription: 'Open-source container deployment platform.',
    published: false,
  },
  {
    slug: 'northvolt',
    displayName: 'Northvolt',
    shortDescription: 'Battery technology and energy storage company.',
    published: false,
  },
  {
    slug: 'yubico',
    displayName: 'Yubico',
    shortDescription: 'Hardware and software security authentication platform.',
    published: false,
  },
  {
    slug: 'xensam',
    displayName: 'Xensam',
    shortDescription: 'AI-powered software asset management platform.',
    published: false,
  },
  {
    slug: 'detectify',
    displayName: 'Detectify',
    shortDescription: 'Automated web application security platform.',
    published: false,
  },
  {
    slug: 'seon',
    displayName: 'SEON',
    shortDescription: 'Fraud prevention and digital risk intelligence platform.',
    published: false,
  },
  {
    slug: 'teragence',
    displayName: 'Teragence',
    shortDescription: 'Location intelligence and mobile data platform.',
    published: false,
  },
  {
    slug: 'unomaly',
    displayName: 'Unomaly',
    shortDescription: 'AI-powered IT anomaly detection platform.',
    published: false,
  },
  {
    slug: 'patchworks',
    displayName: 'Patchworks',
    shortDescription: 'Integration platform for e-commerce systems.',
    published: false,
  },

  // ============================================================
  // HEALTH / DIGITAL HEALTH
  // ============================================================

  {
    slug: 'kry',
    displayName: 'Kry',
    shortDescription: 'Digital healthcare and telemedicine platform.',
    published: false,
  },
  {
    slug: 'doktor-se',
    displayName: 'Doktor.se',
    shortDescription: 'Digital healthcare platform.',
    published: false,
  },
  {
    slug: 'natural-cycles',
    displayName: 'Natural Cycles',
    shortDescription: 'Digital contraceptive and fertility platform.',
    published: false,
  },
  {
    slug: 'lassie',
    displayName: 'Lassie',
    shortDescription: 'Digital pet insurance and preventive pet health platform.',
    published: false,
  },
  {
    slug: 'embla',
    displayName: 'Embla',
    shortDescription: 'Digital healthcare and weight management platform.',
    published: false,
  },
  {
    slug: 'mindler',
    displayName: 'Mindler',
    shortDescription: 'Digital mental healthcare platform.',
    published: false,
  },
  {
    slug: 'alltid-oppet',
    displayName: 'Alltid öppet',
    shortDescription: 'Digital healthcare access platform.',
    published: false,
  },
  {
    slug: 'tobii',
    displayName: 'Tobii',
    shortDescription: 'Eye tracking and human-computer interaction technology.',
    published: false,
  },
  {
    slug: 'raysearch',
    displayName: 'RaySearch Laboratories',
    shortDescription: 'Software platform for cancer treatment planning.',
    published: false,
  },

  // ============================================================
  // MOBILITY / AUTOMOTIVE / TRANSPORT
  // ============================================================

  {
    slug: 'einride',
    displayName: 'Einride',
    shortDescription: 'Electric and autonomous freight technology platform.',
    published: false,
  },
  {
    slug: 'polestar',
    displayName: 'Polestar',
    shortDescription: 'Electric vehicle and automotive technology company.',
    published: false,
  },
  {
    slug: 'candela',
    displayName: 'Candela',
    shortDescription: 'Electric marine mobility and boat technology company.',
    published: false,
  },
  {
    slug: 'airmee',
    displayName: 'Airmee',
    shortDescription: 'Technology-driven last-mile delivery platform.',
    published: false,
  },
  {
    slug: 'ingrid',
    displayName: 'Ingrid',
    shortDescription: 'E-commerce delivery optimization platform.',
    published: false,
  },
  {
    slug: 'tiptapp',
    displayName: 'Tiptapp',
    shortDescription: 'On-demand logistics marketplace.',
    published: false,
  },
  {
    slug: 'voicetech',
    displayName: 'Volvo Cars',
    shortDescription: 'Connected automotive and mobility technology platform.',
    published: false,
  },
  {
    slug: 'koenigsegg',
    displayName: 'Koenigsegg',
    shortDescription: 'Advanced automotive engineering and technology company.',
    published: false,
  },
  {
    slug: 'veoneer',
    displayName: 'Veoneer',
    shortDescription: 'Automotive safety and autonomous driving technology.',
    published: false,
  },

  // ============================================================
  // ENERGY / CLIMATE / INDUSTRIAL TECH
  // ============================================================

  {
    slug: 'stegra',
    displayName: 'Stegra',
    shortDescription: 'Green steel company building fossil-free industrial production.',
    published: false,
  },
  {
    slug: 'aira',
    displayName: 'Aira',
    shortDescription: 'Clean energy and heat pump technology company.',
    published: false,
  },
  {
    slug: 'qvantum',
    displayName: 'Qvantum',
    shortDescription: 'Heat pump and clean energy technology company.',
    published: false,
  },
  {
    slug: 'blykalla',
    displayName: 'Blykalla',
    shortDescription: 'Small modular reactor technology company.',
    published: false,
  },
  {
    slug: 'novatron-fusion',
    displayName: 'Novatron Fusion',
    shortDescription: 'Fusion energy technology company.',
    published: false,
  },
  {
    slug: 'climeon',
    displayName: 'Climeon',
    shortDescription: 'Clean energy generation technology company.',
    published: false,
  },
  {
    slug: 'syre',
    displayName: 'Syre',
    shortDescription: 'Textile recycling and circular materials company.',
    published: false,
  },
  {
    slug: 'polarium',
    displayName: 'Polarium',
    shortDescription: 'Energy storage technology company.',
    published: false,
  },
  {
    slug: 'liquid-wind',
    displayName: 'Liquid Wind',
    shortDescription: 'Technology platform for green methanol production.',
    published: false,
  },
  {
    slug: 'elain',
    displayName: 'Elain',
    shortDescription: 'Energy and mobility technology company.',
    published: false,
  },
  {
    slug: 'elonroad',
    displayName: 'Elonroad',
    shortDescription: 'Electric road system and charging technology.',
    published: false,
  },
  {
    slug: 'qred',
    displayName: 'Qred',
    shortDescription: 'Digital financial services platform for small businesses.',
    published: false,
  },

  // ============================================================
  // GAMING
  // ============================================================

  {
    slug: 'king',
    displayName: 'King',
    shortDescription: 'Global mobile game developer behind Candy Crush.',
    published: false,
  },
  {
    slug: 'mojang',
    displayName: 'Mojang Studios',
    shortDescription: 'Game studio behind Minecraft.',
    published: false,
  },
  {
    slug: 'paradox-interactive',
    displayName: 'Paradox Interactive',
    shortDescription: 'Strategy game publisher and developer.',
    published: false,
  },
  {
    slug: 'embark-studios',
    displayName: 'Embark Studios',
    shortDescription: 'Game development studio building online multiplayer experiences.',
    published: false,
  },
  {
    slug: 'arrowhead-game-studios',
    displayName: 'Arrowhead Game Studios',
    shortDescription: 'Game development studio behind Helldivers.',
    published: false,
  },
  {
    slug: 'machinegames',
    displayName: 'MachineGames',
    shortDescription: 'Game development studio.',
    published: false,
  },
  {
    slug: 'hacksaw-gaming',
    displayName: 'Hacksaw Gaming',
    shortDescription: 'Online gaming technology and content company.',
    published: false,
  },
  {
    slug: 'evolution',
    displayName: 'Evolution',
    shortDescription: 'Live casino and gaming technology platform.',
    published: false,
  },
  {
    slug: 'massive-entertainment',
    displayName: 'Massive Entertainment',
    shortDescription: 'AAA game development studio based in Malmö.',
    published: false,
  },
  {
    slug: 'fatshark',
    displayName: 'Fatshark',
    shortDescription: 'Game development studio.',
    published: false,
  },
  {
    slug: 'starbreeze',
    displayName: 'Starbreeze',
    shortDescription: 'Game developer and publisher.',
    published: false,
  },
  {
    slug: 'coffee-stain-studios',
    displayName: 'Coffee Stain Studios',
    shortDescription: 'Game development and publishing studio.',
    published: false,
  },

  // ============================================================
  // MARKETPLACES / PROPTECH / COMMERCE
  // ============================================================

  {
    slug: 'apotea',
    displayName: 'Apotea',
    shortDescription: 'Digital pharmacy and e-commerce platform.',
    published: false,
  },
  {
    slug: 'mathem',
    displayName: 'Mathem',
    shortDescription: 'Online grocery and logistics platform.',
    published: false,
  },
  {
    slug: 'desenio',
    displayName: 'Desenio',
    shortDescription: 'Digital wall art and home decor retailer.',
    published: false,
  },
  {
    slug: 'cdon',
    displayName: 'CDON',
    shortDescription: 'Nordic online marketplace.',
    published: false,
  },
  {
    slug: 'mio',
    displayName: 'Mio',
    shortDescription: 'Digital furniture and home retail platform.',
    published: false,
  },
  {
    slug: 'anyfin',
    displayName: 'Anyfin',
    shortDescription: 'Digital financial marketplace and consumer finance platform.',
    published: false,
  },

  // ============================================================
  // COMMUNICATIONS / SOCIAL
  // ============================================================

  {
    slug: 'truecaller',
    displayName: 'Truecaller',
    shortDescription: 'Caller identification and communication platform.',
    published: false,
  },
  {
    slug: 'sinch',
    displayName: 'Sinch',
    shortDescription: 'Cloud communications platform for businesses.',
    published: false,
  },
  {
    slug: 'telavox',
    displayName: 'Telavox',
    shortDescription: 'Cloud communications and business telephony platform.',
    published: false,
  },
  {
    slug: 'messente',
    displayName: 'Messente',
    shortDescription: 'Business messaging and communication platform.',
    published: false,
  },

  // ============================================================
  // DEVELOPER / SECURITY
  // ============================================================

  {
    slug: 'yubico',
    displayName: 'Yubico',
    shortDescription: 'Hardware security keys and authentication technology.',
    published: false,
  },
  {
    slug: 'recorded-future',
    displayName: 'Recorded Future',
    shortDescription: 'Threat intelligence and cybersecurity platform.',
    published: false,
  },
  {
    slug: 'detectify',
    displayName: 'Detectify',
    shortDescription: 'Automated web application security platform.',
    published: false,
  },
  {
    slug: 'xensam',
    displayName: 'Xensam',
    shortDescription: 'AI-powered software asset management and security platform.',
    published: false,
  },
  {
    slug: 'unomaly',
    displayName: 'Unomaly',
    shortDescription: 'AI-powered anomaly detection and observability platform.',
    published: false,
  },
  {
    slug: 'ipify',
    displayName: 'ipify',
    shortDescription: 'Internet infrastructure and developer API service.',
    published: false,
  },

  // ============================================================
  // MEDIA / CREATOR ECONOMY
  // ============================================================

  {
    slug: 'epidemic-sound',
    displayName: 'Epidemic Sound',
    shortDescription: 'Music licensing and creator technology platform.',
    published: false,
  },
  {
    slug: 'storytel',
    displayName: 'Storytel',
    shortDescription: 'Audiobook and digital publishing platform.',
    published: false,
  },
  {
    slug: 'strossle',
    displayName: 'Strossle',
    shortDescription: 'Content recommendation and advertising technology.',
    published: false,
  },
  {
    slug: 'soundtrap',
    displayName: 'Soundtrap',
    shortDescription: 'Collaborative online music creation platform.',
    published: false,
  },

  // ============================================================
  // HR / WORK
  // ============================================================

  {
    slug: 'teamtailor',
    displayName: 'Teamtailor',
    shortDescription: 'Applicant tracking and recruitment platform.',
    published: false,
  },
  {
    slug: 'talentsoft',
    displayName: 'Talentsoft',
    shortDescription: 'Cloud talent management software platform.',
    published: false,
  },
  {
    slug: 'jobylon',
    displayName: 'Jobylon',
    shortDescription: 'Recruitment and employer branding platform.',
    published: false,
  },
  {
    slug: 'talentech',
    displayName: 'Talentech',
    shortDescription: 'Nordic HR and recruitment technology platform.',
    published: false,
  },
  {
    slug: 'assessio',
    displayName: 'Assessio',
    shortDescription: 'Talent assessment and people analytics platform.',
    published: false,
  },

  // ============================================================
  // FOOD / CONSUMER TECH
  // ============================================================

  {
    slug: 'whywaste',
    displayName: 'Whywaste',
    shortDescription: 'Technology platform helping retailers reduce food waste.',
    published: false,
  },
  {
    slug: 'too-good-to-go',
    displayName: 'Too Good To Go',
    shortDescription: 'Food surplus marketplace with Nordic operations.',
    published: false,
  },
  {
    slug: 'millow',
    displayName: 'Millow',
    shortDescription: 'Alternative protein and food technology startup.',
    published: false,
  },
  {
    slug: 'reselo',
    displayName: 'Reselo',
    shortDescription: 'Sustainable materials and circular economy startup.',
    published: false,
  },

  // ============================================================
  // BIOTECH / MEDTECH / DEEPTECH
  // ============================================================

  {
    slug: 'bico',
    displayName: 'BICO',
    shortDescription: 'Bioconvergence and life science technology company.',
    published: false,
  },
  {
    slug: 'cellink',
    displayName: 'CELLINK',
    shortDescription: '3D bioprinting and bioconvergence technology company.',
    published: false,
  },
  {
    slug: 'olink',
    displayName: 'Olink',
    shortDescription: 'Proteomics technology platform.',
    published: false,
  },
  {
    slug: 'moleculent',
    displayName: 'Moleculent',
    shortDescription: 'Single-cell analysis and spatial biology technology.',
    published: false,
  },
  {
    slug: 'smartcella',
    displayName: 'SmartCella',
    shortDescription: 'Biotech and advanced therapeutics technology company.',
    published: false,
  },
  {
    slug: 'anocca',
    displayName: 'Anocca',
    shortDescription: 'Cancer immunotherapy biotechnology company.',
    published: false,
  },
  {
    slug: 'aprea-therapeutics',
    displayName: 'Aprea Therapeutics',
    shortDescription: 'Biotechnology company developing cancer therapeutics.',
    published: false,
  },
  {
    slug: 'camurus',
    displayName: 'Camurus',
    shortDescription: 'Biopharmaceutical company using advanced drug delivery technology.',
    published: false,
  },
  {
    slug: 'bioarctic',
    displayName: 'BioArctic',
    shortDescription: 'Biopharmaceutical company focused on neurodegenerative diseases.',
    published: false,
  },
  {
    slug: 'xvivo',
    displayName: 'XVIVO',
    shortDescription: 'Medical technology company focused on organ transplantation.',
    published: false,
  },

  // ============================================================
  // INDUSTRIAL / ENGINEERING
  // ============================================================

  {
    slug: 'saab',
    displayName: 'Saab',
    shortDescription: 'Swedish aerospace, defence and security technology company.',
    published: false,
  },
  {
    slug: 'ericsson',
    displayName: 'Ericsson',
    shortDescription: 'Global telecommunications and network technology company.',
    published: false,
  },
  {
    slug: 'huawei-sweden',
    displayName: 'Huawei Sweden',
    shortDescription: 'Telecommunications technology research and engineering organization.',
    published: false,
  },
  {
    slug: 'volvo-group',
    displayName: 'Volvo Group',
    shortDescription: 'Connected transport and industrial technology company.',
    published: false,
  },
  {
    slug: 'volvo-cars',
    displayName: 'Volvo Cars',
    shortDescription: 'Connected automotive technology and mobility company.',
    published: false,
  },
  {
    slug: 'scania',
    displayName: 'Scania',
    shortDescription: 'Connected transport and industrial technology company.',
    published: false,
  },
  {
    slug: 'hexagon',
    displayName: 'Hexagon',
    shortDescription: 'Digital reality, industrial software and measurement technology company.',
    published: false,
  },
  {
    slug: 'hms-networks',
    displayName: 'HMS Networks',
    shortDescription: 'Industrial communication and IoT technology company.',
    published: false,
  },
  {
    slug: 'plejd',
    displayName: 'Plejd',
    shortDescription: 'Smart lighting and connected home technology company.',
    published: false,
  },
  {
    slug: 'tobii-dynavox',
    displayName: 'Tobii Dynavox',
    shortDescription: 'Assistive communication and accessibility technology company.',
    published: false,
  },

  // ============================================================
  // OTHER NOTABLE SWEDISH TECH COMPANIES
  // ============================================================

  {
    slug: 'avanza',
    displayName: 'Avanza',
    shortDescription: 'Digital investment and savings platform.',
    published: false,
  },
  {
    slug: 'nordnet',
    displayName: 'Nordnet',
    shortDescription: 'Digital savings and investment platform.',
    published: false,
  },
  {
    slug: 'skandia',
    displayName: 'Skandia',
    shortDescription: 'Digital financial services and insurance company.',
    published: false,
  },
  {
    slug: 'tele2',
    displayName: 'Tele2',
    shortDescription: 'Telecommunications and connectivity technology company.',
    published: false,
  },
  {
    slug: 'telenor-sweden',
    displayName: 'Telenor Sweden',
    shortDescription: 'Telecommunications and connectivity technology company.',
    published: false,
  },
  {
    slug: 'spotify-for-artists',
    displayName: 'Spotify for Artists',
    shortDescription: 'Artist analytics and creator platform from Spotify.',
    published: false,
  },
  {
    slug: 'paradox-interactive',
    displayName: 'Paradox Interactive',
    shortDescription: 'Strategy game developer and publisher.',
    published: false,
  },
  {
    slug: 'cint',
    displayName: 'Cint',
    shortDescription: 'Digital insights and research technology platform.',
    published: false,
  },
  {
    slug: 'plejd',
    displayName: 'Plejd',
    shortDescription: 'Smart home and connected lighting technology.',
    published: false,
  },
  {
    slug: 'apotea',
    displayName: 'Apotea',
    shortDescription: 'Digital pharmacy and e-commerce technology platform.',
    published: false,
  },
  {
    slug: 'raysearch',
    displayName: 'RaySearch Laboratories',
    shortDescription: 'Medical software for cancer treatment planning.',
    published: false,
  },
  {
    slug: 'qlik',
    displayName: 'Qlik',
    shortDescription: 'Business intelligence and data analytics platform.',
    published: false,
  },
  {
    slug: 'optimizely',
    displayName: 'Optimizely',
    shortDescription: 'Digital experience and experimentation platform.',
    published: false,
  },
  {
    slug: 'netent',
    displayName: 'NetEnt',
    shortDescription: 'Online gaming software technology company.',
    published: false,
  },
  {
    slug: 'evolution',
    displayName: 'Evolution',
    shortDescription: 'Live casino and online gaming technology platform.',
    published: false,
  },

    // ============================================================
  // ADDITIONS: CONSUMER / MARKETPLACES / TRAVEL
  // ============================================================

  { slug: 'acast', displayName: 'Acast', shortDescription: 'Podcast hosting, distribution and advertising platform.', published: false },
  { slug: 'sellpy', displayName: 'Sellpy', shortDescription: 'Second-hand fashion and resale marketplace.', published: false },
  { slug: 'kivra', displayName: 'Kivra', shortDescription: 'Digital mailbox for letters, invoices, payslips and receipts.', published: false },
  { slug: 'blocket', displayName: 'Blocket', shortDescription: 'Swedish online classifieds marketplace.', published: false }, // verify
  { slug: 'pricerunner', displayName: 'PriceRunner', shortDescription: 'Price comparison and shopping platform.', published: false }, // verify
  { slug: 'bhg-group', displayName: 'BHG Group', shortDescription: 'Online retail group focused on home improvement and furnishing.', published: false },
  { slug: 'lifesum', displayName: 'Lifesum', shortDescription: 'Nutrition and health tracking app.', published: false },
  { slug: 'etraveli', displayName: 'Etraveli Group', shortDescription: 'Flight booking technology platform powering online travel agencies.', published: false },

  // ============================================================
  // ADDITIONS: FINTECH / PAYMENTS / DIGITAL INFRASTRUCTURE
  // ============================================================

  { slug: 'doconomy', displayName: 'Doconomy', shortDescription: 'Climate-impact tracking and sustainable banking technology.', published: false },
  { slug: 'brite-payments', displayName: 'Brite Payments', shortDescription: 'Pay-by-bank and open banking payments platform.', published: false },
  { slug: 'froda', displayName: 'Froda', shortDescription: 'Financing platform for small businesses.', published: false },
  { slug: 'svea-bank', displayName: 'Svea Bank', shortDescription: 'Financing, payments and debt collection services.', published: false },
  { slug: 'resurs', displayName: 'Resurs', shortDescription: 'Consumer and business financing and payment solutions.', published: false },
  { slug: 'pagero', displayName: 'Pagero', shortDescription: 'E-invoicing and business network platform.', published: false },
  { slug: 'swish', displayName: 'Swish', shortDescription: 'Mobile payment service used across Sweden.', published: false },
  { slug: 'bankid', displayName: 'BankID', shortDescription: 'Electronic identification and signing service used across Sweden.', published: false },
  { slug: 'bitrefill', displayName: 'Bitrefill', shortDescription: 'Gift cards and mobile top-ups purchasable with cryptocurrency.', published: false },
  { slug: 'rebtel', displayName: 'Rebtel', shortDescription: 'International calling and money transfer app.', published: false },
  { slug: 'lendo', displayName: 'Lendo', shortDescription: 'Online loan comparison marketplace.', published: false }, // verify
  { slug: 'zimpler', displayName: 'Zimpler', shortDescription: 'Online payments for e-commerce and digital services.', published: false }, // verify

  // ============================================================
  // ADDITIONS: SAAS / B2B SOFTWARE / SECURITY
  // ============================================================

  { slug: 'quinyx', displayName: 'Quinyx', shortDescription: 'Cloud workforce management software.', published: false },
  { slug: 'lime-technologies', displayName: 'Lime Technologies', shortDescription: 'CRM software for Nordic B2B companies.', published: false },
  { slug: 'ifs', displayName: 'IFS', shortDescription: 'Enterprise software for asset-intensive industries.', published: false },
  { slug: 'sectra', displayName: 'Sectra', shortDescription: 'Medical imaging IT and cybersecurity solutions.', published: false },
  { slug: 'vitec', displayName: 'Vitec Software Group', shortDescription: 'Vertical market software for niche industries.', published: false },
  { slug: 'formpipe', displayName: 'Formpipe', shortDescription: 'Content services and process automation software.', published: false },
  { slug: 'clavister', displayName: 'Clavister', shortDescription: 'Cybersecurity solutions for network protection.', published: false },
  { slug: 'planhat', displayName: 'Planhat', shortDescription: 'Customer success platform for SaaS businesses.', published: false },
  { slug: 'stravito', displayName: 'Stravito', shortDescription: 'Knowledge management platform for market insights teams.', published: false },
  { slug: 'monitor-erp', displayName: 'Monitor ERP', shortDescription: 'ERP software for manufacturing companies.', published: false },
  { slug: 'snow-software', displayName: 'Snow Software', shortDescription: 'Technology intelligence and IT asset management software.', published: false },
  { slug: 'normative', displayName: 'Normative', shortDescription: 'Carbon accounting software for companies.', published: false },
  { slug: 'mavenoid', displayName: 'Mavenoid', shortDescription: 'Product support and troubleshooting automation for hardware companies.', published: false },
  { slug: 'iar-systems', displayName: 'IAR Systems', shortDescription: 'Embedded software development tools.', published: false }, // verify
  { slug: 'outpost24', displayName: 'Outpost24', shortDescription: 'Cybersecurity and exposure management platform.', published: false }, // verify

  // ============================================================
  // ADDITIONS: AI
  // ============================================================

  { slug: 'validio', displayName: 'Validio', shortDescription: 'Data quality and observability platform.', published: false },
  { slug: 'endra', displayName: 'Endra', shortDescription: 'AI platform for automating building systems design.', published: false },
  { slug: 'kovant', displayName: 'Kovant', shortDescription: 'AI agent platform for enterprise operations.', published: false },
  { slug: 'stilla', displayName: 'Stilla', shortDescription: 'AI assistant that tracks conversations, tasks and decisions.', published: false },
  { slug: 'berget-ai', displayName: 'Berget AI', shortDescription: 'AI inference and agent infrastructure for open-source models.', published: false },

  // ============================================================
  // ADDITIONS: GAMING
  // ============================================================

  { slug: 'ea-dice', displayName: 'DICE', shortDescription: 'Game studio behind the Battlefield series, part of Electronic Arts.', published: false },
  { slug: 'avalanche-studios', displayName: 'Avalanche Studios', shortDescription: 'Open-world game developer and publisher.', published: false },
  { slug: 'hazelight-studios', displayName: 'Hazelight Studios', shortDescription: 'Game studio known for co-op adventure games.', published: false },
  { slug: 'tarsier-studios', displayName: 'Tarsier Studios', shortDescription: 'Game development studio based in Malmö.', published: false },
  { slug: 'thunderful', displayName: 'Thunderful Group', shortDescription: 'Games group spanning development, publishing and co-development.', published: false },
  { slug: 'stillfront', displayName: 'Stillfront Group', shortDescription: 'Group of mobile and online game studios.', published: false },
  { slug: 'embracer', displayName: 'Embracer Group', shortDescription: 'Games holding company with studios and IP across the industry.', published: false },
  { slug: 'modern-times-group', displayName: 'Modern Times Group', shortDescription: 'Gaming and esports company.', published: false },
  { slug: 'iron-gate-studio', displayName: 'Iron Gate Studio', shortDescription: 'Game studio behind Valheim.', published: false },
  { slug: 'stunlock-studios', displayName: 'Stunlock Studios', shortDescription: 'Game studio behind V Rising.', published: false },
  { slug: 'g5-entertainment', displayName: 'G5 Entertainment', shortDescription: 'Developer of free-to-play mobile games.', published: false },

  // ============================================================
  // ADDITIONS: HEALTH
  // ============================================================

  { slug: 'doctrin', displayName: 'Doctrin', shortDescription: 'Digital healthcare platform for care providers.', published: false },
  { slug: 'firstvet', displayName: 'FirstVet', shortDescription: 'Video consultations with veterinarians.', published: false },

  // ============================================================
  // ADDITIONS: TELECOM / IOT
  // ============================================================

  { slug: 'telia', displayName: 'Telia Company', shortDescription: 'Telecommunications operator and digital services provider.', published: false }, // verify
  { slug: 'axis-communications', displayName: 'Axis Communications', shortDescription: 'Network video, access control and audio technology company.', published: false }, // verify
];

export const companies: Company[] = companyEntries.map((company) => {
  const stage = companyStageBySlug.get(company.slug);
  if (!stage) throw new Error(`No maturity stage assigned for ${company.slug}`);
  return { ...company, stage };
});
