import { Component } from '@angular/core';
import { NavController, ViewController } from 'ionic-angular';
import { Storage } from '@ionic/storage';
import { Events } from 'ionic-angular';

import { DishInfo } from '../dish-info/dish-info'

function itemInArray(array, item) {
  return array.some(function(e) {return e.title === item.title})
}

@Component({
  selector: 'page-add-dishes',
  templateUrl: 'add-dishes.html'
})
export class AddDishes {
  dish: string = "entrees";
  entrees: any;
  sides: any;
  desserts: any;
  selectedDishes: any;
  addedDishes: any;

  constructor(
    public navCtrl: NavController,
    public viewCtrl: ViewController,
    public storage: Storage,
    public events: Events
  ) {
      storage.get('dish-entrees').then((val) => {
        this.entrees = val;
      })
      storage.get('dish-sides').then((val) => {
        this.sides = val;
      })
      storage.get('dish-desserts').then((val) => {
        this.desserts = val;
      })

      this.selectedDishes = [];
      this.addedDishes = [];
      storage.get('dishes').then((val) => {
        this.addedDishes = val;
      })

      events.subscribe("dish:select", (item) => {
        this.selectedDishes.push(item[0])
      });
  }

  itemAlreadyAdded(item) {
    return (itemInArray(this.selectedDishes, item) || itemInArray(this.addedDishes, item));
  }

  add() {
    this.events.publish("dish:add", this.selectedDishes);
    this.dismiss();
  }

  dismiss() {
    this.viewCtrl.dismiss();
  }

  itemTapped(event, item) {
    this.navCtrl.push(DishInfo, {
      item: item
    });
  }

}
