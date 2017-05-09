import { Component } from '@angular/core';
import { NavController, ViewController } from 'ionic-angular';
import { Events } from 'ionic-angular';

import { Api } from '../../providers/api';
import { DishInfo } from '../dish-info/dish-info';

import { SelectDish } from '../select-dish/select-dish';
import { SimpleGlobal } from 'ng2-simple-global';

@Component({
  selector: 'page-dish-added',
  templateUrl: 'dish-added.html'
})
export class DishAdded {

  suggestedDishes: any = [];

  constructor(
    private api: Api,
    private navCtrl: NavController,
    private viewCtrl: ViewController,
    private events: Events,
    private sg: SimpleGlobal
  ) {
    this.getDishes();
  }

  getDishes() {
    let seq = this.api.get('dish/suggested')
    seq
      .map(res => res.json())
      .subscribe(res => {
        this.suggestedDishes = res;
      }, err => {
        console.error('ERROR', err);
        this.api.handleError(err);
      })
  }

  checkIfAdded(dish) {
    for (let selectedDish of this.sg['dishes']) {
      if (dish['id'] == selectedDish['id']) {
        return true;
      }
    }
    return false;
  }

  openItem(item: any) {
    this.navCtrl.push(DishInfo, {
      item_id: item['id']
    });
  }

  goToMainPage() {
    this.viewCtrl.dismiss();
  }

  goBackToSearch(event, item) {
    this.navCtrl.setRoot(SelectDish, {}, {
      animate: true,
      direction: 'forward'
    });
  }

}
