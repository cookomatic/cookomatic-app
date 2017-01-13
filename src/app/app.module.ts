import { NgModule, ErrorHandler } from '@angular/core';
import { IonicApp, IonicModule, IonicErrorHandler } from 'ionic-angular';
import { Storage } from '@ionic/storage';

import { Cookomatic } from './app.component';
import { MealOverview } from '../pages/meal-overview/meal-overview';
import { AddDishes } from '../pages/add-dishes/add-dishes';
import { DishInfo } from '../pages/dish-info/dish-info';
import { Cooking } from '../pages/cooking/cooking';

@NgModule({
  declarations: [
    Cookomatic,
    MealOverview,
    AddDishes,
    DishInfo,
    Cooking
  ],
  imports: [
    IonicModule.forRoot(Cookomatic),
    IonicModule.forRoot(Cookomatic)
  ],
  bootstrap: [IonicApp],
  entryComponents: [
    Cookomatic,
    MealOverview,
    AddDishes,
    DishInfo,
    Cooking
  ],
  providers: [
    {provide: ErrorHandler, useClass: IonicErrorHandler},
    Storage
  ]
})
export class AppModule {}
