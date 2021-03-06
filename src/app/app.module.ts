import { NgModule, ErrorHandler } from '@angular/core';
import { IonicApp, IonicModule, IonicErrorHandler } from 'ionic-angular';
import { Storage } from '@ionic/storage';

import { Cookomatic } from './app.component';

import { WelcomePage } from '../pages/welcome/welcome';

import { MealOverview } from '../pages/meal-overview/meal-overview';
import { DishInfo } from '../pages/dish-info/dish-info';
import { Cooking } from '../pages/cooking/cooking';
import { SelectDish } from '../pages/select-dish/select-dish';
import { MealComplete } from '../pages/meal-complete/meal-complete';
import { DishAdded } from '../pages/dish-added/dish-added';

import { AngularFireModule } from 'angularfire2';
import { firebaseConfig } from '../config/firebase';

import { Api } from '../providers/api';
import { Auth } from '../providers/auth';
import { SimpleGlobal } from 'ng2-simple-global';
import { Ionic2RatingModule } from 'ionic2-rating';

/**
 * The Pages array lists all of the pages we want to use in our app.
 * We then take these pages and inject them into our NgModule so Angular
 * can find them. As you add and remove pages, make sure to keep this list up to date.
 */
let pages = [
  Cookomatic,
  WelcomePage,
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
    Api,
    Auth,
    SimpleGlobal,
    // Keep this to enable Ionic's runtime error handling during development
    { provide: ErrorHandler, useClass: IonicErrorHandler }
  ];
}

@NgModule({
  declarations: declarations(),
  imports: [
    IonicModule.forRoot(Cookomatic),
    AngularFireModule.initializeApp(firebaseConfig),
    Ionic2RatingModule
  ],
  bootstrap: [IonicApp],
  entryComponents: entryComponents(),
  providers: providers()
})
export class AppModule {}
