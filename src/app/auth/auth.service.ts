import { Injectable } from '@angular/core';
import { HttpClient, HttpErrorResponse } from '@angular/common/http';

import { BehaviorSubject, catchError, tap, throwError } from 'rxjs';
import { UserInfo } from './model/user.interface';
import { AppConstants } from '../core/constants/app-constants';

@Injectable({
  providedIn: 'root',
})
export class AuthService {
  AUTH_TOKEN_KEY = 'token';
  LOGGED_IN_USER_DETAIL_KEY = 'loggedInUserInfo';

  isLoggedIn: boolean = false;
  userInfoSubject$ = new BehaviorSubject<UserInfo | null>(null);

  constructor(private httpClient: HttpClient) {}

  setAuthToken(token: string) {
    localStorage.setItem(this.AUTH_TOKEN_KEY, token);
  }

  getAuthToken(): string | null | undefined {
    return localStorage.getItem(this.AUTH_TOKEN_KEY);
  }

  setAuthUserDetails(userDetail: any) {
    localStorage.setItem(this.LOGGED_IN_USER_DETAIL_KEY, userDetail);
  }

  getAuthUserDetails(): UserInfo | null {
    const userDetail = localStorage.getItem(this.LOGGED_IN_USER_DETAIL_KEY);
    return (userDetail) ? JSON.parse(userDetail) : null;
  }

  removeAuthUserDetails() {
    localStorage.removeItem(this.AUTH_TOKEN_KEY);
    localStorage.removeItem(this.LOGGED_IN_USER_DETAIL_KEY);
    this.isLoggedIn = false;
  }

  signIn(username: string, password: string) {
    const authDetails = {
      username,
      password,
    };
    return this.httpClient
      .post<UserInfo>(AppConstants.apiBaseUrl+'auth/login', authDetails)
      .pipe(
        tap((data) => {
          this.isLoggedIn = true;
          this.setAuthToken(data.token);
          this.setAuthUserDetails(JSON.stringify(data));
          this.userInfoSubject$.next(data);
        }),
        catchError(this.handleError)
      );
  }

  signOut() {
    this.removeAuthUserDetails();
    this.userInfoSubject$.next(null);
  }

  handleError(error: HttpErrorResponse) {
    // this.isLoggedIn = false;
    if (error.status === 0) {
      // A client-side or network error occurred. Handle it accordingly.
      console.error('An error occurred:', error.error);
    } else {
      // The backend returned an unsuccessful response code.
      // The response body may contain clues as to what went wrong.
      console.error(
        `Backend returned code ${error.status}, body was: `,
        error.error
      );
    }
    // Return an observable with a user-facing error message.
    return throwError(
      () => new Error('Something bad happened; please try again later.')
    );
  }

  isAuthenticated(): boolean {
    return !!this.getAuthToken();
  }

  logout() {
    this.removeAuthUserDetails();
  }
}
