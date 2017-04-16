import { Component } from '@angular/core';
import { NavController, NavParams } from 'ionic-angular';
import { Events } from 'ionic-angular';
import { MainPage } from '../../pages/pages';

@Component({
  selector: 'meal-complete',
  templateUrl: 'meal-complete.html'
})
export class MealComplete {
  item: any;
  constructor(
    private navCtrl: NavController,
    private navParams: NavParams,
    private events: Events
  ) {

  }
  goToMainPage() {
    this.navCtrl.push(MainPage);
  }
}
