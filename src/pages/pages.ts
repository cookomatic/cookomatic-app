import { TutorialPage } from './tutorial/tutorial';
import { MealOverview } from '../pages/meal-overview/meal-overview';
import { MealComplete } from '../pages/meal-complete/meal-complete'

// The page the user lands on after opening the app and without a session
export const FirstRunPage = TutorialPage;

// The main page the user will see as they use the app over a long period of time.
export const MainPage = MealOverview;
