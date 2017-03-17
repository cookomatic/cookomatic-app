import { Component } from '@angular/core';
import { NavController, NavParams, ViewController } from 'ionic-angular';

//import { ItemDetailPage } from '../item-detail/item-detail';
import { DishInfo } from '../dish-info/dish-info';
import { Items } from '../../providers/providers';
import { Item } from '../../models/item';
import { MainPage } from '../../pages/pages';

@Component({
  selector: 'select-dish',
  templateUrl: 'select-dish.html'
})
export class SelectDish {
  currentItems: any = [];

  constructor(
    public navCtrl: NavController,
    public navParams: NavParams,
    public viewCtrl: ViewController,
    public items: Items) {}

  /**
   * Perform a service for the proper items.
   */
  getItems(ev) {
    let val = ev.target.value;
    if(!val || !val.trim()) {
      this.currentItems = [];
      return;
    }
    this.currentItems = this.items.query({
      name: val
    });
  }

  /**
   * Navigate to the detail page for this item.
   */
  openItem(item: Item) {
    this.navCtrl.push(DishInfo, {
      item: item
    });
  }

  dismiss() {
    this.viewCtrl.dismiss();
  }

  goToMainPage() {
    this.navCtrl.push(MainPage);
  }
}
