import { Component } from '@angular/core';
import { NavController, NavParams } from 'ionic-angular';
import { Events } from 'ionic-angular';
import { MainPage } from '../../pages/pages';import { NgModule } from '@angular/core';
import { IonicApp, IonicModule } from 'ionic-angular';

// Import ionic2-rating module
import { Ionic2RatingModule } from 'ionic2-rating';

import { SimpleGlobal } from 'ng2-simple-global';

@NgModule({
  declarations: [
    Component,
    MainPage
  ],
  imports: [
    IonicModule.forRoot(Component),
    Ionic2RatingModule // Put ionic2-rating module here
  ],
  bootstrap: [IonicApp],
  entryComponents: [
    Component,
    MainPage
  ],
  providers: []
})
export class AppModule {}

@Component({
  selector: 'meal-complete',
  templateUrl: 'meal-complete.html'
})
export class MealComplete {
  item: any;
  constructor(
    private navCtrl: NavController,
    private navParams: NavParams,
    private events: Events,
    private sg: SimpleGlobal
  ) {

  }
  goToMainPage() {
    // Reset meal variables
    this.sg['dishes'] = [];
    this.sg['schedule'] = {'ingredients': [], 'estimated_time': 0};

    this.navCtrl.push(MainPage);
  }
}
