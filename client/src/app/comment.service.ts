import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { API_URL } from './constants';

@Injectable({
  providedIn: 'root'
})
export class CommentService {

  constructor(private http: HttpClient) { }

  createComment(commentData: any): Observable<any> {
    return this.http.post<any>(`${API_URL}/comments/create`, commentData);
  }

  deleteComment(commentId: string): Observable<any> {
    return this.http.delete<any>(`${API_URL}/comments/delete/${commentId}`);
  }
}
