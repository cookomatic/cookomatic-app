import { Injectable } from '@angular/core';
import { Http, RequestOptions, URLSearchParams, Headers } from '@angular/http';
import { SimpleGlobal } from 'ng2-simple-global';
import 'rxjs/add/operator/map';

import { Auth } from './auth';

/**
 * Api is a generic REST Api handler. Set your API url first.
 */
@Injectable()
export class Api {
  url: string = 'https://api.cookomatic.co/v1';
  //  url: string = 'http://localhost:8080/v1';

  constructor(
    public http: Http,
    private auth: Auth,
    private sg: SimpleGlobal
  ) {
  }

  private buildOptions() {
    let options = new RequestOptions();

    let headers = new Headers();
    headers.append('X-AUTHORIZATION', this.sg['user']['token'])
    options.headers = headers;

    return options;
  }

  handleError(res) {
    if (res.status == 401) {
      this.auth.logout().then(() => {
        window.location.reload();
      });
    }
  }

  get(endpoint: string, params?: any) {
    let options = this.buildOptions();

    // Support easy query params for GET requests
    if (params) {
      let p = new URLSearchParams();
      for(let k in params) {
        p.set(k, params[k]);
      }
      // Set the search field if we have params and don't already have
      // a search field set in options.
      options.search = !options.search && p || options.search;
    }

    return this.http.get(this.url + '/' + endpoint, options);
  }

  post(endpoint: string, body: any) {
    return this.http.post(this.url + '/' + endpoint, body, this.buildOptions());
  }

  put(endpoint: string, body: any) {
    return this.http.put(this.url + '/' + endpoint, body, this.buildOptions());
  }

  delete(endpoint: string, body: any) {
    return this.http.post(this.url + '/' + endpoint, body, this.buildOptions());
  }

  patch(endpoint: string, body: any) {
    return this.http.put(this.url + '/' + endpoint, body, this.buildOptions());
  }
}
