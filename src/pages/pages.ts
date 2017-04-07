import { WelcomePage } from './welcome/welcome';
import { MealOverview } from '../pages/meal-overview/meal-overview';

// The page the user lands on after opening the app and without a session
export const FirstRunPage = WelcomePage;

// The main page the user will see as they use the app over a long period of time.
export const MainPage = MealOverview;
