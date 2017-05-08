import { Component } from '@angular/core';
import { NavController, NavParams, ViewController } from 'ionic-angular';
import { SimpleGlobal } from 'ng2-simple-global';

import { Api } from '../../providers/api';

import { Events } from 'ionic-angular';

@Component({
  selector: 'add-dish',
  templateUrl: 'add-dish.html'
})
export class AddDish {
  constructor(
    private api: Api,
    private navCtrl: NavController,
    private navParams: NavParams,
    private viewCtrl: ViewController,
    private events: Events,
    private sg: SimpleGlobal
  ) {}

  dismiss() {
    this.viewCtrl.dismiss();
  }
}
