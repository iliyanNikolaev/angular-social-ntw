import { Component, OnDestroy, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { Post } from '../types/Post';
import { PostService } from '../post.service';
import { AuthData } from '../types/AuthData';
import { Subscription } from 'rxjs';
import { AuthService } from '../auth.service';

@Component({
  selector: 'app-post-details',
  templateUrl: './post-details.component.html',
  styleUrls: ['./post-details.component.css']
})
export class PostDetailsComponent implements OnInit, OnDestroy {
  postId: string = ''
  post: Post | null = null;
  postLoading: boolean = true;
  likesVisible: boolean = true;
  commentsVisible: boolean = false;
  authData: AuthData | null = null;
  private authDataSubscription: Subscription | undefined;
  private paramsSubscription: Subscription | undefined;
  private postDetailsSubscription: Subscription | undefined;
  constructor(private router: Router, private route: ActivatedRoute, private sPost: PostService, private sAuth: AuthService) { }
  ngOnInit(): void {
    this.getAuthData();
    this.getPostDetails();
  }
  ngOnDestroy(): void {
    this.authDataSubscription?.unsubscribe();
    this.paramsSubscription?.unsubscribe();
    this.postDetailsSubscription?.unsubscribe();
  }
  getAuthData() {
    this.authDataSubscription = this.sAuth.getAuthDataObservable().subscribe((data) => {
      this.authData = data;
    });
  }
  getPostDetails(){
    this.paramsSubscription = this.route.params.subscribe(params => {
      this.postId = params['id'];
      this.postDetailsSubscription = this.sPost.getPostDetails(this.postId).subscribe({
        next: (post) => {
          this.post = post;
          this.postLoading = false;
        },
        error: (err) => {
          alert(err.error.errors.join('\n'));
          console.error(err);
          this.router.navigate(['/home']); 
        }
      })
    });
  }
  removeCommentFromPostState(commentId: string) {
    if (this.post) {
      this.post.comments = this.post.comments.filter(x => x._id !== commentId);
    }
  }
  showComments() {
    this.commentsVisible = true;
    this.likesVisible = false;
  }
  showLikes() {
    this.commentsVisible = false;
    this.likesVisible = true;
  }
  onDelete(postId: string) {
    const choice = confirm('Are you sure?');
    if(choice) {
      this.sPost.deletePost(postId).subscribe({
        next: () => {
          this.router.navigate(['/profile/'+this.authData?._id]);
        },
        error: (err) => {
          alert(err.error.errors.join('\n'));
          console.error(err); 
        }
      });
    }
  }
}
