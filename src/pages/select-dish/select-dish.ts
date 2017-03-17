import { Component } from '@angular/core';
import { NavController, NavParams, ViewController } from 'ionic-angular';
import { Api } from '../../providers/api';

import { DishInfo } from '../dish-info/dish-info';
import { MainPage } from '../../pages/pages';

@Component({
  selector: 'select-dish',
  templateUrl: 'select-dish.html'
})
export class SelectDish {
  currentItems: any = [];

  constructor(
    public api: Api,
    public navCtrl: NavController,
    public navParams: NavParams,
    public viewCtrl: ViewController,) {
      this.loadItems("");
    }

  /**
   * Perform a service for the proper items.
   */
  getItems(ev) {
    let val = ev.target.value;

    this.loadItems(val)
  }

  loadItems(val) {
    let seq = this.api.get('dish/search?search=' + val)
    seq
      .map(res => res.json())
      .subscribe(res => {
        this.currentItems = res;
      }, err => {
        console.error('ERROR', err);
      })
  }
  /**
   * Navigate to the detail page for this item.
   */
  openItem(item: any) {
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
