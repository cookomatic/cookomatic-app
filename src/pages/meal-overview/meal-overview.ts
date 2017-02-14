import { Component } from '@angular/core';
import { NavController } from 'ionic-angular';
import { ModalController } from 'ionic-angular';
import { Storage } from '@ionic/storage';
import { Events } from 'ionic-angular';

import { AddDishes } from '../add-dishes/add-dishes';
import { Cooking } from '../cooking/cooking';

function loadData(storage){
  var entrees = [
    {
      "title": "Roast Chicken with Thyme",
      "img": "assets/img/roast-chicken.jpg",
      "imgThumb": "assets/img/roast-chicken-thumb.jpg",
      "cookTime": 90,
      "ingredients": [
        "2 lemons",
        "3 tablespoons olive oil",
        "2 (2.5 pound) whole chickens",
        "salt and pepper to taste",
        "2 large onions, peeled and quartered",
        "1/2 cup butter, softened",
        "6 shallots, coarsely chopped",
        "8 cloves garlic, unpeeled",
        "8 sprigs fresh thyme"
      ],
      "steps": [
        ["Preheat Oven", ["Preheat oven to 375 degrees F (190 degrees C).", "Lightly grease a medium baking dish."]],
        ["Prep Chicken", ["Pierce lemons several times with a fork, and place 1 inside each chicken cavity.", "Arrange chickens in the center of the prepared baking dish. Place onions, shallots, and garlic around the chickens.", "Sprinkle vegetables with olive oil, and season with salt and pepper.", "Spread butter over the chickens, and line each with thyme sprigs."]],
        ["Bake Chicken", ["Bake 20 minutes in the preheated oven.", "Increase oven temperature to 400 degrees F (200 degrees C), and continue baking 30 minutes, or until exterior of chicken is golden brown, meat is no longer pink, and juices run clear.", "Allow to cool about 15 minutes before serving."]]
      ]
    },
    {
      "title": "Smoky Grilled Pork Chops",
      "img": "assets/img/porkchops.jpg",
      "imgThumb": "assets/img/porkchops-thumb.jpg",
      "cookTime": 25,
      "ingredients": [
        "1 tablespoon seasoned salt",
        "1 tablespoon ground paprika",
        "1 teaspoon ground black pepper",
        "2 teaspoon Worcestershire sauce",
        "1 tablespoon garlic powder",
        "1 teaspoon liquid smoke flavoring",
        "1 tablespoon onion powder",
        "4 bone-in pork chops"
      ],
      "steps": [
        ["Preheat Grill", ["Preheat an outdoor grill for medium heat, and lightly oil the grate."]],
        ["Prep Pork Chops", ["In a bowl, mix together the seasoned salt, black pepper, garlic powder, onion powder, paprika, Worcestershire sauce, and smoke flavoring until thoroughly combined.", "Rinse pork chops, and sprinkle the wet chops on both sides with the spice mixture. With your hands, massage the spice rub into the meat."]],
        ["Let Chops Soak", ["Allow porkchops to stank in mixture for 10 minutes"]],
        ["Grill Pork Chops", ["Grill the chops over indirect heat until no longer pink inside, about 12 minutes per side. An instant-read thermometer should read at least 145 degrees F (63 degrees C)."]],
        ["Let Chops cool", ["Allow chops to stand for 10 more minutes before serving."]]
      ]
    }
  ];
  storage.set("dish-entrees", entrees);

  var sides = [
    {
      "title": "Jalepeno Fries",
      "img": "assets/img/jalapeno-fries.png",
      "imgThumb": "assets/img/jalapeno-fries-thumb.png",
      "cookTime": 10,
      "ingredients": [
        "2 cups vegetable oil",
        "salt and ground black pepper to taste",
        "1 cup all-purpose flour",
        "6 jalepeno peppers - halved, seeded, sliced into fry-shaped pieces",
        "2 eggs",
        "2 tablespoons garlic powder"
      ],
      "steps": [
        ["Heat Oil", ["Heat oil in a deep-fryer or large saucepan over medium heat."]],
        ["Mix Fry Batter", ["Mix flour, garlic powder, salt, and black pepper together in a shallow bowl.", "Beat eggs in a separate bowl."]],
        ["Fry Jalepenos", ["Dip jalapeno slices in beaten eggs, then coat generously with flour mixture.", "Fry coated jalapeno slices in the hot oil, working in batches, until peppers are golden brown, 2 to 3 minutes per side."]]
      ]
    },
    {
      "title": "Baked Kale Chips",
      "img": "assets/img/kale-chips.jpg",
      "imgThumb": "assets/img/kale-chips-thumb.jpg",
      "cookTime": 10,
      "ingredients": [
        "1 bunch kale",
        "1 teaspoon seasoned salt",
        "1 tablespoon olive oil"
      ],
      "steps": [
        ["Preheat Oven", ["Preheat the oven to 350 degrees F (175 degrees C).", "Line a non-insulated cookie sheet with parchment paper."]],
        ["Prepare Kale", ["With a knife or kitchen shears, carefully remove the leaves from the thick stems and tear into bite size pieces.", "Wash and thoroughly dry kale with a salad spinner.", "Drizzle kale with olive oil and sprinkle with seasoning salt."]],
        ["Bake Kale Chips", ["Bake until the chip edges brown but are not burnt, 10 to 15 minutes."]]
      ]
    }
  ];
  storage.set("dish-sides", sides);

  var desserts = [
    {
      "title": "Peanut Blossoms",
      "img": "assets/img/peanut-blossom.jpg",
      "imgThumb": "assets/img/peanut-blossom-thumb.jpg",
      "cookTime": 10,
      "ingredients": [
        "1 cup shortening",
        "1 cup peanut butter",
        "1 cup packed brown sugar",
        "1 cup white sugar",
        "2 teaspoons vanilla extract",
        "3 1/2 cups all-purpose flour",
        "2 eggs",
        "1/4 cup milk",
        "2 teaspoons baking soda",
        "1 teaspoon salt",
        "1/2 cup white sugar for decoration",
        "2 (9 ounce) bags milk chocolate candy kisses, unwrapped"
      ],
      "steps": [
        ["Preheat oven", ["Preheat oven to 375 degreef F (190 degrees C).", "Grease cookie sheets"]],
        ["Mix dough", ["In a large bowl, cream together the shortening, peanut butter, brown sugar, and 1 cup white sugar until smooth.", "Beat in the eggs one at a time, and stir in the milk and vanilla.", "Combine the flour, baking soda, and salt; stir into the peanut butter mixture until well blended."]],
        ["Make dough balls", ["Shape tablespoonfuls of dough into balls, and roll in remaining white sugar.", "Place cookies 2 inches apart on the prepared cookie sheets."]],
        ["Bake cookies", ["Bake for 10 to 12 minutes in the preheated oven.", "Remove from oven, and immediately press a chocolate kiss into each cookie.", "Allow to cool completely; the kiss will harden as it cools."]]
      ]
    },
    {
      "title": "Best Brownies",
      "img": "assets/img/brownies.jpg",
      "imgThumb": "assets/img/brownies-thumb.jpg",
      "cookTime": 35,
      "ingredients": [
        "1/2 cup butter",
        "1/4 teaspoon baking powder",
        "3 tablespoons butter, softened",
        "1 cup white sugar",
        "1/3 cup and 3 tablespoons unsweetened cocoa powder",
        "2 eggs",
        "1 tablespoon honey",
        "2 teaspoons vanilla extract",
        "1 cup confectioners' sugar",
        "1/2 cup all-purpose flour",
        "1/4 teaspoon salt"
      ],
      "steps": [
        ["Preheat Oven", ["Preheat oven to 350 degrees F (175 degrees C).", "Grease and flour an 8-inch square pan."]],
        ["Make Brownie Batter", ["In a large saucepan, melt 1/2 cup butter.", "Remove from heat, and stir in sugar, eggs, and 1 teaspoon vanilla.", "Beat in 1/3 cup cocoa, 1/2 cup flour, salt, and baking powder.", "Spread batter into prepared pan."]],
        ["Bake Brownies", ["Bake in preheated oven for 25 to 30 minutes. Do not overcook."]],
        ["Make Brownie Frosting", ["Combine 3 tablespoons softened butter, 3 tablespoons cocoa, honey, 1 teaspoon vanilla extract, and 1 cup confectioners' sugar. Stir until smooth.", "Frost brownies while they are still warm."]]
      ]
    }
  ];
  storage.set("dish-desserts", desserts);
}

@Component({
  selector: 'page-meal-overview',
  templateUrl: 'meal-overview.html'
})
export class MealOverview {
  dishes: any;
  cooking: any;
  storageCtrl: any;
  constructor(
    public navCtrl: NavController,
    public modalCtrl: ModalController,
    public storage: Storage,
    public events: Events
  ) {
    loadData(storage);
    this.dishes = [];
    storage.set("dishes", []);

    this.cooking = Cooking;
    this.storageCtrl = storage;

    events.subscribe("dish:add", (items) => {
      this.dishes = this.dishes.concat(items);
      storage.set("dishes", this.dishes);
    });
  }

  addDish(event) {
    let modal = this.modalCtrl.create(AddDishes);
    modal.present();
  }

  removeDish(event, item, index) {
    this.dishes.splice(index, 1);
    this.storageCtrl.set("dishes", this.dishes);
  }

  startCooking() {
    this.navCtrl.push(Cooking, {"dishes": this.dishes});
  }
}
