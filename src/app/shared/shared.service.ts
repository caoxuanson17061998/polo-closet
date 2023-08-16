import { NgxSpinnerService } from 'ngx-spinner';
import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { environment } from './../../environments/environment';
import { ICreateProduct, ILogin } from './types';
import { BehaviorSubject, map, catchError, EMPTY, Observable } from 'rxjs';
import { Status } from '../features/user/user.component';

@Injectable({
  providedIn: 'root',
})
export class SharedService {
  private API_URL = environment.apiURL;
  // private LOGIN_URL = `${this.apiURL}/login`;
  private PRODUCT_URL = `${this.API_URL}/product`;
  private PROMOTION_URL = `${this.API_URL}/promotion`;
  private USERS_URL = `${this.API_URL}/users`;

  private isLoginSub$ = new BehaviorSubject(false);
  isLogin$ = this.isLoginSub$.asObservable();

  constructor(
    private httpClient: HttpClient,
    private spinner: NgxSpinnerService
  ) {}

  getProducts(): Observable<any> {
    return this.httpClient.get<any>(`${this.PRODUCT_URL}/getall`).pipe(
      map(res => {
        this.spinner.hide();
        return res;
      }),
      catchError(() => {
        this.spinner.hide();
        return EMPTY;
      })
    );
  }

  getDetailProduct(id: string): Observable<any> {
    return this.httpClient.get<any>(`${this.PRODUCT_URL}/get/${id}`).pipe(
      map(res => {
        this.spinner.hide();
        return res;
      }),
      catchError(() => {
        this.spinner.hide();
        return EMPTY;
      })
    );
  }

  createProduct(payload: ICreateProduct): Observable<any> {
    return this.httpClient
      .post<any>(`${this.PRODUCT_URL}/create`, payload)
      .pipe(
        map(res => {
          this.spinner.hide();
          return res;
        }),
        catchError(() => {
          this.spinner.hide();
          return EMPTY;
        })
      );
  }

  updateProduct(id: string, payload: ICreateProduct): Observable<any> {
    return this.httpClient
      .put<any>(`${this.PRODUCT_URL}/update/${id}`, payload)
      .pipe(
        map(res => {
          this.spinner.hide();
          return res;
        }),
        catchError(() => {
          return EMPTY;
        })
      );
  }

  deleteProduct(id: string): Observable<any> {
    return this.httpClient.delete<any>(`${this.PRODUCT_URL}/delete/${id}`).pipe(
      map(res => {
        this.spinner.hide();
        return res;
      }),
      catchError(() => {
        this.spinner.hide();
        return EMPTY;
      })
    );
  }

  createPromotion(payload: any): Observable<any> {
    return this.httpClient
      .post<any>(`${this.PROMOTION_URL}/create`, payload)
      .pipe(
        map(res => {
          this.spinner.hide();
          return res;
        }),
        catchError(() => {
          this.spinner.hide();
          return EMPTY;
        })
      );
  }

  getUsers(): Observable<any> {
    return this.httpClient.get<any>(`${this.USERS_URL}/getall`).pipe(
      map(res => {
        this.spinner.hide();
        return res;
      }),
      catchError(() => {
        this.spinner.hide();
        return EMPTY;
      })
    );
  }

  updateStatusUser(
    username: string,
    payload: { status: Status }
  ): Observable<any> {
    return this.httpClient
      .put<any>(`${this.USERS_URL}/updateStatus/${username}`, payload)
      .pipe(
        map(res => {
          this.spinner.hide();
          return res;
        }),
        catchError(() => {
          this.spinner.hide();
          return EMPTY;
        })
      );
  }
}
