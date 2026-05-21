import React, { createContext, useContext, useState, useEffect } from 'react';

export interface UserProfile {
  name: string;
  email: string;
  gender?: string;
  dateOfBirth?: string;
  height?: number;
  weight?: number;
  bodyFat?: number;
  goal?: string;
  activityLevel?: string;
  fitnessLevel?: string;
  trainingDays?: number;
  injuries?: string[];
  dietaryPreferences?: string[];
  mealsPerDay?: number;
  avatar?: string;
}

export interface WorkoutDay {
  id: string;
  name: string;
  focus: string;
  duration: number;
  exercises: Exercise[];
  completed?: boolean;
}

export interface DropsetEntry {
  weight: number;
  reps: number;
}

export interface SetLog {
  setNumber: number;
  targetReps: string;
  actualReps?: number;
  weight?: number;
  completed: boolean;
  isDropset: boolean;
  dropsets: DropsetEntry[];
}

export interface Exercise {
  id: string;
  name: string;
  sets: number;
  reps: string;
  thumbnail?: string;
  instructions?: string;
  restTime?: number;
  loadType: 'bodyweight' | 'weighted' | 'machine';
  defaultWeight?: number;
  targetMuscles?: string;
  setLogs?: SetLog[];
}

export interface Meal {
  id: string;
  name: string;
  time: string;
  calories: number;
  protein: number;
  carbs: number;
  fats: number;
  foods: Food[];
  eaten?: boolean;
}

export interface Food {
  name: string;
  portion: string;
  calories: number;
}

export interface ProgressEntry {
  date: string;
  weight?: number;
  bodyFat?: number;
  measurements?: {
    chest?: number;
    waist?: number;
    hips?: number;
    arms?: number;
    thighs?: number;
  };
}

interface AppContextType {
  user: UserProfile | null;
  setUser: (user: UserProfile | null) => void;
  updateUser: (updates: Partial<UserProfile>) => void;
  isAuthenticated: boolean;
  login: (email: string, password: string) => void;
  logout: () => void;
  signup: (name: string, email: string, password: string) => void;
  workoutPlan: WorkoutDay[];
  nutritionPlan: Meal[];
  progress: ProgressEntry[];
  addProgress: (entry: ProgressEntry) => void;
  completeWorkout: (dayId: string) => void;
  markMealEaten: (mealId: string) => void;
  waterIntake: number;
  addWater: () => void;
  resetWater: () => void;
}

const AppContext = createContext<AppContextType | undefined>(undefined);

// Mock data
const mockWorkoutPlan: WorkoutDay[] = [
  {
    id: '1',
    name: 'Push Day',
    focus: 'Chest, Shoulders, Triceps',
    duration: 60,
    exercises: [
      { id: 'e1', name: 'Barbell Bench Press', sets: 4, reps: '8-10', instructions: 'Keep your back flat and lower the bar to mid-chest. Press explosively.', restTime: 90, loadType: 'weighted', defaultWeight: 80, targetMuscles: 'Chest, Triceps' },
      { id: 'e2', name: 'Incline Dumbbell Press', sets: 3, reps: '10-12', instructions: 'Set bench at 30-45 degrees. Control the weight on the way down.', restTime: 75, loadType: 'weighted', defaultWeight: 25, targetMuscles: 'Upper Chest, Shoulders' },
      { id: 'e3', name: 'Cable Flyes', sets: 3, reps: '12-15', instructions: 'Focus on the squeeze at the center. Keep a slight bend in elbows.', restTime: 60, loadType: 'machine', defaultWeight: 15, targetMuscles: 'Chest' },
      { id: 'e4', name: 'Overhead Press', sets: 4, reps: '8-10', instructions: 'Keep core tight. Press weight directly overhead.', restTime: 90, loadType: 'weighted', defaultWeight: 50, targetMuscles: 'Shoulders, Triceps' },
      { id: 'e5', name: 'Lateral Raises', sets: 3, reps: '12-15', instructions: 'Slight bend in elbows. Raise to shoulder height.', restTime: 60, loadType: 'weighted', defaultWeight: 10, targetMuscles: 'Shoulders' },
      { id: 'e6', name: 'Tricep Pushdowns', sets: 3, reps: '12-15', instructions: 'Keep elbows tucked. Full extension at bottom.', restTime: 60, loadType: 'machine', defaultWeight: 20, targetMuscles: 'Triceps' },
    ],
  },
  {
    id: '2',
    name: 'Pull Day',
    focus: 'Back, Biceps',
    duration: 55,
    exercises: [
      { id: 'e7', name: 'Deadlifts', sets: 4, reps: '6-8', instructions: 'Keep back neutral. Drive through heels.', restTime: 120, loadType: 'weighted', defaultWeight: 120, targetMuscles: 'Back, Glutes, Hamstrings' },
      { id: 'e8', name: 'Pull-ups', sets: 4, reps: '8-10', instructions: 'Full range of motion. Control the descent.', restTime: 90, loadType: 'bodyweight', targetMuscles: 'Back, Biceps' },
      { id: 'e9', name: 'Barbell Rows', sets: 4, reps: '8-10', instructions: 'Pull to lower chest. Keep torso stable.', restTime: 90, loadType: 'weighted', defaultWeight: 70, targetMuscles: 'Back, Biceps' },
      { id: 'e10', name: 'Face Pulls', sets: 3, reps: '15-20', instructions: 'Pull rope to face level. External rotation at end.', restTime: 60, loadType: 'machine', defaultWeight: 25, targetMuscles: 'Rear Delts, Upper Back' },
      { id: 'e11', name: 'Barbell Curls', sets: 3, reps: '10-12', instructions: 'Keep elbows stationary. Full contraction at top.', restTime: 60, loadType: 'weighted', defaultWeight: 30, targetMuscles: 'Biceps' },
      { id: 'e12', name: 'Hammer Curls', sets: 3, reps: '10-12', instructions: 'Neutral grip. Control the weight.', restTime: 60, loadType: 'weighted', defaultWeight: 15, targetMuscles: 'Biceps, Forearms' },
    ],
  },
  {
    id: '3',
    name: 'Leg Day',
    focus: 'Quads, Hamstrings, Glutes',
    duration: 65,
    exercises: [
      { id: 'e13', name: 'Squats', sets: 4, reps: '8-10', instructions: 'Break at hips and knees. Depth to parallel or below.', restTime: 120, loadType: 'weighted', defaultWeight: 100, targetMuscles: 'Quads, Glutes' },
      { id: 'e14', name: 'Romanian Deadlifts', sets: 4, reps: '10-12', instructions: 'Hinge at hips. Feel stretch in hamstrings.', restTime: 90, loadType: 'weighted', defaultWeight: 80, targetMuscles: 'Hamstrings, Glutes' },
      { id: 'e15', name: 'Leg Press', sets: 3, reps: '12-15', instructions: 'Full range of motion. Keep lower back flat.', restTime: 75, loadType: 'machine', defaultWeight: 150, targetMuscles: 'Quads, Glutes' },
      { id: 'e16', name: 'Leg Curls', sets: 3, reps: '12-15', instructions: 'Curl fully. Squeeze hamstrings at top.', restTime: 60, loadType: 'machine', defaultWeight: 40, targetMuscles: 'Hamstrings' },
      { id: 'e17', name: 'Calf Raises', sets: 4, reps: '15-20', instructions: 'Full stretch at bottom. Peak contraction at top.', restTime: 45, loadType: 'machine', defaultWeight: 60, targetMuscles: 'Calves' },
    ],
  },
];

const mockNutritionPlan: Meal[] = [
  {
    id: 'm1',
    name: 'Breakfast',
    time: '7:00 AM',
    calories: 520,
    protein: 35,
    carbs: 55,
    fats: 18,
    foods: [
      { name: 'Oatmeal with berries', portion: '1 cup', calories: 180 },
      { name: 'Scrambled eggs', portion: '3 eggs', calories: 210 },
      { name: 'Avocado', portion: '1/2', calories: 120 },
      { name: 'Coffee', portion: '1 cup', calories: 10 },
    ],
  },
  {
    id: 'm2',
    name: 'Lunch',
    time: '12:30 PM',
    calories: 650,
    protein: 48,
    carbs: 62,
    fats: 22,
    foods: [
      { name: 'Grilled chicken breast', portion: '200g', calories: 330 },
      { name: 'Brown rice', portion: '1 cup', calories: 215 },
      { name: 'Mixed vegetables', portion: '1.5 cups', calories: 75 },
      { name: 'Olive oil', portion: '1 tbsp', calories: 30 },
    ],
  },
  {
    id: 'm3',
    name: 'Dinner',
    time: '7:00 PM',
    calories: 580,
    protein: 45,
    carbs: 50,
    fats: 20,
    foods: [
      { name: 'Salmon fillet', portion: '180g', calories: 320 },
      { name: 'Sweet potato', portion: '1 medium', calories: 130 },
      { name: 'Broccoli', portion: '1.5 cups', calories: 55 },
      { name: 'Almonds', portion: '15', calories: 75 },
    ],
  },
  {
    id: 'm4',
    name: 'Snacks',
    time: 'Throughout day',
    calories: 300,
    protein: 22,
    carbs: 28,
    fats: 12,
    foods: [
      { name: 'Greek yogurt', portion: '1 cup', calories: 140 },
      { name: 'Protein bar', portion: '1', calories: 160 },
    ],
  },
];

export function AppProvider({ children }: { children: React.ReactNode }) {
  const [user, setUser] = useState<UserProfile | null>(() => {
    const saved = localStorage.getItem('fadifit-user');
    return saved ? JSON.parse(saved) : null;
  });

  const [isAuthenticated, setIsAuthenticated] = useState(() => {
    return !!localStorage.getItem('fadifit-auth');
  });

  const [workoutPlan, setWorkoutPlan] = useState<WorkoutDay[]>(mockWorkoutPlan);
  const [nutritionPlan, setNutritionPlan] = useState<Meal[]>(mockNutritionPlan);
  const [progress, setProgress] = useState<ProgressEntry[]>([]);
  const [waterIntake, setWaterIntake] = useState(0);

  useEffect(() => {
    if (user) {
      localStorage.setItem('fadifit-user', JSON.stringify(user));
    } else {
      localStorage.removeItem('fadifit-user');
    }
  }, [user]);

  const updateUser = (updates: Partial<UserProfile>) => {
    setUser(prev => prev ? { ...prev, ...updates } : null);
  };

  const login = (email: string, password: string) => {
    // Mock login
    const mockUser: UserProfile = {
      name: 'Fadi',
      email,
      gender: 'male',
      weight: 75,
      height: 180,
      bodyFat: 15,
      goal: 'Gain muscle',
    };
    setUser(mockUser);
    setIsAuthenticated(true);
    localStorage.setItem('fadifit-auth', 'true');
  };

  const signup = (name: string, email: string, password: string) => {
    const mockUser: UserProfile = {
      name,
      email,
    };
    setUser(mockUser);
    setIsAuthenticated(true);
    localStorage.setItem('fadifit-auth', 'true');
  };

  const logout = () => {
    setUser(null);
    setIsAuthenticated(false);
    localStorage.removeItem('fadifit-auth');
    localStorage.removeItem('fadifit-user');
  };

  const addProgress = (entry: ProgressEntry) => {
    setProgress(prev => [...prev, entry]);
  };

  const completeWorkout = (dayId: string) => {
    setWorkoutPlan(prev =>
      prev.map(day => day.id === dayId ? { ...day, completed: true } : day)
    );
  };

  const markMealEaten = (mealId: string) => {
    setNutritionPlan(prev =>
      prev.map(meal => meal.id === mealId ? { ...meal, eaten: true } : meal)
    );
  };

  const addWater = () => {
    setWaterIntake(prev => prev + 1);
  };

  const resetWater = () => {
    setWaterIntake(0);
  };

  return (
    <AppContext.Provider
      value={{
        user,
        setUser,
        updateUser,
        isAuthenticated,
        login,
        logout,
        signup,
        workoutPlan,
        nutritionPlan,
        progress,
        addProgress,
        completeWorkout,
        markMealEaten,
        waterIntake,
        addWater,
        resetWater,
      }}
    >
      {children}
    </AppContext.Provider>
  );
}

export function useApp() {
  const context = useContext(AppContext);
  if (!context) {
    throw new Error('useApp must be used within AppProvider');
  }
  return context;
}
