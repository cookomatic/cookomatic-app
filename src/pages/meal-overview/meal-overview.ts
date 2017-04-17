import { Component } from '@angular/core';
import { NavController, NavParams } from 'ionic-angular';
import { ModalController } from 'ionic-angular';
import { Events } from 'ionic-angular';
import { SimpleGlobal } from 'ng2-simple-global';

import { Api } from '../../providers/api';

import { SelectDish } from '../select-dish/select-dish';
import { Cooking } from '../cooking/cooking';

@Component({
  selector: 'page-meal-overview',
  templateUrl: 'meal-overview.html'
})
export class MealOverview {
  schedule: any;

  constructor(
    private api: Api,
    private navCtrl: NavController,
    private navParams: NavParams,
    private modalCtrl: ModalController,
    private events: Events,
    private sg: SimpleGlobal
  ) {
    // Whenever a new dish is added, generate a new meal schedule
    events.subscribe("dishChange", (items) => {
      this.createMeal();
    });

    // If there are no dishes, pop open the Dish Selection modal
    if (this.sg['dishes'].length == 0){
      this.addDish();
    }
  }

  addDish() {
    let modal = this.modalCtrl.create(SelectDish);
    modal.present();
  }

  removeDish(event, item, index) {
    this.sg['dishes'].splice(index, 1);
    this.events.publish("dishChange", null);
  }

  createMeal() {
    var dish_ids = this.sg['dishes'].map(function(dish) {
      return dish['id']
    });

    let seq = this.api.post('meal', {'name': 'Meal', 'dishes': dish_ids});
    seq
      .map(res => res.json())
      .subscribe(res => {
        this.sg['schedule'] = res['schedule'];
      }, err => {
        console.error('ERROR', err);
      })
  }

  startCooking() {
    this.navCtrl.push(Cooking);
  }
}
