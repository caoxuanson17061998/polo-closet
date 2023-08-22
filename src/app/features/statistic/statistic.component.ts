import { Component, OnInit } from '@angular/core';
import { Observable, map, shareReplay, take, timer } from 'rxjs';
import { SharedService } from 'src/app/shared/shared.service';

@Component({
  selector: 'app-statistic',
  templateUrl: './statistic.component.html',
  styleUrls: ['./statistic.component.scss'],
})
export class StatisticComponent implements OnInit {
  // currentTime = new Date();
  rangeDates: Date[] = [];
  revenue!: number;

  private _time$: Observable<Date> = timer(0, 1000).pipe(
    map(tick => new Date()),
    shareReplay(1)
  );

  get currentTime() {
    return this._time$;
  }

  constructor(private shareService: SharedService) {}

  ngOnInit(): void {}

  onSelectRangeDate() {
    console.log(this.rangeDates);
    const startDate = this.rangeDates[0]
      ? this.rangeDates[0].toISOString()
      : null;
    const endDate = this.rangeDates[1]
      ? this.rangeDates[1].toISOString()
      : null;
    if (startDate && endDate) {
      this.shareService
        .getRevenue({ fromDate: startDate, toDate: endDate })
        .pipe(take(1))
        .subscribe(res => {
          this.revenue = res.totalRevenue;
        });
    }
  }
}
