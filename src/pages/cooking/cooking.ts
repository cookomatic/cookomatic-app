import { Component } from '@angular/core';
import { NavController, ViewController, NavParams } from 'ionic-angular';
import { MealComplete } from '../meal-complete/meal-complete';
import { Observable } from 'rxjs/Rx';
import { ToastController } from 'ionic-angular';

function startCooking(toastCtrl){
  let toast = toastCtrl.create({
    message: 'Cooking timer has started!',
    duration: 2000,
    position: 'top'
  });
  toast.present();
}

function cookingComplete(subscription, toastCtrl) {
  subscription.unsubscribe();
  let toast = toastCtrl.create({
    message: 'Cooking has finished!',
    duration: 3000,
    position: 'top'
  });
  toast.present();
}

@Component({
  selector: 'page-cooking',
  templateUrl: 'cooking.html'
})
export class Cooking {
  schedule: any;
  steps: any;
  stepVisibility: any;
  totalTime: any;
  timer: any;
  ticks: any;
  constructor (
    public navCtrl: NavController,
    public viewCtrl: ViewController,
    public params: NavParams,
    public toastCtrl: ToastController
  ) {
    this.viewCtrl.setBackButtonText("Stop");
    this.schedule = this.params.get('schedule');
    this.steps = this.schedule.steps;

    this.stepVisibility = new Array(this.steps.length).fill(false);

    this.totalTime = this.schedule.estimated_time;
    this.ticks = 0
    this.timer = Observable.timer(0, 10000);
    let subscription = this.timer.subscribe(t=> {
      this.ticks = t;
      if (t >= this.totalTime){
        cookingComplete(subscription, toastCtrl);
      }
    });

    startCooking(this.toastCtrl);
  }

  stepColor(time){
    if (time < 0){
      return "cooking-done";
    } else if(this.ticks >= time){
      return "cooking-ready";
    } else {
      return "cooking-upcoming";
    }
  }

  doneCooking() {
    this.navCtrl.push(MealComplete);
  }
}
