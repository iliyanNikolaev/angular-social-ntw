import { Injectable } from '@angular/core';
import { BehaviorSubject, Observable } from 'rxjs';
import { AuthData } from './types/AuthData';


@Injectable({
  providedIn: 'root'
})
export class AuthService {
  private authDataSubject = new BehaviorSubject<AuthData | null>(null);

  constructor() {
    const authData = this.getAuthData();
    this.authDataSubject.next(authData);
  }

  getAuthData(): AuthData | null {
    const token = localStorage.getItem('token');
    if (!token) {
      return null;
    }
    return {
      _id: localStorage.getItem('_id') || '',
      fullName: localStorage.getItem('firstName') + ' ' + localStorage.getItem('lastName') || '',
      profilePic: localStorage.getItem('profilePic') || ''
    };
  }

  getAuthDataObservable(): Observable<AuthData | null> {
    return this.authDataSubject.asObservable();
  }

  setAuthData(authData: AuthData | null): void {
    this.authDataSubject.next(authData);
  }
}
