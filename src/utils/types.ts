
// User types
export type MenopauseStatus = 'Pre' | 'Peri' | 'Post';
export type ActivityLevel = 'Sedentary' | 'Light' | 'Moderate' | 'Active' | 'Very Active';

export interface UserProfile {
  id: string;
  name: string;
  age: number;
  weight: number; // in kg
  height: number; // in cm
  activityLevel: ActivityLevel;
  menopauseStatus: MenopauseStatus;
  hasMenstrualCycle: boolean;
  lastPeriodDate?: Date;
  strengthLevels?: StrengthLevels;
  createdAt: Date;
  updatedAt: Date;
}

export interface StrengthLevels {
  squat?: number; // in kg
  deadlift?: number; // in kg
  benchPress?: number; // in kg
  overhead?: number; // in kg
  rowWeight?: number; // in kg
}

// Hormone tracking types
export interface HormoneReading {
  id: string;
  userId: string;
  date: Date;
  estrogen?: number;
  progesterone?: number;
  testosterone?: number;
  cortisol?: number;
  tsh?: number;
  t3?: number;
  t4?: number;
  notes?: string;
  createdAt: Date;
  updatedAt: Date;
}

// Workout tracking types
export type ExerciseType = 'Strength' | 'Cardio' | 'HIIT' | 'Mobility' | 'Recovery';

export interface WorkoutSession {
  id: string;
  userId: string;
  date: Date;
  type: ExerciseType;
  duration: number; // in minutes
  exercises: Exercise[];
  notes?: string;
  energyLevel: number; // 1-10
  rpe: number; // Rate of Perceived Exertion (1-10)
  createdAt: Date;
  updatedAt: Date;
}

export interface Exercise {
  name: string;
  sets: ExerciseSet[];
}

export interface ExerciseSet {
  weight?: number; // in kg
  reps?: number;
  distance?: number; // in km
  duration?: number; // in minutes
  rpe?: number; // Rate of Perceived Exertion (1-10)
}

// Nutrition tracking types
export interface NutritionEntry {
  id: string;
  userId: string;
  date: Date;
  meals: Meal[];
  totalCalories: number;
  totalProtein: number; // in grams
  totalCarbs: number; // in grams
  totalFat: number; // in grams
  totalFiber: number; // in grams
  waterIntake: number; // in ml
  notes?: string;
  createdAt: Date;
  updatedAt: Date;
}

export interface Meal {
  name: string;
  time: Date;
  foods: Food[];
}

export interface Food {
  name: string;
  calories: number;
  protein: number; // in grams
  carbs: number; // in grams
  fat: number; // in grams
  fiber: number; // in grams
  isHormoneSupporting: boolean;
  hormoneSupportCategory?: 'Estrogen' | 'Progesterone' | 'Testosterone' | 'Thyroid' | 'Cortisol';
}

// Blood test analysis types
export interface BloodTestResult {
  id: string;
  userId: string;
  date: Date;
  results: BloodMarker[];
  notes?: string;
  createdAt: Date;
  updatedAt: Date;
}

export interface BloodMarker {
  name: string;
  value: number;
  unit: string;
  referenceRangeLow: number;
  referenceRangeHigh: number;
  isOutOfRange: boolean;
  category: 'Hormone' | 'Metabolic' | 'Lipid' | 'Thyroid' | 'Inflammation' | 'Vitamin' | 'Mineral' | 'Other';
}

// Recovery tracking types
export interface RecoveryData {
  id: string;
  userId: string;
  date: Date;
  sleepDuration: number; // in hours
  sleepQuality: number; // 1-10
  hrv?: number; // Heart Rate Variability
  restingHeartRate?: number; // in bpm
  stressLevel: number; // 1-10
  recoveryScore?: number; // 1-100
  notes?: string;
  createdAt: Date;
  updatedAt: Date;
}

// AI Insight types
export type InsightCategory = 'Hormone' | 'Workout' | 'Nutrition' | 'Recovery' | 'General';
export type InsightSeverity = 'Low' | 'Moderate' | 'High';

export interface AIInsight {
  id: string;
  userId: string;
  date: Date;
  category: InsightCategory;
  title: string;
  description: string;
  recommendation: string;
  severity: InsightSeverity;
  isRead: boolean;
  createdAt: Date;
  updatedAt: Date;
}
