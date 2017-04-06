import { Component } from '@angular/core';
import { NavController, LoadingController } from 'ionic-angular';
import { AuthProvider } from '../../providers/auth';

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
  user: any;
  loading: any;

  constructor(
    public navCtrl: NavController,
    private auth: AuthProvider,
    private loadingCtrl: LoadingController
    ) {
    this.user = {};
    this.auth.getUserData().subscribe(data => {
      this.user = data;
    }, err => {
      this.user = {};
    });
  }

  showLoading() {
    this.loading = this.loadingCtrl.create({
      content: 'Logging in...'
    });
    this.loading.present();
  }

  login() {
    this.showLoading();

    this.auth.loginGoogle().subscribe(data => {
      this.loading.dismiss();
      this.launch();
    }, err => {
      this.loading.dismiss();
      this.error = err;
    });
  }

  launch() {
    this.navCtrl.setRoot(MainPage, {'user': this.user}, {
      animate: true,
      direction: 'forward'
    });
  }

  switchUser() {
    this.auth.logout().then(() => {
      window.location.reload();
    });
  }
}
