import { Component } from '@angular/core';
import { NavController, ViewController } from 'ionic-angular';
import { Events } from 'ionic-angular';

import { Api } from '../../providers/api';

import { SelectDish } from '../select-dish/select-dish';

@Component({
  selector: 'page-dish-added',
  templateUrl: 'dish-added.html'
})
export class DishAdded {

  dishResults: any = [];

  constructor(
    private navCtrl: NavController,
    private viewCtrl: ViewController,
    private events: Events,
    private api: Api,
  ) {
    this.getDishes("");
  }

  goToMainPage() {
    this.viewCtrl.dismiss();
  }

  loadSuggested(ev) {
    let val = ev.target.value;
    console.log("This is what is being searched: " + ev)
    this.getDishes(val)
  }

  getDishes(val) {
    let seq = this.api.get('dish/search?search=' + val)
    seq
      .map(res => res.json())
      .subscribe(res => {
        this.dishResults = res;
      }, err => {
        console.error('ERROR', err);
        this.api.handleError(err);
      })
  }

  goBackToSearch(event, item) {
    this.navCtrl.setRoot(SelectDish, {}, {
      animate: true,
      direction: 'forward'
    });
  }

}
