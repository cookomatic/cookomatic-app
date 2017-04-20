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

  buildUserObject(authData) {
    let user = {}
    user['uid'] = authData['uid'];
    user['name'] = authData['auth']['displayName']
    user['email'] = authData['auth']['email']
    user['photo'] = authData['auth']['photoURL']
    user['provider'] = 'google'
    user['token'] = authData['auth']['Pd']

    return user;
  }

  getUserData() {
    return Observable.create(observer => {
      this.af.auth.subscribe(authData => {
        if (authData) {
          this.user = this.buildUserObject(authData);
          observer.next(this.user);
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
        method: AuthMethods.Redirect
      }).then((authData) => {
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
