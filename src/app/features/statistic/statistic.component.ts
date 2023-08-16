import { Component, OnInit } from '@angular/core';
import { Observable, map, shareReplay, timer } from 'rxjs';

@Component({
  selector: 'app-statistic',
  templateUrl: './statistic.component.html',
  styleUrls: ['./statistic.component.scss'],
})
export class StatisticComponent implements OnInit {
  // currentTime = new Date();

  private _time$: Observable<Date> = timer(0, 1000).pipe(
    map(tick => new Date()),
    shareReplay(1)
  );

  get currentTime() {
    return this._time$;
  }
  constructor() {}

  ngOnInit(): void {}
}
