import { Component } from '@angular/core';
import { NavController, ViewController } from 'ionic-angular';
import { Storage } from '@ionic/storage';
import { Events } from 'ionic-angular';
import { MainPage } from '../../pages/pages';

import { SelectDish } from '../select-dish/select-dish';

@Component({
  selector: 'page-dish-added',
  templateUrl: 'dish-added.html'
})
export class DishAdded {

  constructor(
    public navCtrl: NavController,
    public viewCtrl: ViewController,
    public events: Events
  ) {}

  goToMainPage() {
    this.viewCtrl.dismiss();
  }

  goBackToSearch(event, item) {
    this.navCtrl.setRoot(SelectDish, {}, {
      animate: true,
      direction: 'forward'
    });
  }

}
