import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { API_URL } from './constants';

@Injectable({
  providedIn: 'root'
})
export class UserService {

  constructor(private http: HttpClient) { 

  }

  getAllUsers(): Observable<any> {
    return this.http.get<any>(`${API_URL}/users`);
  }

  getUserById(id: string): Observable<any> {
    return this.http.get<any>(`${API_URL}/users/details/${id}`);
  }

  editUser(id: string, userData: any): Observable<any> {
    return this.http.put<any>(`${API_URL}/users/edit/${id}`, userData);
  }

  deleteProfile(id: string): Observable<any> {
    return this.http.delete<any>(`${API_URL}/users/delete/${id}`);
  }

  connectUser(id: string): Observable<any> {
    return this.http.post<any>(`${API_URL}/users/connect/${id}`, {});
  }

  register(email: string, password: string, firstName: string, lastName: string): Observable<any> {
    return this.http.post<any>(`${API_URL}/users/register`, { email, password, firstName, lastName });
  }

  login(email: string, password: string): Observable<any> {
    return this.http.post<any>(`${API_URL}/users/login`, { email, password });
  }
}
