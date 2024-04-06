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
  postIsLikedByUser: boolean = false;
  private authDataSubscription: Subscription | undefined;
  private postsDataSubscription: Subscription | undefined;

  constructor(private sPost: PostService, private sAuth: AuthService) { }

  ngOnInit(): void {
    this.getAuthData();
    this.getPosts();
  }
  onPostCreated(newPost: Post) {
    this.posts.unshift(newPost);
  }
  getAuthData() {
    this.authDataSubscription = this.sAuth.getAuthDataObservable().subscribe((data) => {
      this.authData = data;
    });
  }
  getPosts() {
    this.postsDataSubscription = this.sPost.getPosts(0).subscribe({
      next: (posts) => {
        this.posts = posts.filter(post => post.owner._id != this.authData?._id);
        this.postListLoading = false;
      },
      error: (err) => {
        alert(err.error.errors.join('\n'));
        console.error(err);
      }
    })
  }
  ngOnDestroy(): void {
    this.authDataSubscription?.unsubscribe();
    this.postsDataSubscription?.unsubscribe();
  }
}
