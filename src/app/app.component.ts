import { Component, ViewChild } from '@angular/core';
import { Platform, Nav, Config } from 'ionic-angular';
import { StatusBar, Splashscreen } from 'ionic-native';

import { Settings } from '../providers/providers';

import { FirstRunPage } from '../pages/pages';
import { ContentPage } from '../pages/content/content';
import { LoginPage } from '../pages/login/login';
import { SignupPage } from '../pages/signup/signup';
import { TutorialPage } from '../pages/tutorial/tutorial';
import { WelcomePage } from '../pages/welcome/welcome';
import { ListMasterPage } from '../pages/list-master/list-master';
import { MenuPage } from '../pages/menu/menu';
import { SettingsPage } from '../pages/settings/settings';
import { SearchPage } from '../pages/search/search';

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
    { title: 'Login', component: LoginPage },
    { title: 'Signup', component: SignupPage },
    { title: 'Master Detail', component: ListMasterPage },
    { title: 'Menu', component: MenuPage },
    { title: 'Settings', component: SettingsPage },
    { title: 'Search', component: SearchPage },
    { title: 'Meal Overview', component: MealOverview }
  ]

  constructor(platform: Platform, settings: Settings, config: Config) {
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
