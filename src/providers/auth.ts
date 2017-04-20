import { Injectable } from '@angular/core';
import { Platform } from 'ionic-angular';
import { AngularFire, AuthProviders, AuthMethods } from 'angularfire2';
import { Observable } from 'rxjs/Observable';

@Injectable()
export class Auth {

  constructor(private af: AngularFire, private platform: Platform) {
  }

  buildUserObject(authData) {
    let user = {}
    user['uid'] = authData['uid'];
    user['name'] = authData['auth']['displayName']
    user['email'] = authData['auth']['email']
    user['photo'] = authData['auth']['photoURL']
    user['provider'] = 'google'
    user['token'] = authData['google']['idToken']

    if (user['token']) {
      // If this request contained an idToken, persist it in local storage
      localStorage.setItem('cookomaticIdToken', user['token']);

    } else {
      // If this request didn't have an idToken, check local storage for one
      let token = localStorage.getItem('cookomaticIdToken');

      // If we don't have a token, we cannot proceed
      if (!token) {
        return null;
      }

      user['token'] = token;
    }

    return user;
  }

  getUserData() {
    return Observable.create(observer => {
      this.af.auth.subscribe(authData => {
        if (authData) {
          let user = this.buildUserObject(authData);

          // If user data isn't present, we cannot proceed
          if (!user) {
            observer.error();
          }

          observer.next(user);
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
    localStorage.clear();
    return this.af.auth.logout();
  }
}
