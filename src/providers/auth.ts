import { Injectable } from '@angular/core';
import { Platform } from 'ionic-angular';
import { AngularFire, AuthProviders, AuthMethods } from 'angularfire2';
import { Observable } from 'rxjs/Observable';

@Injectable()
export class Auth {
  user: any;
  constructor(private af: AngularFire, private platform: Platform) {
    this.user = {};
  }

  getUserData() {
    return Observable.create(observer => {
      this.af.auth.subscribe(authData => {
        if (authData) {
          this.af.database.object('users/' + authData.uid).subscribe(userData => {
            this.user = userData;
            observer.next(userData);
          });
        } else {
          observer.error();
        }
      });
    });
  }

  loginGoogle() {
    return Observable.create(observer => {
      this.af.auth.login({
        provider: AuthProviders.Google,
        method: AuthMethods.Popup
      }).then((authData) => {
        this.af.database.list('users').update(authData.auth.uid, {
          name: authData.auth.displayName,
          email: authData.auth.email,
          provider: 'google',
          image: authData.auth.photoURL
        });
        observer.next();
      }).catch((error) => {
        observer.error(error);
      });
    });
  }

  logout() {
    return this.af.auth.logout();
  }
}
