import { Component } from '@angular/core';
import { NavController, NavParams } from 'ionic-angular';
import { Events } from 'ionic-angular';
import { MainPage } from '../../pages/pages';

import { SimpleGlobal } from 'ng2-simple-global';

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
