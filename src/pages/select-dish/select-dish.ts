import { Component } from '@angular/core';
import { NavController, NavParams, ViewController } from 'ionic-angular';
import { SimpleGlobal } from 'ng2-simple-global';

import { Api } from '../../providers/api';


import { DishInfo } from '../dish-info/dish-info';
import { Events } from 'ionic-angular';

@Component({
  selector: 'select-dish',
  templateUrl: 'select-dish.html'
})
export class SelectDish {
  dishResults: any = [];

  constructor(
    private api: Api,
    private navCtrl: NavController,
    private navParams: NavParams,
    private viewCtrl: ViewController,
    private events: Events,
    private sg: SimpleGlobal
  ) {
      this.searchDishes("");
    }

  /**
   * Perform a service for the proper items.
   */
  getItems(ev) {
    let val = ev.target.value;
    this.searchDishes(val)
  }

  checkIfAdded(dish) {
    for (let selectedDish of this.sg['dishes']) {
      if (dish['id'] === selectedDish['id']) {
        return true;
      }
    }
    return false;
  }

  searchDishes(val) {
    let seq = this.api.get('dish/search?search=' + val)
    seq
      .map(res => res.json())
      .subscribe(res => {
        this.dishResults = res;
      }, err => {
        console.error('ERROR', err);
      })
  }
  /**
   * Navigate to the detail page for this item.
   */
  openItem(item: any) {
    this.navCtrl.push(DishInfo, {
      item_id: item['id']
    });
  }

  dismiss() {
    this.viewCtrl.dismiss();
  }
}
