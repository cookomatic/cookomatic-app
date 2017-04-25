import { Component } from '@angular/core';
import { NavController, NavParams } from 'ionic-angular';
import { Events } from 'ionic-angular';
import { SimpleGlobal } from 'ng2-simple-global';

import { Api } from '../../providers/api';

import { DishAdded } from '../dish-added/dish-added'

@Component({
  selector: 'page-dish-info',
  templateUrl: 'dish-info.html'
})
export class DishInfo {
  item: any;
  constructor(
    private api: Api,
    private navCtrl: NavController,
    private navParams: NavParams,
    private events: Events,
    private sg: SimpleGlobal
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
        this.api.handleError(err);
      })
  }

  addToMeal(event, item) {
    // Add new dish
    this.sg['dishes'] = this.sg['dishes'].concat(item);

    // Alert subscribers of new dish
    this.events.publish("dishChange", null);

    this.navCtrl.setRoot(DishAdded, item, {
      animate: true,
      direction: 'forward'
    });
  }
}
