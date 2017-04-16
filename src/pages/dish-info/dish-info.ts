import { Component } from '@angular/core';
import { NavController, NavParams } from 'ionic-angular';
import { Events } from 'ionic-angular';

import { Api } from '../../providers/api';
import { State } from '../../providers/state';

import { DishAdded } from '../dish-added/dish-added'

@Component({
  selector: 'page-dish-info',
  templateUrl: 'dish-info.html'
})
export class DishInfo {
  item: any;
  constructor(
    private api: Api,
    private state: State,
    private navCtrl: NavController,
    private navParams: NavParams,
    private events: Events
  ) {
    // Initial value
    this.item = {'ingredients': [], 'steps': []};

    // Call API to get this dish entity
    let seq = this.api.get('dish/' + navParams.get('item_id'))
    seq
      .map(res => res.json())
      .subscribe(res => {
        this.item = res;
      }, err => {
        console.error('ERROR', err);
      })
  }

  addToMeal(event, item) {
    // Add new dish
    this.state.dishes.concat(item);

    // Alert subscribers of new dish
    this.events.publish("dishChange", null);

    this.navCtrl.setRoot(DishAdded, item, {
      animate: true,
      direction: 'forward'
    });
  }
}
