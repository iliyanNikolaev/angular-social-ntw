import { Component, OnDestroy, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { Subscription } from 'rxjs';
import { NgForm } from '@angular/forms';
import { Post } from '../types/Post';
import { PostService } from '../post.service';
import { AuthService } from '../auth.service';
import { AuthData } from '../types/AuthData';

@Component({
  selector: 'app-edit-post',
  templateUrl: './edit-post.component.html',
  styleUrls: ['./edit-post.component.css']
})
export class EditPostComponent implements OnInit, OnDestroy {
  authData: AuthData | null = null;
  currPost: Post | null = null;
  paramId: string = '';
  isLoading: boolean = false;
  
  private authDataSubscription: Subscription | undefined;
  private paramsSubscription: Subscription | undefined;
  private postDetailsSubscription: Subscription | undefined;
  private editPostSubscription: Subscription | undefined;

  constructor(private router: Router, private route: ActivatedRoute, private sPost: PostService, private sAuth: AuthService) {

  }

  ngOnInit(): void {
    this.getAuthData();
    this.initEditPost();
  }
  ngOnDestroy(): void {
    this.authDataSubscription?.unsubscribe();
    this.paramsSubscription?.unsubscribe();
    this.postDetailsSubscription?.unsubscribe();
    this.editPostSubscription?.unsubscribe();
  }
  getAuthData() {
    this.authDataSubscription = this.sAuth.getAuthDataObservable().subscribe((data) => {
      this.authData = data;
    });
  }
  initEditPost() {
    this.paramsSubscription = this.route.params.subscribe(params => {
      this.paramId = params['id'];
      this.postDetailsSubscription = this.sPost.getPostDetails(this.paramId).subscribe({
        next: (post) => {
          this.currPost = post;
          if(post.owner._id != this.authData?._id) {
            this.router.navigate(['/']);
          }
        },
        error: (err) => {
          alert(err.error.errors.join('\n'));
          console.error(err); 
        }
      });
    });
  }
  formSubmit(form: NgForm){
    if (form.invalid) {
      return alert('invalid form');
    }
    this.isLoading = true;
    this.editPostSubscription = this.sPost.editPost(this.paramId, form.value).subscribe({
      next: () => {
        this.router.navigate(['/post/'+this.paramId])
      },
      error: (err) => {
        alert(err.error.errors.join('\n'));
        console.error(err); 
      }
    });
  }
}
