import { Component } from '@angular/core';
import { NavController, ToastController, Platform } from 'ionic-angular';

import { MainPage } from '../../pages/pages';
import { User } from '../../providers/user';


@Component({
  selector: 'page-login',
  templateUrl: 'login.html'
})
export class LoginPage {
  // The account fields for the login form.
  // If you're using the username field with or without email, make
  // sure to add it to the type
  account: {email: string, password: string} = {
    email: 'test@example.com',
    password: 'test'
  };

  private loginErrorString: string;

  constructor(public navCtrl: NavController,
              public user: User,
              public toastCtrl: ToastController,
              public platform: Platform) {
      this.loginErrorString = "Error logging in.";
      this.platform = platform;
  }

  navigateToMain() {
    this.navCtrl.setRoot(MainPage, {}, {
      animate: true,
      direction: 'forward'
    });
  }

  launch() {
    // this.platform.ready().then(() => {
    //   open("https://www.google.com", "_self", "location=true");
    // });
    this.navigateToMain();
  }
}
