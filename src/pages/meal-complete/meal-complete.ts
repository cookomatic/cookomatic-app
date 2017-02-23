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
    public navCtrl: NavController,
    public navParams: NavParams,
    public events: Events
  ) {
   
  }
  goToMainPage() {
    this.navCtrl.push(MainPage);
  }
}
