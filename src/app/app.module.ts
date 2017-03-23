import { NgModule, ErrorHandler } from '@angular/core';
import { IonicApp, IonicModule, IonicErrorHandler } from 'ionic-angular';
import { Storage } from '@ionic/storage';

import { Cookomatic } from './app.component';

import { ContentPage } from '../pages/content/content';
import { LoginPage } from '../pages/login/login';
import { TutorialPage } from '../pages/tutorial/tutorial';
import { WelcomePage } from '../pages/welcome/welcome';
import { MenuPage } from '../pages/menu/menu';
import { SettingsPage } from '../pages/settings/settings';

import { MealOverview } from '../pages/meal-overview/meal-overview';
import { DishInfo } from '../pages/dish-info/dish-info';
import { Cooking } from '../pages/cooking/cooking';
import { SelectDish } from '../pages/select-dish/select-dish';
import { MealComplete } from '../pages/meal-complete/meal-complete';
import { DishAdded } from '../pages/dish-added/dish-added';

import { AngularFireModule } from 'angularfire2';

import { User } from '../providers/user';
import { Api } from '../providers/api';
import { Settings } from '../providers/settings';
import { DataProvider } from '../providers/data';
import { AuthProvider } from '../providers/auth';

export function provideSettings(storage: Storage) {
  /**
   * The Settings provider takes a set of default settings for your app.
   *
   * You can add new settings options at any time. Once the settings are saved,
   * these values will not overwrite the saved values (this can be done manually if desired).
   */
  return new Settings(storage, {
    option1: true,
    option2: 'Ionitron J. Framework',
    option3: '3',
    option4: 'Hello'
  });
}


/**
 * The Pages array lists all of the pages we want to use in our app.
 * We then take these pages and inject them into our NgModule so Angular
 * can find them. As you add and remove pages, make sure to keep this list up to date.
 */
let pages = [
  Cookomatic,
  ContentPage,
  LoginPage,
  TutorialPage,
  WelcomePage,
  MenuPage,
  SettingsPage,
  MealOverview,
  DishInfo,
  Cooking,
  SelectDish,
  MealComplete,
  DishAdded
];

export function declarations() {
  return pages;
}

export function entryComponents() {
  return pages;
}

export function providers() {
  return [
    Storage,
    User,
    Api,
    DataProvider,
    AuthProvider,
    { provide: Settings, useFactory: provideSettings, deps: [ Storage ] },
    // Keep this to enable Ionic's runtime error handling during development
    { provide: ErrorHandler, useClass: IonicErrorHandler }
  ];
}

export const firebaseConfig = {
  apiKey: 'AIzaSyDcbsUEReGm_dlijVXC1sMCcqKpCsXt0nQ',
  authDomain: 'ionic2-angularfire-login-14ea3.firebaseapp.com',
  databaseURL: 'https://ionic2-angularfire-login-14ea3.firebaseio.com',
  storageBucket: 'ionic2-angularfire-login-14ea3.appspot.com',
};

@NgModule({
  declarations: declarations(),
  imports: [
    IonicModule.forRoot(Cookomatic),
    AngularFireModule.initializeApp(firebaseConfig)
  ],
  bootstrap: [IonicApp],
  entryComponents: entryComponents(),
  providers: providers()
})
export class AppModule {}
