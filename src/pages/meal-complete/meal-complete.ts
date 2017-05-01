import { Component } from '@angular/core';
import { NavController, NavParams } from 'ionic-angular';
import { Events } from 'ionic-angular';
import { MainPage } from '../../pages/pages';

import { Api } from '../../providers/api';

import { SimpleGlobal } from 'ng2-simple-global';

@Component({
  selector: 'meal-complete',
  templateUrl: 'meal-complete.html'
})
export class MealComplete {
  cook_event_id: any;

  constructor(
    private api: Api,
    private navCtrl: NavController,
    private navParams: NavParams,
    private events: Events,
    private sg: SimpleGlobal
  ) {
    this.createCookEvent();
  }

  createCookEvent() {
    let d = new Date();

    let seq = this.api.post('cook_event', {
      'time': Math.ceil(d.getTime() / 1000)
    });

    seq
      .map(res => res.json())
      .subscribe(res => {
        this.cook_event_id = res['id'];
      }, err => {
        console.error('ERROR', err);
      })

  }

  rateMeal(rating) {
    let seq = this.api.patch('cook_event', {
      'id': this.cook_event_id,
      'rating': rating
    });

    seq
      .map(res => res.json())
      .subscribe(res => {
      }, err => {
        console.error('ERROR', err);
      })
  }

  reviewMeal(review) {
    let seq = this.api.patch('cook_event', {
      'id': this.cook_event_id,
      'review': review
    });

    seq
      .map(res => res.json())
      .subscribe(res => {
      }, err => {
        console.error('ERROR', err);
      })
  }

  goToMainPage() {
    // Reset meal variables
    this.sg['dishes'] = [];
    this.sg['schedule'] = {'ingredients': [], 'estimated_time': 0};

    this.navCtrl.push(MainPage);
  }
}
