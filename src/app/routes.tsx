import { createBrowserRouter } from 'react-router';

// Auth
import { LanguageSelect } from './pages/LanguageSelect';
import { Splash } from './pages/Splash';
import { Welcome } from './pages/Welcome';
import { SignIn } from './pages/SignIn';
import { SignUp } from './pages/SignUp';
import { ForgotPassword } from './pages/ForgotPassword';

// Onboarding
import { BasicInfo } from './pages/onboarding/BasicInfo';
import { BodyComposition } from './pages/onboarding/BodyComposition';
import { FitnessProfile } from './pages/onboarding/FitnessProfile';
import { Health } from './pages/onboarding/Health';
import { Nutrition } from './pages/onboarding/Nutrition';
import { Review } from './pages/onboarding/Review';

// Main
import { Generating } from './pages/Generating';
import { Dashboard } from './pages/Dashboard';
import { Plan } from './pages/Plan';
import { WorkoutDetail } from './pages/WorkoutDetail';
import { ActiveWorkout } from './pages/ActiveWorkout';
import { WorkoutComplete } from './pages/WorkoutComplete';
import { Nutrition as NutritionPage } from './pages/Nutrition';
import { MealDetail } from './pages/MealDetail';
import { Progress } from './pages/Progress';
import { AddProgress } from './pages/AddProgress';
import { Messages } from './pages/Messages';
import { Profile } from './pages/Profile';
import { Settings } from './pages/Settings';
import { PersonalInfo } from './pages/PersonalInfo';
import { GoalsPreferences } from './pages/GoalsPreferences';
import { NotificationsSettings } from './pages/NotificationsSettings';
import { Subscription } from './pages/Subscription';
import { DesignSystem } from './pages/DesignSystem';

export const router = createBrowserRouter([
  {
    path: '/',
    Component: Splash,
  },
  {
    path: '/language-select',
    Component: LanguageSelect,
  },
  {
    path: '/welcome',
    Component: Welcome,
  },
  {
    path: '/signin',
    Component: SignIn,
  },
  {
    path: '/signup',
    Component: SignUp,
  },
  {
    path: '/forgot-password',
    Component: ForgotPassword,
  },
  {
    path: '/onboarding/basic-info',
    Component: BasicInfo,
  },
  {
    path: '/onboarding/body-composition',
    Component: BodyComposition,
  },
  {
    path: '/onboarding/fitness-profile',
    Component: FitnessProfile,
  },
  {
    path: '/onboarding/health',
    Component: Health,
  },
  {
    path: '/onboarding/nutrition',
    Component: Nutrition,
  },
  {
    path: '/onboarding/review',
    Component: Review,
  },
  {
    path: '/generating',
    Component: Generating,
  },
  {
    path: '/dashboard',
    Component: Dashboard,
  },
  {
    path: '/plan',
    Component: Plan,
  },
  {
    path: '/plan/:id',
    Component: WorkoutDetail,
  },
  {
    path: '/workout/:id',
    Component: ActiveWorkout,
  },
  {
    path: '/workout-complete',
    Component: WorkoutComplete,
  },
  {
    path: '/nutrition',
    Component: NutritionPage,
  },
  {
    path: '/nutrition/:id',
    Component: MealDetail,
  },
  {
    path: '/progress',
    Component: Progress,
  },
  {
    path: '/progress/add',
    Component: AddProgress,
  },
  {
    path: '/messages',
    Component: Messages,
  },
  {
    path: '/profile',
    Component: Profile,
  },
  {
    path: '/settings',
    Component: Settings,
  },
  {
    path: '/settings/personal-info',
    Component: PersonalInfo,
  },
  {
    path: '/settings/goals',
    Component: GoalsPreferences,
  },
  {
    path: '/settings/notifications',
    Component: NotificationsSettings,
  },
  {
    path: '/settings/subscription',
    Component: Subscription,
  },
  {
    path: '/profile/personal-info',
    Component: Profile,
  },
  {
    path: '/profile/goals',
    Component: Profile,
  },
  {
    path: '/profile/notifications',
    Component: Profile,
  },
  {
    path: '/profile/subscription',
    Component: Profile,
  },
  {
    path: '/design-system',
    Component: DesignSystem,
  },
]);
