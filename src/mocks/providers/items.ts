import { Injectable } from '@angular/core';
import { Http } from '@angular/http';

import { Item } from '../../models/item';

@Injectable()
export class Items {
  items: Item[] = [];

  defaultItem: any = {
    "name": "Burt Bear",
    "profilePic": "assets/img/speakers/bear.jpg",
    "about": "Burt is a Bear.",
  };


  constructor(public http: Http) {
    let items = [
      {
         "name": "Roast Chicken with Thyme",
         "profilePic": "assets/img/roast-chicken.jpg",
         "about": "Yummy Roast Chicken"
       },
       {
         "name": "Smoky Grilled Pork Chops",
         "profilePic": "assets/img/porkchops.jpg",
         "about": "Tasty Grilled Pork Chops"
       },
       {
         "name": "Jalepeno Fries",
         "profilePic": "assets/img/jalapeno-fries.png",
         "about": "Spicy Jalapeno Fries"
       },
       {
         "name": "Baked Kale Chips",
         "profilePic": "assets/img/kale-chips.jpg",
         "about": "Delicious Kale Chips"
       },
       {
         "name": "Peanut Blossoms",
         "profilePic": "assets/img/peanut-blossom.jpg",
         "about": "The best Peanut Blossoms"
       },
       {
         "name": "Best Brownies",
         "profilePic": "assets/img/brownies.jpg",
         "about": "Great Brownies"
       },
     ];

     for(let item of items) {
       this.items.push(new Item(item));
     }
  }

  query(params?: any) {
    if(!params) {
      return this.items;
    }

    return this.items.filter((item) => {
      for(let key in params) {
        let field = item[key];
        if(typeof field == 'string' && field.toLowerCase().indexOf(params[key].toLowerCase()) >= 0) {
          return item;
        } else if(field == params[key]) {
          return item;
        }
      }
      return null;
    });
  }

  add(item: Item) {
    this.items.push(item);
  }

  delete(item: Item) {
    this.items.splice(this.items.indexOf(item), 1);
  }
}
