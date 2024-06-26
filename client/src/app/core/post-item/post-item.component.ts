import { Component, Input, OnDestroy, OnInit, ViewChild } from '@angular/core';
import { Subscription } from 'rxjs';
import { AuthService } from 'src/app/auth.service';
import { PostService } from 'src/app/post.service';
import { AuthData } from 'src/app/types/AuthData';
import { Post } from 'src/app/types/Post';

@Component({
  selector: 'app-post-item',
  templateUrl: './post-item.component.html',
  styleUrls: ['./post-item.component.css']
})
export class PostItemComponent implements OnInit, OnDestroy {
  @Input() post: Post = {} as Post;
  authData: AuthData | null = null;
  postIsLikedByUser: boolean = false;
  private authDataSubscription: Subscription | undefined;
  private toggleLikeSubscription: Subscription | undefined;
  constructor(private sAuth: AuthService, private sPost: PostService) { }

  ngOnInit(): void {
    this.getAuthData();
    this.checkIfFollow();
  }
  ngOnDestroy(): void {
    this.authDataSubscription?.unsubscribe();
    this.toggleLikeSubscription?.unsubscribe();
  }
  getAuthData() {
    this.authDataSubscription = this.sAuth.getAuthDataObservable().subscribe((data) => {
      this.authData = data;
    });
  }
  checkIfFollow(){
    for (const like of this.post.likes) {
      if (like._id == this.authData?._id) {
        this.postIsLikedByUser = true;
      }
    }
  }
  likePost() {
    this.toggleLikeSubscription = this.sPost.toggleLike(this.post._id).subscribe({
      next: () => {
        if (this.postIsLikedByUser) {
          this.postIsLikedByUser = false;
          const index = this.post.likes.findIndex(like => like._id === this.authData?._id);
          if (index !== -1) {
            this.post.likes.splice(index, 1);
          }
        } else {
          this.postIsLikedByUser = true;
          this.post.likes.push({
            _id: this.authData?._id || '',
            firstName: this.authData?.firstName || '',
            lastName: this.authData?.lastName || '',
            profilePic: this.authData?.profilePic || ''
          });
        }
      },
      error: (err) => {
        alert(err.error.errors.join('\n'));
        console.error(err);
      }
    })
  }
}
