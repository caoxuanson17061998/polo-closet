import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { BehaviorSubject, EMPTY, catchError, tap } from 'rxjs';
import { Router } from '@angular/router';
import { environment } from 'src/environments/environment';
import { NgxSpinnerService } from 'ngx-spinner';

@Injectable({
  providedIn: 'root',
})
export class AuthService {
  private API_URL = environment.apiURL;

  private LOGIN_URL = `${this.API_URL}/login`;

  private isLoginSub$ = new BehaviorSubject(this.isLogin);
  isLogin$ = this.isLoginSub$.asObservable();

  constructor(
    private httpClient: HttpClient,
    private spinner: NgxSpinnerService,
    private router: Router
  ) {}

  get isLogin(): boolean {
    return Boolean(localStorage.getItem('isLogin'));
  }

  login(input: { username: string; password: string }) {
    // const headers = new HttpHeaders({ [TRANSACTION_NAME]: 'Login' });
    return this.httpClient
      .post<any>(this.LOGIN_URL, input, {
        responseType: 'json',
        // headers,
      })
      .pipe(
        tap(({ result }) => {
          this.spinner.hide();
          this.isLoginSub$.next(result);
          localStorage.setItem('isLogin', result);
          this.router.navigate(['/statistic']);
        }),
        catchError(err => {
          this.spinner.hide();
          this.isLoginSub$.next(false);
          return EMPTY;
        })
      );
  }

  logout() {
    localStorage.removeItem('isLogin');
    this.isLoginSub$.next(false);
    this.router.navigate(['/login']);
    this.spinner.hide();
  }
}
