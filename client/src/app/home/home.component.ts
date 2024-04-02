import { Component, OnInit } from '@angular/core';
import { PostService } from '../post.service';
import { Post } from '../types/Post';
import { AuthData } from '../types/AuthData';
import { Subscription } from 'rxjs';
import { AuthService } from '../auth.service';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css']
})
export class HomeComponent implements OnInit {
  posts: Post[] = []
  postListLoading: boolean = true;
  authData: AuthData | null = null;
  private authDataSubscription: Subscription | undefined;
  private postsDataSubscription: Subscription | undefined;

  constructor(private sPost: PostService, private sAuth: AuthService) { }

  ngOnInit(): void {
   this.getAuthData();
   this.getPosts(); 
  }

  getAuthData() {
    this.authDataSubscription = this.sAuth.getAuthDataObservable().subscribe((data) => {
      this.authData = data;
    });
  }
  getPosts() {
    this.postsDataSubscription = this.sPost.getPosts(0).subscribe({
      next: (posts) => {
        this.posts = posts;
        this.postListLoading = false;
      },
      error: (err) => {
       alert('Posts fetching error!');
       console.error(err); 
      }
    })
  }
  ngOnDestroy(): void {
    this.authDataSubscription?.unsubscribe();
    this.postsDataSubscription?.unsubscribe();
  }
}
