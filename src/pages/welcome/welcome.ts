import { Component } from '@angular/core';
import { NavController } from 'ionic-angular';
import { AuthProvider } from '../../providers/auth';

import { LoginPage } from '../login/login';

/**
 * The Welcome Page is a splash page that quickly describes the app,
 * and then directs the user to create an account or log in.
 * If you'd like to immediately put the user onto a login/signup page,
 * we recommend not using the Welcome page.
*/
@Component({
  selector: 'page-welcome',
  templateUrl: 'welcome.html'
})
export class WelcomePage {
  error: any;

  constructor(public navCtrl: NavController, private auth: AuthProvider) {}

  login() {
    this.auth.loginWithGoogle().subscribe(data => {
      // console.log(this.auth.getUserData())
      this.navCtrl.setRoot(LoginPage);
    }, err => {
      this.error = err;
    });
  }
}
