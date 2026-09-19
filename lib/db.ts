import { 
  Course, Teacher, Batch, Enquiry, TrialRegistration, Student, AttendanceRecord, 
  TestResult, Testimonial, Announcement, StudyMaterial, InstituteSettings, 
  FeePayment, LeaveRequest, StudentBadge, StudentDoubt, VideoLesson, QuizQuestion, 
  QuizResult, UserAccount, CommunityImpactMetric, PtmBooking,
  SyllabusChapter, StudyPlanSchedule, StudentIdCard, ExpenseRecord, AcademicEvent, FormulaFlashcard, ChapterStatus
} from './types';

// Re-export mock data for local storage initialization
import { 
  INITIAL_COURSES as MOCK_COURSES, 
  INITIAL_TEACHERS as MOCK_TEACHERS, 
  INITIAL_BATCHES as MOCK_BATCHES, 
  INITIAL_ENQUIRIES as MOCK_ENQUIRIES, 
  INITIAL_TRIALS as MOCK_TRIALS, 
  INITIAL_STUDENTS as MOCK_STUDENTS, 
  INITIAL_ATTENDANCE as MOCK_ATTENDANCE, 
  INITIAL_TEST_RESULTS as MOCK_TEST_RESULTS, 
  INITIAL_TESTIMONIALS as MOCK_TESTIMONIALS, 
  INITIAL_ANNOUNCEMENTS as MOCK_ANNOUNCEMENTS, 
  INITIAL_STUDY_MATERIALS as MOCK_STUDY_MATERIALS 
} from './mockData';
import { DEFAULT_SETTINGS as MOCK_SETTINGS } from './constants';

const INITIAL_COMMUNITY_METRICS: CommunityImpactMetric[] = [
  {
    id: 'cim-1',
    label: 'Free Trial Classes Provided',
    value: '42+ Students',
    change: '+180% vs previous term',
    description: 'Democratized access to quality tuition by eliminating upfront admission fees for local families.',
    sdgTag: 'SDG 4',
  },
  {
    id: 'cim-2',
    label: 'Educator Income Sustainability',
    value: '+65% Growth',
    change: 'Sec-22B Micro-Enterprise',
    description: 'Streamlined batch enrollments and eliminated reliance on unorganized offline commission agents.',
    sdgTag: 'SDG 8',
  },
  {
    id: 'cim-3',
    label: 'Digital Classroom Transition',
    value: '100% Paperless',
    change: 'QR Attendance & Fee Receipts',
    description: 'Replaced torn paper registers with QR check-ins, computerized markbooks, and automated parent alerts.',
    sdgTag: 'SDG 9',
  },
  {
    id: 'cim-4',
    label: 'CBSE Board Pass & Mastery Rate',
    value: '96.4%',
    change: 'Consistently above Gurgaon avg',
    description: 'Personalized doubt clearance via 24/7 AI and teacher review queues for Maths and Science.',
    sdgTag: 'SDG 4',
  },
  {
    id: 'cim-5',
    label: 'Community Service Hours Logged',
    value: '75+ Hours',
    change: 'Digital Onboarding & Tech Training',
    description: 'Direct field hours dedicated to teacher technology training, Google Maps optimization, and curriculum digitization.',
    sdgTag: 'SDG 9',
  },
  {
    id: 'cim-6',
    label: 'Average Parent Satisfaction',
    value: '4.9 / 5.0 ★',
    change: 'Across 60+ local reviews',
    description: 'Transparent visibility into student attendance and monthly academic progress cards.',
    sdgTag: 'SDG 4',
  },
];

const INITIAL_PTM_BOOKINGS: PtmBooking[] = [
  {
    id: 'ptm-1',
    studentId: 'std-1',
    studentName: 'Aarav Sharma',
    parentName: 'Ramesh Sharma',
    parentPhone: '9810989437',
    preferredTeacher: 'Praveen Gandhi (Maths)',
    preferredSlot: 'Saturday, 4:30 PM - 4:45 PM',
    concernArea: 'Pre-board Trigonometry preparation and test review',
    status: 'CONFIRMED',
    createdAt: '2026-03-01T10:30:00Z',
  }
];

export const INITIAL_SYLLABUS_CHAPTERS: SyllabusChapter[] = [
  // Class 10 Maths
  {
    id: 'ch-m10-1',
    grade: 'Class 10',
    subject: 'Mathematics',
    chapterNo: 1,
    title: 'Real Numbers',
    weightageMarks: 6,
    status: 'Completed',
    keyFormulas: ['Fundamental Theorem of Arithmetic', 'HCF(a, b) × LCM(a, b) = a × b', 'Proof of irrationality of √2, √3, √5'],
    examTips: 'Guaranteed 3-mark question on proving irrationality using contradiction. Be rigorous with co-prime assumption steps.',
    ncertExercisesCount: 3,
  },
  {
    id: 'ch-m10-2',
    grade: 'Class 10',
    subject: 'Mathematics',
    chapterNo: 2,
    title: 'Polynomials',
    weightageMarks: 4,
    status: 'Completed',
    keyFormulas: ['α + β = -b/a', 'αβ = c/a', 'Quadratic polynomial: k[x² - (α+β)x + αβ]'],
    examTips: 'Practice forming quadratic polynomials given symmetric expressions of zeroes like (1/α + 1/β) and (α² + β²).',
    ncertExercisesCount: 3,
  },
  {
    id: 'ch-m10-3',
    grade: 'Class 10',
    subject: 'Mathematics',
    chapterNo: 3,
    title: 'Pair of Linear Equations in Two Variables',
    weightageMarks: 6,
    status: 'Completed',
    keyFormulas: ['Consistent & Unique: a1/a2 ≠ b1/b2', 'Infinitely Many: a1/a2 = b1/b2 = c1/c2', 'Inconsistent / Parallel: a1/a2 = b1/b2 ≠ c1/c2'],
    examTips: 'Word problems on upstream/downstream speed and fraction manipulation are frequently asked 4-markers.',
    ncertExercisesCount: 4,
  },
  {
    id: 'ch-m10-4',
    grade: 'Class 10',
    subject: 'Mathematics',
    chapterNo: 4,
    title: 'Quadratic Equations',
    weightageMarks: 8,
    status: 'In Progress',
    keyFormulas: ['Standard Form: ax² + bx + c = 0', 'Discriminant D = b² - 4ac', 'Roots: x = (-b ± √D) / 2a', 'D > 0: 2 Real & Distinct', 'D = 0: 2 Real & Equal', 'D < 0: No Real Roots'],
    examTips: 'Praveen Sir\'s tip: Always write the discriminant condition explicitly before solving for k when roots are real and equal.',
    ncertExercisesCount: 4,
  },
  {
    id: 'ch-m10-5',
    grade: 'Class 10',
    subject: 'Mathematics',
    chapterNo: 5,
    title: 'Arithmetic Progressions',
    weightageMarks: 6,
    status: 'In Progress',
    keyFormulas: ['an = a + (n - 1)d', 'Sn = (n/2)[2a + (n - 1)d]', 'Sn = (n/2)[a + l]', 'an = Sn - S(n-1)'],
    examTips: 'Case-study questions often feature daily savings or staircase step problems based on AP sum formulas.',
    ncertExercisesCount: 4,
  },
  {
    id: 'ch-m10-6',
    grade: 'Class 10',
    subject: 'Mathematics',
    chapterNo: 6,
    title: 'Triangles',
    weightageMarks: 8,
    status: 'Revision Needed',
    keyFormulas: ['Basic Proportionality Theorem (Thales): AD/DB = AE/EC', 'Converse of BPT', 'Similarity Criteria: AAA, SSS, SAS'],
    examTips: 'State and prove Basic Proportionality Theorem is a classic 5-mark theorem question. Draw neat, labeled diagrams.',
    ncertExercisesCount: 3,
  },
  {
    id: 'ch-m10-7',
    grade: 'Class 10',
    subject: 'Mathematics',
    chapterNo: 7,
    title: 'Coordinate Geometry',
    weightageMarks: 6,
    status: 'Completed',
    keyFormulas: ['Distance = √[(x₂ - x₁)² + (y₂ - y₁)²]', 'Section Formula: [ (m₁x₂ + m₂x₁)/(m₁+m₂), (m₁y₂ + m₂y₁)/(m₁+m₂) ]', 'Midpoint = [(x₁+x₂)/2, (y₁+y₂)/2]'],
    examTips: 'When finding the ratio in which a point divides a segment, always let ratio be k:1 instead of m:n to simplify algebra.',
    ncertExercisesCount: 2,
  },
  {
    id: 'ch-m10-8',
    grade: 'Class 10',
    subject: 'Mathematics',
    chapterNo: 8,
    title: 'Introduction to Trigonometry',
    weightageMarks: 8,
    status: 'In Progress',
    keyFormulas: ['sin²θ + cos²θ = 1', '1 + tan²θ = sec²θ', '1 + cot²θ = cosec²θ', 'tanθ = sinθ/cosθ', 'Values at 0°, 30°, 45°, 60°, 90°'],
    examTips: 'Memorize the standard angle table cold. For identity proofs, convert all terms to sin and cos when stuck.',
    ncertExercisesCount: 4,
  },
  {
    id: 'ch-m10-9',
    grade: 'Class 10',
    subject: 'Mathematics',
    chapterNo: 9,
    title: 'Some Applications of Trigonometry',
    weightageMarks: 6,
    status: 'Not Started',
    keyFormulas: ['Angle of Elevation (looking up)', 'Angle of Depression (looking down)', 'tanθ = Opposite / Adjacent'],
    examTips: 'Always read the question twice to check if height of observer is given (must be subtracted from tower height).',
    ncertExercisesCount: 1,
  },
  {
    id: 'ch-m10-10',
    grade: 'Class 10',
    subject: 'Mathematics',
    chapterNo: 10,
    title: 'Circles',
    weightageMarks: 6,
    status: 'Not Started',
    keyFormulas: ['Tangent at any point is perpendicular to radius through point of contact', 'Lengths of tangents drawn from an external point are equal'],
    examTips: 'Theorem 10.2 proof (tangents from external point) is tested almost every alternating year in CBSE boards.',
    ncertExercisesCount: 2,
  },
  {
    id: 'ch-m10-11',
    grade: 'Class 10',
    subject: 'Mathematics',
    chapterNo: 11,
    title: 'Areas Related to Circles',
    weightageMarks: 4,
    status: 'Not Started',
    keyFormulas: ['Area of Sector = (θ/360°) × πr²', 'Length of Arc = (θ/360°) × 2πr', 'Area of Segment = Area of Sector - Area of Triangle'],
    examTips: 'Take π = 22/7 unless 3.14 is explicitly specified in the question.',
    ncertExercisesCount: 2,
  },
  {
    id: 'ch-m10-12',
    grade: 'Class 10',
    subject: 'Mathematics',
    chapterNo: 12,
    title: 'Surface Areas and Volumes',
    weightageMarks: 8,
    status: 'Not Started',
    keyFormulas: ['Cylinder Volume = πr²h, CSA = 2πrh, TSA = 2πr(r+h)', 'Cone Volume = (1/3)πr²h, Slant height l = √(r²+h²)', 'Sphere Volume = (4/3)πr³, Surface = 4πr²', 'Hemisphere Volume = (2/3)πr³, TSA = 3πr²'],
    examTips: 'When melting one solid into another, always equate total volume before solving for dimensions.',
    ncertExercisesCount: 3,
  },
  {
    id: 'ch-m10-13',
    grade: 'Class 10',
    subject: 'Mathematics',
    chapterNo: 13,
    title: 'Statistics',
    weightageMarks: 8,
    status: 'Completed',
    keyFormulas: ['Mean = Σ(fi·xi) / Σfi', 'Assumed Mean = a + [Σ(fi·di) / Σfi]', 'Median = l + [(n/2 - cf) / f] × h', 'Mode = l + [(f₁ - f₀) / (2f₁ - f₀ - f₂)] × h', 'Empirical Formula: 3 Median = Mode + 2 Mean'],
    examTips: 'Pay strict attention to cumulative frequency column calculation and check that sum of fi equals N.',
    ncertExercisesCount: 3,
  },
  {
    id: 'ch-m10-14',
    grade: 'Class 10',
    subject: 'Mathematics',
    chapterNo: 14,
    title: 'Probability',
    weightageMarks: 4,
    status: 'Completed',
    keyFormulas: ['P(E) = Number of favorable outcomes / Total possible outcomes', 'P(E) + P(not E) = 1', '0 ≤ P(E) ≤ 1'],
    examTips: 'Master pack of 52 playing cards terminology (12 face cards: 4 Kings, 4 Queens, 4 Jacks; 26 red, 26 black).',
    ncertExercisesCount: 2,
  },

  // Class 10 Science
  {
    id: 'ch-s10-1',
    grade: 'Class 10',
    subject: 'Science',
    chapterNo: 1,
    title: 'Chemical Reactions and Equations',
    weightageMarks: 7,
    status: 'Completed',
    keyFormulas: ['Types: Combination, Decomposition, Displacement, Double Displacement, Redox', 'Oxidation: Gain of O / Loss of H', 'Reduction: Loss of O / Gain of H', 'Corrosion & Rancidity prevention'],
    examTips: 'Rashmi Ma\'am\'s tip: Always write physical states (s, l, g, aq) and balance atoms on both sides for full marks.',
    ncertExercisesCount: 3,
  },
  {
    id: 'ch-s10-2',
    grade: 'Class 10',
    subject: 'Science',
    chapterNo: 2,
    title: 'Acids, Bases and Salts',
    weightageMarks: 6,
    status: 'Completed',
    keyFormulas: ['pH = -log[H+]', 'Bleaching Powder: CaOCl₂', 'Baking Soda: NaHCO₃', 'Washing Soda: Na₂CO₃·10H₂O', 'Plaster of Paris: CaSO₄·½H₂O'],
    examTips: 'Preparation reactions and uses of chlor-alkali products (H₂, Cl₂, NaOH) are frequently tested.',
    ncertExercisesCount: 3,
  },
  {
    id: 'ch-s10-3',
    grade: 'Class 10',
    subject: 'Science',
    chapterNo: 3,
    title: 'Metals and Non-metals',
    weightageMarks: 8,
    status: 'In Progress',
    keyFormulas: ['Reactivity Series: K > Na > Ca > Mg > Al > Zn > Fe > Pb > [H] > Cu > Hg > Ag > Au', 'Ionic compounds: High MP/BP, conduct electricity in molten/solution state', 'Roasting vs Calcination'],
    examTips: 'Know the extraction of metals in the middle of reactivity series (reduction using carbon / thermite reaction).',
    ncertExercisesCount: 4,
  },
  {
    id: 'ch-s10-4',
    grade: 'Class 10',
    subject: 'Science',
    chapterNo: 4,
    title: 'Carbon and its Compounds',
    weightageMarks: 9,
    status: 'In Progress',
    keyFormulas: ['Covalent bonding & Catenation', 'Homologous series: Alkanes CnH2n+2, Alkenes CnH2n, Alkynes CnH2n-2', 'Esterification: Acid + Alcohol -> Ester + Water', 'Saponification'],
    examTips: 'Cleansing action of soap with micelle formation diagram is a high-probability 5-mark question.',
    ncertExercisesCount: 4,
  },
  {
    id: 'ch-s10-5',
    grade: 'Class 10',
    subject: 'Science',
    chapterNo: 5,
    title: 'Life Processes',
    weightageMarks: 10,
    status: 'Completed',
    keyFormulas: ['Photosynthesis: 6CO₂ + 12H₂O -> C₆H₁₂O₆ + 6O₂ + 6H₂O', 'Aerobic vs Anaerobic respiration', 'Double circulation in human heart', 'Structure and function of Nephron in kidneys'],
    examTips: 'Draw clear labeled diagrams of human digestive system and nephron with filtration and reabsorption stages.',
    ncertExercisesCount: 4,
  },
  {
    id: 'ch-s10-6',
    grade: 'Class 10',
    subject: 'Science',
    chapterNo: 6,
    title: 'Control and Coordination',
    weightageMarks: 6,
    status: 'Revision Needed',
    keyFormulas: ['Reflex Arc: Receptor -> Sensory Neuron -> Spinal Cord -> Motor Neuron -> Effector', 'Plant Hormones: Auxin, Gibberellin, Cytokinin, Abscisic acid', 'Endocrine glands and hormones (Insulin, Thyroxine, Adrenaline)'],
    examTips: 'Understand phototropism mechanism mediated by auxin diffusion on the shaded side of shoots.',
    ncertExercisesCount: 3,
  },
  {
    id: 'ch-s10-7',
    grade: 'Class 10',
    subject: 'Science',
    chapterNo: 7,
    title: 'How do Organisms Reproduce?',
    weightageMarks: 8,
    status: 'In Progress',
    keyFormulas: ['Asexual: Binary fission, Budding, Spore formation, Regeneration', 'Structure of bisexual flower (Stamen, Carpel, Petal, Sepal)', 'Double fertilization in angiosperms', 'Human male & female reproductive systems'],
    examTips: 'Know contraceptive methods (barrier, chemical, surgical) and STD awareness for value-based questions.',
    ncertExercisesCount: 3,
  },
  {
    id: 'ch-s10-8',
    grade: 'Class 10',
    subject: 'Science',
    chapterNo: 8,
    title: 'Heredity',
    weightageMarks: 5,
    status: 'Not Started',
    keyFormulas: ['Mendel\'s Monohybrid Cross (F2 Phenotypic 3:1, Genotypic 1:2:1)', 'Dihybrid Cross (9:3:3:1)', 'Sex determination in humans (XX female, XY male)'],
    examTips: 'Show clear Punnett squares when solving genetics crosses. The father determines the sex of the child.',
    ncertExercisesCount: 2,
  },
  {
    id: 'ch-s10-9',
    grade: 'Class 10',
    subject: 'Science',
    chapterNo: 9,
    title: 'Light - Reflection and Refraction',
    weightageMarks: 10,
    status: 'Completed',
    keyFormulas: ['Mirror Formula: 1/f = 1/v + 1/u', 'Lens Formula: 1/f = 1/v - 1/u', 'Magnification m = -v/u (mirror) = +v/u (lens)', 'Snell\'s Law: sin i / sin r = constant (n₂₁)', 'Power P = 1/f (in meters) Dioptres'],
    examTips: 'Cartesian sign convention: focal length of concave mirror/lens is ALWAYS negative, convex is positive.',
    ncertExercisesCount: 4,
  },
  {
    id: 'ch-s10-10',
    grade: 'Class 10',
    subject: 'Science',
    chapterNo: 10,
    title: 'The Human Eye and the Colourful World',
    weightageMarks: 6,
    status: 'In Progress',
    keyFormulas: ['Myopia (Near-sightedness) corrected by Concave Lens', 'Hypermetropia (Far-sightedness) corrected by Convex Lens', 'Prism Dispersion (VIBGYOR)', 'Atmospheric Refraction (Twinkling of stars, Advanced sunrise)', 'Tyndall Effect & Blue sky scattering (Rayleigh scattering ∝ 1/λ⁴)'],
    examTips: 'Ray diagrams showing eye defect before and after lens correction are high-yield questions.',
    ncertExercisesCount: 3,
  },
  {
    id: 'ch-s10-11',
    grade: 'Class 10',
    subject: 'Science',
    chapterNo: 11,
    title: 'Electricity',
    weightageMarks: 9,
    status: 'Not Started',
    keyFormulas: ['Ohm\'s Law: V = IR', 'Resistance: R = ρ(L/A)', 'Series: Rs = R₁ + R₂ + R₃', 'Parallel: 1/Rp = 1/R₁ + 1/R₂ + 1/R₃', 'Joule\'s Heating: H = I²Rt', 'Power: P = VI = I²R = V²/R', '1 kWh = 3.6 × 10⁶ Joules'],
    examTips: 'Convert all minutes/hours into seconds for time t when applying H = I²Rt formula.',
    ncertExercisesCount: 4,
  },
  {
    id: 'ch-s10-12',
    grade: 'Class 10',
    subject: 'Science',
    chapterNo: 12,
    title: 'Magnetic Effects of Electric Current',
    weightageMarks: 7,
    status: 'Not Started',
    keyFormulas: ['Right Hand Thumb Rule for magnetic field around straight conductor', 'Solenoid magnetic field pattern like bar magnet', 'Fleming\'s Left Hand Rule (FBI: Force, Field, Current)', 'Domestic circuits (Live 220V, Neutral 0V, Earth safety)'],
    examTips: 'State principle of domestic circuit earthing and difference between overloading and short-circuiting.',
    ncertExercisesCount: 3,
  },
  {
    id: 'ch-s10-13',
    grade: 'Class 10',
    subject: 'Science',
    chapterNo: 13,
    title: 'Our Environment',
    weightageMarks: 5,
    status: 'Completed',
    keyFormulas: ['Trophic Levels: Producers -> Herbivores -> Carnivores -> Top Carnivores', 'Lindeman\'s 10% Law of Energy transfer', 'Biological Magnification of non-biodegradable pesticides', 'Ozone layer destruction by CFCs and UV radiation'],
    examTips: 'Explain why food chains typically do not exceed 3 to 4 trophic levels (due to 90% progressive energy dissipation).',
    ncertExercisesCount: 2,
  },
];

export const INITIAL_FLASHCARDS: FormulaFlashcard[] = [
  {
    id: 'fc-1',
    subject: 'Mathematics',
    grade: 'Class 10',
    chapter: 'Quadratic Equations',
    title: 'Nature of Roots & Discriminant',
    frontQuestion: 'What are the conditions for real and equal roots in a quadratic equation ax² + bx + c = 0?',
    backAnswer: 'Roots are real and equal when Discriminant D = b² - 4ac = 0. The equal root value is x = -b / (2a).',
    keyFormula: 'D = b² - 4ac = 0  =>  x = -b / 2a',
    examNote: 'Tested frequently in finding unknown constant k when roots are given as equal.',
  },
  {
    id: 'fc-2',
    subject: 'Mathematics',
    grade: 'Class 10',
    chapter: 'Trigonometry',
    title: 'Fundamental Pythagorean Identities',
    frontQuestion: 'State the three fundamental trigonometric identities relating sin, cos, tan, sec, cosec, and cot.',
    backAnswer: '1. sin²θ + cos²θ = 1\n2. 1 + tan²θ = sec²θ\n3. 1 + cot²θ = cosec²θ',
    keyFormula: 'sin²θ + cos²θ = 1  |  sec²θ - tan²θ = 1  |  cosec²θ - cot²θ = 1',
    examNote: 'Always convert terms into sin and cos when proving complex trigonometric LHS = RHS identities.',
  },
  {
    id: 'fc-3',
    subject: 'Mathematics',
    grade: 'Class 10',
    chapter: 'Arithmetic Progressions',
    title: 'Sum of n Terms of an AP',
    frontQuestion: 'What are the two formulas for calculating the sum of first n terms of an Arithmetic Progression?',
    backAnswer: 'Formula 1: Sn = (n / 2) × [2a + (n - 1)d]\nFormula 2: Sn = (n / 2) × [a + l], where l is the last term (an).',
    keyFormula: 'Sn = (n/2)[2a + (n - 1)d] = (n/2)[a + l]',
    examNote: 'Remember: an = Sn - S(n-1) to find any nth term given the sum formula.',
  },
  {
    id: 'fc-4',
    subject: 'Mathematics',
    grade: 'Class 10',
    chapter: 'Coordinate Geometry',
    title: 'Internal Section Formula',
    frontQuestion: 'What are the coordinates of point P(x, y) dividing the line segment joining A(x₁, y₁) and B(x₂, y₂) in the ratio m₁:m₂?',
    backAnswer: 'P(x, y) = [ (m₁x₂ + m₂x₁) / (m₁ + m₂), (m₁y₂ + m₂y₁) / (m₁ + m₂) ]',
    keyFormula: 'x = (m₁x₂ + m₂x₁)/(m₁+m₂),  y = (m₁y₂ + m₂y₁)/(m₁+m₂)',
    examNote: 'For midpoint, ratio is 1:1, so x = (x₁+x₂)/2 and y = (y₁+y₂)/2.',
  },
  {
    id: 'fc-5',
    subject: 'Science',
    grade: 'Class 10',
    chapter: 'Light & Optics',
    title: 'Mirror & Lens Formulas with Sign Rules',
    frontQuestion: 'State the mirror formula and lens formula. What is the sign of focal length for concave vs convex optical elements?',
    backAnswer: 'Mirror Formula: 1/f = 1/v + 1/u\nLens Formula: 1/f = 1/v - 1/u\nFocal Length: Concave elements have NEGATIVE (-f), Convex elements have POSITIVE (+f).',
    keyFormula: 'Mirror: 1/f = 1/v + 1/u | Lens: 1/f = 1/v - 1/u',
    examNote: 'Object distance u is ALWAYS negative according to Cartesian sign conventions.',
  },
  {
    id: 'fc-6',
    subject: 'Science',
    grade: 'Class 10',
    chapter: 'Electricity',
    title: 'Ohm\'s Law & Heating Effect',
    frontQuestion: 'State Ohm\'s Law and Joule\'s Law of Heating with their mathematical formulas.',
    backAnswer: 'Ohm\'s Law: Current is directly proportional to potential difference across a conductor at constant temperature (V = IR).\nJoule\'s Law of Heating: Heat produced is proportional to I², R, and t (H = I²Rt).',
    keyFormula: 'V = I × R  |  H = I² × R × t  |  P = V × I = I²R = V²/R',
    examNote: 'Commercial unit of electrical energy is 1 kWh = 1 unit = 3.6 × 10⁶ Joules.',
  },
  {
    id: 'fc-7',
    subject: 'Science',
    grade: 'Class 10',
    chapter: 'Acids, Bases & Salts',
    title: 'Common Salt Derivatives',
    frontQuestion: 'What are the chemical names and formulas of Bleaching Powder, Baking Soda, and Plaster of Paris?',
    backAnswer: '1. Bleaching Powder: Calcium oxychloride (CaOCl₂)\n2. Baking Soda: Sodium hydrogen carbonate (NaHCO₃)\n3. Plaster of Paris: Calcium sulphate hemihydrate (CaSO₄·½H₂O)',
    keyFormula: 'Bleaching: CaOCl₂ | Baking: NaHCO₃ | POP: CaSO₄·½H₂O',
    examNote: 'On mixing POP with water, Gypsum (CaSO₄·2H₂O) is reformed with evolution of heat.',
  },
  {
    id: 'fc-8',
    subject: 'Science',
    grade: 'Class 10',
    chapter: 'Life Processes',
    title: 'Balanced Photosynthesis Equation',
    frontQuestion: 'Write the complete balanced chemical equation for oxygenic photosynthesis in green plants.',
    backAnswer: '6CO₂ + 12H₂O --(Chlorophyll & Sunlight)--> C₆H₁₂O₆ + 6O₂ + 6H₂O\nCarbon dioxide + water -> Glucose + Oxygen + Water.',
    keyFormula: '6CO₂ + 12H₂O --[hv / Chlorophyll]--> C₆H₁₂O₆ + 6O₂ + 6H₂O',
    examNote: 'Oxygen released during photosynthesis comes from the photolysis of water, NOT from carbon dioxide.',
  },
];

export const INITIAL_EXPENSES: ExpenseRecord[] = [
  {
    id: 'exp-1',
    title: 'Coaching Center Premises Rent (Sec-22B)',
    category: 'Rent',
    amount: 18000,
    date: '2026-09-01',
    paidTo: 'Property Owner (948 Sec-22B)',
    paymentMethod: 'NETBANKING',
    receiptRef: 'RENT-SEP-26',
  },
  {
    id: 'exp-2',
    title: 'Electricity & Dual Inverter AC Bill',
    category: 'Utilities & Electricity',
    amount: 3450,
    date: '2026-09-03',
    paidTo: 'DHBVN Gurugram',
    paymentMethod: 'UPI',
    receiptRef: 'DHBVN-884210',
  },
  {
    id: 'exp-3',
    title: 'Class 10 CBSE 10-Yr PYQ Question Banks Xerox',
    category: 'Printing & Question Banks',
    amount: 2200,
    date: '2026-09-04',
    paidTo: 'Om Stationery & Printing Sec-22',
    paymentMethod: 'UPI',
    receiptRef: 'INV-4412',
  },
  {
    id: 'exp-4',
    title: 'Society Bulletin Board Flyers & Table Standees',
    category: 'Marketing & Flyers',
    amount: 1800,
    date: '2026-09-06',
    paidTo: 'Gurgaon Digital Print Hub',
    paymentMethod: 'UPI',
    receiptRef: 'PRINT-9931',
  },
  {
    id: 'exp-5',
    title: 'High-Speed Fiber WiFi & SMS Gateway',
    category: 'Utilities & Electricity',
    amount: 999,
    date: '2026-09-07',
    paidTo: 'Airtel Fiber Gurugram',
    paymentMethod: 'UPI',
    receiptRef: 'AIR-09221',
  },
  {
    id: 'exp-6',
    title: 'Lab Glassware & Optics Prism Kit Replenishment',
    category: 'Miscellaneous',
    amount: 1250,
    date: '2026-09-08',
    paidTo: 'Scientific Instrument Depot',
    paymentMethod: 'CASH',
    receiptRef: 'SCI-0041',
  },
];

export const INITIAL_ACADEMIC_EVENTS: AcademicEvent[] = [
  {
    id: 'evt-1',
    title: 'Sunday Mega Trigonometry & Ray Optics Doubt Marathon',
    date: '2026-09-21',
    time: '10:00 AM - 1:00 PM',
    eventType: 'WORKSHOP',
    description: 'Special 3-hour marathon led by Praveen Sir (Trigonometry proofs) and Rashmi Ma\'am (Mirror ray diagrams). Open to all regular and demo trial students.',
    targetGrade: 'Class 10',
    venue: 'Main Lecture Hall (Room 101)',
  },
  {
    id: 'evt-2',
    title: 'CBSE Mid-Term Mock Board Exam (Maths Paper 1)',
    date: '2026-09-24',
    time: '4:00 PM - 7:00 PM',
    eventType: 'TEST',
    description: 'Full 80-mark standard CBSE pattern mock exam covering Chapters 1 to 7. Strict invigilation and step-by-step markbook grading.',
    targetGrade: 'Class 10',
    venue: 'Batch M10 Examination Room',
  },
  {
    id: 'evt-3',
    title: 'Science Practical Hands-On Simulation (Acids & Salts / Optics)',
    date: '2026-09-27',
    time: '3:30 PM - 5:30 PM',
    eventType: 'BOARD_PRACTICAL',
    description: 'Hands-on practical demonstration of pH testing, hydrogen gas popping test, and finding focal length of concave mirror with optical bench.',
    targetGrade: 'Class 9 & 10',
    venue: 'Science Laboratory Corner',
  },
  {
    id: 'evt-4',
    title: 'Quarterly Parent-Teacher Meeting (PTM) & Report Review',
    date: '2026-10-03',
    time: '4:00 PM - 7:30 PM',
    eventType: 'PTM',
    description: 'One-on-one parent consultation with teachers to discuss test trends, CBSE attendance health, and pre-board roadmap.',
    targetGrade: 'All Batches',
    venue: 'Prime Learning Reception & Cabin',
  },
  {
    id: 'evt-5',
    title: 'Dussehra & Gandhi Jayanti Academic Holiday',
    date: '2026-10-02',
    eventType: 'HOLIDAY',
    description: 'Coaching center closed for festival observance. Students assigned self-paced revision sheets on Quadratic Equations.',
    targetGrade: 'All Batches',
  },
];

const STORAGE_PREFIX = 'prime_learning_';

const getStoredData = <T>(key: string, defaultValue: T): T => {
  if (typeof window === 'undefined') return defaultValue;
  try {
    const item = window.localStorage.getItem(STORAGE_PREFIX + key);
    return item ? JSON.parse(item) : defaultValue;
  } catch (error) {
    console.error(`Error reading ${key} from localStorage`, error);
    return defaultValue;
  }
};

const setStoredData = <T>(key: string, value: T): void => {
  if (typeof window === 'undefined') return;
  try {
    window.localStorage.setItem(STORAGE_PREFIX + key, JSON.stringify(value));
  } catch (error) {
    console.error(`Error writing ${key} to localStorage`, error);
  }
};

export const db = {
  // Settings
  getSettings: (): InstituteSettings => {
    return getStoredData('settings', MOCK_SETTINGS);
  },
  saveSettings: (settings: InstituteSettings): InstituteSettings => {
    setStoredData('settings', settings);
    return settings;
  },

  // Courses
  getCourses: (): Course[] => {
    return getStoredData('courses', MOCK_COURSES);
  },
  saveCourses: (courses: Course[]): Course[] => {
    setStoredData('courses', courses);
    return courses;
  },
  addCourse: (courseData: Omit<Course, 'id'>): Course => {
    const current = getStoredData<Course[]>('courses', MOCK_COURSES);
    const newCourse: Course = {
      ...courseData,
      id: `course-${Date.now()}`,
    };
    const updated = [newCourse, ...current];
    setStoredData('courses', updated);
    return newCourse;
  },
  deleteCourse: (id: string): Course[] => {
    const current = getStoredData<Course[]>('courses', MOCK_COURSES);
    const updated = current.filter(c => c.id !== id);
    setStoredData('courses', updated);
    return updated;
  },

  // Teachers
  getTeachers: (): Teacher[] => {
    return getStoredData('teachers', MOCK_TEACHERS);
  },
  saveTeachers: (teachers: Teacher[]): Teacher[] => {
    setStoredData('teachers', teachers);
    return teachers;
  },
  addTeacher: (teacherData: Omit<Teacher, 'id'>): Teacher => {
    const current = getStoredData<Teacher[]>('teachers', MOCK_TEACHERS);
    const newTeacher: Teacher = {
      ...teacherData,
      id: `teacher-${Date.now()}`,
    };
    const updated = [...current, newTeacher];
    setStoredData('teachers', updated);
    if (newTeacher.email && newTeacher.password) {
      db.saveUserAccount({
        email: newTeacher.email,
        password: newTeacher.password,
        name: newTeacher.name,
        role: 'TEACHER',
        associatedId: newTeacher.id,
      });
    }
    return newTeacher;
  },
  deleteTeacher: (id: string): Teacher[] => {
    const current = getStoredData<Teacher[]>('teachers', MOCK_TEACHERS);
    const updated = current.filter(t => t.id !== id);
    setStoredData('teachers', updated);
    return updated;
  },

  // Batches
  getBatches: (): Batch[] => {
    return getStoredData('batches', MOCK_BATCHES);
  },
  saveBatches: (batches: Batch[]): Batch[] => {
    setStoredData('batches', batches);
    return batches;
  },
  addBatch: (batchData: Omit<Batch, 'id' | 'enrolledCount'>): Batch => {
    const current = getStoredData<Batch[]>('batches', MOCK_BATCHES);
    const newBatch: Batch = {
      ...batchData,
      id: `batch-${Date.now()}`,
      enrolledCount: 0,
    };
    const updated = [newBatch, ...current];
    setStoredData('batches', updated);
    return newBatch;
  },
  deleteBatch: (id: string): Batch[] => {
    const current = getStoredData<Batch[]>('batches', MOCK_BATCHES);
    const updated = current.filter(b => b.id !== id);
    setStoredData('batches', updated);
    return updated;
  },

  // Enquiries
  getEnquiries: (): Enquiry[] => {
    return getStoredData('enquiries', MOCK_ENQUIRIES);
  },
  addEnquiry: (enquiryData: Omit<Enquiry, 'id' | 'createdAt' | 'status'>): Enquiry => {
    const current = getStoredData<Enquiry[]>('enquiries', MOCK_ENQUIRIES);
    const newEnquiry: Enquiry = {
      ...enquiryData,
      id: `enq-${Date.now()}`,
      createdAt: new Date().toISOString(),
      status: 'New',
      notes: 'New inquiry from website form.',
    };
    const updated = [newEnquiry, ...current];
    setStoredData('enquiries', updated);
    return newEnquiry;
  },
  updateEnquiryStatus: (id: string, status: Enquiry['status'], notes?: string): Enquiry[] => {
    const current = getStoredData<Enquiry[]>('enquiries', MOCK_ENQUIRIES);
    const updated = current.map(enq => {
      if (enq.id === id) {
        return { ...enq, status, notes: notes !== undefined ? notes : enq.notes };
      }
      return enq;
    });
    setStoredData('enquiries', updated);
    return updated;
  },
  deleteEnquiry: (id: string): Enquiry[] => {
    const current = getStoredData<Enquiry[]>('enquiries', MOCK_ENQUIRIES);
    const updated = current.filter(e => e.id !== id);
    setStoredData('enquiries', updated);
    return updated;
  },

  // Trial Registrations
  getTrials: (): TrialRegistration[] => {
    return getStoredData('trials', MOCK_TRIALS);
  },
  addTrial: (trialData: Omit<TrialRegistration, 'id' | 'createdAt' | 'status'>): TrialRegistration => {
    const current = getStoredData<TrialRegistration[]>('trials', MOCK_TRIALS);
    const newTrial: TrialRegistration = {
      ...trialData,
      id: `trial-${Date.now()}`,
      createdAt: new Date().toISOString(),
      status: 'Registered',
      notes: 'Submitted online free trial form.',
    };
    const updated = [newTrial, ...current];
    setStoredData('trials', updated);
    return newTrial;
  },
  updateTrialStatus: (
    id: string, 
    status: TrialRegistration['status'], 
    notes?: string, 
    trialDate?: string,
    attendanceStatus?: TrialRegistration['attendanceStatus'],
    feedbackNotes?: string,
    conversionProbability?: TrialRegistration['conversionProbability']
  ): TrialRegistration[] => {
    const current = getStoredData<TrialRegistration[]>('trials', MOCK_TRIALS);
    const updated = current.map(tr => {
      if (tr.id === id) {
        return {
          ...tr,
          status,
          notes: notes !== undefined ? notes : tr.notes,
          trialDate: trialDate !== undefined ? trialDate : tr.trialDate,
          attendanceStatus: attendanceStatus !== undefined ? attendanceStatus : tr.attendanceStatus,
          feedbackNotes: feedbackNotes !== undefined ? feedbackNotes : tr.feedbackNotes,
          conversionProbability: conversionProbability !== undefined ? conversionProbability : tr.conversionProbability,
        };
      }
      return tr;
    });
    setStoredData('trials', updated);
    return updated;
  },
  deleteTrial: (id: string): TrialRegistration[] => {
    const current = getStoredData<TrialRegistration[]>('trials', MOCK_TRIALS);
    const updated = current.filter(t => t.id !== id);
    setStoredData('trials', updated);
    return updated;
  },

  // Students
  getStudents: (): Student[] => {
    return getStoredData('students', MOCK_STUDENTS);
  },
  saveStudents: (students: Student[]): Student[] => {
    setStoredData('students', students);
    return students;
  },
  addStudent: (studentData: Omit<Student, 'id' | 'admissionDate' | 'status'>): Student => {
    const current = getStoredData<Student[]>('students', MOCK_STUDENTS);
    const newStudent: Student = {
      ...studentData,
      id: `std-${Date.now()}`,
      admissionDate: new Date().toISOString().split('T')[0],
      status: 'Active',
    };
    const updated = [newStudent, ...current];
    setStoredData('students', updated);
    if (newStudent.email && newStudent.password) {
      db.saveUserAccount({
        email: newStudent.email,
        password: newStudent.password,
        name: newStudent.studentName,
        role: 'STUDENT',
        associatedId: newStudent.id,
      });
    }
    return newStudent;
  },
  deleteStudent: (id: string): Student[] => {
    const current = getStoredData<Student[]>('students', MOCK_STUDENTS);
    const updated = current.filter(s => s.id !== id);
    setStoredData('students', updated);
    return updated;
  },

  // Attendance
  getAttendance: (): AttendanceRecord[] => {
    return getStoredData('attendance', MOCK_ATTENDANCE);
  },
  recordAttendance: (records: Omit<AttendanceRecord, 'id'>[]): AttendanceRecord[] => {
    const current = getStoredData<AttendanceRecord[]>('attendance', MOCK_ATTENDANCE);
    const timeString = new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' });
    const newRecords = records.map(r => ({ 
      ...r, 
      id: `att-${Date.now()}-${Math.random().toString(36).substr(2, 4)}`,
      checkInMethod: r.checkInMethod || 'MANUAL',
      checkInTime: r.checkInTime || timeString,
    }));
    const updated = [...newRecords, ...current];
    setStoredData('attendance', updated);
    return updated;
  },
  markQRAttendance: (studentId: string, batchId: string, sessionPin?: string): { success: boolean; message: string; record?: AttendanceRecord } => {
    const students = getStoredData<Student[]>('students', MOCK_STUDENTS);
    const student = students.find(s => s.id === studentId);
    if (!student) {
      return { success: false, message: 'Student record not found.' };
    }

    const attendance = getStoredData<AttendanceRecord[]>('attendance', MOCK_ATTENDANCE);
    const today = new Date().toISOString().split('T')[0];
    const timeString = new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' });

    const existingIndex = attendance.findIndex(a => a.studentId === studentId && a.date === today);

    const record: AttendanceRecord = {
      id: existingIndex >= 0 ? attendance[existingIndex].id : `att-${Date.now()}`,
      studentId: student.id,
      studentName: student.studentName,
      batchId: batchId || student.batchId,
      date: today,
      status: 'Present',
      checkInMethod: 'QR_SCAN',
      checkInTime: timeString,
      sessionPin,
      remarks: 'Automated QR Code Check-in',
    };

    let updated: AttendanceRecord[];
    if (existingIndex >= 0) {
      updated = [...attendance];
      updated[existingIndex] = record;
    } else {
      updated = [record, ...attendance];
    }

    setStoredData('attendance', updated);
    return { success: true, message: `Attendance marked Present for ${student.studentName} at ${timeString}`, record };
  },

  // Test Results
  getTestResults: (): TestResult[] => {
    return getStoredData('test_results', MOCK_TEST_RESULTS);
  },
  addTestResult: (res: Omit<TestResult, 'id' | 'percentage'>): TestResult => {
    const current = getStoredData<TestResult[]>('test_results', MOCK_TEST_RESULTS);
    const percentage = Math.round((res.marksObtained / res.maxMarks) * 100);
    const newResult: TestResult = {
      ...res,
      id: `test-${Date.now()}`,
      percentage,
    };
    const updated = [newResult, ...current];
    setStoredData('test_results', updated);
    return newResult;
  },
  addBulkTestResults: (results: Omit<TestResult, 'id' | 'percentage'>[]): TestResult[] => {
    const current = getStoredData<TestResult[]>('test_results', MOCK_TEST_RESULTS);
    const newItems: TestResult[] = results.map((res, index) => ({
      ...res,
      id: `test-${Date.now()}-${index}`,
      percentage: Math.round((res.marksObtained / res.maxMarks) * 100),
    }));
    const updated = [...newItems, ...current];
    setStoredData('test_results', updated);
    return newItems;
  },

  // Testimonials
  getTestimonials: (): Testimonial[] => {
    return getStoredData('testimonials', MOCK_TESTIMONIALS);
  },

  // Announcements
  getAnnouncements: (): Announcement[] => {
    return getStoredData('announcements', MOCK_ANNOUNCEMENTS);
  },
  addAnnouncement: (ancData: Omit<Announcement, 'id' | 'date'>): Announcement => {
    const current = getStoredData<Announcement[]>('announcements', MOCK_ANNOUNCEMENTS);
    const newAnnouncement: Announcement = {
      ...ancData,
      id: `anc-${Date.now()}`,
      date: new Date().toISOString().split('T')[0],
    };
    const updated = [newAnnouncement, ...current];
    setStoredData('announcements', updated);
    return newAnnouncement;
  },
  deleteAnnouncement: (id: string): Announcement[] => {
    const current = getStoredData<Announcement[]>('announcements', MOCK_ANNOUNCEMENTS);
    const updated = current.filter(a => a.id !== id);
    setStoredData('announcements', updated);
    return updated;
  },

  // Study Materials
  getStudyMaterials: (): StudyMaterial[] => {
    return getStoredData('study_materials', MOCK_STUDY_MATERIALS);
  },
  addStudyMaterial: (matData: Omit<StudyMaterial, 'id' | 'date'>): StudyMaterial => {
    const current = getStoredData<StudyMaterial[]>('study_materials', MOCK_STUDY_MATERIALS);
    const newMaterial: StudyMaterial = {
      ...matData,
      id: `mat-${Date.now()}`,
      date: new Date().toISOString().split('T')[0],
    };
    const updated = [newMaterial, ...current];
    setStoredData('study_materials', updated);
    return newMaterial;
  },
  deleteStudyMaterial: (id: string): StudyMaterial[] => {
    const current = getStoredData<StudyMaterial[]>('study_materials', MOCK_STUDY_MATERIALS);
    const updated = current.filter(m => m.id !== id);
    setStoredData('study_materials', updated);
    return updated;
  },

  // Fee Payments & Receipts
  getPayments: (): FeePayment[] => {
    return getStoredData('payments', [
      {
        id: 'pay-1',
        receiptNo: 'PLC-2026-0901',
        studentId: 'std-1',
        studentName: 'Rohan Mehta',
        parentName: 'Sunil Mehta',
        courseTitle: 'Class 10 Maths & Science (Combined)',
        grade: 'Class 10',
        amount: '₹5,000',
        paymentMethod: 'UPI',
        transactionId: 'UPI-9810989437-09012',
        paymentDate: '2026-09-01',
        monthPaidFor: 'September 2026',
        status: 'SUCCESS',
      },
    ]);
  },
  recordPayment: (paymentData: Omit<FeePayment, 'id' | 'receiptNo' | 'transactionId' | 'paymentDate' | 'status'>): FeePayment => {
    const current = getStoredData<FeePayment[]>('payments', []);
    const dateStr = new Date().toISOString().split('T')[0];
    const newPayment: FeePayment = {
      ...paymentData,
      id: `pay-${Date.now()}`,
      receiptNo: `PLC-${new Date().getFullYear()}-${Math.floor(1000 + Math.random() * 9000)}`,
      transactionId: `UPI-${Math.floor(1000000000 + Math.random() * 9000000000)}`,
      paymentDate: dateStr,
      status: 'SUCCESS',
    };
    const updated = [newPayment, ...current];
    setStoredData('payments', updated);
    return newPayment;
  },
  getPendingFeeStudents: (targetMonth?: string): { student: Student; monthlyFee: string }[] => {
    const students = getStoredData<Student[]>('students', MOCK_STUDENTS).filter(s => s.status === 'Active');
    const payments = getStoredData<FeePayment[]>('payments', []);
    const courses = getStoredData<Course[]>('courses', MOCK_COURSES);
    const month = targetMonth || `${new Date().toLocaleString('en-US', { month: 'long' })} ${new Date().getFullYear()}`;
    
    const paidStudentIds = new Set(
      payments
        .filter(p => p.monthPaidFor.toLowerCase() === month.toLowerCase() && p.status === 'SUCCESS')
        .map(p => p.studentId)
    );

    return students
      .filter(s => !paidStudentIds.has(s.id))
      .map(s => {
        const course = courses.find(c => c.grade === s.grade);
        return {
          student: s,
          monthlyFee: course?.monthlyFee || '₹3,500',
        };
      });
  },

  // Leave Requests & Makeup Portal
  getLeaveRequests: (): LeaveRequest[] => {
    return getStoredData('leave_requests', [
      {
        id: 'leave-1',
        studentId: 'std-1',
        studentName: 'Rohan Mehta',
        grade: 'Class 10',
        startDate: '2026-09-10',
        endDate: '2026-09-11',
        reason: 'School sports tournament event',
        makeupClassRequested: true,
        status: 'APPROVED',
        makeupDate: '2026-09-13',
        createdAt: '2026-09-02T10:00:00Z',
      },
    ]);
  },
  addLeaveRequest: (leaveData: Omit<LeaveRequest, 'id' | 'createdAt' | 'status'>): LeaveRequest => {
    const current = getStoredData<LeaveRequest[]>('leave_requests', []);
    const newLeave: LeaveRequest = {
      ...leaveData,
      id: `leave-${Date.now()}`,
      createdAt: new Date().toISOString(),
      status: 'PENDING',
    };
    const updated = [newLeave, ...current];
    setStoredData('leave_requests', updated);
    return newLeave;
  },
  updateLeaveStatus: (id: string, status: LeaveRequest['status'], makeupDate?: string): LeaveRequest[] => {
    const current = getStoredData<LeaveRequest[]>('leave_requests', []);
    const updated = current.map(l => {
      if (l.id === id) {
        return { ...l, status, makeupDate: makeupDate || l.makeupDate };
      }
      return l;
    });
    setStoredData('leave_requests', updated);
    return updated;
  },

  // Gamified Badges
  getBadges: (studentId?: string): StudentBadge[] => {
    const all = getStoredData<StudentBadge[]>('student_badges', [
      {
        id: 'badge-1',
        studentId: 'std-1',
        title: '100% Attendance Master',
        category: 'ATTENDANCE',
        description: 'Attended all scheduled classes continuously this month',
        iconName: 'CheckCircle2',
        earnedDate: '2026-09-01',
      },
      {
        id: 'badge-2',
        studentId: 'std-1',
        title: 'Math Wizard',
        category: 'ACADEMIC',
        description: 'Scored 90%+ in Quadratic Equations unit test',
        iconName: 'Sparkles',
        earnedDate: '2026-08-28',
      },
      {
        id: 'badge-3',
        studentId: 'std-1',
        title: 'Science Scholar',
        category: 'CONCEPT_MASTERY',
        description: 'Completed all ray diagram numerical workbooks',
        iconName: 'Award',
        earnedDate: '2026-08-25',
      },
    ]);

    if (studentId) {
      return all.filter(b => b.studentId === studentId);
    }
    return all;
  },

  // Student Doubts Resolver
  getDoubts: (): StudentDoubt[] => {
    return getStoredData('student_doubts', [
      {
        id: 'doubt-1',
        studentId: 'std-1',
        studentName: 'Rohan Mehta',
        grade: 'Class 10',
        subject: 'Mathematics',
        topic: 'Quadratic Equations',
        questionText: 'How to find nature of roots when discriminant is zero vs negative?',
        status: 'RESOLVED',
        teacherReply: 'When D = 0, roots are real and equal (-b / 2a). When D < 0, roots are imaginary/complex.',
        repliedBy: 'Praveen Gandhi',
        createdAt: '2026-09-03T14:30:00Z',
        repliedAt: '2026-09-03T16:15:00Z',
      },
      {
        id: 'doubt-2',
        studentId: 'std-1',
        studentName: 'Rohan Mehta',
        grade: 'Class 10',
        subject: 'Science',
        topic: 'Light Reflection & Refraction',
        questionText: 'Why does a ray of light bend towards the normal when passing from air to glass?',
        status: 'PENDING',
        createdAt: '2026-09-05T09:00:00Z',
      },
    ]);
  },
  addDoubt: (doubtData: Omit<StudentDoubt, 'id' | 'createdAt' | 'status'>): StudentDoubt => {
    const current = getStoredData<StudentDoubt[]>('student_doubts', []);
    const newDoubt: StudentDoubt = {
      ...doubtData,
      id: `doubt-${Date.now()}`,
      status: 'PENDING',
      createdAt: new Date().toISOString(),
    };
    const updated = [newDoubt, ...current];
    setStoredData('student_doubts', updated);
    return newDoubt;
  },
  replyDoubt: (id: string, reply: string, teacherName: string): StudentDoubt[] => {
    const current = getStoredData<StudentDoubt[]>('student_doubts', []);
    const updated = current.map(d => {
      if (d.id === id) {
        return {
          ...d,
          status: 'RESOLVED' as const,
          teacherReply: reply,
          repliedBy: teacherName,
          repliedAt: new Date().toISOString(),
        };
      }
      return d;
    });
    setStoredData('student_doubts', updated);
    return updated;
  },

  // Video Lessons Vault
  getVideoLessons: (): VideoLesson[] => {
    return getStoredData('video_lessons', [
      {
        id: 'vid-1',
        title: 'Quadratic Formula & Discriminant Shortcuts',
        subject: 'Mathematics',
        grade: 'Class 10',
        duration: '24 mins',
        videoUrl: 'https://www.youtube.com/embed/dQw4w9WgXcQ',
        notesPdfUrl: '#',
        teacherName: 'Praveen Gandhi',
        chapterName: 'Chapter 4: Quadratic Equations',
      },
      {
        id: 'vid-2',
        title: 'Ray Diagram Rules for Concave & Convex Mirrors',
        subject: 'Science',
        grade: 'Class 10',
        duration: '32 mins',
        videoUrl: 'https://www.youtube.com/embed/dQw4w9WgXcQ',
        notesPdfUrl: '#',
        teacherName: 'Rashmi Anand',
        chapterName: 'Chapter 10: Light & Optics',
      },
      {
        id: 'vid-3',
        title: 'Chemical Equations Balancing Technique',
        subject: 'Science',
        grade: 'Class 10',
        duration: '18 mins',
        videoUrl: 'https://www.youtube.com/embed/dQw4w9WgXcQ',
        notesPdfUrl: '#',
        teacherName: 'Rashmi Anand',
        chapterName: 'Chapter 1: Chemical Reactions',
      },
    ]);
  },

  // Chapter Practice Quizzes
  getQuizQuestions: (subject: string = 'Mathematics'): QuizQuestion[] => {
    if (subject.includes('Science')) {
      return [
        {
          id: 'q1',
          question: 'What is the focal length of a plane mirror?',
          options: ['Zero', 'Infinite', '25 cm', '10 cm'],
          correctOptionIndex: 1,
          explanation: 'A plane mirror has an infinite radius of curvature, hence its focal length is infinite.',
        },
        {
          id: 'q2',
          question: 'Which gas is released when zinc reacts with dilute sulphuric acid?',
          options: ['Oxygen', 'Carbon Dioxide', 'Hydrogen', 'Nitrogen'],
          correctOptionIndex: 2,
          explanation: 'Zn + H2SO4 -> ZnSO4 + H2(g). Hydrogen gas burns with a pop sound.',
        },
        {
          id: 'q3',
          question: 'The S.I. unit of electric current is:',
          options: ['Volt', 'Ohm', 'Ampere', 'Joule'],
          correctOptionIndex: 2,
          explanation: 'Electric current is measured in Amperes (A), named after André-Marie Ampère.',
        },
      ];
    }
    return [
      {
        id: 'qm1',
        question: 'If the discriminant D = b^2 - 4ac > 0 and a perfect square, the roots of the quadratic equation are:',
        options: ['Real, rational and unequal', 'Real, irrational and unequal', 'Real and equal', 'Imaginary'],
        correctOptionIndex: 0,
        explanation: 'When D > 0 and D is a perfect square, sqrt(D) is rational, making the roots real, rational, and unequal.',
      },
      {
        id: 'qm2',
        question: 'What is the nth term formula for an Arithmetic Progression (AP)?',
        options: ['an = a + n*d', 'an = a + (n - 1)*d', 'an = (n/2)*(a + l)', 'an = a * r^(n-1)'],
        correctOptionIndex: 1,
        explanation: 'The nth term an = a + (n - 1)d where a is first term and d is common difference.',
      },
      {
        id: 'qm3',
        question: 'If sin(theta) = 3/5, what is the value of cos(theta)?',
        options: ['4/5', '3/4', '5/3', '5/4'],
        correctOptionIndex: 0,
        explanation: 'In a right triangle with perpendicular 3 and hypotenuse 5, base = sqrt(5^2 - 3^2) = 4. Thus cos(theta) = 4/5.',
      },
    ];
  },
  saveQuizResult: (result: Omit<QuizResult, 'id' | 'date'>): QuizResult => {
    const current = getStoredData<QuizResult[]>('quiz_results', []);
    const newResult: QuizResult = {
      ...result,
      id: `quiz-res-${Date.now()}`,
      date: new Date().toISOString().split('T')[0],
    };
    setStoredData('quiz_results', [newResult, ...current]);
    return newResult;
  },
  getQuizResults: (studentId?: string): QuizResult[] => {
    const all = getStoredData<QuizResult[]>('quiz_results', []);
    if (studentId) return all.filter(r => r.studentId === studentId);
    return all;
  },

  // User Accounts
  getUserAccounts: (): UserAccount[] => {
    return getStoredData('user_accounts', [
      { id: 'usr-admin', email: 'admin@primelearning.edu.in', password: 'admin', name: 'Admin', role: 'ADMIN', createdAt: '2026-09-01' },
      { id: 'usr-teacher-1', email: 'praveen@primelearning.edu.in', password: 'teacher123', name: 'Praveen Gandhi', role: 'TEACHER', associatedId: 'teacher-praveen', createdAt: '2026-09-01' },
      { id: 'usr-teacher-2', email: 'rashmi@primelearning.edu.in', password: 'teacher123', name: 'Rashmi Anand', role: 'TEACHER', associatedId: 'teacher-rashmi', createdAt: '2026-09-01' },
      { id: 'usr-student-1', email: 'student@primelearning.edu.in', password: 'student123', name: 'Bhavya Anand', role: 'STUDENT', associatedId: 'std-1', createdAt: '2026-09-01' },
    ]);
  },
  saveUserAccount: (account: Omit<UserAccount, 'id' | 'createdAt'>): UserAccount => {
    const current = db.getUserAccounts();
    const existingIndex = current.findIndex(a => a.email.toLowerCase() === account.email.toLowerCase().trim());
    const newAccount: UserAccount = {
      ...account,
      email: account.email.toLowerCase().trim(),
      id: `usr-${Date.now()}`,
      createdAt: new Date().toISOString(),
    };
    let updated: UserAccount[];
    if (existingIndex >= 0) {
      updated = [...current];
      updated[existingIndex] = { ...updated[existingIndex], ...account };
    } else {
      updated = [newAccount, ...current];
    }
    setStoredData('user_accounts', updated);
    return newAccount;
  },
  findUserAccount: (email: string, password?: string): UserAccount | undefined => {
    const accounts = db.getUserAccounts();
    return accounts.find(a => 
      a.email.toLowerCase() === email.toLowerCase().trim() && 
      (!password || !a.password || a.password === password)
    );
  },

  // PTM Bookings
  getPtmBookings: (): PtmBooking[] => {
    return getStoredData('ptm_bookings', INITIAL_PTM_BOOKINGS);
  },
  addPtmBooking: (booking: Omit<PtmBooking, 'id' | 'createdAt' | 'status'>): PtmBooking => {
    const current = getStoredData<PtmBooking[]>('ptm_bookings', INITIAL_PTM_BOOKINGS);
    const newBooking: PtmBooking = {
      ...booking,
      id: `ptm-${Date.now()}`,
      status: 'PENDING',
      createdAt: new Date().toISOString(),
    };
    setStoredData('ptm_bookings', [newBooking, ...current]);
    return newBooking;
  },

  // Community Metrics
  getCommunityMetrics: (): CommunityImpactMetric[] => {
    return getStoredData('community_metrics', INITIAL_COMMUNITY_METRICS);
  },

  // Parent Portal Student Lookup
  getStudentByPhoneOrId: (query: string): Student | undefined => {
    const students = db.getStudents();
    const cleanQuery = query.toLowerCase().trim().replace(/[^a-z0-9]/g, '');
    if (!cleanQuery) return undefined;
    return students.find(s => {
      const phoneClean = s.phone.replace(/[^0-9]/g, '');
      const waClean = s.whatsapp.replace(/[^0-9]/g, '');
      const idClean = s.id.toLowerCase();
      const nameClean = s.studentName.toLowerCase().replace(/[^a-z0-9]/g, '');
      return phoneClean.includes(cleanQuery) || waClean.includes(cleanQuery) || idClean === cleanQuery || nameClean.includes(cleanQuery);
    });
  },

  // CBSE Syllabus Chapters
  getSyllabusChapters: (grade?: string, subject?: string): SyllabusChapter[] => {
    const all = getStoredData<SyllabusChapter[]>('syllabus_chapters', INITIAL_SYLLABUS_CHAPTERS);
    return all.filter(ch => {
      if (grade && grade !== 'All' && ch.grade !== grade) return false;
      if (subject && subject !== 'All' && ch.subject !== subject) return false;
      return true;
    });
  },
  updateChapterStatus: (id: string, status: ChapterStatus): SyllabusChapter[] => {
    const current = getStoredData<SyllabusChapter[]>('syllabus_chapters', INITIAL_SYLLABUS_CHAPTERS);
    const updated = current.map(ch => {
      if (ch.id === id) {
        return { ...ch, status, updatedAt: new Date().toISOString() };
      }
      return ch;
    });
    setStoredData('syllabus_chapters', updated);
    return updated;
  },

  // Formula Flashcards
  getFlashcards: (subject?: string): FormulaFlashcard[] => {
    const all = getStoredData<FormulaFlashcard[]>('formula_flashcards', INITIAL_FLASHCARDS);
    if (!subject || subject === 'All') return all;
    return all.filter(f => f.subject.toLowerCase() === subject.toLowerCase());
  },

  // Financial Ledger & Operational Expenses
  getExpenses: (): ExpenseRecord[] => {
    return getStoredData<ExpenseRecord[]>('expense_records', INITIAL_EXPENSES);
  },
  addExpense: (expense: Omit<ExpenseRecord, 'id'>): ExpenseRecord => {
    const current = getStoredData<ExpenseRecord[]>('expense_records', INITIAL_EXPENSES);
    const newRecord: ExpenseRecord = {
      ...expense,
      id: `exp-${Date.now()}`,
    };
    const updated = [newRecord, ...current];
    setStoredData('expense_records', updated);
    return newRecord;
  },
  deleteExpense: (id: string): ExpenseRecord[] => {
    const current = getStoredData<ExpenseRecord[]>('expense_records', INITIAL_EXPENSES);
    const updated = current.filter(e => e.id !== id);
    setStoredData('expense_records', updated);
    return updated;
  },

  // Academic Calendar & Events
  getAcademicEvents: (): AcademicEvent[] => {
    return getStoredData<AcademicEvent[]>('academic_events', INITIAL_ACADEMIC_EVENTS);
  },
  addAcademicEvent: (event: Omit<AcademicEvent, 'id'>): AcademicEvent => {
    const current = getStoredData<AcademicEvent[]>('academic_events', INITIAL_ACADEMIC_EVENTS);
    const newEvent: AcademicEvent = {
      ...event,
      id: `evt-${Date.now()}`,
    };
    const updated = [...current, newEvent].sort((a, b) => a.date.localeCompare(b.date));
    setStoredData('academic_events', updated);
    return newEvent;
  },

  // Study Planner Schedules
  getStudyPlans: (studentId?: string): StudyPlanSchedule[] => {
    const all = getStoredData<StudyPlanSchedule[]>('study_plans', []);
    if (studentId) return all.filter(p => p.studentId === studentId);
    return all;
  },
  saveStudyPlan: (plan: Omit<StudyPlanSchedule, 'id' | 'createdAt'>): StudyPlanSchedule => {
    const current = getStoredData<StudyPlanSchedule[]>('study_plans', []);
    const newPlan: StudyPlanSchedule = {
      ...plan,
      id: `plan-${Date.now()}`,
      createdAt: new Date().toISOString(),
    };
    const updated = [newPlan, ...current.filter(p => p.studentId !== plan.studentId)];
    setStoredData('study_plans', updated);
    return newPlan;
  },

  // Student ID Card Details
  getStudentIdCard: (studentId: string): StudentIdCard => {
    const student = db.getStudents().find(s => s.id === studentId) || db.getStudents()[0];
    return {
      studentId: student?.id || 'std-1',
      rollNo: `PLC-2026-${(student?.id || '01').replace(/[^0-9]/g, '').padStart(3, '0') || '001'}`,
      studentName: student?.studentName || 'Student Name',
      grade: student?.grade || 'Class 10',
      batchName: student?.batchName || 'Batch M10-A',
      emergencyPhone: student?.whatsapp || student?.phone || '+91 98109 89437',
      bloodGroup: 'B+ (Verified)',
      validTill: 'March 31, 2027',
      qrCodeData: `https://primelearning.edu.in/student?id=${student?.id || 'std-1'}`,
    };
  },
};

// Named Helper Exports
export const getPayments = db.getPayments;
export const recordPayment = db.recordPayment;
export const getLeaveRequests = (studentId?: string) => {
  const all = db.getLeaveRequests();
  if (studentId) return all.filter(l => l.studentId === studentId);
  return all;
};
export const addLeaveRequest = db.addLeaveRequest;
export const updateLeaveStatus = db.updateLeaveStatus;
export const getBadges = db.getBadges;
export const getDoubts = (studentId?: string) => {
  const all = db.getDoubts();
  if (studentId) return all.filter(d => d.studentId === studentId);
  return all;
};
export const addDoubt = db.addDoubt;
export const replyDoubt = db.replyDoubt;
export const getVideoLessons = db.getVideoLessons;
export const getQuizQuestions = db.getQuizQuestions;
export const saveQuizResult = db.saveQuizResult;
export const getQuizResults = db.getQuizResults;
export const getUserAccounts = db.getUserAccounts;
export const saveUserAccount = db.saveUserAccount;
export const findUserAccount = db.findUserAccount;
export const addBulkTestResults = db.addBulkTestResults;
export const getPendingFeeStudents = db.getPendingFeeStudents;
export const getPtmBookings = db.getPtmBookings;
export const addPtmBooking = db.addPtmBooking;
export const getCommunityMetrics = db.getCommunityMetrics;
export const getStudentByPhoneOrId = db.getStudentByPhoneOrId;
export const getSyllabusChapters = db.getSyllabusChapters;
export const updateChapterStatus = db.updateChapterStatus;
export const getFlashcards = db.getFlashcards;
export const getExpenses = db.getExpenses;
export const addExpense = db.addExpense;
export const deleteExpense = db.deleteExpense;
export const getAcademicEvents = db.getAcademicEvents;
export const addAcademicEvent = db.addAcademicEvent;
export const getStudyPlans = db.getStudyPlans;
export const saveStudyPlan = db.saveStudyPlan;
export const getStudentIdCard = db.getStudentIdCard;




