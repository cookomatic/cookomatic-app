import { Component, ViewChild } from '@angular/core';
import { Platform, Nav, Config } from 'ionic-angular';
import { StatusBar, Splashscreen } from 'ionic-native';

import { Auth } from '../providers/auth';

import { FirstRunPage } from '../pages/pages';
import { WelcomePage } from '../pages/welcome/welcome';
import { SelectDish } from '../pages/select-dish/select-dish';
import { MealComplete } from '../pages/meal-complete/meal-complete';
import { DishAdded } from '../pages/dish-added/dish-added';

import { MealOverview } from '../pages/meal-overview/meal-overview';

@Component({
  template: `
  <ion-nav #content [root]="rootPage"></ion-nav>`
})

export class Cookomatic {
  rootPage = FirstRunPage;

  @ViewChild(Nav) nav: Nav;

  pages: any[] = [
    { title: 'Welcome', component: WelcomePage },
    { title: 'Meal Overview', component: MealOverview },
    { title: 'Select Dish', component: SelectDish },
    { title: 'Meal Complete', component: MealComplete },
    { title: 'Dish Added', component: DishAdded },
  ]

  constructor(
    platform: Platform,
    protected auth: Auth,
    config: Config) {
    platform.ready().then(() => {
      // Okay, so the platform is ready and our plugins are available.
      // Here you can do any higher level native things you might need.
      StatusBar.styleDefault();
      Splashscreen.hide();
    });
  }

  openPage(page) {
    // Reset the content nav to have just this page
    // we wouldn't want the back button to show in this scenario
    this.nav.setRoot(page.component);
  }
}
