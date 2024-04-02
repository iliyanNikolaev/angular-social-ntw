import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { API_URL } from './constants';

@Injectable({
  providedIn: 'root'
})
export class PostService {

  constructor(private http: HttpClient) { }

  getPosts(skip: number = 0): Observable<any> {
    return this.http.get<any>(`${API_URL}/posts?skip=${skip}`);
  }

  getPostsByUserId(userId: string, skip: number = 0): Observable<any> {
    return this.http.get<any>(`${API_URL}/posts/byUser/${userId}?skip=${skip}`);
  }

  getPostDetails(postId: string): Observable<any> {
    return this.http.get<any>(`${API_URL}/posts/details/${postId}`);
  }

  toggleLike(postId: string): Observable<any> {
    return this.http.post<any>(`${API_URL}/posts/like/${postId}`, {});
  }

  createPost(postData: any): Observable<any> {
    return this.http.post<any>(`${API_URL}/posts/create`, postData);
  }

  editPost(postId: string, postData: any): Observable<any> {
    return this.http.put<any>(`${API_URL}/posts/edit/${postId}`, postData);
  }

  deletePost(postId: string): Observable<any> {
    return this.http.delete<any>(`${API_URL}/posts/delete/${postId}`);
  }
}
