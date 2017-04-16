import { Component } from '@angular/core';
import { NavController, NavParams, LoadingController } from 'ionic-angular';
import { ModalController } from 'ionic-angular';
import { Events } from 'ionic-angular';

import { Api } from '../../providers/api';
import { State } from '../../providers/state';

import { SelectDish } from '../select-dish/select-dish';
import { Cooking } from '../cooking/cooking';

@Component({
  selector: 'page-meal-overview',
  templateUrl: 'meal-overview.html'
})
export class MealOverview {
  schedule: any;
  loading: any;

  constructor(
    private api: Api,
    private state: State,
    private navCtrl: NavController,
    private navParams: NavParams,
    private modalCtrl: ModalController,
    private events: Events,
    private loadingCtrl: LoadingController
  ) {
    // Whenever a new dish is added, generate a new meal schedule
    events.subscribe("dishChange", (items) => {
      this.genSchedule();
    });

    // If there are no dishes, pop open the Dish Selection modal
    if (this.state.dishes.length == 0){
      this.addDish();
    }
  }

  showLoading(message) {
    this.loading = this.loadingCtrl.create({
      content: message
    });
    this.loading.present();
  }

  addDish() {
    let modal = this.modalCtrl.create(SelectDish);
    modal.present();
  }

  removeDish(event, item, index) {
    this.state.dishes.splice(index, 1);
    this.events.publish("dishChange", null);
  }

  genSchedule() {
    this.showLoading('Generating schedule...');
    this.createMeal();
  }

  createMeal() {
    var dish_ids = this.state.dishes.map(function(dish) {
      return dish['id']
    });

    let seq = this.api.post('meal', {'name': 'Meal', 'dishes': dish_ids});
    seq
      .map(res => res.json())
      .subscribe(res => {
        this.state.schedule = res['schedule'];
      }, err => {
        console.error('ERROR', err);
      })
  }

  startCooking() {
    this.navCtrl.push(Cooking);
  }
}
