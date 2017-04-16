import { Component } from '@angular/core';
import { NavController, LoadingController } from 'ionic-angular';

import { Auth } from '../../providers/auth';
import { State } from '../../providers/state';

import { MainPage } from '../../pages/pages';

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
  userSub: any;
  loading: any;
  loaded: any;

  constructor(
    private navCtrl: NavController,
    private auth: Auth,
    private state: State,
    private loadingCtrl: LoadingController
    ) {

    // Initialize variables to blank state
    this.loaded = false;

    // Prepare to load authentication data
    this.showLoading('Connecting to server...');

    this.userSub = this.auth.getUserData().subscribe(data => {
      this.state.user = data;
      this.loaded = true;
      this.loading.dismiss();
    }, err => {
      this.state.user = {};
      this.loaded = true;
      this.loading.dismiss();
    });
  }

  showLoading(message) {
    this.loading = this.loadingCtrl.create({
      content: message
    });
    this.loading.present();
  }

  login() {
    this.showLoading('Logging in...');

    this.auth.loginGoogle().subscribe(data => {
      this.loading.dismiss();
      this.launch();
    }, err => {
      this.loading.dismiss();
      this.error = err;
    });
  }

  launch() {
    this.navCtrl.setRoot(MainPage, {
      animate: true,
      direction: 'forward'
    });
  }

  switchUser() {
    this.userSub.unsubscribe();

    this.auth.logout().then(() => {
      window.location.reload();
    });
  }
}
