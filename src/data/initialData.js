// Initial data for Her Success Journey 🌸

export const DEFAULT_CONFIG = {
  sisterName: "Afra Shahnaas",
  brotherName: "Bhaiya",
  tagline: "Little Steps. Big Dreams. Beautiful Success. ❤️",
  boardExamYear: "CBSE Class 10 Board Examination",
  hugsSent: 12,
  studyStreak: 5,
  lastStudyDate: new Date().toISOString().split('T')[0],
  boardTarget: "95%+"
};

// CBSE Class 10 Exam Timetable in exact order requested:
// First Exam: Mathematics (not Tamil), followed by Science, Social Science, English, Tamil (replacing Hindi), and IT.
export const DEFAULT_EXAMS = [
  {
    id: "maths-041",
    subject: "Mathematics (Standard / Basic)",
    code: "041 / 241",
    date: "2027-02-17",
    day: "Wednesday",
    time: "10:30 AM – 01:30 PM",
    durationHours: 3,
    room: "Exam Hall A",
    status: "Upcoming",
    syllabusStatus: "Well Revised",
    category: "Core",
    color: "from-blue-400 to-indigo-400",
    badgeBg: "bg-blue-100 text-blue-700 border-blue-200",
    notes: "Review Quadratic Formula, AP formulas, Trigonometric identities, Circle theorems, and Surface Area formulas.",
    icon: "Calculator",
    isFirstExam: true
  },
  {
    id: "science-086",
    subject: "Science",
    code: "086",
    date: "2027-02-23",
    day: "Tuesday",
    time: "10:30 AM – 01:30 PM",
    durationHours: 3,
    room: "Exam Hall A",
    status: "Upcoming",
    syllabusStatus: "In Progress",
    category: "Core",
    color: "from-emerald-400 to-teal-400",
    badgeBg: "bg-emerald-100 text-emerald-700 border-emerald-200",
    notes: "Practice Ray Diagrams (Mirror/Lens), Electricity formulas, Chemical reaction balancing, and Biology diagrams.",
    icon: "FlaskConical"
  },
  {
    id: "sst-087",
    subject: "Social Science",
    code: "087",
    date: "2027-03-01",
    day: "Monday",
    time: "10:30 AM – 01:30 PM",
    durationHours: 3,
    room: "Exam Hall A",
    status: "Upcoming",
    syllabusStatus: "In Progress",
    category: "Core",
    color: "from-amber-400 to-orange-400",
    badgeBg: "bg-amber-100 text-amber-700 border-amber-200",
    notes: "Nationalism in India timeline, Geography map items (Dams, Soil, Ports), Civics power sharing, and Economics terms.",
    icon: "Globe"
  },
  {
    id: "english-184",
    subject: "English (Language & Literature)",
    code: "184",
    date: "2027-03-06",
    day: "Saturday",
    time: "10:30 AM – 01:30 PM",
    durationHours: 3,
    room: "Exam Hall A",
    status: "Upcoming",
    syllabusStatus: "Exam Ready! ✨",
    category: "Language",
    color: "from-purple-400 to-indigo-400",
    badgeBg: "bg-purple-100 text-purple-700 border-purple-200",
    notes: "Revise Analytical Paragraph template, Formal Letter format, and First Flight character sketches.",
    icon: "Feather"
  },
  {
    id: "tamil-006",
    subject: "Tamil (Language & Literature)",
    code: "006",
    date: "2027-03-11",
    day: "Thursday",
    time: "10:30 AM – 01:30 PM",
    durationHours: 3,
    room: "Exam Hall A",
    status: "Upcoming",
    syllabusStatus: "Well Revised",
    category: "Language",
    color: "from-pink-400 to-rose-400",
    badgeBg: "bg-pink-100 text-pink-700 border-pink-200",
    notes: "Review செய்யுள் மனப்பாடப் பகுதி, இலக்கணம் (தொகைநிலை), and கடிதம் format.",
    icon: "BookOpen"
  },
  {
    id: "it-402",
    subject: "Information Technology",
    code: "402",
    date: "2027-03-16",
    day: "Tuesday",
    time: "10:30 AM – 12:30 PM",
    durationHours: 2,
    room: "Exam Hall B",
    status: "Upcoming",
    syllabusStatus: "Exam Ready! ✨",
    category: "Skill Subject",
    color: "from-rose-400 to-pink-500",
    badgeBg: "bg-rose-100 text-rose-700 border-rose-200",
    notes: "Digital Documentation styles, Calc Scenarios & Macros, DBMS queries & keys, and Cyber safety.",
    icon: "Laptop"
  }
];

// Initial Study Planner Tasks
export const DEFAULT_TASKS = [
  {
    id: "task-1",
    title: "Revise Quadratic Formula & solve 5 NCERT exemplars",
    subject: "Mathematics",
    chapter: "Quadratic Equations",
    priority: "High",
    estimatedMinutes: 45,
    isTarget: true,
    completed: true,
    createdAt: new Date().toISOString()
  },
  {
    id: "task-2",
    title: "Practice Light reflection & refraction ray diagrams with scale",
    subject: "Science",
    chapter: "Light (Physics)",
    priority: "High",
    estimatedMinutes: 35,
    isTarget: true,
    completed: true,
    createdAt: new Date().toISOString()
  },
  {
    id: "task-3",
    title: "Tamil: அன்னை மொழியே மனப்பாடப் பாடல் revision & write once",
    subject: "Tamil",
    chapter: "இயல் 1: அன்னை மொழியே",
    priority: "Medium",
    estimatedMinutes: 25,
    isTarget: true,
    completed: false,
    createdAt: new Date().toISOString()
  },
  {
    id: "task-4",
    title: "Practice History Map Items (Dandi March, Champaran, Kheda, Jallianwala Bagh)",
    subject: "Social Science",
    chapter: "Nationalism in India",
    priority: "High",
    estimatedMinutes: 30,
    isTarget: true,
    completed: false,
    createdAt: new Date().toISOString()
  },
  {
    id: "task-5",
    title: "Practice 1 Analytical Paragraph based on a chart",
    subject: "English",
    chapter: "Writing Skills",
    priority: "Low",
    estimatedMinutes: 25,
    isTarget: false,
    completed: false,
    createdAt: new Date().toISOString()
  }
];

// Motivational Quotes (includes required exact quotes + sisterly affirmations)
export const MOTIVATIONAL_QUOTES = [
  {
    quote: "Believe in yourself. You are capable of amazing things!",
    author: "Your Loving Brother",
    tag: "Confidence",
    icon: "✨"
  },
  {
    quote: "Every chapter you complete brings you one step closer to success.",
    author: "Her Success Journey",
    tag: "Progress",
    icon: "📚"
  },
  {
    quote: "Don't compare your journey with anyone else's.",
    author: "Brotherly Wisdom",
    tag: "Mindset",
    icon: "🌸"
  },
  {
    quote: "Your hard work today will become your confidence tomorrow.",
    author: "Daily Inspiration",
    tag: "Hard Work",
    icon: "💪"
  },
  {
    quote: "Small progress every day leads to big achievements.",
    author: "Consistency",
    tag: "Growth",
    icon: "🌱"
  },
  {
    quote: "You don't need to be perfect. Just give your best.",
    author: "Gentle Reminder",
    tag: "Self Love",
    icon: "💖"
  },
  {
    quote: "Stay calm, stay focused and trust yourself.",
    author: "Exam Calmness",
    tag: "Focus",
    icon: "🧘‍♀️"
  },
  {
    quote: "You have brains in your head. You have feet in your shoes. You can steer yourself any direction you choose!",
    author: "Dr. Seuss",
    tag: "Courage",
    icon: "⭐"
  },
  {
    quote: "No exam question can be harder than your determination, sister!",
    author: "Bhaiya's Pep Talk",
    tag: "Brother's Cheer",
    icon: "🔥"
  }
];

// Daily Affirmations for Sister
export const DAILY_AFFIRMATIONS = [
  "I am calm, capable, and prepared for my board exams.",
  "Every hour of focused study brings me clarity and confidence.",
  "I understand concepts clearly and remember them when needed.",
  "My brain is sharp, my heart is at peace, and I give my best.",
  "Mistakes are just stepping stones to understanding.",
  "I am proud of how far I have come, and excited for what I can achieve!",
  "My brother and family believe in me, and I believe in myself too!"
];

// Complete CBSE Class 10 Chapter Syllabus Checklist
export const CBSE_CHAPTERS = {
  "Mathematics": [
    { id: "m-1", name: "Real Numbers", important: "Fundamental Theorem of Arithmetic, Proof of Irrationality", completed: true },
    { id: "m-2", name: "Polynomials", important: "Zeros of Quadratic Polynomials, Relationship with Coefficients", completed: true },
    { id: "m-3", name: "Pair of Linear Equations in Two Variables", important: "Elimination & Substitution Method, Consistency", completed: true },
    { id: "m-4", name: "Quadratic Equations", important: "Quadratic Formula, Discriminant Nature of Roots", completed: false },
    { id: "m-5", name: "Arithmetic Progressions", important: "nth term formula, Sum of first n terms formula", completed: true },
    { id: "m-6", name: "Triangles", important: "Basic Proportionality Theorem (BPT) & Criteria for Similarity", completed: false },
    { id: "m-7", name: "Coordinate Geometry", important: "Distance Formula & Section Formula", completed: true },
    { id: "m-8", name: "Introduction to Trigonometry", important: "Values of Ratios (0°, 30°, 45°, 60°, 90°), sin²θ + cos²θ = 1", completed: false },
    { id: "m-9", name: "Some Applications of Trigonometry", important: "Heights and Distances, Angle of Elevation/Depression", completed: false },
    { id: "m-10", name: "Circles", important: "Tangents from external point are equal (Theorem 10.2)", completed: true },
    { id: "m-11", name: "Areas Related to Circles", important: "Area of Sector and Segment of a Circle", completed: false },
    { id: "m-12", name: "Surface Areas and Volumes", important: "Combination of Solids (Cylinder, Cone, Hemisphere)", completed: false },
    { id: "m-13", name: "Statistics", important: "Mean (Direct & Assumed), Median, Mode & Empirical Formula", completed: true },
    { id: "m-14", name: "Probability", important: "Classical Definition, Card problems, Dice, Coins", completed: true }
  ],
  "Science": [
    { id: "s-1", name: "Chemical Reactions and Equations", important: "Types of Reactions, Balancing Equations, Redox", completed: true },
    { id: "s-2", name: "Acids, Bases and Salts", important: "pH Scale, Bleaching Powder, Baking Soda, Plaster of Paris", completed: true },
    { id: "s-3", name: "Metals and Non-metals", important: "Reactivity Series, Ionic Bonding properties, Roasting & Calcination", completed: false },
    { id: "s-4", name: "Carbon and its Compounds", important: "Covalent bonding, Homologous Series, Saponification", completed: false },
    { id: "s-5", name: "Life Processes", important: "Nutrition, Respiration, Human Heart Diagram, Excretory System", completed: true },
    { id: "s-6", name: "Control and Coordination", important: "Neuron structure, Reflex Arc, Human Brain, Plant Hormones", completed: false },
    { id: "s-7", name: "How do Organisms Reproduce?", important: "Fission, Budding, Flower diagram, Male/Female Reproductive System", completed: false },
    { id: "s-8", name: "Heredity", important: "Mendel's Laws, Monohybrid (3:1) and Dihybrid (9:3:3:1) crosses, Sex determination", completed: true },
    { id: "s-9", name: "Light – Reflection and Refraction", important: "Mirror Formula, Lens Formula, Ray diagrams, Magnification", completed: true },
    { id: "s-10", name: "The Human Eye and the Colorful World", important: "Myopia & Hypermetropia correction, Dispersion, Atmospheric Refraction", completed: false },
    { id: "s-11", name: "Electricity", important: "Ohm's Law, Resistance in Series/Parallel, Joule's Heating, Power P=VI", completed: false },
    { id: "s-12", name: "Magnetic Effects of Electric Current", important: "Magnetic Field Lines, Right Hand Thumb Rule, Fleming's Left Hand Rule", completed: false },
    { id: "s-13", name: "Our Environment", important: "10% Law of Energy transfer, Ozone depletion, Food web", completed: true }
  ],
  "Social Science": [
    { id: "sst-1", name: "The Rise of Nationalism in Europe", important: "French Revolution ideas, Unification of Germany & Italy, Romanticism", completed: true },
    { id: "sst-2", name: "Nationalism in India", important: "Non-Cooperation, Civil Disobedience, Rowlatt Act, Salt March, Map Work", completed: true },
    { id: "sst-3", name: "The Making of a Global World", important: "Silk routes, Rinderpest, Bretton Woods Institutions", completed: false },
    { id: "sst-4", name: "Print Culture and the Modern World", important: "Gutenberg press, Reading mania, Print and the French Revolution", completed: false },
    { id: "sst-5", name: "Resources and Development", important: "Land degradation, Soil types of India map, Resource planning", completed: true },
    { id: "sst-6", name: "Forest and Wildlife Resources", important: "Types of forests (Reserved, Protected, Unclassed), Chipko movement", completed: true },
    { id: "sst-7", name: "Water Resources", important: "Multipurpose dams map (Bhakra Nangal, Tehri, Sardar Sarovar), Rainwater harvesting", completed: false },
    { id: "sst-8", name: "Agriculture", important: "Kharif/Rabi crops, Major Rice & Wheat producing states map", completed: false },
    { id: "sst-9", name: "Minerals and Energy Resources", important: "Iron ore mines map, Thermal & Nuclear power plants map", completed: false },
    { id: "sst-10", name: "Power Sharing (Civics)", important: "Belgium model vs Sri Lanka majoritarianism, Forms of power sharing", completed: true },
    { id: "sst-11", name: "Federalism", important: "Union, State & Concurrent lists, Decentralization in India (1992)", completed: true },
    { id: "sst-12", name: "Political Parties", important: "Functions of political parties, Challenges faced, National vs State parties", completed: false },
    { id: "sst-13", name: "Development (Economics)", important: "Per Capita Income vs Human Development Index (HDI), Sustainability", completed: true },
    { id: "sst-14", name: "Sectors of the Indian Economy", important: "Primary, Secondary, Tertiary, Disguised unemployment, MGNREGA", completed: false },
    { id: "sst-15", name: "Money and Credit", important: "Formal vs Informal credit sources, Self Help Groups (SHGs)", completed: true },
    { id: "sst-16", name: "Globalisation and the Indian Economy", important: "MNCs role, Factors enabling globalisation, Fair globalisation", completed: false }
  ],
  "English": [
    { id: "eng-1", name: "A Letter to God & Dust of Snow / Fire and Ice", important: "Lencho's faith vs irony, Robert Frost symbolism", completed: true },
    { id: "eng-2", name: "Nelson Mandela: Long Walk to Freedom & A Tiger in the Zoo", important: "Apartheid struggles, Courage definition, Contrast between zoo & wild tiger", completed: true },
    { id: "eng-3", name: "Two Stories about Flying (First Flight & Black Aeroplane)", important: "Young seagull conquering fear, Mystery of the black aeroplane pilot", completed: true },
    { id: "eng-4", name: "From the Diary of Anne Frank & Amanda!", important: "Kitty the diary, Mr. Keesing's essays, Amanda's yearning for freedom", completed: false },
    { id: "eng-5", name: "Glimpses of India (Goa / Coorg / Assam)", important: "Pader traditions, Kodavu bravery, Tea legend & discovery", completed: false },
    { id: "eng-6", name: "Mijbil the Otter & Fog", important: "Maxwell's journey with Mijbil, Carl Sandburg metaphor", completed: false },
    { id: "eng-7", name: "Madam Rides the Bus & Custard the Dragon", important: "Valli's determination & grief over dead cow, Custard's true heroism", completed: true },
    { id: "eng-8", name: "The Sermon at Benares & The Proposal (Play)", important: "Kisa Gotami and mustard seed lesson, Chubukov & Lomov quarrel humor", completed: false },
    { id: "eng-9", name: "Footprints without Feet (Supp. Reader)", important: "Triumph of Surgery, Thief's Story, Midnight Visitor, Necklace, Bholi", completed: true },
    { id: "eng-10", name: "Writing Skills: Formal Letter & Analytical Paragraph", important: "Format, clarity, comparative vocabulary, word count 100-120 words", completed: true }
  ],
  "Tamil": [
    { id: "tam-1", name: "இயல் 1: அன்னை மொழியே & தமிழ்ச் சொல்வளம்", important: "மனப்பாடப் பாடல்: அன்னை மொழியே, தாவரங்களின் இலை, கொழுந்து பெயர்கள்", completed: true },
    { id: "tam-2", name: "இயல் 2: காற்றே வா & முல்லைப்பாட்டு", important: "பாரதியார் கவிதை நயம், முல்லை நிலக் காட்சிகள், விரிச்சி கேட்டல்", completed: true },
    { id: "tam-3", name: "இயல் 3: விருந்து போற்றுதும் & காசிக்காண்டம்", important: "விருந்தோம்பல் மரபு, அதிவீரராம பாண்டியர் காசிக்காண்ட நற்பண்புகள்", completed: false },
    { id: "tam-4", name: "இயல் 4: செயற்கை நுண்ணறிவு & பெருமாள் திருமொழி", important: "AI பயன்கள், குலசேகர ஆழ்வார் பக்திப்பாடல்", completed: false },
    { id: "tam-5", name: "இயல் 5: மணற்கேணி & நீதி வெண்பா", important: "மொழிபெயர்ப்புக் கலை, செய்குதம்பி பாவலர் சதாவதானம்", completed: true },
    { id: "tam-6", name: "இயல் 6: நிகழ்கலை & பூத்தொடுத்தல்", important: "கரகாட்டம், மயிலாட்டம், உமா மகேஸ்வரி கவிதை வரிகள்", completed: false },
    { id: "tam-7", name: "இயல் 7: விதைநெல் & மெய்க்கீர்த்தி", important: "சிற்றகல் ஒளி (ம.பொ.சி.), இரண்டாம் ராசராச சோழன் மெய்க்கீர்த்தி", completed: false },
    { id: "tam-8", name: "இயல் 8: அறம் & ஞானம்", important: "காலக்கணிதம் (கண்ணதாசன்), ஞானம் (தி.சோ. வேணுகோபாலன்)", completed: false },
    { id: "tam-9", name: "இயல் 9: மனிதநேயம் & தேம்பாவணி", important: "வீரமாமுனிவர் வளன் சரிதம், ஜெயகாந்தன் நினைவு", completed: false },
    { id: "tam-10", name: "இலக்கணம்: தொகைநிலை & தொகாநிலைத் தொடர்கள்", important: "வேற்றுமைத் தொகை, வினைத்தொகை, பண்புத்தொகை, விளித்தொடர், வல்லினம் மிகும் இடங்கள்", completed: true }
  ],
  "Information Technology": [
    { id: "it-1", name: "Part A: Employability Skills", important: "Self-management, ICT basics, Entrepreneurship, Green economy", completed: true },
    { id: "it-2", name: "Digital Documentation (Advanced)", important: "Styles, Inserting Images, Mail Merge, Table of Contents", completed: true },
    { id: "it-3", name: "Electronic Spreadsheet (Advanced)", important: "Consolidating Data, Scenarios, Goal Seek, Solver, Linking sheets", completed: false },
    { id: "it-4", name: "Database Management System (DBMS)", important: "Tables, Fields, Records, Primary Key, Foreign Key, SQL SELECT query", completed: true },
    { id: "it-5", name: "Web Applications and Security", important: "Network concepts, Computer accessibility options, Cyber safety, Workplace hazards", completed: true }
  ]
};

// Badges & Achievements
export const DEFAULT_BADGES = [
  {
    id: "badge-first-step",
    title: "First Chapter Completed 🌸",
    description: "Marked your very first chapter as revised and ready!",
    icon: "🌸",
    reqCount: 1,
    type: "chapters",
    unlocked: true,
    unlockedDate: "Recently"
  },
  {
    id: "badge-5-chapters",
    title: "5 Chapters Completed 📚",
    description: "Gaining incredible momentum in your revision!",
    icon: "📚",
    reqCount: 5,
    type: "chapters",
    unlocked: true,
    unlockedDate: "Recently"
  },
  {
    id: "badge-10-chapters",
    title: "10 Chapters Completed 🏆",
    description: "Double digits of mastery across your CBSE syllabus!",
    icon: "🏆",
    reqCount: 10,
    type: "chapters",
    unlocked: true,
    unlockedDate: "Recently"
  },
  {
    id: "badge-20-chapters",
    title: "Revision Champion 👑",
    description: "Revised 20+ chapters thoroughly with notes and formulas!",
    icon: "👑",
    reqCount: 20,
    type: "chapters",
    unlocked: false,
    unlockedDate: null
  },
  {
    id: "badge-consistency",
    title: "Consistency Star ⭐",
    description: "Maintained a steady daily study streak of 3+ days!",
    icon: "⭐",
    reqCount: 3,
    type: "streak",
    unlocked: true,
    unlockedDate: "Recently"
  },
  {
    id: "badge-daily-hero",
    title: "Daily Study Hero 🦸‍♀️",
    description: "Achieved 100% of all planned daily study targets in a day!",
    icon: "🦸‍♀️",
    reqCount: 1,
    type: "dailyTarget",
    unlocked: true,
    unlockedDate: "Today"
  },
  {
    id: "badge-focus-master",
    title: "Focus Master 🧘‍♀️",
    description: "Completed 4 deep Pomodoro focus study blocks!",
    icon: "🧘‍♀️",
    reqCount: 4,
    type: "pomodoro",
    unlocked: false,
    unlockedDate: null
  },
  {
    id: "badge-board-ready",
    title: "Board Exam Ready ✨",
    description: "Every subject revised with calm confidence and high spirits!",
    icon: "✨",
    reqCount: 35,
    type: "chapters",
    unlocked: false,
    unlockedDate: null
  }
];

// Subject-Wise Quick Revision & Tips Corner
export const SUBJECT_REVISION_GUIDES = {
  "Mathematics": {
    badge: "Subject Code: 041 / 241",
    tagline: "Formulas, Precision & Step-Marking Mastery",
    color: "from-blue-500 to-indigo-600",
    bgSoft: "bg-blue-50/70 border-blue-200",
    keyFormulas: [
      { name: "Quadratic Formula", formula: "x = \\frac{-b \\pm \\sqrt{b^2 - 4ac}}{2a}", note: "Check Discriminant D = b² - 4ac. If D > 0 (2 distinct real roots), D = 0 (2 equal roots), D < 0 (no real roots)." },
      { name: "Arithmetic Progression (AP)", formula: "a_n = a + (n-1)d \\quad | \\quad S_n = \\frac{n}{2}[2a + (n-1)d] = \\frac{n}{2}(a + l)", note: "Verify common difference d = a₂ - a₁ before substituting." },
      { name: "Coordinate Geometry", formula: "Distance = \\sqrt{(x_2-x_1)^2 + (y_2-y_1)^2} \\quad | \\quad Section: (\\frac{m_1x_2 + m_2x_1}{m_1+m_2}, \\frac{m_1y_2 + m_2y_1}{m_1+m_2})", note: "Midpoint is just ( (x₁+x₂)/2, (y₁+y₂)/2 )." },
      { name: "Trigonometric Identities", formula: "\\sin^2\\theta + \\cos^2\\theta = 1 \\quad | \\quad 1 + \\tan^2\\theta = \\sec^2\\theta \\quad | \\quad 1 + \\cot^2\\theta = \\csc^2\\theta", note: "Remember: tan θ = sin θ / cos θ and cot θ = cos θ / sin θ." },
      { name: "Surface Area & Volumes", formula: "Cylinder CSA = 2\\pi rh \\quad | \\quad Cone CSA = \\pi rl \\quad | \\quad Sphere SA = 4\\pi r^2 \\quad | \\quad Hemisphere CSA = 2\\pi r^2", note: "Remember slant height of cone: l = √(r² + h²)." },
      { name: "Empirical Statistics", formula: "3 \\times Median = Mode + 2 \\times Mean", note: "Handy 1-mark question formula!" }
    ],
    strategyTips: [
      "CBSE gives step marks! Even if the final answer calculation slips, writing the formula, substitution, and units gives 80% marks.",
      "Always write concluding units (cm², m³, km/h, rupees). Missing units cost half a mark.",
      "In Geometry (Circles & Triangles), write 'Given', 'To Prove', 'Construction' (if any), and 'Proof' with theorem reasons in brackets.",
      "Keep rough work in a neat ruled margin on the right-hand side of each page instead of scribbling randomly."
    ]
  },
  "Science": {
    badge: "Subject Code: 086",
    tagline: "Physics Equations, Chemistry Reactions & Biology Diagrams",
    color: "from-emerald-500 to-teal-600",
    bgSoft: "bg-emerald-50/70 border-emerald-200",
    keyFormulas: [
      { name: "Mirror & Lens Formula", formula: "Mirror: \\frac{1}{f} = \\frac{1}{v} + \\frac{1}{u} \\quad | \\quad Lens: \\frac{1}{f} = \\frac{1}{v} - \\frac{1}{u}", note: "Magnification: m = -v/u (mirror), m = +v/u (lens). Object distance 'u' is always negative." },
      { name: "Power of a Lens", formula: "P = \\frac{1}{f \\text{ (in metres)}} \\quad (\\text{Unit: Dioptre, D})", note: "Convex lens focal length is positive (+D), Concave lens is negative (-D)." },
      { name: "Ohm's Law & Power", formula: "V = IR \\quad | \\quad P = VI = I^2R = \\frac{V^2}{R} \\quad | \\quad H = I^2Rt", note: "Series: R_s = R₁ + R₂ + ... | Parallel: 1/R_p = 1/R₁ + 1/R₂ + ..." },
      { name: "Mendelian Ratios", formula: "Monohybrid F2 = 3:1 (Phenotypic) / 1:2:1 (Genotypic) \\quad | \\quad Dihybrid F2 = 9:3:3:1", note: "Use Punnett square for crystal clear representation." }
    ],
    strategyTips: [
      "Draw all Biology diagrams in sharp pencil with neat straight label lines on the right side.",
      "Chemistry equations MUST be balanced with states of matter (s, l, g, aq) and catalysts/heat noted over the arrow.",
      "In Physics ray diagrams, remember arrowheads on rays! Missing arrowheads results in zero marks for that diagram.",
      "Use bullet points for reasoning questions (e.g. why sky appears blue, why ionic compounds have high melting points)."
    ]
  },
  "Social Science": {
    badge: "Subject Code: 087",
    tagline: "Dates, Key Events, Map Work & Point-Wise Answers",
    color: "from-amber-500 to-orange-600",
    bgSoft: "bg-amber-50/70 border-amber-200",
    keyFormulas: [
      { name: "History Key Timelines", formula: "1915 (Gandhi returns) → 1919 (Rowlatt & Jallianwala) → 1920-22 (NCM) → 1930 (Dandi March)", note: "Mention exact dates/years in your opening sentence of 3-mark and 5-mark answers." },
      { name: "5-Mark Structure Rule", formula: "Introduction (1 line) + 5 Numbered Headings with Explanation + Conclusion (1 line)", note: "Examiners scan headings and underlined key terms." },
      { name: "Map Work Golden Rules", formula: "6 Marks Map Section (2 History + 4 Geography)", note: "Practice marking with a sharpened dark 2B pencil. Write name clearly beside the locator point." }
    ],
    strategyTips: [
      "Never write long unbroken paragraphs. Break every answer into distinct points with bold headings.",
      "In Geography, always mention climate, rainfall, and soil type when discussing major crops like Rice, Wheat, Tea, or Cotton.",
      "In Civics (Political Science), use real-world constitutional examples (Belgium's community government, India's 73rd/74th amendments).",
      "In Economics, clearly distinguish between Per Capita Income vs HDI and Formal vs Informal credit."
    ]
  },
  "English": {
    badge: "Subject Code: 184",
    tagline: "Format Precision, Reading Speed & Analytical Eloquence",
    color: "from-purple-500 to-indigo-600",
    bgSoft: "bg-purple-50/70 border-purple-200",
    keyFormulas: [
      { name: "Formal Letter Format", formula: "Sender's Address → Date → Receiver's Designation/Address → Subject → Salutation → Body (3 paras) → Complimentary Close", note: "Keep subject concise (within 6-8 words). Salutation: 'Sir/Madam'." },
      { name: "Analytical Paragraph", formula: "Introductory Sentence + Overview/Trend + Comparison (Highest/Lowest) + Conclusion", note: "Use transition words: 'In contrast to', 'Strikingly', 'Whereas', 'Steadily increased'." }
    ],
    strategyTips: [
      "Utilize the 15-minute reading time specifically to read Unseen Comprehension passages and mark keywords.",
      "Keep within the word limits! CBSE penalizes overly lengthy essays that waste precious exam time.",
      "In Literature, quote key character traits and underlying themes (e.g. faith vs superstition in Letter to God, bravery in Nelson Mandela).",
      "Check grammar for subject-verb agreement and tense consistency before handing in."
    ]
  },
  "Tamil": {
    badge: "Subject Code: 006",
    tagline: "இலக்கண நுணுக்கங்கள், செய்யுள் நயம் & கட்டுரை கட்டமைப்பு",
    color: "from-pink-500 to-rose-600",
    bgSoft: "bg-pink-50/70 border-pink-200",
    keyFormulas: [
      { name: "தொகைநிலைத் தொடர்கள் (6 வகைகள்)", formula: "வேற்றுமை, வினை, பண்பு, உவமை, உம்மை, அன்மொழித் தொகை", note: "எ.கா: கரும்பு தின்றான் (வேற்றுமை), ஆடுகொடி (வினை), செந்தாமரை (பண்பு)." },
      { name: "தொகாநிலைத் தொடர்கள் (9 வகைகள்)", formula: "எழுவாய், விளி, வினைமுற்று, பெயரெச்ச, வினையெச்ச, இடைச்சொல், உரிச்சொல், அடுக்குத்தொடர்", note: "வெளிப்படையாக உருபுகள் நின்று பொருள் தருவது தொகாநிலை." },
      { name: "கடிதம் & விண்ணப்பம் முறை", formula: "அனுப்புநர் → பெறுநர் → விளிப்பு → பொருள் → செய்தி → நன்றியுரை → கையொப்பம்", note: "இடப்பக்கம், வலப்பக்கம் விதிகளையும் நிறுத்தற்குறிகளையும் கவனமாகப் பின்பற்றவும்." }
    ],
    strategyTips: [
      "மனப்பாடப் பாடலை எழுதும் போது, எந்தவொரு எழுத்துப் பிழையுமின்றி, சீர் பிரிப்பு முறையில் சரியாக எழுத வேண்டும்.",
      "செய்யுள் வினாக்களில் திரண்ட கருத்து, நயம் பாராட்டல் (மோனை, எதுகை, இயைபு) ஆகியவற்றைத் தனித்தனித் தலைப்புகளில் எழுதவும்.",
      "கட்டுரை எழுதும் போது முன்னுரை, உட்தலைப்புகள் (குறைந்தது 4), மற்றும் முடிவுரை எனத் தெளிவாக அமைத்து பழமொழிகளை மேற்கோள் காட்டவும்.",
      "கையெழுத்து மிகத் தெளிவாகவும், சொற்களுக்கிடையே சீரான இடைவெளியுடனும் இருக்க வேண்டும்."
    ]
  },
  "Information Technology": {
    badge: "Subject Code: 402",
    tagline: "Hands-on Practical Knowledge, Shortcuts & Database Queries",
    color: "from-rose-500 to-pink-600",
    bgSoft: "bg-rose-50/70 border-rose-200",
    keyFormulas: [
      { name: "SQL Query Basics", formula: "SELECT column_name FROM table_name WHERE condition ORDER BY column ASC/DESC;", note: "Primary Key uniquely identifies each record. Foreign Key establishes a relation between tables." },
      { name: "Spreadsheet Tools", formula: "Scenarios (What-if analysis) | Goal Seek (Finding input for desired output) | Solver (Multi-variable optimization)", note: "Linking external sheets syntax: ='file:///path/file.ods'#$Sheet1.A1" }
    ],
    strategyTips: [
      "IT 402 is a 50-mark theory paper for 2 hours. Manage your time efficiently to review all 1-mark objective questions.",
      "Remember navigation steps for software actions (e.g., Styles & Formatting window: Press F11 in Writer).",
      "Part A (Employability Skills) carries 10 easy marks—revise communication barriers and green economy terms.",
      "Answer in clear bullet points with software terminology."
    ]
  }
};

// General CBSE Class 10 Exam Day Strategies
export const GENERAL_EXAM_STRATEGIES = [
  {
    title: "The First 15-Minute Reading Power Strategy ⏱️",
    icon: "Clock",
    points: [
      "Do NOT rush to start writing immediately. Use this time with a clear, calm mind.",
      "Scan the entire paper once to identify familiar, high-scoring questions.",
      "In Reading/Comprehension (English & Tamil), read the questions FIRST before reading the passage.",
      "Mentally plan your choice of internal option questions (e.g. Question 14 OR 14)."
    ]
  },
  {
    title: "CBSE Presentation & Answer-Writing Blueprint 📝",
    icon: "CheckCircle",
    points: [
      "Draw a neat 1-inch right-hand margin for rough calculations and scratch work.",
      "Always underline key terms, dates, formulas, and final answers with a pencil.",
      "Leave 2 blank lines between consecutive answers to give the paper an airy, polished feel.",
      "If you make a mistake, strike it through with a single clean horizontal line—never scribble messily."
    ]
  },
  {
    title: "3-Hour Mock Paper & Revision Checklist 🎯",
    icon: "Target",
    points: [
      "Practice at least two full 3-hour mock papers for each subject from 10:30 AM to 01:30 PM to train your body clock.",
      "Keep water and your admit card/transparent stationery pouch ready the night before.",
      "Section-wise time management: Section A (MCQs) ≤ 35 mins; Section B & C ≤ 60 mins; Section D & E ≤ 65 mins; Final revision buffer = 20 mins."
    ]
  }
];
