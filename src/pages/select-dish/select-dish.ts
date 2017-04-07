import { Component } from '@angular/core';
import { NavController, NavParams, ViewController } from 'ionic-angular';
import { Api } from '../../providers/api';

import { DishInfo } from '../dish-info/dish-info';
import { Events } from 'ionic-angular';

@Component({
  selector: 'select-dish',
  templateUrl: 'select-dish.html'
})
export class SelectDish {
  currentItems: any = [];
  dishes: any;

  constructor(
    public api: Api,
    public navCtrl: NavController,
    public navParams: NavParams,
    public viewCtrl: ViewController,
    public events: Events,
  ) {
      this.loadItems("");

      this.dishes = [];
      events.subscribe("dish:select", (items) => {
        this.dishes = this.dishes.concat(items);
      });
    }


  /**
   * Perform a service for the proper items.
   */
  getItems(ev) {
    let val = ev.target.value;
    this.loadItems(val)
  }

  checkAdded( item ) {
    var i = this.dishes.length;
    while( i-- ) {
       if (this.dishes[i] === item) {
           return true;
       }
    }
    return false;
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
      item_id: item['id']
    });
  }

  dismiss() {
    this.viewCtrl.dismiss();
  }
}
