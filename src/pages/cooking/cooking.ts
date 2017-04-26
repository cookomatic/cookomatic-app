import { Component } from '@angular/core';
import { NavController, ViewController, NavParams } from 'ionic-angular';
import { MealComplete } from '../meal-complete/meal-complete';
import { Observable } from 'rxjs/Rx';
import { ToastController } from 'ionic-angular';

import { SimpleGlobal } from 'ng2-simple-global';

// This is sped up for demos. Should be 30000 normally.
var HALF_MINUTE = 2500

function stepChecked(element, index, array) {
  return element.checked;
}

@Component({
  selector: 'page-cooking',
  templateUrl: 'cooking.html'
})
export class Cooking {
  schedule: any;
  steps: any;
  totalTime: any;
  timer: any;
  ticks: any;

  constructor (
    private navCtrl: NavController,
    private viewCtrl: ViewController,
    private params: NavParams,
    private toastCtrl: ToastController,
    private sg: SimpleGlobal
  ) {
    // Get schedule from Meal Overview
    this.steps = this.sg['schedule']['steps'];

    // Initialize timer
    this.timer = Observable.timer(0, HALF_MINUTE);
    this.totalTime = this.sg['schedule'].estimated_time;
    this.ticks = 0;

    // Start timer ticking
    let timer_sub = this.timer.subscribe(num_ticks => {
      this.ticks = num_ticks / 2;
      if (this.ticks >= this.totalTime){
        this.cookingComplete(timer_sub);
      }
    });

    // Notify user that cooking has begun
    this.startCooking();
  }

  startCooking(){
    let toast = this.toastCtrl.create({
      message: 'Cooking timer has started!',
      duration: 2000,
      position: 'top'
    });
    toast.present();
  }

  roundTime(ticks) {
    return Math.floor(ticks);
  }

  cookingInProgress() {
    // If any step is still in progress, keep outline of button
    if (this.steps.every(stepChecked) || this.totalTime - this.ticks <= 0) {
      return false;
    }

    return true;
  }

  stepColor(time, checked) {
    if (checked) {
      return "cooking-done"
    }
    if (time < 0){
      return "cooking-done";
    } else if(this.ticks >= time){
      return "cooking-ready";
    } else {
      return "cooking-upcoming";
    }
  }

  cookingComplete(timer_sub) {
    // Stop timer
    timer_sub.unsubscribe();

    // Notify user that cooking is done
    let toast = this.toastCtrl.create({
      message: 'Cooking has finished!',
      duration: 3000,
      position: 'top'
    });
    toast.present();
  }

  doneCooking() {
    this.navCtrl.push(MealComplete);
  }
}
