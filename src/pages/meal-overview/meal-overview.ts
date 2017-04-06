import { Api } from '../../providers/api';
import { Component } from '@angular/core';
import { NavController, NavParams } from 'ionic-angular';
import { ModalController } from 'ionic-angular';
import { Events } from 'ionic-angular';

import { SelectDish } from '../select-dish/select-dish';
import { Cooking } from '../cooking/cooking';

@Component({
  selector: 'page-meal-overview',
  templateUrl: 'meal-overview.html'
})
export class MealOverview {
  dishes: any;
  schedule: any;
  user: any;

  constructor(
    public api: Api,
    public navCtrl: NavController,
    private navParams: NavParams,
    public modalCtrl: ModalController,
    public events: Events
  ) {
    // Get user
    this.user = this.navParams.get('user');

    // Set initial values
    this.schedule = {'ingredients': [], 'estimated_time': 0};
    this.dishes = [];

    // Whenever a new dish is added, generate a new meal schedule
    events.subscribe("dish:select", (items) => {
      this.dishes = this.dishes.concat(items);
      this.genMealSchedule();
    });

    // If there are no dishes, pop open the Dish Selection modal
    if (this.dishes.length == 0){
      this.addDish();
    }
  }

  addDish() {
    let modal = this.modalCtrl.create(SelectDish);
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
        this.schedule = res;
      }, err => {
        console.error('ERROR', err);
      })

  }

  startCooking() {
    this.navCtrl.push(Cooking, {"schedule": this.schedule});
  }
}
