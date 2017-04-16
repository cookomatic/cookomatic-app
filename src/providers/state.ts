import { Injectable } from '@angular/core';
import 'rxjs/add/operator/map';

/**
 * State shares variables across pages
 */
@Injectable()
export class State {
  dishes: any;
  user: any;
  schedule: any;

  constructor() {
    this.dishes = [];
    this.user = [];
    this.schedule = {'ingredients': [], 'estimated_time': 0};
  }

}
