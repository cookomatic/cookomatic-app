import { Component } from '@angular/core';
import { NavController, ViewController, NavParams } from 'ionic-angular';

import { Observable } from 'rxjs/Rx';
import { ToastController } from 'ionic-angular';

function startCooking(toastCtrl){
  let toast = toastCtrl.create({
    message: 'Cooking timer has started!',
    duration: 3000,
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
  dishes: any;
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
    this.dishes = this.params.get('dishes');

    this.steps = [
      {"title": "Preheat Grill", "description": ["Preheat an outdoor grill for medium heat, and lightly oil the grate."], "time": 0},
      {"title": "Preheat Oven", "description": ["Preheat oven to 375 degrees F (190 degrees C).", "Lightly grease a medium baking dish."], "time": 3},
      {"title": "Prep Pork Chops", "description": ["In a bowl, mix together the seasoned salt, black pepper, garlic powder, onion powder, paprika, Worcestershire sauce, and smoke flavoring until thoroughly combined.", "Rinse pork chops, and sprinkle the wet chops on both sides with the spice mixture. With your hands, massage the spice rub into the meat."], "time": 6},
      {"title": "Let Chops Soak", "description": ["Allow porkchops to stank in mixture for 10 minutes"], "time": 11},
      {"title": "Make Brownie Batter", "description": ["In a large saucepan, melt 1/2 cup butter.", "Remove from heat, and stir in sugar, eggs, and 1 teaspoon vanilla.", "Beat in 1/3 cup cocoa, 1/2 cup flour, salt, and baking powder.", "Spread batter into prepared pan."], "time": 11},
      {"title": "Bake Brownies", "description": ["Bake in preheated oven for 25 to 30 minutes. Do not overcook."], "time": 19},
      {"title": "Grill Pork Chops", "description": ["Grill the chops over indirect heat until no longer pink inside, about 12 minutes per side. An instant-read thermometer should read at least 145 degrees F (63 degrees C)."], "time": 21},
      {"title": "Heat Oil", "description": ["Heat oil in a deep-fryer or large saucepan over medium heat."], "time": 25},
      {"title": "Mix Fry Batter", "description": ["Mix flour, garlic powder, salt, and black pepper together in a shallow bowl.", "Beat eggs in a separate bowl."], "time": 28},
      {"title": "Fry Jalepenos", "description": ["Dip jalapeno slices in beaten eggs, then coat generously with flour mixture.", "Fry coated jalapeno slices in the hot oil, working in batches, until peppers are golden brown, 2 to 3 minutes per side."], "time": 30},
      {"title": "Flip Pork Chops", "description": ["Flip porkchop and let cook for about 12 minutes on the other side.", "An instant-read thermometer should read at least 145 degrees F (63 degrees C)."], "time": 38},
      {"title": "Remove Brownies", "description": ["Remove brownies from the oven."], "time": 45},
      {"title": "Remove Porkchops", "description": ["Allow chops to stand for 10 minutes before serving."], "time": 50},
      {"title": "Make Brownie Frosting", "description": ["Combine 3 tablespoons softened butter, 3 tablespoons cocoa, honey, 1 teaspoon vanilla extract, and 1 cup confectioners' sugar. Stir until smooth.", "Frost brownies while they are still warm."], "time": 55},
      {"title": "Fry Jalepenos", "description": ["Dip jalapeno slices in beaten eggs, then coat generously with flour mixture.", "Fry coated jalapeno slices in the hot oil, working in batches, until peppers are golden brown, 2 to 3 minutes per side."], "time": 65},
    ];

    this.stepVisibility = new Array(this.steps.length).fill(false);

    this.totalTime = 75;
    this.ticks = 0
    this.timer = Observable.timer(2000,3000);
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
}
