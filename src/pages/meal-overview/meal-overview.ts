import { Api } from '../../providers/api';
import { Component } from '@angular/core';
import { NavController } from 'ionic-angular';
import { ModalController } from 'ionic-angular';
import { Events } from 'ionic-angular';

import { AddDishes } from '../add-dishes/add-dishes';
import { Cooking } from '../cooking/cooking';

@Component({
  selector: 'page-meal-overview',
  templateUrl: 'meal-overview.html'
})
export class MealOverview {
  dishes: any;
  meal: any;
  constructor(
    public api: Api,
    public navCtrl: NavController,
    public modalCtrl: ModalController,
    public events: Events
  ) {
    // Initial value
    this.meal = {'ingredients': [], 'estimated_time': 0};

    this.dishes = [];
    events.subscribe("dish:add", (items) => {
      this.dishes = this.dishes.concat(items);
      this.genMealSchedule();
    });

    this.addDish();
  }

  addDish() {
    let modal = this.modalCtrl.create(AddDishes);
    modal.present();
  }

  removeDish(event, item, index) {
    this.dishes.splice(index, 1);
  }

  createMeal() {
    // let seq = this.api.post('meal', this.dishes);
    // seq
    //   .map(res => res.json())
    //   .subscribe(res => {
    //     return res['meal_id'];
    //   }, err => {
    //     console.error('ERROR', err);
    //   })
    return 12345
  }

  genMealSchedule() {
    // Send dishes to DB and get a meal ID
    var mealId = this.createMeal();

    // Get a schedule for the created meal
    let seq = this.api.get('schedule/' + mealId)
    seq
      .map(res => res.json())
      .subscribe(res => {
        this.meal = res;
      }, err => {
        console.error('ERROR', err);
      })
  }

  startCooking() {
    this.navCtrl.push(Cooking, {"dishes": this.dishes});
  }

}
