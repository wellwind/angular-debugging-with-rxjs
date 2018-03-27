import 'rxjs/add/observable/interval';
import 'rxjs/add/observable/timer';
import 'rxjs/add/operator/switchMap';

import { HttpClient } from '@angular/common/http';
import { Component } from '@angular/core';
import { tag } from 'rxjs-spy/operators/tag';
import { Observable } from 'rxjs/Observable';
import { switchMap } from 'rxjs/operators';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {

  post$ = Observable.timer(0, 5000).pipe(
    tag('app-timer'),
    switchMap((duration) => {
      return this.httpClient.get<any>(`https://jsonplaceholder.typicode.com/posts/${duration % 10 + 1}`)
    }),
    tag('app-post')
  );

  constructor(private httpClient: HttpClient) { }
}
