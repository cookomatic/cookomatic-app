import { Component } from '@angular/core';
import { NavController, NavParams } from 'ionic-angular';
import { Events } from 'ionic-angular';

import { DishAdded } from '../dish-added/dish-added'

@Component({
  selector: 'page-dish-info',
  templateUrl: 'dish-info.html'
})
export class DishInfo {
  item: any;
  constructor(
    public navCtrl: NavController,
    public navParams: NavParams,
    public events: Events
  ) {
    this.item = navParams.get('item');
  }

  addToMeal(event, item) {
    //this.events.publish("dish:select", item);
    this.navCtrl.push(DishAdded, item)
    //this.navCtrl.pop();
  }
}
