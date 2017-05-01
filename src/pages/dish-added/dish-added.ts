import { Component } from '@angular/core';
import { NavController, ViewController } from 'ionic-angular';
import { Events } from 'ionic-angular';

import { Api } from '../../providers/api';
import { DishInfo } from '../dish-info/dish-info';

import { SelectDish } from '../select-dish/select-dish';
import { SimpleGlobal } from 'ng2-simple-global';

@Component({
  selector: 'page-dish-added',
  templateUrl: 'dish-added.html'
})
export class DishAdded {

  suggestedDishes: any = [];

  constructor(
    private api: Api,
    private navCtrl: NavController,
    private viewCtrl: ViewController,
    private events: Events,
    private sg: SimpleGlobal
  ) {
    this.getDishes();
  }

  getDishes() {
    this.suggestedDishes = this.mockedUp();
    // let seq = this.api.get('dish/search?search=' + val)
    // seq
    //   .map(res => res.json())
    //   .subscribe(res => {
    //     this.suggestedDishes = res;
    //   }, err => {
    //     console.error('ERROR', err);
    //     this.api.handleError(err);
    //   })
  }

  mockedUp() {
    let mocked: any[] = [{"id": "6150969767231488", "img":"https://lh3.googleusercontent.com/JdjueIqXrBa1oMXJ3DNpAGGVFeJjubWlxDgl01opnk8iATcHi1JVb-KGN64lQtgpoDCVFnEMPzAFB_4tbsIcUiwhuBgujSk", "img_thumb": "https://lh3.googleusercontent.com/JdjueIqXrBa1oMXJ3DNpAGGVFeJjubWlxDgl01opnk8iATcHi1JVb-KGN64lQtgpoDCVFnEMPzAFB_4tbsIcUiwhuBgujSk=s256-c", "name": "Sweet Potato Chips"}, {"id": "4600107274076160", "img": "https://lh3.googleusercontent.com/iWeQ3hiz5rVB7xVwCIY2snwx5nMy24jySGvaoU-9KajE8XW83-7blJNZfbwduFStXFaV9sNtWvxtkOfkJpI18pGWIoBK6QGd", "img_thumb": "https://lh3.googleusercontent.com/iWeQ3hiz5rVB7xVwCIY2snwx5nMy24jySGvaoU-9KajE8XW83-7blJNZfbwduFStXFaV9sNtWvxtkOfkJpI18pGWIoBK6QGd=s256-c", "name": "Pancakes"} ];

    return mocked
  }

  checkIfAdded(dish) {
    for (let selectedDish of this.sg['dishes']) {
      if (dish['id'] == selectedDish['id']) {
        return true;
      }
    }
    return false;
  }

  openItem(item: any) {
    this.navCtrl.push(DishInfo, {
      item_id: item['id']
    });
  }

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
