import { Component, ViewChild } from '@angular/core';
import { Platform, Nav, Config } from 'ionic-angular';
import { StatusBar, Splashscreen } from 'ionic-native';

import { Settings } from '../providers/providers';
import { DataProvider } from '../providers/data';
import { AuthProvider } from '../providers/auth';

import { FirstRunPage } from '../pages/pages';
import { ContentPage } from '../pages/content/content';
import { TutorialPage } from '../pages/tutorial/tutorial';
import { WelcomePage } from '../pages/welcome/welcome';
import { MenuPage } from '../pages/menu/menu';
import { SettingsPage } from '../pages/settings/settings';
import { SelectDish } from '../pages/select-dish/select-dish';
import { MealComplete } from '../pages/meal-complete/meal-complete';
import { DishAdded } from '../pages/dish-added/dish-added';

import { MealOverview } from '../pages/meal-overview/meal-overview';

@Component({
  template: `<ion-menu [content]="content">
    <ion-header>
      <ion-toolbar>
        <ion-title>Pages</ion-title>
      </ion-toolbar>
    </ion-header>

    <ion-content>
      <ion-list>
        <button menuClose ion-item *ngFor="let p of pages" (click)="openPage(p)">
          {{p.title}}
        </button>
      </ion-list>
    </ion-content>

  </ion-menu>
  <ion-nav #content [root]="rootPage"></ion-nav>`
})
export class Cookomatic {
  rootPage = FirstRunPage;

  @ViewChild(Nav) nav: Nav;

  pages: any[] = [
    { title: 'Tutorial', component: TutorialPage },
    { title: 'Welcome', component: WelcomePage },
    { title: 'Content', component: ContentPage },
    { title: 'Menu', component: MenuPage },
    { title: 'Settings', component: SettingsPage },
    { title: 'Meal Overview', component: MealOverview },
    { title: 'Select Dish', component: SelectDish },
    { title: 'Meal Complete', component: MealComplete },
    { title: 'Dish Added', component: DishAdded },
  ]
  user: any;

  constructor(
    platform: Platform,
    settings: Settings,
    protected data: DataProvider,
    protected auth: AuthProvider,
    config: Config) {

    // Create default user object
    this.user = {image: ''};

    platform.ready().then(() => {
      // Okay, so the platform is ready and our plugins are available.
      // Here you can do any higher level native things you might need.
      StatusBar.styleDefault();
      Splashscreen.hide();

      // Configure login
      this.auth.getUserData().subscribe(data => {
        this.user = data;
      }, err => {
        this.openPage(WelcomePage);
      });

    });
  }

  openPage(page) {
    // Reset the content nav to have just this page
    // we wouldn't want the back button to show in this scenario
    this.nav.setRoot(page.component);
  }
}
