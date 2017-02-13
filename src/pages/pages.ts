import { TutorialPage } from './tutorial/tutorial';
import { ListMasterPage } from './list-master/list-master';
import { SearchPage } from './search/search';
import { SettingsPage } from './settings/settings';

import { MealOverview } from '../pages/meal-overview/meal-overview';
import { AddDishes } from '../pages/add-dishes/add-dishes';

// The page the user lands on after opening the app and without a session
export const FirstRunPage = TutorialPage;

// The main page the user will see as they use the app over a long period of time.
export const MainPage = MealOverview;
