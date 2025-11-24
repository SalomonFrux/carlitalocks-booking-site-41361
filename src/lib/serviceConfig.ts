// Service Configuration with Durations and Categories

export type ServiceDuration = {
  hours: number;
  minutes: number;
  maxHours?: number;
  morningOnly?: boolean;
  isMultiDay?: boolean;
  days?: number;
};

export type Service = {
  id: string;
  name: string;
  category: string;
  price: string;
  duration: ServiceDuration;
  description?: string;
  requiresPhoto?: boolean;
};

export const SERVICE_DURATIONS: Record<string, ServiceDuration> = {
  // À LA UNE
  'consultation': { hours: 1, minutes: 0, maxHours: 2 },
  
  // INSTALLATIONS - Microlocks Vanille
  'microlocks-longs': { hours: 7, minutes: 30, maxHours: 8 },
  'microlocks-milongs': { hours: 5, minutes: 0, maxHours: 6 },
  'microlocks-courts': { hours: 4, minutes: 30, maxHours: 5 },
  
  // INSTALLATIONS - Locks Traditionnels
  'trad-longs': { hours: 6, minutes: 0, maxHours: 7 },
  'trad-milongs': { hours: 5, minutes: 0, maxHours: 6 },
  'trad-courts': { hours: 4, minutes: 0, maxHours: 5 },
  
  // INSTALLATIONS - Minilocks
  'minilocks-longs': { hours: 8, minutes: 0, maxHours: 9 },
  'minilocks-milongs': { hours: 6, minutes: 0, maxHours: 7 },
  'minilocks-courts': { hours: 5, minutes: 0, maxHours: 6 },
  
  // INSTALLATIONS - Microlocks Interlocks
  'microlocks-inter-longs': { hours: 12, minutes: 0, morningOnly: true },
  'microlocks-inter-milongs': { hours: 10, minutes: 0, morningOnly: true },
  'microlocks-inter-courts': { hours: 8, minutes: 0, maxHours: 9 },
  
  // INSTALLATIONS - Sisterlocks
  'sisterlocks-longs': { hours: 24, minutes: 0, isMultiDay: true, days: 2 },
  'sisterlocks-milongs': { hours: 36, minutes: 0, isMultiDay: true, days: 2 },
  'sisterlocks-courts': { hours: 8, minutes: 0, maxHours: 10 },
  
  // RESSERRAGE
  'resserrage-trad': { hours: 2, minutes: 30, maxHours: 3 },
  'resserrage-mini': { hours: 3, minutes: 0, maxHours: 4 },
  'resserrage-micro-300': { hours: 2, minutes: 30, maxHours: 3 },
  'resserrage-micro-400': { hours: 3, minutes: 30, maxHours: 4 },
  'resserrage-micro-500': { hours: 3, minutes: 30, maxHours: 4 },
  'resserrage-sister': { hours: 4, minutes: 0, maxHours: 5 },
  
  // TWIST & SOINS
  'retwist-200': { hours: 2, minutes: 0, maxHours: 3 },
  'retwist-100': { hours: 1, minutes: 30, maxHours: 2 },
  'shampoing-adulte': { hours: 0, minutes: 15, maxHours: 1 },
  'shampoing-enfant': { hours: 0, minutes: 15, maxHours: 1 },
  'shampoing-soins': { hours: 0, minutes: 45, maxHours: 1 },
  'detox': { hours: 1, minutes: 0, maxHours: 2 },
  
  // COIFFAGE
  'coiffure-protectrice': { hours: 0, minutes: 15, maxHours: 1 },
  'chignon-simple': { hours: 0, minutes: 30, maxHours: 1 },
  'chignon-elabore': { hours: 0, minutes: 45, maxHours: 1 },
  'bouclage-court': { hours: 1, minutes: 0, maxHours: 2 },
  'bouclage-milongs': { hours: 1, minutes: 30, maxHours: 2 },
  'bouclage-longs': { hours: 2, minutes: 0, maxHours: 3 },
};

export const SERVICES: Service[] = [
  // À LA UNE
  {
    id: "consultation",
    name: "Consultation sur mesure",
    category: "À LA UNE",
    price: "10 000 F CFA",
    duration: SERVICE_DURATIONS.consultation,
    requiresPhoto: false,
  },
  
  // INSTALLATIONS - Microlocks Vanille
  {
    id: "microlocks-longs",
    name: "Microlocks Vanille - Cheveux longs (300-350 locks)",
    category: "Installation Microlocks",
    price: "À partir de 40 000 F CFA",
    duration: SERVICE_DURATIONS['microlocks-longs'],
    requiresPhoto: true,
  },
  {
    id: "microlocks-milongs",
    name: "Microlocks Vanille - Cheveux mi-longs (300-350 locks)",
    category: "Installation Microlocks",
    price: "À partir de 35 000 F CFA",
    duration: SERVICE_DURATIONS['microlocks-milongs'],
    requiresPhoto: true,
  },
  {
    id: "microlocks-courts",
    name: "Microlocks Vanille - Cheveux courts (300-350 locks)",
    category: "Installation Microlocks",
    price: "À partir de 20 000 F CFA",
    duration: SERVICE_DURATIONS['microlocks-courts'],
    requiresPhoto: true,
  },
  
  // INSTALLATIONS - Locks Traditionnels
  {
    id: "trad-longs",
    name: "Locks Traditionnels - Cheveux longs (80-150 locks)",
    category: "Installation Traditionnelle",
    price: "À partir de 30 000 F CFA",
    duration: SERVICE_DURATIONS['trad-longs'],
    requiresPhoto: true,
  },
  {
    id: "trad-milongs",
    name: "Locks Traditionnels - Cheveux mi-longs (80-150 locks)",
    category: "Installation Traditionnelle",
    price: "À partir de 25 000 F CFA",
    duration: SERVICE_DURATIONS['trad-milongs'],
    requiresPhoto: true,
  },
  {
    id: "trad-courts",
    name: "Locks Traditionnels - Cheveux courts (80-150 locks)",
    category: "Installation Traditionnelle",
    price: "À partir de 20 000 F CFA",
    duration: SERVICE_DURATIONS['trad-courts'],
    requiresPhoto: true,
  },
  
  // INSTALLATIONS - Minilocks
  {
    id: "minilocks-longs",
    name: "Minilocks Interlocks - Cheveux longs (150-250 locks)",
    category: "Installation Minilocks",
    price: "À partir de 45 000 F CFA",
    duration: SERVICE_DURATIONS['minilocks-longs'],
    requiresPhoto: true,
  },
  {
    id: "minilocks-milongs",
    name: "Minilocks Interlocks - Cheveux mi-longs (150-250 locks)",
    category: "Installation Minilocks",
    price: "À partir de 40 000 F CFA",
    duration: SERVICE_DURATIONS['minilocks-milongs'],
    requiresPhoto: true,
  },
  {
    id: "minilocks-courts",
    name: "Minilocks Interlocks - Cheveux courts (150-250 locks)",
    category: "Installation Minilocks",
    price: "À partir de 35 000 F CFA",
    duration: SERVICE_DURATIONS['minilocks-courts'],
    requiresPhoto: true,
  },
  
  // INSTALLATIONS - Microlocks Interlocks
  {
    id: "microlocks-inter-longs",
    name: "Microlocks Interlocks - Cheveux longs 30cm (300-400 locks)",
    category: "Installation Microlocks Interlocks",
    price: "À partir de 70 000 F CFA",
    duration: SERVICE_DURATIONS['microlocks-inter-longs'],
    requiresPhoto: true,
  },
  {
    id: "microlocks-inter-milongs",
    name: "Microlocks Interlocks - Cheveux mi-longs 20cm (400-500 locks)",
    category: "Installation Microlocks Interlocks",
    price: "À partir de 60 000 F CFA",
    duration: SERVICE_DURATIONS['microlocks-inter-milongs'],
    requiresPhoto: true,
  },
  {
    id: "microlocks-inter-courts",
    name: "Microlocks Interlocks - Cheveux courts (300-400 locks)",
    category: "Installation Microlocks Interlocks",
    price: "À partir de 50 000 F CFA",
    duration: SERVICE_DURATIONS['microlocks-inter-courts'],
    requiresPhoto: true,
  },
  
  // INSTALLATIONS - Sisterlocks
  {
    id: "sisterlocks-longs",
    name: "Sisterlocks - Cheveux longs 30cm (400-600 locks)",
    category: "Installation Sisterlocks",
    price: "À partir de 100 000 F CFA",
    duration: SERVICE_DURATIONS['sisterlocks-longs'],
    requiresPhoto: true,
  },
  {
    id: "sisterlocks-milongs",
    name: "Sisterlocks - Cheveux mi-longs 20cm (400-600 locks)",
    category: "Installation Sisterlocks",
    price: "À partir de 100 000 F CFA",
    duration: SERVICE_DURATIONS['sisterlocks-milongs'],
    requiresPhoto: true,
  },
  {
    id: "sisterlocks-courts",
    name: "Sisterlocks - Cheveux courts 10cm (400-600 locks)",
    category: "Installation Sisterlocks",
    price: "À partir de 80 000 F CFA",
    duration: SERVICE_DURATIONS['sisterlocks-courts'],
    requiresPhoto: true,
  },
  
  // RESSERRAGE
  {
    id: "resserrage-trad",
    name: "Resserrage traditionnel (moins de 150 locks)",
    category: "Resserrage",
    price: "À partir de 8 000 F CFA",
    duration: SERVICE_DURATIONS['resserrage-trad'],
  },
  {
    id: "resserrage-mini",
    name: "Resserrage minilocks (150-200 locks)",
    category: "Resserrage",
    price: "À partir de 8 000 F CFA",
    duration: SERVICE_DURATIONS['resserrage-mini'],
  },
  {
    id: "resserrage-micro-300",
    name: "Resserrage microlocks (201-300 locks)",
    category: "Resserrage",
    price: "À partir de 8 000 F CFA",
    duration: SERVICE_DURATIONS['resserrage-micro-300'],
  },
  {
    id: "resserrage-micro-400",
    name: "Resserrage microlocks (301-400 locks)",
    category: "Resserrage",
    price: "À partir de 10 000 F CFA",
    duration: SERVICE_DURATIONS['resserrage-micro-400'],
  },
  {
    id: "resserrage-micro-500",
    name: "Resserrage microlocks (401-500 locks)",
    category: "Resserrage",
    price: "À partir de 15 000 F CFA",
    duration: SERVICE_DURATIONS['resserrage-micro-500'],
  },
  {
    id: "resserrage-sister",
    name: "Resserrage sisterlocks (501-600 locks)",
    category: "Resserrage",
    price: "À partir de 20 000 F CFA",
    duration: SERVICE_DURATIONS['resserrage-sister'],
  },
  
  // TWIST & SOINS
  {
    id: "retwist-200",
    name: "Retwist (100-200 locks)",
    category: "Twist & Soins",
    price: "À partir de 10 000 F CFA",
    duration: SERVICE_DURATIONS['retwist-200'],
    description: "Tournage de locks avec ou sans gel",
  },
  {
    id: "retwist-100",
    name: "Retwist (moins de 100 locks)",
    category: "Twist & Soins",
    price: "À partir de 8 000 F CFA",
    duration: SERVICE_DURATIONS['retwist-100'],
    description: "Tournage de locks avec ou sans gel",
  },
  {
    id: "shampoing-adulte",
    name: "Shampoing simple (Adulte)",
    category: "Twist & Soins",
    price: "À partir de 2 500 F CFA",
    duration: SERVICE_DURATIONS['shampoing-adulte'],
    description: "Shampoing soins hydratant + massage crânien",
  },
  {
    id: "shampoing-enfant",
    name: "Shampoing simple (Enfant)",
    category: "Twist & Soins",
    price: "À partir de 2 000 F CFA",
    duration: SERVICE_DURATIONS['shampoing-enfant'],
    description: "Shampoing soins hydratant + massage crânien",
  },
  {
    id: "shampoing-soins",
    name: "Shampoing hydratant + soins",
    category: "Twist & Soins",
    price: "À partir de 7 000 F CFA",
    duration: SERVICE_DURATIONS['shampoing-soins'],
  },
  {
    id: "detox",
    name: "Détox locks/microlocks",
    category: "Twist & Soins",
    price: "À partir de 7 000 F CFA",
    duration: SERVICE_DURATIONS.detox,
  },
  
  // COIFFAGE
  {
    id: "coiffure-protectrice",
    name: "Coiffure protectrice",
    category: "Coiffage",
    price: "À partir de 1 000 F CFA",
    duration: SERVICE_DURATIONS['coiffure-protectrice'],
  },
  {
    id: "chignon-simple",
    name: "Chignon simple",
    category: "Coiffage",
    price: "À partir de 2 000 F CFA",
    duration: SERVICE_DURATIONS['chignon-simple'],
  },
  {
    id: "chignon-elabore",
    name: "Chignon élaboré",
    category: "Coiffage",
    price: "À partir de 3 000 F CFA",
    duration: SERVICE_DURATIONS['chignon-elabore'],
  },
  {
    id: "bouclage-court",
    name: "Bouclage locks courtes (20cm)",
    category: "Coiffage",
    price: "À partir de 5 000 F CFA",
    duration: SERVICE_DURATIONS['bouclage-court'],
  },
  {
    id: "bouclage-milongs",
    name: "Bouclage locks mi-longs (40cm)",
    category: "Coiffage",
    price: "À partir de 7 000 F CFA",
    duration: SERVICE_DURATIONS['bouclage-milongs'],
  },
  {
    id: "bouclage-longs",
    name: "Bouclage locks longs (60cm)",
    category: "Coiffage",
    price: "À partir de 10 000 F CFA",
    duration: SERVICE_DURATIONS['bouclage-longs'],
  },
];

export const CATEGORIES = [
  "À LA UNE",
  "Installation Microlocks",
  "Installation Traditionnelle",
  "Installation Minilocks",
  "Installation Microlocks Interlocks",
  "Installation Sisterlocks",
  "Resserrage",
  "Twist & Soins",
  "Coiffage",
];

export const CATEGORY_WARNINGS: Record<string, string> = {
  "Resserrage": "Clause Importante (Repousse) : Si la repousse de vos locks dépasse deux à trois mois, le prix initialement indiqué pourrait augmenter en raison du travail supplémentaire nécessaire (à l'appréciation de la professionnelle).",
};

export const formatDuration = (duration: ServiceDuration): string => {
  if (duration.isMultiDay && duration.days) {
    return `${duration.days} jour${duration.days > 1 ? 's' : ''}`;
  }
  
  const hours = duration.hours;
  const minutes = duration.minutes;
  
  if (hours === 0) {
    return `${minutes}min`;
  }
  
  if (minutes === 0) {
    if (duration.maxHours && duration.maxHours !== hours) {
      return `${hours}h à ${duration.maxHours}h`;
    }
    return `${hours}h`;
  }
  
  if (duration.maxHours) {
    return `${hours}h${minutes > 0 ? minutes : ''} à ${duration.maxHours}h`;
  }
  
  return `${hours}h${minutes}`;
};
